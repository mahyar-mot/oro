import React, {useEffect, useState} from 'react';
import {Button, Modal, Spin} from "antd";
import Slider from "react-slick";
import {useDispatch, useSelector} from "react-redux";
import {useTokenClaims} from "../public/hooks";
import {getSliderPicturesList,cleanSliderPicturesList} from "../../redux/picturize/picturizeSlider";
import {Link} from "react-router-dom";
import {ArrowLeftOutlined} from "@ant-design/icons";

const ModalSlider = (props) => {
    const {initialCDC} = props;
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch();
    const {countryDivisionCode} = useTokenClaims();
    const {sliderPicturesList,isLoading} = useSelector(state => state.picturize.picturizeSlider);
    useEffect(() => {
    return ()=>{
        dispatch(cleanSliderPicturesList())
    }
    }, [])

    const getData = (countryDev = countryDivisionCode) => {
        dispatch(getSliderPicturesList(countryDev))
    }
    const settings = {
        customPaging: function (i) {
            return (
                <a className="d-inline-block">
                    <img className="img-thumb-costume" src={sliderPicturesList[i]?.url}/>
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb slick-custom-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>
    };
    return (
        <div>

            <div>
                <Button onClick={() => {
                    setIsOpen(true)
                    if (initialCDC)
                        getData(initialCDC)
                }} type="primary" ghost className="bg-white mx-1 mb-1">گالری عکس
                    ها</Button>
            </div>
            <Modal title="مانیتورینگ تصویری تخلفات" footer={[]} centered visible={isOpen}
                   onCancel={() => setIsOpen(false)}
                   style={{height: "95vh", width: "100%", overflowY: "scroll", overflowX: "hidden"}}
                   className="image-box-modal" width={"100%"}>
                <Spin spinning={isLoading}>

                <Slider  {...settings}>
                    {
                        sliderPicturesList.map((t, key) => <div key={"sliderPicturesList" + key}
                                                                className="text-center ">
                            <div className="text-left mb-2">
                                <Link to={`/violations/detail/${t?.violationId}?prevPage=picturize/violation`} className="text-danger" >
                                    <span className="d-inline-block pl-1">جزییات تخلف</span>
                                    <ArrowLeftOutlined />
                                </Link>
                            </div>
                            {/*<img  className="d-inline-block " style={{minHeight:"60vh",width:"90%"}}   src={t} alt=""/>*/}
                            <div className="img-slider-costume" style={{backgroundImage: `url(${t?.url})`}}/>
                            {/*<p>hjhj</p>*/}
                        </div>)
                    }
                </Slider>
                </Spin>
            </Modal>

        </div>
    );
};

export default ModalSlider;

function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            onClick={onClick}
        />
    );
}