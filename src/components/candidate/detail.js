import React from 'react';
import {NavLink as NavLinkRouter, useParams} from "react-router-dom";
import { Form, Input, Button, Row, Col, Upload, Select, Table } from 'antd';
import { useHistory } from 'react-router-dom';
import classNames from "classnames";
import DatePicker from "react-datepicker2";
import moment from 'moment-jalaali'
import {uploadImage, cleanUploadFile} from '../../redux/uploadFile';
import {BsArrowLeft} from 'react-icons/bs';
import {MdAddAlert} from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import CountryDivision from "../public/countryDivisions";
import { getTokenObject } from '../../utils/utils';
import { MEDIA_URL, CANDIDATES_DOCUMENTS } from '../../utils/constants';
import { getCandidate, resetCandidate } from "../../redux/candidates/candidatesRetrieve"
import { candidateUpdate, cleanCandidateUpdate } from "../../redux/candidates/candidatesUpdate";
import { getBasicInfo } from '../../redux/basicInfos';


function CandidateDetail() {

    const [form] = Form.useForm();
    const { Dragger } = Upload;

    let {id} = useParams();
    const history = useHistory();

    const dispatch = useDispatch()
    const {candidate, isLoading, error} = useSelector( state => state.candidate.retrieve )
    const basicInfo = useSelector(state => state.basicInfo);

    const [attachmentTitle, setAttachmentTitle] = React.useState('')
    const [candidateAttachements, setCandidateAttachements] = React.useState([])

    React.useEffect(() => {
        if (id){
            dispatch(getCandidate(id))
        }
        if (!basicInfo.apiHasCalled){
            dispatch(getBasicInfo())
        }
        return () => {
            dispatch(resetCandidate())
            dispatch(cleanUploadFile())
            dispatch(cleanCandidateUpdate())
        }
    }, [dispatch])

    React.useEffect( () => {
        if (Object.keys(candidate).length){
            setCandidateAttachements(candidate.candidateDocuments)
        }
    },[candidate])

    const onFinish = (values) => {
        let countryCodes = Object.keys(values).filter( item => item.startsWith('cityDiv'))
        if (countryCodes.length){
            if (countryCodes.length === 5 && values[countryCodes[countryCodes.length - 1]] === '' ){
                values.countryDivisionCode = values[countryCodes[countryCodes.length - 2]]
            }else{
                values.countryDivisionCode = values[countryCodes[countryCodes.length - 1]]
            }
        }
        values.birthdate = values.birthdate.format('jYYYY/jMM/jDD')
        values.candidateDocuments = candidateAttachements
        values.candidateStatus = candidate.candidateStatus
        console.log("~~~!!!!", values);
        dispatch(candidateUpdate(values))
        // dispatch(updateCurrentUser(values.nationalNo, values))
        // setTimeout( () => history.push('/waitinguser'), 500)
    }

    const candidateStatus = (status) => {
        switch(status){
            case 2:
                return <span className="text-muted">درحال ثبت‌نام</span>
            case 3:
                return <span className="text-muted">ثبت‌نام نهایی</span>
            case 4:
                return <span className="text-danger">انصرافی</span>
            case 5:
                return <span className="text-oldSuccess">تایید صلاحیت</span>
            case 6:
                return <span className="text-warning">رد صلاحیت شده</span>
            default:
                return null
        }
    }

    const cityCodes = ["استان", "شهرستان", "بخش", "شهر/دهستان", "روستا"]

    return (
        <>
        <div className="content mb-5 p-4">
            <div className="d-flex justify-content-between">
                <span className="square-indicator">مشخصات داوطلب</span>
                <div className="ml-2">
                    <NavLinkRouter className="text-decoration-none" to="/candidates">
                        <span className="link-color"> بازگشت به لیست داوطلبان <BsArrowLeft /></span>
                    </NavLinkRouter> 
                </div>
            </div>

            <div className="px-xl-5">
                <div className="py-4 px-2">
                    وضعیت داوطلب : {candidateStatus(candidate.candidateStatus)} 
                </div>
                { !isLoading && Boolean(Object.keys(candidate).length) && (
                <Form
                    layout="vertical"
                    form={form}
                    labelCol= {{ span: 16 }}
                    wrapperCol= {{ span: 24 }}
                    initialValues={{
                        ...candidate,
                        birthdate: candidate.birthdate ? moment(candidate.birthdate, 'jYYYY/jMM/jDD') : null
                    }}
                    onFinish={onFinish}
                >
                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item label="نام" name="name" >
                                    <Input />
                                </Form.Item>
                            </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item label="نام خانوادگی" name="surname" >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item label="نام پدر" name="fatherName">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item label="کدملی" name="nationalNo" >
                                    <Input />
                                </Form.Item>
                            </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item label="شماره شناسنامه" name="identificationNo" >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            {/* <label>شماره مسلسل</label>
                            <Row>
                                <Form.List name="mosalsalNo">
                                    {(fields, { errors }) => (
                                        fields.map( (field, index) => (
                                            index <=3 &&
                                            <Col key={index} span={ 8}>
                                                <Form.Item {...field}  className={classNames({"mx-2": index === 1})}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                        ))
                                    )
                                    }

                                </Form.List>
                            </Row> */}
                            <Row>
                                <Col span={7}>
                                    <Form.Item label="شماره مسلسل" name="mosalsalNoPart1" >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={7} className="mx-4" >
                                    <Form.Item label=" " name="mosalsalNoPart2">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={7}>
                                    <Form.Item label=" " name="mosalsalNoPart3" >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item
                                label="تاریخ تولد" 
                                name="birthdate"
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
                                />                            
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item label="جنسیت" name="gender" >
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
                            <Form.Item label="نام مستعار" name="nickName">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item
                                label="وضعیت تاهل"
                                name="marriage"
                            >
                            <Select
                                    size="large"
                                    dropdownClassName="text-right"
                            >
                                {
                                    basicInfo.marriage.map( (item, index) => (
                                        <Select.Option value={item.value} key={index} >{item.name}</Select.Option>

                                    ))
                                }
                            </Select>
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item label="تعداد فرزند" name="childrenCount">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item label="مذهب" name="branchReligion">
                            <Select
                                    size="large"
                                    dropdownClassName="text-right"
                            >
                                {
                                    basicInfo.branchReligion.map( (item, index) => (
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
                                label="تلفن همراه" 
                                name="mobileNo"
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
                                label="ایمیل" 
                                name="email"
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
                                label="مشمول ماده ۳۲" 
                                name="isInclusive32Clause"
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
                            <Select
                                size="large"
                                dropdownClassName="text-right"
                            >
                                <Select.Option value={true}>می‌باشد</Select.Option>
                                <Select.Option value={false}>نمی‌باشد</Select.Option>
                            </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* <Row> */}
                        {/* <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item
                                label="استان"
                                name=""
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item
                                label="شهرستان" 
                                name=""
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item
                                label="بخش / روستا" 
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
                        </Col> */}
                    {/* </Row> */}
                    <CountryDivision form={form} visibleFields={candidate.countryDivisionCode.split(".").length} defaultCode={candidate.countryDivisionCode} />
                    <Row >
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={16}>
                            <Form.Item wrapperCol={{
                                            span: 24,
                                            // offset: 1
                                        }} 
                                        label="آدرس"
                                        name="address"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item
                                label="تلفن ثابت" 
                                name="phoneNo"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item
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
                                label="نتیجه استعلام مدرک تحصیلی" 
                                name="educationEnquiryResult"
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
                                <Input maxLength={26} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className=" mb-5 ">
                        <div className="my-2">تصویر پروفایل</div>
                        <Dragger
                            customRequest={
                                async (e) => {
                                    const { onSuccess, onError, file, action, onProgress } = e;
                                    let formData = new FormData()
                                    await  formData.append('file', e?.file)
                                    // console.log(e?.file)
                                    await dispatch(uploadImage(form.getFieldsValue('nationalNo'), formData)).then(r => onSuccess({"status":"success"}))
                                }
                            }
                        >
                            {/* { newUser.personalPhotoAddress !== '' ? (
                                <img className="img-fluid" style={{maxWidth: "200px"}} src={newUser.personalPhotoAddress} />
                            ) : (
                                <>
                                    <p className="ant-upload-drag-icon">
                                    <UploadPic />
                                    </p>
                                    <p className="ant-upload-text text-muted">بر روی آیکون کلیک کنید یا عکس خود را اینجا بیاندازید</p>
                                </>
                            ) } */}
                        </Dragger>
                    </div>
                    <div className="mb-2">
                        <span className="square-indicator">مدارک داوطلب</span>
                    </div>
                    <Row>
                        <Col xs={24} sm={12} md={10} lg={7} xl={7}>
                            <Form.Item className="mt-3" label="عنوان مدرک" name="uploadTxt" >
                                <Input value={attachmentTitle} onChange={ e => setAttachmentTitle(e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col className="mr-3" xs={24} sm={12} md={10} lg={7} xl={7}>
                            <Form.Item className="mt-3" label="فایل مدرک">
                                <Upload
                                    showUploadList={false}
                                    name="file"
                                    action={MEDIA_URL + CANDIDATES_DOCUMENTS(candidate.nationalNo)}
                                    listType="picture"
                                    headers={{
                                        Authorization: `Bearer ${getTokenObject().Authorization}`
                                    }}
                                    beforeUpload={ (file, fileList) => {
                                        if (attachmentTitle === '') {
                                            form.setFields([
                                                {
                                                    name: 'uploadTxt',
                                                    errors: ['عنوان فایل اجباری است'],
                                                },
                                                ]);
                                            return Upload.LIST_IGNORE
                                        }
                                    } }
                                    onChange={ (info) => {
                                        if (info.file.status === 'done') {
                                            if (info.file.response.isSuccess){
                                                setCandidateAttachements( state => [...state, {
                                                    fileSize: info.file.response.data.fileSize,
                                                    fileFormat: info.file.response.data.fileFormat,
                                                    path: info.file.response.data.path,
                                                    caption: attachmentTitle
                                                }])
                                                form.setFieldsValue({'uploadTxt': ''})
                                            }
                                        }
                                    }}
                                >
                                    <Button>افزودن فایل</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="">
                
                        <Table
                            dataSource={candidateAttachements}
                            className="shadow-sm"
                            pagination={false}
                            // loading={listIsLoading}
                            rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
                            bordered
                        >
                            <Table.Column title="شماره" key="id" render={(text, record, index) => (`${index + 1}`)} ></Table.Column>
                            <Table.Column title="عنوان" dataIndex="caption" key="caption" ></Table.Column>
                            <Table.Column title="فرمت" dataIndex="fileFormat" key="fileFormat" ></Table.Column>
                            <Table.Column title="فایل" dataIndex="download" key="download" render={ (t, r, i) => (
                                <div>
                                    <div className="d-inline-block ml-3" style={{maxWidth: "20px"}}><img src={r.path}/></div>
                                    {/* {r.path.split('/')[r.path.split('/').length - 1]} */}
                                </div>
                            ) } ></Table.Column>
                        </Table>
                    </div>

                    <div className="text-left mt-5">
                        <Button size="large" type="primary" htmlType="submit" >ذخیره و ارسال</Button>
                    </div>

                </Form>
                )}
            </div>
        </div>
        <div className="content ">
            <div className="px-xl-5 mx-2">
            <div className=" mb-2">
            <span className="square-indicator">وضعیت داوطلب</span>
            </div>

            <Table
                // dataSource={[userProfile]}
                className="shadow-sm"
                pagination={false}
                // loading={listIsLoading}
                rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
                bordered
            >
                <Table.Column title="عنوان" dataIndex="nationalNo4" key="nationalNo4" ></Table.Column>
                <Table.Column title="دلیل" dataIndex="nationalNo5" key="nationalNo5" ></Table.Column>
                <Table.Column title="تاریخ نهایی شدن ثبت نام" dataIndex="nationalNo6" key="nationalNo6" ></Table.Column>
            </Table>
        </div>
        </div>
        </>
    )
}


export default CandidateDetail
