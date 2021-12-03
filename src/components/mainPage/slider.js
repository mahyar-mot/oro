import  React  from "react"
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import Pic from "../../assets/icon/logan-delaney-PRNrYj8MdRE-unsplash@2x.png"

import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/virtual/virtual.scss'; // Navigation module
// import 'swiper/modules/pagination/pagination.scss'; // Pagination module

export default () => {
  // Create array with 1000 slides
  const slides = Array.from({ length: 1000 }).map(
    (el, index) => `Slide ${index + 1}`
  );

  return (
    <Swiper>
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <span slot="container-start">Container Start</span>
      <span slot="container-end">Container End</span>
      <span slot="wrapper-start">Wrapper Start</span>
      <span slot="wrapper-end">Wrapper End</span>
    </Swiper>

  );
};
