import React, {useContext, useState} from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import classnames from "classnames";
import Navbar from './navbar';
import Breadcrumb from './breadcrumb';
import HeaderComponent from './header';
import FooterComponent from './footer';
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
    };

    return (
        // <>
        //     <Navbar />
        //     { isLoggedIn ? <Breadcrumb  crumbs={props.crumbs}/> : ''}
        //     <div className="container text-right">
        //         { isLoggedIn || (props.children[1].type?.displayName === "Login") ? props.children : <Redirect to="/login" /> }
        //     </div>
        // </>

        <Layout className="" style={{height: "100vh"}}>
            {/* {
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
            } */}

            <Layout className="">
                <div/>
                <Header
                    className="px-xl-5 px-4"
                    style={{
                        transition: "padding .2s",
                        width: "100%",
                        zIndex: "1",
                        backgroundColor: "white",
                        // position: "fixed",
                        // top: 0,
                        height: "110px"
                    }}
                >
                    <HeaderComponent
                        {...props}
                        setIsOpenResponsive={setIsOpenResponsive}
                        // className={`${(!collapsed ? "padding-right-control" : "padding-right-unControl")}`}
                    />
                </Header>

                {/* {isLoggedIn ? <Breadcrumb crumbs={props.crumbs}
                                          className={`${(!collapsed ? "padding-right-control" : "padding-right-unControl")}`}
                /> : ''} */}
                <div>
                    <Content
                        style={{
                            transition: "padding .2s",
                            padding: "140px 0",
                            height: "auto",
                            minHeight: "100vh",
                            backgroundColor: "white",

                        }}
                    >
                        <div className="text-right p-0 px-xl-5 px-0 py-xl-0" style={{paddingBottom: "100px"}}>
                            {isLoggedIn || (props.children[1].type?.displayName === "Login") ? props.children :
                                <Redirect to="/login"/>}
                        </div>
                    </Content>
                </div>
                <Footer
                    className="px-xl-5 px-4"
                        className="bg-white text-right"
                >
                    <FooterComponent />
                </Footer>
            </Layout>
        </Layout>

    )
}
