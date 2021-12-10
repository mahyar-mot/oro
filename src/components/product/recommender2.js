import React from 'react';
import { Divider, Input, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken, setTokenClaims, logoutUser } from "../../redux/auth"
import {Querys} from '../../utils/utils';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
// import userManager from '../../utils/userService';
import { useLocation, useHistory } from 'react-router';
import Slider from "./slider";


export default function Recommender2(props) {

    const dispatch = useDispatch();
    const params = useLocation()
    const history = useHistory()

    const { isLoggedIn } = useSelector( state => state.auth )

    const sliderOnePrevRef = React.useRef(null);
    const sliderOneNextRef = React.useRef(null);
    const sliderTwoPrevRef = React.useRef(null);
    const sliderTwoNextRef = React.useRef(null);

    const [user, setUser] = React.useState(null);


    return (
        <div className="my-5">
            <div className="bg-lightGray">
                <Row justify="space-between" className="my-4" >
                    <Col spn={24} className="my-4 mx-5 px-md-5 px-0 w-100">
                    <div className="d-flex justify-content-between">
                        <h5>خریداران این محصول محصولات زیر را هم خریده‌اند</h5>
                        <h4 className="text-goldRoyal text-left pointer">
                            مشاهده بیشتر
                            <BsArrowLeft size="2rem" />
                        </h4>
                    </div>
                    </Col>
                    <Col spn={24} className="my-4">
                        <Slider
                            sliderPrevRef={sliderTwoPrevRef}
                            sliderNextRef={sliderTwoNextRef}
                        />
                    </Col>
                    <Col span={24} className="my-4">
                        <div className="d-flex mx-5 px-md-5 px-0 mx-5">
                            <div ref={sliderTwoNextRef} ><BsArrowRight className="pointer ml-2 text-gray" size="3rem" /></div>
                            <div ref={sliderTwoPrevRef} ><BsArrowLeft className="pointer mr-2 text-gray" size="3rem" /></div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="d-flex justify-content-between mt-5 px-md-5 px-0 mx-5">
                <h5>محصولات پرفروش</h5>
                <h4 className="text-goldRoyal text-left pointer">
                    مشاهده بیشتر
                    <BsArrowLeft size="2rem" />
                </h4>
            </div>
            <div className="position-relative pl-xl-5 pl-0 py-xl-0">
                <div className="position-absolute w-75 bg-gray" style={{height: "220px", opacity: ".2", left: "10%", top: "80px"}}></div>
                <Row align="middle" justify="space-between"  className="pl-md-5 pl-2" >
                    <Col xl={19} lg={19} md={22} sm={22} xs={22} className="my-4 pl-md-0 pl-5">
                        <Slider
                            sliderPrevRef={sliderOnePrevRef}
                            sliderNextRef={sliderOneNextRef}
                        />
                    </Col>
                    <Col xl={5} lg={5} md={24} sm={24} xs={24} className="my-4">
                       <div className="d-flex justify-content-center align-items-center">
                            <div ref={sliderOneNextRef} ><BsArrowRight className="pointer ml-2 text-gray" size="3rem" /></div>
                            <div ref={sliderOnePrevRef} ><BsArrowLeft className="pointer mr-2 text-gray" size="3rem" /></div>
                       </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

