import React from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import {NavLink as NavLinkRouter} from "react-router-dom";
import ListTable from "./listTable";
import {ReactComponent as AddContentPic} from "../../assets/icons/Path 7627.svg";


function CategoriesList() {

    const [form] = Form.useForm();

    return (
        <div>

            <div className="text-left d-flex justify-content-between align-items-center">
                <span className="square-indicator mt-5 ">دسته‌بندی محتواها</span>
                <NavLinkRouter to="/categories/add">
                    <Button className="px-4" size="large" icon={<AddContentPic className="ml-2" />} type="primary">  ایجاد دسته‌بندی جدید   </Button>
                </NavLinkRouter>
            </div>
            <div className=" mt-4">
            </div>
            <div>
                <ListTable />
            </div>
        </div>
    )
}

export default CategoriesList
