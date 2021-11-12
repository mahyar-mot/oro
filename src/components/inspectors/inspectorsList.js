import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Col, Form, Modal, Row, Select} from 'antd';
import {NavLink as NavLinkRouter, useLocation} from "react-router-dom";
import ListFilters from './listFilters';
import ListTable from './listTable';
import {ReactComponent as AddExcelPic} from "../../assets/icons/post_add_black_24dp.svg";
import {ReactComponent as AddUserPic} from "../../assets/icons/person_add_alt_1_black.svg";
import {ReactComponent as SortIcon} from "../../assets/icons/sort.svg";
import {ReactComponent as ReportIcon} from "../../assets/icons/description_black_24dp.svg";
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import classNames from "classnames";
import {getTokenClaims, getUserProfile} from '../../redux/auth';
import {useDispatch, useSelector} from "react-redux";
import {Querys} from '../../utils/utils';
import ReportModal from "./reportModal";
import { getBasicInfo } from '../../redux/basicInfos';
// import {useTokenClaims} from "../public/hooks";

const SortFilter = [
    {name: "جدیدترین", value: 1},
    {name: "حروف الفبا", value: 2},
]

function InspectorsList(props) {

    const [params, serParams] = useState({})
    const [myOverseers, serMyOverseers] = useState({getOwnInspectors: false})
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const {countryDivisionCode, isLoggedIn, nationalNumber} = useSelector(state => state.auth);
    // const { countryDivisionCode } = useTokenClaims()
    const {listCount} = useSelector(state => state.inspector.list);
    const dispatch = useDispatch();

    function onChange(checkedValues) {
        serParams({...params, getOwnInspectors: checkedValues.target.checked})
        serMyOverseers({getOwnInspectors: checkedValues.target.checked})
    }

    const {sortUserProfile, apiHasCalled} = useSelector(state => state.basicInfo);

    useEffect(() => {
        if (!apiHasCalled) {
            dispatch(getBasicInfo())
        }
    }, [])

    useEffect(() => {
        // dispatch(getTokenClaims())
    }, [])

    return (
        <div className="mb-5">
            <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-sm-end">
                {/* <NavLinkRouter to="/inspectors/excel">
                    <Button size="large" type="text" icon={<AddExcelPic/>}
                            style={{backgroundColor: "#fff", fontSize: ".9rem"}}
                            className="ml-2 px-2  mb-3 mb-sm-0 text-success border-success">افزودن بازرسان از فایل اکسل</Button>
                </NavLinkRouter> */}
                <NavLinkRouter to="/inspectors/add">
                    <Button className="px-2 mb-3 mb-sm-0" size="large" style={{fontSize: ".9rem"}} icon={<AddUserPic/>}
                            type="primary">افزودن دستی بازرسان </Button>
                </NavLinkRouter>
            </div>
            <div className="d-none d-md-block py-1">
                <span className="square-indicator ">فیلتر بازرسان</span>
                <ListFilters serParams={serParams} myOverseers={myOverseers} setIsModalVisible={setIsModalVisible}
                             resetForm={resetForm} countryDivisionCode={countryDivisionCode}/>
            </div>
            <div className="d-md-none pt-2">
                {(Object.keys(params)?.length > 1) ?
                    <Button className="w-100" type="danger" ghost onClick={() => setResetForm(true)}>
                        حذف فیلتر بازرسان
                    </Button> :
                    <Button className="w-100" type="primary" ghost onClick={() => {
                        setResetForm(false)
                        setIsModalVisible(true)
                    }}>فیلتر
                        بازرسان</Button>

                }
            </div>
            <div className="py-1 mt-3">


                          <span className="square-indicator">
                        لیست بازرسان
                        <span className="text-muted mr-2 font-size-sm"> تعداد رکوردها : {listCount} </span>
                    </span>


                <div className="d-flex justify-content-between flex-column flex-md-row align-items-md-end ">
                    <div className="pl-3 my-3 my-md-0 w-100">
                        <Checkbox
                            defaultChecked={false}
                            onChange={onChange}
                        ><span>فقط نمایش بازرسان من</span></Checkbox>
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
                        <div >
                            <ReportModal params={params}/>
                        </div>
                    </div>
                </div>
                <div>
                    <ListTable params={params}/>
                </div>
            </div>
            <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={[]}>
                <ListFilters serParams={serParams} myOverseers={myOverseers} setIsModalVisible={setIsModalVisible}
                             resetForm={resetForm} countryDivisionCode={countryDivisionCode}/>
            </Modal>
        </div>
    )
}

export default InspectorsList
