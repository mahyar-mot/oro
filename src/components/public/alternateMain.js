import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import HeaderComponent from './header';
import {Layout} from 'antd';
import {ChangeMenu} from "../../redux/pages/menu"
const {Header, Footer, Sider, Content} = Layout;


export default function AlternateMain(props) {
    const dispatch = useDispatch()
    const {isLoggedIn} = useSelector(state => state.auth);
    const {openMenu} = useSelector(state => state.pages);
    const [collapsed, setCollapsed] = useState(openMenu)
    const [isOpenResponsive, setIsOpenResponsive] = useState(false)

    return (

        <Layout className="" style={{height: "100vh"}}>
            
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
                        top: 0
                    }}

                >
                    <HeaderComponent
                        {...props}
                        setIsOpenResponsive={setIsOpenResponsive}
                        // className={`${(!collapsed ? "padding-right-control" : "padding-right-unControl")}`}
                        />
                </Header>

                {/* <Content
                    className={`${(!collapsed ? "padding-right-control" : "padding-right-unControl")}`}
                    style={{
                        transition: "padding .2s",
                        padding: "140px 10px",
                        // paddingRight: isLoggedIn ? (!collapsed ? "300px" : "130px") : 0,
                        // marginRight: isLoggedIn ? "250px" : 0,
                        height: "auto",

                        backgroundColor: "#F8F8F8"
                    }}
                > */}
                    <div className="text-right container mt-5 pt-5" style={{paddingBottom: "100px"}}>
                         {props.children }
                    </div>
                {/* </Content> */}

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
                    <small className="footer-text"> کلیه حقوق این سامانه نزد هیئت مرکزی نظارت بر انتخابات شوراهای اسلامی کشور محفوظ است</small>
                </Footer>
        </Layout>
    )
}
