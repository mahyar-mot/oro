import React from 'react';
import { Menu, Dropdown } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import {FiChevronDown} from 'react-icons/fi';
import {AiOutlineLogout} from 'react-icons/ai';
import { ReactComponent as ProfileLogo } from "../../assets/icons/profile picture.svg";
import { logOut } from "../../redux/auth"
import { getUserProfile } from "../../redux/auth"
import logo from "../../assets/icons/pic/majles2.svg";
import menuIcon from "../../assets/icons/pic/menu.svg";
import logoTop from "../../assets/icons/pic/logoTop.png";


export default function HeaderComponent(props) {

    const { isLoggedIn, nationalNumber, userProfile, apiHasCalled } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    const history = useHistory()
    const {className,setIsOpenResponsive}=props

    React.useEffect( () => {
        if (props.loginRequired){
            if (Object.keys(userProfile).length === 1 && !apiHasCalled ){
                setTimeout( () => dispatch(getUserProfile(nationalNumber)), 1000)
            }
        }
    },[])

    const UserMenu = (
        <Menu>
            {/* <Menu.Item key="0">
                <div >
    
                </div>
            </Menu.Item> */}
            {
                userProfile?.stateType === 2 && (
                    <Menu.Item key="1" onClick={() => history.push('/waitinguser')} >
                        <div className="text-center" style={{width: '30px'}}>
                            <button className="user-logout-btn">
                                <span>اطلاعات کاربری</span>
            
                                </button>
                        </div>
                    </Menu.Item>
            )}
            <Menu.Item key="2" onClick={() => dispatch(logOut())}>
                <div className="text-center" style={{width: '30px'}}>
                    <button className="user-logout-btn">
                        <span className="font-main-color">
                            <AiOutlineLogout/>
                        </span>
                        <span>خروج</span>
    
                        </button>
                </div>
            </Menu.Item>
        </Menu>
    )

    return (
        <div className="d-flex justify-content-between" >
            {/*{React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {*/}
            {/*    className: 'trigger',*/}
            {/*    onClick: this.toggle,*/}
            {/*})}*/}


            <div className="text-center d-lg-none" >
                    <img src={menuIcon} style={{width:'20px',transition:"all .2s",cursor:"pointer"}} className={`img-fluid`} onClick={()=>setIsOpenResponsive(true)}
                         alt=""/>
                <img src={logo} className="img-fluid mr-2" style={{maxWidth:"40px"}} alt=""/>

            </div>
                <p className="text-right d-none d-lg-block">
                    <img src={logoTop} className="img-fluid " style={{maxWidth:"350px"}} alt=""/>

                    <small className="text-muted">(نسخه آزمایشی)</small></p>

            {
                isLoggedIn && (
                    <div>
                        <Dropdown overlay={UserMenu} trigger={['click']} >
                            <div className="d-inline-block text-center ml-2 pointer">

                                <span className="bg-white font-main-color d-inline-block"
                                        style={{width: '28px', height: '28px'}}>
                                    <ProfileLogo />
                                </span>
                                <span className="mx-2">
                                    { userProfile.name && userProfile.surname ? `${userProfile.name} ${userProfile.surname}` :nationalNumber}        
                                </span>
                                <span className="font-main-color">
                                        <FiChevronDown className="text-dark" />
                                </span>
                            </div>
                        </Dropdown>
                    </div>
                )
            }
        </div>
    )
}
