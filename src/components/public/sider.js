import React, {useEffect} from 'react';
import {Badge, Menu} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {NavLink as NavLinkRouter} from "react-router-dom";
// import {ReactComponent as Logo} from "../../assets/icons/pic/majles.svg";
// import { ChangeActiveSelectedKey, getDashboardStats } from "../../redux/pages/menu";
// import { getContentsCount } from "../../redux/contents/contentsList";
import logo from "../../assets/icons/pic/majles.svg";
import {ReactComponent as DashLogo} from "../../assets/icons/dashboard.svg";
import {ReactComponent as ReportLogo} from "../../assets/icons/flag_black.svg";
import {ReactComponent as ContentLogo} from "../../assets/icons/inventory_black.svg";
import {ReactComponent as AdminLogo} from "../../assets/icons/manage_accounts_black.svg";
import {ReactComponent as NazeranLogo} from "../../assets/icons/people_black.svg";
import {ReactComponent as ComplaintLogo} from "../../assets/icons/people_outline-24px.svg";
import {ReactComponent as ViolationIcon} from "../../assets/icons/report_problem_black_24dp.svg";
import {ReactComponent as MonitoringIcon} from "../../assets/icons/monitoring.svg";
import {ReactComponent as DownloadIcon} from "../../assets/icons/download_for_offline_black_24dp (1).svg"
import {ReactComponent as CartIcon} from "../../assets/icons/assignment_ind_black_24dp.svg"
import { AppstoreOutlined, HomeOutlined } from '@ant-design/icons';
import {MdBlock} from "react-icons/md";
import {FaRegEnvelope} from "react-icons/fa"
import menuIcon from "../../assets/icons/pic/next.svg";
import { useTokenClaims } from './hooks';


