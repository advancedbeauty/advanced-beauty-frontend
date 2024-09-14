'use client';

import React, { useCallback, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ReviewsData } from '@/data/reviewsData';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReviewsCard from '@/components/home/review-section/reviews-card';

const NavigationButton = React.memo(({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) => (
    <button
        className="p-3 transition-colors border w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-xl duration-300 hover:bg-opacity-90"
        onClick={onClick}
        aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} review`}
    >
        {direction === 'prev' ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
    </button>
));

NavigationButton.displayName = 'NavigationButton';

const ReviewsCarousel: React.FC = () => {
    const swiperRef = useRef<SwiperType | null>(null);

    const handlePrev = useCallback(() => swiperRef.current?.slidePrev(), []);
    const handleNext = useCallback(() => swiperRef.current?.slideNext(), []);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between gap-5">
                <div className="hidden md:flex">
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
                    {ReviewsData.map((card) => (
                        <SwiperSlide key={card.name} className="flex-shrink-0 overflow-hidden">
                            <ReviewsCard {...card} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="hidden md:flex">
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

export default React.memo(ReviewsCarousel);
