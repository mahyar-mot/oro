import React from 'react';
import {NavLink as NavLinkRouter, useHistory, useParams, useLocation} from "react-router-dom";
import { Form, Input, Button, Row, Col, Modal, Upload, Select, Table, Spin, message } from 'antd';
import {ReactComponent as UploadPic} from "../../assets/icons/add_photo_alternate_black.svg"
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from "react-datepicker2";
import moment from 'moment-jalaali'
import {BsArrowLeft} from 'react-icons/bs';
import {MdAddAlert} from 'react-icons/md';
import classNames from "classnames";
import CountryDivisions from '../public/countryDivisions'
import {uploadImage, cleanUploadFile} from '../../redux/uploadFile';
import { uploadNationalImage , cleanInspectorsFile} from "../../redux/inspectors/inspectorsFile"
import { getInspector, cleanInspectorDetail } from '../../redux/inspectors/inspectorDetail';
import { getBasicInfo } from '../../redux/basicInfos';
import { ReactComponent as DeletePic } from "../../assets/icons/trash-can.svg";
import { inspectorActivation, inspectorUpdate, inspectorResendSms, clearUpdate, inspectorManagementApproval } from "../../redux/inspectors/inspectorUpdate";


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
                                آیا از مسدود کردن این بازرس اطمینان دارید؟
                            </p>
                        )
                    }
                    
                </div>
            </div>
        </Modal>
    )
}


// const SetManagementApprovalModal = (props) => {
//     const [text, setText] = React.useState('')

//     return(
//         <Modal
//             // title="Title"
//             visible={props.managementModalOpen}
//             onOk={() => {
//                 if (text !== ''){
//                     props.dispatch(inspectorManagementApproval(props.nationalNo, {approved: false, description: text}))
//                     setTimeout( () => {
//                         props.setManagementModalOpen(false)
//                         props.dispatch(getInspector(props.nationalNo))
//                     }, 1000)
//                 }
//             }}
//             // confirmLoading={confirmLoading}
//             cancelText="انصراف"
//             okText="ذخیره تغییرات"
//             onCancel={ () => props.setManagementModalOpen(false) }
//         >
//             <div className="p-3 text-right">
//                 <span className="square-indicator py-2">رد تایید مدیریتی کاربر</span>
//                 <div className="mt-2">
//                     <Input.TextArea placeholder="علت" onChange={ (e) => setText(e.target.value)} rows={4}>
//                     </Input.TextArea>
//                 </div>
//             </div>
//         </Modal>
//     )
// }


