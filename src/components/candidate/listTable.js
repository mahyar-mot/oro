import React, {useState} from 'react';
import {Table, Button, Tag, Spin} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg"
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import {getCandidatesList} from '../../redux/candidates/candidatesList';
import moment from "moment-jalaali"
import {getBasicInfo} from "../../redux/basicInfos";
import classnames from "classnames";
import {useTokenClaims} from "../public/hooks";


function ListTable(props) {
    const {params = {}} = props;
    const {Column} = Table;
    const [loadingResponsive, setLoadingResponsive] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageSize, setCurrentPageSize] = useState(10)
    const dispatch = useDispatch()
    const history = useHistory();
    
    const { isLoading, listCount,candidatesList} = useSelector(state => state.candidate.list);
    const {candidateStatus,education, apiHasCalled} = useSelector(state => state.basicInfo);

    const {countryDivisionCode} = useTokenClaims()

    React.useEffect(() => {
        if (!apiHasCalled){
            dispatch(getBasicInfo())
        }
        if (countryDivisionCode){
            dispatch(getCandidatesList({countryDivisionCode, ...params}));
        }
    }, [params, countryDivisionCode])

    return (
        <div className="mt-2">
            <div className="d-none d-lg-block">
                <Table
                    dataSource={candidatesList}
                    pagination={
                        {
                            position: ["bottomCenter"],
                            onChange: (page, pageSize) => {
                                dispatch(getCandidatesList({countryDivisionCode, ...params, page, pageSize}))
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
                        title=" نام "
                        dataIndex="name"
                        key="name"
                    />
                    <Column
                        title=" نام خانوادگی "
                        dataIndex="surname"
                        key="surname"
                    />
                    <Column title="شماره شناسنامه" dataIndex="identificationNo" key="identificationNo"/>
                    <Column title=" کد ملی" dataIndex="nationalNo" key="nationalNo"/>
                    <Column title="  تلفن همراه" dataIndex="mobileNo" key="mobileNo"/>
                    <Column title="  مدرک" dataIndex="education" key="education"
                            render={(text, record, index) => education.map(item => item.value === record.education ? (
                                <span key={index}>{item.name}</span>
                            ) : null )}/>
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
                    <Column title=" تاریخ تولد  " render={(text, record, index) => record?.birthdate} />
                    <Column title="  وضعیت  " dataIndex="candidateStatus" key="candidateStatus"
                            render={(text, record, index) => candidateStatus.map(item => item.value === record.candidateStatus ? (
                                <span key={index} className={classnames({'text-oldSuccess': text === 5, "text-danger": text === 6, 'text-muted': text === 4 })}>{item.name}</span>
                            ) : null )}/>
                    <Column
                        title="عملیات"
                        dataIndex="tags"
                        key="tags"
                        render={(text, record) => (
                            <>

                                 <Button className="" type="secondary" onClick={e => {
                                    history.push(`/candidates/detail/${record.nationalNo}`)
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
                                 pageSize={currentPageSize}
                                 onChange={(page, pageSize) => {
                                     setLoadingResponsive(true)
                                     dispatch(getCandidatesList({countryDivisionCode, ...params, page, pageSize})).then(r => setLoadingResponsive(false))
                                     setCurrentPage(page)
                                     setCurrentPageSize(pageSize)
                                 }}
                >

                    {candidatesList.length ? candidatesList.map((item, i) => {

                            return <table className="table table-striped border-0" key={i}>
                                <tbody>
                                <RowResponsive title=" شماره "
                                               dataIndex={ ((currentPage - 1) * currentPageSize) + i + 1 }
                                               key="number"/>
                                <RowResponsive title=" نام "
                                               dataIndex={item?.name}
                                               key="name"/>
                                <RowResponsive title=" نام خانوادگی  "
                                                dataIndex={item?.surname}
                                                key="surname"/>
                                <RowResponsive title=" شماره شناسنامه "
                                                dataIndex={item?.identificationNo}
                                                key="identificationNo"/>
                                <RowResponsive title="  کد ملی "
                                                dataIndex={item?.nationalNo}
                                                key="nationalNo"/>
                                <RowResponsive title="تلفن همراه"
                                                dataIndex={item?.mobileNo}
                                                key="mobileNo"/>
                                <RowResponsive title="مدرک "
                                                dataIndex={item?.education}
                                                key="education"
                                                render={(text, record, index) => education.map((item,i) => item.value === record ? (
                                                    <span key={i}>{item.name}</span>
                                                ) : null )}
                                />
                                <RowResponsive title=" تاریخ تولد "
                                               dataIndex={item?.birthdate}
                                               key="birthdate"
                                               render={(text, record, index) => record}
                                />
                                <RowResponsive title="  وضعیت "
                                               dataIndex={item?.candidateStatus}
                                               key="candidateStatus"
                                               render={(text, record, index) => candidateStatus.map((item, i) => item.value === record ? (
                                                   <span key={i} className={classnames({'text-oldSuccess': record === 5, "text-danger": record === 6, 'text-muted': record === 4 })}>{item.name}</span>
                                               ) : null )}
                                />
                                {/*<RowResponsive title="موقعیت" dataIndex={item?.countryDivisionTitle} key="countryDivisionTitle"/>*/}


                                <RowResponsive title="عملیات "
                                               dataIndex={ <Button className="" type="secondary" size="small" onClick={e => {
                                                   history.push(`/candidates/detail/${item.nationalNo}`)
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
