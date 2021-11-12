import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Modal, Tabs} from 'antd';
import {NavLink as NavLinkRouter, useHistory} from "react-router-dom";
import ListFilters from './listFilters';
import ListTable from './listTable';
import {ReactComponent as AddExcelPic} from "../../assets/icons/post_add_black.svg";
import {ReactComponent as AddUserPic} from "../../assets/icons/person_add_alt_1_black.svg";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";


function BlockedUsersList(props) {

    const { TabPane } = Tabs;
    const [params, serParams] = useState({})
    const [myOverseers] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activePane, setActivePane] = useState("1");
    const [resetForm, setResetForm] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const { isLoading } = useSelector(state => state.blockedUsers);

    function callback(key) {
        // console.log(key);
        // setActivePane(key)
        if (!isLoading){
            if (key === "1") history.push("/blockedusers")
            if (key === "2") history.push("/blockedinspectors")
        }
    }

    return (
        <div className="mb-5">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
                <div>
                    <span className="square-indicator ">فیلتر ناظران مسدودی</span>

                </div>
            </div>
            <div className="d-none d-md-block py-1">
                <ListFilters serParams={serParams} myOverseers={myOverseers} setIsModalVisible={setIsModalVisible} resetForm={resetForm}/>
            </div>
            <div className="d-md-none pt-2">
                { (Object.keys(params)?.length > 0) ?
                    <Button className="w-100" type="danger" ghost onClick={() => setResetForm(true)}>
                        حذف فیلتر مسدودی‌ها
                    </Button>:
                    <Button className="w-100" type="primary" ghost onClick={() => {
                        setResetForm(false)
                        setIsModalVisible(true)
                    }} >فیلتر
                        مسدودی‌ها</Button>
                }
            </div>
            <div className="py-1 mt-3">
                <Tabs activeKey={activePane} onChange={callback} unmountInactiveTabs={true} >
                    <TabPane tab="ناظران" key="1">
                        <ListTable params={params} />
                    </TabPane>
                    <TabPane tab="بازرسان" key="2" >
                    </TabPane>
                </Tabs>
            </div>
            <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={[]}>
                <ListFilters serParams={serParams} myOverseers={myOverseers} setIsModalVisible={setIsModalVisible} resetForm={resetForm} />
            </Modal>
        </div>
    )
}

export default BlockedUsersList
