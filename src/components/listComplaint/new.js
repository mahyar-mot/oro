import React from 'react';
import {NavLink as NavLinkRouter, useHistory} from "react-router-dom";
import {Form, Input, Button, Tag, Row, Col, Upload, Select} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {BsArrowLeft} from 'react-icons/bs';
import {FaRegUserCircle} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import {getBasicInfo} from '../../redux/basicInfos';
import { MEDIA_URL, COMPLAINTS_ATTACHMENTS_UPLOAD } from "../../utils/constants";
import { getTokenObject } from "../../utils/utils";
import {getCandidatesList, cleanCandidatesList} from "../../redux/candidates/candidatesList";
import {createComplaint, cleanComplaint} from "../../redux/complaints/userComplaintCreate"
import TextArea from "antd/es/input/TextArea";
import { getTokenClaims } from '../../redux/auth';


function New(props) {

    const basicInfo = useSelector(state => state.basicInfo);
    const {candidatesList} = useSelector(state => state.candidate.list);
    const { complaint, isLoading, isSuccess } = useSelector( state => state.complaint.create )
    const {countryDivisionCode} = useSelector( state => state.auth)

    const [form] = Form.useForm();

    const history = useHistory()
    const dispatch = useDispatch();

    const [attachmentsList, setAttachmentsList] = React.useState([]);
    const [selectedUser, setSelectedUser] = React.useState();

    React.useEffect(() => {
        // dispatch(getOverseersList({countryDivisionCode}));
        if (!basicInfo.apiHasCalled) {
            dispatch(getBasicInfo())
        }
        if (!countryDivisionCode){
            dispatch(getTokenClaims())
          }
        return () => {
            dispatch(cleanCandidatesList())
            dispatch(cleanComplaint())
        }
    }, [])

    // React.useEffect( () => {
    //     if (isSuccess){
             
    //     }
    //     return () => dispatch(cleanComplaint())
    // },[isLoading])

    const onFinish = (values) => {
        values.attachments = attachmentsList
        dispatch(createComplaint(values))
        setTimeout( () => history.push("/complaints"), 500)
    }

    return (
        <div className="content mb-5">
            <div className="d-flex justify-content-between">
                <span className="square-indicator"> ثبت اعتراض</span>
                <div className="ml-2">
                    <NavLinkRouter className="text-decoration-none" to="/complaints">
                        <span className="link-color">بازگشت به لیست  اعتراض <BsArrowLeft/></span>
                    </NavLinkRouter>
                </div>
            </div>
            <div className="px-xl-5" >
                <Form
                    layout="vertical"
                    form={form}
                    labelCol={{span: 10}}
                    wrapperCol={{span: 22}}
                    onFinish={onFinish}
                >
                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                            <Form.Item className="my-5" label="انتخاب کاربر  " name="candidateId"
                                       rules={[
                                           {
                                               required: true,
                                           }
                                       ]}>
                               <Select
                                    showSearch
                                    dropdownClassName="text-right"
                                    defaultActiveFirstOption={false}
                                    showArrow={false}
                                    filterOption={false}
                                    tagRender={ () => {}}
                                    onSearch={ value => {
                                        if (value === '' || value === null){
                                            dispatch(cleanCandidatesList())
                                        }else{
                                            dispatch(getCandidatesList({search: value, countryDivisionCode: countryDivisionCode}))
                                        }
                                    }}
                                    onChange={ (value, option) => setSelectedUser(option) }
                               >
                                   {candidatesList.map( (item, index) => (
                                       <Select.Option value={item.id} key={index} data-username={`${item.name} ${item.surname}`}>{item.name} {item.surname} - {item.nationalNo}</Select.Option>
                                   ) )}
                               </Select>
                            </Form.Item>
                            { selectedUser && (<Tag 
                                className="badge-pill text-white background-pill-complaints mx-2 py-1 ml-1 font-weight-bold" 
                                closable
                                icon={<FaRegUserCircle className="ml-3" />}
                                onClose={ () => {
                                    form.setFieldsValue({"candidateId": null});
                                     setSelectedUser(null);
                                     dispatch(cleanCandidatesList());
                                }}
                            >
                                {selectedUser["data-username"]}
                            </Tag> )} 
                        </Col>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item className="my-5" label="بررسی کننده " name="assignmentTitle"
                                       rules={[
                                           {
                                               required: true,
                                           }
                                       ]}>
                                <Select
                                    size="large"
                                    dropdownClassName="text-right"
                                    // onChange={ (value) => onUserLevelChange(value)}
                                    // onChange={value => setActiveCityFields(value)}
                                >
                                    {
                                       basicInfo.countryDivisionLevel.map((item, index) => (
                                           <Select.Option value={item.value} key={index}>{item.name}</Select.Option>

                                       ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col className="px-2" span={24} >
                            <Form.Item className="my-5" label="متن اعتراض  " name="description"
                                       rules={[
                                           {
                                               required: true,
                                           }
                                       ]}>
                               <TextArea rows={7}/>
                            </Form.Item>
                        </Col>
                        <Col className="px-2" span={24}>
                            <Form.Item className="mb-5" label="ضمیمه کردن فایل" name="">
                                <Upload
                                    name="file"
                                    action={ MEDIA_URL + COMPLAINTS_ATTACHMENTS_UPLOAD(2) }
                                    listType="picture"
                                    headers={{
                                        Authorization: `Bearer ${getTokenObject().Authorization}`
                                    }}
                                    onChange={ (info) => {
                                        if (info.file.status === 'done') {
                                            if (info.file.response.isSuccess){
                                                setAttachmentsList( state => [...state, {
                                                    fileSize: info.file.response.data.fileSize,
                                                    fileFormat: info.file.response.data.fileFormat,
                                                    path: info.file.response.data.path,
                                                }])
                                            }
                                        }
                                    }}
                                >
                                    <Button>انتخاب فایل</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="text-left px-2">
                        <Button size="large" type="primary" loading={isLoading} htmlType="submit">ذخیره و ارسال</Button>
                    </div>
                </Form>
            </div>

        </div>
    )
}

export default New
