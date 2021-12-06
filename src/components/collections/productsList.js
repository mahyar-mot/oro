import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserProfile } from '../../redux/auth';
import { getBasicInfo } from '../../redux/basicInfos';
import { Row, Col, Button, Divider, Pagination} from 'antd';
import { BsFilterLeft } from "react-icons/bs";

import Card from "../public/productCard";



export default function Filters(props) {

    const dispatch = useDispatch();
    const {isLoggedIn, nationalNumber, userProfile} = useSelector( state => state.auth );

    const history = useHistory()

    React.useEffect( () => {

    },[])

    return (
        <div className="mr-md-5 mr-0 mt-3">
            <div className="d-flex justify-content-between">
                <div>
                    <BsFilterLeft size="2rem" />
                    <span className="ml-2 mr-1">مرتب‌سازی براساس</span>
                    <Button type="secondary" className="ml-2 border-gray text-gray" >محبوب‌ترین</Button>
                    <Button type="secondary" className="ml-2 border-gray text-gray" >پرفروش‌ترین</Button>
                    <Button type="secondary" className="ml-2 border-gray text-gray" >جدیدترین</Button>
                    <Button type="secondary" className="ml-2 border-gray text-gray" >ارزان‌ترین</Button>
                    <Button type="secondary" className="ml-2 border-gray text-gray" >پربازدیدترین</Button>
                </div>
                <div>
                    <small>کالا۴۵۰</small>
                </div>
            </div>
            <Divider />
            <div>
                <Row gutter={[24, 24]} justify="space-between" >
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                        <Card />
                    </Col>
                </Row>
            </div>
            <div className="my-5 d-flex justify-content-center">
                <Pagination />
            </div>
        </div>
    )
}
