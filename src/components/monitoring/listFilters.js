import React, {useState} from 'react';
import {Form, Input, Button, Row, Col, Select} from 'antd';
import {createOverseer} from "../../redux/overseers/overseersCreate";
import {useDispatch, useSelector} from "react-redux";
import CountryDivisions from "./countryDivisionsFilter"
import {QueryUrl} from '../../utils/utils';
import {useLocation} from "react-router-dom";
import {useTokenClaims} from "../public/hooks";


function ListFilters(props) {
    const {setIsModalVisible, resetForm = false, getDate, InitialCDC = "",back="1"} = props;
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {status} = useSelector(state => state.basicInfo);
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
            getDate(countryDivision)
        // serParams({...myOverseers, ...values, countryDivisionCode: countryDivision})
        // else
        //     serParams({...myOverseers, ...values})


        // dispatch(createOverseer(values.nationalNo, values))
        setIsModalVisible(false)

    }
    const onReset = () => {
        form.resetFields();
        // serParams(myOverseers)
        getDate(countryDivisionCode)
    };
    // React.useEffect(() => {
    //     if (resetForm) {
    //         onReset()
    //     }
    // }, [resetForm])

    React.useEffect(() => {
        // let querys = location.search !== '' ? QueryUrl(location.search) : {}            
        // if (Object.keys(querys).length){
        // const filterParams = ["NationalNo", "MobileNo", "Name", "Surname", "Status", "countryDivisionCode"];
        // serParams(querys)
        // }
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
                                  InitialCDC={InitialCDC}
                                  back={back}
                                  countryDivisionCode={countryDivisionCode}/>
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
