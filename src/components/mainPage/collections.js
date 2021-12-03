import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Row, Col} from 'antd';
import Pic1 from "../../assets/icon/joeyy-lee-V14jqE4ZLWQ-unsplash.png";
import Pic2 from "../../assets/icon/sama-hosseini-mSaYvzTy4-0-unsplash.png";
import Pic3 from "../../assets/icon/logan-delaney-PRNrYj8MdRE-unsplash.png";


export default function Collections(props) {

    const dispatch = useDispatch();
    // const {isLoggedIn, nationalNumber, userProfile} = useSelector( state => state.auth );

    const history = useHistory()

    React.useEffect( () => {

    },[])

    return (
        <Row align="middle" gutter={16} justify="space-between" className="px-md-5 px-3 mx-md-5 mx-0">
            <Col className="my-4" xl={8} lg={8} md={24} sm={24} xs={24}>
                <div className="w-100 position-relative" >
                    <img src={Pic1} className="img-fluid w-100" />
                    <div className="position-absolute text-center rounded-top" style={{
                        bottom: "-20px",
                        right: "5%", 
                        width: "85%", 
                        height: "80px", 
                        backgroundColor: "rgba(255, 255, 255, .8)",
                        filter:"blur(10px)"
                    }}></div>
                    <h4 className="position-absolute text-center rounded-top" style={{
                        bottom: "-20px",
                        right: "5%", 
                        width: "85%", 
                        height: "60px",
                        color: "black"
                    }}>کالکشن صورفلکی</h4>
                </div>
            </Col>
            <Col className="my-4" xl={8} lg={8} md={24} sm={24} xs={24}>
                <div className="w-100 position-relative" >
                    <img src={Pic2} className="img-fluid w-100" />
                    <div className="position-absolute text-center rounded-top" style={{
                        bottom: "-20px",
                        right: "5%", 
                        width: "85%", 
                        height: "80px", 
                        backgroundColor: "rgba(255, 255, 255, .8)",
                        filter:"blur(10px)"
                    }}></div>
                    <h4 className="position-absolute text-center rounded-top" style={{
                        bottom: "-20px",
                        right: "5%", 
                        width: "85%", 
                        height: "60px",
                        color: "black"
                    }}>کالکشن حیوانات</h4>
                </div>
            </Col>
            <Col className="my-4" xl={8} lg={8} md={24} sm={24} xs={24}>
                <div className="w-100 position-relative" >
                    <img src={Pic3} className="img-fluid w-100" />
                    <div className="position-absolute text-center rounded-top" style={{
                        bottom: "-20px",
                        right: "5%", 
                        width: "85%", 
                        height: "80px", 
                        backgroundColor: "rgba(255, 255, 255, .8)",
                        filter:"blur(10px)"
                    }}></div>
                    <h4 className="position-absolute text-center rounded-top" style={{
                        bottom: "-20px",
                        right: "5%", 
                        width: "85%", 
                        height: "60px",
                        color: "black"
                    }}>گردنبند</h4>
                </div>
            </Col>
        </Row>
    )
}
