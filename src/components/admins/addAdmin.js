import React from 'react';
import {NavLink as NavLinkRouter} from "react-router-dom";
import {Form, Input, Button, Radio, Row, Col, Upload, Select} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {BsArrowLeft} from 'react-icons/bs';
import {MdAddAlert} from 'react-icons/md';
import CountryDivisions from "../public/countryDivisions";
import {useDispatch, useSelector} from "react-redux";
import {getBasicInfo} from "../../redux/basicInfos";
import {getCountries} from "../../redux/countries";
import { Checkbox } from 'antd';
import Access from "./access";
import { createAdmin } from '../../redux/admins/adminsCreate';
import { useTokenClaims } from '../public/hooks';


function AddAdmin(props) {

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const { countryDivisionCode } = useTokenClaims()

    const basicInfo = useSelector( state => state.basicInfo );
    const [activeCityFields, setActiveCityFields] = React.useState(1);
    const { userProfile } = useSelector( state => state.auth )

    React.useEffect(() => {
        if (!basicInfo.apiHasCalled){
            dispatch(getBasicInfo())
        }
        dispatch(getCountries(1))
    }, [dispatch])

    React.useEffect( () => {
        if (countryDivisionCode){
            setActiveCityFields(countryDivisionCode.split(".").length)
        }
    }, [countryDivisionCode])

    const onFinish = values => {
        let countryCodes = Object.keys(values).filter( item => item.startsWith('cityDiv'))
        if (countryCodes.length){
            if (countryCodes.length === 5 && values[countryCodes[countryCodes.length - 1]] === '' ){
                values.CountryDivisionCode = values[countryCodes[countryCodes.length - 2]]
            }else{
                values.CountryDivisionCode = values[countryCodes[countryCodes.length - 1]]
            }
        } else {
            values.CountryDivisionCode = "1"
        }
        dispatch(createAdmin(values.CountryDivisionCode, values))
    }

    return (
        <div className="content">
            <div className="d-flex justify-content-between">
                <span className="square-indicator">مشخصات ادمین</span>
                <div className="ml-2">
                    <NavLinkRouter className="text-decoration-none" to="/admins">
                        <span className="link-color">بازگشت به لیست ادمین‌ها <BsArrowLeft /></span>
                    </NavLinkRouter> 
                </div>
            </div>
            <div className="p-x-2 px-lg-5 mt-5">
                <Form
                    layout="vertical"
                    form={form}
                    labelCol= {{ span: 10 }}
                    wrapperCol= {{ span: 22 }}
                    onFinish={onFinish}
                >
                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                            <Form.Item
                                className=""
                                label="سطح فعالیت"
                                name="assignmentTitleType"
                                rules={[
                                    {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است"
                                    }
                                ]}
                            >
                                <Select
                                    size="large"
                                    dropdownClassName="text-right"
                                    placeholder="سطح فعالیت کاربر را انتخاب کنید"
                                    onChange={ value => setActiveCityFields(value) }
                                >
                                    {
                                        basicInfo.countryDivisionLevel.filter( item => item.value >= userProfile.assignmentTitleType ).map( (item, index) => (
                                            <Select.Option value={item.value} key={index} >{item.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                            <Form.Item 
                                className="mb-4" 
                                label="کدملی" 
                                name="nationalNo"
                                rules={[
                                    {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است"
                                    },
                                    {
                                        pattern: /^[\d]{0,11}$/,
                                        message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                    },
                                ]}
                            >
                                <Input maxLength={11} />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >

                            <Form.Item 
                                className="mb-4 " 
                                label="تلفن همراه" 
                                name="mobile"
                                rules={[
                                    {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است"
                                    },
                                    {
                                        pattern: /^[\d]{0,11}$/,
                                        message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                    },
                                ]}
                            >
                                <Input maxLength={14} />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item 
                                className="mb-4" 
                                label="عنوان" 
                                name="assignmentType"
                                rules={[
                                    {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item 
                                className="mb-4" 
                                label="نام" 
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item 
                                className="mb-4" 
                                label="نام خانوداگی" 
                                name="surname"
                                rules={[
                                    {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                    </Row>
                    <CountryDivisions form={form} visibleFields={activeCityFields} defaultCode={countryDivisionCode} />
                    <Access/>

                    <div className="text-left mt-4 ml-2 mb-3">
                        <Button className="px-4" size="large" type="primary" htmlType="submit" >ذخیره و ارسال</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default AddAdmin
