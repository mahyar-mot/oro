import React, {useState} from 'react';
import {Table, Button, List, Spin, Modal} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg"
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import { getHeadOverseersList, cleanHeadOverseersList } from "../../redux/headOverseers/headOverseersList";
import { getHeadOverseerBranches, cleanHeadOverseerDetail } from "../../redux/headOverseers/headOverseerDetail";
import moment from "moment-jalaali"
import {getBasicInfo} from "../../redux/basicInfos";
import classnames from "classnames";
import {useTokenClaims} from "../public/hooks";


const ConfirmModal = (props) => {

    const { headOverseerBranchesList, isLoading } = useSelector( state => state.headOverseer.retrieve )
    const dispatch = useDispatch()

    return(
        <Modal 
            bodyStyle={{padding: 0, textAllign: "center"}} 
            className="custom-ant-modal" 
            footer={<Button type="primary" onClick={ () => {
                props.setIsModalVisible(false)
                dispatch(cleanHeadOverseerDetail())
            } } > بستن</Button>}
            closable={false}
            title={<div className="d-flex justify-content-between text-white text-center" >
                <div>شماره</div>
                {/* <div>سرناظر</div> */}
                <div>موقعیت شعبه</div>
                <div>کدونام شعبه</div>
            </div>} 
            visible={props.isModalVisible} 
            onCancel={ () => {
                props.setIsModalVisible(false)
                dispatch(cleanHeadOverseerDetail())
            }}
        >
            <List
            size="small"
            loading={isLoading}
            dataSource={headOverseerBranchesList}
            renderItem={(item, index) => (
                <List.Item key={index} className={classnames({"list-alternate-bg": index % 2 !== 0 })}>
                    <div className="d-flex justify-content-between text-center w-100">
                        <div>{index + 1}</div>
                        {/* <div>سرناظر</div> */}
                        <div>{item.location}</div>
                        <div>{item.name}</div>
                    </div>
                </List.Item>
            )}
            >
                {/* <List.Item>
                    <div className="d-flex justify-content-between w-100">
                        <div>شماره</div>
                        <div>سرناظر</div>
                        <div>موقعیت شعبه</div>
                        <div>کدونام شعبه</div>
                    </div>
                </List.Item>
                <List.Item className="list-alternate-bg "><div className="d-flex justify-content-between w-100">item"</div></List.Item>
                <List.Item><div className="d-flex justify-content-between w-100">item"</div></List.Item>
                <List.Item className="list-alternate-bg "><div className="d-flex justify-content-between w-100">item"</div></List.Item> */}
            </List>
        </Modal>
    )
}


