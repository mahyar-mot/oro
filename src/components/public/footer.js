import React from 'react';
import { Menu, Dropdown, Typography, Row, Col, Button } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import { FaShippingFast } from 'react-icons/fa';
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
// import { logOut } from "../../redux/auth"
import { getUserProfile } from "../../redux/auth"


export default function FooterComponent(props) {

    const { isLoggedIn, nationalNumber, userProfile, apiHasCalled } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    const history = useHistory()
    const {className,setIsOpenResponsive}=props

    const [drawerVisible, setDrawerVisible] = React.useState(false);

    React.useEffect( () => {
        if (props.loginRequired){
            if (Object.keys(userProfile).length === 1 && !apiHasCalled ){
                setTimeout( () => dispatch(getUserProfile(nationalNumber)), 1000)
            }
        }
    },[])

    return (
        <>
            <Row justify="start">
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Typography.Title id='title-button' level={4}>
                        <a onClick={() => ('')}>LOGO</a>
                    </Typography.Title>
                </Col>
            </Row>
            <Row align="middle" className="pt-3">
                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                                    ‫و‬ ‫ﺳﺘﻮن‬ ‫در‬ ‫ﻣﺠﻠﻪ‬ ‫و‬ ‫روزﻧﺎﻣﻪ‬ ‫ﺑﻠﮑﻪ‬ ‫ﻣﺘﻮن‬ ‫و‬ ‫ﭼﺎﭘﮕﺮﻫﺎ‬ ‫اﺳﺖ‬ ‫ﮔﺮاﻓﯿﮏ‬ ‫ﻃﺮاﺣﺎن‬ ‫از‬ ‫اﺳﺘﻔﺎده‬ ‫ﺑﺎ‬ ‫و‬ ‫ﭼﺎپ‬ ‫ﺻﻨﻌﺖ‬ ‫از‬ ‫ﻧﺎﻣﻔﻬﻮم‬ ‫ﺳﺎدﮔﯽ‬ ‫ﺗﻮﻟﯿﺪ‬ ‫ﺑﺎ‬ ‫ﺳﺎﺧﺘﮕﯽ‬ ‫ﻣﺘﻦ‬ ‫اﯾﭙﺴﻮم‬ ‫ﻟﻮرم‬
                    ‫ﺑﺎﺷﺪ‬ ‫ﻣﯽ‬ ‫ﮐﺎرﺑﺮدی‬ ‫اﺑﺰارﻫﺎی‬ ‫ﺑﻬﺒﻮد‬ ‫ﻫﺪف‬ ‫ﺑﺎ‬ ‫ﻣﺘﻨﻮع‬ ‫ﮐﺎرﺑﺮدﻫﺎی‬ ‫و‬ ‫ﻧﯿﺎز‬ ‫ﻣﻮرد‬ ‫ﺗﮑﻨﻮﻟﻮژی‬ ‫ﻓﻌﻠﯽ‬ ‫اﯾﻂ‬ ‫ﺑﺮای‬ ‫و‬ ‫اﺳﺖ‬ ‫زم‬ ‫ﮐﻪ‬ ‫ﺳﻄﺮآﻧﭽﻨﺎن‬
                </Col>
                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                    <div className="d-flex justify-content-around mt-md-0 my-4">
                        <FaShippingFast size="5rem" className="text-royal" />


                        <AiOutlineSafetyCertificate size="5rem" className="text-royal" />


                        <BiSupport size="5rem" className="text-royal" />
                    </div>
                </Col>
            </Row>
        </>
    )
}
