import React from 'react';
import {NavLink as NavLinkRouter, useHistory} from "react-router-dom";
import {Form, Input, Button, Row, Col, Select, Checkbox, Spin} from 'antd';
import {BsArrowLeft} from 'react-icons/bs';
import {useSelector, useDispatch} from 'react-redux';
import { getHeadOverseer, cleanHeadOverseerDetail, getHeadOverseerBranches } from "../../redux/headOverseers/headOverseerDetail";
import CountryDivisions from "../public/countryDivisions";
// import { getHeadOverseerAllowedBranches, cleanBranchesList } from "../../redux/branches/branchesList";
import { getHeadOverseerAllowedBranches , cleanHeadOverseersList, getAllowedBranchesNextPage } from "../../redux/headOverseers/headOverseersList";
import { createHeadOverseer, cleanHeadOverseer } from "../../redux/headOverseers/headOverseerCreate";
import { useTokenClaims } from '../public/hooks';


function AddHeadOverseer(props) {

    const { headOverseerDetail, headOverseerBranchesList } = useSelector(state => state.headOverseer.retrieve);
    const { branchesList, hasMore, isLoading: headOverseerListLoading } = useSelector(state => state.headOverseer.list);
    const { isLoading, isSuccess } = useSelector(state => state.headOverseer.create);
    // const { branchesList, isLoading: branchLoading } = useSelector(state => state.branch.list);

    const { countryDivisionCode } = useTokenClaims()

    const [form] = Form.useForm();

    const history = useHistory()
    const dispatch = useDispatch();

    const [selectedUser, setSelectedUser] = React.useState({});
    const [currentPage, setCurrentPage] = React.useState(1);
    const [TextSearch, setTextSearch] = React.useState('');

    React.useEffect( () => {
        if (!isLoading){
            if (isSuccess){
                setTimeout( () => history.push("/headoverseers"), 500)
            }
        }
    },[isLoading])

    React.useEffect( () => {
        return () => {
            dispatch(cleanHeadOverseerDetail())
            dispatch(cleanHeadOverseer())
            // dispatch(cleanBranchesList())
            dispatch(cleanHeadOverseersList())
        }
    }, [])

    React.useEffect( () => {
        if (Object.keys(selectedUser).length){
            form.setFieldsValue(selectedUser)
            dispatch(getHeadOverseerBranches(selectedUser.nationalNo, {ownBranches: true, pageSize: 20}))
            dispatch(getHeadOverseerAllowedBranches(selectedUser.nationalNo, {ownBranches: false, pageSize: 100}))
        }
    }, [selectedUser])

    React.useEffect( () => {
        if (headOverseerBranchesList.length){
            form.setFieldsValue({
                "branchIds": headOverseerBranchesList.map( item => item.id )
            })
        }
    }, [headOverseerBranchesList, branchesList])

    const onFinish = (values) => {
        let payload = {
            "headSupervisorNationalNo": selectedUser.nationalNo,
            branchIds: values.branchIds
        }
        dispatch(createHeadOverseer(payload))
    }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom && hasMore){
            dispatch(getAllowedBranchesNextPage(selectedUser.nationalNo, {search: TextSearch, ownBranches: false, page: currentPage + 1, pageSize: 100}))
            setCurrentPage(state => state+1)
        }
    }

    return (
        <div className="content mb-5">
            <div className="d-flex justify-content-between">
                <span className="square-indicator"> افزودن سرناظر جدید </span>
                <div className="ml-2">
                    <NavLinkRouter className="text-decoration-none" to="/headoverseers">
                        <span className="link-color">بازگشت به لیست سرناظران  <BsArrowLeft/></span>
                    </NavLinkRouter>
                </div>
            </div>
            <div className="px-xl-5 mt-4" onScroll={ e => handleScroll(e) } >
                <Form
                    layout="vertical"
                    form={form}
                    labelCol={{span: 10}}
                    wrapperCol={{span: 22}}
                    onFinish={onFinish}
                >
                    <Row>
                        <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                            <Form.Item label=" کاربر " name="supervisor"
                                rules={[
                                    {
                                        required: !Boolean(selectedUser.length),
                                        message: "تکمیل این فیلد لازم است"
                                    }
                                ]}>
                                <Select
                                    allowClear
                                    showSearch
                                    dropdownClassName="text-right"
                                    defaultActiveFirstOption={false}
                                    showArrow={false}
                                    filterOption={false}
                                    tagRender={ () => {}}
                                    onSearch={ value => {
                                        if (value === '' || value === null || value.length <= 5){
                                            dispatch(cleanHeadOverseerDetail())
                                        }else{
                                            dispatch(getHeadOverseer(countryDivisionCode, {nationalNo: value, havingBranchType: 1}))
                                        }
                                    }}
                                    onChange={ (value, option) => {
                                        if (option){
                                            setSelectedUser( option.data_username )
                                        }else {
                                            setSelectedUser( {} )
                                            setTextSearch('')
                                            setCurrentPage(1)
                                            dispatch(cleanHeadOverseersList())
                                            dispatch(getHeadOverseerBranches())
                                            form.resetFields()
                                        }
                                        // setTimeout( () => {
                                        //     dispatch(cleanHeadOverseerDetail())
                                        //     form.setFieldsValue({"supervisor": ''})
                                        // }, 300 )
                                    }}
                                >
                                    {
                                        headOverseerDetail.map( (item, index) => (
                                            <Select.Option value={item.id} key={index} data_username={item}>{item.name} {item.surname} - {item.nationalNo}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    {
                        Boolean(Object.keys(selectedUser).length) && (
                            <>
                                <Row>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                                        <Form.Item label=" نام " name="name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "تکمیل این فیلد لازم است"
                                                    }
                                                ]}>
                                            <Input disabled={ Boolean(Object.keys(selectedUser).length) } />
                                        </Form.Item>
                                    </Col>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                                        <Form.Item label=" نام خانوادگی " name="surname"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "تکمیل این فیلد لازم است"
                                                    }
                                                ]}>
                                            <Input disabled={ Boolean(Object.keys(selectedUser).length) } />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                                        <Form.Item label=" کدملی " name="nationalNo"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "تکمیل این فیلد لازم است"
                                                    }
                                                ]}>
                                            <Input disabled={ Boolean(Object.keys(selectedUser).length) } />
                                        </Form.Item>
                                    </Col>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                                        <Form.Item label=" تلفن همراه " name="mobile"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "تکمیل این فیلد لازم است"
                                                    }
                                                ]}>
                                            <Input disabled={ Boolean(Object.keys(selectedUser).length) } />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <CountryDivisions form={form} visibleFields={selectedUser.countryDivisionCode.split(".").length} defaultCode={ selectedUser.countryDivisionCode } />
                                {/* <Row>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} >
                                        <Form.Item label=" لیست شعب را برای سرناظر انتخاب کنید " name="branch"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "تکمیل این فیلد لازم است"
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
                                                    if (value === '' || value === null || value.length <= 4){
                                                        dispatch(cleanBranchesList())
                                                    }else{
                                                        dispatch(getHeadOverseerAllowedBranches({name: value, countryDivisionCode: selectedUser.countryDivisionCode, pageSize: 100}))
                                                    }
                                                }}
                                                // onChange={ (value, option) => setSelectedBranch(option.data_username) }
                                            >
                                                { branchesList.map( (item, index) => (
                                                    <Select.Option value={item.id} key={index} data_username={item} >{item.name}</Select.Option>
                                                ) )}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row> */}
                                <Row>
                                    <Col className="px-2 mt-3" xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <h6>لیست شعب</h6>
                                        <Input.Search size="large" placeholder=" جست‌جو در لیست شعب برای سرناظر  " enterButton onSearch={
                                            value => {
                                                if (value !== '' ){
                                                    dispatch(getHeadOverseerAllowedBranches(selectedUser.nationalNo, {search: value, ownBranches: false, pageSize: 100}))
                                                    setTextSearch(value)
                                                    setCurrentPage(1)
                                                }
                                            }
                                        } />
                                    </Col>
                                </Row>
                                {/* <Form.Item className="mt-4" name="ownedBranchIds">
                                    <Checkbox.Group style={{width: "100%"}}>
                                        <Row>
                                            {headOverseerBranchesList.map((item,i) =>  ( 
                                                <Col key={i} xs={12} sm={12} md={12} lg={8} xl={6} className="mb-3">
                                                    <Checkbox value={item.id} defaultChecked={item.checked}>{item.name}</Checkbox>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item> */}
                                <Form.Item className="mt-4" name="branchIds">
                                    <Checkbox.Group style={{width: "100%"}}>
                                        <Row style={{height: "1000px", overflow: "auto"}} >
                                            {[...headOverseerBranchesList, ...branchesList].map((item,i) =>  ( 
                                                <Col key={i} xs={12} sm={12} md={12} lg={8} xl={6} className="mb-3">
                                                    <Checkbox value={item.id} checked={item.checked} disabled={!item.editable}>{item.name}</Checkbox>
                                                </Col>
                                            ))}
                                            <Spin spinning={headOverseerListLoading}></Spin>
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                            </>
                        )
                    }
                    <div className="text-left px-2">
                        <Button size="large" type="primary" loading={isLoading} htmlType="submit">افزودن سرناظر</Button>
                    </div>
                </Form>
            </div>

        </div>
    )
}

export default AddHeadOverseer
