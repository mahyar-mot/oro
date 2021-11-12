import React from 'react';
import {NavLink as NavLinkRouter, useHistory, useParams, useLocation} from "react-router-dom";
import { Form, Input, Button, Row, Col, Modal, Upload, Select, Table, Spin, message, List } from 'antd';
import {ReactComponent as UploadPic} from "../../assets/icons/add_photo_alternate_black.svg"
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from "react-datepicker2";
import moment from 'moment-jalaali'
import {BsArrowLeft} from 'react-icons/bs';
import {MdAddAlert} from 'react-icons/md';
import classNames from "classnames";
import CountryDivisions from '../public/countryDivisions'
import {uploadImage, cleanUploadFile} from '../../redux/uploadFile';
import { getOverseer, cleanOverseer } from '../../redux/overseers/overseerDetail';
import { getBasicInfo } from '../../redux/basicInfos';
import { ReactComponent as DeletePic } from "../../assets/icons/trash-can.svg";
import { overseerActivation, overseerUpdate, overseerResendSms, clearUpdate, overseerManagementApproval } from "../../redux/overseers/overseerUpdate";


const UnapproveModal = (props) => {

    const [text, setText] = React.useState('')

    const handleOk = () => {
        if (props.modalType === 'reject'){
            props.handleActivation({status: 6, description: text})
        }else{
            props.handleActivation({status: 7, description: text})
        }
    }
    return(
        <Modal
            // title="Title"
            visible={props.modalOpen}
            onOk={handleOk}
            // confirmLoading={confirmLoading}
            cancelText="انصراف"
            okText="ذخیره تغییرات"
            onCancel={ () => props.setModalOpen(false) }
        >
            <div className="p-3 text-right">
                <span className="square-indicator py-2">{props.modalType === 'reject' ? "عدم تایید کاربر" : "مسدود کردن کاربر"}</span>
                <div className="mt-2">
                    {
                        props.modalType === 'reject' ? (
                            <Input.TextArea placeholder="علت" onChange={ (e) => setText(e.target.value)} rows={4}>
                            </Input.TextArea>
                        ) : (
                            <p>
                                آیا از مسدود کردن این ناظر اطمینان دارید؟
                            </p>
                        )
                    }
                    
                </div>
            </div>
        </Modal>
    )
}


const SetManagementApprovalModal = (props) => {
    const [text, setText] = React.useState('')

    return(
        <Modal
            // title="Title"
            visible={props.managementModalOpen}
            onOk={() => {
                if (text !== ''){
                    props.dispatch(overseerManagementApproval(props.nationalNo, {approved: false, description: text}))
                    setTimeout( () => {
                        props.setManagementModalOpen(false)
                        props.dispatch(getOverseer(props.nationalNo))
                    }, 1000)
                }
            }}
            // confirmLoading={confirmLoading}
            cancelText="انصراف"
            okText="ذخیره تغییرات"
            onCancel={ () => props.setManagementModalOpen(false) }
        >
            <div className="p-3 text-right">
                <span className="square-indicator py-2">رد تایید مدیریتی کاربر</span>
                <div className="mt-2">
                    <Input.TextArea placeholder="علت" onChange={ (e) => setText(e.target.value)} rows={4}>
                    </Input.TextArea>
                </div>
            </div>
        </Modal>
    )
}


