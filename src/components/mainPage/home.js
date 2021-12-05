import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserProfile } from '../../redux/auth';
import { getBasicInfo } from '../../redux/basicInfos';
import Landing from "./landing";
import Collections from "./collections";
import { Row, Col, Button} from 'antd';
import Slider from "./slider";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Card from "../public/productCard";
import HomepageSupply from "../../assets/icon/Homepage_Resupply.png";
import Comments from "./comments";
import Magazine from "./magazine";


export default function Home(props) {

    const dispatch = useDispatch();
    const {isLoggedIn, nationalNumber, userProfile} = useSelector( state => state.auth );

    const sliderOnePrevRef = React.useRef(null);
    const sliderOneNextRef = React.useRef(null);
    const sliderTwoPrevRef = React.useRef(null);
    const sliderTwoNextRef = React.useRef(null);

    const history = useHistory()

    React.useEffect( () => {
        if (isLoggedIn){
            dispatch(getUserProfile(nationalNumber))
            dispatch(getBasicInfo())
        }
    },[])

    React.useEffect( () => {
        if (Object.keys(userProfile).length){
            switch (userProfile.stateType) {
                case 1:
                    setTimeout( () => history.push("/waitinguser"), 1000)
                    break;
                case 2:
                    if (userProfile.profileStatusDto.length && userProfile.profileStatusDto[0].statusType === 5){
                        setTimeout( () => history.push("/cartable"), 1000)
                    }else if (userProfile.profileStatusDto.length > 1 && userProfile.profileStatusDto[1].statusType === 5){
                        setTimeout( () => history.push("/cartable"), 1000)
                    }
                    else{
                        setTimeout( () => history.push("/waitinguser"), 1000)
                    }
                    break;
                case 3:
                    history.push("/notfound")
                    break;
                // case 4:
                //     history.push("/waitinguser")
                //     break;
                // case 5:
                //     setTimeout( () => history.push("/overseers"), 1000)
                //     break;
                // case 6:
                //     history.push("/waitinguser")
                //     break;
                default:
                    setTimeout( () => history.push("/"), 1000)
                    break;
            }
        }
    },[userProfile])

    return (
        <>
            <div className="text-right p-0 px-xl-5 px-0 py-xl-0">
                <Landing />
                <Collections />
                <Row align="middle" justify="space-between"  className="px-md-5 px-3 my-4" >
                    <Col xl={8} lg={8} md={24} sm={24} xs={24} className="pr-md-5 pr-3 my-4">
                        <div>
                            <span className="line-alt"></span>
                            <h2 className="text-royal pt-3">دنیایی از زیبایی منتظر کشف توست!</h2>
                        </div>
                    </Col>
                    <Col xl={8} lg={8} md={24} sm={24} xs={24} className="pl-md-5 pl-3 my-4">
                        <h4 className="text-goldRoyal text-left pointer">
                            مشاهده محصولات
                            <BsArrowLeft size="2rem" />
                        </h4>
                    </Col>
                </Row>
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
            <div className="my-5 py-3">
                <div className="w-100 position-relative">
                    <div className="white-box text-right pt-4 pr-4">
                        <h2 className="text-royal">درخشان‌تر از همیشه</h2>
                        <h5 className="text-gray">نیم‌ست‌های خاص اورو</h5>
                        <h4 className="text-goldRoyal pointer">
                            مشاهده محصول
                            <BsArrowLeft size="2rem" />
                        </h4>
                    </div>
                    <img className="img-fluid w-100" src={HomepageSupply} />
                </div>
            </div>
            <div className="d-flex justify-content-end align-items-center flex-column" style={{marginTop: "130px", marginBottom: "100px"}}>
                <h1 className="text-royal">نگین دستان شما اینجاست</h1>
                <h4 className="text-goldRoyal pointer">
                    دنیای خاص انگشترهای اورو
                    <BsArrowLeft size="2rem" />
                </h4>
            </div>
            <Row align="middle" justify="center" className="my-4" >
                <Col spn={24} className="my-4">
                    <Slider
                        sliderPrevRef={sliderTwoPrevRef}
                        sliderNextRef={sliderTwoNextRef}
                    />
                </Col>
                <Col span={24} className="my-4">
                    <div className="d-flex justify-content-center align-items-center">
                        <div ref={sliderTwoNextRef} ><BsArrowRight className="pointer ml-2 text-gray" size="3rem" /></div>
                        <div ref={sliderTwoPrevRef} ><BsArrowLeft className="pointer mr-2 text-gray" size="3rem" /></div>
                    </div>
                </Col>
            </Row>
            <Comments />
            <Magazine />
        </>
    )
}

