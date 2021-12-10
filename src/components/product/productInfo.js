import React from 'react';
import { Select, Input, Button, Image, Row, Col, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken, setTokenClaims, logoutUser } from "../../redux/auth"
import { StarFilled } from "@ant-design/icons";
import {Querys} from '../../utils/utils';
import { FaMedal } from "react-icons/fa";
// import userManager from '../../utils/userService';
import { useLocation, useHistory } from 'react-router';


export default function Gallery(props) {

    const dispatch = useDispatch();
    const params = useLocation()
    const history = useHistory()

    const { isLoggedIn } = useSelector( state => state.auth )

    const [user, setUser] = React.useState(null);


    return (
        <div className="px-5 mt-3 mb-5">
            <Row className="px-xl-5 px-0">
                <Col className="mt-4" xl={{span: 8, order:1}} lg={{span: 8, order:1}} md={{span: 24, order:2}} sm={{span: 24, order:2}} xs={{span: 24, order:2}} >
                    <div>
                        Pics
                        <div className="d-lg-none text-gray">
                            <small>شناسه محصول : A59</small>
                            <small className="mr-5">دسته : انگشترطلا ، حیوانات ، هدیه زنانه</small>
                            <small className="mr-5">برچسب : انگشترپروانه ، انگشترحیوانات ، انگشتر طلا</small>
                        </div>
                    </div>
                </Col>
                <Col className="mt-4" xl={{span: 8, order:2}} lg={{span: 8, order:2}} md={{span: 24, order:1}} sm={{span: 24, order:1}} xs={{span: 24, order:1}} >
                    <div>
                        <h3>انگشتر طرح پروانه‌نگین دار</h3>
                        <small>Jeweled butterfly design ring</small>
                        <div className="d-flex align-items-center">
                            <h6 className="text-royal pointer">دیدگاه‌های کاربران</h6>
                            <Divider type="vertical" className="mx-3" />
                            <h6 className="text-royal pointer">ویژگی‌ها</h6>
                            <Divider type="vertical" className="mx-3" />
                            <h6 className="text-warning"> <span> (1435) </span> <span> 4.9 </span> <StarFilled /> </h6>
                        </div>
                        <div className="mt-2 d-lg-block d-none">
                            <div className="text-gray my-5" ><small>شناسه محصول : A59</small></div>
                            <div className="text-gray my-5" ><small>دسته : انگشترطلا ، حیوانات ، هدیه زنانه</small></div>
                            <div className="text-gray my-5" ><small>برچسب : انگشترپروانه ، انگشترحیوانات ، انگشتر طلا</small></div>
                        </div>
                    </div>
                </Col>
                <Col className="mt-4" xl={{span: 8, order:3}} lg={{span: 8, order:3}} md={{span: 24, order:3}} sm={{span: 24, order:3}} xs={{span: 24, order:3}} >
                    <div className="bg-lightGray rounded">
                        <div className="d-flex align-items-center p-2">
                            <FaMedal size="3rem" className="text-royal rotate180 mx-2" />
                            <div>
                                <h3>پیشنهاد کاربران</h3>
                                <small >( بیشتر از ۹۹۹ نفر ) از کاربران خرید این کالا را پیشنهاد کرده‌اند ۱۰۰٪</small>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-5">
                        <div>انتخاب رنگ‌</div>
                        <div>
                            <span className="mr-2" onClick={ _ => console.log("YES")}>
                                <input type="color" className="pointer border border-lightGray" value="#f6553c" disabled style={{width: "23px", borderWidth: "2px"}} />
                            </span>
                            <span className="mr-2" onClick={ _ => console.log("YES1")}>
                                <input type="color" className="pointer border border-warning" value="#f6aa3c" disabled style={{width: "23px", borderWidth: "2px"}} />
                            </span>
                            <span className="mr-2" onClick={ _ => console.log("YES3")}>
                                <input type="color" className="pointer border border-lightGray" value="#f6ff3c" disabled style={{width: "23px", borderWidth: "2px"}} />
                            </span>
                        </div>
                    </div>
                    <div className="mt-5">
                        <Select className="w-100" placeholder="یک سایز انتخاب کنید">
                            <Select.Option>یک سایز انتخاب کنید</Select.Option>
                        </Select>
                        <span className="text-royal mt-2 pointer">راهنمای انتخاب سایز انگشتر</span>
                    </div>
                    <Divider className="mt-5" />
                    <div className="d-flex justify-content-between">
                        <div>قیمت : </div>
                        <div className="d-flex flex-column">
                            <h5> 25960000 </h5>
                            <h6 className="align-self-end">تومان</h6>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <Button size="large" className="w-100" type="primary">افزودن به سبد خرید</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

