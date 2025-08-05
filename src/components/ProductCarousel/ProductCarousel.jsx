import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import "./ProductCarousel.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function ProductCarousel({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': 'gray',
          '--swiper-pagination-color': '#fff',
        }}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
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
        className="mySwiper"
      >
        {images.map(image => <SwiperSlide><img src={image} /></SwiperSlide>)}
      </Swiper>
    </>
  );
}

