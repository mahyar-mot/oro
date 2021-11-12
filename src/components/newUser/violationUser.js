import React from 'react';
import {NavLink as NavLinkRouter, useHistory, useLocation} from "react-router-dom";
import { Form, Input, Button, Select, Row, Col, Upload, Spin, Switch, Tag, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {FaRegUserCircle} from 'react-icons/fa';
import { sendUserProtest, resetUser } from "../../redux/newUser"
import { getAllCountries, cleanCountriesStates } from '../../redux/countries';
import {ReactComponent as DeletePic} from "../../assets/icons/trash-can.svg";
import { MEDIA_URL, PROTESTS_ATTACHMENTS, PEOPLE_VIOLATION_ATTACHMENTS} from "../../utils/constants";
import { Querys } from '../../utils/utils';
import {createPeopleViolation} from '../../redux/violation/peopleViolationCreate';


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


const ViolationUserForm = (props) => {
    const {form} = props;

    const [checked, setChecked] = React.useState(true);
    const [selectedBranch, setSelectedBranch] = React.useState();

    return (
        <>
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
                        <Input disabled={props.firstNameLock} />
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
                        <Input disabled={props.surnameLock} />
                    </Form.Item>
                </Col>
                <Col className="px-2 py-4" xs={24} sm={12} md={12} lg={8} xl={8}>
                    <Form.Item 
                        label="متخلف"
                        name="violator"
                        rules={[
                            {
                                required: true,
                                message: "فیلد تکمیل نشده است"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row className="my-2 py-2">
                <Switch size="large" checked={checked} onChange={setChecked} checkedChildren="تقسیمات کشوری" unCheckedChildren="کدشعبه" />
            </Row>
            <Row>
                {
                    checked ? (
                            <Form.List
                                name="countryDivisionCode"
                            >
                                {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => {
                                        if (index<5){
                                            return(
                                                <Col key={index} className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                                    <Form.Item
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
                                                                setTimeout( () => props.dispatch(cleanCountriesStates()), 500 )
                                                                if (index == fields.length - 1 && fields.length < 5 ){ add()}
                                                            }}
                                                            onFocus={props.onFocus}
                                                            dropdownClassName="text-right"
                                                        >
                                                            { props.allCountries.map( (item, index) => <Select.Option value={item.code} key={index} >{item.name}</Select.Option> )}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                            )
                                        }
                                    }
                                    )}
                                    <Form.ErrorList errors={errors} />
                                </>
                                )}
                            </Form.List>
                    ) : (
                        <Col span={8}>
                            <Form.Item label="کدشعبه" name="branchCode"
                                        rules={[
                                            {
                                                required: true,
                                            }
                                        ]}>
                                {/* <Select
                                        showSearch
                                        dropdownClassName="text-right"
                                        defaultActiveFirstOption={false}
                                        showArrow={false}
                                        filterOption={false}
                                        tagRender={ () => {}}
                                        onSearch={ value => {
                                            if (value === '' || value === null){
                                                // dispatch(cleanCandidatesList())
                                            }else{
                                                // dispatch(getCandidatesList({search: value, countryDivisionCode: countryDivisionCode}))
                                            }
                                        }}
                                        onChange={ (value, option) => setSelectedBranch(option) }
                                >
                                    {candidatesList.map( (item, index) => (
                                        <Select.Option value={item.id} key={index} data-username={`${item.name} ${item.surname}`}>{item.name} {item.surname} - {item.nationalNo}</Select.Option>
                                    ) )}
                                </Select> */}
                                    <Input />
                                </Form.Item>
                                { selectedBranch && (<Tag 
                                    className="badge-pill text-white background-pill-complaints mx-2 py-1 ml-1 font-weight-bold" 
                                    closable
                                    icon={<FaRegUserCircle className="ml-3" />}
                                    onClose={ () => {
                                        form.setFieldsValue({"candidateId": null});
                                        setSelectedBranch(null);
                                        // dispatch(cleanCandidatesList());
                                    }}
                                >
                                    {selectedBranch["data-username"]}
                                </Tag> )} 
                        </Col>
                    )
                }
                
                
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
                    label="متن تخلف"
                >
                    <Input.TextArea rows={5} />
                </Form.Item>
            </div>
            <Row>
                <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                    <Form.Item className="mt-3" label="فایل محتوا">
                        <Upload
                            name="file"
                            action={MEDIA_URL + PEOPLE_VIOLATION_ATTACHMENTS}
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
                                        props.setAttachmentsList( state => [
                                            ...state, {
                                                path: info.file.response.data,
                                                fileSize: info.file.size,
                                                fileFormat: info.file.type,
                                            }
                                        ] )
                                    }
                                }
                                if (info.file.status === 'removed') {
                                    props.setAttachmentsList( state => state.filter( item => item.path !== info.file.response.data ))
                                }
                            }}
                        >
                            <Button>انتخاب فایل</Button>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}


