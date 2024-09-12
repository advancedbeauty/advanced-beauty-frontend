'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/stylesheets/HeroSection.module.css';
import { HeroSectionData } from '@/data/heroSection';

interface Image {
    src: string;
    heading: string;
}

const images: Image[] = [
    { src: '/SLIDE_01.jpg', heading: 'Welcome to Our Site' },
    { src: '/SLIDE_02.jpg', heading: 'Discover Amazing Things' },
    { src: '/SLIDE_03.jpg', heading: 'Experience the Difference' },
    { src: '/SLIDE_04.jpg', heading: 'Join Our Community' },
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
        <div className={styles.heroSection}>
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`${styles.imageContainer} ${index === currentImageIndex ? styles.active : ''
                        }`}
                    style={{ backgroundImage: `url(${image.src})` }}
                >
                    <h1 className={styles.heading}>{image.heading}</h1>
                </div>
            ))}
        </div>
    );
};

export default HeroSection;