function EditInspector() {

    const [form] = Form.useForm();
    const { Dragger } = Upload;

    let {nationalNo} = useParams();
    const location = useLocation()
    const history = useHistory()

    const dispatch = useDispatch()
    const {inspectorDetail, isLoading, error} = useSelector(state => state.inspector.retrieve);
    const {userResendSms, isSuccess, isLoading: updateLoading, manageApproval} = useSelector(state => state.inspector.update);
    const basicInfo = useSelector(state => state.basicInfo);
    const { userProfile } = useSelector(state => state.auth);
    const {uploadData} = useSelector(state => state.uploadFile);
    const {inspectorNationalImage} = useSelector( state => state.inspector.file)

    const [activeCityFields, setActiveCityFields] = React.useState(1);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [managementModalOpen, setManagementModalOpen] = React.useState(false);
    const [modalType, setModalType] = React.useState('reject');

    React.useEffect(() => {
        if (nationalNo){
            dispatch(getInspector(nationalNo))
        }
        if (!basicInfo.apiHasCalled){
            dispatch(getBasicInfo())
        }
        return () => {
            dispatch(cleanInspectorDetail())
            dispatch(cleanUploadFile())
            dispatch(clearUpdate())
            dispatch(cleanInspectorsFile())
        }
    }, [dispatch])

    React.useEffect(() => {
        if (Object.keys(inspectorDetail).length){
            setActiveCityFields(inspectorDetail.countryDivisionCode.split('.').length)
        }
    }, [inspectorDetail])

    React.useEffect(() => {
        if (!updateLoading){
            if (isSuccess){
                setTimeout( () => history.push("/inspectors"+location.search), 1000)
            }
        }
    }, [updateLoading, isSuccess])

    const handleActivation = (payload) => {
        if (payload.status){
            dispatch(inspectorActivation(inspectorDetail.nationalNo, payload))
            setTimeout( () => {
                setModalOpen(false)
                dispatch(getInspector(nationalNo))
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
                dispatch(inspectorManagementApproval(nationalNo, {approved, description: ''}))
                setTimeout( () => {
                    dispatch(getInspector(nationalNo))
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
            values.countryDivisionCode = inspectorDetail.countryDivisionCode
        }

        if (values.sheba) values.sheba = "IR" + values.sheba

        if (uploadData){
            values.personalPhoto = uploadData
        } else if (inspectorDetail.personalPhoto !== ""){
            values.personalPhoto = inspectorDetail.personalPhoto
        }
        if (inspectorNationalImage){
            values.nationalCardPhoto = inspectorNationalImage
        }else if (inspectorDetail.nationalCardPhoto !== ""){
            values.nationalCardPhoto = inspectorDetail.nationalCardPhoto
        }
        if (values.birthDate){
            values.birthDate = values.birthDate.format("jYYYY/jMM/jDD")
        }
        dispatch(inspectorUpdate(nationalNo, values))
    }

    const cityCodes = ["استان", "شهرستان", "بخش", "شهر/دهستان", "روستا"]

    return (
        <div>
            <div className="content mb-5">
                <div className="d-flex justify-content-between">
                    <span className="square-indicator">مشخصات بازرس {inspectorDetail.managementApproval ? <small>(تایید مدیریتی)</small> : null}</span>
                    <div className="ml-2">
                        <NavLinkRouter className="text-decoration-none" to={`/inspectors`+location.search}>
                            <span className="link-color">بازگشت به لیست بازرسان <BsArrowLeft /></span>
                        </NavLinkRouter> 
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    {
                        inspectorDetail.stateType !== 3 && (
                            <>
                                <div className="pt-4 px-xl-5 mx-2">
                                    {/* { inspectorDetail.assignmentTitleType >= 5 && inspectorDetail.profileStatusDto[0].statusType === 3 && <Button size="large" className="px-4 border-success text-success" onClick={ () => handleManagementApproval(true)}>تایید مدیریتی</Button>}
                                    { inspectorDetail.stateType === 1 && inspectorDetail.managementApproval && <Button size="large" danger className="px-4" onClick={ () => handleManagementApproval(false)}>رد تایید مدیریتی</Button>}
                                    <SetManagementApprovalModal managementModalOpen={managementModalOpen} setManagementModalOpen={setManagementModalOpen} nationalNo={nationalNo} dispatch={dispatch} /> */}
                                </div>
                                <div className="d-flex justify-content-end pt-4 px-xl-5 mx-2">
                                    { Boolean(Object.keys(inspectorDetail).length) && (
                                        <>
                                            { !inspectorDetail.managementApproval && [4,5].includes(inspectorDetail.profileStatusDto[0].statusType) && <Button className="px-4 ml-3" type="danger" size="large" loading={updateLoading} onClick={ () => {setModalType('reject'); setModalOpen(true)} }>عدم تایید</Button> }
                                            { !inspectorDetail.managementApproval && inspectorDetail.stateType === 2 && [4,6].includes(inspectorDetail.profileStatusDto[0].statusType) && <Button className="px-4 text-white ml-3" size="large" loading={updateLoading} onClick={ () => handleActivation({status: 5, description: ''}) } style={{backgroundColor: "#00A65A"}} >تایید</Button> }
                                            { !inspectorDetail.managementApproval && inspectorDetail.profileStatusDto[0].statusType === 3 && <Button className="px-4 ml-3 border-success text-success" onClick={ () => userResendSms ? '' : dispatch(inspectorResendSms(nationalNo)) } size="large">ارسال دوباره دعوتنامه</Button> }
                                            { inspectorDetail.profileStatusDto[0].statusType !== 7 && (<Button className="px-3 " loading={updateLoading} icon={<DeletePic />} onClick={ () => {setModalType('suspend'); setModalOpen(true)} } danger size="large"><span className="mr-2">مسدود کردن</span></Button>) }
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
                        { Boolean(Object.keys(inspectorDetail).length) && (
                            <Form
                                preserve
                                layout="vertical"
                                form={form}
                                labelCol= {{ span: 20 }}
                                wrapperCol= {{ span: 24 }}
                                initialValues={{
                                    ...inspectorDetail,
                                    inspectorAssignmentTitleType: inspectorDetail.assignmentTitleType,
                                    sheba: inspectorDetail.sheba && inspectorDetail.sheba.substring(2),
                                    birthDate: inspectorDetail.birthDate ? moment(inspectorDetail.birthDate, 'jYYYY/jMM/jDD') : null
                                }}
                                onFinish={onFinish}
                                onFieldsChange={onFieldsChange}
                            >
                                <Row>
                                    <Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <Form.Item 
                                            className=""
                                            label="سطح فعالیت" 
                                            name="inspectorAssignmentTitleType"
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
                                                disabled={inspectorDetail.stateType !== 1}
                                            >
                                                {
                                                    basicInfo.inspectorAssignmentTitle.filter( item => item.value >= userProfile.assignmentTitleType ).map( (item, index) => (
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
                                                disabled={inspectorDetail.stateType !== 1}
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
                                                disabled={inspectorDetail.stateType !== 1}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {   inspectorDetail.stateType === 1 &&(
                                        <CountryDivisions form={form} visibleFields={activeCityFields} selectedCode={inspectorDetail.countryDivisionCode} isInspector={true} /> 
                                    )
                                }
                                {   inspectorDetail.stateType !== 1 &&(
                                        <Row className="px-2">
                                            {inspectorDetail.countryDivisions.map( (item, index) => {
                                                return (<Col className="px-2" xs={24} sm={12} md={12} lg={8} xl={8}> 
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
                                        disabled={inspectorDetail.stateType !== 1}
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
                                        { inspectorDetail.personalPhotoAddress !== '' ? (
                                            <img className="img-fluid" style={{maxWidth: "200px"}} src={inspectorDetail.personalPhotoAddress} />
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

                                <div className="px-2 mb-5 ">
                                    <div className="my-2">تصویر کارت ملی</div>
                                    <Dragger 
                                        accept=".png, .jpg, .jpeg"
                                        maxCount={1}
                                        beforeUpload={ (file, fileList) => {
                                            if ((file.size / 1024) >= 600){
                                                message.error("حجم فایل آپلود شده بیش از حد مجاز است")
                                                return false
                                            }
                                        } }
                                        customRequest={
                                            async (e) => {
                                                const { onSuccess, onError, file, action, onProgress } = e;
                                                let formData = new FormData()
                                                await  formData.append('file', e?.file)
                                                // console.log(e?.file)
                                                await dispatch(uploadNationalImage(form.getFieldValue('nationalNo'), formData)).then(r => onSuccess({"status":"success"}))
                                            }
                                        }
                                    >
                                        { inspectorDetail.nationalCardPhotoAddress !== '' ? (
                                            <img className="img-fluid" style={{maxWidth: "200px"}} src={inspectorDetail.nationalCardPhotoAddress} />
                                        ) : (
                                            <>
                                                <p className="ant-upload-drag-icon">
                                                <UploadPic />
                                                </p>
                                                <p className="ant-upload-text text-muted">بر روی آیکون کلیک کنید یا عکس خود را اینجا بیاندازید</p>
                                            </>
                                        ) }
                                    </Dragger>
                                </div>
                                {
                                    inspectorDetail.stateType === 1 && inspectorDetail.profileStatusDto[0].statusType !== 7 && (
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
            { inspectorDetail?.profileStatusVersionsDto?.length && (
                <div className="content mt-4 p-5">
                        <span className="square-indicator">بررسی تایید یا عدم تایید</span>
                        <Table
                            pagination={false}
                            dataSource={inspectorDetail.profileStatusVersionsDto}
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


export default EditInspector
