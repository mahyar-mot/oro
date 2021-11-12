import React from 'react';
import {NavLink as NavLinkRouter, useHistory} from "react-router-dom";
import { Form, Input, Button, Select, Row, Col, Checkbox, Upload, Spin, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from "react-datepicker2";
import moment from 'moment-jalaali'
import {ReactComponent as UploadPic} from "../../assets/icons/add_photo_alternate_black.svg"
import {BsArrowLeft} from 'react-icons/bs';
import {MdAddAlert} from 'react-icons/md';
import CountryDivisions from "../public/countryDivisions";
import { getBasicInfo } from '../../redux/basicInfos';
import {uploadImage, cleanUploadFile} from '../../redux/uploadFile';
import { createOverseer, cleanOverseer } from '../../redux/overseers/overseersCreate';
import { getCountries } from '../../redux/countries';
import { useTokenClaims } from '../public/hooks';


function AddOverSeer(props) {

    const [form] = Form.useForm();
    const { Dragger } = Upload;

    const dispatch = useDispatch();

    const basicInfo = useSelector( state => state.basicInfo );
    const { userProfile } = useSelector( state => state.auth )
    const { isLoading, hasError, overseer, isSuccess } = useSelector( state => state.overseer.create );
    const {uploadData} = useSelector(state => state.uploadFile);
    const { countryDivisionCode } = useTokenClaims()
    const [managementApprovalLock, setManagementApprovalLock] = React.useState(false)

    const history = useHistory();

    const [activeCityFields, setActiveCityFields] = React.useState(1);

    React.useEffect(() => {
        if (!basicInfo.apiHasCalled){
            dispatch(getBasicInfo())
        }
        dispatch(getCountries(1))
        return () => {
            dispatch(cleanOverseer())
            dispatch(cleanUploadFile())
        }
    }, [dispatch])

    React.useEffect( () => {
        if (basicInfo.gender.length && basicInfo.education.length){
            form.setFieldsValue({
                'genderType': basicInfo.gender[0].value,
                'educationType': basicInfo.education[0].value
            })
        }
        if (countryDivisionCode){
            setActiveCityFields(countryDivisionCode.split(".").length)
        }
    }, [basicInfo, countryDivisionCode])

    React.useEffect( () => {
        if (!isLoading){
            if (isSuccess){
                setTimeout( () => history.push('/overseers'), 1000 )
            }
        }
    }, [isLoading])

    const onFieldsChange = (changedFields) => {
        if (changedFields.length){
            if (changedFields[0].name[0].startsWith("cityDiv")){

                let currnetFieldName = changedFields[0].name[0];
                let currentCityDivNumber = parseInt(currnetFieldName.split('-')[1])
                for (let i = currentCityDivNumber + 1; i < 5 ; i++ ){
                    form.setFieldsValue({[`cityDiv-${i}`]: ""})
                }
            }
            if (changedFields[0].name[0] === "assignmentTitle"){
                for (let i = 0; i < 5 ; i++ ){
                    form.setFieldsValue({[`cityDiv-${i}`]: ""})
                }
            }
        }
    }

    const onFinish = (values) =>{
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
        if (values.sheba) values.sheba = "IR" + values.sheba
        if (uploadData){
            values.personalPhoto = uploadData
        }
        if (values.birthDate){
            values.birthDate = values.birthDate.format("jYYYY/jMM/jDD")
        }
        values.managementApproval = managementApprovalLock
        dispatch(createOverseer(values.CountryDivisionCode, values))
    }

    return (
        <div className="content mb-5">
            <div className="d-flex justify-content-between">
                <span className="square-indicator">مشخصات ناظر</span>
                <div className="ml-2">
                    <NavLinkRouter className="text-decoration-none" to="/overseers">
                        <span className="link-color">بازگشت به لیست ناظران <BsArrowLeft /></span>
                    </NavLinkRouter> 
                </div>
            </div>
            <div className="px-xl-5 mt-4">
                <Spin size="large" spinning={isLoading} >
                    <Form
                        preserve
                        layout="vertical"
                        form={form}
                        labelCol= {{ span: 20 }}
                        wrapperCol= {{ span: 24 }}
                        onFinish={onFinish}
                        onFieldsChange={onFieldsChange}
                    >
                        <Row>
                            <Col className="px-2 mb-4" xs={24} sm={12} md={12} lg={8} xl={8}>                                    
                                <Checkbox value={managementApprovalLock} onChange={ () => setManagementApprovalLock(state => !state) } >
                                    تایید مدیریتی
                                </Checkbox>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="px-2 " xs={24} sm={12} md={12} lg={8} xl={8}>
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
                            <Col className="px-2 " xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item 
                                    className="" 
                                    label="کدملی" 
                                    name="nationalNo"
                                    rules={[
                                        {
                                            required: true,
                                            message: "تکمیل این فیلد ضروری است",
                                        },
                                        {
                                            pattern: /^[۱۲۳۴۵۶۷۸۹۰0-9]{0,11}$/,
                                            message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                        },
                                    ]}
                                >

                                    <Input
                                        maxLength= {11}
                                    />
                                </Form.Item>
                            </Col>
                            <Col className="px-2 " xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item 
                                    className="" 
                                    label="تلفن همراه" 
                                    name="mobile"
                                    rules={[
                                        {
                                            required: true,
                                            message: "تکمیل این فیلد ضروری است",
                                        },
                                        {
                                            pattern: /^[۱۲۳۴۵۶۷۸۹۰0-9]{0,11}$/,
                                            message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                        },
                                    ]}
                                >

                                    <Input
                                        maxLength= {11}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <CountryDivisions form={form} visibleFields={activeCityFields} defaultCode={countryDivisionCode} />
                        <Row>
                            <Col className="px-2 " xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item 
                                    label="نام پدر"
                                    name="fatherName"
                                    rules={[
                                        {
                                            required: managementApprovalLock,
                                            message: "تکمیل این فیلد ضروری است",
                                        },
                                        {
                                            pattern: "^[ ئؤأيآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی،-]+$",
                                            message: "فقط کارکتر فارسی قابل قبول است"
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col className="px-2 " xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item className="" label="جنسیت" name="genderType">
                                    <Select
                                        size="large"
                                        dropdownClassName="text-right"
                                        defaultActiveFirstOption={true}
                                    >
                                        {
                                            basicInfo.gender.map( (item, index) => (
                                                <Select.Option value={item.value} key={index} >{item.name}</Select.Option>

                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col className="px-2 " xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item className="" label="تحصیلات" name="educationType">
                                    <Select
                                        size="large"
                                        dropdownClassName="text-right"
                                        defaultActiveFirstOption={true}
                                    >
                                        {
                                            basicInfo.education.map( (item, index) => (
                                                <Select.Option value={item.value} key={index} >{item.name}</Select.Option>

                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>        
                            <Col className="px-2 " xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item className="" 
                                           label="نام" 
                                           name="name"
                                           rules={[
                                            {
                                                required: managementApprovalLock,
                                                message: "تکمیل این فیلد ضروری است",
                                            },
                                            {
                                                pattern: "^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی،-]+$",
                                                message: "فقط کارکتر فارسی قابل قبول است"
                                            }
                                        ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col className="px-2 " xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item className=""
                                            label="نام خانوادگی"
                                            name="surname"
                                            rules={[
                                                {
                                                    required: managementApprovalLock,
                                                    message: "تکمیل این فیلد ضروری است",
                                                },
                                                {
                                                    pattern: "^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی،-]+$",
                                                    message: "فقط کارکتر فارسی قابل قبول است"
                                                }
                                            ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col className="px-2 " xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item 
                                    className="" 
                                    label="شماره شبا" 
                                    name="sheba"
                                    rules={[
                                        {
                                            required: managementApprovalLock,
                                            message: "تکمیل این فیلد ضروری است",
                                        },
                                        {
                                            pattern: /^[\d]{0,24}$/,
                                            message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                        },
                                        {
                                            min: 24,
                                            message: "۲۴ کارکتر مورد نیاز است",
                                        }
                                    ]}
                                >
                                    <Input maxLength={24} addonAfter="-IR" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="px-2 " xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item className="" 
                                            label="شغل ثابت(ماموریت)"
                                            name="currentJob"
                                            rules={[
                                                {
                                                    pattern: "^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی،-]+$",
                                                    message: "فقط کارکتر فارسی قابل قبول است"
                                                }
                                            ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col className="px-2 " xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item className=""
                                            label="شغل پیشین (درصورت بازنشسته بودن)"
                                            name="prevJob"
                                            rules={[
                                                {
                                                    pattern: "^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی،-]+$",
                                                    message: "فقط کارکتر فارسی قابل قبول است"
                                                }
                                            ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col className="px-2 " xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item 
                                    className="pt-1" 
                                    label="تاریخ تولد" 
                                    name="birthDate"
                                    rules={[
                                        {
                                            required: managementApprovalLock,
                                            message: "تکمیل این فیلد ضروری است",
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        max={moment().subtract(18, 'years')}
                                        className="ant-input "
                                        isGregorian={false}
                                        timePicker={false}
                                    />                            
                                </Form.Item>
                            </Col>
                        </Row>


                        <div className="px-2 ">

                            <Form.Item wrapperCol={{
                                span: 24,
                                // offset: 1
                            }}
                                    name="homeAddress"
                                    label="آدرس"
                            >
                                <Input />
                            </Form.Item>
                        </div>


                        <div className="px-2 mb-5 ">
                            <div className="my-2">تصویر پروفایل</div>
                            <Dragger 
                                accept=".png, .jpg, .jpeg"
                                maxCount={1}
                                beforeUpload={ (file, fileList) => {
                                    if ((file.size / 1024) >= 600){
                                        message.error("حجم فایل آپلود شده بیش از حد مجاز است")
                                        return false
                                    }
                                } }
                                customRequest={
                                    async (e) => {
                                        const { onSuccess, onError, file, action, onProgress } = e;
                                        let formData = new FormData()
                                        await  formData.append('file', e?.file)
                                        // console.log(e?.file)
                                        await dispatch(uploadImage(form.getFieldValue('nationalNo'), formData)).then(r => onSuccess({"status":"success"}))
                                    }
                                }
                            >
                                <p className="ant-upload-drag-icon">
                                <UploadPic />
                                </p>
                                <p className="ant-upload-text text-muted">بر روی آیکون کلیک کنید یا عکس خود را اینجا بیاندازید</p>
                            </Dragger>
                            <div className="my-2 py-2"> <MdAddAlert color="red" />  <small>عکس ارسالی باید در ابعاد ۳ در ۴ و حداکثر 400 کیلوبایت باشد (جهت پرینت بر روی کارت شناسایی)</small></div>
                        </div>
                        
                        <div className="text-left px-2">
                            <Button size="large" type="primary" loading={isLoading} htmlType="submit" >ذخیره و ارسال</Button>
                        </div>
                    </Form>
                </Spin>
            </div>
        </div>
    )
}

export default AddOverSeer
