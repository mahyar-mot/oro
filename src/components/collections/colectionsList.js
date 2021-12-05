import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserProfile } from '../../redux/auth';
import { getBasicInfo } from '../../redux/basicInfos';
import { Row, Col, Button, Divider} from 'antd';
import Filters from './filters';

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Card from "../public/productCard";



export default function Collections(props) {

    const dispatch = useDispatch();
    const {isLoggedIn, nationalNumber, userProfile} = useSelector( state => state.auth );

    const history = useHistory()

    React.useEffect( () => {

    },[])

    return (
        <div className="text-right px-xl-5 px-0 mx-5">
            <Divider />
            <Row >
                <Col xl={6} lg={6} md={0} sm={0} xs={0}>
                    <Filters />
                </Col>
                <Col xl={18} lg={18} md={24} sm={24} xs={24}>

                </Col>
            </Row>
        </div>
    )
}

