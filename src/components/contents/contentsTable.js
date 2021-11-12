import React from 'react';
import {Table, Button, Popconfirm, Spin} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation} from 'react-router';
import {getContentsList, cleanContentsList} from "../../redux/contents/contentsList";
import {deleteContent} from '../../redux/contents/contentsRetrieve';
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai";
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg";
import {useTokenClaims} from '../public/hooks';
import {ReactComponent as AssetsIcon} from "../../assets/icons/assessment.svg"
import {Link} from "react-router-dom";
import { QueryUrl, UrlQuery } from '../../utils/utils';

function ContentsTable(props) {

    const {Column} = Table;
    const dispatch = useDispatch()
    const {contentsList, isLoading, hasError, listCount} = useSelector(state => state.content.list)

    const history = useHistory();
    const location = useLocation()

    const {countryDivisionCode, roles} = useTokenClaims()

    const [currentPage, setCurrentPage] = React.useState(1)
    const [currentPageSize, setCurrentPageSize] = React.useState(10)

    React.useEffect(() => {
        if (countryDivisionCode) {
            // dispatch(getContentsList({"countryDivisionsCode": countryDivisionCode}))
            dispatch(getContentsList())
        }
    }, [countryDivisionCode])

    React.useEffect( () => {
        let querys = location.search !== '' ? QueryUrl(location.search) : {}            
        if (Object.keys(querys).length && "page" in querys){
            setCurrentPage(parseInt(querys.page))
            setTimeout( () => dispatch(getContentsList({page: parseInt(querys.page)})), 500)
            setTimeout( () => history.replace({
                search: UrlQuery('', querys)
            }) ,500)
        }
        return () => dispatch(cleanContentsList())
    }, [])

    return (
        <div className="mb-5">
            <div className="d-none d-lg-block">
                <Table
                    dataSource={contentsList}
                    className="shadow-sm"
                    loading={isLoading}
                    pagination={
                        {
                            current: currentPage,
                            position: ["bottomCenter"],
                            onChange: (page, pageSize) => {
                                dispatch(getContentsList({countryDivisionCode, page, pageSize}))
                                setCurrentPage(page)
                                setCurrentPageSize(pageSize)
                            },
                            total: listCount,
                            pageSize: currentPageSize,
                        }
                    }
                    rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
                    bordered
                >
                    <Column title="شماره" key="id"
                            render={(text, record, index) => (((currentPage - 1) * currentPageSize) + index + 1)}/>
                    <Column title="عنوان" dataIndex="title" key="title"/>
                    <Column title="دسته بندی" dataIndex="categoryTitle" key="categoryTitle"/>
                    <Column title="گروه" dataIndex="assignmentTitleType" key="assignmentTitleType"/>
                    <Column title="تقسیمات کشوری" dataIndex="countryDivisionCodeName" key="countryDivisionCodeName"/>
                    <Column title="ارسال کننده" dataIndex="creatorName" key="creatorName"/>
                    {
                        roles.includes("2.14") && (
                            <Column title="تعداد بازدید" dataIndex="viewersCount" key="viewersCount"
                                    render={(text, record) => (
                                        <span>
                                            {/* <span className="ml-2">{record?.viewersCount}</span> */}
                                            <Link to={"/monitoring/content/" + record.id} type="link" ghost
                                                    className="border-0 h6"><AssetsIcon/></Link>
                                        </span>
                                    )}
                            />
                        )
                    }
                    <Column title="تاریخ" dataIndex="createDate" key="createDate"/>
                    <Column
                        title="وضعیت"
                        dataIndex="seen"
                        key="seen"
                        render={(text, record) => (
                            text ? <span className="text-oldSuccess"><AiFillEye/> مشاهده شده</span> :
                                <span className="text-danger"><AiFillEyeInvisible/>مشاهده نشده</span>
                        )}
                    />
                    <Column
                        title="عملیات"
                        dataIndex="tags"
                        key="tags"
                        render={(text, record) => (
                            <>
                                <Button className="" type="secondary" size="small" onClick={e => {
                                    history.push(UrlQuery(`/contents/detail/${record.id}`, {page: currentPage}))
                                }}>مشاهده محتوا</Button>
                                {/*<Popconfirm*/}
                                {/*    title="آیا از غیرفعال کردن این محتوا مطمئن هستید؟"*/}
                                {/*    onConfirm={ () => {dispatch(deleteContent(record.id)); setTimeout( () => dispatch(getContentsList({})), 500) }}*/}
                                {/*    okText="بلی"*/}
                                {/*    cancelText="خیر"*/}
                                {/*>*/}
                                {/*    <Button danger icon={<DeletePic/>} size="small" />*/}
                                {/*</Popconfirm>*/}
                            </>
                        )}
                    />
                </Table>
            </div>
            {/* responsive table */}
            {/* <Spin spinning={isLoading}> */}
            <TableResponsive total={listCount}
                             pageSize={currentPageSize}
                             current={currentPage}
                             onChange={(page, pageSize) => {
                                 dispatch(getContentsList({countryDivisionCode, page, pageSize}))
                                 setCurrentPage(page)
                                 setCurrentPageSize(pageSize)
                             }}
            >

                {contentsList.length ? contentsList.map((item, i) => {
                        return <table key={i + 1} className="table table-striped border-0">
                            <tbody>
                            <RowResponsive title="شماره "
                                           dataIndex={((currentPage - 1) * currentPageSize) + i + 1}
                                           key="number"/>
                            <RowResponsive title="عنوان"
                                           dataIndex={item.title}
                                           key="title"/>
                            <RowResponsive title="دسته بندی" dataIndex={item?.categoryTitle} key="categoryTitle"/>
                            <RowResponsive title="گروه" dataIndex={item?.assignmentTitleType} key="assignmentTitleType"/>
                            <RowResponsive title="تقسیمات کشوری" dataIndex={item?.countryDivisionCodeName}
                                           key="countryDivisionCodeName"/>
                            <RowResponsive title="ارسال کننده" dataIndex={item?.creatorName} key="creatorName"/>
                            
                            {
                                roles.includes("2.14") && (<RowResponsive title="تعداد بازدید" dataIndex={ <span>
                                       <span className="ml-2">{item?.viewersCount}</span>
                                       <Link to={"/monitoring/content/" + item.id} type="link" ghost
                                             className="border-0 h6"><AssetsIcon/></Link>
                                </span>} key="viewersCount"/>)
                            }
                            <RowResponsive title="تاریخ "
                                           dataIndex={item.createDate}
                                           key="createDate"/>
                            <RowResponsive title="وضعیت "
                                           dataIndex={
                                               item.seen ?
                                                   <span className="text-oldSuccess"><AiFillEye/> مشاهده شده</span> :
                                                   <span className="text-danger"><AiFillEyeInvisible/>مشاهده نشده</span>
                                           }
                                           key="seen"/>
                            <RowResponsive title="عملیات "
                                           dataIndex={<Button className="" type="secondary" size="small"
                                                              onClick={e => {
                                                                  history.push(UrlQuery(`/contents/detail/${item.id}`, {page: currentPage}))
                                                              }}>مشاهده محتوا</Button>}
                                           key="more"/>
                            {/* <RowResponsive title="حذف "
                                               dataIndex={<Button danger icon={<DeletePic/>} size="small"
                                                                  onClick={e => console.log("~!~!~!")}/>}
                                               key="age"/> */}
                            </tbody>
                        </table>
                    }
                ) : ""}
            </TableResponsive>
            {/* </Spin> */}
        </div>
    )
}

export default ContentsTable
