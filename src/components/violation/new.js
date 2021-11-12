import React from 'react';
import {NavLink as NavLinkRouter, useHistory, useParams} from "react-router-dom";
import {Form, Input, Button, Tag, Row, Col, Upload, Select} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {BsArrowLeft} from 'react-icons/bs';
import {FaRegUserCircle} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import {getBasicInfo} from '../../redux/basicInfos';
import {MEDIA_URL, VIOLATION_ATTACHMENTS_UPLOAD} from "../../utils/constants";
import {getTokenObject} from "../../utils/utils";

import {
    getViolationType,
    createViolation,
    cleanCreateViolation,
    getViolationUpdate,
    updateViolation,
} from "../../redux/violation/violationCreate"
import TextArea from "antd/es/input/TextArea";
import {useTokenClaims} from '../public/hooks';


function New(props) {
    let {id} = useParams();

    const basicInfo = useSelector(state => state.basicInfo);
    const {candidatesList} = useSelector(state => state.candidate.list);

    const {
        violationType,
        isLoading,
        resultCreateViolation,
        violationUpdate,
        violationFiles
    } = useSelector(state => state.violation.create)
    const [form] = Form.useForm();

    const {countryDivisionCode} = useTokenClaims()

    const history = useHistory()
    const dispatch = useDispatch();

    const [attachmentsList, setAttachmentsList] = React.useState([]);
    const [selectedUser, setSelectedUser] = React.useState();
    const [isLoadingFile, setIsLoadingFile] = React.useState(false);

    React.useEffect(() => {
        // dispatch(getOverseersList({countryDivisionCode}));
        dispatch(getViolationType())
        if (id !== "new")
            dispatch(getViolationUpdate(id))
        if (!basicInfo.apiHasCalled) {
            dispatch(getBasicInfo())

        }
        return () => {
            setAttachmentsList([])
            dispatch(cleanCreateViolation())
        }
    }, [])

    React.useEffect(() => {
        if (!isLoading) {
            if (resultCreateViolation) {
                setTimeout(() => history.push("/violations"), 500)
            }
        }
    }, [isLoading])

    // React.useEffect(() => {
    //     if (id !== "new")
    //         form.setFieldsValue(violationUpdate)
    // }, [violationUpdate])

    React.useEffect(() => {
        if (id !== "new"){
            form.setFieldsValue({...violationUpdate})
        }

    }, [violationUpdate])
    React.useEffect( () => {

        if (violationFiles?.length && (id !== "new")){
            let fileLists = violationFiles.map( item => ({...item, uid: item.path, url: item.path,path:item.path.substring(item.path.lastIndexOf("/") + 1), status: 'done', name: "دانلود"}))
            setAttachmentsList(fileLists)
        }
    },[violationFiles])
    const onFinish = (values) => {

        // values.violationFile = attachmentsList
        values["violationFile"] = attachmentsList.map( item => ({ path: item.path, title: item.title, fileSize: item.fileSize, fileFormat: item.fileFormat }) );
        values.countryDivisionCode = countryDivisionCode
        values.transcript = ""
        values.reportType = ""
        if (id === "new")
        dispatch(createViolation(values))
        else{
            values.id = id
            dispatch(updateViolation(id,values))
        }

    }
    return (
        <div className="content mb-5">
            <div className="d-flex justify-content-between">
                <span className="square-indicator">  ثبت تخلف جدید</span>
                <div className="ml-2">
                    <NavLinkRouter className="text-decoration-none" to="/violations">
                        <span className="link-color">    بازگشت به تخلفات ثبت شده <BsArrowLeft/></span>
                    </NavLinkRouter>
                </div>
            </div>
            <div className="px-xl-5">
                <Form
                    layout="vertical"
                    form={form}
                    labelCol={{span: 10}}
                    wrapperCol={{span: 24}}
                    onFinish={onFinish}
                >
                    <Row className="my-5">

                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item className="" label=" نوع تخلف " name="violationTypeId"
                                       rules={[
                                           {
                                               required: true,
                                               message: "این فیلد اجباری است"
                                           }
                                       ]}>
                                <Select
                                    size="large"
                                    dropdownClassName="text-right"
                                    // onChange={ (value) => onUserLevelChange(value)}
                                    // onChange={value => setActiveCityFields(value)}
                                >
                                    {
                                        violationType.map((item, index) => (
                                            <Select.Option value={item.id} key={index}>{item.title}</Select.Option>

                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item
                                className=""
                                label="متخلف"
                                name="violator"
                                initialValue={""}
                            >

                                <Input
                                    defaultValue={""}
                                    // maxLength= {11}
                                />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item
                                className=""
                                label="کد شعبه"
                                name="branchCode"
                                initialValue={""}
                            >

                                <Input
                                    defaultValue={""}
                                    // maxLength= {11}
                                />
                            </Form.Item>
                        </Col>
                        <Col className="px-2" span={24}>
                            <Form.Item label=" توضیحات  " name="description"
                                       rules={[
                                           {
                                               required: true,
                                               message: "این فیلد اجباری است"
                                           }
                                       ]}>
                                <TextArea rows={7}/>
                            </Form.Item>
                        </Col>
                        <Col className="px-2" span={24}>
                            <Form.Item label="ضمیمه کردن فایل" name="">
                                <Upload
                                    name="file"
                                    action={MEDIA_URL + VIOLATION_ATTACHMENTS_UPLOAD}
                                    listType="picture"
                                    fileList={attachmentsList}
                                    headers={{
                                        Authorization: `Bearer ${getTokenObject().Authorization}`
                                    }}
                                    // onChange={(info) => {
                                    //     setIsLoadingFile(true)
                                    //    console.log(info)
                                    //     if (info.file.status === 'done') {
                                    //         setIsLoadingFile(false)
                                    //
                                    //         if (info.file.response.isSuccess) {
                                    //             setAttachmentsList(state => [...state, {
                                    //                 fileSize: info.file.size,
                                    //                 fileFormat: info.file.type,
                                    //                 path: info.file.response.data,
                                    //             }])
                                    //         }
                                    //     }
                                    // }}
                                    onChange={ (info) => {
                                        let result = info.fileList
                                        setIsLoadingFile(true)
                                        if (info.file.status === 'done') {
                                            setIsLoadingFile(false)
                                            if (info.file.response.isSuccess){

                                                result = result.map( item => {
                                                    if (item.uid === info.file.uid){
                                                        return { ...item,
                                                            fileSize: info.file.size,
                                                            fileFormat: info.file.type,
                                                            path: info.file.response.data,
                                                            }
                                                    }else{
                                                        return item
                                                    }
                                                })
                                                form.setFieldsValue({'uploadTxt': ''})
                                            }
                                        }
                                        if (info.file.status === "error"){
                                            setIsLoadingFile(false)
                                            form.setFields([
                                                {
                                                    name: 'uploadTxt',
                                                    errors: [info.file.response.message],
                                                },
                                            ]);
                                        }
                                        if (info.file.status === "removed"){
                                            setIsLoadingFile(false)
                                        }
                                        setAttachmentsList(result)
                                    }}
                                >
                                    <Button>انتخاب فایل</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="text-left px-2">
                        <Button size="large" type="primary" loading={isLoading} disabled={isLoadingFile}
                                htmlType="submit">ذخیره و ارسال</Button>
                    </div>
                </Form>
            </div>

        </div>
    )
}

export default New
