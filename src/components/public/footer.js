import React from 'react';
import { Row, Col, Button, Divider } from 'antd';
import {useHistory} from 'react-router-dom';
import { FaShippingFast, FaGooglePlay, FaYoutube, FaInstagram, FaTwitter, FaTelegram, FaApple } from 'react-icons/fa';
import LogoIcon from "../../assets/icon/logo2x.png"
import { ReactComponent as FastDelivery } from "../../assets/icon/_x38__Fast_delivery.svg";
import { ReactComponent as CustomerService } from "../../assets/icon/_x33_7_Customer_service.svg";
import { ReactComponent as Sheild } from "../../assets/icon/_x33_4_Shield.svg";
import { ReactComponent as PinLocation } from "../../assets/icon/pin (1).svg";
import { ReactComponent as PhoneCall } from "../../assets/icon/phone-call.svg";
import { ReactComponent as Aparat } from "../../assets/icon/aparat-gray.svg";
import { ReactComponent as Myket } from "../../assets/icon/Group 2887.svg";
import { ReactComponent as Bazaar } from "../../assets/icon/Group 2879.svg";
import { ReactComponent as SibApp } from "../../assets/icon/Group 8.svg";



export default function FooterComponent(props) {

    const history = useHistory()

    return (
        <div className="px-0 px-md-5 pb-4">
            <Row justify="start">
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <img src={LogoIcon} alt="logo-footer"/>
                </Col>
            </Row>
            <Row align="middle" className="pt-3">
                <Col xl={12} lg={12} md={24} sm={24} xs={24} className="pl-2 pr-1">
                                    ‫و‬ ‫ﺳﺘﻮن‬ ‫در‬ ‫ﻣﺠﻠﻪ‬ ‫و‬ ‫روزﻧﺎﻣﻪ‬ ‫ﺑﻠﮑﻪ‬ ‫ﻣﺘﻮن‬ ‫و‬ ‫ﭼﺎﭘﮕﺮﻫﺎ‬ ‫اﺳﺖ‬ ‫ﮔﺮاﻓﯿﮏ‬ ‫ﻃﺮاﺣﺎن‬ ‫از‬ ‫اﺳﺘﻔﺎده‬ ‫ﺑﺎ‬ ‫و‬ ‫ﭼﺎپ‬ ‫ﺻﻨﻌﺖ‬ ‫از‬ ‫ﻧﺎﻣﻔﻬﻮم‬ ‫ﺳﺎدﮔﯽ‬ ‫ﺗﻮﻟﯿﺪ‬ ‫ﺑﺎ‬ ‫ﺳﺎﺧﺘﮕﯽ‬ ‫ﻣﺘﻦ‬ ‫اﯾﭙﺴﻮم‬ ‫ﻟﻮرم‬
                    ‫ﺑﺎﺷﺪ‬ ‫ﻣﯽ‬ ‫ﮐﺎرﺑﺮدی‬ ‫اﺑﺰارﻫﺎی‬ ‫ﺑﻬﺒﻮد‬ ‫ﻫﺪف‬ ‫ﺑﺎ‬ ‫ﻣﺘﻨﻮع‬ ‫ﮐﺎرﺑﺮدﻫﺎی‬ ‫و‬ ‫ﻧﯿﺎز‬ ‫ﻣﻮرد‬ ‫ﺗﮑﻨﻮﻟﻮژی‬ ‫ﻓﻌﻠﯽ‬ ‫اﯾﻂ‬ ‫ﺑﺮای‬ ‫و‬ ‫اﺳﺖ‬ ‫زم‬ ‫ﮐﻪ‬ ‫ﺳﻄﺮآﻧﭽﻨﺎن‬
                </Col>
                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                    <div className="d-flex justify-content-around mt-md-0 my-4 align-items-center">
                        <div className="d-flex flex-column align-items-center">
                            <FastDelivery />
                            <span className="text-royal mt-1">امکان تحویل اکسپرس</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <Sheild  />
                            <span className="text-royal mt-1">ضمانت اصالت کالا</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <CustomerService  />
                            <span className="text-royal mt-1">پشتیبانی24/7</span>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row align="middle" className="text-center">
                <Col className="py-3" xl={{span: 3, order:1}} lg={{span: 3, order:1}} md={{span: 12, order:4}} sm={{span: 12, order:4}} xs={{span: 12, order:4}}>
                    1<FaShippingFast size="5rem" className="text-royal" />
                </Col>
                <Col className="py-3" xl={{span: 3, order:2}} lg={{span: 3, order:2}} md={{span: 12, order:5}} sm={{span: 12, order:5}} xs={{span: 12, order:5}}>
                    2<FaShippingFast size="5rem" className="text-royal" />
                </Col>
                <Col className="py-3" xl={{span: 10, order:3}} lg={{span: 10, order:3}} md={{span: 24, order:1}} sm={{span: 24, order:1}} xs={{span: 24, order:1}}>
                    <div className="d-flex justify-content-center">
                        <PinLocation />
                        <div className="text-right mr-2">
                            <small className="text-warning">آدرس شرکت</small>
                            <div>تهران بهشتی وزرا بن‌بست زرین پلاک۱۲ طبقه سوم</div>
                        </div>
                    </div>
                </Col>
                <Col className="py-3" xl={{span: 4, order:4}} lg={{span: 4, order:4}} md={{span: 12, order:2}} sm={{span: 12, order:2}} xs={{span: 12, order:2}}>
                    <div className="d-flex flex-column align-items-center">
                        <PhoneCall size="5rem" className="text-royal" />
                        <small className="text-warning">پشتیبانی خدمات</small>
                        <span>021-72857</span>
                    </div>
                </Col>
                <Col className="py-3" xl={{span: 4, order:5}} lg={{span: 4, order:5}} md={{span: 12, order:3}} sm={{span: 12, order:3}} xs={{span: 12, order:3}}>
                    <div className="d-flex flex-column align-items-center">
                        <PhoneCall size="5rem" className="text-royal" />
                        <small className="text-warning">مشاوره خرید</small>
                        <span>021-72857</span>
                    </div>
                </Col>
            </Row>
            <Divider />
            <Row className="pt-3">
                <Col xl={5} lg={5} md={24} sm={24} xs={24}>
                    <h6 className="text-royal mb-2">
                        دانلود اپلیکیشن‌ها
                    </h6>
                </Col>
                <Col xl={19} lg={19} md={24} sm={24} xs={24}>
                    <div className="d-flex justify-content-md-end justify-content-start flex-wrap">
                        <Button size="large" style={{minWidth: "130px"}} className="px-4 border-rounded mb-2 mx-3 btn btn-oldRoyal text-white" icon={<SibApp />}>
                            <small style={{fontSize: "10px"}}>دریافت از</small>
                            <span>سیب‌اپ</span>
                        </Button>
                        <Button size="large" style={{minWidth: "130px"}} className="px-4 border-rounded mb-2 mx-3 btn btn-oldRoyal text-white" icon={<Bazaar />}>
                            <small style={{fontSize: "10px"}}>دریافت از</small>
                            <span>بازار</span>
                        </Button>
                        <Button size="large" style={{minWidth: "130px"}} className="px-4 border-rounded mb-2 mx-3 btn btn-oldRoyal text-white" icon={<FaGooglePlay size="1.5rem" />}>
                            <small style={{fontSize: "10px"}}>دریافت از</small>
                            <span>گوگل‌پلی</span>
                        </Button>
                        <Button size="large" style={{minWidth: "130px"}} className="px-4 border-rounded mb-2 mx-3 btn btn-oldRoyal text-white" icon={<FaApple size="1.5rem" />}>
                            <small style={{fontSize: "10px"}}>نسخه</small>
                            <span>وب اپلیکیشن</span>
                        </Button>
                        <Button size="large" style={{minWidth: "130px"}} className="px-4 border-rounded mb-2 mx-3 btn btn-oldRoyal text-white" icon={<Myket />}>
                            <small style={{fontSize: "10px"}}>دریافت از</small>
                            <span>مایکت</span>
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="mt-3" xl={8} lg={8} md={24} sm={24} xs={24}>
                    <div className="d-flex justify-content-md-start justify-content-center">
                        <FaInstagram size="2rem" className="text-oldRoyal oldRoyal-hover mr-3 pointer" />
                        <Aparat className="mr-3 pointer svg-oldRoyal-hover" />
                        <FaTwitter size="2rem" className="text-oldRoyal oldRoyal-hover mr-3 pointer" />
                        <FaYoutube size="2rem" className="text-oldRoyal oldRoyal-hover mr-3 pointer" />
                        <FaTelegram size="2rem" className="text-oldRoyal oldRoyal-hover mr-3 pointer" />
                    </div>
                </Col>
                <Col className="mt-3" xl={8} lg={8} md={0} sm={0} xs={0}></Col>
                <Col className="mt-3" xl={8} lg={8} md={24} sm={24} xs={24}>
                    <p>کلیه حقوق مادی و معنوی این وب سایت برای اوروگالری محفوظ است ۲۰۲۱</p>
                </Col>
            </Row>
        </div>
    )
}
