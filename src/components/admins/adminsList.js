import React, {useState} from 'react';
import {Button, Form, Modal, Select} from 'antd';
import {NavLink as NavLinkRouter} from "react-router-dom";
import ListTable from "./listTable";
import {ReactComponent as AddUserPic} from "../../assets/icons/person_add_alt_1_black.svg";
import {ReactComponent as SortIcon} from "../../assets/icons/sort.svg";
import ListFilters from "./listFilters";
import { useDispatch, useSelector } from 'react-redux';
import { getBasicInfo } from '../../redux/basicInfos';
import ReportModal from './reportModal';


function AdminsList() {
    const [params, serParams] = useState({})
    const [myOverseers] = useState({})
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const dispatch = useDispatch()

    const { listCount } = useSelector( state => state.admin.list )
    const {sortUserProfile, apiHasCalled} = useSelector(state => state.basicInfo);

    React.useEffect(() => {
        if (!apiHasCalled) {
            dispatch(getBasicInfo())
        }
    }, [])

    return (
        <div>

            <div className="text-left">

                <NavLinkRouter to="/admins/add">
                    <Button className="px-4" size="large" icon={<AddUserPic/>} type="primary">افزودن ادمین جدید </Button>
                </NavLinkRouter>

            </div>
            <div className="d-none d-md-block py-1">
                <span className="square-indicator ">فیلتر ادمین‌ها</span>
                <ListFilters serParams={serParams} myOverseers={myOverseers} setIsModalVisible={setIsModalVisible} resetForm={resetForm}/>
            </div>
            <div className="d-md-none pt-2">
                { (Object.keys(params)?.length > 1) ?
                    <Button className="w-100" type="danger" ghost onClick={() => setResetForm(true)}>
                        حذف فیلتر ادمین‌ها
                    </Button>:
                    <Button className="w-100" type="primary" ghost onClick={() => {
                        setResetForm(false)
                        setIsModalVisible(true)
                    }} >فیلتر
                        ادمین‌ها</Button>

                }
            </div>
            <div className="my-3">
                 <span className="square-indicator ">
                     لیست ادمین‌ها
                     <span className="text-muted mr-2 font-size-sm"> تعداد رکوردها : {listCount} </span>
                </span>
                 <div className="d-flex align-items-end justify-content-between justify-content-md-end w-100">
                    <div className="ml-3 ">
                        <p className="mb-1 small">
                            <span><SortIcon/></span>
                            <span className="pr-2">نمایش براساس</span>
                        </p>
                        <Form.Item
                            style={{minWidth:"150px"}}
                            className="mb-0 small"
                            name="Status"
                        >
                            <Select
                                size="large"
                                // showSearch
                                dropdownClassName="text-right"
                                placeholder="نمایش براساس..."
                                onChange={ value => serParams( state => ({...state, sortUserProfileType: value})) }
                            >
                                {
                                    sortUserProfile?.map((item, index) => (
                                        <Select.Option value={item.value} key={index}>{item.name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <div >
                        <ReportModal params={params}/>
                    </div>
                </div>
            </div>
                
            <div>
                <ListTable params={params} />
            </div>
            <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={[]}>
                <ListFilters serParams={serParams} myOverseers={myOverseers} setIsModalVisible={setIsModalVisible} resetForm={resetForm} />
            </Modal>
        </div>
    )
}

export default AdminsList
