import React, {useState} from 'react';
import {Table, Button, Tag, Spin} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router';
import {ReactComponent as EditIcon} from "../../assets/icons/edit_black_24dp.svg";
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import {getBranchesList, cleanBranchesList} from '../../redux/branches/branchesList';
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
    const history = useHistory();
    const location = useLocation();
    
    const { isLoading, listCount, branchesList} = useSelector(state => state.branch.list);
    const { apiHasCalled } = useSelector(state => state.basicInfo);

    const {countryDivisionCode, roles = []} = useTokenClaims()

    React.useEffect( () => {
        let querys = location.search !== '' ? QueryUrl(location.search) : {}
        if (Object.keys(querys).length && "page" in querys) {
            setCurrentPage(parseInt(querys.page))
            setCurrentPageSize(parseInt(querys.pageSize))
            delete querys["page"]
            delete querys["pageSize"]
            setTimeout(() => history.replace({
                search: UrlQuery('', querys)
            }), 500)
        }
        return () => {
            dispatch(cleanBranchesList())
        }
    }, [])

    React.useEffect(() => {
        if (!apiHasCalled){
            dispatch(getBasicInfo())
        }
        if (countryDivisionCode){
            dispatch(getBranchesList({countryDivisionCode, ...params}));
        }
    }, [params, countryDivisionCode])

    return (
        <div className="mt-2">
            <div className="d-none d-lg-block">
                <Table
                    dataSource={branchesList}
                    pagination={
                        {
                            current: currentPage,
                            position: ["bottomCenter"],
                            onChange: (page, pageSize) => {
                                dispatch(getBranchesList({countryDivisionCode, ...params, page, pageSize}))
                                setCurrentPage(page)
                                setCurrentPageSize(pageSize)
                        },
                            total: listCount,
                            pageSize: currentPageSize,
                        }
                    }
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.location}</p>,
                        expandIconColumnIndex: -1,
                        expandRowByClick: true,
                        // rowExpandable: record => record.name !== 'Not Expandable',
                      }}
                    className="shadow-sm"
                    loading={isLoading}
                    rowKey="id"
                    rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
                    bordered
                >
                    <Column title="شماره" key="id" render={(text, record, index) => (`${((currentPage - 1) * currentPageSize) + index + 1}`)}/>
                    <Column
                        title=" نام شعبه "
                        dataIndex="name"
                        key="name"
                    />
                    <Column 
                        title=" سرناظر " 
                        dataIndex="headSupervisorName" 
                        key="headSupervisorName"
                    />
                    <Column
                        title=" آدرس "
                        dataIndex="surname"
                        key="surname"
                        render={(text, record, index) => record?.countryDivisions?.reduce( (accumulator, current) => typeof(accumulator) === "string" ? `${accumulator}/${current.name}` : current.name )}
                    />
                    {/* <Column 
                        title=" بخش" 
                        dataIndex="nationalNo" 
                        key="nationalNo"
                        render={(text, record, index) => record.countryDivisions.map((item, i) => i === 3 ? item.name : '')}
                    />
                    <Column 
                        title=" شهر/روستا" 
                        dataIndex="mobileNo" 
                        key="mobileNo"
                        render={(text, record, index) => record.countryDivisions.map((item, i) => i === 4 ? item.name : '')}
                    /> */}
                    <Column title=" کدشعبه" dataIndex="branchNumber" key="branchNumber" />
                    <Column
                        title="عملیات"
                        dataIndex="tags"
                        key="tags"
                        render={(text, record) => (
                            <>
                                {
                                    roles.includes("7.4") && record?.branchNumber && (<Button className="ml-3 px-1" type="secondary "  onClick={e => {
                                        history.push(UrlQuery(`/branches/edit/${record.branchNumber}`, {
                                            ...params,
                                            page: currentPage,
                                            pageSize:currentPageSize
                                        }))
                                    }}><EditIcon className="text-warning"/></Button>)
                                }
                                {/* <Button className="ml-3 mb-2" type="primary"  onClick={e => {
                                    history.push(UrlQuery(`/branches/rollcall/${record.id}`, {
                                        ...params,
                                        page: currentPage,
                                        pageSize:currentPageSize
                                    }))
                                }}>حضور و غیاب</Button> */}
                                <Button className="" type="secondary"  onClick={e => {
                                    history.push(UrlQuery(`/branches/detail/${record.id}`, {
                                        ...params,
                                        page: currentPage,
                                        pageSize:currentPageSize
                                    }))
                                }}>بیشتر</Button>
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
                                     dispatch(getBranchesList({countryDivisionCode, ...params, page, pageSize})).then(r => setLoadingResponsive(false))
                                     setCurrentPage(page)
                                     setCurrentPageSize(pageSize)
                                 }}
                >

                    {branchesList.length ? branchesList.map((item, i) => {

                            return <table className="table table-striped border-0" key={i}>
                                <tbody>
                                <RowResponsive title=" شماره "
                                               dataIndex={ ((currentPage - 1) * currentPageSize) + i + 1 }
                                               key="number"/>
                                <RowResponsive title=" نام  شعبه"
                                               dataIndex={item?.name}
                                               key="name"/>
                                <RowResponsive title="سرناظر"
                                                dataIndex={item?.headSupervisorName}
                                                key="headSupervisorName"/>
                                <RowResponsive title=" تقسیمات کشوری  "
                                                dataIndex={item?.countryDivisions?.reduce( (accumulator, current) => typeof(accumulator) === "string" ? `${accumulator}/${current.name}` : current.name )}
                                                key="surname1"/>
                                <RowResponsive title=" آدرس  "
                                                dataIndex={item?.location}
                                                key="surname"/>
                                {/* <RowResponsive title="بخش"
                                                dataIndex={item?.countryDivisions.map((item, i) => i === 3 ? item.name : '')}
                                                key="nationalNo"/>
                                <RowResponsive title="شهر/روستا"
                                                dataIndex={item?.countryDivisions.map((item, i) => i === 4 ? item.name : '')}
                                                key="mobileNo"/> */}
                                <RowResponsive title="کدشعبه "
                                                dataIndex={item?.branchNumber}
                                                key="code"/>
                                <RowResponsive title="عملیات "
                                               dataIndex={ 
                                               <>
                                                    {
                                                        roles.includes("7.4") && item?.branchNumber && (
                                                        <Button className="ml-3 px-1" type="secondary " size="small" onClick={e => {
                                                            history.push(UrlQuery(`/branches/edit/${item?.branchNumber}`, {
                                                                ...params,
                                                                page: currentPage,
                                                                pageSize:currentPageSize
                                                            }))
                                                        }}><EditIcon/></Button>
                                                        )
                                                    }
                                                    {/* <Button className="ml-3 mb-2" type="primary" size="small" onClick={e => {
                                                        history.push(UrlQuery(`/branches/rollcall/${item.id}`, {
                                                            ...params,
                                                            page: currentPage,
                                                            pageSize:currentPageSize
                                                        }))
                                                    }}>حضور و غیاب</Button> */}
                                                    <Button className="" type="secondary" size="small" onClick={e => {
                                                        history.push(UrlQuery(`/branches/detail/${item?.id}`, {
                                                            ...params,
                                                            page: currentPage,
                                                            pageSize:currentPageSize
                                                        }))
                                                    }}>بیشتر</Button>
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
