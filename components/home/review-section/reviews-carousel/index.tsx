'use client';

import React, { useCallback, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ReviewsData } from '@/data/reviewsData';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReviewsCard from '../reviews-card';

const NavigationButton = ({ direction, onClick }:any) => (
    <button
        className="p-3 transition-colors border w-16 h-16 flex items-center justify-center text-xl duration-300 hover:bg-opacity-90"
        onClick={onClick}
    >
        {direction === 'prev' ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
    </button>
);

const ReviewsCarousel = () => {
    const cards = ReviewsData;
    const swiperRef = useRef<SwiperType | null>(null);

    const handlePrev = useCallback(() => swiperRef.current?.slidePrev(), []);
    const handleNext = useCallback(() => swiperRef.current?.slideNext(), []);

    return (
        <div className="w-full mt-16">
            <div className="flex items-center justify-between gap-5">
                <div>
                    <NavigationButton direction="prev" onClick={handlePrev} />
                </div>
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
                        <SwiperSlide key={index} className="flex-shrink-0 overflow-hidden">
                            <ReviewsCard name={card.name} img={card.img} reviewText={card.reviewText} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div>
                    <NavigationButton direction="next" onClick={handleNext} />
                </div>
            </div>
            <div className="flex justify-center gap-4 mt-7 md:hidden">
                <NavigationButton direction="prev" onClick={handlePrev} />
                <NavigationButton direction="next" onClick={handleNext} />
            </div>
        </div>
    );
};

export default ReviewsCarousel;
