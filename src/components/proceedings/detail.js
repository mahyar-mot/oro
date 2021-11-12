import React from 'react';
import {NavLink as NavLinkRouter, useHistory, useLocation, useParams} from "react-router-dom";
import {Form, Input, Button, Row, Col, Upload, List, Spin} from 'antd';
import {BsArrowLeft} from 'react-icons/bs';
import {useSelector, useDispatch} from 'react-redux';
import { getTokenObject } from '../../utils/utils';
import {downloadAttachment, clearAttachmentFile} from '../../redux/uploadFile';
import { useTokenClaims } from '../public/hooks';
import { getProceeding, clearProceeding, getProceedingFiles } from '../../redux/proceedings/proceedingsRetrieve';


function ProceedingDetail(props) {

    const { id } = useParams();

    const { isLoading, proceeding, proceedingFiles } = useSelector( state => state.proceedings.retrieve )

    const [form] = Form.useForm();

    const { nationalNumber } = useTokenClaims();
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch();

    const { attachmentFile, isDone } = useSelector( state => state.uploadFile )


    React.useEffect( () => {
        dispatch(getProceeding(id))
        dispatch(getProceedingFiles(id))
        return () => {
            dispatch(clearProceeding())
            dispatch(clearAttachmentFile())
        }
    }, [])

    React.useEffect( () => {
        if (Object.keys(proceeding).length){
            form.setFieldsValue(proceeding)
        }
    }, [proceeding] )

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

    return (
        <div className="content mb-5">
            <div>
                <List 
                    header={
                        <div className="d-flex justify-content-between">
                            <div>
                                <span className="square-indicator">مشخصات شعبه :  {proceeding?.name}  </span>
                            </div>
                            <div>
                                <NavLinkRouter className="text-decoration-none" to={`/proceedings${location.search}`}>
                                    <span className="link-color">بازگشت به لیست صورتجلسات<BsArrowLeft/></span>
                                </NavLinkRouter>
                            </div>
                        </div>
                    }
                >
                    <Spin spinning={isLoading}>
                        <List.Item className="px-4 list-alternate-bg ">
                            <Row className="w-100">
                                <Col xs={8} sm={8} md={8} lg={10} xl={10}>
                                    <span>کد شعبه : </span><span>{proceeding?.branchNumber}</span>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <span>نوع شعبه : </span><span>{proceeding?.branchTypeTitle}</span>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={6} xl={6}>
                                    {/* <a className="link-color" onClick={ () => setBallotBoxModal(true)}> کدهای صندوق </a> */}
                                </Col>
                                {/* <BallotBoxModal ballotBoxModal={ballotBoxModal} setBallotBoxModal={setBallotBoxModal} data={proceeding?.ballotBoxes} /> */}
                            </Row>
                        </List.Item>
                        <List.Item className="px-4">
                            <Row className="w-100">
                                <Col xs={8} sm={8} md={8} lg={10} xl={10}>
                                    <span>استان : </span><span>{proceeding?.branchCountryDivisions?.map( (item, i) => i === 1 ? item.name : "" )}</span>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <span>شهرستان : </span><span>{proceeding?.branchCountryDivisions?.map( (item, i) => i === 2 ? item.name : "" )}</span>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={6} xl={6}>
                                    <span>بخش : </span><span>{proceeding?.branchCountryDivisions?.map( (item, i) => i === 3 ? item.name : "" )}</span>
                                </Col>
                            </Row>
                        </List.Item>
                        <List.Item className="px-4 list-alternate-bg ">
                            <Row className="w-100">
                                <Col xs={8} sm={8} md={8} lg={10} xl={10}>
                                    <span>شهر : </span><span>{proceeding?.branchCountryDivisions?.map( (item, i) => i === 4 ? item.name : "" )}</span>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <span>منطقه/روستا : </span><span>{proceeding?.branchCountryDivisions?.map( (item, i) => i === 5 ? item.name : "" )}</span>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={6} xl={6}>
                                    {/* <span>روستا : </span><span>125</span> */}
                                </Col>
                            </Row>
                        </List.Item>
                        <List.Item className="px-4">
                            <Row className="w-100">
                                <Col xs={24} sm={14} md={12} lg={12} xl={10}>
                                    <span>موقعیت : </span><span>{proceeding?.branchLocation}</span>
                                </Col>
                                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                    <span>تلفن تماس : </span><span>{proceeding?.branchPhoneNo}</span>
                                </Col>
                            </Row>
                        </List.Item>
                    </Spin>
                </List>
            </div>
            <Spin spinning={isLoading}>
                <div className="d-flex justify-content-between mt-3">
                    <span className="square-indicator"> جزیات صورتجلسه </span>
                    <div className="ml-2">

                    </div>
                </div>
                <div className="px-xl-5 mt-4" >
                    <Form
                        layout="vertical"
                        form={form}
                        labelCol={{span: 10}}
                        wrapperCol={{span: 22}}
                        // onFinish={onFinish}
                    >
                        <Row>
                            <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item className="" label=" نوع صورتجلسه " name="proceedingTypeTitle">
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                                <Form.Item name="attachments" className="mt-3" label="فایل صورتجلسه">
                                    <div className="d-flex">
                                        <Upload
                                            className="cursor-pointer"
                                            // listType="picture-card"
                                            listType="picture"
                                            fileList={proceedingFiles.map(t => (
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
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="px-2" xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item label="توضیحات" name="description">
                                    <Input.TextArea disabled rows={5} />
                                </Form.Item>
                            </Col>
                        </Row>
                        
                        {/* <div className="text-left px-2 mt-2">
                            <Button size="large" type="primary" loading={isLoadingFile || isLoading} htmlType="submit">ارسال صورتجلسه</Button>
                        </div> */}
                    </Form>
                </div>
            </Spin>
        </div>
    )
}

export default ProceedingDetail
