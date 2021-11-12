import React from 'react';
import {Table, Button, Spin} from 'antd';
import {TableResponsive,RowResponsive} from "../public/tableResponsive";
import { useDispatch, useSelector } from 'react-redux';
import { getAdminsList, cleanAdminsList } from '../../redux/admins/adminsList';
import { getBasicInfo } from '../../redux/basicInfos';
import { useHistory, useLocation } from 'react-router';
import { QueryUrl, UrlQuery } from '../../utils/utils';



function ListTable(props) {

    const {Column} = Table;

    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const {status, countryDivisionLevel, apiHasCalled} = useSelector(state => state.basicInfo);
    const { adminsList, isLoading, listCount } = useSelector( state => state.admin.list )

    const [currentPage, setCurrentPage] = React.useState(1)
    const [currentPageSize, setCurrentPageSize] = React.useState(10)

    React.useEffect( () => {
        if (!apiHasCalled) {
            dispatch(getBasicInfo())
        }
        // dispatch(getAdminsList({}))
        return () => {
            dispatch(cleanAdminsList())
        }
    }, [dispatch])

    React.useEffect(() => {
        // dispatch(getOverseersList({countryDivisionCode}));

    }, [])

    React.useEffect(() => {
            dispatch(getAdminsList({...props.params}));
    }, [props.params])

    React.useEffect( () => {
        let querys = location.search !== '' ? QueryUrl(location.search) : {}            
        if (Object.keys(querys).length && "page" in querys){
            setCurrentPage(parseInt(querys.page))
            delete querys["page"]
            setTimeout( () => history.replace({
                search: UrlQuery('', querys)
            }) ,500)
        }
    }, [])

    return (

        <div>
            <div className="d-none d-lg-block pb-5">
                <Table
                    dataSource={adminsList}
                    className="shadow-sm"
                    rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
                    bordered
                    loading={isLoading}
                    pagination={false}
                    // pagination={
                    //     {
                    //         current: currentPage,
                    //         position: ["bottomCenter"],
                    //         onChange: (page, pageSize) => {
                    //             dispatch(getAdminsList({...props.params, page, pageSize}))
                    //             setCurrentPage(page)
                    //             setCurrentPageSize(pageSize)
                    //         },
                    //         total: listCount,
                    //         pageSize: currentPageSize,
                    //     }
                    // }
                >
                    <Column title="شماره" dataIndex="number" key="number" render={ (t, r, i) => <span key={i}>{((currentPage - 1) * currentPageSize) + i + 1}</span> } />
                    <Column 
                        title="سطح فعالیت" 
                        dataIndex="assignmentTitleTypeName" 
                        key="assignmentTitleTypeName"
                        // render={(text, record, index) => countryDivisionLevel.map(item => item.value === record.assignmentTitleTypeName ? item.name : '')}
                    />
                    <Column title="عنوان" dataIndex="assignmentType" key="assignmentType"/>
                    <Column title="کدملی" dataIndex="nationalNo" key="nationalNo"/>
                    <Column title="تلفن همراه" dataIndex="mobile" key="mobile"/>
                    <Column title="نام" dataIndex="name" key="name"/>
                    <Column title="نام خانوادگی" dataIndex="surname" key="surname"/>
                    <Column title="نام پدر" dataIndex="fatherName" key="fatherName"/>
                    <Column
                        title="عملیات"
                        key="action"
                        render={(text, record, index) => (
                            <>
                                <Button key={index} className="" type="secondary" onClick={e => {
                                    history.push(UrlQuery("/admins/edit/" + record.nationalNo, {...props.params, page: currentPage}))
                                }}>بیشتر</Button>
                                {/* <Button danger icon={<DeletePic/>} size="small"
                                        onClick={e => console.log("~!~!~!")}/> */}
                            </>
                        )}
                    />
                </Table>

            </div>
            <Spin spinning={isLoading} className="d-lg-none">
                <TableResponsive
                    total={listCount}
                    pagination={false}
                    // current={currentPage}
                    // pageSize={currentPageSize}
                    // onChange={ (page, pageSize) => {
                    //     dispatch(getAdminsList({...props.params, page, pageSize}))
                    //     setCurrentPage(page)
                    //     setCurrentPageSize(pageSize)
                    // } }
                >
                    {adminsList.length ? adminsList.map((item, i) => <table key={i} className="table table-striped border-0">
                            <tbody>
                                <RowResponsive title="شماره" dataIndex={ ((currentPage - 1) * currentPageSize) + i + 1 } key="number"/>
                                <RowResponsive title="سطح فعالیت" dataIndex={ item.assignmentTitleTypeName } key="assignmentTitleTypeName"/>
                                <RowResponsive title="عنوان" dataIndex={item?.assignmentType} key="assignmentType"/>
                                <RowResponsive title="کدملی" dataIndex={item?.nationalNo} key="nationalNo"/>
                                <RowResponsive title="تلفن همراه" dataIndex={item?.mobile} key="mobile"/>
                                <RowResponsive title="نام" dataIndex={item?.name} key="name"/>
                                <RowResponsive title="نام خانوادگی" dataIndex={item?.surname} key="surname"/>
                                <RowResponsive title="نام پدر" dataIndex={item?.fatherName} key="fatherName"/>
                                <RowResponsive title="عملیات" dataIndex={
                                    <>
                                        <Button className="" type="secondary" size="small" onClick={e => {
                                            history.push(UrlQuery("/admins/edit/" + item.nationalNo, {...props.params, page: currentPage}))
                                        }}>بیشتر</Button>
                                        {/* <Button danger icon={<DeletePic/>} size="small"
                                                onClick={e => console.log("~!~!~!")}/> */}
                                    </>
                                } key="more"/>
                            </tbody>
                        </table>
                    ) : ""}
                </TableResponsive>
            </Spin>
        </div>
    )
}

export default ListTable
