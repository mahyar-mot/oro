import React, {useRef, useState} from 'react';
import {Table, Button, Tag, Space, Spin, Tooltip, Image} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router';
import classnames from "classnames";
import {getOverseersList, cleanOverseersList} from '../../redux/overseers/overseersList';
import {getBasicInfo} from '../../redux/basicInfos';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg"
import {FaCheck} from "react-icons/fa"
import {ReactComponent as ApprovePic} from "../../assets/icons/check_circle-24px (1).svg";
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import {useTokenClaims} from '../public/hooks';
import {QueryUrl, UrlQuery} from '../../utils/utils';
import {overseerActivation} from '../../redux/overseers/overseerUpdate';


function ListTable(props) {
    const {params = {}} = props;
    const {Column} = Table;
    const [loadingResponsive, setLoadingResponsive] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageSize, setCurrentPageSize] = useState(10)
    const dispatch = useDispatch()
    const {
        overseersList: list,
        isLoading: listIsLoading,
        listCount: listCount,
        error: ListHasError
    } = useSelector(state => state.overseer.list);

    const {countryDivisionCode} = useTokenClaims();
    const history = useHistory();
    const location = useLocation()

    const {status, countryDivisionLevel, apiHasCalled} = useSelector(state => state.basicInfo);

    React.useEffect(() => {
        // dispatch(getOverseersList({countryDivisionCode}));
        if (!apiHasCalled) {
            dispatch(getBasicInfo())
        }
        return () => dispatch(cleanOverseersList())
    }, [])

    React.useEffect(() => {
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
    }, [])

    React.useEffect(() => {
        if (countryDivisionCode)
            dispatch(getOverseersList({countryDivisionCode, ...params}));
    }, [params, countryDivisionCode])

    const activateUser = nationalNo => {
        dispatch(overseerActivation(nationalNo, {status: 5, description: ''}))
        setTimeout(() => dispatch(getOverseersList({countryDivisionCode, ...params, page: currentPage})), 1500)
    }

    const scrollEl = useRef(null);

    return (
        <div className="mt-2" ref={scrollEl}>
            <div className="d-none d-lg-block">
                <Table
                    dataSource={list}
                    pagination={
                        {
                            current: currentPage,
                            position: ["bottomCenter"],
                            onChange: (page, pageSize) => {
                                dispatch(getOverseersList({
                                    countryDivisionCode, ...params,
                                    page,
                                    pageSize
                                })).then(r => scrollEl.current.parentNode.parentNode.scrollIntoView({
                                    block: "start",
                                    behavior: 'smooth'
                                }))


                                setCurrentPage(page)
                                setCurrentPageSize(pageSize)

                            },
                            total: listCount,
                            pageSize: currentPageSize,
                            defaultPageSize: currentPageSize,
                        }
                    }
                    className="shadow-sm"
                    loading={listIsLoading}
                    rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
                    bordered
                    rowKey="nationalNo"
                >
                    <Column title="شماره" key="id"
                            render={(text, record, index) => (`${(((currentPage - 1)) * currentPageSize) + index + 1}`)}/>
                    <Column
                        title="سطح فعالیت"
                        dataIndex="assignmentTitleType"
                        key="assignmentTitleType"
                        render={(text, record, index) => countryDivisionLevel.map(item => item.value === record.assignmentTitleType ? item.name : '')}
                    />
                    <Column title="کدملی" dataIndex="nationalNo" key="nationalNo"/>
                    <Column title="تلفن همراه" dataIndex="mobile" key="mobile"/>
                    <Column title="نام" dataIndex="name" key="name"/>
                    <Column title="نام خانوادگی" dataIndex="surname" key="surname"/>
                    <Column
                        title="استان"
                        dataIndex="surname"
                        key="action"
                        render={(text, record, index) => record.countryDivisions.map((item, i) => i === 1 ? item.name : '')}
                    />
                    <Column
                        title="شهرستان"
                        dataIndex="lastName"
                        key="lastName"
                        render={(text, record, index) => record.countryDivisions.map((item, i) => i === 2 ? item.name : '')}
                    />
                    <Column
                        title="بخش"
                        dataIndex="age"
                        key="age"
                        render={(text, record, index) => record.countryDivisions.map((item, i) => i === 3 ? item.name : '')}
                    />
                    {/* <Column title="زمان آخرین پیامک" dataIndex="address" key="randomString" />
                <Column title="زمان آخرین تغییر" dataIndex="address" key="address" /> */}
                    <Column
                        title="پروفایل"
                        dataIndex="personalPhotoAddress"
                        key="personalPhotoAddress"
                        render={(text, record, index) => (
                            <Image className="img-thumbnail" style={{maxWidth: '80px', maxHeight: "60px"}} key={index}
                                   src={record.personalPhotoAddress}/>
                            // <img className="img-thumbnail"  style={{maxWidth:'80px', maxHeight: "60px"}} key={index} src={record.personalPhotoAddress}/>
                        )}
                    />
                    <Column
                        title="وضعیت"
                        dataIndex="profileStatusSupervisor"
                        key="profileStatusSupervisor"
                        // dataIndex={["profileStatusDto", "statusType"]}
                        // key={["profileStatusDto", "statusType"]}
                        // render={(text, record, index) => status.map(item => item.value === record.profileStatusDto[0].statusType ? (
                        //     <span key={index} className={classnames({
                        //         'text-oldSuccess': record.profileStatusDto[0].statusType === 5,
                        //         "text-danger": record.profileStatusDto[0].statusType === 6,
                        //         'text-muted': record.profileStatusDto[0].statusType === 4
                        //     })}>{item.name}</span>
                        // ) : null)}
                        dataIndex="profileStatusSupervisor"
                        key="profileStatusSupervisor"
                        render={(text, record, index) => (
                            <span key={index} className={classnames({'text-oldSuccess': ["تایید شده(مدیریتی)", "تایید شده"].includes(text), "text-danger": text === "رد شده", 'text-muted': text === "در حال بررسی" })}>{text}</span>
                        )}
                    />
                    <Column
                        title="شعبه"
                        dataIndex="hasBranch"
                        key="hasBranch"
                        render={(text) => text ? "دارد" : "ندارد" }
                    />
                    <Column
                        title="عملیات"
                        dataIndex="tags"
                        key="tags"
                        render={(text, record, index) => (
                            <>
                                <Button key={index} className="mb-2" type="secondary" size="small" onClick={e => {
                                    history.push(UrlQuery("/overseers/update/" + record.nationalNo, {
                                        ...params,
                                        page: currentPage,
                                        pageSize:currentPageSize
                                    }))
                                }}>بیشتر</Button>
                                <Tooltip title="تایید کاربر">
                                    <Button className="mr-2" type="primary"
                                            disabled={!(!record.managementApproval && record.stateType === 2 && [4, 6].includes(record.profileStatusDto[0].statusType))}
                                            icon={<FaCheck/>} size="small"
                                            onClick={e => activateUser(record.nationalNo)}/>
                                </Tooltip>
                            </>
                        )}
                    />
                </Table>
            </div>

            <Spin className="d-lg-none" spinning={loadingResponsive || listIsLoading}>
                <TableResponsive total={listCount}
                                 current={currentPage}
                                 pageSize={currentPageSize}
                                 onChange={(page, pageSize) => {
                                     setLoadingResponsive(true)
                                     dispatch(getOverseersList({
                                         countryDivisionCode, ...params,
                                         page: page,
                                         pageSize
                                     })).then(r => {
                                         setLoadingResponsive(false)
                                         scrollEl.current.parentNode.parentNode.scrollIntoView({
                                             block: "start",
                                             behavior: 'smooth'
                                         })
                                     })
                                     setCurrentPage(page)
                                     setCurrentPageSize(pageSize)
                                 }}
                >

                    {list.length ? list.map((item, i) => {
                            let country = countryDivisionLevel.filter(t => t.value === item.assignmentTitleType)
                            let statusItem = status.filter(t => t.value === item.profileStatusDto[0].statusType)
                            country.length ? (country = country[0]?.name) : (country = "")
                            statusItem.length ? (statusItem = statusItem[0]?.name) : (statusItem = "")
                            return <table key={i + 1} className="table table-striped border-0">
                                <tbody>
                                <RowResponsive title="شماره "
                                               dataIndex={((currentPage - 1) * currentPageSize) + i + 1}
                                               key="number"/>
                                <RowResponsive title="سطح فعالیت"
                                               dataIndex={country}
                                               key="assignmentTitleType"/>
                                <RowResponsive title="کدملی" dataIndex={item?.nationalNo} key="nationalNo"/>
                                <RowResponsive title="موبایل" dataIndex={item?.mobile} key="mobile"/>
                                <RowResponsive title="نام" dataIndex={item?.name} key="name"/>
                                <RowResponsive title="نام خانوادگی" dataIndex={item?.surname} key="surname"/>
                                <RowResponsive title="استان "
                                               dataIndex={((item?.countryDivisions.length > 1) ? (item?.countryDivisions[1]?.name) : '')}
                                               key="city1"/>
                                <RowResponsive title="شهرستان "
                                               dataIndex={((item?.countryDivisions.length > 2) ? (item?.countryDivisions[2]?.name) : '')}
                                               key="city2"/>
                                <RowResponsive title="بخش "
                                               dataIndex={((item?.countryDivisions.length > 3) ? (item?.countryDivisions[3]?.name) : '')}
                                               key="city3"/>
                                <RowResponsive title="پروفایل "
                                               dataIndex={
                                                   <img className="img-thumbnail"
                                                        style={{maxWidth: '70px', maxHeight: "50px"}} key={i}
                                                        src={item.personalPhotoAddress}/>
                                               }
                                               key="personalPhotoAddress"/>
                                <RowResponsive title="وضعیت "
                                               dataIndex={item?.profileStatusSupervisor}
                                               key="stateType"/>
                                <RowResponsive title="شعبه "
                                               dataIndex={item?.hasBranch ? "دارد" : "ندارد" }
                                               key="hasBranch"/>
                                <RowResponsive title="جزییات "
                                               dataIndex={
                                                   [
                                                       <Button key={0} className="ml-3" type="secondary" size="small"
                                                               onClick={e => {
                                                                   history.push(UrlQuery("/overseers/update/" + item.nationalNo, {
                                                                       ...params,
                                                                       page: currentPage,
                                                                       pageSize:currentPageSize
                                                                   }))
                                                               }}>بیشتر</Button>,
                                                       <Button key={1} className="mr-2" type="primary"
                                                               disabled={!(!item.managementApproval && item.stateType === 2 && [4, 6].includes(item.profileStatusDto[0].statusType))}
                                                               icon={<FaCheck/>} size="small"
                                                               onClick={e => activateUser(item.nationalNo)}/>
                                                   ]}
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
            </Spin>
        </div>
    )
}

export default ListTable
