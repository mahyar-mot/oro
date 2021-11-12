import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink as NavLinkRouter, useHistory} from "react-router-dom";
import { Form, Input, Button, Row, Col } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {BsArrowLeft} from 'react-icons/bs';
import {MdAddAlert} from 'react-icons/md';
import {createCategory, cleanCategory} from "../../redux/categories/categoriesCreate"


function AddCategory(props) {

    const [form] = Form.useForm();
    const history = useHistory();
    const dispatch = useDispatch()

    const { category, isLoading, hasError } = useSelector( state => state.category.create )

    useEffect(() => {
        dispatch(cleanCategory({}))
        return () => {
            dispatch(cleanCategory({}))
        }
    }, [])

    useEffect(() => {
        if (!isLoading){
            if (Object.keys(category).length && category.id){
                setTimeout( () => 
                    history.push(`/categories/edit/${category.id}`)
                , 500)
            }
        }
    }, [isLoading])

    const onFinish = (values) => {
        if (values.title !== '') dispatch(createCategory(values))
    }

    return (
            <div className="content">
                <div className="d-flex justify-content-between">
                    <span className="square-indicator mr-4">ایجاد دسته‌بندی جدید</span>
                    <div className="ml-4">
                        <NavLinkRouter className="text-decoration-none" to="/categories">
                            <span className="link-color">بازگشت به دسته بندی محتواها <BsArrowLeft /></span>
                        </NavLinkRouter> 
                    </div>
                </div>
                <div className="p-2 px-lg-5 mt-5">
                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={onFinish}
                        labelCol= {{ span: 10 }}
                        wrapperCol= {{ span: 22 }}
                    >
                        <Row>
                            <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                                <Form.Item className="mb-4" name="title" label="عنوان دسته‌بندی">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <div className="text-left mt-4 ml-2 mb-3">
                            <Button className="px-4" size="large" type="primary" loading={isLoading} htmlType="submit">ثبت دسته‌بندی</Button>
                        </div>
                    </Form>
                </div>
            </div>
    )
}

export default AddCategory