function EditOverseer() {

    const [form] = Form.useForm();
    const { Dragger } = Upload;

    let {nationalNo} = useParams();
    const location = useLocation()
    const history = useHistory()

    const dispatch = useDispatch()
    const {overseerDetail, isLoading, error} = useSelector(state => state.overseer.retrieve);
    const {userResendSms, isSuccess, isLoading: updateLoading, manageApproval} = useSelector(state => state.overseer.update);
    const basicInfo = useSelector(state => state.basicInfo);
    const { userProfile } = useSelector(state => state.auth);
    const {uploadData} = useSelector(state => state.uploadFile);

    const [activeCityFields, setActiveCityFields] = React.useState(1);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [managementModalOpen, setManagementModalOpen] = React.useState(false);
    const [modalType, setModalType] = React.useState('reject');

    React.useEffect(() => {
        if (nationalNo){
            dispatch(getOverseer(nationalNo))
        }
        if (!basicInfo.apiHasCalled){
            dispatch(getBasicInfo())
        }
        return () => {
            dispatch(cleanOverseer())
            dispatch(cleanUploadFile())
            dispatch(clearUpdate())
        }
    }, [dispatch])

    React.useEffect(() => {
        if (Object.keys(overseerDetail).length){
            setActiveCityFields(overseerDetail.countryDivisionCode.split('.').length)
        }
    }, [overseerDetail])

    React.useEffect(() => {
        if (!updateLoading){
            if (isSuccess){
                setTimeout( () => history.push("/overseers"+location.search), 1000)
            }
        }
    }, [updateLoading, isSuccess])

    const handleActivation = (payload) => {
        if (payload.status){
            dispatch(overseerActivation(overseerDetail.nationalNo, payload))
            setTimeout( () => {
                setModalOpen(false)
                dispatch(getOverseer(nationalNo))
            }, 1000)
        }
    }

    const handleManagementApproval = (approved) => {
        if (!approved){
            setManagementModalOpen(true)
        }else {
            let flag = true
            let values = form.getFieldsValue(["name", "surname", "nationalNo", "mobile", "fatherName", "birthDate", "sheba"])
            for (let o in values){
                if (values[o] === "" ){
                    flag = false
                    form.setFields([
                        {
                          name: o,
                          errors: ["این فیلد باید تکمیل شود"],
                        },
                     ])
                }
            }
            if (flag){
                dispatch(overseerManagementApproval(nationalNo, {approved, description: ''}))
                setTimeout( () => {
                    dispatch(getOverseer(nationalNo))
                }, 1000)
            }
        }
    }

    const onFieldsChange = (changedFields) => {
        if (changedFields.length){
            if (changedFields[0].name[0].startsWith("cityDiv")){

                let currnetFieldName = changedFields[0].name[0];
                let currentCityDivNumber = parseInt(currnetFieldName.split('-')[1])
                for (let i = currentCityDivNumber + 1; i < 5 ; i++ ){
                    form.setFieldsValue({[`cityDiv-${i}`]: ""})
                }
            }
            // if (changedFields[0].name[0] === "assignmentTitleType"){
            //     for (let i = 0; i < 5 ; i++ ){
            //         form.setFieldsValue({[`cityDiv-${i}`]: ""})
            //     }
            // }
        }
    }

    const onFinish = (values) => {
        if (values["cityDiv-0"] === undefined){
            values["cityDiv-0"] = "1"
        }
        let countryCodes = Object.keys(values).filter( item => item.startsWith('cityDiv'))

        if (values[countryCodes[countryCodes.length -1]].startsWith("1")){
            values.countryDivisionCode = values[countryCodes[countryCodes.length - 1] ]
        }else if (values[countryCodes[countryCodes.length -1]] === ''){
            values.countryDivisionCode = values[countryCodes[countryCodes.length - 2] ]
        }else{
            values.countryDivisionCode = overseerDetail.countryDivisionCode
        }

        if (values.sheba) values.sheba = "IR" + values.sheba

        if (uploadData){
            values.personalPhoto = uploadData
        } else if (overseerDetail.personalPhoto !== ""){
            values.personalPhoto = overseerDetail.personalPhoto
        }
        if (values.birthDate){
            values.birthDate = values.birthDate.format("jYYYY/jMM/jDD")
        }
        dispatch(overseerUpdate(nationalNo, values))
    }

    const cityCodes = ["استان", "شهرستان", "بخش", "شهر/دهستان", "روستا"]

    return (
        <div>
            { 
                overseerDetail?.hasBranch && (
                    <div className="content">
                        <List 
                            header={
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span className="square-indicator">مشخصات شعبه :  {overseerDetail?.supervisorBranchDto?.name}  </span>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            }
                        >
                            <Spin spinning={isLoading}>
                                <List.Item className="px-4 list-alternate-bg ">
                                    <Row className="w-100">
                                        <Col xs={8} sm={8} md={8} lg={10} xl={10}>
                                            <span>کد شعبه : </span><span>{overseerDetail?.supervisorBranchDto?.branchNumber}</span>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <span>نوع شعبه : </span><span>{overseerDetail?.supervisorBranchDto?.branchTypeTitle}</span>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={6} xl={6}>
                                            {/* <a className="link-color" onClick={ () => setBallotBoxModal(true)}> کدهای صندوق </a> */}
                                        </Col>
                                        {/* <BallotBoxModal ballotBoxModal={ballotBoxModal} setBallotBoxModal={setBallotBoxModal} data={overseerDetail?.supervisorBranchDto?.ballotBoxes} /> */}
                                    </Row>
                                </List.Item>
                                <List.Item className="px-4">
                                    <Row className="w-100">
                                        <Col xs={8} sm={8} md={8} lg={10} xl={10}>
                                            <span>استان : </span><span>{overseerDetail?.supervisorBranchDto?.countryDivisions?.map( (item, i) => i === 1 ? item.name : "" )}</span>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <span>شهرستان : </span><span>{overseerDetail?.supervisorBranchDto?.countryDivisions?.map( (item, i) => i === 2 ? item.name : "" )}</span>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={6} xl={6}>
                                            <span>بخش : </span><span>{overseerDetail?.supervisorBranchDto?.countryDivisions?.map( (item, i) => i === 3 ? item.name : "" )}</span>
                                        </Col>
                                    </Row>
                                </List.Item>
                                <List.Item className="px-4 list-alternate-bg ">
                                    <Row className="w-100">
                                        <Col xs={8} sm={8} md={8} lg={10} xl={10}>
                                            <span>شهر : </span><span>{overseerDetail?.supervisorBranchDto?.countryDivisions?.map( (item, i) => i === 4 ? item.name : "" )}</span>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <span>منطقه/روستا : </span><span>{overseerDetail?.supervisorBranchDto?.countryDivisions?.map( (item, i) => i === 5 ? item.name : "" )}</span>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={6} xl={6}>
                                            {/* <span>روستا : </span><span>125</span> */}
                                        </Col>
                                    </Row>
                                </List.Item>
                                <List.Item className="px-4">
                                    <Row className="w-100">
                                        <Col xs={24} sm={14} md={12} lg={12} xl={10}>
                                            <span>موقعیت : </span><span>{overseerDetail?.supervisorBranchDto?.location}</span>
                                        </Col>
                                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                            <span>تلفن تماس : </span><span>{overseerDetail?.supervisorBranchDto?.phoneNo}</span>
                                        </Col>
                                    </Row>
                                </List.Item>
                            </Spin>
                        </List>
                    </div>
                )
            }
            <div className="content mb-5">
                <div className="d-flex justify-content-between">
                    <span className="square-indicator">مشخصات ناظر {overseerDetail.managementApproval ? <small>(تایید مدیریتی)</small> : null}</span>
                    <div className="ml-2">
                        <NavLinkRouter className="text-decoration-none" to={`/overseers`+location.search}>
                            <span className="link-color">بازگشت به لیست ناظران <BsArrowLeft /></span>
                        </NavLinkRouter> 
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    {
                        overseerDetail.stateType !== 3 && (
                            <>
                                <div className="pt-4 px-xl-5 mx-2">
                                    { overseerDetail.assignmentTitleType >= 5 && overseerDetail.profileStatusDto[0].statusType === 3 && <Button size="large" className="px-4 border-success text-success" onClick={ () => handleManagementApproval(true)}>تایید مدیریتی</Button>}
                                    { overseerDetail.stateType === 1 && overseerDetail.managementApproval && <Button size="large" danger className="px-4" onClick={ () => handleManagementApproval(false)}>رد تایید مدیریتی</Button>}
                                    <SetManagementApprovalModal managementModalOpen={managementModalOpen} setManagementModalOpen={setManagementModalOpen} nationalNo={nationalNo} dispatch={dispatch} />
                                </div>
                                <div className="d-flex justify-content-end pt-4 px-xl-5 mx-2">
                                    { Boolean(Object.keys(overseerDetail).length) && (
                                        <>
                                            { !overseerDetail.managementApproval && [4,5].includes(overseerDetail.profileStatusDto[0].statusType) && <Button className="px-4 ml-3" type="danger" size="large" loading={updateLoading} onClick={ () => {setModalType('reject'); setModalOpen(true)} }>عدم تایید</Button> }
                                            { !overseerDetail.managementApproval && overseerDetail.stateType === 2 && [4,6].includes(overseerDetail.profileStatusDto[0].statusType) && <Button className="px-4 text-white ml-3" size="large" loading={updateLoading} onClick={ () => handleActivation({status: 5, description: ''}) } style={{backgroundColor: "#00A65A"}} >تایید</Button> }
                                            { !overseerDetail.managementApproval && overseerDetail.profileStatusDto[0].statusType === 3 && <Button className="px-4 ml-3 border-success text-success" onClick={ () => userResendSms ? '' : dispatch(overseerResendSms(nationalNo)) } size="large">ارسال دوباره دعوتنامه</Button> }
                                            { overseerDetail.profileStatusDto[0].statusType !== 7 && (<Button className="px-3 " loading={updateLoading} icon={<DeletePic />} onClick={ () => {setModalType('suspend'); setModalOpen(true)} } danger size="large"><span className="mr-2">مسدود کردن</span></Button>) }
                                            <UnapproveModal modalOpen={modalOpen} modalType={modalType} setModalOpen={setModalOpen} handleActivation={handleActivation} />
                                        </>
                                    )}
                                </div>
                            </>
                        )
                    }
                </div>
                <Spin size="large" spinning={isLoading} >
                    <div className="px-xl-5">
                        { Boolean(Object.keys(overseerDetail).length) && (
                            <Form
                                preserve
                                layout="vertical"
                                form={form}
                                labelCol= {{ span: 20 }}
                                wrapperCol= {{ span: 24 }}
                                initialValues={{
                                    ...overseerDetail,
                                    assignmentTitleType: overseerDetail.assignmentTitleType,
                                    sheba: overseerDetail.sheba && overseerDetail.sheba.substring(2),
                                    birthDate: overseerDetail.birthDate ? moment(overseerDetail.birthDate, 'jYYYY/jMM/jDD') : null
                                }}
                                onFinish={onFinish}
                                onFieldsChange={onFieldsChange}
                            >
                                <Row>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <Form.Item 
                                            className=""
                                            label="سطح فعالیت" 
                                            name="assignmentTitleType"
                                            rules={[
                                                {
                                                required: true,
                                                }
                                            ]}
                                        >
                                            <Select
                                                size="large"
                                                dropdownClassName="text-right"
                                                placeholder="سطح فعالیت کاربر را انتخاب کنید"
                                                onChange={ value => setActiveCityFields(value) }
                                                disabled={overseerDetail.stateType !== 1}
                                            >
                                                {
                                                    basicInfo.countryDivisionLevel.filter( item => item.value >= userProfile.assignmentTitleType ).map( (item, index) => (
                                                        <Select.Option value={item.value} key={index} >{item.name}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col  className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <Form.Item 
                                            className="" 
                                            label="کدملی" 
                                            name="nationalNo"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "تکمیل این فیلد ضروری است",
                                                },
                                                {
                                                    pattern: /^[۱۲۳۴۵۶۷۸۹۰0-9]{0,11}$/,
                                                    message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                                },
                                            ]}
                                        >
                                            <Input 
                                                disabled={overseerDetail.stateType !== 1}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <Form.Item 
                                            className="" 
                                            label="تلفن همراه" 
                                            name="mobile"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "تکمیل این فیلد ضروری است",
                                                },
                                                {
                                                    pattern: /^[۱۲۳۴۵۶۷۸۹۰0-9]{0,11}$/,
                                                    message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                                },
                                            ]}
                                        >
                                            <Input 
                                                disabled={overseerDetail.stateType !== 1}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {   overseerDetail.stateType === 1 &&(
                                        <CountryDivisions form={form} visibleFields={activeCityFields} selectedCode={overseerDetail.countryDivisionCode} /> 
                                    )
                                }
                                {   overseerDetail.stateType !== 1 &&(
                                        <Row className="px-2">
                                            {overseerDetail.countryDivisions.map( (item, index) => {
                                                return (<Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8} key={"overseerDetail"+index}>
                                                    <Form.Item className="" label={cityCodes[index]} initialValue={item.name}>
                                                        <Input value={item.name} disabled />
                                                    </Form.Item>
                                                </Col>)
                                            } ) }
                                        </Row>
                                    ) 
                                }
                                <Row>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <Form.Item 
                                            label="نام پدر"
                                            name="fatherName"
                                            rules={[
                                                {
                                                    pattern: "^[ ئؤأيآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی،-]+$",
                                                    message: "فقط کارکتر فارسی قابل قبول است"
                                                }
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <Form.Item className="" label="جنسیت" name="genderType" >
                                            <Select
                                                size="large"
                                                dropdownClassName="text-right"
                                            >
                                                {
                                                    basicInfo.gender.map( (item, index) => (
                                                        <Select.Option value={item.value} key={index} >{item.name}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <Form.Item className="" label="تحصیلات" name="educationType">
                                            <Select
                                                size="large"
                                                dropdownClassName="text-right"
                                            >
                                                {
                                                    basicInfo.education.map( (item, index) => (
                                                        <Select.Option value={item.value} key={index} >{item.name}</Select.Option>

                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <Form.Item className=""
                                                    label="نام"
                                                    name="name"
                                                    rules={[
                                                        {
                                                            pattern: "^[ ئؤأيآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی،-]+$",
                                                            message: "فقط کارکتر فارسی قابل قبول است"
                                                        }
                                                    ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <Form.Item className=""
                                                    label="نام خانوادگی"
                                                    name="surname"
                                                    rules={[
                                                        {
                                                            pattern: "^[ ئؤأيآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی،-]+$",
                                                            message: "فقط کارکتر فارسی قابل قبول است"
                                                        }
                                                    ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <Form.Item 
                                            className="" 
                                            label="شماره شبا" 
                                            name="sheba"
                                            rules={[
                                                // {
                                                //     required: true,
                                                //     message: "تکمیل این فیلد ضروری است",
                                                // },
                                                {
                                                    pattern: /^[\d]{0,24}$/,
                                                    message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                                },
                                                {
                                                    min: 24,
                                                    message: "۲۴ کارکتر مورد نیاز است",
                                                }
                                            ]}
                                        >
                                            <Input 
                                                maxLength={24}
                                                addonAfter="-IR"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <Form.Item className=""
                                                    label="شغل ثابت(ماموریت)"
                                                    name="currentJob"
                                                    rules={[
                                                        {
                                                            pattern: "^[ ئؤأيآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی،-]+$",
                                                            message: "فقط کارکتر فارسی قابل قبول است"
                                                        }
                                                    ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <Form.Item className=""
                                                    label="شغل پیشین (درصورت بازنشسته بودن)"
                                                    name="prevJob"
                                                    rules={[
                                                        {
                                                            pattern: "^[ ئؤأيآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی،-]+$",
                                                            message: "فقط کارکتر فارسی قابل قبول است"
                                                        }
                                                    ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <Form.Item 
                                            className="pt-1" 
                                            label="تاریخ تولد" 
                                            name="birthDate"
                                        >
                                            <DatePicker
                                                max={moment().subtract(18, 'years')}
                                                className="ant-input "
                                                isGregorian={false}
                                                timePicker={false}
                                            />                            
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* </Row> */}
                                {/* <Form.Item className="my-3" wrapperCol={{
                                                span: 24,
                                    }}>
                                    {citiesForm}
                                </Form.Item> */}

                                <Form.Item className="px-2" wrapperCol={{
                                                span: 24,
                                                // offset: 1
                                            }} 
                                            label="آدرس"
                                            name="homeAddress"
                                >
                                    <Input />
                                </Form.Item>

                                <div className="px-2 mb-5 ">
                                    <div className="my-2">تصویر پروفایل</div>
                                    <Dragger 
                                        accept=".png, .jpg, .jpeg"
                                        maxCount={1}
                                        beforeUpload={ (file, fileList) => {
                                            if ((file.size / 1024) >= 600){
                                                message.error("حجم فایل آپلود شده بیش از حد مجاز است")
                                                return false
                                            }
                                        } }
                                        disabled={overseerDetail.stateType !== 1}
                                        customRequest={
                                            async (e) => {
                                                const { onSuccess, onError, file, action, onProgress } = e;
                                                let formData = new FormData()
                                                await  formData.append('file', e?.file)
                                                // console.log(e?.file)
                                                await dispatch(uploadImage(nationalNo, formData)).then(r => onSuccess({"status":"success"}))
                                            }
                                        }
                                    >
                                        { overseerDetail.personalPhotoAddress !== '' ? (
                                            <img className="img-fluid" style={{maxWidth: "200px"}} src={overseerDetail.personalPhotoAddress} />
                                        ) : (
                                            <>
                                                <p className="ant-upload-drag-icon">
                                                <UploadPic />
                                                </p>
                                                <p className="ant-upload-text text-muted">بر روی آیکون کلیک کنید یا عکس خود را اینجا بیاندازید</p>
                                            </>
                                        ) }
                                    </Dragger>
                                    <div className="my-2 py-2"> <MdAddAlert color="red" />  <small>عکس ارسالی باید در ابعاد ۳ در ۴ و حداکثر 400 کیلوبایت باشد (جهت پرینت بر روی کارت شناسایی)</small></div>
                                </div>
                                {
                                    overseerDetail.stateType === 1 && overseerDetail.profileStatusDto[0].statusType !== 7 && (
                                        <div className="text-left px-2">
                                            <Button size="large" type="primary" loading={isLoading} htmlType="submit" >ذخیره و ارسال</Button>
                                        </div>
                                    )
                                }
                            </Form>
                            )
                        }
                    </div>
                </Spin>
            </div>
            { overseerDetail?.profileStatusVersionsDto?.length && (
                <div className="content mt-4 p-5">
                        <span className="square-indicator">بررسی تایید یا عدم تایید</span>
                        <Table
                            pagination={false}
                            dataSource={overseerDetail.profileStatusVersionsDto}
                            className="shadow-sm mt-3"
                            // loading={listIsLoading}
                            rowClassName={(record, index) => index % 2 === 0 ? '' :  'alternate-row'}
                            bordered
                        >
                            <Table.Column title="وضعیت" key="statusName" dataIndex="statusName" />
                            <Table.Column title="توضیحات" key="actionDescription" dataIndex="actionDescription" render={ (t) => t ? t : '-' } />
                            <Table.Column className="dir-ltr" title="تاریخ" key="updateDate" dataIndex="updateDate" render={ (t,r) => t ? t : r?.createDate } />
                        </Table>
                </div>
            )}
        </div>
    )
}


export default EditOverseer
