import React from 'react';
import {NavLink as NavLinkRouter, useHistory} from "react-router-dom";
import {Form, Input, Button, Row, Col, Upload, Select} from 'antd';
import {BsArrowLeft} from 'react-icons/bs';
import {useSelector, useDispatch} from 'react-redux';
import { createProceeding, clearProceedingCreate} from "../../redux/proceedings/proceedingsCreate";
import { getTokenObject } from '../../utils/utils';
import { MEDIA_URL, PROCEEDINGS_UPLOAD } from '../../utils/constants';
import { useTokenClaims } from '../public/hooks';
import { getBasicInfo } from '../../redux/basicInfos';



function AddProceeding(props) {

    const { isLoading, isSuccess } = useSelector( state => state.proceedings.create )
    const { proceedingType, apiHasCalled } = useSelector( state => state.basicInfo )

    const [form] = Form.useForm();

    const { nationalNumber } = useTokenClaims();
    const history = useHistory()
    const dispatch = useDispatch();

    const [isLoadingFile, setIsLoadingFile] = React.useState(false)
    const [attachmentsList, setAttachmentsList] = React.useState([]);


    React.useEffect( () => {
        if (!isLoading){
            if (isSuccess){
                setTimeout( () => history.push("/proceedings"), 500)
            }
        }
    },[isLoading])

    React.useEffect( () => {
        if (!apiHasCalled){
            dispatch(getBasicInfo())
        }
        return () => dispatch(clearProceedingCreate())
    }, [])

    const onFinish = (values) => {
        values.proceedingFiles = attachmentsList
        values.creatorNationalNo = nationalNumber
        dispatch(createProceeding(values))
        form.resetFields()
    }

    return (
        <div className="content mb-5">
            <div className="d-flex justify-content-between">
                <span className="square-indicator"> ساخت صورتجلسه جدید </span>
                <div className="ml-2">
                    <NavLinkRouter className="text-decoration-none" to="/proceedings">
                        <span className="link-color">بازگشت به لیست صورتجلسات<BsArrowLeft/></span>
                    </NavLinkRouter>
                </div>
            </div>
            <div className="px-xl-5 mt-4" >
                <Form
                    layout="vertical"
                    form={form}
                    labelCol={{span: 10}}
                    wrapperCol={{span: 22}}
                    onFinish={onFinish}
                >
                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item className="" label=" نوع صورتجلسه " name="proceedingType"
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
                                        proceedingType.map((item, index) => (
                                            <Select.Option value={item.id} key={index}>{item.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                            <Form.Item name="attachments" className="mt-3" label="فایل صورتجلسه">
                                <Upload
                                    name="file"
                                    action={MEDIA_URL + PROCEEDINGS_UPLOAD}
                                    listType="picture"
                                    headers={{
                                        Authorization: `Bearer ${getTokenObject().Authorization}`
                                    }}
                                    beforeUpload={ (file, fileList) => {
                                        // if (attachmentTitle === '') {
                                        //     form.setFields([
                                        //         {
                                        //           name: 'attachments',
                                        //           errors: ['نام فایل اجباری است'],
                                        //         },
                                        //      ]);
                                        //     return Upload.LIST_IGNORE
                                        // }
                                    } }
                                    onChange={ (info) => {
                                        setIsLoadingFile(true)
                                        if (info.file.status === 'done') {
                                            setIsLoadingFile(false)
                                            if (info.file.response.isSuccess){
                                                setAttachmentsList( state => [...state, {
                                                    fileSize: info.file.response.data.fileSize,
                                                    fileFormat: info.file.response.data.fileFormat,
                                                    path: info.file.response.data.path,
                                                }])
                                            }
                                        }
                                        if (info.file.status === "error"){
                                            setIsLoadingFile(false)
                                            form.setFields([
                                                {
                                                    name: 'attachments',
                                                    errors: [info.file.response.message],
                                                },
                                                ]);
                                        }
                                        if (info.file.status === "removed"){
                                            setIsLoadingFile(false)
                                        }
                                    }}
                                >
                                    <Button loading={isLoadingFile}>افزودن فایل</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-2" xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="توضیحات" name="description"
                                       rules={[
                                           {
                                               required: true,
                                               message: "تکمیل این فیلد لازم است"
                                           }
                                       ]}>
                                <Input.TextArea rows={5} />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <div className="text-left px-2 mt-2">
                        <Button size="large" type="primary" loading={isLoadingFile || isLoading} htmlType="submit">ارسال صورتجلسه</Button>
                    </div>
                </Form>
            </div>

        </div>
    )
}

export default AddProceeding
