import React from 'react';
import {NavLink as NavLinkRouter, useParams} from "react-router-dom";
import { Form, Input, Button, Row, Col, Upload, Select, Spin, Table, message } from 'antd';
import { useHistory } from 'react-router-dom';
import classNames from "classnames";
import DatePicker from "react-datepicker2";
import moment from 'moment-jalaali'
import {uploadImage, cleanUploadFile} from '../../redux/uploadFile';
import { uploadNationalImage , cleanInspectorsFile} from "../../redux/inspectors/inspectorsFile"
import {BsArrowLeft} from 'react-icons/bs';
import {MdAddAlert} from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { getNewUser, resetUser, updateCurrentUser } from '../../redux/newUser';
import { getBasicInfo } from '../../redux/basicInfos';
import {ReactComponent as UploadPic} from "../../assets/icons/add_photo_alternate_black.svg"


function NewUserForm() {

    const [form] = Form.useForm();
    const { Dragger } = Upload;

    let {nationalNo} = useParams();
    const history = useHistory();

    const dispatch = useDispatch()
    const {newUser, isLoading, error, isSuccess} = useSelector(state => state.newUser);
    const basicInfo = useSelector(state => state.basicInfo);
    const {uploadData} = useSelector(state => state.uploadFile);
    const {inspectorNationalImage} = useSelector( state => state.inspector.file)
    
    React.useEffect(() => {
        if (nationalNo){
            dispatch(getNewUser(nationalNo))
        }
        if (!basicInfo.apiHasCalled){
            dispatch(getBasicInfo())
        }
        return () => {
            dispatch(resetUser())
            dispatch(cleanUploadFile())
            dispatch(cleanInspectorsFile())
        }
    }, [dispatch])

    React.useEffect( () => {
        if (!isLoading){
            if (isSuccess){
                setTimeout( () => history.push('/waitinguser'), 500)
            }
        }
    }, [isLoading])

    const onFinish = (values) => {
        values.personalPhoto = newUser.personalPhoto;
        values.countryDivisionCode = newUser.countryDivisionCode;
        values.birthDate = values.birthDate.format('jYYYY/jMM/jDD');
        values.sheba = "IR" + values.sheba;
        if (uploadData){
            values.personalPhoto = uploadData;
        }
        if (newUser.isInspector){
            if (inspectorNationalImage){
                values.nationalCardPhoto = inspectorNationalImage
            }else if (newUser.nationalCardPhoto !== ""){
                values.nationalCardPhoto = newUser.nationalCardPhoto
            }
        }
        dispatch(updateCurrentUser(values.nationalNo, values))
    }

    const cityCodes = ["استان", "شهرستان", "بخش", "شهر/دهستان", "روستا"]

    return (
        <>
            <div className="content mb-5">
                <div className="d-flex justify-content-between">
                    <span className="square-indicator">مشخصات کاربر</span>
                    <div className="ml-2">
                        {
                            newUser.stateType === 2 && newUser.profileStatusDto[0].statusType === 5 ? (
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
                <div className="px-xl-5">
                    <Spin size="large" spinning={isLoading} >
                    { Boolean(Object.keys(newUser).length) && (
                        <Form
                            layout="vertical"
                            form={form}
                            labelCol= {{ span: 20 }}
                            wrapperCol= {{ span: 24 }}
                            initialValues={{
                                    ...newUser,
                                    assignmentTitle: newUser.assignmentTitleType,
                                    sheba: newUser.sheba && newUser.sheba.substring(2),
                                    birthDate: newUser.birthDate ? moment(newUser.birthDate, 'jYYYY/jMM/jDD') : null
                                }}
                            onFinish={onFinish}
                        >
                            <Row>
                                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                    <Form.Item className="my-4" label="سطح فعالیت" name="assignmentTitle">
                                        <Select
                                            size="large"
                                            className="text-right"
                                            // onChange={ (value) => onUserLevelChange(value)}
                                            disabled
                                        >
                                            {
                                                newUser.isInspector ? 
                                                basicInfo.inspectorAssignmentTitle.map( (item, index) => (
                                                    <Select.Option value={item.value} key={index} >{item.name}</Select.Option>
                                                )) : basicInfo.assignmentTitle.map( (item, index) => (
                                                    <Select.Option value={item.value} key={index} >{item.name}</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                    <Form.Item className="my-4" label="کدملی" name="nationalNo" >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                    <Form.Item className="my-4" label="تلفن همراه" name="mobile">
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                    <Form.Item 
                                        className="my-4" 
                                        label="نام پدر"
                                        name="fatherName"
                                        rules={[
                                            {
                                                required: true,
                                                message: "تکمیل این فیلد ضروری است",
                                            },
                                            {
                                                pattern: "^[ ئؤأيآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی،-]+$",
                                                message: "فقط کارکتر فارسی قابل قبول است"
                                            }
                                        ]}
                                    >
                                        <Input disabled={newUser.stateType === 2} />
                                    </Form.Item>
                                </Col>
                                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                    <Form.Item className="my-4" label="جنسیت" name="genderType" >
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
                                    <Form.Item className="my-4" label="تحصیلات" name="educationType">
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
                                        label="نام" 
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: "تکمیل این فیلد ضروری است",
                                            },
                                            {
                                                pattern: "^[ ئؤأيآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی،-]+$",
                                                message: "فقط کارکتر فارسی قابل قبول است"
                                            }
                                        ]}
                                    >
                                        <Input disabled={newUser.stateType === 2} />
                                    </Form.Item>
                                </Col>
                                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                    <Form.Item 
                                        className="my-4" 
                                        label="نام خانوادگی" 
                                        name="surname"
                                        rules={[
                                            {
                                                required: true,
                                                message: "تکمیل این فیلد ضروری است",
                                            },
                                            {
                                                pattern: "^[ ئؤأيآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی،-]+$",
                                                message: "فقط کارکتر فارسی قابل قبول است"
                                            }
                                        ]}
                                    >
                                        <Input disabled={newUser.stateType === 2} />
                                    </Form.Item>
                                </Col>
                                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                    <Form.Item 
                                        className="my-4" 
                                        label="شماره شبا" 
                                        name="sheba"
                                        rules={[
                                            {
                                                required: true,
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
                                        <Input maxLength={24} addonAfter="-IR" disabled={newUser.stateType === 2} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                    <Form.Item 
                                        className="my-4"
                                        label="شغل ثابت(ماموریت)"
                                        name="currentJob"
                                        rules={[
                                            {
                                                pattern: "^[ ئؤأيآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی،-]+$",
                                                message: "فقط کارکتر فارسی قابل قبول است"
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                    <Form.Item 
                                        className="my-4"
                                        label="شغل پیشین (درصورت بازنشسته بودن)" 
                                        name="prevJob"
                                        rules={[
                                            {
                                                pattern: "^[ ئؤأيآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی،-]+$",
                                                message: "فقط کارکتر فارسی قابل قبول است"
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                    <Form.Item 
                                        className="pt-4" 
                                        label="تاریخ تولد" 
                                        name="birthDate"
                                        rules={[
                                            {
                                                required: true,
                                                message: "تکمیل این فیلد ضروری است",
                                            },
                                        ]}
                                    >
                                        <DatePicker
                                            max={moment().subtract(18, 'years')}
                                            className="ant-input "
                                            isGregorian={false}
                                            timePicker={false}
                                            disabled={newUser.stateType === 2}
                                        />                            
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className="py-3">
                                { newUser?.countryDivisions?.map( (item, index) => {
                                    if (index > 0){return (<Col className={classNames({'mx-auto': index === 2 || index === 5})} span={7}> 
                                        <Form.Item className="" label={cityCodes[index-1]} initialValue={item.name}>
                                            <Input value={item.name} disabled />
                                        </Form.Item>
                                    </Col>)}
                                } ) }
                            </Row>
                            <Form.Item className="mt-1 mb-3" wrapperCol={{
                                            span: 24,
                                            // offset: 1
                                        }} 
                                        label="آدرس"
                                        name="homeAddress"
                            >
                                <Input />
                            </Form.Item>

                            <div className=" mb-5 mt-4">
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
                                    { newUser.personalPhotoAddress !== '' ? (
                                        <img className="img-fluid" style={{maxWidth: "200px"}} src={newUser.personalPhotoAddress} />
                                    ) : (
                                        <>
                                            <p className="ant-upload-drag-icon">
                                            <UploadPic />
                                            </p>
                                            <p className="ant-upload-text text-muted">بر روی آیکون کلیک کنید یا عکس خود را اینجا بیاندازید</p>
                                        </>
                                    ) }
                                </Dragger>
                                <div className="my-2 py-2"> <MdAddAlert color="red" />  <small>عکس ارسالی باید در ابعاد ۳ در ۴ و حداکثر 400 کیلوبایت باشد (جهت پرینت بر روی کارت شناسایی)</small></div>
                            </div>


                            { newUser?.isInspector && (
                                <div className=" mb-5 mt-4">
                                    <div className="my-2">تصویر کارت ملی</div>
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
                                                await dispatch(uploadNationalImage(form.getFieldValue('nationalNo'), formData)).then(r => onSuccess({"status":"success"}))
                                            }
                                        }
                                    >
                                        { newUser?.nationalCardPhotoAddress !== '' ? (
                                            <img className="img-fluid" style={{maxWidth: "200px"}} src={newUser?.nationalCardPhotoAddress} />
                                        ) : (
                                            <>
                                                <p className="ant-upload-drag-icon">
                                                <UploadPic />
                                                </p>
                                                <p className="ant-upload-text text-muted">بر روی آیکون کلیک کنید یا عکس خود را اینجا بیاندازید</p>
                                            </>
                                        ) }
                                    </Dragger>
                                </div>
                            )}
                            
                            <div className="text-left ">
                                <Button size="large" type="primary" loading={isLoading} htmlType="submit" >ذخیره و ارسال</Button>
                            </div>
                        </Form>
                    )}
                    </Spin>
                </div>
            </div>
            { Boolean(newUser?.profileStatusVersionsDto?.length) && (
                <div className="content mt-4 p-5">
                        <span className="square-indicator">بررسی تایید یا عدم تایید</span>
                        <Table
                            pagination={false}
                            dataSource={newUser.profileStatusVersionsDto}
                            className="shadow-sm mt-3"
                            // loading={listIsLoading}
                            rowClassName={(record, index) => index % 2 === 0 ? '' :  'alternate-row'}
                            bordered
                        >
                            <Table.Column title="وضعیت" key="statusName" dataIndex="statusName" />
                            <Table.Column title="دلیل رد شدن" key="actionDescription" dataIndex="actionDescription" render={ (t) => t ? t : '-' } />
                            <Table.Column className="dir-ltr" title="تاریخ" key="updateDate" dataIndex="updateDate" render={ (t,r) => t ? t : r?.createDate } />
                        </Table>
                </div>
            )}
        </>
    )
}


export default NewUserForm
