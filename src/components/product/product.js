import React from 'react';
import { Divider, Input, Button, Row, Collapse, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken, setTokenClaims, logoutUser } from "../../redux/auth"
import {Querys} from '../../utils/utils';
import { FaUserCircle } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
// import userManager from '../../utils/userService';
import { useLocation, useHistory } from 'react-router';
import ProductiInfo from './productInfo';
import Recommender1 from './recommender1';
import ProductDetails from './productDetails';
import Recommender2 from './recommender2';


export default function Product(props) {

    const dispatch = useDispatch();
    const params = useLocation()
    const history = useHistory()

    const { isLoggedIn } = useSelector( state => state.auth )

    const [user, setUser] = React.useState(null);


    return (
        <div className="text-right">
            <div className="px-md-5 px-0 mx-5">
                <Divider />
            </div>
            <ProductiInfo />
            <Recommender1 />
            <ProductDetails />
            <Recommender2 />
            <div className="mb-5 px-xl-5 px-0 mx-5">
                <Row>
                    <Col xl={12} lg={12} md={24} sm={24} xs={24} className="mt-5">
                        <span className="divider"></span>
                        <h4 className="mt-3">سوالات متداول</h4>
                        <Collapse className="bg-white mt-2 w-75 " bordered={false} defaultActiveKey={['1']} expandIconPosition="right">
                            <Collapse.Panel header=" شرایط خرید و بازگرداندن کالا برای کالاها چگونه است 1" key="1">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                            </Collapse.Panel>
                            <Collapse.Panel header="شرایط خرید و بازگرداندن کالا برای کالاها چگونه است 2" key="2">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                            </Collapse.Panel>
                            <Collapse.Panel header="شرایط خرید و بازگرداندن کالا برای کالاها چگونه است 3" key="3">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                            </Collapse.Panel>
                            <Collapse.Panel header="شرایط خرید و بازگرداندن کالا برای کالاها چگونه است 4" key="4">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                            </Collapse.Panel>
                            <Collapse.Panel header="شرایط خرید و بازگرداندن کالا برای کالاها چگونه است 5" key="5">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                            </Collapse.Panel>
                            <Collapse.Panel header="شرایط خرید و بازگرداندن کالا برای کالاها چگونه است 6" key="6">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                            </Collapse.Panel>
                        </Collapse>
                        <h5 className="text-goldRoyal pointer mt-3">مشاهده بیشتر <BsArrowLeft /></h5>
                    </Col>
                    <Col xl={12} lg={12} md={24} sm={24} xs={24} className="mt-5">
                        <span className="divider"></span>
                        <h4 className="mt-3">محصولات اوروگالری</h4>
                        <p className="mt-2">
                             لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        </p>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

