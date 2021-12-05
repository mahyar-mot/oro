import  React  from "react"
import { Row, Col, Button, Input } from "antd";


export default () => {

    return (
        <div className="my-5 p-4 border text-right mx-md-5 mx-0" style={{borderRadius: "15px", backgroundColor: "#F3F3F3"}}>
            <Row >
                <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                    <span className="divider-royal"></span>
                    <h4 className="mt-2">در کنار شما هستیم</h4>
                    <p className="text-dark">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                </Col>
            </Row>
            <Row justify="space-between" >
                <Col className="my-3" xl={5} lg={5} md={24} sm={24} xs={24} >
                    <Input placeholder="نام و نام‌خانوادگی" />
                </Col>
                <Col className="my-3" xl={5} lg={5} md={24} sm={24} xs={24} >
                    <Input placeholder="شماره تماس" />
                </Col>
                <Col className="my-3" xl={5} lg={5} md={24} sm={24} xs={24} >
                    <Input placeholder="ایمیل" />
                </Col>
                <Col className="my-3" xl={5} lg={5} md={24} sm={24} xs={24} >
                    <Button size="large" className="px-3" type="primary"> ثبت مشاوره رایگان</Button>
                </Col>
            </Row>
        </div>
    );
};
