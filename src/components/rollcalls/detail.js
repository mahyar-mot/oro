import React, {useEffect, useState} from 'react';
import {Button, Input, Modal, List, Row, Col, Table} from 'antd';
import {NavLink as NavLinkRouter, useHistory, useLocation, useParams} from "react-router-dom";
import ListFilters from './listFilters';
import ListTable from './listTable';
import {BsArrowLeft} from 'react-icons/bs';
import {ReactComponent as AddExcelPic} from "../../assets/icons/post_add_black.svg";
import {ReactComponent as AddUserPic} from "../../assets/icons/person_add_alt_1_black.svg";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import { getBranchRollCall, cleanBranchDetail } from "../../redux/branches/branchDetail"
import { branchRollCallUpdate, clearUpdate } from "../../redux/branches/branchesUpdate"

const { Column } = Table;


const BallotBoxModal = (props) => (
    <Modal 
        bodyStyle={{padding: 0, textAllign: "center"}} 
        className="custom-ant-modal" 
        footer="" 
        title={<div className="text-center text-white" >کدهای صندوق های شعبه</div>} 
        visible={props.ballotBoxModal} 
        onCancel={ () => props.setBallotBoxModal(false)}
    >
        <List
        size="small"
        dataSource={props.data}
        renderItem={ (item, index) => (
            <List.Item className={classNames({"list-alternate-bg": index % 2 !== 0})}>
                <div className="text-center w-100">
                    {item.code}
                </div>
            </List.Item>
            )}
        >
        </List>
    </Modal>
)


const RollCallHistory = (props) => (
    <>
        <span className="square-indicator">سوابق حضور و غیاب</span>
        <Table
            pagination={false}
            dataSource={props.rollCallHistory}
            className="shadow-sm"
            // loading={isLoading}
            rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
            bordered
        >
            <Column
                title=" حاضرین "
                dataIndex="presentSupervisors"
                key="presentSupervisors"
            />
            <Column
                title=" غایبین "
                dataIndex="absentSupervisors"
                key="absentSupervisors"
            />
            <Column
                className="dir-ltr"
                title=" تاریخ "
                dataIndex="rollCallDate"
                key="rollCallDate"
            />
            <Column
                title=" توضیحات "
                dataIndex="description"
                key="description"
            />
        </Table>
    </>
)


