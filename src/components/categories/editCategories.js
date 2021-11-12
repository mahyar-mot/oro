import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink as NavLinkRouter, useParams, useHistory} from "react-router-dom";
import { Form, Input, Button, Row, Col, Tag } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {BsArrowLeft} from 'react-icons/bs';
import {MdAddAlert} from 'react-icons/md';
import { getCategory, resetCategory, getCategoryChilds } from '../../redux/categories/categoryRetrieve';
import { categoryUpdate, categoryDelete } from '../../redux/categories/categoryUpdate';
import { createCategory } from '../../redux/categories/categoriesCreate';


function EditCategory(props) {

    const [form] = Form.useForm();
    let {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch()

    const { category, categoryChilds, isLoading, hasError } = useSelector( state => state.category.retrieve )

    const [childTitle, setChildTitle] = useState();

    useEffect(() => {
        dispatch(getCategory(id))
        dispatch(getCategoryChilds(id))
        return () => {
            dispatch(resetCategory())
        }
    }, [])

    // useEffect(() => {
    //     if (!isLoading){
    //         if (Object.keys(category).length && category.id){
    //             setTimeout( () => 
    //                 history.push(`/categories/edit/${category.id}`)
    //             , 500)
    //         }
    //     }
    // }, [isLoading])
    const handleCategoryChildren = () => {
        if (childTitle !== ''){
            let payload = {
                title: childTitle,
                parentId: id
            }
            dispatch(createCategory(payload))
            setTimeout( () => dispatch(getCategoryChilds(id)), 500 )
        }
    }

    const onFinish = (values) => {
        if (values.title !== '') {
            let payload = values
            payload["id"] = id
            dispatch(categoryUpdate(payload))
        }
    }

    return (
        <>
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
                    {
                        !isLoading && (
                            <Form
                                layout="vertical"
                                form={form}
                                labelCol= {{ span: 10 }}
                                wrapperCol= {{ span: 22 }}
                                initialValues={category}
                                onFinish={onFinish}
                            >
                                <Row>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                                        <Form.Item className="mb-4" name="title" label="عنوان دسته‌بندی">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <div className="text-left mt-4 ml-2 mb-3">
                                    <Button className="px-4" size="large" type="secondary" htmlType="submit" >ویرایش</Button>
                                </div>
                            </Form>
                        )
                    }
                </div>
            </div>

            <div className="content mt-3">
                <span className="square-indicator mr-4">ایجاد زیرمجموعه</span>
                <div className="py-4 px-2">
                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                            <Form.Item className="mb-4" label="عنوان زیرمجموعه">
                                <Input value={childTitle} onChange={ (e) => setChildTitle(e.target.value) } />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="p3">
                        { Boolean(categoryChilds.length) && categoryChilds.map( (item, index) =>
                            <Tag 
                                key={index} 
                                className="badge-pill background-pill-category mx-2 py-1 ml-1 font-weight-bold" 
                                closable
                                onClose={ () => dispatch(categoryDelete(item.id))}
                            >
                                {item.title}
                            </Tag> 
                         ) }
                    </div>
                    <div className="text-left mt-4 ml-4 mb-3">
                        <Button className="px-4" size="large" type="primary" loading={isLoading} onClick={ () => handleCategoryChildren() } >ثبت زیرمجموعه</Button>
                    </div>
                </div>
            </div>
            <div className="py-5 mt-3">

            </div>
        </>
    )
}

export default EditCategory
