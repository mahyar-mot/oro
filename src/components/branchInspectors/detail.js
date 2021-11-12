import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink as NavLinkRouter, useParams, useHistory, useLocation} from "react-router-dom";
import {Form, Row, Col, Select, Input, Button, Avatar, Modal} from "antd";
import {BsArrowLeft} from 'react-icons/bs';
import classNames from "classnames"
// import { getUserComplaint, resetComplaint } from "../../redux/complaints/userComplaintRetrieve";
import { setComplaintStatus, cleanComplaint } from "../../redux/complaints/userComplaintCreate";
import { getComplaintComments, resetComplaintComments, createComplaintComment } from "../../redux/complaints/comments";
// import { getComplaintAttachments, resetComplaintAttachments } from "../../redux/complaints/attachments";
import { getUserComplaint, resetComplaint } from "../../redux/listComplaint/listComplaintDetail"
import { getTicket, clearTicket } from "../../redux/ticketing/ticketsRetrieve";
import { replyToTicket, clearTicketCreate } from "../../redux/ticketing/ticketsCreate";
import { getBasicInfo } from '../../redux/basicInfos';
import { ReactComponent as ProfileLogo } from "../../assets/icons/profile picture.svg";
import { ReactComponent as DownloadPic } from "../../assets/icons/download_for_offline_black_24dp.svg"
import { components } from 'react-select';
import {UserOutlined} from '@ant-design/icons';
import {FaUserCircle} from "react-icons/fa";
import { useTokenClaims } from '../public/hooks';
import { QueryUrl, UrlQuery } from '../../utils/utils';


function HeadOverseerDetail(props) {

    const [form] = Form.useForm();
    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const { roles = [] } = useTokenClaims();

    const basicInfo = useSelector(state => state.basicInfo);
    const { ticket, isLoading } = useSelector( state => state.tickets.retrieve )
    const { isSuccess, isLoading: setStateLoading } = useSelector( state => state.tickets.create)

    React.useEffect( () => {
        dispatch(getTicket(id))
        if (!basicInfo.apiHasCalled){
            dispatch(getBasicInfo())
        }
        return () => {
            dispatch(clearTicket());
            dispatch(clearTicketCreate());
        }
    }, [dispatch])

    React.useEffect( () => {
        if (Object.keys(ticket).length){
            form.setFieldsValue({'stateType': ticket.stateType})
        }
    }, [ticket])

    React.useEffect( () => {
        if(!setStateLoading){
            if(isSuccess){
                history.goBack()
            }
        }
    }, [isSuccess, setStateLoading])

    const onFinish = values => {
        values.ticketId = id;
        if(values.stateType){
            dispatch(replyToTicket(values))
        }
    }

    const handleGoBack = () => {
        let querys = location.search !== '' ? QueryUrl(location.search) : {}            
        let nextPage = querys?.myTicket ? "mytickets" : 'tickets'
        delete querys["myTicket"]
        history.push(UrlQuery(`/${nextPage}`, querys))
    }

    return (
        <>
            <div className="text-left">
                <a className="text-decoration-none" onClick={ () => handleGoBack()} >
                    <span className="link-color">بازگشت به لیست تیکت‌ها <BsArrowLeft /></span>
                </a>
            </div>
            <div className="content">
                {
                    !isLoading && (
                        <>
                            <div>
                                <div className="px-lg-4">
                                    <span className="square-indicator"> {ticket?.title} </span>
                                </div>

                            </div>
                        <div className="px-lg-4 mt-4">
                            {/* <div>
                                <div>
                                    <span className="text-muted font-size-sm ">ایجاد شده در تاریخ :{ticket?.createDate?.split("  ")[1]} {ticket?.createDate?.split(" ")[0]}</span>
                                </div>
                                <div>
                                    { complaint?.protestStatus === 4 && <span className="text-danger font-size-sm "> رد شده در تاریخ : {complaint.statusDate} - توسط : { complaint.statusUserFullName} </span> }
                                    { complaint?.protestStatus === 3 && <span className="text-success font-size-sm " > تایید شده در تاریخ : {complaint.statusDate} - توسط : { complaint.statusUserFullName} </span>}
                                </div>
                            </div> */}
                                <div className="d-xl-flex justify-content-between align-items-center text-wrapper p-2 p-md-4" >
                                    <div className="py-1 p-xl-0">
                                        <Avatar shape="square" size={64} icon={<UserOutlined/>} src={ticket?.creatorImage}/>
                                        <span className="link-color">نام‌ونام‌خانوادگی : </span>
                                        {ticket?.creatorFullName}
                                    </div>
                                    <div className="py-1 p-xl-0"><span className="link-color">کدملی : </span>{ticket?.creatorNationalNo}</div>
                                    <div className="py-1 p-xl-0"><span className="link-color">شماره تلفن‌همراه : </span>{ticket?.creatorMobile}</div>
                                    <div className="py-1 p-xl-0">
                                        <span className="link-color">موقعیت : </span>
                                        {ticket?.countryDivisionDetail}
                                    </div>
                                </div>

                                <div className=" mt-5">
                                    {
                                        Boolean(ticket?.tickets?.length) && ticket.tickets.map( (item, index) =>
                                            <Row key={index}>
                                                <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={{span: 16, offset: ticket.creatorFullName === item.creatorFullName ? 0 : 8 }}
                                                    lg={{span: 16, offset: ticket.creatorFullName === item.creatorFullName ? 0 : 8 }}
                                                    xl={{span: 16, offset: ticket.creatorFullName === item.creatorFullName ? 0 : 8 }}
                                                >
                                                    <div className="d-flex justify-content-between">
                                                        <div className={classNames({"order-last": ticket.creatorFullName !== item.creatorFullName })}> <FaUserCircle /> {item.creatorFullName}</div> 
                                                        <small className="dir-ltr" >{item?.createDate}</small>
                                                    </div>
                                                    <p className="text-wrapper p-3">
                                                        {item?.description}
                                                    </p>
                                                </Col>
                                            </Row>

                                        )
                                    }
                                </div>
                        </div>

                        </>
                    )
                }
            </div>
            {
                Boolean(Object.keys(ticket).length) && ticket.stateType !== 4 && roles.includes("6.3") && (
                    <div className="content mb-5 ">
                        <span className="square-indicator">پاسخ به تیکت</span>
                        <div className="px-lg-5 mt-4">
                            <Form
                                layout="vertical"
                                form={form}
                                labelCol= {{ span: 15 }}
                                wrapperCol= {{ span: 24 }}
                                onFinish={onFinish}
                                initialValues={{description: ''}}
                            >
                                <Row>
                                    <Col className="" xs={24} sm={12} md={12} lg={8} xl={7}>
                                        <Form.Item name="stateType" label="وضعیت تیکت">
                                            <Select 
                                                size="large"
                                                dropdownClassName="text-right"
                                            >
                                                {
                                                    basicInfo.ticketStateType.map( (item, index) => (
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
                                        <Form.Item  name="description" label="متن پاسخ">
                                            <Input.TextArea rows={7} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <div className="text-left mt-5  mb-3">
                                    <Button className="px-4" size="large" loading={setStateLoading} type="primary" htmlType="submit" >تایید و ارسال</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default HeadOverseerDetail
