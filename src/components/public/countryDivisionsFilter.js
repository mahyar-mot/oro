import React, {useEffect, useState} from 'react';
import {Form, Select, Row, Col} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {getCountries, cleanCountries, cleanCountriesStates,
        getCountriesDivisions, getCountriesWithZones, getCountriesDivisionsWithZone} from '../../redux/countries';
import {useTokenClaims} from "./hooks";


function CountryDivisions(props) {
    const {InitialCDC = "",back="1"} = props;
    const dispatch = useDispatch();
    const {countries, isLoading, ostan, shahrestan, bakhsh, shahr, roosta} = useSelector(state => state.countries);

    const {countryDivisionCode} = useTokenClaims();


    const handleChange = (value) => {
        // let valuesList = value.split('.')
        dispatch(getCountries(value))
    }

    React.useEffect(() => {
        return () => dispatch(cleanCountriesStates())
    }, [])

    React.useEffect(() => {
        if (countryDivisionCode && countryDivisionCode.length > 2 && !InitialCDC) {
            let codes = countryDivisionCode.split('.')
            if (props?.isInspector){
                dispatch(getCountriesDivisionsWithZone(codes))
            }else{
                dispatch(getCountriesDivisions(codes))
            }
        }
    }, [countryDivisionCode])

    React.useEffect(() => {

        if (InitialCDC) {
            let list = InitialCDC.split('.');
            if ( InitialCDC==="1"){
                props.form.setFieldsValue({"cityDiv-0": "","cityDiv-1": "","cityDiv-2":"","cityDiv-3": "","cityDiv-4": ""})
            }
            else {
                if (props?.isInspector){
                    dispatch(getCountriesDivisionsWithZone(list))
                }else{
                    dispatch(getCountriesDivisions(list))
                }
            }
        }
    }, [InitialCDC])

    // React.useEffect(() => {
    //     if (ostan) {
    //         props.form.setFieldsValue({"cityDiv-0": ostan.code})
    //     }
    //     else props.form.setFieldsValue({"cityDiv-0": "","cityDiv-1": "","cityDiv-2":"","cityDiv-3": "","cityDiv-4": ""})
    // }, [ostan])
    //
    // React.useEffect(() => {
    //     if (shahrestan) props.form.setFieldsValue({"cityDiv-1": shahrestan.code})
    //     else props.form.setFieldsValue({"cityDiv-1": "","cityDiv-2":"","cityDiv-3": "","cityDiv-4": ""})
    // }, [shahrestan])
    //
    // React.useEffect(() => {
    //     if (bakhsh) props.form.setFieldsValue({"cityDiv-2": bakhsh.code})
    //     else props.form.setFieldsValue({"cityDiv-2": "","cityDiv-3": "","cityDiv-4": ""})
    // }, [bakhsh])
    //
    // React.useEffect(() => {
    //     if (shahr) props.form.setFieldsValue({"cityDiv-3": shahr.code})
    //     else props.form.setFieldsValue({"cityDiv-3": "","cityDiv-4": ""})
    // }, [shahr])
    //
    // React.useEffect(() => {
    //     if (roosta) props.form.setFieldsValue({"cityDiv-4": roosta.code})
    //     else props.form.setFieldsValue({"cityDiv-4": ""})
    // }, [roosta])
    React.useEffect(() => {

        if (ostan) props.form.setFieldsValue({"cityDiv-0": ostan.code})
        else props.form.setFieldsValue({"cityDiv-0": ""})
        if (shahrestan) props.form.setFieldsValue({"cityDiv-1": shahrestan.code})
        else  props.form.setFieldsValue({"cityDiv-1": ""})
        if (bakhsh) props.form.setFieldsValue({"cityDiv-2": bakhsh.code})
        else props.form.setFieldsValue({"cityDiv-2":""})
        if (shahr) props.form.setFieldsValue({"cityDiv-3": shahr.code})
        else props.form.setFieldsValue({"cityDiv-3": ""})
        if (roosta) props.form.setFieldsValue({"cityDiv-4": roosta.code})
        else props.form.setFieldsValue({"cityDiv-4": ""})
    }, [ostan, shahrestan, bakhsh, shahr, roosta])

    const onFocus = (e) => {
        let parentId = String(e.target.id).split('-')[1]
        if (parentId == 0) {
            dispatch(getCountries(1))
        } else {
            let value = props.form.getFieldValue(`cityDiv-${parseInt(parentId - 1)}`);
            let countryDivisionCodes = value.split('.')
            if (props?.isInspector){
                dispatch(getCountriesWithZones(countryDivisionCodes[countryDivisionCodes.length - 1]))
            }else{
                dispatch(getCountries(countryDivisionCodes[countryDivisionCodes.length - 1]))
            }
        }
    }
    // console.log("overseer=>",ostan,shahrestan,bakhsh,shahr)
    return (
        <>
            <Row>
                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                    {/*{props.visibleFields >= 2 && (*/}
                    {1 && (
                        <Form.Item
                            label="استان"
                            name="cityDiv-0"
                        >
                            <Select
                                showSearch
                                size="large"
                                loading={isLoading}
                                dropdownClassName="text-right"
                                onFocus={onFocus}
                                autoFocus={true}
                                disabled={Boolean(ostan)}
                                // onChange={handleChange}
                                // defaultActiveFirstOption={true}
                                // defaultValue={countryDivisionCode}
                                onSelect={() => {
                                    setTimeout(() => dispatch(cleanCountries()), 500)
                                }}
                                filterOption={(input, option) =>
                                    option.children.includes(input)
                                }
                            >
                                {ostan ? (
                                    <Select.Option value={ostan.code}>{ostan.name}</Select.Option>
                                ) : (
                                    countries.map((item, index) => <Select.Option value={item.code}
                                                                                  key={index}>{item.name}</Select.Option>)
                                )
                                }
                            </Select>
                        </Form.Item>
                    )}
                </Col>
                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                    {1 && (
                        <Form.Item
                            label="شهرستان"
                            name="cityDiv-1"
                        >
                            <Select
                                showSearch
                                size="large"
                                loading={isLoading}
                                dropdownClassName="text-right"
                                // onChange={handleChange}
                                onFocus={onFocus}
                                onSelect={() => setTimeout(() => dispatch(cleanCountries()), 500)}
                                disabled={shahrestan ?? !Boolean(props.form.getFieldValue('cityDiv-0'))}
                                // allowClear
                                filterOption={(input, option) =>
                                    option.children.includes(input)
                                }
                            >
                                {shahrestan ? (
                                    <Select.Option value={shahrestan.code}>{shahrestan.name}</Select.Option>
                                ) : (
                                    countries.map((item, index) => <Select.Option value={item.code}
                                                                                  key={index}>{item.name}</Select.Option>)
                                )
                                }
                            </Select>
                        </Form.Item>
                    )}
                </Col>
                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                    {1 && (
                        <Form.Item
                            label="بخش"
                            name="cityDiv-2"
                        >
                            <Select
                                showSearch
                                size="large"
                                loading={isLoading}
                                dropdownClassName="text-right"
                                // onChange={handleChange}
                                onSelect={() => setTimeout(() => dispatch(cleanCountries()), 500)}
                                onFocus={onFocus}
                                disabled={bakhsh ?? !Boolean(props.form.getFieldValue('cityDiv-1'))}
                                filterOption={(input, option) =>
                                    option.children.includes(input)
                                }
                            >
                                {bakhsh ? (
                                    <Select.Option value={bakhsh.code}>{bakhsh.name}</Select.Option>
                                ) : (
                                    countries.map((item, index) => <Select.Option value={item.code}
                                                                                  key={index}>{item.name}</Select.Option>)
                                )
                                }
                            </Select>
                        </Form.Item>
                    )}
                </Col>
                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                    {1 && (
                        <Form.Item
                            label="شهر/دهستان"
                            name="cityDiv-3"
                        >
                            <Select
                                showSearch
                                size="large"
                                loading={isLoading}
                                dropdownClassName="text-right"
                                // onChange={handleChange}
                                onFocus={onFocus}
                                onSelect={() => setTimeout(() => dispatch(cleanCountries()), 500)}
                                disabled={shahr ?? !Boolean(props.form.getFieldValue('cityDiv-2'))}
                                filterOption={(input, option) =>
                                    option.children.includes(input)
                                }
                            >
                                {shahr ? (
                                    <Select.Option value={shahr.code}>{shahr.name}</Select.Option>
                                ) : (
                                    countries.map((item, index) => <Select.Option value={item.code}
                                                                                  key={index}>{item.name}</Select.Option>)
                                )
                                }
                            </Select>
                        </Form.Item>
                    )}
                </Col>
                <Col className="mx-auto" className="px-2" xs={24} sm={12} md={12} lg={8} xl={4}>
                    {1 && (
                        <Form.Item
                            label={props?.isInspector ? "مناطق شهری/روستا" : "روستا"}
                            name="cityDiv-4"
                        >
                            <Select
                                showSearch
                                size="large"
                                loading={isLoading}
                                dropdownClassName="text-right"
                                // onChange={handleChange}
                                onFocus={onFocus}
                                onSelect={() => setTimeout(() => dispatch(cleanCountries()), 500)}
                                disabled={roosta ?? !Boolean(props.form.getFieldValue('cityDiv-3'))}
                                filterOption={(input, option) =>
                                    option.children.includes(input)
                                }
                            >
                                {roosta ? (
                                    <Select.Option value={roosta.code}>{roosta.name}</Select.Option>
                                ) : (
                                    countries.map((item, index) => <Select.Option value={item.code}
                                                                                  key={index}>{item.name}</Select.Option>)
                                )
                                }
                            </Select>
                        </Form.Item>
                    )}
                </Col>
            </Row>
        </>
    )
}

export default CountryDivisions
