import React, {useState} from 'react';
import {Form, Input, Button, Row, Col, Select} from 'antd';
import {createOverseer} from "../../redux/overseers/overseersCreate";
import {useDispatch, useSelector} from "react-redux";
import CountryDivisions from "../public/countryDivisionsFilter"
import { QueryUrl } from '../../utils/utils';
import { useHistory, useLocation } from 'react-router';
import DatePicker from "react-datepicker2";
import moment from 'moment-jalaali'

function ListFilters(props) {
    const {serParams, myOverseers, setIsModalVisible, resetForm = false, countryDivisionCode} = props;
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const {status} = useSelector(state => state.basicInfo);
    // const [statusFilter, setStatusFilter] = React.useState(0);
    const [activeCityFields, setActiveCityFields] = React.useState(1);

    const onFieldsChange = (changedFields) => {
        // console.log("changedFields", changedFields)
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

    const onFinish = (valuesCopy) => {
        // let countryCodes = Object.keys(values).filter( item => item.startsWith('cityDiv'))
        // if (countryCodes.length){
        //     values.countryDivisionCode = values[countryCodes[countryCodes.length -1] ]
        // } else{
        //     values.countryDivisionCode = "1"
        // }
        let values = {}
        Object.assign(values, valuesCopy);

        Object.keys(values).forEach(key => {
            if (!values[key]) delete values[key];
        });

        if (values?.startDate){
            values.startDate = String(values.startDate.format("jYYYY/jMM/jDD HH:mm:ss"))
        }
        if (values?.endDate){
            values.endDate = String(values.endDate.format("jYYYY/jMM/jDD HH:mm:ss"))
        }

        let countryDivision = null;

        [0, 1, 2, 3, 4, 5].map((key) => {
            let city = values['cityDiv-' + key];
            if (city) {
                countryDivision = city
            }
            delete values['cityDiv-' + key];
        })
        if (countryDivision)
            serParams({...myOverseers, ...values, countryDivisionCode: countryDivision})
        else
            serParams({...myOverseers, ...values})


        // dispatch(createOverseer(values.nationalNo, values))
        setIsModalVisible(false)

    }
    const onReset = () => {
        form.resetFields();
        serParams(myOverseers)
        history.replace({
            search: ''
        })
    };
    React.useEffect(() => {
        if (resetForm) {
            onReset()
        }
    }, [resetForm])

    React.useEffect( () => {
        let querys = location.search !== '' ? QueryUrl(location.search) : {}            
        if (Object.keys(querys).length){
            // const filterParams = ["NationalNo", "MobileNo", "Name", "Surname", "Status", "countryDivisionCode"];
            let pars = querys
            if ("startDate" in querys ) {
                // let startDate = moment(querys.startDate, 'jYYYY/jMM/jDD HH:mm:ss')
                querys.startDate = moment(querys.startDate, 'jYYYY/jMM/jDD HH:mm:ss')
                // pars.startDate = String(startDate.format("jYYYY/jMM/jDD HH:mm:ss"))
            }
            if ("endDate" in querys ) {
                // let endDate = moment(querys.endDate, 'jYYYY/jMM/jDD HH:mm:ss')
                querys.endDate = moment(querys.endDate, 'jYYYY/jMM/jDD HH:mm:ss')
                // pars.endDate = String(endDate.format("jYYYY/jMM/jDD HH:mm:ss"))
            }
            setTimeout( () => form.submit(), 500)
            form.setFieldsValue(querys)
        }
    }, [])

    return (
        <div className="content px-xl-5">
            <Form
                // initialValues={{"cityDiv-0":}}

                layout="vertical"
                form={form}
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                onFinish={onFinish}
                onFieldsChange={onFieldsChange}
            >

            <Row>
                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item
                        label="استان"
                        name="cityDiv-0"
                    >
                            <Select
                                showSearch
                                size="large"
                                disabled={true}
                            >
                            </Select>
                        </Form.Item>
                </Col>
                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item
                        label="شهرستان"
                        name="cityDiv-0"
                    >
                            <Select
                                showSearch
                                size="large"
                                disabled={true}
                            >
                            </Select>
                        </Form.Item>
                </Col>
                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item
                        label="بخش"
                        name="cityDiv-0"
                    >
                            <Select
                                showSearch
                                size="large"
                                disabled={true}
                            >
                            </Select>
                        </Form.Item>
                </Col>
                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item
                        label="شهر/دهستان"
                        name="cityDiv-0"
                    >
                            <Select
                                showSearch
                                size="large"
                                disabled={true}
                            >
                            </Select>
                        </Form.Item>
                </Col>
                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item
                        label="روستا"
                        name="cityDiv-0"
                    >
                            <Select
                                showSearch
                                size="large"
                                disabled={true}
                            >
                            </Select>
                        </Form.Item>
                </Col>
            </Row>
                <Row>
                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                        <Form.Item label="جستجو" name="search">
                            <Input disabled={Boolean(props.isDisabled)} placeholder="جست‌جو براساس کدملی"/>
                        </Form.Item>
                    </Col>
                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                        <Form.Item label="از تاریخ" name="startDate">
                            <DatePicker
                                className="ant-input "
                                isGregorian={false}
                                // timePicker={false}
                            /> 
                        </Form.Item>
                    </Col>
                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                        <Form.Item label="تا تاریخ" name="endDate">
                            <DatePicker
                                className="ant-input "
                                isGregorian={false}
                                // timePicker={false}
                            /> 
                        </Form.Item>
                    </Col>
                </Row>

                <Row>


                    <Col className="px-2" span={24}>
                        <div className="d-flex justify-content-end align-items-end mt-3">
                            <Button className="px-4 ml-2" size="large" type="danger" htmlType="button"
                                    onClick={onReset}> حذف فیلتر</Button>
                            <Button className="px-4" size="large" type="primary" htmlType="submit">اعمال فیلتر</Button>

                        </div>
                    </Col>
                </Row>

            </Form>
        </div>
    )
}

export default ListFilters
