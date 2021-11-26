import React from 'react';
import { Menu, Dropdown, Typography, Row, Col, Button, Drawer } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import {AiOutlineHeart, AiOutlineSearch, AiOutlineLogout, AiOutlineShopping, AiOutlineUser, } from 'react-icons/ai';
import { BiPhoneCall } from "react-icons/bi";
import { ReactComponent as ProfileLogo } from "../../assets/icons/profile picture.svg";//TODO:delete
import { logOut } from "../../redux/auth"
import { getUserProfile } from "../../redux/auth"
import logo from "../../assets/icons/pic/majles2.svg";//TODO:delete
import menuIcon from "../../assets/icons/pic/menu.svg";//TODO:delete
import logoTop from "../../assets/icons/pic/logoTop.png";//TODO:delete
import { MenuOutlined } from '@ant-design/icons';


const MenuDrawer = (props) => {

    return (
        <Drawer
            destroyOnClose
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={ _ => props.setVisible(false)}
            visible={props.visible}
            key="right"
            bodyStyle={{padding: 0}}
        >
            {props.children}
        </Drawer>
    )
}



export default function HeaderComponent(props) {

    const { isLoggedIn, nationalNumber, userProfile, apiHasCalled } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    const history = useHistory()
    const {className,setIsOpenResponsive}=props

    const [drawerVisible, setDrawerVisible] = React.useState(false);

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

    const MenuContent = (props) => (
        <Menu
            inlineIndent={0}
            style={{borderBottom: 0}}
            mode={ drawerVisible ? "inline" : 'horizontal'}
            // className="justify-content-md-between"
            defaultSelectedKeys={["SubMenu"]}
        >
            <Menu.SubMenu className="px-xl-4 px-lg-2 px-1" key="SubMenu" title="محصولات">
                <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>
            <Menu.SubMenu className="px-xl-4 px-lg-2 px-1" key="SubMenu2" title="کالکشن">
                <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>
            <Menu.SubMenu className="px-xl-4 px-lg-2 px-1" key="SubMenu3" title="کالکشن صورفلکی">
                <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>
            <Menu.Item
                className="px-xl-4 px-lg-2 px-1"
                key={"item3"}
                onClick={() => ("item3")}
            >
                درباره‌ما
            </Menu.Item>
            <Menu.Item
                className="px-xl-4 px-lg-2 px-1"
                key={"item3"}
                onClick={() => ("item3")}
            >
                تماس با ما
            </Menu.Item>
            <Menu.Item
                className="px-xl-4 px-lg-2 px-1"
                key={"item3"}
                onClick={() => ("item3")}
            >
                دانلود اپلیکیشن
            </Menu.Item>
        </Menu>
    )

    return (
        <Row align="middle" style={{height: "100%"}} >
            <Col xl={1} lg={2} md={3} sm={4} xs={4}>
                <div className="d-md-none d-block">
                    <Button 
                        className="border-royal text-royal"
                        icon={<MenuOutlined />}
                        onClick={ _ => setDrawerVisible(true) }
                    />
                </div>
                <Typography.Title id='title-button' level={4}>
                    <a onClick={() => ('')}>My App</a>
                </Typography.Title>
            </Col>
            <Col xl={17} lg={15} md={14} sm={0} xs={0}>
                {
                    drawerVisible ? (
                        <MenuDrawer visible={drawerVisible} setVisible={setDrawerVisible} >
                            <MenuContent />
                        </MenuDrawer>
                    ) : (
                        <MenuContent />
                    )
                }
            </Col>
            <Col xl={6} lg={7} md={7} sm={20} xs={20}>
                <div className="">
                    <Button shape="circle" className="mx-1 bg-oldRoyal" type="primary" icon={<AiOutlineSearch style={{color: "#6261af"}} />} ></Button>
                    <Button shape="circle" className="mx-1 bg-oldRoyal" type="primary" icon={<AiOutlineHeart style={{color: "#6261af"}} />} ></Button>
                    <Button shape="circle" className="mx-1 bg-oldRoyal" type="primary" icon={<AiOutlineShopping style={{color: "#6261af"}} />} ></Button>
                    <Button shape="circle" className="mx-1 bg-oldRoyal" type="primary" icon={<AiOutlineUser style={{color: "#6261af"}} />} ></Button>
                    <Button shape="circle" className="mx-1 bg-oldRoyal" type="primary" icon={<BiPhoneCall style={{color: "#6261af"}} />} ></Button>
                </div>
            </Col>
        </Row>
    )
}
