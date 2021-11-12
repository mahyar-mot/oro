import React, {useState} from 'react';
import {Table, Button, Tag, Spin} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg"
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import {getAllTicketsList, clearTicketsList} from "../../redux/ticketing/ticketsList";
import moment from "moment-jalaali"
import {getBasicInfo} from "../../redux/basicInfos";
import classnames from "classnames";
import {useTokenClaims} from "../public/hooks";
import { QueryUrl, UrlQuery } from '../../utils/utils';


function ListTable(props) {
    const {params = {}} = props;
    const {Column} = Table;
    const [loadingResponsive, setLoadingResponsive] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageSize, setCurrentPageSize] = useState(10)
    const dispatch = useDispatch()
    const location = useLocation();
    const history = useHistory();
    
    const { isLoading, listCount , ticketsList} = useSelector(state => state.tickets.list);
    const { apiHasCalled } = useSelector(state => state.basicInfo);

    React.useEffect( () => {
        let querys = location.search !== '' ? QueryUrl(location.search) : {}            
        if (Object.keys(querys).length && "page" in querys){
            setCurrentPage(parseInt(querys.page))
        }
        if (!apiHasCalled){
            dispatch(getBasicInfo())
        }
    }, [])

    React.useEffect(() => {
        if (params){
            dispatch(getAllTicketsList({...params}));
        }
    }, [params])

    React.useEffect( () => {
        return () => dispatch(clearTicketsList())
    }, [])

    return (
        <div className="mt-2">
            <div className="d-none d-lg-block">
                <Table
                    dataSource={ticketsList}
                    pagination={
                        {
                            current: currentPage,
                            position: ["bottomCenter"],
                            onChange: (page, pageSize) => {
                                dispatch(getAllTicketsList({...params, page, pageSize}))
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
                    <Column title="شماره" key="id" render={(text, record, index) => (`${((currentPage - 1) * currentPageSize) + index + 1}`)}/>
                    <Column
                        title=" عنوان "
                        dataIndex="title"
                        key="title"
                    />
                    <Column
                        title=" فرستنده "
                        dataIndex="creatorFullName"
                        key="creatorFullName"
                    />
                    <Column title=" کدملی فرستنده" dataIndex="creatorNationalNo" key="creatorNationalNo"/>
                    <Column title=" موبایل فرستنده" dataIndex="creatorMobile" key="creatorMobile"/>
                    <Column title="تقسیمات کشوری" dataIndex="countryDivisionDetail" key="countryDivisionDetail"/>
                    <Column title="وضعیت" dataIndex="stateType" key="stateType"/>
                    <Column className="dir-ltr" title=" زمان ارسال" dataIndex="createDate" key="createDate"/>
                    <Column
                        title="عملیات"
                        dataIndex="tags"
                        key="tags"
                        render={(text, record) => (
                            <>

                                 <Button className="" type="secondary"  onClick={e => {
                                    history.push(UrlQuery(`/tickets/detail/${record.id}`, {...params, page: currentPage}))
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
                                 current={currentPage}
                                 pageSize={currentPageSize}
                                 onChange={(page, pageSize) => {
                                     setLoadingResponsive(true)
                                     dispatch(getAllTicketsList({...params, page, pageSize})).then(r => setLoadingResponsive(false))
                                     setCurrentPage(page)
                                     setCurrentPageSize(pageSize)
                                 }}
                >

                    {ticketsList.length ? ticketsList.map((item, i) => {

                            return <table className="table table-striped border-0" key={i}>
                                <tbody>
                                <RowResponsive title=" شماره "
                                               dataIndex={ ((currentPage - 1) * currentPageSize) + i + 1 }
                                               key="number"/>
                                <RowResponsive title=" عنوان"
                                               dataIndex={item?.title}
                                               key="title"/>
                                <RowResponsive title=" فرستنده  "
                                                dataIndex={item?.creatorFullName}
                                                key="creatorFullName"/>
                                <RowResponsive title="کدملی فرستنده"
                                                dataIndex={item?.creatorNationalNo}
                                                key="creatorNationalNo"/>
                                <RowResponsive title="موبایل فرستنده"
                                                dataIndex={item?.creatorMobile}
                                                key="creatorMobile"/>
                                <RowResponsive title="تقسیمات کشوری"
                                                dataIndex={item?.countryDivisionDetail}
                                                key="countryDivisionDetail"/>
                                <RowResponsive title="وضعیت"
                                                dataIndex={item?.stateType}
                                                key="stateType"/>
                                <RowResponsive  className="dir-ltr"
                                                title="زمان ارسال"
                                                dataIndex={item?.createDate}
                                                key="createDate"/>

                                <RowResponsive title="عملیات "
                                               dataIndex={ <Button className="" type="secondary" size="small" onClick={e => {
                                                   history.push(UrlQuery(`/tickets/detail/${item.id}`, {...params, page: currentPage}))
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
