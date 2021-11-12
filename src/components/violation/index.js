import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Modal, Tabs} from 'antd';
import {NavLink as NavLinkRouter, useHistory} from "react-router-dom";
import ListFilters from './MylistFilters';
import ListTable from './listTable';
import {ReactComponent as AddExcelPic} from "../../assets/icons/post_add_black.svg";
// import {ReactComponent as AddUserPic} from "../../assets/icons/person_add_alt_1_black.svg";
import {ReactComponent as AddViolation} from "../../assets/icons/plus.svg";
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import AllList from "./AllList";
import MyList from "./MyList";
import PeopleList from "./peopleList";
import { useTokenClaims } from '../public/hooks';

function Index(props) {
    const [params, serParams] = useState({})
    const [myOverseers] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const [activePane, setActivePane] = useState("1");
    const dispatch = useDispatch();
    const history = useHistory();
    const {TabPane} = Tabs;
    const {countryDivisionCode, isLoggedIn, nationalNumber} = useSelector(state => state.auth);

    const {roles = []} = useTokenClaims()

    function callback(key) {
        // console.log(key);
        // setActivePane(key)
        if (key === "2") history.push("/peopleviolations")
        if (key === "3") history.push("/allviolations")
        if (key === "4") history.push("/inspectorviolations")
    }

    return (
        <div className="mb-5">
            {/*<div className="d-flex flex-wrap align-items-center justify-content-between justify-content-sm-end">*/}
            {/*    <NavLinkRouter to="/complaints/add">*/}
            {/*        <Button className="px-2 mb-3 mb-sm-0" size="large" style={{fontSize: ".9rem"}}*/}
            {/*                type="primary">  ثبت اعتراض جدید </Button>*/}
            {/*    </NavLinkRouter>*/}
            {/*</div>*/}

            <div className="d-flex w-100 align-items-center justify-content-between ">
                <div className="square-indicator ">لیست تخلفات</div>
                <div>
                    <NavLinkRouter to="/violations/add/new">
                        <Button className="px-2 mb-3 mb-sm-0" size="large" style={{fontSize: ".9rem"}}
                                icon={<AddViolation/>}
                                type="primary">
                            <span className="mr-2">ثبت تخلف جدید</span></Button>
                    </NavLinkRouter>
                </div>
            </div>
            <div className="d-none d-md-block py-1">
                <ListFilters isDisabled={true} serParams={serParams} myOverseers={myOverseers} setIsModalVisible={setIsModalVisible}
                             resetForm={resetForm} countryDivisionCode={countryDivisionCode}/>
            </div>
            {/*<div className="d-md-none pt-2">*/}
            {/*    {(Object.keys(params)?.length > 0) ?*/}
            {/*        <Button className="w-100" type="danger" ghost onClick={() => setResetForm(true)}>*/}
            {/*            حذف فیلتر داوطلبان*/}
            {/*        </Button> :*/}
            {/*        <Button className="w-100" type="primary" ghost onClick={() => {*/}
            {/*            setResetForm(false)*/}
            {/*            setIsModalVisible(true)*/}
            {/*        }}>فیلتر*/}
            {/*            داوطلبان</Button>*/}

            {/*    }*/}
            {/*</div>*/}
            <div className="py-1 mt-3">

                <Tabs activeKey={activePane} onChange={callback} unmountInactiveTabs={true} >
                    <TabPane tab="گزارش‌های من" key="1">
                        {activePane==="1" && <MyList params={params} />}
                    </TabPane>
                    {
                        roles.includes("5.8") && (
                            <TabPane tab="گزارش‌های مردمی" key="2" >
                                {/* {activePane==="2" && <PeopleList params={params} />} */}
                            </TabPane>
                        )
                    }
                    {
                        roles.includes("5.1") && (
                            <TabPane tab=" گزارش‌های ناظران " key="3">
                                {/* {activePane==="3" && <AllList params={params} />} */}
                            </TabPane>
                        )
                    }
                    {
                        roles.includes("5.13") && (
                            <TabPane tab="گزارش‌های بازرسان" key="4">
                                {/* {activePane==="1" && <MyList params={params} />} */}
                            </TabPane>
                        )
                    }
                </Tabs>
                {/*<div className="d-flex justify-content-between">*/}
                {/*    <span className="square-indicator">لیست داوطلبان  </span>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <ListTable params={params} />*/}
                {/*</div>*/}
            </div>
            <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={[]}>
                <ListFilters isDisabled={true} serParams={serParams} myOverseers={myOverseers} setIsModalVisible={setIsModalVisible}
                             resetForm={resetForm}/>
            </Modal>
        </div>
    )
}

export default Index
