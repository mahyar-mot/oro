import  React  from "react"
import { Row, Col, Comment, Avatar } from "antd";
import FirstPic from "../../assets/icon/bae9798d-7980-4b30-8512-6977173e38bc1635332259431ZaveriPearlsGold-PlatedWhiteKundanPearlsStudedMultistrandCho1.webp";
import SecondPic from "../../assets/icon/women-jewelry-10-1024x691.jpg";
import ThirdPic from "../../assets/icon/c-users-302375-downloads-servicenation-org-png.png";
import FourthPic from "../../assets/icon/women-jewelry-15.jpg";
import FifthPic from "../../assets/icon/Cosmic_1440x1080px.webp";


export default () => {

    return (
        <div className="my-5">
            <div className="pr-md-5 pr-0 mx-5 text-right">
                <span className="divider"></span>
                <h4 className="pt-2">مجله اورو</h4>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است            
            </div>
            <div className="mx-md-5 mx-0 px-5">
                <Row  className="my-4" >
                    <Col xl={12} lg={12} md={24} sm={24} xs={24} className="my-4">
                        <div className="image-content-big">
                            <img src={FirstPic} className="w-100 img-fluid" />
                            <div className="right-tag"> طراحی</div>
                            {/* <div className="left-tag"> left-tag</div>
                            <div className="bottom-content"> bottom-content</div> */}
                        </div>
                    </Col>
                    <Col xl={12} lg={12} md={24} sm={24} xs={24} className="my-4">
                        <div className="d-flex flex-column justify-content-between text-right p-3">
                            <div className="pt-1"> ویدئو</div>
                            <h5 className="pt-2">طلا و جواهرات جذاب‌ترین زن هالیوود</h5>
                            <h5 className="pb-3">اسکارلت یوهانسون</h5>
                            <div className="py-2"> منتشر شده در <small>30 فروردین</small></div>
                            <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد</p>
                            <Comment
                                className="pt-3"
                                author={<a>Han Solo</a>}
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                                content={
                                    <small>متخصص و مشاور</small>
                                }
                            />
                        </div>
                    </Col>
                </Row>
                <Row  className="my-4" >
                    <Col xl={12} lg={12} md={0} sm={0} xs={0} className="my-4">
                        <div className="image-content">
                            <img src={SecondPic} className="w-100 img-fluid" />
                            <div className="right-tag text-goldRoyal"> طراحی</div>
                            <div className="left-tag"> ویدئو</div>
                            <div className="bottom-content"> 
                                <Comment
                                    author={<a className="text-white">Han Solo</a>}
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                                    content={
                                        <p className="text-white">
                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است 
                                        </p>
                                    }
                                    datetime={
                                        <span className="text-white">30 فروردین</span>
                                    }
                                />
                            </div>
                        </div>
                    </Col>
                    <Col xl={12} lg={12} md={0} sm={0} xs={0} className="my-4">
                        <div className="image-content">
                            <img src={ThirdPic} className="w-100 img-fluid" />
                            <div className="right-tag text-success"> سبک‌ زندگی</div>
                            <div className="left-tag"> پادکست</div>
                            <div className="bottom-content"> 
                                <Comment
                                    author={<a className="text-white">Han Solo</a>}
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                                    content={
                                        <p className="text-white">
                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است 
                                        </p>
                                    }
                                    datetime={
                                        <span className="text-white">30 فروردین</span>
                                    }
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row  className="my-4" >
                    <Col xl={12} lg={12} md={0} sm={0} xs={0} className="my-4">
                        <div className="image-content">
                            <img src={FourthPic} className="w-100 img-fluid" />
                            <div className="right-tag text-goldRoyal"> طراحی</div>
                            <div className="left-tag"> ویدئو</div>
                            <div className="bottom-content"> 
                                <Comment
                                    author={<a className="text-white">Han Solo</a>}
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                                    content={
                                        <p className="text-white">
                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است 
                                        </p>
                                    }
                                    datetime={
                                        <span className="text-white">30 فروردین</span>
                                    }
                                />
                            </div>
                        </div>
                    </Col>
                    <Col xl={12} lg={12} md={0} sm={0} xs={0} className="my-4">
                        <div className="image-content">
                            <img src={FifthPic} className="w-100 img-fluid" />
                            <div className="right-tag text-success"> سبک زندگی</div>
                            <div className="left-tag"> پادکست</div>
                            <div className="bottom-content"> 
                                <Comment
                                    author={<a className="text-white">Han Solo</a>}
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                                    content={
                                        <p className="text-white">
                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است 
                                        </p>
                                    }
                                    datetime={
                                        <span className="text-white">30 فروردین</span>
                                    }
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
