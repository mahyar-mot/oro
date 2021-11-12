import React from 'react'
import {NavLink as NavLinkRouter, useParams} from "react-router-dom";
import { Button, Form, Input, Row, Col } from 'antd';
import {BsArrowLeft} from 'react-icons/bs';
import ViewersTable from "./viewersTable";



function ContentViewers() {

    const [form] = Form.useForm();
    const {id} = useParams()

    return (
        <div>
            <div className="text-left">

                <NavLinkRouter to={`/contents/detail/${id}`} >
                    <span>بازگشت به محتوا <BsArrowLeft /></span>
                </NavLinkRouter>
            </div>
            <div className="d-flex justify-content-between mt-4">
                <span className="square-indicator mt-4">لیست مشاهده‌کنندگان</span>
                <div>
                    <Form
                        layout="vertical"
                        form={form}
                        labelCol= {{ span: 24 }}
                        wrapperCol= {{ span: 24 }}
                    >
                        <Row className="d-flex justify-content-end">
                            <Col className="mr-4" span={5}>
                                <Form.Item label="ارسال کننده">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col className="mr-4" span={5}>
                                <Form.Item label="دسته بندی">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col className="mr-4" span={5}>
                                <Form.Item label="گروه">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col className="mr-4" span={6}>
                                <Form.Item label="    ">
                                    <Input placeholder="جستجوی نام یا کدملی" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            <div>
                <ViewersTable />
            </div>
        </div>
    )
}

export default ContentViewers
