import React from 'react';
import {NavLink as NavLinkRouter, useHistory} from "react-router-dom";


function DontHavePermission(props) {

    const history = useHistory()

    return (
        <div className="content text-center">
            <div className="d-flex justify-content-around">
                <div className="text-center py-3">
                    حساب کاربری شما اجازه دسترسی به این صفحه را ندارد
                </div>
            </div>
            <a className="text-decoration-none" onClick={() => history.goBack()} >
                <span className="link-color"> بازگشت به صفحه قبل </span>
            </a> 
        </div>
    )
}

export default DontHavePermission;