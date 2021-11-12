import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Modal, List, Row, Col, Table, Spin} from 'antd';
import {NavLink as NavLinkRouter, useHistory, useLocation, useParams} from "react-router-dom";
import ListFilters from './listFilters';
import ListTable from './listTable';
import {BsArrowLeft} from 'react-icons/bs';
import {ReactComponent as AddExcelPic} from "../../assets/icons/post_add_black.svg";
import {ReactComponent as AddUserPic} from "../../assets/icons/person_add_alt_1_black.svg";
import classNames from "classnames";
import { getBranch, cleanBranchDetail } from "../../redux/branches/branchDetail"
import {useDispatch, useSelector} from "react-redux";


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


function BranchDetail(props) {
    const {id} = useParams();
    const { Column } = Table;
    const history = useHistory();
    const [ballotBoxModal, setBallotBoxModal] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();

    const { branchDetail, isLoading } = useSelector( state => state.branch.retrieve)

    React.useEffect( () => {
        dispatch(getBranch(id))
        return () => {
            dispatch(cleanBranchDetail())
        }
    }, [])

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
                                    <NavLinkRouter className="text-decoration-none" to={`/branches${location.search}`}>
                                        <span className="link-color">بازگشت به لیست شعب <BsArrowLeft /></span>
                                    </NavLinkRouter> 
                                </div>
                            </div>
                        }
                    >
                        <Spin spinning={isLoading}>
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
                                        <span>عنوان : </span><span>{branchDetail?.title}</span>
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
                        </Spin>
                    </List>
            </div>
            <div className="py-1 mt-4">
                {
                    Boolean(branchDetail?.branchSupervisors?.length) && (
                <>
                    <div className="d-flex justify-content-between">
                        <span className="square-indicator">لیست کاربران شعبه {branchDetail?.name}  </span>
                    </div>
                        <div className="mt-2">
                            <Table
                                dataSource={branchDetail.branchSupervisors}
                                className="shadow-sm"
                                // scroll={{x: true}}
                                pagination={false}
                                loading={isLoading}
                                rowClassName={(record, index) => index % 2 === 0 ? '' : 'alternate-row'}
                                bordered
                            >
                                <Column responsive={["sm"]} title="شماره" key="id" render={(text, record, index) => (`${index + 1}`)}/>
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
                                {/* <Column
                                    title="عملیات"
                                    dataIndex="tags"
                                    key="tags"
                                    render={(text, record) => (
                                        <>

                                            <Button className="ml-3 mb-2" type="secondary" size="small" onClick={e => {
                                                history.push(`/branches/detail`)
                                            }}>بیشتر</Button>

                                            <Button danger icon={<DeletePic/>} size="small"
                                                    onClick={e => console.log("~!~!~!")}/>
                                        </>
                                    )}
                                /> */}
                            </Table>
                        </div>
                    </>
                    )
                }
            </div>
        </div>
    )
}

export default BranchDetail
