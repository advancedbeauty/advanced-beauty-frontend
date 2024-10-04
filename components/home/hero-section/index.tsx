'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/stylesheets/HeroSection.module.css';
import { Roboto_Slab } from 'next/font/google';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

const roboslab = Roboto_Slab({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

interface Image {
    src: string;
    heading: string;
}

const images: Image[] = [
    { src: '/SLIDE_01.jpg', heading: 'Art Manicure' },
    { src: '/SLIDE_03.jpg', heading: 'Art Manicure' },
    { src: '/SLIDE_04.jpg', heading: 'Art Manicure' },
];

const HeroSection: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`${styles.heroSection} h-[600px] md:h-[700px] lg:h-screen`}>
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`${styles.imageContainer} ${index === currentImageIndex ? styles.active : ''}`}
                    style={{ backgroundImage: `url(${image.src})` }}
                >
                    <div className={`${styles.heading} flex flex-col w-full items-center text-white mt-10`}>
                        <span className={`${styles.heroSubTitleOne} select-none font-medium font-quentin leading-tight z-[5] text-[#FBF1EA]`}>
                            nail fashion
                        </span>
                        <span className={`${styles.heroMainTitle} ${roboslab.className} uppercase leading-tight`}>
                            {image.heading}
                        </span>
                        <div className='mt-4 flex flex-col sm:flex-row gap-2 overflow-hidden'>
                            <div>Best quality.</div>
                            <div>Always in trend.</div> 
                            <div>Creative color styles.</div>
                        </div>
                        <Link href={'/'} className='border border-white hover:bg-white hover:text-black mt-10 px-5 py-3 flex items-center gap-2 text-xs sm:text-sm lg:text-base'>
                            Buy Now
                            <FaArrowRight />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HeroSection;