import React, {useState} from 'react';
import {Table, Button, Tag, Space, Spin, Tooltip} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router';
import classnames from "classnames";
import {getMonitoringInspectorReport, resetList} from '../../../redux/monitoring/inspectorReport';
import {getBasicInfo} from '../../../redux/basicInfos';
// import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg"
import {FaCheck} from "react-icons/fa"
// import {ReactComponent as ApprovePic} from "../../assets/icons/check_circle-24px (1).svg";
import {TableResponsive, RowResponsive} from "../../public/tableResponsive";
import {useTokenClaims} from '../../public/hooks';
import {QueryUrl, UrlQuery} from '../../../utils/utils';
import {overseerActivation} from '../../../redux/overseers/overseerUpdate';
import {DoubleLeftOutlined, LeftOutlined} from '@ant-design/icons';
import {cleanCountriesStates, getCountriesDivisions} from "../../../redux/countries";
import Text from "antd/es/typography/Text";

function ListTable(props) {
    const {params = {}, setInitialCDC, InitialCDC} = props;
    const {Column} = Table;
    const [loadingResponsive, setLoadingResponsive] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageSize, setCurrentPageSize] = useState(10)
    const dispatch = useDispatch()
    const {
        total,
        listMonitoring: list,
        isLoading: listIsLoading,
        listCount: listCount,
        error: ListHasError
    } = useSelector(state => state.monitoring.inspectorReport);

    const {countryDivisionCode} = useTokenClaims();
    const history = useHistory();
    const location = useLocation()

    const {status, countryDivisionLevel, apiHasCalled} = useSelector(state => state.basicInfo);
