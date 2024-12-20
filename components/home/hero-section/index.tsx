'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import slides from '@/data/HomeBanners';

const HeroSection: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [displayedSlide, setDisplayedSlide] = useState<number>(0);

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const goToPreviousSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            goToNextSlide();
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setDisplayedSlide(currentSlide);
    }, [currentSlide]);

    return (
        <div className="relative w-full overflow-hidden group">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    style={{
                        display: index === displayedSlide ? 'block' : 'none',
                    }}
                >
                    <Image
                        src={slide.src}
                        alt={slide.alt}
                        width={10000}
                        height={10000}
                        priority={index === 0}
                        quality={100}
                        className="object-contain h-auto"
                        
                    />
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={goToPreviousSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default HeroSection;
