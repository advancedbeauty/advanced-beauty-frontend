'use client';

import React from 'react';
import { ReviewsData } from '@/data/reviewsData';
import ReviewsCard from '@/components/home/review-section/reviews-card';
import CustomCarousel from '@/components/ui/custom-carousel'; // Adjust the import path as needed

const ReviewsCarousel: React.FC = () => {
    const carouselItems = ReviewsData.map((card) => <ReviewsCard key={card.name} {...card} />);

    return (
        <div className="w-full">
            <CustomCarousel
                items={carouselItems}
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                className="custom-swiper"
            />
        </div>
    );
};

export default React.memo(ReviewsCarousel);
