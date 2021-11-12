import React, {useState} from 'react';
import {Table, Button, Tag, Spin, Modal} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg"
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import {getBlockedUsers, cleanBlockedUsers, activateBlockedUser} from '../../redux/blockedUsers';
import moment from "moment-jalaali"
import {getBasicInfo} from "../../redux/basicInfos";
import classnames from "classnames";
import {useTokenClaims} from "../public/hooks";


const ConfirmModal = (props) => {

    const [text, setText] = React.useState('')
    const {isLoading} = useSelector( state => state.blockedUsers)

    const dispatch = useDispatch()

    const handleOk = () => {
        if (props.modalType === 'reject'){
            props.handleActivation({status: 6, description: text})
        }else{
            props.handleActivation({status: 7, description: text})
        }
    }

    return(
        <Modal 
            bodyStyle={{padding: 0, textAllign: "center"}} 
            className="custom-ant-modal" 
            footer="" 
            title={<div className="text-center text-white" >تایید فعال سازی ناظر</div>} 
            visible={props.isModalVisible} 
            onCancel={ () => {
                props.setIsModalVisible(false)
                props.setSelectedUser(null)
            }}
        >
            <div className="text-center p-4">
                <p >
                    آیا از فعال سازی ناظر مسدود شده مطمئن هستید؟
                </p>
                <div>
                    <Button className="ml-3" type="secondary" onClick={ () => {
                        props.setIsModalVisible(false)
                        props.setSelectedUser(null)
                    } }>خیر</Button>
                    <Button type="primary" loading={isLoading} onClick={() => dispatch(activateBlockedUser(props.selectedUser.nationalNo))}>بله مطمئنم</Button>
                </div>
            </div>
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
    const [selectedUser, setSelectedUser] = useState()
    const dispatch = useDispatch()
    const history = useHistory();
    
    const { isLoading, listCount, blockedUsers, isSuccess} = useSelector(state => state.blockedUsers);
    const {countryDivisionLevel, apiHasCalled} = useSelector(state => state.basicInfo);

    const {countryDivisionCode} = useTokenClaims()

    React.useEffect( () => {
        return () => dispatch(cleanBlockedUsers())
    }, [])

    React.useEffect(() => {
        if (!apiHasCalled){
            dispatch(getBasicInfo())
        }
        if (countryDivisionCode){
            dispatch(getBlockedUsers({countryDivisionCode, ...params}));
        }
    }, [params, countryDivisionCode])

    React.useEffect(() => {
        if (!isLoading){
            if (isSuccess){
                setIsModalVisible(false)
                setTimeout( () => {
                    dispatch(getBlockedUsers({countryDivisionCode, ...params}))
                }, 500)
            }
        }
    }, [isSuccess, isLoading])

    return (
        <div className="mt-2">
            <ConfirmModal 
                isModalVisible={isModalVisible} 
                setIsModalVisible={setIsModalVisible}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            />
            <div className="d-flex justify-content-between">
                <span className="square-indicator">
                    لیست ناظران مسدودی 
                    <span className="text-muted mr-2 font-size-sm"> تعداد رکوردها : {listCount} </span>
                    </span>
                </div>
            <div className="d-none d-lg-block">
                <Table
                    dataSource={blockedUsers}
                    pagination={
                        {
                            position: ["bottomCenter"],
                            onChange: (page, pageSize) => {
                                dispatch(getBlockedUsers({countryDivisionCode, ...params, page, pageSize}))
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

                                <Button type='primary'
                                        onClick={e =>{
                                            setIsModalVisible(true)
                                            setSelectedUser(record)
                                        }}>
                                            فعالسازی
                                        </Button>
                            </>
                        )}
                    />
                </Table>
            </div>

            <Spin className="d-lg-none" spinning={loadingResponsive || isLoading}>
                <TableResponsive total={listCount}
                                 pageSize={currentPageSize}
                                 onChange={(page, pageSize) => {
                                     setLoadingResponsive(true)
                                     dispatch(getBlockedUsers({countryDivisionCode, ...params, page, pageSize})).then(r => setLoadingResponsive(false))
                                     setCurrentPage(page)
                                     setCurrentPageSize(pageSize)
                                 }}
                >
                    {blockedUsers.length ? blockedUsers.map((item, i) => {

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
                                                            <Button type='primary' size="small"
                                                                onClick={e =>{
                                                                    setIsModalVisible(true)
                                                                    setSelectedUser(item)
                                                                }}>
                                                                فعالسازی
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
