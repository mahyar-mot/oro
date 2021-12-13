import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserProfile } from '../../redux/auth';
import { getBasicInfo } from '../../redux/basicInfos';
import { Avatar, List, Divider } from 'antd';
import { UserOutlined, ShoppingOutlined, EnvironmentOutlined, FileTextOutlined, UserAddOutlined, ExportOutlined } from '@ant-design/icons';

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";


const data = [
    { id: "1", section: "سبد خرید", avatar: <ShoppingOutlined /> },
    { id: "2", section: "سفارشات", avatar: <FileTextOutlined /> },
    { id: "3", section: "آدرس‌ها", avatar: <EnvironmentOutlined /> },
    { id: "4", section: "اطلاعات حساب کاربری", avatar: <UserAddOutlined /> },
    { id: "5", section: "خروج", avatar: <ExportOutlined /> },
];


export default function ProfileNavigation(props) {

    const dispatch = useDispatch();
    const {isLoggedIn, nationalNumber, userProfile} = useSelector( state => state.auth );

    const history = useHistory()

    React.useEffect( () => {
        console.log("$$$$$$");
    },[])
    
    return (
        <div className="text-right">
            <div className="border rounded-sm shadow-sm d-lg-block d-none">
                <div className="d-flex flex-column align-items-center py-3">
                    <Avatar size={64} icon={<UserOutlined />} />
                    <span>کامیار راد</span>
                    <small className="text-gray">به اوروگالری خوش‌آمدید</small>
                </div>
                <List
                    itemLayout="horizontal"
                    size="small"
                    header={null}
                    footer={null}
                    bordered
                    dataSource={data}
                    renderItem={item => <List.Item 
                                            className="text-oldRoyal pointer oldRoyal-hover" 
                                            key={item.id}
                                        > 
                                            <List.Item.Meta 
                                                title={<span className="oldRoyal-hover">{item.section}</span>}
                                                avatar={item.avatar} /> 
                                        </List.Item>
                                }
                />
            </div>
            <div className="d-lg-none">
                <div className="d-flex justify-content-between align-items-center border rounded-sm shadow-sm p-4 mb-4">
                    <div>
                        <Avatar size={64} icon={<UserOutlined />} />
                        <div className="d-inline-flex flex-column mr-3">
                            <span>کامیار راد</span>
                            <small className="text-gray">به اوروگالری خوش‌آمدید</small>

                        </div>
                    </div>
                    {
                        <div className="oldRoyal-hover pointer"> 
                            <span className="text-oldRoyal oldRoyal-hover">{data[4].avatar}</span>
                            {data[4].section} 
                        </div>
                    }
                </div>
                <div className="d-flex justify-content-between p-3 reverse-px-5 border rounded-sm shadow-sm" >
                    {
                        data.map( (item, index) => {
                            if (index < 4){
                                return (
                                    <>
                                        <div className="oldRoyal-hover pointer"> 
                                            <span className="text-royal">{item.avatar}</span>
                                            {item.section} 
                                        </div>
                                        { index !== 3 && <Divider type="vertical" />}
                                    </>
                                )
                            }
                        } )
                    }
                </div>
            </div>
        </div>
    )
}

