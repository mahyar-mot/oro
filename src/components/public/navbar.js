import React, {useContext, useEffect} from 'react';
import {NavLink as NavLinkRouter} from "react-router-dom";
import {FaRegUser} from 'react-icons/fa';
import {FiChevronDown} from 'react-icons/fi';
import {AiOutlineLogout} from 'react-icons/ai';
import { Menu, Dropdown } from 'antd';
// import {store} from "../../context/store";
import {fetcher} from "../../utils/common";
// import {USER_LOGGED_OUT, SET_USER_PROFILE_NAME} from "../../context/actionType";
// import {USER_PROFILE} from "../../utils/constants";
import {ReactComponent as Logo} from "../../assets/icons/pic/Logo.svg";
// import userManager from '../../utils/userService';


export default function Navbar() {
    // const {isLoggedIn, userName, dispatch,groups} = useContext(store);

    const onLogout = () => {
        // setTimeout( () => dispatch({type: USER_LOGGED_OUT}), 500)
        // userManager.signoutRedirect()
    }

    const ManagementMenu = (
        <Menu>
            <Menu.Item key="0">
                <NavLinkRouter className="font-size-m font-main-color text-decoration-none p-3" to="/manage/project">
                    تعریف پروژه جدید
                </NavLinkRouter>
            </Menu.Item>
            <Menu.Item key="1">
                <NavLinkRouter className="font-size-m font-main-color text-decoration-none p-3" to="/manage/subject">
                    مدیریت سوژه ها
                </NavLinkRouter>
            </Menu.Item>
            <Menu.Item key="2">
                <NavLinkRouter className="font-size-m font-main-color text-decoration-none p-3" to="/manage/subjects">
                    ساخت سوژه
                </NavLinkRouter>
            </Menu.Item>
            <Menu.Item key="3">
                <NavLinkRouter className="font-size-m font-main-color text-decoration-none p-3" to="/manage/tags">
                    مدیریت تگ ها
                </NavLinkRouter>
            </Menu.Item>
            <Menu.Item key="4">
                <NavLinkRouter className="font-size-m font-main-color text-decoration-none p-3" to="/manage/favoritism">
                    مدیریت ویژگی ها
                </NavLinkRouter>
            </Menu.Item>
            {/* <Menu.Item key="5">
                <NavLinkRouter className="font-size-m font-main-color text-decoration-none p-3" to="/manage/users">
                    مدیریت کاربران
                </NavLinkRouter>
            </Menu.Item> */}
        </Menu>
    );

    const UserMenu = (
        <Menu>
            {/* <Menu.Item key="0">
                <div >
    
                </div>
            </Menu.Item> */}
            <Menu.Item key="1">
                <div className="text-center" syle={{width: '30px'}}>
                    <button className="user-logout-btn"
                            onClick={() => onLogout()}
                    >
                        <span className="font-main-color">
                            <AiOutlineLogout/>
                        </span>
                        <span>خروج</span>
    
                        </button>
                </div>
            </Menu.Item>
        </Menu>
    );

    // useEffect(() => {
    //     if (!Boolean(userName)){
    //         fetcher(USER_PROFILE)
    //         .then( res => {
    //             console.log(res)
    //             dispatch({type: SET_USER_PROFILE_NAME, payload: res.result})
    //         })
    //         .catch( _ => {})
    //     }
    // }, [userName])

    return (
        <>
        <nav className="navbar navbar-expand-lg background-white navbarStyle text-center">

            <div className="container">
                { 
                true && 
                    (
                        <Dropdown overlay={UserMenu} trigger={['click']} >
                            <div className="d-inline-block px-1 py-1 drop-down-style text-center ml-2">
                                <span className="font-main-color">
                                        <FiChevronDown className="text-dark" />
                                </span>

                                <span className="mx-2 font-main-color">
                                    {"userName"}        
                                </span>
                                <span className="bg-white borderSize-1 font-main-color drop-down-style d-inline-block"
                                        style={{width: '28px', height: '28px'}}>
                                    <FaRegUser />
                                </span>
                            </div>
                        </Dropdown>
                    )
                }

                <div className="collapse navbar-collapse mr-2" id="navbarNavAltMarkup">
                    {
                        true && (
                            <div className="navbar-nav ml-auto">
                                {/* <NavLinkRouter className="nav-item nav-link font-size-m  font-main-color" to="/view/tag">
                                    تگ پست ها
                                </NavLinkRouter> */}
                                {/* <span className="nav-item nav-link " >|</span> */}
                                {/* <NavLinkRouter className="nav-item nav-link font-size-m  font-main-color" to="/subject">
                                    مدیریت سوژه ها
                                </NavLinkRouter> */}
                                {/* <span className="nav-item nav-link " >|</span>
                                <NavLinkRouter className="nav-item nav-link font-size-m  font-main-color" to="/project/create">
                                    تعریف پروژه جدید
                                </NavLinkRouter> */}
                                {/* <span className="nav-item nav-link " >|</span> */}
                                <NavLinkRouter className="nav-item nav-link font-size-m  font-main-color" to="/report">
                                    گزارش ها
                                </NavLinkRouter>
                                <span className="nav-item nav-link " >|</span>
                                <NavLinkRouter className="nav-item nav-link font-size-m  font-main-color" to="/view/project">
                                    پروژه‌ها
                                </NavLinkRouter>
                                <span className="nav-item nav-link " >|</span>
                                <Dropdown overlay={ManagementMenu} placement="bottomRight">
                                    <a href="#" className="ant-dropdown-link p-2 font-size-m text-decoration-none font-main-color" onClick={e => e.preventDefault()}>
                                    مدیریت
                                    </a>
                                </Dropdown>
                            </div>
                        )
                    }
                </div>
                <span className="navbar-brand font-main-color font-weight-bold">
                    <NavLinkRouter to="/">
                        <Logo style={{maxHeight: "80px"}} />
                    </NavLinkRouter>
                </span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>

        </>
    )
}
