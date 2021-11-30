import React from 'react';
import { Row, Col, Button, Divider } from 'antd';
import {useHistory} from 'react-router-dom';
import { FaShippingFast, FaGooglePlay, FaYoutube, FaInstagram, FaTwitter, FaTelegram } from 'react-icons/fa';
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import LogoIcon from "../../assets/icon/logo2x.png"


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
                        <FaShippingFast size="5rem" className="text-royal" />
                        <AiOutlineSafetyCertificate size="5rem" className="text-royal" />
                        <BiSupport size="5rem" className="text-royal" />
                    </div>
                </Col>
            </Row>
            <Row align="middle" className="pt-3 text-center">
                <Col className="py-2" xl={{span: 3, order:1}} lg={{span: 3, order:1}} md={{span: 12, order:4}} sm={{span: 12, order:4}} xs={{span: 12, order:4}}>
                    1<FaShippingFast size="5rem" className="text-royal" />
                </Col>
                <Col className="py-2" xl={{span: 3, order:2}} lg={{span: 3, order:2}} md={{span: 12, order:5}} sm={{span: 12, order:5}} xs={{span: 12, order:5}}>
                    2<FaShippingFast size="5rem" className="text-royal" />
                </Col>
                <Col className="py-2" xl={{span: 10, order:3}} lg={{span: 10, order:3}} md={{span: 24, order:1}} sm={{span: 24, order:1}} xs={{span: 24, order:1}}>
                    dsadasffwak;lfaw;fjawf;awfj;awjfawl;fjwa;lfjwa;fjwal;fjwafl;awfl;wajfafl;wj
                </Col>
                <Col className="py-2" xl={{span: 4, order:4}} lg={{span: 4, order:4}} md={{span: 12, order:2}} sm={{span: 12, order:2}} xs={{span: 12, order:2}}>
                    3<FaShippingFast size="5rem" className="text-royal" />
                </Col>
                <Col className="py-2" xl={{span: 4, order:5}} lg={{span: 4, order:5}} md={{span: 12, order:3}} sm={{span: 12, order:3}} xs={{span: 12, order:3}}>
                    4<FaShippingFast size="5rem" className="text-royal" />
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
                    <div className="d-flex justify-content-between flex-wrap">
                        <Button size="large" className="px-3 border-rounded mb-2" type="primary" icon={<FaGooglePlay />}>
                            <small>نسخه</small>
                            دانلود از مارکت
                        </Button>
                        <Button size="large" className="px-3 border-rounded mb-2" type="primary" icon={<FaGooglePlay />}>
                            <small>نسخه</small>
                            دانلود از مارکت
                        </Button>
                        <Button size="large" className="px-3 border-rounded mb-2" type="primary" icon={<FaGooglePlay />}>
                            <small>نسخه</small>
                            دانلود از مارکت
                        </Button>
                        <Button size="large" className="px-3 border-rounded mb-2" type="primary" icon={<FaGooglePlay />}>
                            <small>نسخه</small>
                            دانلود از مارکت
                        </Button>
                        <Button size="large" className="px-3 border-rounded mb-2" type="primary" icon={<FaGooglePlay />}>
                            <small>نسخه</small>
                            دانلود از مارکت
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="mt-3" xl={8} lg={8} md={24} sm={24} xs={24}>
                    <div className="d-flex">
                        <FaInstagram size="2rem" className="text-royal mr-3 pointer" />
                        <FaGooglePlay size="2rem" className="text-royal mr-3 pointer" />
                        <FaTwitter size="2rem" className="text-royal mr-3 pointer" />
                        <FaYoutube size="2rem" className="text-royal mr-3 pointer" />
                        <FaTelegram size="2rem" className="text-royal mr-3 pointer" />
                    </div>
                </Col>
                <Col className="mt-3" xl={8} lg={8} md={0} sm={0} xs={0}></Col>
                <Col className="mt-3" xl={8} lg={8} md={24} sm={24} xs={24}>
                    <p>‫©‬ ‫‪۲۰۲۱‬‬ ‫اﺳﺖ‬ ‫ﻣﺤﻔﻮظ‬ ‫ﮔﺎﻟﺮی‬ ‫اورو‬ ‫ﺑﺮای‬ ‫ﺳﺎﯾﺖ‬ ‫وب‬ ‫اﯾﻦ‬ ‫ﻣﻌﻨﻮی‬ ‫و‬ ‫ﻣﺎدی‬ ‫ﺣﻘﻮق‬ ‫‪.‬ﮐﻠﯿﻪ‬</p>
                </Col>
            </Row>
        </div>
    )
}
