import  React  from "react"
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import Pic from "../../assets/icon/logan-delaney-PRNrYj8MdRE-unsplash@2x.png"

import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
// import 'swiper/modules/pagination/pagination.scss'; // Pagination module

import Card from "../public/productCard";

export default (props) => {

  return (
    <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={'auto'}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        style={{direction: "ltr"}}
        navigation={{
          prevEl: props.sliderPrevRef.current,
          nextEl: props.sliderNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = props.sliderPrevRef.current;
          swiper.params.navigation.nextEl = props.sliderNextRef.current;
        }}
    >
      {
        Boolean(props?.slides?.length) && props.slides.map( (item,index) => (
          <SwiperSlide key={index} style={{width: "auto"}}>{item}</SwiperSlide>
        ))
      }
      {
        !Boolean(props?.slides?.length) &&
          <>
            <SwiperSlide style={{width: "auto"}}><Card /></SwiperSlide>
            <SwiperSlide style={{width: "auto"}}><Card /></SwiperSlide>
            <SwiperSlide style={{width: "auto"}}><Card /></SwiperSlide>
            <SwiperSlide style={{width: "auto"}}><Card /></SwiperSlide>
            <SwiperSlide style={{width: "auto"}}><Card /></SwiperSlide>
            <SwiperSlide style={{width: "auto"}}><Card /></SwiperSlide>
            <SwiperSlide style={{width: "auto"}}><Card /></SwiperSlide>
            <SwiperSlide style={{width: "auto"}}><Card /></SwiperSlide>
          </>
      }
    </Swiper>

  );
};
