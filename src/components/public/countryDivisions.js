import React from 'react';
import { Form, Select, Row, Col, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {getCountries, cleanCountries, cleanCountriesStates,
        getCountriesDivisions, getCountriesWithZones, getCountriesDivisionsWithZone} from '../../redux/countries';

function CountryDivisions(props) {

    const dispatch = useDispatch();
    const {countries, isLoading, ostan, shahrestan, bakhsh, shahr, roosta} = useSelector( state => state.countries );

    const handleChange = (value) => {
        // let valuesList = value.split('.')
        dispatch(getCountries(value))
    }

    const onSelect = (value, option) => {
        setTimeout( () => dispatch(cleanCountries()), 500 )
        if (props.setCityNames){
            props.setCityNames(state => {
                let temp = state
                temp[value.split(".").length - 1] = { name:  option.children}
                temp[value.split(".").length ] = { name:  ''}
                temp[value.split(".").length + 1 ] = { name:  ''}
                temp[value.split(".").length + 2 ] = { name:  ''}
                return temp
            })
        }
    }

    React.useEffect( () => {
        return () => dispatch(cleanCountriesStates())
    }, [])

    React.useEffect( () => {
        if (props.defaultCode && props.defaultCode.length > 2){
            let codes = props.defaultCode.split('.')
            if (props?.isInspector){
                dispatch(getCountriesDivisionsWithZone(codes))
            }else{
                dispatch(getCountriesDivisions(codes))
            }
        }
    }, [props.defaultCode])

    const onFocus = (e) => {
        let parentId = String(e.target.id).split('-')[1]
        if (parentId == 0){
            dispatch(getCountries(1))
        }else{
            let value = props.form.getFieldValue(`cityDiv-${parseInt(parentId-1)}`);
            let countryDivisionCodes = value?.split('.')
            if(isNaN(countryDivisionCodes[0])){
                let cdc = props.selectedCode.split(".")
                cdc.shift()
                countryDivisionCodes = cdc.slice(0, parentId )
            }
            if (props?.isInspector){
                dispatch(getCountriesWithZones(countryDivisionCodes[countryDivisionCodes.length - 1]))
            }else{
                dispatch(getCountries(countryDivisionCodes[countryDivisionCodes.length - 1]))
            }   
        }
    }

    React.useEffect( () => {
        if (ostan) props.form.setFieldsValue({"cityDiv-0": ostan.code})
        if (shahrestan) props.form.setFieldsValue({"cityDiv-1": shahrestan.code})
        if (bakhsh) props.form.setFieldsValue({"cityDiv-2": bakhsh.code})
        if (shahr) props.form.setFieldsValue({"cityDiv-3": shahr.code})
        if (roosta) props.form.setFieldsValue({"cityDiv-4": roosta.code})
    }, [ostan, shahrestan, bakhsh, shahr, roosta])
    
    return (
        <>
        <Row className="">
                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                    { props.visibleFields >= 2 && (
                        <Form.Item 
                            label="استان" 
                            name="cityDiv-0"
                            rules={[
                                {
                                required: true,
                                message: "تکمیل این فیلد ضروری است",
                                },
                            ]}
                        >
                            <Select
                                    size="large"
                                    loading={isLoading}
                                    dropdownClassName="text-right"
                                    onFocus={onFocus}
                                    // onChange={handleChange}
                                    onSelect={onSelect}
                                    showSearch
                                    disabled={Boolean(ostan)}
                                    filterOption={(input, option) =>
                                        option.children.includes(input)
                                    }
                                    >
                                    { ostan ? (
                                        <Select.Option value={ostan.code}>{ostan.name}</Select.Option>
                                    ) : (
                                        countries.map( (item, index) => <Select.Option value={item.code} key={index} >{item.name}</Select.Option> )
                                        )
                                    }
                            </Select>
                        </Form.Item>
                    )}
                </Col>
                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                    { props.visibleFields >= 3 && (
                        <Form.Item 
                            label="شهرستان"
                            name="cityDiv-1"
                            rules={[
                                {
                                  required: true,
                                  message: "تکمیل این فیلد ضروری است",
                                },
                            ]}
                            >
                            <Select
                                    size="large"
                                    loading={isLoading}
                                    dropdownClassName="text-right"
                                    // onChange={handleChange}
                                    onFocus={onFocus}
                                    onSelect={onSelect}
                                    disabled={ shahrestan ?? !Boolean(props.form.getFieldValue('cityDiv-0'))}
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.children.includes(input)
                                    }
                                    // allowClear
                                >
                                    { shahrestan ? (
                                        <Select.Option value={shahrestan.code}>{shahrestan.name}</Select.Option>
                                    ) : (
                                        countries.map( (item, index) => <Select.Option value={item.code} key={index} >{item.name}</Select.Option> )
                                        )
                                    }
                            </Select>
                        </Form.Item>
                    )}
                </Col>
                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                    { props.visibleFields >= 4 && (
                        <Form.Item 
                            label="بخش" 
                            name="cityDiv-2"
                            rules={[
                                {
                                  required: true,
                                  message: "تکمیل این فیلد ضروری است",
                                },
                            ]}
                            >
                            <Select
                                    size="large"
                                    loading={isLoading}
                                    dropdownClassName="text-right"
                                    // onChange={handleChange}
                                    onSelect={onSelect}
                                    onFocus={onFocus}
                                    disabled={ bakhsh ?? !Boolean(props.form.getFieldValue('cityDiv-1'))}
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.children.includes(input)
                                    }
                                >
                                    { bakhsh ? (
                                        <Select.Option value={bakhsh.code}>{bakhsh.name}</Select.Option>
                                    ) : (
                                        countries.map( (item, index) => <Select.Option value={item.code} key={index} >{item.name}</Select.Option> )
                                        )
                                    }
                            </Select>
                        </Form.Item>
                    )}
                </Col>
            </Row>
            <Row>
                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                    { props.visibleFields >= 5 && (
                        <Form.Item 
                            label="شهر/دهستان" 
                            name="cityDiv-3"
                            rules={[
                                {
                                  required: true,
                                  message: "تکمیل این فیلد ضروری است",
                                },
                            ]}
                            >
                            <Select
                                    size="large"
                                    loading={isLoading}
                                    dropdownClassName="text-right"
                                    // onChange={handleChange}
                                    onFocus={onFocus}
                                    onSelect={onSelect}
                                    disabled={ shahr ?? !Boolean(props.form.getFieldValue('cityDiv-2'))}
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.children.includes(input)
                                    }
                                >
                                    { shahr ? (
                                        <Select.Option value={shahr.code}>{shahr.name}</Select.Option>
                                    ) : (
                                        countries.map( (item, index) => <Select.Option value={item.code} key={index} >{item.name}</Select.Option> )
                                        )
                                    }
                            </Select>
                        </Form.Item>
                    )}
                </Col>
                <Col className="mx-auto" className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                    { props.visibleFields >= 6 && (
                        <Form.Item 
                            label={props?.isInspector ? "مناطق شهری/روستا" : "روستا"}
                            name="cityDiv-4"
                            >
                            <Select
                                    size="large"
                                    loading={isLoading}
                                    dropdownClassName="text-right"
                                    // onChange={handleChange}
                                    onFocus={onFocus}
                                    onSelect={onSelect}
                                    disabled={ roosta ?? !Boolean(props.form.getFieldValue('cityDiv-3'))}
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.children.includes(input)
                                    }
                                >
                                    { roosta ? (
                                        <Select.Option value={roosta.code}>{roosta.name}</Select.Option>
                                    ) : (
                                        countries.map( (item, index) => <Select.Option value={item.code} key={index} >{item.name}</Select.Option> )
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
