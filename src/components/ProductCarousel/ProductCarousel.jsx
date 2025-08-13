import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import "swiper/css/pagination";

import "./ProductCarousel.css";

// import required modules
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';

export default function ProductCarousel({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        modules={[Navigation, Thumbs, Pagination, Autoplay]}
        style={{
          '--swiper-navigation-color': 'gray',
          '--swiper-pagination-color': '#000000ff',
          '--swiper-navigation-sides-offset': '0px',
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        className="mySwiper2"
      >
        {images.map(image => <SwiperSlide><img src={image} /></SwiperSlide>)}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        direction="vertical"
        className="mySwiper bg-danger thumbs-swiper"
      >
        {images.map(image => <SwiperSlide><img src={image} /></SwiperSlide>)}
      </Swiper>
    </>
  );
}