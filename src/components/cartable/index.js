import React from 'react';
import { List, Row, Col, Spin} from 'antd';

import ReportLogo from "../../assets/icons/flag_black -green.svg";
import ContentLogo from "../../assets/icons/inventory_blue.svg";
import AdminLogo from "../../assets/icons/manage_accounts_blue.svg";
import NazeranLogo from "../../assets/icons/people_green.svg";
import ComplaintLogo from "../../assets/icons/people_outline-24px -green.svg";
import ViolationLogo from "../../assets/icons/report_problem_green.svg";
import {NavLink} from "react-router-dom";
import { useTokenClaims } from '../public/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeActiveSelectedKey } from '../../redux/pages/menu';
import { cleanBranchDetail, getOverseerBranch } from '../../redux/branches/branchDetail';

const list = [
    {label: "ناظران", value: "overseers", url: "overseers", requiredRole: "1.1", selectedKey: "2"},
    {label: "بازرسان", value: "overseers", url: "inspectors", requiredRole: "1.21", selectedKey: "20"},
    {label: "گزارشات", value: "reports", url: "reports", requiredRole: "1.8", selectedKey: "3"},
    {label: "محتوا", value: "contents", url: "contents", requiredRole: "2.3", selectedKey: "5"},
    //{label: "ثبت اعتراض", value: "complaints", url: "complaints", requiredRole: null},
    {label: "داوطلبان", value: "overseers", url: "candidates", requiredRole: "4.1", selectedKey: "9"},
    {label: "شکایات مردمی", value: "complaints", url: "list-complaints", requiredRole: "3.1", selectedKey: "8"},
    {label: "تخلفات", value: "violation", url: "violations", requiredRole: null, selectedKey: "10"},
    {label: "مدیریت دسترسی", value: "admins", url: "admins", requiredRole: "1.4", selectedKey: "4"},
]

const images = {
    overseers: NazeranLogo,
    reports: ReportLogo,
    admins: AdminLogo,
    complaints:ComplaintLogo,
    contents:ContentLogo,
    violation:ViolationLogo,
};

const Index = () => {

    const {roles = [], nationalNumber} = useTokenClaims()
    const dispatch = useDispatch()

    const { branchDetail, isLoading } = useSelector( state => state.branch.retrieve)

    React.useEffect( () => {
        if (nationalNumber){
            dispatch(getOverseerBranch(nationalNumber))
            return () => {
                dispatch(cleanBranchDetail())
            }
        }
    }, [])

    return (
        <div>
            <div>
                <span className="square-indicator mt-4">کارتابل کاربری </span>
            </div>
            {
                Boolean(Object.keys(branchDetail).length) && (
                    <div className="content">
                        <List 
                            header={
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span className="square-indicator">مشخصات شعبه :  {branchDetail?.name}  </span>
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
                                            <span>کد شعبه : </span><span>{branchDetail?.branchNumber}</span>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <span>نوع شعبه : </span><span>{branchDetail?.branchTypeTitle}</span>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={6} xl={6}>
                                            {/* <a className="link-color" onClick={ () => setBallotBoxModal(true)}> کدهای صندوق </a> */}
                                        </Col>
                                        {/* <BallotBoxModal ballotBoxModal={ballotBoxModal} setBallotBoxModal={setBallotBoxModal} data={branchDetail?.ballotBoxes} /> */}
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
                            </Spin>
                        </List>
                    </div>
                )
            }
            <div className="pt-3">
                { Boolean(roles.length) && (
                    <Row>
                        {list.map((item, i) => {
                            if (item.requiredRole){
                                if (roles.includes(item.requiredRole)){
                                    return (
                                        <Col key={i} className="p-2" xs={24} sm={12} md={12} lg={12} xl={8} onClick={ () => dispatch(ChangeActiveSelectedKey(item.selectedKey)) }>
                                            <NavLink to={"/" + item.url} className="w-100 d-block card-cartable">
                                                <Row>
                                                    <Col className="card-cartable-logo" span={12}>
                                                        <div
                                                            className="h-100 card-pic-cartable d-flex justify-content-center align-items-center py-4 px-3">
                                                            <img src={images[item.value]} style={{minWidth: "80px"}} alt=""/>
                                                        </div>
                                                    </Col>
                                                    <Col className="card-cartable-hover" span={12}>
                                                        <div
                                                            className="h-100 card-cartable-white p-4">
                                                            <span className="link-color">{item.label}</span>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </NavLink>
                                        </Col>
                                    )
                                }else{
                                    return null
                                }
                            }else {
                                return (
                                    <Col key={i} className="p-2" xs={24} sm={12} md={12} lg={12} xl={8} onClick={ () => dispatch(ChangeActiveSelectedKey(item.selectedKey)) }>
                                        <NavLink to={"/" + item.url} className="w-100 d-block card-cartable">
                                            <Row>
                                                <Col className="card-cartable-logo" span={12}>
                                                    <div
                                                        className="h-100 card-pic-cartable d-flex justify-content-center align-items-center py-4 px-3">
                                                        <img src={images[item.value]} style={{minWidth: "80px"}} alt=""/>
                                                    </div>
                                                </Col>
                                                <Col className="card-cartable-hover" span={12}>
                                                    <div
                                                        className="h-100 card-cartable-white p-4">
                                                        <span className="link-color">{item.label}</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </NavLink>
                                    </Col>
                                )
                            }
                        }
                        )}
                    </Row>
                )}
            </div>
        </div>
    );
};

export default Index;