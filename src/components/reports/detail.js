import React from 'react';
import {NavLink as NavLinkRouter, useParams} from "react-router-dom";
import { Form, Input, Button, Row, Col, Upload, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import classNames from "classnames";
import DatePicker from "react-datepicker2";
import moment from 'moment-jalaali'
import {uploadImage} from '../../redux/uploadFile';
import {BsArrowLeft} from 'react-icons/bs';
import {MdAddAlert} from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { getNewUser, updateCurrentUser } from '../../redux/newUser';
import { getBasicInfo } from '../../redux/basicInfos';
import {ReactComponent as UploadPic} from "../../assets/icons/add_photo_alternate_black.svg"


function CandidateDetail() {

    const [form] = Form.useForm();
    const { Dragger } = Upload;

    let {nationalNo} = useParams();
    const history = useHistory();

    const dispatch = useDispatch()
    const {newUser, isLoading, error} = useSelector(state => state.newUser);
    const basicInfo = useSelector(state => state.basicInfo);

    const [userBirthDate, setUserBirthDate] = React.useState(moment(newUser?.birthDate, 'jYYYY/jM/jD'));
    
    React.useEffect(() => {
        if (nationalNo){
            dispatch(getNewUser(nationalNo))
        }
        if (!basicInfo.apiHasCalled){
            dispatch(getBasicInfo())
        }
    }, [dispatch])

    const onFinish = (values) => {
        values.countryDivisionCode = newUser.countryDivisionCode;
        values.birthDate = userBirthDate
        console.log("~~~!!!!", values);
        // dispatch(updateCurrentUser(values.nationalNo, values))
        // setTimeout( () => history.push('/waitinguser'), 500)
    }

    const cityCodes = ["استان", "شهرستان", "بخش", "شهر/دهستان", "روستا"]

    return (
        <div className="content mb-5 p-4">
            <div className="d-flex justify-content-between">
                <span className="square-indicator">مشخصات ناظر</span>
                <div className="ml-2">
                    {
                        newUser.status === 5 ? (
                            <NavLinkRouter className="text-decoration-none" to="/profile">
                                <span className="link-color">بازگشت <BsArrowLeft /></span>
                            </NavLinkRouter> 
                        ) : (
                            <NavLinkRouter className="text-decoration-none" to="/waitinguser">
                                <span className="link-color">بازگشت <BsArrowLeft /></span>
                            </NavLinkRouter> 
                        )
                    }
                </div>
            </div>
            <div className="py-4 px-4">
                وضعیت داوطلب : <span className="text-danger">رد صلاحیت شده</span>
            </div>
            <div className="px-xl-5">
                { !isLoading && (
                <Form
                    layout="vertical"
                    form={form}
                    labelCol= {{ span: 12 }}
                    wrapperCol= {{ span: 24 }}
                    initialValues={{
                        shnasId: ["", "", ""]
                    }}
                    onFinish={onFinish}
                >
                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item className="my-4" label="نام" name="name" >
                                    <Input />
                                </Form.Item>
                            </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item className="my-4" label="نام خانوادگی" name="surname" >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item className="my-4" label="نام پدر" name="fatherName">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item className="my-4" label="کدملی" name="nationalNo" >
                                    <Input />
                                </Form.Item>
                            </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item className="my-4" label="شماره شناسنامه" name="shenas" >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Row className="my-4">
                                <Form.List name="shnasId">
                                    {(fields, { errors }) => (
                                        fields.map( (field, index) => (
                                            index <=3 &&
                                            <Col span={ 8}>
                                                <Form.Item {...field} label={index === 0 ? "شماره مسلسل" : "  "} className={classNames({"mx-2": index === 1})}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                        ))
                                    )
                                    }

                                </Form.List>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item 
                                className="pt-4" 
                                label="تاریخ تولد" 
                                name="birthDate"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: "تکمیل این فیلد ضروری است",
                                //     },
                                // ]}
                            >
                                <DatePicker
                                    max={moment().subtract(18, 'years')}
                                    className="ant-input "
                                    isGregorian={false}
                                    timePicker={false}
                                    value={userBirthDate}
                                    onChange={value => setUserBirthDate(value.format('jYYYY/jM/jD')) }
                                />                            
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item className="my-4" label="جنسیت" name="gender" >
                                <Select
                                    size="large"
                                    dropdownClassName="text-right"
                                >
                                    {
                                        basicInfo.gender.map( (item, index) => (
                                            <Select.Option value={item.value} key={index} >{item.name}</Select.Option>

                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item className="my-4" label="نام مستعار" name="">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item 
                                className="my-4" 
                                label="وضعیت تاهل"
                                name="fatherName"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item className="my-4" label="تعداد فرزند" name="">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item className="my-4" label="مذهب" name="">
                                <Select
                                    size="large"
                                    dropdownClassName="text-right"
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
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item 
                                className="my-4" 
                                label="تلفن همراه" 
                                name=""
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: "تکمیل این فیلد ضروری است",
                                //     },
                                // ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item 
                                className="my-4" 
                                label="ایمیل" 
                                name=""
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: "تکمیل این فیلد ضروری است",
                                //     },
                                // ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item 
                                className="my-4" 
                                label="مشمول ماده ۳۲" 
                                name="sheba"
                                // rules={[
                                //     {
                                //         pattern: /^[\d]{0,26}$/,
                                //         message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                //     },
                                //     {
                                //         min: 26,
                                //         message: "۲۶ کارکتر مورد نیاز است",
                                //     }
                                // ]}
                            >
                                <Input maxLength={26} addonAfter="-IR" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item 
                                className="my-4"
                                label="استان"
                                name=""
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item 
                                className="my-4"
                                label="شهرستان" 
                                name=""
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item 
                                className="pt-4" 
                                label="بخش / روستا" 
                                name=""
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: "تکمیل این فیلد ضروری است",
                                //     },
                                // ]}
                            >
                                <DatePicker
                                    max={moment().subtract(18, 'years')}
                                    className="ant-input "
                                    isGregorian={false}
                                    timePicker={false}
                                    value={userBirthDate}
                                    onChange={value => setUserBirthDate(value.format('jYYYY/jM/jD')) }
                                />                            
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={16}>
                            <Form.Item className="my-4" wrapperCol={{
                                            span: 24,
                                            // offset: 1
                                        }} 
                                        label="آدرس"
                                        name="homeAddress"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item 
                                className="my-4"
                                label="تلفن ثابت" 
                                name="tel"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item 
                                className="my-4" 
                                label="تحصیلات" 
                                name="education"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: "تکمیل این فیلد ضروری است",
                                //     },
                                // ]}
                            >
                                <Select
                                    size="large"
                                    dropdownClassName="text-right"
                                >
                                    {
                                        basicInfo.education.map( (item, index) => (
                                            <Select.Option value={item.value} key={index} >{item.name}</Select.Option>

                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item 
                                className="my-4" 
                                label="نتیجه استعلام مدرک تحصیلی" 
                                name=""
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: "تکمیل این فیلد ضروری است",
                                //     },
                                // ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item 
                                className="my-4" 
                                label="شغل فعلی" 
                                name=""
                                // rules={[
                                //     {
                                //         pattern: /^[\d]{0,26}$/,
                                //         message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                //     },
                                //     {
                                //         min: 26,
                                //         message: "۲۶ کارکتر مورد نیاز است",
                                //     }
                                // ]}
                            >
                                <Input maxLength={26} addonAfter="-IR" />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <div className="text-left ">
                        <Button size="large" type="primary" htmlType="submit" >ذخیره و ارسال</Button>
                    </div>
                </Form>
                )}
            </div>
        </div>
    )
}


export default CandidateDetail
