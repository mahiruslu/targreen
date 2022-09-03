import React, { useState } from "react";
import Styles from "./Announcements.module.scss";
import { motion } from "framer-motion";
import classNames from "classnames/bind";

import { product_slides } from "../../assets/data.json";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";

function Announcements() {
  return (
    <div className={classNames([Styles.announcements])}>
      <Swiper
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        color={"#fff"}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        style={{ borderRadius: "30px", color: "#fff" }}
        className={classNames(Styles.announcements_swiper, "mySwiper")}
      >
        {product_slides.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={
                  window.location.origin +
                  "/assets/images/products/" +
                  slide.image
                }
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Announcements;
