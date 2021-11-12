import React, {useEffect, useState} from 'react';
import {Button, Col, Row, Spin, Tooltip} from "antd";
import logo from "../../assets/icons/pic/PagePending.svg";
import ImageIcon from "../../assets/icons/image-icon.svg";
import ReportIcon from "../../assets/icons/report_problem_green.svg";
import ModalSlider from "./modalSlider";
import {getPicturesList} from "../../redux/picturize/picturesList"
import {useDispatch, useSelector} from "react-redux";
import {useTokenClaims} from "../public/hooks";
import {DoubleLeftOutlined, LeftOutlined} from "@ant-design/icons";

const ListTable = () => {

    const dispatch = useDispatch();
    const {countryDivisionCode} = useTokenClaims();
    const {picturesList,isLoading} = useSelector(state => state.picturize.picturesList);
    const [back, setBack] = useState("")

    useEffect(() => {
        if (countryDivisionCode) {
            setBack(countryDivisionCode)
            getData(countryDivisionCode)
        }
    }, [countryDivisionCode])

    const getData = (countryDev = countryDivisionCode) => {
        setBack(countryDev)
        dispatch(getPicturesList(countryDev))
    }

    return (
        <div>
            <Spin spinning={isLoading}>
            <div className="text-left d-flex justify-content-end mt-2 mb-2">
                <Tooltip placement="top" title={"برگشت به صفحه نخست"}>
                    <Button className="d-flex align-items-center ml-2"
                            onClick={() => getData(countryDivisionCode)}><DoubleLeftOutlined/></Button>
                </Tooltip>
                <Tooltip placement="top" title={"برگشت به قبلی"}>
                    <Button className="d-flex align-items-center" onClick={() => {
                        let t = ""
                        t = (back === countryDivisionCode ? back : back?.slice(0, back?.lastIndexOf(".")))
                        if(t){
                            setBack(t)
                            getData(t)
                        }

                    }}><LeftOutlined/></Button>
                </Tooltip>
            </div>
            <Row>
                {
                    picturesList.map((item, i) => <Col className="px-2 mb-3 box-picturize" xs={24} sm={12} md={12}
                                                       lg={8} xl={6}>
                        <div className="head-picturize p-2">
                            <span>{item?.text}</span>
                        </div>
                        <div className="card-picturize" style={{
                            backgroundImage: `url(${item?.lastFileUrl})`
                        }}>
                            <div className="body-picturize">
                                <div className="text-center">
                                    <ModalSlider initialCDC={item?.cdc}/>

                                    <Button type="primary" className="mx-1 mb-1" onClick={() => getData(item?.cdc)}>جزییات
                                        استان ها</Button>
                                </div>
                            </div>
                        </div>
                        <div className="footer-picturize p-2">
                                    <span className="">
                                        <span>
                                        <img src={ImageIcon} style={{maxWidth: "17px"}} className="img-fluid" alt=""/>
                                        </span>
                                        <span className="px-1">{item?.files}</span>
                                        <span>عکس</span>
                                    </span>
                            <span className="border-right mx-2"/>
                            <span>
                                        <span>
                                                 <img src={ReportIcon} style={{maxWidth: "17px"}} className="img-fluid"
                                                      alt=""/>
                                        </span>
                                        <span className="px-1">{item?.violation}</span>
                                        <span>تخلف</span>
                                    </span>
                        </div>
                    </Col>)
                }
            </Row>
            </Spin>
        </div>
    );
};

export default ListTable;