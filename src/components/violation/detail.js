import React from 'react';
import {NavLink as NavLinkRouter, useLocation, useParams} from "react-router-dom";
import {Form, Input, Button, Row, Col, Upload, Select, Table, Avatar, Modal} from 'antd';
import {useHistory} from 'react-router-dom';
import classNames from "classnames";
import DatePicker from "react-datepicker2";
import moment from 'moment-jalaali'
import {downloadAttachment, clearAttachmentFile} from '../../redux/uploadFile';
import {BsArrowLeft} from 'react-icons/bs';
import {MdAddAlert} from 'react-icons/md';
import {useSelector, useDispatch} from 'react-redux';
import {getViolation, resetViolation, getPeopleViolation} from "../../redux/violation/violationRetrieve"
import {getBasicInfo} from '../../redux/basicInfos';
// import {ReactComponent as UploadPic} from "../../assets/icons/pe"
import TextArea from "antd/es/input/TextArea";
import picTest from "../../assets/icons/profile picture.svg"
import Chat from "./chat";
import {UserOutlined} from '@ant-design/icons';
import {getViolationType} from "../../redux/violation/violationCreate";
import { QueryUrl, UrlQuery } from '../../utils/utils';
// import { getPeopleViolation, resetPeopleViolation } from '../../redux/violation/peopleViolationRetrieve';

