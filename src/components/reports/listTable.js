import React, {useState} from 'react';
import {Table, Button, Tag, Spin} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg"
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import { getReportsList, cleanReportsList } from "../../redux/reports/reportsList";


function ListTable(props) {
    const {params = {}, countryDivisionCode} = props;
    const {Column} = Table;
    const [loadingResponsive, setLoadingResponsive] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory();

    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageSize, setCurrentPageSize] = useState(10)

    const {isLoading, listCount, reportsList} = useSelector(state => state.reports.list);

    React.useEffect(() => {
            return () => dispatch(cleanReportsList())
    }, [])

    React.useEffect(() => {
        dispatch(getReportsList({...params}));
    }, [params])

    return (
        <div className="mt-2">
            <div className="d-none d-lg-block">
                <Table
                    dataSource={reportsList}
                    pagination={
                        {
                            position: ["bottomCenter"],
                            onChange: (page, pageSize) => {
                                dispatch(getReportsList({...params, page, pageSize}))
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
                    <Column title="شماره" key="id" render={(text, record, index) => (((currentPage - 1)) * currentPageSize) + index + 1 }/>
                    <Column
                        title="  نام و نام خانوادگی "
                        dataIndex="userFullName"
                        key="userFullName"
                    />
                    <Column title="کد ملی" dataIndex="nationalNo" key="nationalNo"/>
                    <Column title="تلفن همراه" dataIndex="mobile" key="mobile"/>
                    <Column title="تقسیمات کشوری" dataIndex="countryDivisionDetail" key="countryDivisionDetail"/>
                    <Column title="دعوت کننده" dataIndex="invitedFullName" key="invitedFullName"/>
                    <Column title="تایید کننده" dataIndex="confirmedFullName" key="confirmedFullName"/>
                    <Column title="رد کننده" dataIndex="rejectedFullName" key="rejectedFullName"/>
                    {/* <Column title="حذف کننده" dataIndex="suspendedFullName" key="suspendedFullName"/> */}
                    <Column title="تاریخ" key="date" dataIndex="date"/>
                </Table>
            </div>

            <Spin spinning={loadingResponsive}>
                <TableResponsive total={listCount}
                                 current={currentPage}
                                 pageSize={currentPageSize}
                                 onChange={(page, pageSize) => {
                                     setLoadingResponsive(true)
                                     dispatch(getReportsList({...params, page, pageSize})).then(r => setLoadingResponsive(false))
                                     setCurrentPage(page)
                                     setCurrentPageSize(pageSize)
                                 }}
                >

                    {reportsList.length ? reportsList.map((item, i) => {

                            return <table className="table table-striped border-0">
                                <tbody>
                                <RowResponsive title=" شماره "
                                               dataIndex={(((currentPage - 1)) * currentPageSize) + i + 1}
                                               key="number"/>
                                <RowResponsive title=" نام و نام خانوادگی "
                                               dataIndex={item?.userFullName}
                                               key="userFullName"/>
                                <RowResponsive title="  کد ملی "
                                               dataIndex={item?.nationalNo}
                                               key="nationalNo"/>
                                <RowResponsive title="تلفن همراه"
                                               dataIndex={item?.mobile}
                                               key="mobile"/>
                                <RowResponsive title="تقسیمات کشوری"
                                               dataIndex={item?.mobile}
                                               key="countryDivisionDetail"/>
                                <RowResponsive title="دعوت کننده"
                                               dataIndex={item?.invitedFullName}
                                               key="invitedFullName"/>
                                <RowResponsive title="تایید کننده"
                                               dataIndex={item?.confirmedFullName}
                                               key="confirmedFullName"/>
                                <RowResponsive title="رد کننده"
                                               dataIndex={item?.rejectedFullName}
                                               key="rejectedFullName"/>
                                {/* <RowResponsive title="حذف کننده"
                                               dataIndex={item?.suspendedFullName}
                                               key="suspendedFullName"/> */}
                                <RowResponsive title="تاریخ"
                                               dataIndex={item?.date}
                                               key="date"/>
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
