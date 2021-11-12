import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Modal} from 'antd';
import {NavLink as NavLinkRouter} from "react-router-dom";
import ListFilters from './listFilters';
import ListTable from './listTable';
import {ReactComponent as AddExcelPic} from "../../assets/icons/post_add_black.svg";
import {ReactComponent as AddUserPic} from "../../assets/icons/person_add_alt_1_black.svg";
import {TableResponsive, RowResponsive} from "../public/tableResponsive";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";

function Index(props) {
    const [params, serParams] = useState({})
    const [myOverseers] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const dispatch = useDispatch();
    const {listCount} = useSelector(state => state.listComplaint.list);

    return (
        <div className="mb-5">
            {/*<div className="d-flex flex-wrap align-items-center justify-content-between justify-content-sm-end">*/}
            {/*    <NavLinkRouter to="/complaints/add">*/}
            {/*        <Button className="px-2 mb-3 mb-sm-0" size="large" style={{fontSize: ".9rem"}}*/}
            {/*                type="primary">  ثبت اعتراض جدید </Button>*/}
            {/*    </NavLinkRouter>*/}
            {/*</div>*/}
            <div className="d-none d-md-block py-1">
                <span className="square-indicator ">فیلتر شکایات</span>
                <ListFilters serParams={serParams} myOverseers={myOverseers} setIsModalVisible={setIsModalVisible} resetForm={resetForm}/>
            </div>
            <div className="d-md-none pt-2">
                { (Object.keys(params)?.length > 1) ?
                    <Button className="w-100" type="danger" ghost onClick={() => setResetForm(true)}>
                        حذف فیلتر شکایات
                    </Button>:
                    <Button className="w-100" type="primary" ghost onClick={() => {
                        setResetForm(false)
                        setIsModalVisible(true)
                    }} >فیلتر
                        شکایات</Button>

                }
            </div>
            <div className="py-1 mt-3">
                <div className="d-flex justify-content-between">
                    <span className="square-indicator">
                        لیست شکایات 
                        <span className="text-muted mr-2 font-size-sm"> تعداد رکوردها : {listCount} </span>
                    </span>
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

export default Index
