import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserProfile } from '../../redux/auth';
import { getBasicInfo } from '../../redux/basicInfos';
import { Row, Col, List, Select } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import ProfileSection from './prfileSection';

const data = [
    1,2,3,4,5,6,7,8,9,10
]

const ListItem = props => (
    <Row justify="space-around">
        <Col xl={{span: 4, order:1}} lg={{span: 4, order:1}} md={{span: 12, order:1}} sm={{span: 12, order:1}} xs={{span: 12, order:1}}>
            <div>فاکتور شماره</div>
        </Col>
        <Col xl={{span: 5, order:2}} lg={{span: 5, order:2}} md={{span: 12, order:3}} sm={{span: 12, order:3}} xs={{span: 12, order:3}}>
            <div>تاریخ پرداخت</div>
        </Col>
        <Col xl={{span: 5, order:3}} lg={{span: 5, order:3}} md={{span: 12, order:4}} sm={{span: 12, order:4}} xs={{span: 12, order:4}}>
            <div>مبلغ پرداختی</div>
        </Col>
        <Col xl={{span: 5, order:4}} lg={{span: 5, order:4}} md={{span: 12, order:2}} sm={{span: 12, order:2}} xs={{span: 12, order:2}}>
            <div>در انتظار پرداخت</div>
        </Col>
        <Col xl={{span: 5, order:5}} lg={{span: 5, order:5}} md={{span: 24, order:5}} sm={{span: 24, order:5}} xs={{span: 24, order:5}}>
            <div>مشاهده جزیات</div>
        </Col>
    </Row>
)

export default function UserOrders(props) {

    const dispatch = useDispatch();
    const {isLoggedIn, nationalNumber, userProfile} = useSelector( state => state.auth );

    const history = useHistory()

    React.useEffect( () => {

    },[])

    return (
        <ProfileSection>
            <div className="text-right pr-md-5 pr-0">
                <div className="d-flex justify-content-between">
                    <div >
                        <FileTextOutlined className="text-royal" style={{fontSize: '1.75rem'}} />
                        <h5 className="d-inline-block mr-2" onClick={ _ => history.push("/profile")}>سفارشات</h5>
                    </div>
                    <Select placeholder="مرتب سازی سفارشات">
                        <Select.Option></Select.Option>
                    </Select>
                </div>
                <div className="my-4">
                    <List
                        itemLayout="horizontal"
                        size="large"
                        header={null}
                        footer={null}
                        bordered
                        dataSource={data}
                        renderItem={item => <List.Item 
                                                key={item}
                                                
                                            > 
                                                <List.Item.Meta 
                                                    title={
                                                        <ListItem />
                                                    }
                                                    avatar={<FileTextOutlined />} /> 
                                            </List.Item>
                                    }
                    />
                </div>
            </div>
        </ProfileSection>
    )
}

