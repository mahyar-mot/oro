import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Row, Col, Button} from 'antd';
import Pic from "../../assets/icon/02_NightMoon_Campaign-Page_Desktop.png";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";


export default function LandingSlider(props) {

    const dispatch = useDispatch();
    // const {isLoggedIn, nationalNumber, userProfile} = useSelector( state => state.auth );

    const history = useHistory()

    React.useEffect( () => {

    },[])

    return (
        <div className="w-100 pr-3">
            <img src={Pic} className="img-fluid pt-lg-0 py-5" />
            <h4>ست گوشواره و گردنبند</h4>
            <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
            </p>
            <div className="d-flex justify-content-between">
                <div className="text-goldRoyal pointer">مشاهده محصول <BsArrowLeft size="2rem" /></div>
                <div className="ml-md-5 ml-0 pl-md-5 pl-0">
                    <BsArrowRight className="pointer ml-2 text-gray" size="3rem" />
                    <BsArrowLeft className="pointer mr-2 text-gray" size="3rem" />
                </div>
            </div>
        </div>
    )
}
