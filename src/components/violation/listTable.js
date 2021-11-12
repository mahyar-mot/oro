import React, {useState} from 'react';
import {Table, Button, Tag, Spin} from 'antd';
import {useHistory, useLocation} from 'react-router';
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import {ReactComponent as EditIcon} from "../../assets/icons/edit_black_24dp.svg";
import { QueryUrl, UrlQuery } from '../../utils/utils';

function ListTable(props) {
    const {getData,violationList,listCount,isLoading,editPermission=false} = props;
    const {Column} = Table;
    const [loadingResponsive, setLoadingResponsive] = useState(false)
    const history = useHistory();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageSize, setCurrentPageSize] = useState(10)

    React.useEffect( () => {
        let querys = location.search !== '' ? QueryUrl(location.search) : {}            
        if (Object.keys(querys).length && "page" in querys){
            setCurrentPage(parseInt(querys.page))
        }
    }, [])

    return (
        <div className="mt-2">
            <div className="d-none d-lg-block">
                <Table
                    dataSource={violationList}
                    pagination={
                        {
                            current: currentPage,
                            position: ["bottomCenter"],
                            onChange: (page, pageSize) => {
                                getData( page, pageSize)
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
                    <Column title="شماره" key="id" render={(text, record, index) => (((currentPage - 1) * currentPageSize) + index + 1)}/>
                    <Column
                        title="گزارش دهنده "
                        dataIndex="creatorFullName"
                        key="creatorFullName"
                    />
                    <Column
                        title=" کدملی گزارش دهنده "
                        dataIndex="creatorNationalNo"
                        key="creatorNationalNo"
                    />
                    <Column
                        title="  نوع تخلف "
                        dataIndex="violationTypeName"
                        key="violationTypeName"
                    />
                    <Column title="  متخلف" dataIndex="violator" key="violator"/>
                    <Column title="   موقعیت" dataIndex="countryDivisionDetail" key="countryDivisionDetail"
                            render={(text, record) => (
                             <span>{record?.countryDivisionDetail || "ایران"}</span>
                            )}
                    />
                    <Column className="dir-ltr" title="  زمان" dataIndex="date" key="date"/>
                    <Column title="  کدشعبه" dataIndex="branchCode" key="branchCode"/>
                    <Column title="   وضعیت بررسی" dataIndex="stateType" key="stateType"/>
                    {/*<Column*/}
                    {/*    title="استان"*/}
                    {/*    dataIndex="surname"*/}
                    {/*    key="action"*/}
                    {/*    render={(text, record, index) => record.countryDivisions.map((item, i) => i === 1 ? item.name : '')}*/}
                    {/*/>*/}
                    {/*<Column*/}
                    {/*    title="شهرستان"*/}
                    {/*    dataIndex="lastName"*/}
                    {/*    key="lastName"*/}
                    {/*    render={(text, record, index) => record.countryDivisions.map((item, i) => i === 2 ? item.name : '')}*/}
                    {/*/>*/}
                    {/*<Column*/}
                    {/*    title="بخش"*/}
                    {/*    dataIndex="age"*/}
                    {/*    key="age"*/}
                    {/*    render={(text, record, index) => record.countryDivisions.map((item, i) => i === 3 ? item.name : '')}*/}
                    {/*/>*/}
                     {editPermission && <Column
                        title="ویرایش"
                        dataIndex="edit"
                        key="edit"
                        render={(text, record) => (
                            <>
                                <Button className="mb-2 px-1" type="secondary " onClick={e => {
                                    history.push(`/violations/add/${record.id}`)
                                }}><EditIcon/></Button>
                            </>
                        )}
                    />}
                    <Column
                        title="عملیات"
                        dataIndex="tags"
                        key="tags"
                        render={(text, record) => (
                            <>

                                 <Button className="" type="secondary" onClick={e => {
                                    history.push(UrlQuery(`/violations/detail/${record.id}`, {...props.params, page: currentPage, isPeople: props?.isPeople, prevPage: location.pathname.substr(1)}))
                                }}>بیشتر</Button>

                                {/* <Button danger icon={<DeletePic/>} size="small"
                                        onClick={e => console.log("~!~!~!")}/> */}
                            </>
                        )}
                    />
                </Table>
            </div>

            <Spin className="d-lg-none" spinning={loadingResponsive || isLoading}>
                <TableResponsive total={listCount}
                                 current={currentPage}
                                 pageSize={currentPageSize}
                                 onChange={(page, pageSize) => {
                                     setLoadingResponsive(true)
                                     getData( page, pageSize)
                                     setCurrentPage(page)
                                     setCurrentPageSize(pageSize)
                                 }}
                >

                    {violationList?.length ? violationList.map((item, i) => {

                            return <table className="table table-striped border-0" key={i}>
                                <tbody>
                                <RowResponsive title=" شماره "
                                               dataIndex={((currentPage - 1) * currentPageSize) + i + 1}
                                               key="number"/>
                                <RowResponsive title=" گزارش دهنده "
                                               dataIndex={item?.creatorFullName}
                                               key="creatorFullName"/>
                                <RowResponsive title=" کدملی گزارش دهنده  "
                                               dataIndex={item?.creatorNationalNo}
                                               key="creatorNationalNo"/>
                                <RowResponsive title="  نوع تخلف  "
                                                dataIndex={item?.violationTypeName}
                                                key="violationTypeName"/>
                                <RowResponsive title="   متخلف "
                                                dataIndex={item?.violator}
                                                key="violator"/>
                                <RowResponsive title=" موقعیت"
                                                dataIndex={item?.countryDivisionDetail || "ایران"}
                                                key="countryDivisionDetail"/>

                                <RowResponsive className="dir-ltr"
                                                title="زمان "
                                                dataIndex={item?.date}
                                                key="date"
                                />
                                <RowResponsive title=" کدشعبه"
                                               dataIndex={item?.branchCode}
                                               key="branchCode"/>
                                <RowResponsive title=" وضعیت بررسی  "
                                               dataIndex={item?.stateType}
                                               key="stateType"/>
                                 {editPermission && <RowResponsive title="ویرایش "
                                               dataIndex={ <Button className="ml-3" type="secondary" size="small" onClick={e => {
                                                   history.push(`/violations/add/${item.id}`)
                                               }}><EditIcon/></Button>}
                                               key="age"/>}
                                <RowResponsive title="عملیات "
                                               dataIndex={ <Button className="ml-3 mb-2" type="secondary" size="small" onClick={e => {
                                                   history.push(UrlQuery(`/violations/detail/${item.id}`, {...props.params, page: currentPage, isPeople: props?.isPeople, prevPage: location.pathname.substr(1)}))
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
