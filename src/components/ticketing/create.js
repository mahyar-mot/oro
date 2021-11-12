import React from 'react';
import {NavLink as NavLinkRouter, useHistory} from "react-router-dom";
import {Form, Input, Button, Row, Col} from 'antd';
import {BsArrowLeft} from 'react-icons/bs';
import {useSelector, useDispatch} from 'react-redux';
import {createTicket, clearTicketCreate} from "../../redux/ticketing/ticketsCreate";



function AddTicket(props) {

    const { isLoading, isSuccess } = useSelector( state => state.tickets.create )

    const [form] = Form.useForm();

    const history = useHistory()
    const dispatch = useDispatch();

    React.useEffect( () => {
        if (!isLoading){
            if (isSuccess){
                setTimeout( () => history.push("/mytickets"), 500)
            }
        }
    },[isLoading])

    React.useEffect( () => {
        return () => dispatch(clearTicketCreate())
    }, [])

    const onFinish = (values) => {
        dispatch(createTicket(values))
        form.resetFields()
    }

    return (
        <div className="content mb-5">
            <div className="d-flex justify-content-between">
                <span className="square-indicator"> ساخت تیکت جدید </span>
                <div className="ml-2">
                    <NavLinkRouter className="text-decoration-none" to="/mytickets">
                        <span className="link-color">بازگشت به لیست تیکت‌های ارسالی  <BsArrowLeft/></span>
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
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                            <Form.Item label=" عنوان تیکت " name="title"
                                       rules={[
                                           {
                                               required: true,
                                               message: "تکمیل این فیلد لازم است"
                                           }
                                       ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                    <Col className="px-2" xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label=" متن تیکت " name="description"
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
                    
                    <div className="text-left px-2">
                        <Button size="large" type="primary" loading={isLoading} htmlType="submit">ارسال تیکت</Button>
                    </div>
                </Form>
            </div>

        </div>
    )
}

export default AddTicket
