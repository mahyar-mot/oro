import React, {useState} from 'react';
import {Table, Button, Popconfirm, Spin} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg"
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import {getAllProceedingsList, clearProceedingsList, deleteProceeding} from "../../redux/proceedings/proceedingsList";
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
    
    const { isLoading, listCount , proceedingsList} = useSelector(state => state.proceedings.list);
    const { apiHasCalled } = useSelector(state => state.basicInfo);

    const { countryDivisionCode, roles = [] } = useTokenClaims();

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
        if (countryDivisionCode){
            dispatch(getAllProceedingsList({countryDivisionCode, ...params}));
        }
    }, [params, countryDivisionCode])

    React.useEffect( () => {
        return () => dispatch(clearProceedingsList())
    }, [])

    return (
        <div className="mt-2">
            <div className="d-none d-lg-block">
                <Table
                    dataSource={proceedingsList}
                    pagination={
                        {
                            current: currentPage,
                            position: ["bottomCenter"],
                            onChange: (page, pageSize) => {
                                dispatch(getAllProceedingsList({countryDivisionCode, ...params, page, pageSize}))
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
                        title=" نام شعبه "
                        dataIndex="branchName"
                        key="branchName"
                    />
                    <Column
                        title=" فرستنده "
                        dataIndex="creatorProfileName"
                        key="creatorProfileName"
                    />
                    {/* <Column title=" کدملی فرستنده" dataIndex="creatorNationalNo" key="creatorNationalNo"/>
                    <Column title=" موبایل فرستنده" dataIndex="creatorMobile" key="creatorMobile"/>
                    <Column title="تقسیمات کشوری" dataIndex="countryDivisionDetail" key="countryDivisionDetail"/> */}
                    <Column title="نوع" dataIndex="proceedingTypeTitle" key="proceedingTypeTitle"/>
                    <Column className="dir-ltr" title=" زمان ارسال" dataIndex="createDate" key="createDate"/>
                    <Column
                        title="عملیات"
                        dataIndex="tags"
                        key="tags"
                        render={(text, record) => (
                            <>
                                 <Button className="" type="secondary"  onClick={e => {
                                    history.push(UrlQuery(`/proceedings/detail/${record.id}`, {...params, page: currentPage}))
                                }}>بیشتر</Button>
                                <Popconfirm
                                    title="آیا از حذف این صورتجلسه مطمئن هستید؟"
                                    onConfirm={ () => {dispatch(deleteProceeding(record.id)); setTimeout( () => dispatch(getAllProceedingsList({countryDivisionCode, ...params})) , 1000) }}
                                    okText="بلی"
                                    cancelText="خیر"
                                >
                                    {
                                        roles.includes("8.2") && <Button danger className="mr-2" icon={<DeletePic/>} />
                                    }
                                </Popconfirm>
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
                                     dispatch(getAllProceedingsList({countryDivisionCode, ...params, page, pageSize})).then(r => setLoadingResponsive(false))
                                     setCurrentPage(page)
                                     setCurrentPageSize(pageSize)
                                 }}
                >

                    {proceedingsList.length ? proceedingsList.map((item, i) => {

                            return <table className="table table-striped border-0" key={i}>
                                <tbody>
                                <RowResponsive title=" شماره "
                                               dataIndex={ ((currentPage - 1) * currentPageSize) + i + 1 }
                                               key="number"/>
                                <RowResponsive title=" نام شعبه"
                                               dataIndex={item?.branchName}
                                               key="branchName"/>
                                <RowResponsive title=" فرستنده  "
                                                dataIndex={item?.creatorProfileName}
                                                key="creatorProfileName"/>
                                {/* <RowResponsive title="کدملی فرستنده"
                                                dataIndex={item?.creatorNationalNo}
                                                key="creatorNationalNo"/>
                                <RowResponsive title="موبایل فرستنده"
                                                dataIndex={item?.creatorMobile}
                                                key="creatorMobile"/>
                                <RowResponsive title="تقسیمات کشوری"
                                                dataIndex={item?.countryDivisionDetail}
                                                key="countryDivisionDetail"/> */}
                                <RowResponsive title="نوع"
                                                dataIndex={item?.proceedingTypeTitle}
                                                key="proceedingTypeTitle"/>
                                <RowResponsive  className="dir-ltr"
                                                title="زمان ارسال"
                                                dataIndex={item?.createDate}
                                                key="createDate"/>

                                <RowResponsive title="عملیات "
                                               dataIndex={ 
                                                    <>
                                                        <Button className="" type="secondary" size="small" onClick={e => {
                                                            history.push(UrlQuery(`/proceedings/detail/${item.id}`, {...params, page: currentPage}))
                                                        }}>بیشتر</Button>
                                                        <Popconfirm
                                                            title="آیا از حذف این صورتجلسه مطمئن هستید؟"
                                                            onConfirm={ () => {dispatch(deleteProceeding(item.id)); setTimeout( () => dispatch(getAllProceedingsList({countryDivisionCode, ...params})) , 1000) }}
                                                            okText="بلی"
                                                            cancelText="خیر"
                                                        >
                                                            {
                                                                roles.includes("8.2") && <Button danger className="mr-2" icon={<DeletePic/>} />
                                                            }                                                    
                                                        </Popconfirm>
                                                    </>
                                            }
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
