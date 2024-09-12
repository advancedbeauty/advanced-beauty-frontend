"use client";

import React, { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ReviewsData } from "@/data/reviewsData";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ReviewsCard from "../reviews-card";

const ReviewsCarousel = () => {
  const cards = ReviewsData;
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full mt-16">
      <div className="flex items-center justify-between gap-10">
        <button
          className="p-3 transition-colors bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 md:flex items-center justify-center text-xl duration-300 hover:bg-opacity-90 hidden"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <FiChevronLeft size={24} />
        </button>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
          className="custom-swiper"
        >
          {cards.map((card, index) => (
            <SwiperSlide
              key={index}
              className="flex-shrink-0 overflow-hidden"
            >
              <ReviewsCard name={card.name} img={card.img} reviewText={card.reviewText}/>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className="p-3 transition-colors bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 md:flex items-center justify-center text-xl duration-300 hover:bg-opacity-90 hidden"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <FiChevronRight size={24} />
        </button>
      </div>
      <div className="flex justify-center gap-4 mt-7 md:hidden">
        <button
          className="p-3 transition-colors bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl duration-300 hover:bg-opacity-90"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          className="p-3 transition-colors bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl duration-300 hover:bg-opacity-90"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ReviewsCarousel;
