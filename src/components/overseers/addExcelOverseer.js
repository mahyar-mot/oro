import React from 'react';
import {NavLink as NavLinkRouter, useHistory} from "react-router-dom";
import {Form, Input, Button, Radio, Row, Col, Upload, Select, Spin} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {BsArrowLeft} from 'react-icons/bs';
import {MdAddAlert} from 'react-icons/md';
import CountryDivisions from '../public/countryDivisions';
import {useSelector, useDispatch} from 'react-redux';
import {uploadExcel, cleanUploadFile} from '../../redux/uploadFile';
import {getBasicInfo} from '../../redux/basicInfos';
import {createOverseerExcel} from '../../redux/overseers/overseersCreate';
import {getCountries} from '../../redux/countries';
import { SUPERVISOR_EXCEL_SAMPLE } from "../../utils/constants";
import { useTokenClaims } from '../public/hooks';


function AddExcelOverSeer(props) {
    const basicInfo = useSelector(state => state.basicInfo);
    const {uploadData, isLoading} = useSelector(state => state.uploadFile);
    const {isLoading: createOverseerLoading, overseersExcel} = useSelector(state => state.overseer.create);
    const history = useHistory()
    const [form] = Form.useForm();
    const {Dragger} = Upload;

    const { countryDivisionCode } = useTokenClaims()

    const { userProfile } = useSelector( state => state.auth )
    const [activeCityFields, setActiveCityFields] = React.useState(1);
    const dispatch = useDispatch();
    const [buttonDisable, setButtonDisable] = React.useState(false);
    
    React.useEffect(() => {
        if (!basicInfo.apiHasCalled) {
            dispatch(getBasicInfo())
        }
        dispatch(getCountries(1))
        return () => {
            dispatch(cleanUploadFile())
        }
    }, [dispatch])

    React.useEffect( () => {
        if (countryDivisionCode){
            setActiveCityFields(countryDivisionCode.split(".").length)
        }
    }, [countryDivisionCode])

    React.useEffect( () => {
        if (!createOverseerLoading){
            if(Object.keys(overseersExcel).length){
                history.push("/overseers/excelvalidate")
            }
        }
    }, [overseersExcel, createOverseerLoading])

    const onFieldsChange = (changedFields) => {
        if (changedFields.length) {
            if (changedFields[0].name[0].startsWith("cityDiv")) {

                let currnetFieldName = changedFields[0].name[0];
                let currentCityDivNumber = parseInt(currnetFieldName.split('-')[1])
                for (let i = currentCityDivNumber + 1; i < 5; i++) {
                    form.setFieldsValue({[`cityDiv-${i}`]: ""})
                }
            }
        }
    }

    const onFinish = (values) => {

        let countryCodes = Object.keys(values).filter(item => item.startsWith('cityDiv'))
        if (countryCodes.length) {
            if (countryCodes.length === 5 && values[countryCodes[countryCodes.length - 1]] === '' ){
                values.CountryDivisionCode = values[countryCodes[countryCodes.length - 2]]
            }else{
                values.CountryDivisionCode = values[countryCodes[countryCodes.length - 1]]
            }
        } else {
            values.CountryDivisionCode = "1"
        }
        values.filePath = uploadData
        dispatch(createOverseerExcel(values.CountryDivisionCode, values))
    }

    return (
        <div className="content">
            <div className="d-flex justify-content-between">
                <span className="square-indicator">مشخصات ناظر</span>
                <div className="ml-2">
                    <NavLinkRouter className="text-decoration-none" to="/overseers">
                        <span className="link-color">بازگشت به لیست ناظران <BsArrowLeft/></span>
                    </NavLinkRouter>
                </div>
            </div>
            <div className="px-xl-5">
                <Spin size="large" spinning={isLoading || createOverseerLoading} >
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
                                <Form.Item className="my-5" label="سطح فعالیت" name="AssignmentTitle"
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
                        <CountryDivisions form={form} visibleFields={activeCityFields} defaultCode={countryDivisionCode} />

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
                        <div className="mb-5 mt-2 px-2">
                            <div className="my-2">
                                آپلود فایل اکسل 
                                <span className="link-color mr-4">
                                    <a className="link-color" href={SUPERVISOR_EXCEL_SAMPLE}> دانلود فایل نمونه </a>
                                </span>
                            </div>
                            <Dragger
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                customRequest={async (e) => {
                                    const {onSuccess, onError, file, action, onProgress} = e;
                                    setButtonDisable(true)
                                    let formData = new FormData()
                                    await formData.append('file', e?.file)
                                    await dispatch(uploadExcel(formData)).then(r => {
                                        onSuccess({"status": "success"})
                                        setButtonDisable(false)
                                        })

                                }}

                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined className="text-success" />
                                </p>
                                <p className="ant-upload-text text-muted">بر روی آیکون کلیک کنید یا فایل اکسل خود را اینجا
                                    بیاندازید</p>
                            </Dragger>
                            {uploadData ? <p className="text-oldSuccess">فایل با موفقیت اپلود شد</p> : ''}
                        </div>

                        <div className="text-left px-2">
                            <Button size="large" type="primary" loading={isLoading} disabled={buttonDisable} htmlType="submit">اعتبار سنجی فایل</Button>
                        </div>
                    </Form>
                </Spin>
            </div>

        </div>
    )
}

export default AddExcelOverSeer
