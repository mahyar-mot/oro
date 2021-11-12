import React, { useState } from 'react';
import {Modal, Button, Row, Col, Checkbox, Form} from 'antd';
import {ReactComponent as ReportIcon} from "../../assets/icons/description_black_24dp.svg";
import {ReactComponent as PdfIcon} from "../../assets/icons/pdf-file.svg";
import {ReactComponent as ExelIcon} from "../../assets/icons/excel-file.svg";
import { useDispatch, useSelector } from 'react-redux';
import { getAdminsExport, getAdminsPDFExport,  cleanAdminsFile } from '../../redux/admins/adminsExport';
import { useTokenClaims } from '../public/hooks';


const OverseerTableList = [
    {colName: "کدملی", colValue: "NationalNo"},
    {colName: "موبایل", colValue: "Mobile"},
    {colName: "نام", colValue: "Name"},
    {colName: "نام‌خانوادگی", colValue: "Surname"},
    {colName: "نام پدر", colValue: "FatherName"},
    {colName: "جنسیت", colValue: "GenderType"},
    {colName: "تقسیمات کشوری", colValue: "CountryDivisionCodeName"},
    {colName: "شماره شناسنامه", colValue: "CertificateInfo"},
    {colName: "تحصیلات", colValue: "EducationType"},
    {colName: "شغل فعلی", colValue: "CurrentJob"},
    {colName: "شغل قبلی", colValue: "PrevJob"},
    {colName: "آدرس", colValue: "HomeAddress"},
    {colName: "شماره شبا", colValue: "Sheba"},
    {colName: "سطح فعالیت", colValue: "AssignmentTitleType"},
    {colName: "توضیحات", colValue: "Description"},
    {colName: "تاریخ تولد", colValue: "BirthDate"},
    {colName: "وضعیت", colValue: "ProfileStatusSupervisor"},
]


const ReportModal = (props) => {

    const dispatch = useDispatch()
    const {adminExport, isLoading} = useSelector(state => state.admin.file)
    const {listCount} = useSelector(state => state.admin.list);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const {countryDivisionCode} = useTokenClaims()

    const [checkAll, setCheckAll] = React.useState(false);

    React.useEffect( () => {
        return () => dispatch(cleanAdminsFile())
    }, [])

    React.useEffect( () => {
        if (adminExport){
            if (!isLoading){
                setIsModalVisible(false)
            }
        }
    }, [adminExport, isLoading])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // setIsModalVisible(false);
        let values = form.getFieldValue("overseerCols")
        if (listCount > 0){
            dispatch(getAdminsExport({countryDivisionCode, ...props.params, pageSize:listCount, columns: values}))
        }
    };

    const handleOkPDF = () => {
        let values = form.getFieldValue("overseerCols")
        if (listCount > 0){
            dispatch(getAdminsPDFExport({countryDivisionCode, ...props.params, pageSize:listCount, columns: values}))
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields()
    };

    return (
        <>

            <Button type="primary" className="w-100" onClick={showModal}>
                <span><ReportIcon/></span>
                <span className="mr-1">دریافت گزارش</span>

            </Button>
            <Modal centered  width={1000} className="text-right custom-ant-modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                   title={<div className="text-white" >دریافت گزارش / انتخاب موارد خروجی</div>} 
                   footer={[
                       <Button  danger
                                key={0}
                                className="mb-2 mb-sm-0"
                               // loading={loading}
                               onClick={handleOkPDF}>
                           <PdfIcon/>
                           <span className="mr-1">    دریافت خروجی پی دی اف</span>
                       </Button>,
                       <Button  key={1}
                                type="primary" ghost
                                className="mb-2 mb-sm-0"
                                loading={isLoading}
                                onClick={handleOk}>
                           <ExelIcon/>
                           <span className="mr-1">    دریافت خروجی اکسل  </span>

                       </Button>,
                       <Button  key={2}
                                type="primary" onClick={handleCancel}
                                loading={isLoading}
                                className="mb-2 mb-sm-0">
                           بستن
                       </Button>,

                   ]}>
                    <Row>
                        <Form
                            // initialValues={{"cityDiv-0":}}
                            layout="vertical"
                            form={form}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            // onFinish={onFinish}
                            // onFieldsChange={onFieldsChange}
                        >
                            <Col span={24} className="mb-3">
                                    <Checkbox checked={checkAll} onChange={ e => {
                                        !checkAll ? form.setFieldsValue({overseerCols: OverseerTableList.map( i => i.colValue)}) : form.setFieldsValue({overseerCols: [] })
                                        setCheckAll( state => !state)
                                    } } >
                                        انتخاب همه موارد
                                    </Checkbox>
                            </Col>
                            {
                                <Form.Item className="mt-3" name="overseerCols">
                                    <Checkbox.Group style={{width: "100%"}}>
                                        <Row>
                                            {OverseerTableList.map((item,i) =>  ( 
                                                        <Col key={i} xs={24} sm={12} md={12} lg={8} xl={6} className="mb-3">
                                                            <Checkbox value={item.colValue}>{item.colName}</Checkbox>
                                                        </Col>
                                            ))}
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                            }
                        </Form>
                    </Row>
            </Modal>
        </>
    );
};

export default ReportModal;