const ComplaintUserForm = (props) => {

    const {form} = props;

    return (
        <>
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
                        <Input disabled={props.firstNameLock} />
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
                        <Input disabled={props.surnameLock} />
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
                        <Input disabled={props.fatherNameLock} />
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
                                    <Col key={index} className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <Form.Item
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
                                                    setTimeout( () => props.dispatch(cleanCountriesStates()), 500 )
                                                    if (index == fields.length - 1 && fields.length < 5 ){ add()}
                                                }}
                                                onFocus={props.onFocus}
                                                dropdownClassName="text-right"
                                            >
                                                { props.allCountries.map( (item, index) => <Select.Option value={item.code} key={index} >{item.name}</Select.Option> )}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                )
                            }
                        }
                        )}
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
                                        props.setAttachmentsList( state => [
                                            ...state, {
                                                path: info.file.response.data.path,
                                                fileSize: info.file.size,
                                                fileFormat: info.file.type,
                                            }
                                        ] )
                                    }
                                }
                                if (info.file.status === 'removed') {
                                    props.setAttachmentsList( state => state.filter( item => item.path !== info.file.response.data ))
                                }
                            }}
                        >
                            <Button>انتخاب فایل</Button>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}


function ComplaintUser(props) {

    const [form] = Form.useForm();
    const { Dragger } = Upload;

    const dispatch = useDispatch();
    const params = useLocation()

    // const { countryDivisionCode } = useTokenClaims()

    const { allCountries } = useSelector( state => state.countries)
    const { protestTrackCode, isLoading } = useSelector( state => state.newUser)
    const { violation, isLoading: violationLoading, isSuccess} = useSelector( state => state.violation.peopleViolationCreate)
    const history = useHistory();

    const [attachmentsList, setAttachmentsList] = React.useState([]);
    const [queryValues, setQueryValues] = React.useState({});
    const [firstNameLock, setFirstNameLock] = React.useState(false)
    const [surnameLock, setSurnameLock] = React.useState(false)
    const [fatherNameLock, setFatherNameLock] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState("1")

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

    React.useEffect( () => {
        if (!violationLoading){
            if (isSuccess){
                setTimeout( () => history.push('/user/protest/success'), 1000 )
            }
        }
    }, [violationLoading])

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
        let cdc = values?.countryDivisionCode?.pop()
        if (cdc === undefined) cdc = values?.countryDivisionCode?.pop()
        values.countryDivisionCode = cdc
        if (activeTab === "1"){
            if (cdc === undefined) values.countryDivisionCode = null
            values.peopleViolationFile = attachmentsList
            dispatch(createPeopleViolation(values))
        }else{
            values.attachments = attachmentsList
            dispatch(sendUserProtest(values))
        }
    }

    return (
        <div className="content mb-5 p-4">
            <div className="d-flex justify-content-between">
                <span className="square-indicator">ثبت تخلفات و شکایات</span>
                {/* <span className="square-indicator">ثبت پیشنهادات، انتقادات و شکایات مردمی</span> */}
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
                        <Tabs activeKey={activeTab} onChange={ (value) => {
                            form.setFieldsValue({"countryDivisionCode": [""], "description": ""})
                            setActiveTab(value)
                            setAttachmentsList([])
                        }}>
                            <Tabs.TabPane tab="ثبت تخلفات" key="1">
                                {
                                    activeTab === "1" && (
                                        <ViolationUserForm 
                                            form={form}
                                            firstNameLock={firstNameLock}
                                            surnameLock={surnameLock}
                                            fatherNameLock={fatherNameLock}
                                            onFocus={onFocus}
                                            setAttachmentsList={setAttachmentsList}
                                            dispatch={dispatch}
                                            allCountries={allCountries}
                                        />
                                    )
                                }
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="شکایات و انتقادات" key="2">
                                {
                                    activeTab === "2" && (
                                        <ComplaintUserForm 
                                            form={form}
                                            firstNameLock={firstNameLock}
                                            surnameLock={surnameLock}
                                            fatherNameLock={fatherNameLock}
                                            onFocus={onFocus}
                                            setAttachmentsList={setAttachmentsList}
                                            dispatch={dispatch}
                                            allCountries={allCountries}
                                        />
                                    )
                                }
                            </Tabs.TabPane>
                        </Tabs>

                        <div className="text-left px-2">
                            <Button size="large" type="primary" loading={false} htmlType="submit" > {activeTab === "1" ? "ارسال تخلف" : "ارسال شکایت"} </Button>
                        </div>
                    </Form>
                </Spin>
            </div>
        </div>
    )
}

export default ComplaintUser
