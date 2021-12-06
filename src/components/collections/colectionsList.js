import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserProfile } from '../../redux/auth';
import { getBasicInfo } from '../../redux/basicInfos';
import { Row, Col, Collapse, Divider} from 'antd';
import Filters from './filters';
import ProductsList from "./productsList";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";


export default function Collections(props) {

    const dispatch = useDispatch();
    const {isLoggedIn, nationalNumber, userProfile} = useSelector( state => state.auth );

    const history = useHistory()

    React.useEffect( () => {

    },[])

    return (
        <div className="text-right px-xl-5 px-0 mx-5">
            <Divider />
            <Row >
                <Col xl={5} lg={5} md={0} sm={0} xs={0}>
                    <Filters />
                </Col>
                <Col xl={19} lg={19} md={24} sm={24} xs={24}>
                    <ProductsList />
                </Col>
            </Row>
            <div className="mb-5">
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

