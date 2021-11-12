import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Form, Modal, Select} from 'antd';
import {NavLink as NavLinkRouter} from "react-router-dom";
import ListFilters from './listFilters';
import ListTable from './listTable';
import {ReactComponent as AddExcelPic} from "../../assets/icons/post_add_black.svg";
import {ReactComponent as AddUserPic} from "../../assets/icons/person_add_alt_1_black.svg";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {ReactComponent as SortIcon} from "../../assets/icons/sort.svg";
import ReportModal from "../overseers/reportModal";


function Cart(props) {

    const [params, serParams] = useState({})
    const [myOverseers] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const dispatch = useDispatch();
    const {sortUserProfile, apiHasCalled} = useSelector(state => state.basicInfo);
    const {  listCount} = useSelector(state => state.carts.list);
    return (
        <div className="mb-5">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
                <div>
                    <span className="square-indicator ">فیلتر کاربران </span>

                </div>
            </div>
            <div className="d-none d-md-block py-1">
                <ListFilters serParams={serParams} myOverseers={myOverseers} setIsModalVisible={setIsModalVisible} resetForm={resetForm}/>
            </div>
            <div className="d-md-none pt-2">
                { (Object.keys(params)?.length > 0) ?
                    <Button className="w-100" type="danger" ghost onClick={() => setResetForm(true)}>
                        حذف فیلتر کاربران
                    </Button>:
                    <Button className="w-100" type="primary" ghost onClick={() => {
                        setResetForm(false)
                        setIsModalVisible(true)
                    }} >فیلتر
                        کاربران</Button>
                }
            </div>
            <div className="py-1 mt-3">
                <div className="d-flex justify-content-between">
                    <span className="square-indicator">
                        چاپ کارت
                        <span className="text-muted mr-2 font-size-sm"> تعداد رکوردها : {listCount} </span>
                    </span>
                </div>
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
                </div>
                <div>
                    <ListTable params={params} />
                </div>
            </div>
            <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={[]}>
                <ListFilters serParams={serParams} myOverseers={myOverseers} setIsModalVisible={setIsModalVisible} resetForm={resetForm} />
            </Modal>
        </div>
    )
}

export default Cart
