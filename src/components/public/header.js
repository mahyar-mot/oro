import React from 'react';
import { Menu, Dropdown, Typography, Row, Col, Button, Drawer } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import {AiOutlineHeart, AiOutlineSearch, AiOutlineLogout, AiOutlineShopping, AiOutlineUser, } from 'react-icons/ai';
import { BiPhoneCall } from "react-icons/bi";
import { ReactComponent as ProfileLogo } from "../../assets/icons/profile picture.svg";//TODO:delete
import { logOut } from "../../redux/auth"
import { getUserProfile } from "../../redux/auth"
import { ReactComponent as Logo } from "../../assets/icon/logo.svg";//TODO:delete
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
            style={{borderBottom: 0}}
            mode={ drawerVisible ? "inline" : 'horizontal'}
            defaultSelectedKeys={["SubMenu"]}
        >
            <Menu.SubMenu className="pl-xl-4 pl-lg-2 pl-1" key="SubMenu" title="محصولات">
                <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>
            <Menu.SubMenu className="pl-xl-4 pl-lg-2 pl-1" key="SubMenu2" title="کالکشن">
                <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>
            <Menu.SubMenu className="pl-xl-4 pl-lg-2 pl-1" key="SubMenu3" title="کالکشن صورفلکی">
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
                className="pl-xl-4 pl-lg-2 pl-1"
                key={"item3"}
                onClick={() => ("item3")}
            >
                درباره‌ما
            </Menu.Item>
            <Menu.Item
                className="pl-xl-4 pl-lg-2 pl-1"
                key={"item3"}
                onClick={() => ("item3")}
            >
                تماس با ما
            </Menu.Item>
            <Menu.Item
                className="pl-xl-4 pl-lg-2 pl-1"
                key={"item3"}
                onClick={() => ("item3")}
            >
                دانلود اپلیکیشن
            </Menu.Item>
        </Menu>
    )

    return (
        <Row align="middle" style={{height: "100%"}} >
            <Col xl={2} lg={3} md={3} sm={7} xs={7} >
                <div className="d-flex justify-content-between align-items-center">
                    <Button 
                        className="border-royal text-royal d-md-none d-inline-block"
                        icon={<MenuOutlined />}
                        onClick={ _ => setDrawerVisible(true) }
                    />
                    <Logo />
                </div>
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
            <Col xl={5} lg={6} md={7} sm={17} xs={17}>
                <div className="">
                    <Button shape="circle" className="mx-1 bg-oldRoyal text-royal" style={{borderColor: "#AE8EDA"}} type="primary" icon={<AiOutlineSearch style={{color: "#9365CD"}} />} ></Button>
                    <Button shape="circle" className="mx-1 bg-oldRoyal text-royal" style={{borderColor: "#AE8EDA"}} type="primary" icon={<AiOutlineHeart style={{color: "#9365CD"}} />} ></Button>
                    <Button shape="circle" className="mx-1 bg-oldRoyal text-royal" style={{borderColor: "#AE8EDA"}} type="primary" icon={<AiOutlineShopping style={{color: "#9365CD"}} />} ></Button>
                    <Button shape="circle" className="mx-1 bg-oldRoyal text-royal" style={{borderColor: "#AE8EDA"}} type="primary" icon={<AiOutlineUser style={{color: "#9365CD"}} />} ></Button>
                    <Button shape="circle" className="mx-1 bg-oldRoyal text-royal" style={{borderColor: "#AE8EDA"}} type="primary" icon={<BiPhoneCall style={{color: "#9365CD"}} />} ></Button>
                </div>
            </Col>
        </Row>
    )
}
