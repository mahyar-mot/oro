import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink as NavLinkRouter, useParams, useHistory, useLocation} from "react-router-dom";
import {Form, Row, Col, Select, Input, Button, Upload, Modal} from "antd";
import {BsArrowLeft} from 'react-icons/bs';
// import { getUserComplaint, resetComplaint } from "../../redux/complaints/userComplaintRetrieve";
import { setComplaintStatus, cleanComplaint } from "../../redux/complaints/userComplaintCreate";
import { getComplaintComments, resetComplaintComments, createComplaintComment } from "../../redux/complaints/comments";
// import { getComplaintAttachments, resetComplaintAttachments } from "../../redux/complaints/attachments";
import { getUserComplaint, resetComplaint } from "../../redux/listComplaint/listComplaintDetail"
import { getBasicInfo } from '../../redux/basicInfos';
import {downloadAttachment, clearAttachmentFile} from '../../redux/uploadFile';
import { ReactComponent as ProfileLogo } from "../../assets/icons/profile picture.svg";
import { ReactComponent as DownloadPic } from "../../assets/icons/download_for_offline_black_24dp.svg"
import { components } from 'react-select';
import { useTokenClaims } from '../public/hooks';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}



function ComplaintDetail(props) {

    const [form] = Form.useForm();
    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const { roles = [] } = useTokenClaims();

    const basicInfo = useSelector(state => state.basicInfo);
    const { complaint, isLoading, error } = useSelector( state => state.listComplaint.retrieve )
    // const { attachments , isLoading: attachemtsLoading } = useSelector( state => state.complaint.attachments)
    // const { comments , isLoading: commentsLoading } = useSelector( state => state.complaint.comments)
    const { isSuccess, isLoading: setStatusLoading } = useSelector( state => state.complaint.create)
    const { attachmentFile, isDone } = useSelector( state => state.uploadFile )

    const [commentText, setCommentText] = React.useState('');
    const [previewVisible, setPreviewVisible] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [previewTitle, setPreviewTitle] = React.useState('');

    React.useEffect( () => {
        // dispatch(getUserComplaint(id))
        // dispatch(getComplaintAttachments(id))
        // dispatch(getComplaintComments(id))
        dispatch(getUserComplaint(id))
        if (!basicInfo.apiHasCalled){
            dispatch(getBasicInfo())
        }
        return () => {
            // dispatch(resetComplaint());
            // dispatch(resetComplaintAttachments());
            // dispatch(resetComplaintComments());
            dispatch(cleanComplaint());
            dispatch(resetComplaint())
            dispatch(clearAttachmentFile())
        }
    }, [dispatch])

    React.useEffect( () => {
        if (!setStatusLoading){
            if (isSuccess) history.push(`/list-complaints${location.search}`)
        }
    }, [setStatusLoading])

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

    const onFinish = values => {
        if(values.status){
            dispatch(setComplaintStatus(id, values))
        }
    }
    const handleCancel = () => setPreviewVisible(false );

    const handlePreview = async file => {

        if (!file.path) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.path )
        setPreviewTitle("دانلود")
        setPreviewVisible(true)
    };

    // const handleChange = ({ fileList }) => console.log(fileList[0]);
    const handleChange = ({ fileList }) => window.open(fileList[1].path);
    return (
        <>
            <div className="text-left">
                <NavLinkRouter className="text-decoration-none" to={`/list-complaints${location.search}`}>
                    <span className="link-color">بازگشت به لیست شکایات <BsArrowLeft /></span>
                </NavLinkRouter>
            </div>
            <div className="content">
                {
                    !isLoading && (
                        <>
                            <div>
                                <div className="px-lg-4">
                                    <span className="square-indicator">شکایت {complaint?.firstName} {complaint?.surname}</span>

                                </div>
                                {/*<div className="ml-2">*/}

                                {/*    <span className="square-indicator">شکایت {complaint?.firstName} {complaint.surname}</span>*/}
                                {/*    <span className="text-muted font-size-sm mr-4">{complaint?.createDate?.split("  ")[1]} {complaint?.createDate?.split(" ")[0]}</span>*/}
                                {/*</div>*/}

                            </div>
                        <div className="px-lg-4 mt-4">
                            <div>
                                <div>
                                    <span className="text-muted font-size-sm ">ایجاد شده در تاریخ :{complaint?.createDate?.split("  ")[1]} {complaint?.createDate?.split(" ")[0]}</span>
                                </div>
                                <div>
                                    { complaint?.protestStatus === 4 && <span className="text-danger font-size-sm "> رد شده در تاریخ : {complaint.statusDate} - توسط : { complaint.statusUserFullName} </span> }
                                    { complaint?.protestStatus === 3 && <span className="text-success font-size-sm " > تایید شده در تاریخ : {complaint.statusDate} - توسط : { complaint.statusUserFullName} </span>}

                                </div>
                            </div>

                            {
                                complaint?.protestTitle && (
                                <div className="mt-4">
                                    {/* <NavLinkRouter className="text-decoration-none" to="/list-complaints">
                                            <span className="link-color"> <ProfileLogo />  مشاهده مشخصات کاربر </span>
                                        </NavLinkRouter>  */}
                                        <span className="small">عنوان شکایت : </span>
                                        <span>{complaint?.protestTitle}</span>
                                    </div>
                                ) 
                            }
                                <div className="mt-4">
                                    <div className="d-flex justify-content-start">
                                        <div> <span className="small">کدملی : </span> {complaint?.nationalNo}</div>
                                        <div className="mr-4"><span className="small">شماره موبایل : </span> {complaint?.mobile}</div>
                                    </div>
                                </div>
                                <div className=" mt-3">
                                    <label className="mb-2 small">متن شکایت</label>
                                    <p className="text-wrapper p-2 p-md-4" style={{lineHeight:"2rem"}}>
                                        {complaint?.description}
                                    </p>
                                </div>
                                <div className="mt-3">
                                    {
                                        !isLoading && Boolean(complaint?.attachments?.length) && (
                                            <>
                                                <p className="mb-2 small">فایل ضمیمه</p>
                                                <div className="d-flex" >
                                                    <Upload
                                                        // listType="picture-card"
                                                        listType="picture"
                                                        fileList={complaint?.attachments.map(t=>({name:` دانلود  `, uid: t.path, ...t}))}
                                                        className="upload-list-inline"
                                                        onPreview={file => dispatch(downloadAttachment(file.path))}
                                                        // onChange={handleChange}
                                                        showUploadList={{showDownloadIcon:true,removeIcon :false,showRemoveIcon:false,downloadIcon :<span>fdsf</span>}}
                                                    >
                                                        {complaint?.attachments.length >= 8 ? null : ""}
                                                    </Upload>
                                                    <Modal
                                                        centered
                                                        width={800}
                                                        visible={previewVisible}
                                                        title={previewTitle}
                                                        footer={null}
                                                        onCancel={handleCancel}
                                                        className="text-right"
                                                    >
                                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                                    </Modal>
                                                    {/*{complaint?.attachments.map( (item, index) => (*/}
                                                    {/*        <div key={index} className="ml-2">*/}
                                                    {/*    <span>*/}

                                                    {/*        <a href={item.path} download target="_blank">*/}
                                                    {/*            /!*<DownloadPic />*!/*/}
                                                    {/*            <img src={item.path} style={{maxWidth:"80px"}} alt="pic"/>*/}
                                                    {/*        </a>*/}
                                                    {/*    </span>*/}
                                                    {/*        </div>*/}
                                                    {/*    )*/}
                                                    {/*)}*/}
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                        </div>

                        </>
                    )
                }
            </div>
            {/* <div className="content p-5">
                <span className="square-indicator">نظر کارشناس</span>
                {
                    Boolean(complaint?.comments?.length) && complaint.comments.map( (item, index) => (
                        <div className="p-3 mt-2" key={index} style={{backgroundColor: "#F2F6FE", borderRadius: "10px"}}>
                            <div className="d-flex justify-content-between mb-3" >
                                <div>
                                    <ProfileLogo />
                                    {item.userFullName}
                                    <span className="text-muted font-size-sm mr-2">{item.countryDivisionTitle}</span>
                                </div>
                                <div>
                                    {item.createDate}
                                </div>
                            </div>
                            <p className="px-3">{item.text}</p>
                        </div>  
                    ))
                }
                {
                    <>
                        <Row className="mt-4">
                            <Col className="" span={22}>
                                <Form.Item className="mt-3" name="statusDescription" label="متن پاسخ">
                                    <Input.TextArea value={commentText} onChange={ e => setCommentText(e.target.value) } rows={7} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <div className="text-left mt-5 ml-4">
                            <Button 
                                className="px-4" 
                                size="large" 
                                type="primary" 
                                onClick={ () => {
                                    if (commentText !== ''){
                                        let payload = {
                                            protestId: id,
                                            text: commentText
                                        }
                                        dispatch(createComplaintComment(payload))
                                    }
                                }}
                            >تایید و ارسال</Button>
                        </div>
                    </>
                }
            </div> */}
            <div className="content mb-5 ">
                <span className="square-indicator">پاسخ به شکایت</span>
                <div className="px-lg-5 mt-4">
                    {
                        roles.includes("3.3") && [1,2].includes(complaint?.protestStatus) && (
                            <Form
                                    layout="vertical"
                                    form={form}
                                    labelCol= {{ span: 15 }}
                                    wrapperCol= {{ span: 24 }}
                                    onFinish={onFinish}
                                    initialValues={{statusDescription: ''}}
                                >
                                    <Row>
                                        <Col className="" xs={24} sm={12} md={12} lg={8} xl={7}>
                                            <Form.Item name="status" label="وضعیت شکایت">
                                                <Select 
                                                    size="large"
                                                    dropdownClassName="text-right"
                                                >
                                                    {
                                                        basicInfo.protestStatus.map( (item, index) => (
                                                                // first two parameters is not needde here so it is filtered
                                                                <Select.Option key={index} value={item.value} >{item.name}</Select.Option>
                                                            ) 
                                                        )
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="" span={24}>
                                            <Form.Item  name="statusDescription" label="متن پاسخ">
                                                <Input.TextArea rows={7} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <div className="text-left mt-5  mb-3">
                                        <Button className="px-4" size="large" loading={setStatusLoading} type="primary" htmlType="submit" >تایید و ارسال</Button>
                                    </div>
                            </Form>
                        )
                    }
                    <Col className="" span={24}>
                        <p className="mb-2 ">متن پاسخ</p>
                        <Form.Item >
                            <Input.TextArea value={complaint.statusDescription} disabled rows={7} />
                        </Form.Item>
                    </Col>
                </div>
            </div>
        </>
    )
}

export default ComplaintDetail
