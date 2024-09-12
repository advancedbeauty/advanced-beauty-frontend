'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { HomeServices } from '@/data/homeServices';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Servicecard from '@/components/services/service-card';
import Link from 'next/link';

const ServicesCarousel = () => {
    const cards = HomeServices;
    const swiperRef = useRef<SwiperType | null>(null);

    const [cardsToShow, setCardsToShow] = useState<number>(3);
    const updateCardsToShow = () => {
        if (window.innerWidth < 300) {
            setCardsToShow(1);
        } else if (window.innerWidth < 600) {
            setCardsToShow(2);
        } else if (window.innerWidth < 900) {
            setCardsToShow(3);
        } else {
            setCardsToShow(4);
        }
    };

    useEffect(() => {
        updateCardsToShow();
        window.addEventListener('resize', updateCardsToShow);
        return () => {
            window.removeEventListener('resize', updateCardsToShow);
        };
    }, []);

    return (
        <div className="w-full flex flex-col gap-10">
            <div className="flex items-center">
                <div className="w-full flex flex-col gap-1">
                    <h1 className="font-bold text-2xl">Our Services</h1>
                    <h1 className="font-semibold text-xl">Most Trending Services</h1>
                </div>
                <Link
                    href="/packages"
                    className="flex items-center gap-[2px] text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl hover:scale-105 transition-all ease-in-out duration-500 h-10 min-w-24 justify-center"
                >
                    <span className="font-medium text-sm">View All</span>
                    <FiArrowRight />
                </Link>
            </div>
            <div className="flex items-center justify-between gap-10">
                {/* <button
                    className="p-3 transition-colors bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 md:flex items-center justify-center text-xl duration-300 hover:bg-opacity-90 hidden"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <FiChevronLeft size={24} />
                </button> */}
                <Swiper
                    slidesPerView={cardsToShow}
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
                            <Servicecard src={card.src} title={card.heading} price={card.price} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* <button
                    className="p-3 transition-colors bg-gray-500 bg-opacity-70 text-white rounded-full w-10 h-10 md:flex items-center justify-center text-xl duration-300 hover:bg-opacity-90 hidden"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <FiChevronRight size={24} />
                </button> */}
            </div>
            <div className="flex justify-center gap-4 mt-7">
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

export default ServicesCarousel;
