import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

import Car_1 from "../../../assets/images/slideImages/car_1.jpg";
import Car_2 from "../../../assets/images/slideImages/car_2.jpg";
import Car_3 from "../../../assets/images/slideImages/car_3.jpg";
import Car_4 from "../../../assets/images/slideImages/car_4.jpg";

import "swiper/swiper-bundle.css";
import "./index.scss";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const SwiperComponent = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={Car_1} alt="Car_1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Car_2} alt="Car_2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Car_3} alt="Car_3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Car_4} alt="Car_4" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SwiperComponent;
