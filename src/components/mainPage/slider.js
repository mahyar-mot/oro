import  React  from "react"
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import Pic from "../../assets/icon/logan-delaney-PRNrYj8MdRE-unsplash@2x.png"

import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/virtual/virtual.scss'; // Navigation module
// import 'swiper/modules/pagination/pagination.scss'; // Pagination module

import Card from "../public/productCard";

export default () => {
  // Create array with 1000 slides
  const slides = Array.from({ length: 1000 }).map(
    (el, index) => `Slide ${index + 1}`
  );

  return (
    <Swiper
        spaceBetween={15}
        slidesPerView={'auto'}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><Card /></SwiperSlide>
      <SwiperSlide><Card /></SwiperSlide>
      <SwiperSlide><Card /></SwiperSlide>
      <SwiperSlide><Card /></SwiperSlide>
      <SwiperSlide><Card /></SwiperSlide>
      <SwiperSlide><Card /></SwiperSlide>
      <SwiperSlide><Card /></SwiperSlide>
      <SwiperSlide><Card /></SwiperSlide>
    </Swiper>

  );
};
