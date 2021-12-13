import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserProfile } from '../../redux/auth';
import { getBasicInfo } from '../../redux/basicInfos';
import { Row, Col, Collapse, Divider} from 'antd';
// import Filters from './filters';
// import ProductsList from "./productsList";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import ProfileNavigation from './profileNavigation';


export default function ProfileSection(props) {

    const dispatch = useDispatch();
    const {isLoggedIn, nationalNumber, userProfile} = useSelector( state => state.auth );

    const history = useHistory()

    React.useEffect( () => {

    },[])

    return (
        <div className="px-xl-5 px-0 mx-5">
            <Divider />
            <Row  className="mt-5">
                <Col xl={5} lg={5} md={24} sm={24} xs={24}>
                    <ProfileNavigation />
                </Col>
                <Col className="mt-lg-0 mt-4" xl={19} lg={19} md={24} sm={24} xs={24}>
                    {props.children}
                </Col>
            </Row>
        </div>
    )
}

