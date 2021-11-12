import React, {useState} from 'react';
import {Table, Button, Tag, Spin, Modal, Checkbox} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg"
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import {getCartsList} from '../../redux/carts/cartsList';
import {printCartsList, cleanPostCartsList} from '../../redux/carts/print';
import moment from "moment-jalaali"
import {getBasicInfo} from "../../redux/basicInfos";
import classnames from "classnames";
import {useTokenClaims} from "../public/hooks";
import {Link} from "react-router-dom";


const ConfirmModal = (props) => {

    const [text, setText] = React.useState('')
    const {isLoading} = useSelector(state => state.carts.list)

    const dispatch = useDispatch()

    const handleOk = () => {
        if (props.modalType === 'reject') {
            props.handleActivation({status: 6, description: text})
        } else {
            props.handleActivation({status: 7, description: text})
        }
    }

    return (
        <Modal
            bodyStyle={{padding: 0, textAllign: "center"}}
            className="custom-ant-modal"
            footer=""
            title={<div className="text-center text-white">تایید فعال سازی کاربر</div>}
            visible={props.isModalVisible}
            onCancel={() => {
                props.setIsModalVisible(false)
                props.setSelectedUser(null)
            }}
        >
            <div className="text-center p-4">
                <p>
                    آیا از فعال سازی کاربر مسدود شده مطمئن هستید؟
                </p>
                <div>
                    <Button className="ml-3" type="secondary" onClick={() => {
                        props.setIsModalVisible(false)
                        props.setSelectedUser(null)
                    }}>خیر</Button>
                    <Button type="primary" loading={isLoading}
                        // onClick={() => dispatch(activateBlockedUser(props.selectedUser.nationalNo))}
                    >بله مطمئنم</Button>
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
    const [selectedUser, setSelectedUser] = useState([])
    const dispatch = useDispatch()
    const history = useHistory();
    const {isLoading, listCount, cartsList, isSuccess} = useSelector(state => state.carts.list);
    const {countryDivisionLevel, apiHasCalled} = useSelector(state => state.basicInfo);

    const {countryDivisionCode} = useTokenClaims()

    React.useEffect(() => {
        if (!apiHasCalled) {
            dispatch(getBasicInfo())
        }
        if (countryDivisionCode) {
            dispatch(getCartsList({countryDivisionCode, ...params}));
        }
    }, [params, countryDivisionCode])

    React.useEffect(() => {
        if (!isLoading) {
            if (isSuccess) {
                setIsModalVisible(false)
                setTimeout(() => {
                    dispatch(getCartsList({countryDivisionCode, ...params}))
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
            <div className="d-none d-lg-block">
                <Table
                    rowSelection={{
                        type: "checkbox",
                        renderCell: (checked, record, index, originNode) => (
                            <div className="d-flex"><span
                                className="ml-2">{originNode}</span>{`${((currentPage - 1) * currentPageSize) + index + 1}`}
                            </div>
                        ),
                        onChange: (selectedRowKeys, selectedRows) => setSelectedUser(selectedRowKeys)
                    }}
                    dataSource={cartsList}
                    rowKey="nationalNo"
                    pagination={
                        {
                            position: ["bottomCenter"],
                            onChange: (page, pageSize) => {
                                dispatch(getCartsList({countryDivisionCode, ...params, page, pageSize}))
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
                    {/* <Column title="شماره" key="id" render={(text, record, index) => (`${((currentPage - 1) * currentPageSize) + index + 1}`)}/> */}
                    <Column
                        title=" نقش یا سطح فعالیت "
                        dataIndex="assignmentTitle"
                        key="assignmentTitle"
                    />
                    <Column
                        title=" کدملی "
                        dataIndex="nationalNo"
                        key="nationalNo"
                    />
                    <Column title="تلفن همراه" dataIndex="mobile" key="mobile"/>
                    <Column title=" نام و نام خانوادگی  " dataIndex="fullName" key="fullName"/>
                    <Column title="    نام شعبه  " dataIndex="nameShobe" key="nameShobe"/>
                    <Column
                        title=" استان"
                        dataIndex="ostan"
                        key="ostan"
                    />
                </Table>
            </div>

            <Spin spinning={loadingResponsive}>
                <TableResponsive total={listCount}
                                 pageSize={currentPageSize}
                                 onChange={(page, pageSize) => {
                                     setLoadingResponsive(true)
                                     dispatch(getCartsList({
                                         countryDivisionCode, ...params,
                                         page,
                                         pageSize
                                     })).then(r => setLoadingResponsive(false))
                                     setCurrentPage(page)
                                     setCurrentPageSize(pageSize)
                                 }}
                >
                    {cartsList.length ? cartsList.map((item, i) => {

                            return <table className="table table-striped border-0" key={i}>
                                <tbody>
                                <RowResponsive title=" انتخاب "
                                               dataIndex={<Checkbox onChange={() => {
                                                   setSelectedUser([...selectedUser, item?.nationalNo])
                                               }}/>}
                                               key="number"/>
                                <RowResponsive title=" شماره "
                                               dataIndex={((currentPage - 1) * currentPageSize) + i + 1}
                                               key="number"/>
                                <RowResponsive title=" نقش یا سطح فعالیت"
                                               dataIndex={item.assignmentTitle}
                                               key="assignmentTitleType"/>
                                <RowResponsive title=" کدملی  "
                                               dataIndex={item?.nationalNo}
                                               key="nationalNo"/>
                                <RowResponsive title="تلفن همراه"
                                               dataIndex={item?.mobile}
                                               key="mobile"/>
                                <RowResponsive title="نام و نام خانوادگی"
                                               dataIndex={item?.fullName}
                                               key="name"/>
                                <RowResponsive title="نام شعبه"
                                               dataIndex={item?.nameShobe}
                                               key="nameShobe"/>
                                <RowResponsive title="استان "
                                               dataIndex={item?.ostan}
                                               key="city1"/>
                                </tbody>
                            </table>
                        }
                    ) : ""}
                </TableResponsive>
            </Spin>

            <div className="text-left mt-3">
                <Link type="primary" className="ml-3 ant-btn ant-btn-primary ant-btn-lg ant-btn-rtl  mb-1"  onClick={() => {
                    dispatch(printCartsList({countryDivisionCode, ...params}, []))
                }} to="/carts/print">ذخیره کل ناظران</Link>
                <Link type="primary" className="ant-btn ant-btn-primary ant-btn-lg ant-btn-rtl  mb-1" onClick={() => {
                    dispatch(printCartsList({countryDivisionCode, ...params}, selectedUser))
                }} to="/carts/print">ذخیره موارد انتخاب شده</Link>
            </div>
        </div>
    )
}

export default ListTable
