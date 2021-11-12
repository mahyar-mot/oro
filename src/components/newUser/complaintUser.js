import React from 'react';
import {NavLink as NavLinkRouter, useHistory, useLocation} from "react-router-dom";
import { Form, Input, Button, Select, Row, Col, Upload, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { sendUserProtest, resetUser } from "../../redux/newUser"
import { getAllCountries, cleanCountriesStates } from '../../redux/countries';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg";
import { MEDIA_URL, PROTESTS_ATTACHMENTS} from "../../utils/constants";
import { Querys } from '../../utils/utils';


const CityDivLabel = (props) => (
    <div className="d-flex justify-content-between">
        <div className="ml-5">{props.label}</div>
        {props.length > 1 && props.length == props.index + 1 ? (
            <DeletePic 
                className="text-left pointer"
                onClick={() => props.remove(props.name)}
            />
            ) : null
        }
    </div>
)

const countryDivNames = ["استان", "شهرستان", "بخش", "شهر/دهستان", "روستا",]


function ComplaintUser(props) {

    const [form] = Form.useForm();
    const { Dragger } = Upload;

    const dispatch = useDispatch();
    const params = useLocation()

    // const { countryDivisionCode } = useTokenClaims()

    const { allCountries } = useSelector( state => state.countries)
    const { protestTrackCode, isLoading } = useSelector( state => state.newUser)
    const history = useHistory();

    const [attachmentsList, setAttachmentsList] = React.useState([]);
    const [queryValues, setQueryValues] = React.useState({});
    const [firstNameLock, setFirstNameLock] = React.useState(false)
    const [surnameLock, setSurnameLock] = React.useState(false)
    const [fatherNameLock, setFatherNameLock] = React.useState(false)

    React.useEffect(() => {
        dispatch(getAllCountries(1))
        if (params.search !== ''){
            setQueryValues(Querys(decodeURIComponent(params.search)))
        }
        return () => {
            dispatch(cleanCountriesStates())
        }
    }, [dispatch])

    React.useEffect( () => {
        if (Object.keys(queryValues).length){
            form.setFieldsValue({...queryValues, "countryDivisionCode": [""]})
            if (queryValues.firstName){
                setFirstNameLock(true)
            }
            if (queryValues.surname){
                setSurnameLock(true)
            }
            if (queryValues.fatherName){
                setFatherNameLock(true)
            }
        }
    }, [queryValues])

    React.useEffect( () => {
        if (!isLoading){
            if (protestTrackCode !== undefined){
                setTimeout( () => history.push('/user/protest/success'), 1000 )
            }
        }
    }, [isLoading])

    const onFocus = (e) => {
        let parentId = String(e.target.id).split('_')[1]
        if (parentId == 0){
            dispatch(getAllCountries(1))
        }else{
            let value = form.getFieldValue("countryDivisionCode")[parentId-1];
            let countryDivisionCodes = value.split('.')
            dispatch(getAllCountries(countryDivisionCodes[ countryDivisionCodes.length - 1 ]))
        }
    }

    const onFieldsChange = (changedFields) => {
        if (changedFields.length){
            if (changedFields[0].name[0].startsWith("countryDivisionCode")){
                // let currnetFieldName = changedFields[0].name[0];
                // let currentCityDivNumber = parseInt(currnetFieldName.split('-')[1])
                // for (let i = currentCityDivNumber + 1; i < 5 ; i++ ){
                //     form.setFieldsValue({[`cityDiv-${i}`]: ""})
                // }
            }
            if (changedFields[0].name[0] === "assignmentTitle"){
                for (let i = 0; i < 5 ; i++ ){
                    form.setFieldsValue({[`cityDiv-${i}`]: ""})
                }
            }
        }
    }

    const onFinish = (values) =>{
        values = {...queryValues, ...values}
        values.attachments = attachmentsList
        let cdc = values.countryDivisionCode.pop()
        if (cdc === undefined) cdc = values.countryDivisionCode.pop()
        values.countryDivisionCode = cdc
        // let countryCodes = Object.keys(values).filter( item => item.startsWith('cityDiv'))
        // if (countryCodes.length){
        //     if (countryCodes.length === 5 && values[countryCodes[countryCodes.length - 1]] === '' ){
        //         values.CountryDivisionCode = values[countryCodes[countryCodes.length - 2]]
        //     }else{
        //         values.CountryDivisionCode = values[countryCodes[countryCodes.length - 1]]
        //     }
        // } else {
        //     values.CountryDivisionCode = "1"
        // }
        // if (values.sheba) values.sheba = "IR" + values.sheba
        // if (uploadData){
        //     values.personalPhoto = uploadData
        // }
        // if (values.birthDate){
        //     values.birthDate = values.birthDate.format("jYYYY/jMM/jDD")
        // }
        dispatch(sendUserProtest(values))
    }

    return (
        <div className="content mb-5 p-4">
            <div className="d-flex justify-content-between">
                <span className="square-indicator">ثبت پیشنهادات، انتقادات و شکایات مردمی</span>
            </div>
            <div className="px-xl-5">
                <Spin size="large" spinning={false} >
                    <Form
                        preserve
                        layout="vertical"
                        form={form}
                        initialValues={{"countryDivisionCode": ['']}}
                        labelCol= {{ span: 20 }}
                        wrapperCol= {{ span: 24 }}
                        onFinish={onFinish}
                        onFieldsChange={onFieldsChange}
                    >
                        <Row>
                            <Col className="px-2 py-4" xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item 
                                    className="" 
                                    label="نام" 
                                    name="firstName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "فیلد تکمیل نشده است"
                                        }
                                    ]}
                                >
                                    <Input disabled={firstNameLock} />
                                </Form.Item>
                            </Col>
                            <Col className="px-2 py-4" xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item 
                                    className="" 
                                    label="نام خانوادگی" 
                                    name="surname"
                                    rules={[
                                        {
                                            required: true,
                                            message: "فیلد تکمیل نشده است"
                                        }
                                    ]}
                                >
                                    <Input disabled={surnameLock} />
                                </Form.Item>
                            </Col>
                            <Col className="px-2 py-4" xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item 
                                    label="نام پدر"
                                    name="fatherName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "فیلد تکمیل نشده است"
                                        }
                                    ]}
                                >
                                    <Input disabled={fatherNameLock} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Form.List
                                name="countryDivisionCode"
                            >
                                {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => {
                                        if (index<5){
                                            return(
                                                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                                    <Form.Item
                                                        // {fields.length > 1 && fields.length == index + 1 ? (
                                                        //     <DeletePic 
                                                        //         className="text-left"
                                                        //         onClick={() => remove(field.name)}
                                                        //     />
                                                        //     ) : null
                                                        // }
                                                        label={
                                                            <CityDivLabel 
                                                                label={countryDivNames[index]}
                                                                name={field.name}
                                                                length={fields.length}
                                                                index={index}
                                                                remove={remove}
                                                            />
                                                        }
                                                        rules={ index === 0 ? [
                                                            {
                                                                required: true,
                                                                message: "فیلد تکمیل نشده است"
                                                            }
                                                        ] : [] }
                                                        {...field}
                                                        key={field.key}
                                                    >
                                                        <Select
                                                            onSelect={ () => {
                                                                setTimeout( () => dispatch(cleanCountriesStates()), 500 )
                                                                if (index == fields.length - 1 && fields.length < 5 ){ add()}
                                                            }}
                                                            onFocus={onFocus}
                                                            dropdownClassName="text-right"
                                                        >
                                                            { allCountries.map( (item, index) => <Select.Option value={item.code} key={index} >{item.name}</Select.Option> )}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                            )
                                        }
                                    }
                                    )}
                                    {/* {
                                        fields.length < 5 && (
                                            <Form.Item>
                                                <div className="d-flex justify-content-between mt-4 pt-2" style={{width: "200px"}}>
                                                    { 
                                                        (
                                                            <>
                                                                <span>اضافه کردن زیر مجموعه</span>
                                                                <Button
                                                                    type="primary"
                                                                    icon={<PlusPic />}
                                                                    onClick={() => add()}
                                                                    // style={{ width: '60%' }}
                                                                >
                                                                </Button>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </Form.Item>
                                        )
                                    } */}
                                    <Form.ErrorList errors={errors} />
                                </>
                                )}
                            </Form.List>
                            
                        </Row>
                        <Row>
                            <Col className="px-2 py-4" xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item className="" label="عنوان شکایت" name="protestTitle">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* <CountryDivisions form={form} visibleFields={activeCityFields} defaultCode={countryDivisionCode} /> */}
                        <div className="px-2 pb-3">

                            <Form.Item wrapperCol={{
                                span: 24,
                                // offset: 1
                            }}
                                rules={[
                                    {
                                        required: true,
                                        message: "فیلد تکمیل نشده است"
                                    }
                                ]}
                                name="description"
                                label="متن شکایت"
                            >
                                <Input.TextArea rows={5} />
                            </Form.Item>
                        </div>
                        <Row>
                            <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                <Form.Item className="mt-3" label="فایل محتوا">
                                    <Upload
                                        name="file"
                                        action={MEDIA_URL + PROTESTS_ATTACHMENTS}
                                        listType="picture"
                                        beforeUpload={ (file, fileList) => {
                                            // if (attachmentTitle === '') {
                                            //     form.setFields([
                                            //         {
                                            //         name: 'uploadTxt',
                                            //         errors: ['نام فایل اجباری است'],
                                            //         },
                                            //     ]);
                                            //     return Upload.LIST_IGNORE
                                            // }
                                        } }
                                        onChange={ (info) => {
                                            if (info.file.status === 'done') {
                                                if (info.file.response.isSuccess){
                                                    setAttachmentsList( state => [
                                                        ...state, {
                                                            path: info.file.response.data.path,
                                                            fileSize: info.file.size,
                                                            fileFormat: info.file.type,
                                                        }
                                                    ] )
                                                }
                                            }
                                            if (info.file.status === 'removed') {
                                                setAttachmentsList( state => state.filter( item => item.path !== info.file.response.data ))
                                            }
                                        }}
                                    >
                                        <Button>انتخاب فایل</Button>
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                        
                        <div className="text-left px-2">
                            <Button size="large" type="primary" loading={false} htmlType="submit" >ارسال شکایت</Button>
                        </div>
                    </Form>
                </Spin>
            </div>
        </div>
    )
}

export default ComplaintUser
