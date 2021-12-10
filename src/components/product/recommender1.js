import React from 'react';
import { Divider, Input, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken, setTokenClaims, logoutUser } from "../../redux/auth"
import {Querys} from '../../utils/utils';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
// import userManager from '../../utils/userService';
import { useLocation, useHistory } from 'react-router';
import Slider from "./slider";


export default function Recommender1(props) {

    const dispatch = useDispatch();
    const params = useLocation()
    const history = useHistory()

    const { isLoggedIn } = useSelector( state => state.auth )

    const sliderTwoPrevRef = React.useRef(null);
    const sliderTwoNextRef = React.useRef(null);

    const [user, setUser] = React.useState(null);


    return (
        <div className="position-relative pt-3">
            <div className="mt-5 px-md-5 px-0">
                <div className="bg-gray position-absolute" style={{height: "570px", opacity: .2, width: "95%", top: "50px"}}></div>
            </div>
            <Row justify="space-between" className="my-4" >
                <Col spn={24} className="my-4 mx-5 px-md-5 px-0 w-100">
                   <div className="d-flex justify-content-between">
                    <h5>محصولات مرتبط</h5>
                        <h4 className="text-goldRoyal text-left pointer">
                            مشاهده محصولات
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
    )
}

