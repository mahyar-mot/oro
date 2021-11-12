import React, { useState } from 'react';
import {Modal, Button, Row, Col, Radio, Checkbox, Form} from 'antd';
import {ReactComponent as ReportIcon} from "../../../assets/icons/description_black_24dp.svg";
import {ReactComponent as PdfIcon} from "../../../assets/icons/pdf-file.svg";
import {ReactComponent as ExelIcon} from "../../../assets/icons/excel-file.svg";
import { useDispatch, useSelector } from 'react-redux';
import { getInspectorsMonitoringReportExport, getInspectorsMonitoringReportPDFExport, cleanOverseersExport } from '../../../redux/monitoring/excelExports';


const OverseerTableList = [
    // {colName: "کدملی", colValue: "CDC"},
    {colName: "نام تقسیمات کشوری", colValue: "CDCName"},
    {colName: "تعداد کل", colValue: "TotalCount"},
    {colName: "درحال تکمیل", colValue: "CompletingCount"},
    {colName: "در حال بررسی", colValue: "PendingCount"},
    {colName: "تایید شده", colValue: "ConfirmedCount"},
    {colName: "تایید مدیریتی", colValue: "managementApprovedCount"},
    {colName: "رد شده", colValue: "RejectedCount"},
    {colName: "مسدود شده", colValue: "SuspendedCount"},
    // {colName: "شغل فعلی", colValue: "CurrentJob"},
    // {colName: "شغل قبلی", colValue: "PrevJob"},
    // {colName: "آدرس", colValue: "HomeAddress"},
    // {colName: "شماره شبا", colValue: "Sheba"},
    // {colName: "سطح فعالیت", colValue: "AssignmentTitleType"},
    // {colName: "توضیحات", colValue: "Description"},
    // {colName: "تاریخ تولد", colValue: "BirthDate"},
]


const ReportModal = (props) => {

    const dispatch = useDispatch()
    const {monitoringReportExport, isLoading} = useSelector(state => state.monitoring.excelExports)
    const {listCount} = useSelector(state => state.monitoring.inspectorReport);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const [checkAll, setCheckAll] = React.useState(true);

    React.useEffect( () => {
        form.setFieldsValue({overseerCols: OverseerTableList.map( i => i.colValue)})
        return () => dispatch(cleanOverseersExport())
    }, [])

    React.useEffect( () => {
        if (monitoringReportExport){
            if (!isLoading){
                // const link = document.createElement('a');
                // link.href = monitoringReportExport;
                // link.setAttribute('download', "export.xlsx"); //or any other extension
                // document.body.appendChild(link);
                // link.click();
                setTimeout( () => setIsModalVisible(false), 1000)
            }
        }
    }, [monitoringReportExport, isLoading])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // setIsModalVisible(false);
        let values = form.getFieldValue("overseerCols")
        dispatch(getInspectorsMonitoringReportExport(props.InitialCDC, {...props.params, pageSize: listCount, columns: values}))
    };

    const handleOkPDF = () => {
        // setIsModalVisible(false);
        let values = form.getFieldValue("overseerCols")
        dispatch(getInspectorsMonitoringReportPDFExport(props.InitialCDC, {...props.params, pageSize: listCount, columns: values}))
    };

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
                                className="mb-2 mb-sm-0"
                               // loading={loading}
                               onClick={handleOkPDF}>
                           <PdfIcon/>
                           <span className="mr-1">    دریافت خروجی پی دی اف</span>
                       </Button>,
                       <Button  type="primary" ghost
                                className="mb-2 mb-sm-0"
                                loading={isLoading}
                                onClick={handleOk}>
                           <ExelIcon/>
                           <span className="mr-1">    دریافت خروجی اکسل  </span>

                       </Button>,
                       <Button  type="primary" onClick={handleCancel}
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