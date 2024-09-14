import React from 'react';
import dynamic from 'next/dynamic';
import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';

const ReviewsCarousel = dynamic(() => import('@/components/home/review-section/reviews-carousel'), { ssr: false });

const HomeReviewSection: React.FC = () => (
    <Section className="py-20 bg-red-50">
        <Container className="w-full">
            <div className="w-full flex flex-col items-center gap-2 mb-16">
                <h2 className="font-quentin text-3xl font-semibold">testimonials</h2>
                <h3 className="text-4xl font-semibold">what our client says</h3>
            </div>
            <ReviewsCarousel />
        </Container>
    </Section>
);

export default React.memo(HomeReviewSection);
