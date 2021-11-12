import React from 'react';
import {NavLink as NavLinkRouter} from "react-router-dom";
import { Button, Form, Input, Row, Col } from 'antd';
import ContentsTable from "./contentsTable";
import {ReactComponent as AddFilePic} from "../../assets/icons/note_add_black.svg";
import { useSelector } from 'react-redux';
import { useTokenClaims } from '../public/hooks';


function ContentsList(props) {

    const [form] = Form.useForm();
    const {listCount} = useSelector(state => state.content.list)
    const { roles = [] } = useTokenClaims();

    return (
        <div>
            <div className="text-left">
                {
                    roles.includes("2.1") && (
                        <NavLinkRouter to="/contents/add" >
                            <Button className="px-4" size="large" icon={<AddFilePic />} type="primary">ساخت محتوای جدید </Button>
                        </NavLinkRouter>
                    )
                }
            </div>
            <div className="d-flex justify-content-between mt-4 mb-3">
                <span className="square-indicator mt-4">
                    لیست محتواها
                    <span className="text-muted mr-2 font-size-sm"> تعداد رکوردها : {listCount} </span>
                </span>
                <div>
                    {/*<Form*/}
                    {/*    layout="vertical"*/}
                    {/*    form={form}*/}
                    {/*    labelCol= {{ span: 24 }}*/}
                    {/*    wrapperCol= {{ span: 24 }}*/}
                    {/*>*/}
                    {/*    <Row className="d-flex justify-content-end">*/}
                    {/*        <Col className="mr-4" span={5}>*/}
                    {/*            <Form.Item label="ارسال کننده">*/}
                    {/*                <Input />*/}
                    {/*            </Form.Item>*/}
                    {/*        </Col>*/}
                    {/*        <Col className="mr-4" span={5}>*/}
                    {/*            <Form.Item label="دسته بندی">*/}
                    {/*                <Input />*/}
                    {/*            </Form.Item>*/}
                    {/*        </Col>*/}
                    {/*        <Col className="mr-4" span={5}>*/}
                    {/*            <Form.Item label="گروه">*/}
                    {/*                <Input />*/}
                    {/*            </Form.Item>*/}
                    {/*        </Col>*/}
                    {/*        <Col className="mr-4" span={6}>*/}
                    {/*            <Form.Item label="    ">*/}
                    {/*                <Input placeholder="جستجوی نام یا کدملی" />*/}
                    {/*            </Form.Item>*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    {/*</Form>*/}
                </div>
            </div>
            <div>
                <ContentsTable />
            </div>
        </div>
    )
}

export default ContentsList
