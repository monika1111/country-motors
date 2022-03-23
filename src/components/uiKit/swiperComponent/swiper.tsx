import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.scss";

// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper";

interface IProps {
  thumbMode?: boolean;
  classNames?: string;
  images?: string[];
  autoplay?: boolean;
  thumbClassNames?: string;
}

const SwiperComp = ({
  thumbMode = false,
  images,
  classNames,
  autoplay = false,
  thumbClassNames,
}: IProps) => {
  // @ts-ignore
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper>();

  return (
    <>
      <Swiper
        // style={{
        //   "--swiper-navigation-color": "#fff",
        //   "--swiper-pagination-color": "#fff",
        // }}
        loop={true}
        autoplay={
          autoplay
            ? {
                delay: 2500,
                disableOnInteraction: false,
              }
            : false
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[
          FreeMode,
          Navigation,
          Thumbs,
          ...(autoplay ? [Autoplay] : []),
        ]}
        className={classNames}
      >
        {images.map((img) => (
          <SwiperSlide key={img}>
            <img src={img} alt="image" />
          </SwiperSlide>
        ))}
      </Swiper>
      {thumbMode && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          navigation={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={thumbClassNames}
        >
          {images.map((img) => (
            <SwiperSlide key={img}>
              <img src={img} alt="image" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default SwiperComp;
