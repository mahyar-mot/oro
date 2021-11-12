import React, {useState} from 'react';
import {Form, Input, Button, Row, Col, Select} from 'antd';
import {createOverseer} from "../../../redux/overseers/overseersCreate";
import {useDispatch, useSelector} from "react-redux";
import CountryDivisions from "./../countryDivisionsFilter"
import { QueryUrl } from '../../../utils/utils';
import {useLocation, useHistory} from "react-router-dom";
import {useTokenClaims} from "../../public/hooks";
import {getCountriesDivisions} from "../../../redux/countries";


function ListFilters(props) {
    const {params, serParams, myOverseers, setIsModalVisible, resetForm = false,back="1",InitialCDC,setInitialCDC} = props;
    const [form] = Form.useForm();
    const {countryDivisionCode} = useTokenClaims()
    const dispatch = useDispatch();
    const {status, inspectorAssignmentTitle} = useSelector(state => state.basicInfo);
    // const [statusFilter, setStatusFilter] = React.useState(0);
    const [activeCityFields, setActiveCityFields] = React.useState(1);
    const location = useLocation()
    const history = useHistory()

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
    console.log("InitialCDC==>",InitialCDC)
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
        setInitialCDC(back)
        serParams(myOverseers)
        let list = back.split('.');
        if ( back==="1"){
            form.setFieldsValue({"cityDiv-0": "","cityDiv-1": "","cityDiv-2":"","cityDiv-3": "","cityDiv-4": ""})
        }
        else {
            dispatch(getCountriesDivisions(list))
        }
    };

    React.useEffect(() => {
        if (resetForm) {
            onReset()
        }
    }, [resetForm])

    React.useEffect( () => {
        let querys = location.search !== '' ? QueryUrl(location.search) : {}            
        if (Object.keys(querys).length){
            const filterParams = ["NationalNo", "MobileNo", "Name", "Surname", "Status", "countryDivisionCode"];
            setTimeout( () => serParams(querys), 500)
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
                <CountryDivisions form={form} visibleFields={activeCityFields}      InitialCDC={InitialCDC || countryDivisionCode }
                                  back={back} isInspector={true} />
                <Row>


                    {/*<Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>*/}
                    {/*    <Form.Item label="کدملی" name="NationalNo">*/}
                    {/*        <Input/>*/}
                    {/*    </Form.Item>*/}
                    {/*</Col>*/}
                    {/*<Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>*/}
                    {/*    <Form.Item label="تلفن همراه" name="MobileNo">*/}
                    {/*        <Input/>*/}
                    {/*    </Form.Item>*/}
                    {/*</Col>*/}
                    {/*<Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>*/}
                    {/*    <Form.Item label="نام" name="Name">*/}
                    {/*        <Input/>*/}
                    {/*    </Form.Item>*/}
                    {/*</Col>*/}
                    {/*<Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>*/}
                    {/*    <Form.Item label="نام خانوادگی" name="Surname">*/}
                    {/*        <Input/>*/}
                    {/*    </Form.Item>*/}
                    {/*</Col>*/}

                    {/*<Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>*/}
                    {/*    <Form.Item*/}
                    {/*        className=""*/}
                    {/*        label=" وضعیت"*/}
                    {/*        name="Status"*/}
                    {/*    >*/}
                    {/*        <Select*/}
                    {/*            size="large"*/}
                    {/*            showSearch*/}
                    {/*            dropdownClassName="text-right"*/}
                    {/*            placeholder=" وضعیت بازرس را انتخاب کنید"*/}
                    {/*            // onChange={ value => setStatusFilter(value) }*/}
                    {/*        >*/}
                    {/*            {*/}
                    {/*                status.map((item, index) => ( index > 0 &&*/}
                    {/*                    <Select.Option value={item.value} key={index}>{item.name}</Select.Option>*/}
                    {/*                ))*/}
                    {/*            }*/}
                    {/*        </Select>*/}
                    {/*    </Form.Item>*/}
                    {/*</Col>*/}
                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                        <Form.Item
                            className=""
                            label=" سطح فعالیت"
                            name="assignmentTitle"
                        >
                            <Select
                                size="large"
                                showSearch
                                dropdownClassName="text-right"
                                placeholder=" سطح فعالیت بازرس را انتخاب کنید"
                                // onChange={ value => setStatusFilter(value) }
                            >
                                {
                                    inspectorAssignmentTitle.map((item, index) => (
                                        <Select.Option value={item.value} key={index}>{item.name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>


                    <Col className="px-2" span={24}>
                        <div className="d-flex justify-content-end align-items-end ">
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