function SiderComponent(props) {

    const {toggle,collapsed}=props

    const {activeSelectedKey, activeOpenKeys, dashboardStats, dashboardStatsCallTime} = useSelector( state => state.pages);
    const dispatch = useDispatch();
    const {hasContent} = useSelector(state => state.content.list)
    const {roles = []} = useTokenClaims()

    React.useEffect( () => {
        let now = Date.now() / 1000 | 0;
        if (now - dashboardStatsCallTime > 120){
            // dispatch(getDashboardStats())
        }
    }, [activeSelectedKey])

    return (
        <div className="h-100 d-flex flex-column justify-content-between">
        <div className="main-sidebar ">
            <div className="text-center" style={{height: "64px", backgroundColor: "#009788"}}>
                <img src={logo} className="img-fluid" alt=""/>
            </div>
            {/* <div>
                <Menu mode="inline"
                    defaultSelectedKeys={[activeSelectedKey]}
                    defaultOpenKeys={activeOpenKeys}
                >
                     <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="1" icon={  <DashLogo className="pl-2" />}>
                        <NavLinkRouter className="text-decoration-none" onClick={ () => dispatch(ChangeActiveSelectedKey("1"))} to="/cartable">
                            <span>کارتابل</span>
                        </NavLinkRouter>
                    </Menu.Item>

                    {
                        roles.includes("1.1") && (
                            <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="2"  icon={  <NazeranLogo className="pl-2" />}>
                                <NavLinkRouter className="text-decoration-none" onClick={ () => dispatch(ChangeActiveSelectedKey("2"))} to="/overseers">
                                    <span>ناظران</span>
                                </NavLinkRouter>
                            </Menu.Item>
                        )
                    }
                    {
                        roles.includes("1.21") && (
                            <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="20"  icon={  <NazeranLogo className="pl-2" />}>
                                <NavLinkRouter className="text-decoration-none" onClick={ () => dispatch(ChangeActiveSelectedKey("20"))} to="/inspectors">
                                    <span>بازرسان</span>
                                </NavLinkRouter>
                            </Menu.Item>
                        )
                    }
                    {
                        (roles.includes("2.3") || roles.includes("2.8") ) && (
                            <Menu.SubMenu key="sub1" icon={[
                                dashboardStats?.content ? <Badge key={0} dot /> : null,
                                <ContentLogo key={1} className="pl-2" />
                            ]} title="محتوا" >
                                {
                                    roles.includes("2.3") && (
                                        <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="5">
                                            <NavLinkRouter onClick={ () => dispatch(ChangeActiveSelectedKey("5"))} className="text-decoration-none" to="/contents">
                                                <span >لیست محتوا</span>
                                            </NavLinkRouter>
                                        </Menu.Item>
                                    )
                                }
                                {
                                    roles.includes("2.8") && (
                                        <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="6">
                                            <NavLinkRouter onClick={ () => dispatch(ChangeActiveSelectedKey("6"))} className="text-decoration-none" to="/categories">
                                                <span>دسته‌بندی محتوا</span>
                                            </NavLinkRouter>
                                        </Menu.Item>
                                    )
                                }
                            </Menu.SubMenu>
                        )
                    }
                    {
                        roles.includes("4.1") && (
                            <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="9"  icon={  <NazeranLogo className="pl-2" />}>
                                <NavLinkRouter className="text-decoration-none" onClick={ () => dispatch(ChangeActiveSelectedKey("9"))} to="/candidates">
                                    <span>داوطلبان</span>
                                </NavLinkRouter>
                            </Menu.Item>
                        )
                    }
                    {
                        roles.includes("3.1") && (
                            <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="8"  icon={  <ComplaintLogo className="pl-2" />}>
                                <NavLinkRouter className="text-decoration-none" onClick={ () => dispatch(ChangeActiveSelectedKey("8"))} to="/list-complaints">
                                    <span>شکایات مردمی</span>
                                </NavLinkRouter>
                            </Menu.Item>
                        )
                    }

                        <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="12" icon={<ViolationIcon className="pl-2" />}>
                            <NavLinkRouter onClick={ () => dispatch(ChangeActiveSelectedKey("12"))} className="text-decoration-none" to="/violations">
                                <span >لیست تخلفات</span>
                            </NavLinkRouter>
                        </Menu.Item>

                    {
                        (roles.includes("1.7") || roles.includes("1.25") || roles.includes("5.11") || roles.includes("1.8") || roles.includes("5.12") ) && (
                            <Menu.SubMenu key="sub2" icon={<MonitoringIcon className="pl-2" />} title="  گزارشات">
                                <Menu.SubMenu key="sub2-1" title="گزارش">
                                {
                                    roles.includes("1.8") && (
                                        <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="3" >
                                            <NavLinkRouter onClick={ () => dispatch(ChangeActiveSelectedKey("3"))} className="text-decoration-none" to="/reports">
                                                <span>گزارش تایید/عدم تایید</span>
                                            </NavLinkRouter>
                                        </Menu.Item>
                                    )
                                }
                                {
                                    roles.includes("1.10") && (
                                        <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="16">
                                            <NavLinkRouter onClick={ () => dispatch(ChangeActiveSelectedKey("16"))} className="text-decoration-none" to="/monitoring/overseers/table">
                                                <span >جدول مانیتورینگ ناظران</span>
                                            </NavLinkRouter>
                                        </Menu.Item>
                                    )
                                }
                                {
                                    roles.includes("1.25") && (
                                        <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="22">
                                            <NavLinkRouter onClick={ () => dispatch(ChangeActiveSelectedKey("22"))} className="text-decoration-none" to="/monitoring/inspectors/table">
                                                <span >جدول مانیتورینگ بازرسان</span>
                                            </NavLinkRouter>
                                        </Menu.Item>
                                    )
                                }
                                </Menu.SubMenu>

                                <Menu.SubMenu key="sub2-2"  title=" مانیتورینگ">
                                {
                                    roles.includes("1.7") && (
                                        <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="10">
                                            <NavLinkRouter onClick={ () => dispatch(ChangeActiveSelectedKey("10"))} className="text-decoration-none" to="/monitoring/overseers">
                                                <span >مانیتورینگ ناظران</span>
                                            </NavLinkRouter>
                                        </Menu.Item>
                                    )
                                }
                                {
                                    roles.includes("5.11") && (
                                        <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="11">
                                            <NavLinkRouter onClick={ () => dispatch(ChangeActiveSelectedKey("11"))} className="text-decoration-none" to="/monitoring/violations">
                                                <span> مانیتورینگ تخلفات</span>
                                            </NavLinkRouter>
                                        </Menu.Item>
                                    )
                                }
                                {
                                    roles.includes("5.12") &&
                                    <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="17">
                                        <NavLinkRouter onClick={ () => dispatch(ChangeActiveSelectedKey("17"))} className="text-decoration-none" to="/picturize/violation">
                                            <span >مانیتورینگ تصویری تخلفات</span>
                                        </NavLinkRouter>
                                    </Menu.Item>
                                }
                                </Menu.SubMenu>
                            </Menu.SubMenu>
                        )
                    }
                    {
                        (roles.includes("7.1") || roles.includes("7.6") || roles.includes("7.10") ) && (
                            <Menu.SubMenu key="sub4" icon={<HomeOutlined className="pl-2" />} title="مدیریت شعب">
                                {
                                    roles.includes("7.1") && (
                                        <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="23" >
                                            <NavLinkRouter className="text-decoration-none" onClick={ () => dispatch(ChangeActiveSelectedKey("23"))} to="/branches">
                                                <span>لیست شعب</span>
                                            </NavLinkRouter>
                                        </Menu.Item>
                                    )
                                }
                                {
                                    roles.includes("7.6") && (
                                        <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="21" >
                                            <NavLinkRouter className="text-decoration-none" onClick={ () => dispatch(ChangeActiveSelectedKey("21"))} to="/headoverseers">
                                                <span>لیست سرناظران</span>
                                            </NavLinkRouter>
                                        </Menu.Item>
                                    )
                                }
                                {
                                    roles.includes( "7.10" ) && (
                                        <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="24" >
                                            <NavLinkRouter className="text-decoration-none" onClick={ () => dispatch(ChangeActiveSelectedKey("24"))} to="/rollcalls">
                                                <span>حضور و غیاب</span>
                                            </NavLinkRouter>
                                        </Menu.Item>
                                    )
                                }
                                {
                                    roles.includes( "7.20" ) && (
                                        <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="25">
                                            <NavLinkRouter className="text-decoration-none" onClick={ () => dispatch(ChangeActiveSelectedKey("25"))} to="/branchinspectors">
                                                <span>لیست بازرسان شعب</span>
                                            </NavLinkRouter>
                                        </Menu.Item>
                                    )
                                }
                                {
                                    roles.includes("8.1") && (
                                        <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="26">
                                            <NavLinkRouter className="text-decoration-none" onClick={ () => dispatch(ChangeActiveSelectedKey("26"))} to="/proceedings">
                                                <span>صورتجلسات</span>
                                            </NavLinkRouter>
                                        </Menu.Item>
                                    )
                                }
                            </Menu.SubMenu>
                        )
                    }
                    {
                        roles.includes("1.6") && (
                            <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="4"  icon={ <AdminLogo className="pl-2" />}>
                                <NavLinkRouter onClick={ () => dispatch(ChangeActiveSelectedKey("4"))} className="text-decoration-none" to="/admins">
                                    <span>مدیریت دسترسی</span>
                                </NavLinkRouter>
                            </Menu.Item>
                        )
                    }
                    {
                        roles.includes("1.9") && (
                            <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="13"  icon={ <MdBlock size="1.5em" className="pl-2" />}>
                                <NavLinkRouter onClick={ () => dispatch(ChangeActiveSelectedKey("13"))} className="text-decoration-none" to="/blockedusers">
                                    <span>لیست مسدودی‌ها</span>
                                </NavLinkRouter>
                            </Menu.Item>
                        )
                    }

                    <Menu.SubMenu key="sub3" icon={ <FaRegEnvelope size="1.5em" className="pl-2" />} title=" تیکتینگ">
                        {
                            roles.includes("6.1") && (
                                <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="14">
                                    <NavLinkRouter onClick={ () => dispatch(ChangeActiveSelectedKey("14"))} className="text-decoration-none" to="/tickets">
                                        <span >پاسخ به تیکت‌ها</span>
                                    </NavLinkRouter>
                                </Menu.Item>
                            )
                        }
                        <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="15">
                            <NavLinkRouter onClick={ () => dispatch(ChangeActiveSelectedKey("15"))} className="text-decoration-none" to="/mytickets">
                                <span>تیکت‌های ارسال شده</span>
                            </NavLinkRouter>
                        </Menu.Item>
                    </Menu.SubMenu>
                    {
                        roles.includes("1.3") && (
                            <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="18" icon={ <CartIcon size="1.5em" className="pl-2" />}>
                                <NavLinkRouter onClick={ () => dispatch(ChangeActiveSelectedKey("18"))} className="text-decoration-none" to="/carts">
                                    <span>چاپ کارت</span>
                                </NavLinkRouter>
                            </Menu.Item>
                        )
                    }
                    <Menu.Item style={{height: "55px"}} className="pt-2 pb-1" key="19" icon={ [
                        dashboardStats?.fileStorage ? <Badge key={0} dot /> : null ,
                        <DownloadIcon size="1.5em" key={1} className="pl-2" />
                    ] }>
                        <NavLinkRouter onClick={ () => dispatch(ChangeActiveSelectedKey("19"))} className="text-decoration-none" to="/downloads">
                                <span>دانلود فایل</span>
                        </NavLinkRouter>
                    </Menu.Item>
                </Menu>
            </div> */}
        </div>
            <div className="trigger pl-2 pointer text-center pb-3 d-none d-lg-block" onClick={toggle}>
                            <img src={menuIcon} style={{width:'20px',transition:"all .2s"}} className={`img-fluid ${collapsed ? "rotate180" : ""}`} alt=""/>
                </div>
        </div>
    )
}

export default SiderComponent
