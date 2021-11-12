import React, {useState} from 'react';
import {Table, Button, Tag, Spin} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg"
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import {getUserComplaintsList} from '../../redux/complaints/userComplaintsList';


function ListTable(props) {
    const {params = {},countryDivisionCode} = props;
    const {Column} = Table;
    const [loadingResponsive, setLoadingResponsive] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory();
    
    const {userComplaintsList, isLoading, listCount} = useSelector(state => state.complaint.userList);

    React.useEffect(() => {
            dispatch(getUserComplaintsList({}));
    }, [])

    return (
        <div className="mt-2">
            <div className="d-none d-lg-block">
                <Table
                    dataSource={userComplaintsList}
                    pagination={
                        {
                            position: ["bottomCenter"],
                            onChange: (page, pageSize) => dispatch(getUserComplaintsList({...params, page, pageSize})),
                            total: listCount,
                            pageSize: 10,
                        }
                    }
                    className="shadow-sm"
                    loading={isLoading}
                    rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
                    bordered
                >
                    <Column title="شماره" key="id" render={(text, record, index) => (`${index + 1}`)}/>
                    <Column
                        title=" اعتراض کننده"
                        dataIndex="candidateName"
                        key="candidateName"
                    />
                    <Column title="موقعیت" dataIndex="countryDivisionTitle" key="countryDivisionTitle"/>
                    <Column title="زمان ثبت اعتراض " dataIndex="createDate" key="createDate"/>
                    <Column
                        title="عملیات"
                        dataIndex="tags"
                        key="tags"
                        render={(text, record) => (
                            <>
                                <Button className="ml-3 mb-2" type="secondary" size="small" onClick={e => {
                                    history.push(`/complaints/detail/${record.id}`)
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
                                 onChange={(page, pageSize) => {
                                     setLoadingResponsive(true)
                                     dispatch(getUserComplaintsList({...params, page, pageSize})).then(r => setLoadingResponsive(false))
                                 }}
                >

                    {Object.keys(userComplaintsList).length ? userComplaintsList.map((item, i) => {

                            return <table className="table table-striped border-0">
                                <tbody>
                                <RowResponsive title=" اعتراض کننده"
                                               dataIndex={item?.candidateName}
                                               key="candidateName"/>
                                <RowResponsive title="موقعیت" dataIndex={item?.countryDivisionTitle} key="countryDivisionTitle"/>
                                <RowResponsive title="زمان ثبت اعتراض" dataIndex={item?.createDate} key="createDate"/>

                                <RowResponsive title="بیشتر "
                                               dataIndex={<Button className="ml-3 mb-2" type="secondary" size="small"
                                                                  onClick={e => history.push(`/complaints/detail/${item.id}`)}/>}
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
