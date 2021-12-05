import  React  from "react"
import { Row, Col } from "antd";
import HomepageSupply from "../../assets/icon/Homepage_Resupply.png";


export default () => {

    return (
        <div className="my-5">
            <div className="pr-md-5 pr-0 mx-5 text-right">
                <span className="divider"></span>
                <h4 className="pt-2">مجله اورو</h4>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است            
            </div>
            <div className="mx-md-5 mx-0">
                <Row align="middle" justify="center" className="my-4" >
                    <Col xl={12} lg={12} md={24} sm={24} xs={24} className="my-4">
                        <div className="image-content-big">
                            <img src={HomepageSupply} className="w-100 img-fluid" />
                            <div className="right-tag"> right-tag</div>
                            <div className="left-tag"> left-tag</div>
                            <div className="bottom-content"> bottom-content</div>
                        </div>
                    </Col>
                    <Col xl={12} lg={12} md={24} sm={24} xs={24} className="my-4">

                    </Col>
                </Row>
                <Row align="middle" justify="center" className="my-4" >
                    <Col xl={12} lg={12} md={0} sm={0} xs={0} className="my-4">
                        <div className="image-content">
                            <img src={HomepageSupply} className="w-100 img-fluid" />
                            <div className="right-tag"> right-tag</div>
                            <div className="left-tag"> left-tag</div>
                            <div className="bottom-content"> bottom-content</div>
                        </div>
                    </Col>
                    <Col xl={12} lg={12} md={0} sm={0} xs={0} className="my-4">
                        <div className="image-content">
                            <img src={HomepageSupply} className="w-100 img-fluid" />
                            <div className="right-tag"> right-tag</div>
                            <div className="left-tag"> left-tag</div>
                            <div className="bottom-content"> bottom-content</div>
                        </div>
                    </Col>
                </Row>
                <Row align="middle" justify="center" className="my-4" >
                    <Col xl={12} lg={12} md={0} sm={0} xs={0} className="my-4">
                        <div className="image-content">
                            <img src={HomepageSupply} className="w-100 img-fluid" />
                            <div className="right-tag"> right-tag</div>
                            <div className="left-tag"> left-tag</div>
                            <div className="bottom-content"> bottom-content</div>
                        </div>
                    </Col>
                    <Col xl={12} lg={12} md={0} sm={0} xs={0} className="my-4">
                        <div className="image-content">
                            <img src={HomepageSupply} className="w-100 img-fluid" />
                            <div className="right-tag"> right-tag</div>
                            <div className="left-tag"> left-tag</div>
                            <div className="bottom-content"> bottom-content</div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
