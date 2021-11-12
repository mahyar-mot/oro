import React, {useState} from 'react';
import {Table, Button, Tag, Spin} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg"
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import {getUserComplaintsList} from '../../redux/listComplaint/listComplaintList';
import moment from "moment-jalaali"
import { useTokenClaims } from '../public/hooks';
import { UrlQuery } from '../../utils/utils';


function ListTable(props) {
    const {params = {}} = props;
    const {Column} = Table;
    const [loadingResponsive, setLoadingResponsive] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory();
    
    const {userComplaintsList, isLoading, listCount} = useSelector(state => state.listComplaint.list);

    const {countryDivisionCode} = useTokenClaims()

    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageSize, setCurrentPageSize] = useState(10)

    React.useEffect(() => {
        if (countryDivisionCode){
            dispatch(getUserComplaintsList({countryDivisionCode, ...params}));
        }
    }, [params, countryDivisionCode])

    return (
        <div className="mt-2">
            <div className="d-none d-lg-block">
                <Table
                    dataSource={userComplaintsList}
                    pagination={
                        {
                            position: ["bottomCenter"],
                            onChange: (page, pageSize) => {
                                dispatch(getUserComplaintsList({countryDivisionCode, ...params, page, pageSize}))
                                setCurrentPage(page)
                                setCurrentPageSize(pageSize)
                        },
                            total: listCount,
                            pageSize: currentPageSize,
                        }
                    }
                    className="shadow-sm"
                    loading={isLoading}
                    rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
                    bordered
                >
                    <Column title="شماره" key="id" render={(text, record, index) => (((currentPage - 1) * 10) + index + 1)}/>
                    <Column
                        title=" شکایت کننده"
                        dataIndex="firstName"
                        key="firstName"
                        render={(text, record, index) => (`${record.firstName} ${record.surname}`)}
                    />
                    <Column title="کدپیگیری" dataIndex="trackingNumber" key="trackingNumber"/>
                    <Column title="موقعیت" dataIndex="countryDivisionTitle" key="countryDivisionTitle"/>
                    <Column className="dir-ltr" title="زمان ثبت شکایت" dataIndex="createDate" key="createDate" />
                    <Column title="  وضعیت شکایت " dataIndex="protestStatusTitle" key="protestStatusTitle"/>
                    <Column
                        title="عملیات"
                        dataIndex="tags"
                        key="tags"
                        render={(text, record) => (
                            <>

                                 <Button className="" type="secondary" onClick={e => {
                                    history.push(UrlQuery(`/list-complaints/detail/${record.id}`, params))
                                }}>بیشتر</Button>

                                {/* <Button danger icon={<DeletePic/>} size="small"
                                        onClick={e => console.log("~!~!~!")}/> */}
                            </>
                        )}
                    />
                </Table>
            </div>

            <Spin spinning={loadingResponsive}>
                <TableResponsive total={listCount}
                                 pageSize={currentPageSize}
                                 onChange={(page, pageSize) => {
                                     setLoadingResponsive(true)
                                     dispatch(getUserComplaintsList({countryDivisionCode, ...params, page, pageSize})).then(r => setLoadingResponsive(false))
                                     setCurrentPage(page)
                                     setCurrentPageSize(pageSize)
                                 }}
                >

                    {Object.keys(userComplaintsList).length ? userComplaintsList.map((item, i) => {

                            return <table className="table table-striped border-0">
                                <tbody>
                                <RowResponsive title=" شماره "
                                               dataIndex={((currentPage - 1) * currentPageSize) + i + 1}
                                               key="number"/>
                                <RowResponsive title=" شکایت کننده"
                                               dataIndex={item?.firstName + " " + item?.surname}
                                               key="candidateName"/>
                                <RowResponsive title="کدپیگیری" dataIndex={item?.trackingNumber} key="trackingNumber"/>
                                <RowResponsive title="موقعیت" dataIndex={item?.countryDivisionTitle} key="countryDivisionTitle"/>
                                <RowResponsive className="dir-ltr" title="زمان ثبت شکایت" dataIndex={item?.createDate} key="createDate"/>
                                <RowResponsive title="وضعیت شکایت   " dataIndex={item?.protestStatusTitle} key="protestStatusTitle"/>

                                <RowResponsive title="عملیات "
                                               dataIndex={<Button type="secondary" size="small" onClick={e => {
                                                                history.push(UrlQuery(`/list-complaints/detail/${item.id}`, params))
                                                            }}>بیشتر</Button>}
                                               key="age"/>
                                </tbody>
                            </table>
                        }
                    ) : ""}
                </TableResponsive>
            </Spin>
        </div>
    )
}

export default ListTable
