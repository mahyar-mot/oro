import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Row, Col, Select} from 'antd';
import {createOverseer} from "../../redux/overseers/overseersCreate";
import {useDispatch, useSelector} from "react-redux";
import CountryDivisions from "./countryDivisionsFilter"
import {QueryUrl} from '../../utils/utils';
import {useLocation} from "react-router-dom";
import {useTokenClaims} from "../public/hooks";
import {getBasicInfo} from "../../redux/basicInfos";
import {cleanCountriesStates} from "../../redux/countries";


function ListFilters(props) {
    const {setIsModalVisible, resetForm = false, getDate, InitialCDC = "",setQueryState,back="1"} = props;
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {status, assignmentTitle, apiHasCalled} = useSelector(state => state.basicInfo);
    const {countryDivisionCode} = useTokenClaims()
    // const [statusFilter, setStatusFilter] = React.useState(0);
    const [activeCityFields, setActiveCityFields] = React.useState(1);
    const location = useLocation()

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
    // useEffect(() => {
    //     // console.log("InitialCDC==>", InitialCDC)
    //     if (InitialCDC) {
    //         let list = InitialCDC.split('.');
    //         let CDCList = {};
    //             // console.log("InitialCDC==>", CDCList)
    //             [0,1,2,3,4,5].map((key) => {
    //             if (list.length >= (key + 1)){
    //                 CDCList['cityDiv-' + (key)] = list[key+1]
    //             }
    //         })
    //         console.log("InitialCDC", CDCList)
    //         form.setFieldsValue(CDCList)
    //     }
    // }, [InitialCDC])
    const onFinish = (valuesCopy) => {
        console.log("valuesCopy", valuesCopy)
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
        // console.log(values)
        setQueryState(values)
        if (countryDivision)
            getDate(countryDivision, values)
        else
            getDate(countryDivisionCode, values)
        // setIsModalVisible(false)

    }
    const onReset = () => {
        form.resetFields();
        // serParams(myOverseers)
        getDate(countryDivisionCode)
    };


    React.useEffect(() => {
        if (!apiHasCalled) {
            dispatch(getBasicInfo())
        }
        return ()=> {
            // console.log("unmount")
            dispatch(cleanCountriesStates())
            form.resetFields();
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
                                  InitialCDC={InitialCDC }
                                  back={back}
                                  countryDivisionCode={countryDivisionCode}/>
                <Row>
                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                        <Form.Item
                            className=""
                            label=" وضعیت"
                            name="StatusList"
                        >
                            <Select
                                mode="tags"
                                size="large"
                                // showSearch
                                dropdownClassName="text-right"
                                placeholder=" وضعیت ناظر ..."
                                className="font-size-sm"
                                // onChange={ value => setStatusFilter(value) }
                            >
                                {
                                    status.map((item, index) => (index > 0 &&
                                        <Select.Option value={item.value} key={index}>{item.name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                        <Form.Item
                            className=""
                            label="  سطح فعالیت ناظر"
                            name="AssignmentTitlesList"
                        >
                            <Select
                                mode="tags"
                                size="large"
                                // showSearch
                                dropdownClassName="text-right"
                                placeholder=" سطح فعالیت ناظر ..."
                                className="font-size-sm"
                                // onChange={ value => setStatusFilter(value) }
                            >
                                {
                                    assignmentTitle.map((item, index) => (index > 0 &&
                                        <Select.Option value={item.value} key={index}>{item.name}</Select.Option>
                                    ))
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
