import {Comment, Avatar, Form, Button, List, Input, Col, Row, Select, Upload} from 'antd';
import moment from 'moment';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import {postComment, postPeopleComment} from "../../redux/violation/violationRetrieve"
import {error} from "../../utils/message";
import { QueryUrl } from '../../utils/utils';
import { useTokenClaims } from '../public/hooks';

const {TextArea} = Input;

const CommentList = ({comments}) => (
    <List
        dataSource={comments}
        // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment
            actions={[]}
            avatar={
                <Avatar
                    src={props.image}
                    alt="Han Solo"
                />
            }
            content={
                <div>
                    <div className="text-muted small">{props.creatorFullName} <span className="mr-3">{props.date}</span></div>
                    <p>{props.text}</p>
                </div>

            }
        />}
    />
);

const Editor = ({onChange, onSubmit, submitting, value}) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item className="text-left">
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                ارسال نظر
            </Button>
        </Form.Item>
    </>
);

const Chat = () => {


    const {comments,violation,isLoading} = useSelector(state => state.violation.retrieve);
    const basicInfo = useSelector(state => state.basicInfo);
    const dispatch = useDispatch();
    let {id} = useParams();
    const [form] = Form.useForm();
    const location = useLocation();

    const { roles = [] } = useTokenClaims();

    const onFinish = (values) => {
        let params = QueryUrl(location.search)
        if (params.isPeople){
            dispatch(postPeopleComment(id, { peopleViolationId: id,...values}))
        }else{
            dispatch(postComment(id, { violationId: id,...values}))
        }
    }

    useEffect(()=>{
        if(violation?.violationState)
        form.setFieldsValue({violationStateType:violation.violationState,text:''})
    },[violation,isLoading])

    return (
        <>
            <div className="content mb-5 p-4">
                <div className="mb-3">
                    <span className="square-indicator">
                    <span className="pl-1">بررسی تخلف</span>
                    </span>
                </div>
                <div className="px-xl-5 mt-4">
                    {
                        roles.includes("5.5") && (
                            <Form
                                layout="vertical"
                                form={form}
                                labelCol={{span: 12}}
                                wrapperCol={{span: 24}}
                                initialValues={{
                                    violationId: id
                                }}
                                onFinish={onFinish}
                            >
                                <Row>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <Form.Item name="violationStateType" label="وضعیت تخلف"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "تکمیل این فیلد ضروری است",
                                                    }
                                                ]}
                                        >
                                            <Select
                                                size="large"
                                                dropdownClassName="text-right"
                                                showArrow={true}
                                                searchValue={false}
                                            >
                                                {
                                                    basicInfo.violationState?.map((item, index) => (
                                                        <Select.Option value={item.value}
                                                                    key={index}>{item.name}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col className="px-2" span={24}>
                                        <Form.Item name="text">
                                            <TextArea placeholder="نظر خود را بنویسید" rows={4}/>
                                        </Form.Item>
                                    </Col>
                                    <Col className="px-2" span={24}>
                                        <div className="text-left ">
                                            <Button size="large" type="primary" htmlType="submit"> ارسال نظر</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        )
                    }
                </div>
                <div>
                    <div className="mb-3">
                    <span className="square-indicator">
                    <span className="pl-1">نظرات</span>
                    <span>(</span>
                    <span>{comments?.length || 0}</span>
                    <span>)</span>
                    </span>
                    </div>
                    <div className="px-xl-5 mt-4">
                        <Row>
                        {
                            roles.includes("5.6") && (
                                <Col className="px-2" span={24}>
                                    {/*<Comment*/}
                                    {/*    actions={[]}*/}
                                    {/*    avatar={*/}
                                    {/*        <Avatar*/}
                                    {/*            src={personalPhotoAddress}*/}
                                    {/*            alt="Han Solo"*/}
                                    {/*        />*/}
                                    {/*    }*/}
                                    {/*    content={*/}
                                    {/*        <Editor*/}
                                    {/*            onChange={handleChange}*/}
                                    {/*            onSubmit={handleSubmit}*/}
                                    {/*            submitting={submitting}*/}
                                    {/*            value={value}*/}
                                    {/*        />*/}
                                    {/*    }*/}
                                    {/*/>*/}

                                    {comments.length > 0 && <CommentList comments={comments}/>}

                                </Col>
                            )
                        }
                        </Row>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Chat;
// import React from 'react';
//
// const Chat = () => {
//     return (
//         <div>
//             <div className="content mb-5 p-4">
//                 <div>
//                     <span className="square-indicator">
//                     <span className="pl-1">نظرات</span>
//                     <span>(</span>
//                     <span>22</span>
//                     <span>)</span>
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Chat;