import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Row, Col, Button} from 'antd';
import LandingSlider from './LandingSlider';


export default function Landing(props) {

    const dispatch = useDispatch();
    // const {isLoggedIn, nationalNumber, userProfile} = useSelector( state => state.auth );

    const history = useHistory()

    React.useEffect( () => {

    },[])

    return (
        <div className="w-100" style={{minHeight: "500px"}}>
            <div className="position-relative pb-4 mx-md-0 mx-3">
                <div className="landing-bg position-absolute bg-goldRoyal w-100 h-100"></div>
                <Row align="middle" className="pt-3">
                    <Col xl={10} lg={10} md={24} sm={24} xs={24} className="pr-md-5 mx-md-0 mx-2 pt-5">
                        <div className="pr-md-5 pr-0 pt-5">
                            <span className="divider"></span>
                            <h3 className="mt-3">این</h3>
                            <h1 className="text-royal">ظرافت  <span className="text-warning">و</span> زیبایی</h1>
                            <h3>حاصل تخصص و تجربه ماست!</h3>
                            <p className="py-5">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان 
                            </p>
                        </div>
                        <div className="pr-md-5 pr-0 pt-4 d-flex justify-content-between">
                            <Button size="large" className="border-royal py-1 flex-grow-1 text-royal ml-md-3 ml-0" >داستان اوروگالری</Button>
                            <Button size="large" className="py-1 flex-grow-1" type="primary">دنیای اورو رو کشف کن</Button>
                        </div>
                    </Col>
                    <Col xl={14} lg={14} md={24} sm={24} xs={24}>
                        <LandingSlider />
                    </Col>
                </Row>
            </div>
        </div>
    )
}
