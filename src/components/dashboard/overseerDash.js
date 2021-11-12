import React from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { NavLink as NavLinkRouter } from "react-router-dom";


function OverSeerDashboard(props) {

    const {nationalNumber} = useSelector( state => state.auth);

    return (
        <div className="content">
            <div className="d-flex justify-content-around">
                <div className="text-center py-3">
                    خدمت کننده گرامی خوش آمدید
                    <div className="my-2 py-2 " style={{lineHeight:"1.8rem"}}>
                        لطفا برای عضویت در سامانه نظارت بر انتخابات شوراهای کشور فرم ثبت نام را پر کرده و تا تایید مشخصات منتظر بمانید
                    </div>
                    <NavLinkRouter to={`/newUser/${nationalNumber}`} >
                        <Button type="primary">تکمیل فرم ثبت نام</Button>
                    </NavLinkRouter>
                </div>
            </div>
        </div>
    )
}

export default OverSeerDashboard
