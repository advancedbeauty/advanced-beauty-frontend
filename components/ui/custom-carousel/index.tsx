'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface CustomCarouselProps {
    items: React.ReactNode[];
    slidesPerView?: number | 'auto';
    spaceBetween?: number;
    loop?: boolean;
    breakpoints?: { [width: number]: { slidesPerView: number } };
    className?: string;
}

const NavigationButton: React.FC<{ direction: 'prev' | 'next'; onClick: () => void }> = React.memo(
    ({ direction, onClick }) => (
        <button
            className="p-3 transition-colors border w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-xl duration-300 hover:bg-opacity-90"
            onClick={onClick}
            aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} slide`}
        >
            {direction === 'prev' ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
        </button>
    )
);

NavigationButton.displayName = 'NavigationButton';

const CustomCarousel: React.FC<CustomCarouselProps> = ({
    items,
    slidesPerView = 1,
    spaceBetween = 20,
    loop = true,
    breakpoints,
    className = '',
}) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [showNavigation, setShowNavigation] = useState(true);

    const handlePrev = useCallback(() => swiperRef.current?.slidePrev(), []);
    const handleNext = useCallback(() => swiperRef.current?.slideNext(), []);

    useEffect(() => {
        const updateNavigation = () => {
            const shouldShowNavigation = items.length > (typeof slidesPerView === 'number' ? slidesPerView : 1);
            setShowNavigation(shouldShowNavigation);
        };

        updateNavigation();
        window.addEventListener('resize', updateNavigation);
        return () => window.removeEventListener('resize', updateNavigation);
    }, [items.length, slidesPerView]);

    return (
        <div className={`w-full ${className}`}>
            <div className="relative">
                <Swiper
                    slidesPerView={slidesPerView}
                    spaceBetween={spaceBetween}
                    loop={loop}
                    breakpoints={breakpoints}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    modules={[Navigation]}
                    className="pb-12"
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={index} className="flex-shrink-0">
                            {item}
                        </SwiperSlide>
                    ))}
                </Swiper>
                {showNavigation && (
                    <div className="flex justify-center gap-4 mt-6">
                        <NavigationButton direction="prev" onClick={handlePrev} />
                        <NavigationButton direction="next" onClick={handleNext} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(CustomCarousel);
