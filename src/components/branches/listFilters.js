import React, {useState} from 'react';
import {Form, Input, Button, Row, Col, Select} from 'antd';
import {createOverseer} from "../../redux/overseers/overseersCreate";
import {useDispatch, useSelector} from "react-redux";
import CountryDivisions from "../public/countryDivisionsFilter"
import { useHistory, useLocation } from 'react-router-dom';
import { QueryUrl } from '../../utils/utils';
import { cleanCountriesStates } from '../../redux/countries';

function ListFilters(props) {
    const {serParams, myOverseers, setIsModalVisible, resetForm = false, countryDivisionCode} = props;
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {status, havingSupervisorType, havingHeadSupervisorType} = useSelector(state => state.basicInfo);
    const location = useLocation();
    const history = useHistory();

    const [activeCityFields, setActiveCityFields] = React.useState(1);
    const [InitialCDC,setInitialCDC]=useState("")

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
        history.replace({
            search: ''
        })
        dispatch(cleanCountriesStates())
        serParams(myOverseers)
    };

    React.useEffect(() => {
        if (resetForm) {
            onReset()
        }
    }, [resetForm])

    React.useEffect(() => {
        let querys = location.search !== '' ? QueryUrl(location.search) : {}

        if (Object.keys(querys).length) {
            // const filterParams = ["NationalNo", "MobileNo", "Name", "Surname", "Status", "countryDivisionCode"];
            setTimeout(() => serParams(querys), 1000)

            let t = ""
            if(status?.length)
                t = status.filter(t => t.value.toString() === querys.Status)[0]
            else
            t = [
                {name: "نامشخص", value: 1},
                {name: "در حال تکمیل", value: 3},
                {name: "در حال بررسی", value: 4},
                {name: "تایید شده", value: 5},
                {name: "رد شده", value: 6},
                {name: "مسدود شده", value: 7}
            ].filter(t => t.value.toString() === querys.Status)[0]
            t?.length && (t = t[0])
            if (t?.name)
                form.setFieldsValue({...querys, Status: t.name})
            else
                form.setFieldsValue(querys)
            if(querys?.countryDivisionCode)
                setInitialCDC(querys.countryDivisionCode)
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
                <CountryDivisions form={form} visibleFields={activeCityFields}
                                 countryDivisionCode={countryDivisionCode} InitialCDC={InitialCDC} />
                <Row>
                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                        <Form.Item label="جستجو" name="search">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                        <Form.Item label="سرناظر" name="havingHeadSupervisor">
                            <Select
                                size="large"
                                showSearch
                                dropdownClassName="text-right"
                                placeholder=""
                                // onChange={ value => setStatusFilter(value) }
                            >
                                {
                                    havingHeadSupervisorType.map( (item, i) => <Select.Option key={i} value={String(item.value)}>{item.name}</Select.Option> )
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                        <Form.Item label="ناظر" name="havingSupervisor">
                            <Select
                                size="large"
                                showSearch
                                dropdownClassName="text-right"
                                placeholder=""
                                // onChange={ value => setStatusFilter(value) }
                            >
                                {
                                    havingSupervisorType.map( (item, i) => <Select.Option key={i} value={String(item.value)}>{item.name}</Select.Option> )
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>

                    <Col className="px-2" span={24}>
                        <div className="d-flex justify-content-end align-items-end">
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
