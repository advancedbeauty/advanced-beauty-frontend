'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { HomeServices } from '@/data/homeServices';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Servicecard from '@/components/services/service-card';
import Link from 'next/link';

const NavigationButton = React.memo(({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) => (
    <button
        className="p-3 transition-colors border w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-xl duration-300 hover:bg-opacity-90"
        onClick={onClick}
        aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} slide`}
    >
        {direction === 'prev' ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
    </button>
));

NavigationButton.displayName = 'NavigationButton';

const ServicesCarousel: React.FC = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [cardsToShow, setCardsToShow] = useState(3);

    const handlePrev = useCallback(() => swiperRef.current?.slidePrev(), []);
    const handleNext = useCallback(() => swiperRef.current?.slideNext(), []);

    const updateCardsToShow = useCallback(() => {
        const width = window.innerWidth;
        if (width < 500) setCardsToShow(1);
        else if (width < 768) setCardsToShow(2);
        else if (width < 1024) setCardsToShow(3);
        else setCardsToShow(4);
    }, []);

    useEffect(() => {
        updateCardsToShow();
        window.addEventListener('resize', updateCardsToShow);
        return () => window.removeEventListener('resize', updateCardsToShow);
    }, [updateCardsToShow]);

    return (
        <section className="w-full flex flex-col gap-10 py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-2xl sm:text-3xl">Our Services</h2>
                    <p className="font-semibold text-xl text-gray-600">Most Trending Services</p>
                </div>
                <Link
                    href="/packages"
                    className="flex items-center gap-2 bg-red-300 rounded hover:bg-red-400 transition-all ease-in-out duration-300 px-4 py-2 text-sm font-medium"
                >
                    View All <FiArrowRight />
                </Link>
            </div>

            <div className="relative">
                <Swiper
                    slidesPerView={cardsToShow}
                    spaceBetween={20}
                    loop={true}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    modules={[Navigation]}
                    className="pb-12"
                >
                    {HomeServices.map((card, index) => (
                        <SwiperSlide key={index} className="flex-shrink-0">
                            <Servicecard src={card.src} title={card.heading} price={card.price} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="flex justify-center gap-4 mt-6">
                    <NavigationButton direction="prev" onClick={handlePrev} />
                    <NavigationButton direction="next" onClick={handleNext} />
                </div>
            </div>
        </section>
    );
};

export default React.memo(ServicesCarousel);
