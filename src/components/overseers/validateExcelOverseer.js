import React from 'react';
import {NavLink as NavLinkRouter, useHistory} from "react-router-dom";
import {Form, Input, Button, Radio, Row, Col, Table, Select, Spin} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {BsArrowLeft} from 'react-icons/bs';
import {MdAddAlert} from 'react-icons/md';
import CountryDivisions from '../public/countryDivisions';
import {useSelector, useDispatch} from 'react-redux';
import {uploadExcel, cleanUploadFile} from '../../redux/uploadFile';
import {getBasicInfo} from '../../redux/basicInfos';
import {cleanOverseer, InsertOverseerExcel} from '../../redux/overseers/overseersCreate';
import {getCountries} from '../../redux/countries';
import { SUPERVISOR_EXCEL_SAMPLE } from "../../utils/constants";
import { useTokenClaims } from '../public/hooks';
import  ExcelTable  from "./excelTable"


function ValidateExcelOverseers(props) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { countryDivisionCode } = useTokenClaims()
    const history = useHistory()
    
    const basicInfo = useSelector(state => state.basicInfo);

    const {
        overseersExcel,
        isLoading,
        isSuccess
    } = useSelector(state => state.overseer.create);

    const { userProfile } = useSelector( state => state.auth )
    const [activeCityFields, setActiveCityFields] = React.useState(1);

    const [selectedCode, setSelectedCode] = React.useState("")

    const [selectedUser, setSelectedUser] = React.useState({})
    const [cityNames, setCityNames] = React.useState(Array(6))

    const [editableUsers, setEditableUsers] = React.useState([])
    const [errorUsers, setErrorUsers] = React.useState([])
    
    React.useEffect(() => {
        if (!basicInfo.apiHasCalled) {
            dispatch(getBasicInfo())
        }
        dispatch(getCountries(1))
        return () => {
            dispatch(cleanUploadFile())
            dispatch(cleanOverseer())
        }
    }, [dispatch])

    React.useEffect( () => {
        if (countryDivisionCode){
            setActiveCityFields(countryDivisionCode.split(".").length)
        }
    }, [countryDivisionCode])

    React.useEffect( () => {
        if(!isLoading){
            if(Object.keys(overseersExcel).length){
                setEditableUsers(overseersExcel.notExistUserProfiles)
                setErrorUsers([...overseersExcel.imperfectUsers, ...overseersExcel.existUserProfiles])
            }
        }
    }, [overseersExcel, isLoading])

    React.useEffect( () => {
        if (!isLoading){
            if(isSuccess){
                setTimeout( () => history.push("/overseers"), 1000)
            }
        }
    }, [isLoading, isSuccess])

    React.useEffect( () => {
        if(Object.keys(selectedUser).length){
            form.setFieldsValue(selectedUser)
            setActiveCityFields(selectedUser.countryDivisionCode.split('.').length)
            setSelectedCode(selectedUser.countryDivisionCode)
            let cnames = Array(6)
            for (let i = 1 ; i < selectedUser?.parents?.length; i++){
                form.setFieldsValue({[`cityDiv-${i-1}`]: selectedUser?.parents[i]?.name})
                cnames[i] = {name : selectedUser?.parents[i]?.name}
            }
            setCityNames(cnames)
        }
    }, [selectedUser])

    const onFieldsChange = (changedFields, b, c) => {
        if (changedFields.length) {
            if (changedFields[0].name[0].startsWith("cityDiv")) {
                let currnetFieldName = changedFields[0].name[0];
                let currentCityDivNumber = parseInt(currnetFieldName.split('-')[1])
                for (let i = currentCityDivNumber + 1; i < 5; i++) {
                    form.setFieldsValue({[`cityDiv-${i}`]: ""})
                    setCityNames( state => {
                        let temp = state
                        temp[i+1] = {name: ''}
                        return temp
                    })
                }
            }
            if (changedFields[0].name[0].startsWith("assignmentTitle")){
                for (let i = changedFields[0].value ; i < 5; i++) {
                    setCityNames( state => {
                        let temp = state
                        temp[i] = {name: ''}
                        return temp
                    })
                }
            }
        }
    }

    const onFinish = (values) => {

        if (values["cityDiv-0"] === undefined){
            values["cityDiv-0"] = "1"
        }
        let countryCodes = Object.keys(values).filter( item => item.startsWith('cityDiv'))

        if (values[countryCodes[countryCodes.length -1]].startsWith("1")){
            values.countryDivisionCode = values[countryCodes[countryCodes.length - 1] ]
        }else if (values[countryCodes[countryCodes.length -1]] === ''){
            values.countryDivisionCode = values[countryCodes[countryCodes.length - 2] ]
        }else{
            values.countryDivisionCode = selectedUser.countryDivisionCode
        }
        values.parents = cityNames
        setEditableUsers( state => state.map( item => {
            if (item.nationalNo === values.nationalNo){
                return {...item, ...values}
            }else{
                return item
            }
        }))
        setTimeout( () => setCityNames(Array(6)), 500)
        setTimeout( () => setSelectedUser({}), 500)
        setTimeout( () => setSelectedCode(''), 500)
        setTimeout( () => form.resetFields(), 500)
        setTimeout( () => setActiveCityFields(1), 500)

    }

    return (
        <>
            <div className="ml-2 d-flex justify-content-end">
                    <NavLinkRouter className="text-decoration-none" to="/overseers">
                        <span className="link-color">بازگشت به لیست ناظران <BsArrowLeft/></span>
                    </NavLinkRouter>
            </div>
            {
                Boolean(Object.keys(selectedUser).length) && (
                <div className="content">
                    <div className="d-flex justify-content-between">
                        <span className="square-indicator">مشخصات ناظر</span>

                    </div>
                            <div className="px-xl-5">
                                <Spin size="large" spinning={isLoading} >
                                    <Form
                                        layout="vertical"
                                        form={form}
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 22}}
                                        onFinish={onFinish}
                                        onFieldsChange={onFieldsChange}
                                    >
                                        <Row>
                                            <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                                <Form.Item className="my-3" label="کدملی" name="nationalNo">
                                                    <Input disabled />
                                                </Form.Item>
                                            </Col>
                                            <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                                <Form.Item className="my-3" label="موبایل" name="phoneNumber">
                                                    <Input disabled />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                                <Form.Item className="my-5" label="سطح فعالیت" name="assignmentTitle"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "این فیلد لازم است",
                                                            }
                                                        ]}>
                                                    <Select
                                                        size="large"
                                                        dropdownClassName="text-right"
                                                        placeholder="سطح فعالیت کاربر را انتخاب کنید"
                                                        // onChange={ (value) => onUserLevelChange(value)}
                                                        onChange={value => setActiveCityFields(value)}
                                                    >
                                                        {
                                                            basicInfo.countryDivisionLevel.filter( item => item.value >= userProfile.assignmentTitleType ).map( (item, index) => (
                                                                <Select.Option value={item.value} key={index} >{item.name}</Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <CountryDivisions form={form} visibleFields={activeCityFields} defaultCode={countryDivisionCode} selectedCode={selectedCode} setCityNames={setCityNames} />

                                        {/*<Row>*/}

                                        {/*    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>*/}
                                        {/*        <Form.Item className="my-3" label="کدملی"*/}
                                        {/*                   rules={[*/}
                                        {/*                       {*/}
                                        {/*                           required: true,*/}
                                        {/*                       }*/}
                                        {/*                   ]}>*/}
                                        {/*            <Input />*/}
                                        {/*        </Form.Item>*/}
                                        {/*    </Col>*/}
                                        {/*    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>*/}
                                        {/*        <Form.Item className="my-3" label="تلفن همراه"*/}
                                        {/*                   rules={[*/}
                                        {/*                       {*/}
                                        {/*                           required: true,*/}
                                        {/*                       }*/}
                                        {/*                   ]}>*/}
                                        {/*            <Input/>*/}
                                        {/*        </Form.Item>*/}
                                        {/*    </Col>*/}
                                        {/*</Row>*/}

                                        <div className="text-left px-2">
                                            <Button size="large" type="primary" loading={isLoading} htmlType="submit">ثبت</Button>
                                        </div>
                                    </Form>
                                </Spin>
                        
                        </div>

                    </div>
                )
            }
            <div className="mb-5 mt-3">
                <span className="square-indicator">لیست ناظران</span>
                <ExcelTable selectedUser={selectedUser} onSelectUser={setSelectedUser} editableUsers={editableUsers} countryDivisionLevel={basicInfo.countryDivisionLevel}/>
                <div className="text-left px-2 py-2 ml-5 mt-3">
                    <Button size="large" type="primary" loading={isLoading} onClick={ () => editableUsers.length && dispatch(InsertOverseerExcel(countryDivisionCode, editableUsers))} >ذخیره</Button>
                </div>
            </div>
            {
                Boolean(errorUsers.length) && (
                    <div className="my-4">
                        <span className="square-indicator">لیست خطاها</span>
                        <Table
                            dataSource={errorUsers}
                            pagination={false}
                            className="shadow-sm"
                            loading={isLoading}
                            rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
                            bordered
                        >
                            <Table.Column title="شماره" key="id" render={(text, record, index) => index + 1 }/>
                            <Table.Column title="کدملی" dataIndex="nationalNo" key="nationalNo"/>
                            <Table.Column title="تلفن همراه" dataIndex="phoneNumber" key="phoneNumber"/>
                            <Table.Column title="خطا" dataIndex="errorMessage" key="errorMessage"/>
                        </Table>
                    </div>
                )
            }
        </>
    )
}

export default ValidateExcelOverseers
