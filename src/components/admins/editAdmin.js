import React from 'react';
import {NavLink as NavLinkRouter, useParams, useLocation, useHistory} from "react-router-dom";
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
import { assignAdminRole, createAdmin, cleanAdmin } from '../../redux/admins/adminsCreate';
import { getAdmin, getAdminRole, resetAdmin, updateAdmin } from '../../redux/admins/adminRetrieve';
import { useTokenClaims } from '../public/hooks';


function EditAdmin(props) {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    let {nationalNo} = useParams();
    const location = useLocation();
    const history = useHistory()

    const basicInfo = useSelector( state => state.basicInfo );
    const [activeCityFields, setActiveCityFields] = React.useState(1);
    const { userProfile } = useSelector( state => state.auth )
    const { admin, isLoading, adminRoles, roleSuccess: successUpdate } = useSelector( state => state.admin.retrieve);
    const { isLoading: createLoading, roleSuccess: successCreate } = useSelector( state => state.admin.create);
    const { countryDivisionCode } = useTokenClaims();
    
    const [isEditing, setIsEditing] = React.useState(false);
    const [nameLock, setNameLock] = React.useState(false);
    const [surnameLock, setSurnameLock] = React.useState(false);

    React.useEffect(() => {
        if (!basicInfo.apiHasCalled){
            dispatch(getBasicInfo())
        }
        dispatch(getCountries(1))
        if (nationalNo){
            form.setFieldsValue({"nationalNo": nationalNo})
            checkUser()
        }
        return () => {
            dispatch(resetAdmin())  //updateAdmin
            dispatch(cleanAdmin())  //createAdmin
        }
    }, [dispatch])

    const checkUser = () => {
        let value = form.getFieldValue("nationalNo")
        if ( !value || value.length !== 10){
            form.setFields([
                {
                  name: 'nationalNo',
                  errors: ['کد ملی نادرست است'],
                },
            ]);
        }else{
            dispatch(getAdmin(value))
        }
    }

    React.useEffect(() => {
        if (!isLoading){
            if (Object.keys(admin).length){
                setIsEditing(true)
                form.setFieldsValue(admin)
                setActiveCityFields(admin.countryDivisionCode.split(".").length)
                if ( !['', null].includes(admin.name) ) setNameLock(true)
                if ( !['', null].includes(admin.surname) ) setSurnameLock(true)
            }else{
                setIsEditing(false)
            }
        }
    }, [admin])

    React.useEffect( () => {
        if (isEditing){
            dispatch(getAdminRole(form.getFieldValue("nationalNo")))
        }
    }, [isEditing])

    React.useEffect( () => {
        if (adminRoles.length){
            form.setFieldsValue({"roles": adminRoles.map( item => item.name)})
        }
    }, [adminRoles])

    React.useEffect( () => {
        if (!isLoading){
            if (successUpdate){
                setTimeout( () => history.push("/admins"), 1000)
            }
        }
        if (!createLoading){
            if (successCreate){
                setTimeout( () => history.push("/admins"), 1000)
            }
        }
    }, [isLoading, createLoading])
    console.log(">>>>>", createLoading, successCreate);
    const onFieldsChange = (changedFields) => {
        if (changedFields.length){
            // if (changedFields[0].name[0].startsWith("cityDiv")){

            //     let currnetFieldName = changedFields[0].name[0];
            //     let currentCityDivNumber = parseInt(currnetFieldName.split('-')[1])
            //     for (let i = currentCityDivNumber + 1; i < 5 ; i++ ){
            //         form.setFieldsValue({[`cityDiv-${i}`]: ""})
            //     }
            // }
            if (changedFields[0].name[0] === "assignmentTitle"){
                for (let i = 0; i < 5 ; i++ ){
                    form.setFieldsValue({[`cityDiv-${i}`]: ""})
                }
            }
            if (changedFields[0].name[0] === "nationalNo"){
                // console.log("!@!@", changedFields);
            }
        }
    }

    const onFinish = values => {
        let isAdmin = false
        values.roles = values.roles.filter( item => !item.startsWith("sys."))
        if (Object.keys(admin).length){
            isAdmin = admin.profileStatusDto.filter( item => item.profileContextTypeId == 2).length
        }
        if (isEditing && isAdmin) {
            // check if it is already admin or not if not create admin
        //     values.countryDivisionCode = admin.countryDivisionCode
        //     dispatch(assignAdminRole(values.nationalNo, values.roles))
        // }else if (isEditing){
            values.countryDivisionCode = admin.countryDivisionCode
            dispatch(updateAdmin(values.nationalNo, values))
        }else{
            // create admin and assign role
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
        // let countryCodes = Object.keys(values).filter( item => item.startsWith('cityDiv'))
        // if (countryCodes.length){
        //     if (countryCodes.length === 5 && values[countryCodes[countryCodes.length - 1]] === '' ){
        //         values.CountryDivisionCode = values[countryCodes[countryCodes.length - 2]]
        //     }else{
        //         values.CountryDivisionCode = values[countryCodes[countryCodes.length - 1]]
        //     }
        // } else {
        //     values.CountryDivisionCode = "1"
        // }
        // dispatch(createAdmin(values.CountryDivisionCode, values))
    }

    return (
        <div className="content">
            <div className="d-flex justify-content-between">
                <span className="square-indicator">مشخصات ادمین</span>
                <div className="ml-2">
                    <NavLinkRouter className="text-decoration-none" to={`/admins${location.search}`}>
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
                    onFieldsChange={onFieldsChange}
                    onFinish={onFinish}
                >
                    <Row>
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
                                <Input maxLength={11} disabled={isEditing} />
                            </Form.Item>
                        </Col>
                        <Col className="px-2 pt-4 mt-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                            <Button className="px-4 border-success text-success" size="large" onClick={ () => checkUser()} >
                                جست‌جو
                            </Button>
                            {
                                !nationalNo && (
                                    <Button className="px-4 mr-3" size="large" type="danger" onClick={ () => {
                                        form.resetFields();
                                        setIsEditing(false);
                                        setNameLock(false);
                                        setSurnameLock(false)
                                    }} >انصراف</Button>
                                )
                            }
                        </Col>
                    </Row>
                    <Row>
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
                                <Input disabled={nameLock} />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item 
                                className="mb-4" 
                                label="نام خانوادگی" 
                                name="surname"
                                rules={[
                                    {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است"
                                    }
                                ]}
                            >
                                <Input disabled={surnameLock} />
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
                                <Input maxLength={14} disabled={isEditing} />
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
                    </Row>
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
                                    disabled={isEditing}
                                >
                                    {
                                        basicInfo.countryDivisionLevel.filter( item => item.value >= userProfile.assignmentTitleType ).map( (item, index) => (
                                            <Select.Option value={item.value} key={index} >{item.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                        </Col>
                    </Row>
                    <CountryDivisions form={form} visibleFields={activeCityFields} defaultCode={isEditing ? admin.countryDivisionCode : "1" } />
                    <Access/>

                    <div className="text-left mt-4 ml-2 mb-3">
                        <Button className="px-4" size="large" type="primary" htmlType="submit" >ذخیره و ارسال</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default EditAdmin