const Detail = () => {

    const [form] = Form.useForm();
    const {Dragger} = Upload;

    let {id} = useParams();
    const history = useHistory();
    const location = useLocation();

    const dispatch = useDispatch()
    const {violation, isLoading, error, files, comments} = useSelector(state => state.violation.retrieve)
    const { attachmentFile, isDone } = useSelector( state => state.uploadFile )

    const basicInfo = useSelector(state => state.basicInfo);
    const {violationType} = useSelector(state => state.violation.create)

    React.useEffect(() => {
        dispatch(getViolationType())
        let params = QueryUrl(location.search)
        if (params.isPeople && id){
            dispatch(getPeopleViolation(id))
        }else if (id) {
            dispatch(getViolation(id))
        }
        if (!basicInfo.apiHasCalled) {
            dispatch(getBasicInfo())
        }
        return () => {
            dispatch(resetViolation())
            dispatch(clearAttachmentFile())
        }
    }, [dispatch])

    const onFinish = (values) => {
        values.birthDate = values.birthDate.format('jYYYY/jMM/jDD')
    }

    const cityCodes = ["استان", "شهرستان", "بخش", "شهر/دهستان", "روستا"]
    React.useEffect(() => {
        let type = "";
        if (violationType && violation?.violationTypeId)
            type = violationType.filter(t => (t?.id === violation?.violationTypeId))
        if(type.length)
        form.setFieldsValue({...violation, violationType:type[0]?.title})
    }, [violation])

    React.useEffect( () => {
        if (attachmentFile){
            if (isDone){
                const link = document.createElement('a');
                link.href = attachmentFile.href;
                link.setAttribute('download', attachmentFile.name); //or any other extension
                link.setAttribute('target', "_blank"); //or any other extension
                document.body.appendChild(link);
                link.click();
                setTimeout( () => dispatch(clearAttachmentFile(), 1000))
            }
        }
    }, [attachmentFile, isDone])

    const handleGoBack = () => {
        let querys = location.search !== '' ? QueryUrl(location.search) : {}            
        let nextPage = querys?.prevPage ? querys.prevPage : "violations"
        delete querys["prevPage"]
        delete querys["isPeople"]
        history.push(UrlQuery(`/${nextPage}`, querys))
    }

    return (
        <>
            <div className="ml-2 text-left">
                <a className="text-decoration-none" onClick={ () => handleGoBack()}>
                    <span className="link-color"> بازگشت به تخلفات ثبت شده   <BsArrowLeft/></span>
                </a>
            </div>
            <div className="content mb-3 p-4">
                <div>
                    <span className="square-indicator">  مشخصات گزارش دهنده</span>
                </div>

                <div className="px-xl-5 mt-3">
                    <Row className="align-items-center">
                        <Col className="px-2 mt-3" xs={24} sm={24} md={24} lg={4} xl={3}>
                            <Avatar shape="square" size={64} icon={<UserOutlined/>} src={violation?.creatorImage}/>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={20} xl={21}>
                            <Row>
                                <Col className="px-2 mt-3" xs={24} sm={10} md={8} lg={10} xl={7}>

                                    <span className="link-color">  کاربر : </span>
                                    <span>{violation?.creatorFullName}</span>
                                </Col>
                                <Col className="px-2 mt-3" xs={24} sm={14} md={16} lg={14} xl={16}>
                                    <span className="link-color">  موقعیت جغرافیایی : </span>
                                    <span>{violation?.countryDivisionDetail} </span>
                                </Col>
                                <Col className="px-2 mt-3" xs={24} sm={10} md={8} lg={10} xl={7}>
                                    <span className="link-color">  کدملی  : </span>
                                    <span>{violation?.creatorNationalNo} </span>
                                </Col>
                                <Col className="px-2 mt-3" xs={24} sm={14} md={16} lg={14} xl={16}>
                                    <span className="link-color">  تلفن همراه  : </span>
                                    <span>{violation?.creatorMobile} </span>
                                </Col>
                            </Row>
                        </Col>


                    </Row>

                </div>

            </div>
            <div className="content mb-3 p-4">
                <div>
                    <span className="square-indicator"> جزییات تخلف</span>
                    <div className="ml-2">
                        {/*<NavLinkRouter className="text-decoration-none" to="/violations">*/}
                        {/*    <span className="link-color"> بازگشت به تخلفات ثبت شده   <BsArrowLeft/></span>*/}
                        {/*</NavLinkRouter>*/}
                    </div>
                </div>

                <div className="px-xl-5">
                    {!isLoading && (
                        <Form
                            layout="vertical"
                            form={form}
                            labelCol={{span: 12}}
                            wrapperCol={{span: 24}}
                            initialValues={{
                                ...violation,
                            }}
                            onFinish={onFinish}
                        >
                            <Row>
                                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                    <Form.Item className="my-4" label="نوع تخلف" name="violationType">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                    <Form.Item className="my-4" label=" متخلف" name="violator">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                    <Form.Item className="my-4" label="کد شعبه " name="branchCode">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col className="px-2" span={24}>
                                    <Form.Item label="توضیحات  " name="description">
                                        <TextArea disabled={true} rows={4}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            {
                                Boolean(files.length) ?
                                    <>
                                        <Row>
                                            <Col className="px-2" span={24}>
                                                <span>فایل ضمیمه</span>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            {/*{*/}
                                            {/*    files.map((item, i) =>*/}
                                            {/*        <Col className="px-2 mb-4" xs={24} sm={12} md={12} lg={8} xl={5}>*/}
                                            {/*            <Avatar shape="square" size="large" icon={<img src={item?.path}/>}/>*/}
                                            {/*            <span className="mr-2">{""}</span>*/}
                                            {/*        </Col>)*/}
                                            {/*}*/}
                                            <Col className="px-2 mb-4" span={24}>
                                                <div className="d-flex">
                                                    <Upload
                                                        className="cursor-pointer"
                                                        // listType="picture-card"
                                                        listType="picture"
                                                        fileList={files.map(t => (
                                                            {...t, name: "دانلود", uid: t.path}
                                                        ) )}
                                                        onPreview={file => dispatch(downloadAttachment(file.path))}
                                                        // onChange={handleChange}
                                                        showUploadList={{
                                                            showDownloadIcon: true,
                                                            removeIcon: false,
                                                            showRemoveIcon: false
                                                        }}
                                                    >
                                                    </Upload>
                                                </div>
                                            </Col>
                                        </Row>
                                    </> : ''
                            }

                            {/* <div className="text-left ">
                        <Button size="large" type="primary" htmlType="submit" >ذخیره و ارسال</Button>
                    </div> */}
                        </Form>
                    )}
                </div>

            </div>
            <Chat/>

        </>
    )
}


export default Detail
