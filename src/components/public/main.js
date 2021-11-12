import React, {useContext, useState} from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import classnames from "classnames";
import Navbar from './navbar';
import Breadcrumb from './breadcrumb';
import HeaderComponent from './header';
import SiderComponent from './sider';
import backgroundIcon from "../../assets/icons/pic/background.jpg"
import {Layout} from 'antd';
import {ChangeMenu} from "../../redux/pages/menu"
import Support from "./support";

const {Header, Footer, Sider, Content} = Layout;


export default function Main(props) {
    const dispatch = useDispatch()
    const {isLoggedIn} = useSelector(state => state.auth);
    const {openMenu} = useSelector(state => state.pages);
    const [collapsed, setCollapsed] = useState(openMenu)
    const [isOpenResponsive, setIsOpenResponsive] = useState(false)
    const toggle = () => {
        let t = !collapsed;
        dispatch(ChangeMenu(t))
        setCollapsed(t)
        // console.log("!collapsed",!collapsed)

    };
    // console.log( dispatch(ChangeMenu(false)))
    return (
        // <>
        //     <Navbar />
        //     { isLoggedIn ? <Breadcrumb  crumbs={props.crumbs}/> : ''}
        //     <div className="container text-right">
        //         { isLoggedIn || (props.children[1].type?.displayName === "Login") ? props.children : <Redirect to="/login" /> }
        //     </div>
        // </>

        <Layout className="" style={{height: "100vh", backgroundColor: "#F8F8F8"}}>
            {
                isLoggedIn ? (
                    <Sider
                        collapsedWidth="82px"
                        width="250px"
                        className={`border-left ${isOpenResponsive ? "sidebar-control-responsive" : "sidebar-unControl-responsive"}  `}
                        trigger={null} collapsible collapsed={collapsed}
                        theme="light"
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            zIndex: "101",
                            right: 0,
                        }}
                    >
                        <SiderComponent collapsed={collapsed} toggle={toggle}/>
                    </Sider>) : ''
            }

            <Layout className="">
                <div className={`menu-close ${isOpenResponsive && "menu-close-open"}`}
                     onClick={() => setIsOpenResponsive(false)}/>
                <Header

                    className={`border-bottom sidebar-responsive ${(!collapsed ? "padding-right-control" : "padding-right-unControl")}`}
                    style={{
                        // width: isLoggedIn ? "89%" : "100%",
                        // paddingRight:(!collapsed ? "0px" : "80px"),
                        transition: "padding .2s",
                        // paddingRight: isLoggedIn ? (!collapsed ? "300px" : "130px") : 0,
                        width: "100%",
                        zIndex: "1",
                        backgroundColor: "white",
                        // marginRight: isLoggedIn ? "250px" : 0,
                        position: "fixed",
                        top: 0,
                    }}

                >
                    <HeaderComponent
                        {...props}
                        setIsOpenResponsive={setIsOpenResponsive}
                        // className={`${(!collapsed ? "padding-right-control" : "padding-right-unControl")}`}
                    />
                </Header>

                {isLoggedIn ? <Breadcrumb crumbs={props.crumbs}
                                          className={`${(!collapsed ? "padding-right-control" : "padding-right-unControl")}`}
                /> : ''}
                <div className="style-image-background" style={{backgroundImage: `url(${backgroundIcon})`}}>
                    <Content
                        className={`${(!collapsed ? "padding-right-control" : "padding-right-unControl")}`}
                        style={{
                            transition: "padding .2s",
                            padding: "140px 10px",
                            // paddingRight: isLoggedIn ? (!collapsed ? "300px" : "130px") : 0,
                            // marginRight: isLoggedIn ? "250px" : 0,
                            height: "auto",
                            minHeight: "100vh",
                            backgroundColor: "transparent",

                        }}
                    >
                        <div className="text-right p-0 px-xl-4 py-xl-0" style={{paddingBottom: "100px"}}>
                            {isLoggedIn || (props.children[1].type?.displayName === "Login") ? props.children :
                                <Redirect to="/login"/>}
                        </div>
                    </Content>
                </div>
                <Footer style={{
                    // width: isLoggedIn ? "89%" : "100%",
                    // paddingRight: isLoggedIn ? (!collapsed ? "300px" : "130px") : 0,
                    width: "100%",
                    fontColor: "#1456A8",
                    // marginRight: isLoggedIn ? "250px" : 0, 
                    position: 'fixed',
                    bottom: 0
                }}
                        className={`text-center bg-white py-3 font-main-color ${(!collapsed ? "padding-right-control" : "padding-right-unControl")}`}
                >
                    <small className="footer-text">کلیه حقوق این سامانه نزد هیئت مرکزی نظارت بر انتخابات شوراهای اسلامی
                        کشور
                        محفوظ است


                    </small>

                </Footer>
            </Layout>
        </Layout>

    )
}
