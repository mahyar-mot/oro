import React from 'react';
import { Divider, Input, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken, setTokenClaims, logoutUser } from "../../redux/auth"
import {Querys} from '../../utils/utils';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
// import userManager from '../../utils/userService';
import { useLocation, useHistory } from 'react-router';
import Slider from "./slider";


export default function ProductDetails(props) {

    const dispatch = useDispatch();
    const params = useLocation()
    const history = useHistory()

    const { isLoggedIn } = useSelector( state => state.auth )

    const sliderTwoPrevRef = React.useRef(null);
    const sliderTwoNextRef = React.useRef(null);

    const [user, setUser] = React.useState(null);


    return (
        <div className="my-5">
            <Row justify="space-between" className="my-4" >

            </Row>
        </div>
    )
}