// console.log(list)
    React.useEffect(() => {
        // dispatch(getMonitoringInspectorReport({countryDivisionCode}));
        if (!apiHasCalled) {
            dispatch(getBasicInfo())
        }
        return () => dispatch(resetList())
    }, [])

    React.useEffect(() => {
        let querys = location.search !== '' ? QueryUrl(location.search) : {}
        if (Object.keys(querys).length && "page" in querys) {
            setCurrentPage(parseInt(querys.page))
            delete querys["page"]
            setTimeout(() => history.replace({
                search: UrlQuery('', querys)
            }), 500)
        }
    }, [])

    // React.useEffect(() => {
    //     if (countryDivisionCode) {
    //         getData(countryDivisionCode)
    //     }
    // }, [ countryDivisionCode])
    React.useEffect(() => {

        if (params?.countryDivisionCode) {
            getData(params?.countryDivisionCode)
        } else {
            getData(countryDivisionCode)
        }
    }, [params])


    const getData = (code = countryDivisionCode) => {
        // dispatch(cleanCountriesStates())
        if (code) {

            setInitialCDC(code)
            let codes = code.split('.')
            dispatch(getCountriesDivisions(codes))
            setLoadingResponsive(true)
            dispatch(getMonitoringInspectorReport(code, params)).then(r => setLoadingResponsive(false));
        }
    }
    // const activateUser = nationalNo => {
    //     // dispatch(overseerActivation(nationalNo, {status: 5, description: ''}))
    //     setTimeout( () => dispatch(getMonitoringInspectorReport(countryDivisionCode,{ ...params, page: currentPage})), 1500)
    // }

    return (
        <div className="mt-2">
            <div className="d-none d-lg-block">
                <Table
                    dataSource={list}
                    pagination={false}
                    className="shadow-sm"
                    loading={listIsLoading}
                    rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
                    bordered

                    // onRow={(record, rowIndex) => {
                    //     return {
                    //         onClick: () => {
                    //             getData(record?.cdc)
                    //         }, // click row
                    //     };
                    // }}
                    summary={pageData => {
                        // let totalBorrow = 0;
                        // let totalRepayment = 0;

                        // pageData.forEach(({ borrow, repayment }) => {
                        //     totalBorrow += borrow;
                        //     totalRepayment += repayment;
                        // });

                        return (
                            <>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell>درصد</Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <Text type="warning">100</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <Text type="warning">{total?.completingPercentage ?? ""}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <Text type="warning">{total?.pendingPercentage ?? ""}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <Text type="warning">{total?.confirmedPercentage ?? ""}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <Text type="warning">{total?.managementAprovedPercentage ?? ""}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <Text type="warning">{total?.suspendedPercentage ?? ""}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <Text type="warning">{total?.rejectedPercentage ?? ""}</Text>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell>مجموع</Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <Text type="danger">{listCount ?? ""}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <Text type="danger">{total?.completingTotalCount ?? ""}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <Text type="danger">{total?.pendingTotalCount ?? ""}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <Text type="danger">{total?.confirmedTotalCount ?? ""}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <Text type="danger">{total?.managementAprovedTotalCount ?? ""}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <Text type="danger">{total?.suspendedTotalCount ?? ""}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <Text type="danger">{total?.rejectedTotalCount ?? ""}</Text>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>

                            </>
                        );
                    }}
                >
                    <Column title="شماره" key="id"
                            render={(text, record, index) => (`${(((currentPage - 1)) * currentPageSize) + index + 1}`)}/>
                    <Column
                        title=" تقسیمات کشوری"
                        dataIndex="cdcName"
                        key="cdcName"
                        render={(text, record)=><div className="link-color cursor-pointer" onClick={()=> getData(record?.cdc)}>{record?.cdcName}</div>}
                    />
                    <Column title="تعداد کل تعریف شده" dataIndex="totalCount" key="totalCount"/>
                    <Column title="درحال تکمیل " dataIndex="completingCount" key="completingCount"/>
                    <Column title="درحال بررسی" dataIndex="pendingCount" key="pendingCount"/>
                    <Column title="تاییدشده " dataIndex="confirmedCount" key="confirmedCount"/>
                    <Column title="تایید مدیریتی " dataIndex="managementApprovedCount" key="managementApprovedCount"/>
                    <Column title="مسدود شده " dataIndex="suspendedCount" key="suspendedCount"/>
                    <Column title="رد شده" dataIndex="rejectedCount" key="rejectedCount"/>

                </Table>
            </div>

            <Spin className="d-lg-none" spinning={loadingResponsive}>
                <TableResponsive total={listCount}
                                 current={currentPage}
                                 pageSize={currentPageSize}
                                 pagination={false}

                    // onChange={(page, pageSize) => {
                    //     setLoadingResponsive(true)
                    //     // dispatch(getMonitoringInspectorReport(countryDivisionCode,{ ...params, page: page})).then(r => setLoadingResponsive(false))
                    //     dispatch(getMonitoringInspectorReport(countryDivisionCode, params)).then(r => setLoadingResponsive(false))
                    //     setCurrentPage(page)
                    //     setCurrentPageSize(pageSize)
                    // }}
                >

                    {list.length ? list.map((item, i) => {

                            return <table key={i + 1} className="table table-striped border-0">
                                <tbody>
                                <RowResponsive title="شماره " dataIndex={((currentPage - 1) * currentPageSize) + i + 1}
                                               key="number"/>
                                <RowResponsive title="تقسیمات کشوری " dataIndex={<div className="link-color cursor-pointer" onClick={()=> getData(item?.cdc)}>{item?.cdcName}</div>} key="cdcName"/>
                                <RowResponsive title="تعداد کل تعریف شده" dataIndex={item?.totalCount} key="totalCount"/>
                                <RowResponsive title="درحال تکمیل" dataIndex={item?.completingCount} key="completingCount"/>
                                <RowResponsive title="درحال بررسی" dataIndex={item?.pendingCount} key="pendingCount"/>
                                <RowResponsive title="تایید شده " dataIndex={item?.confirmedCount} key="confirmedCount"/>
                                <RowResponsive title="تایید مدیریتی " dataIndex={item?.managementApprovedCount}
                                               key="managementApprovedCount"/>
                                <RowResponsive title="مسدود شده " dataIndex={item?.suspendedCount} key="suspendedCount"/>
                                <RowResponsive title="رد شده " dataIndex={item?.rejectedCount} key="rejectedCount"/>

                                </tbody>
                            </table>
                        }
                    ) : ""}
                </TableResponsive>
                <table className="table table-striped border-0 d-lg-none">
                    <tbody>
                    <RowResponsive title=" درصد تعداد کل تعریف شده" dataIndex={ <Text type="warning">100</Text>} key="completingCount"/>
                    <RowResponsive title="مجموع تعداد کل تعریف شده" dataIndex={<Text type="danger">{listCount ?? ""}</Text>} key="completingCount"/>
                    <RowResponsive title=" درصد درحال تکمیل" dataIndex={<Text type="warning">{total?.completingPercentage ?? ""}</Text>} key="completingCount"/>
                    <RowResponsive title=" مجموع درحال تکمیل" dataIndex={ <Text type="danger">{total?.completingTotalCount ?? ""}</Text>} key="completingCount"/>
                    <RowResponsive title="  درصد درحال بررسی " dataIndex={<Text type="warning">{total?.pendingPercentage ?? ""}</Text>} key="pendingCount"/>
                    <RowResponsive title="  مجموع درحال بررسی " dataIndex={<Text type="danger">{total?.pendingTotalCount ?? ""}</Text>} key="pendingCount"/>
                    <RowResponsive title=" درصد تایید شده    " dataIndex={<Text type="warning">{total?.confirmedPercentage ?? ""}</Text>} key="confirmedCount"/>
                    <RowResponsive title=" مجموع تایید شده    " dataIndex={<Text type="danger">{total?.confirmedTotalCount ?? ""}</Text>} key="confirmedCount"/>
                    <RowResponsive title=" درصد تایید مدیریتی   " dataIndex={<Text type="warning">{total?.managementAprovedPercentage ?? ""}</Text>} key="managementApprovedCount"/>
                    <RowResponsive title=" مجموع تایید مدیریتی   " dataIndex={<Text type="danger">{total?.managementAprovedTotalCount ?? ""}</Text>} key="managementApprovedCount"/>
                    <RowResponsive title=" درصد مسدود شده   " dataIndex={<Text type="warning">{total?.suspendedPercentage ?? ""}</Text>} key="suspendedCount"/>
                    <RowResponsive title=" مجموع مسدود شده   " dataIndex={<Text type="danger">{total?.suspendedTotalCount ?? ""}</Text>} key="suspendedCount"/>
                    <RowResponsive title=" درصد رد شده  " dataIndex={<Text type="warning">{total?.rejectedPercentage ?? ""}</Text>} key="rejectedCount"/>
                    <RowResponsive title=" مجموع رد شده  " dataIndex={<Text type="danger">{total?.rejectedTotalCount ?? ""}</Text>} key="rejectedCount"/>

                    </tbody>
                </table>
            </Spin>
            <div className="text-left d-flex justify-content-end mt-2">
                <Button className="d-flex align-items-center ml-2" onClick={() => {
                    dispatch(cleanCountriesStates())
                    getData(countryDivisionCode)
                }}><DoubleLeftOutlined/></Button>
                <Button className="d-flex align-items-center" onClick={() => {

                    if (InitialCDC !== countryDivisionCode) {
                        dispatch(cleanCountriesStates())
                        let t = ((InitialCDC === countryDivisionCode) ? InitialCDC : InitialCDC?.slice(0, InitialCDC?.lastIndexOf(".")))
                        getData(t)
                    }

                }}><LeftOutlined/></Button>

            </div>
        </div>

    )
}

export default ListTable