function ListTable(props) {
    const {params = {}} = props;
    const {Column} = Table;
    const [loadingResponsive, setLoadingResponsive] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageSize, setCurrentPageSize] = useState(10)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory();
    
    const { isLoading, listCount, headOverseersList, isSuccess} = useSelector(state => state.headOverseer.list);
    const {countryDivisionLevel, apiHasCalled} = useSelector(state => state.basicInfo);

    const {countryDivisionCode} = useTokenClaims()

    React.useEffect( () => {
        return () => {
            dispatch(cleanHeadOverseersList())
            dispatch(cleanHeadOverseerDetail())
        }
    }, [])

    React.useEffect(() => {
        if (!apiHasCalled){
            dispatch(getBasicInfo())
        }
        if (countryDivisionCode){
            dispatch(getHeadOverseersList({countryDivisionCode, ...params}));
        }
    }, [params, countryDivisionCode])

    // React.useEffect(() => {
    //     if (!isLoading){
    //         if (isSuccess){
    //             setIsModalVisible(false)
    //             setTimeout( () => {
    //                 dispatch(getHeadOverseersList({countryDivisionCode, ...params}))
    //             }, 500)
    //         }
    //     }
    // }, [isSuccess, isLoading])

    return (
        <div className="mt-2">
            <ConfirmModal 
                isModalVisible={isModalVisible} 
                setIsModalVisible={setIsModalVisible}
            />
            <div className="d-none d-lg-block">
                <Table
                    dataSource={headOverseersList}
                    pagination={
                        {
                            position: ["bottomCenter"],
                            onChange: (page, pageSize) => {
                                dispatch(getHeadOverseersList({countryDivisionCode, ...params, page, pageSize}))
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
                        title=" نقش یا سطح فعالیت "
                        dataIndex="assignmentTitleType"
                        key="assignmentTitleType"
                        render={(text, record, index) => countryDivisionLevel.map(item => item.value === record.assignmentTitleType ? item.name : '')}
                    />
                    <Column
                        title=" کدملی "
                        dataIndex="nationalNo"
                        key="nationalNo"
                    />
                    <Column title="تلفن همراه" dataIndex="mobile" key="mobile"/>
                    <Column title=" نام" dataIndex="name" key="name"/>
                    <Column title=" نام خانوادگی" dataIndex="surname" key="surname"/>
                    <Column 
                        title=" استان" 
                        dataIndex="ostan" 
                        key="ostan"
                        render={(text, record, index) => record.countryDivisions.map((item, i) => i === 1 ? item.name : '')}
                    />
                    <Column 
                        title=" شهرستان" 
                        dataIndex="shahrestan" 
                        key="shahrestan"
                        render={(text, record, index) => record.countryDivisions.map((item, i) => i === 2 ? item.name : '')}
                    />
                    <Column 
                        title=" بخش" 
                        dataIndex="baksh" 
                        key="baksh"
                        render={(text, record, index) => record.countryDivisions.map((item, i) => i === 3 ? item.name : '')}
                    />

                    <Column
                        title="عملیات"
                        dataIndex="tags"
                        key="tags"
                        render={(text, record) => (
                            <>

                                {/* <Button className="ml-3 mb-2" type="secondary" size="small" onClick={e => {
                                    history.push(`/branches/detail`)
                                }}>بیشتر</Button> */}

                                <Button className="" type="secondary"
                                        onClick={e =>{
                                            setIsModalVisible(true)
                                            dispatch(getHeadOverseerBranches(record.nationalNo, {pageSize: 20}))
                                        }}>
                                            مشاهده شعب
                                        </Button>
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
                                     dispatch(getHeadOverseersList({countryDivisionCode, ...params, page, pageSize})).then(r => setLoadingResponsive(false))
                                     setCurrentPage(page)
                                     setCurrentPageSize(pageSize)
                                 }}
                >
                    {headOverseersList.length ? headOverseersList.map((item, i) => {

                            return <table className="table table-striped border-0" key={i}>
                                <tbody>
                                <RowResponsive title=" شماره "
                                               dataIndex={ ((currentPage - 1) * currentPageSize) + i + 1 }
                                               key="number"/>
                                <RowResponsive title=" نقش یا سطح فعالیت"
                                               dataIndex={
                                                    countryDivisionLevel.map(i => i.value === item.assignmentTitleType ? i.name : '')
                                               }
                                               key="assignmentTitleType"/>
                                <RowResponsive title=" کدملی  "
                                                dataIndex={item?.nationalNo}
                                                key="nationalNo"/>
                                <RowResponsive title="تلفن همراه"
                                                dataIndex={item?.mobile}
                                                key="mobile"/>
                                <RowResponsive title="نام"
                                                dataIndex={item?.name}
                                                key="name"/>
                                <RowResponsive title="نام خانوادگی"
                                                dataIndex={item?.surname}
                                                key="surname"/>
                                <RowResponsive title="استان "
                                               dataIndex={((item?.countryDivisions.length > 1) ? (item?.countryDivisions[1]?.name) : '')}
                                               key="city1"/>
                                <RowResponsive title="شهرستان "
                                               dataIndex={((item?.countryDivisions.length > 2) ? (item?.countryDivisions[2]?.name) : '')}
                                               key="city2"/>
                                <RowResponsive title="بخش "
                                               dataIndex={((item?.countryDivisions.length > 3) ? (item?.countryDivisions[3]?.name) : '')}
                                               key="city3"/>
                                <RowResponsive title="عملیات "
                                               dataIndex={ 
                                                    <>
                                                            {/* <Button className="ml-3 mb-2" type="secondary" size="small" onClick={e => {
                                                                history.push(`/branches/detail`)
                                                            }}>بیشتر</Button> */}
                                                            <Button className="" type="secondary" size="small"
                                                                onClick={e =>{
                                                                    setIsModalVisible(true)
                                                                    dispatch(getHeadOverseerBranches(item.nationalNo, {pageSize: 20}))
                                                                }}>
                                                                مشاهده شعب
                                                            </Button>
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