function RollCall(props) {
    const {id} = useParams();
    const history = useHistory();
    const [ballotBoxModal, setBallotBoxModal] = useState(false);
    const [descriptionText, setDescriptionText] = useState('');
    const [rollCallSupervisors, setRollCallSupervisors] = useState([]);

    const dispatch = useDispatch();
    const location = useLocation();

    const { branchDetail, isLoading } = useSelector( state => state.branch.retrieve)

    React.useEffect( () => {
        dispatch(getBranchRollCall(id))
        return () => {
            dispatch(cleanBranchDetail())
            dispatch(clearUpdate())
        }
    }, [])

    const handleBranchRollBack = () => {
        let allSupervisors = branchDetail.branchSupervisors.map( item =>({branchSupervisorId: item.id, isPresent: false}) )
        let reduced = allSupervisors.filter( aitem => !rollCallSupervisors.find( bitem => aitem["branchSupervisorId"] === bitem["branchSupervisorId"] ) )
        let result = reduced.concat(rollCallSupervisors)
        let payload = {
            branchId: branchDetail.id,
            description: descriptionText,
            rollCallSupervisors: result
        }
        dispatch(branchRollCallUpdate(payload))
        setTimeout( () => dispatch(getBranchRollCall(id)) )
    }

    return (
        <div className="mb-5">
            <div className="content-no-pad ">
                <List 
                    header={
                        <div className="d-flex justify-content-between p-4">
                            <div>
                                <span className="square-indicator">شعبه {branchDetail?.name}  </span>
                            </div>
                            <div>
                                <NavLinkRouter className="text-decoration-none" to={`/rollcalls${location.search}`} >
                                    <span className="link-color">بازگشت به لیست شعب <BsArrowLeft /></span>
                                </NavLinkRouter> 
                            </div>
                        </div>
                    }
                >
                        <List.Item className="px-4 list-alternate-bg ">
                            <Row className="w-100">
                                <Col xs={8} sm={8} md={8} lg={10} xl={10}>
                                    <span>کد شعبه : </span><span>{branchDetail?.branchNumber}</span>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <span>نوع شعبه : </span><span>{branchDetail?.branchTypeTitle}</span>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={6} xl={6}>
                                    <a className="link-color" onClick={ () => setBallotBoxModal(true)}> کدهای صندوق </a>
                                </Col>
                                <BallotBoxModal ballotBoxModal={ballotBoxModal} setBallotBoxModal={setBallotBoxModal} data={branchDetail?.ballotBoxes} />
                            </Row>
                        </List.Item>
                        <List.Item className="px-4">
                            <Row className="w-100">
                                <Col xs={8} sm={8} md={8} lg={10} xl={10}>
                                    <span>استان : </span><span>{branchDetail?.countryDivisions?.map( (item, i) => i === 1 ? item.name : "" )}</span>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <span>شهرستان : </span><span>{branchDetail?.countryDivisions?.map( (item, i) => i === 2 ? item.name : "" )}</span>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={6} xl={6}>
                                    <span>بخش : </span><span>{branchDetail?.countryDivisions?.map( (item, i) => i === 3 ? item.name : "" )}</span>
                                </Col>
                            </Row>
                        </List.Item>
                        <List.Item className="px-4 list-alternate-bg ">
                            <Row className="w-100">
                                <Col xs={8} sm={8} md={8} lg={10} xl={10}>
                                    <span>شهر : </span><span>{branchDetail?.countryDivisions?.map( (item, i) => i === 4 ? item.name : "" )}</span>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <span>منطقه/روستا : </span><span>{branchDetail?.countryDivisions?.map( (item, i) => i === 5 ? item.name : "" )}</span>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={6} xl={6}>
                                    {/* <span>روستا : </span><span>125</span> */}
                                </Col>
                            </Row>
                        </List.Item>
                        <List.Item className="px-4">
                            <Row className="w-100">
                                <Col xs={24} sm={14} md={12} lg={12} xl={10}>
                                    <span>موقعیت : </span><span>{branchDetail?.location}</span>
                                </Col>
                                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                    <span>تلفن تماس : </span><span>{branchDetail?.phoneNo}</span>
                                </Col>
                            </Row>
                        </List.Item>
                </List>
            </div>
            <div className="py-1 mt-3">
                <div className="d-flex justify-content-between">
                    <span className="square-indicator">لیست حضور و غیاب کاربران شعبه {branchDetail?.name}  </span>
                </div>
                <div>
                    <Table
                        rowSelection={{
                            type: "checkbox",
                            renderCell: (checked, record, index, originNode) => (
                                    <div className="d-flex"><span className="ml-2">{originNode}</span>{`${index + 1}`}</div>
                                ),
                            onChange: (selectedRowKeys, selectedRows) => setRollCallSupervisors(selectedRowKeys.map(item =>({branchSupervisorId: item, isPresent: true})))
                        }}
                        pagination={false}
                        scroll={{x: true}}
                        dataSource={branchDetail.branchSupervisors}
                        className="shadow-sm"
                        rowKey="id"
                        loading={isLoading}
                        rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
                        bordered
                    >
                        <Column
                            title=" نام "
                            dataIndex={["supervisorProfile", "name"]}
                            key={["supervisorProfile", "name"]}
                        />
                        <Column
                            title=" نام خانوادگی "
                            dataIndex={["supervisorProfile", "surname"]}
                            key={["supervisorProfile", "surname"]}
                        />
                        {/* <Column 
                            title="شماره شناسنامه" 
                            dataIndex={["supervisorProfile", "surname"]}
                            key={["supervisorProfile", "surname"]}
                        /> */}
                        <Column 
                            title=" کدملی" 
                            dataIndex={["supervisorProfile", "nationalNo"]}
                            key={["supervisorProfile", "nationalNo"]}
                        />
                        <Column 
                            title=" تلفن همراه" 
                            dataIndex={["supervisorProfile", "mobile"]}
                            key={["supervisorProfile", "mobile"]}
                        />
                        <Column 
                            responsive={["md"]}
                            title=" مدرک" 
                            dataIndex={["supervisorProfile", "educationTypeTitle"]}
                            key={["supervisorProfile", "educationTypeTitle"]}
                        />
                        <Column 
                            title=" سمت" 
                            dataIndex="supervisorPostTypeTitle" 
                            key="supervisorPostTypeTitle"
                        />
                    </Table>
                    <div className="mt-3">
                        <Input.TextArea autoSize={{minRows: 4}} value={descriptionText} onChange={ e => setDescriptionText(e.target.value) } placeholder="در صورت نیاز توضیحات لازم را بنویسید" />
                    </div>
                    {
                        Boolean(branchDetail?.branchSupervisors?.length) && (
                            <div className="text-left px-2 mt-3">
                                <Button size="large" type="primary" loading={isLoading} onClick={ () => handleBranchRollBack() }>تایید حضور</Button>
                            </div>
                        )
                    }
                </div>
                <div className="mt-4">
                    { 
                        Boolean(branchDetail?.rollCallHistory?.length) && (
                            <RollCallHistory rollCallHistory={branchDetail?.rollCallHistory} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default RollCall
