import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import React from 'react';
import { HomeServices } from '@/data/homeServices';
import { FiArrowRight } from 'react-icons/fi';
import Servicecard from '@/components/home/service-section/service-card';
import Link from 'next/link';
import CustomCarousel from '@/components/ui/custom-carousel';

const HomeServiceSection = () => {
    
    const carouselItems = HomeServices.map((card, index) => (
        <Servicecard key={index} src={card.src} title={card.heading} price={card.price} />
    ));

    return (
        <Section className="py-20 bg-red-50">
            <Container className="w-full flex flex-col gap-10 py-8">
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

                <CustomCarousel
                    items={carouselItems}
                    slidesPerView={3}
                    spaceBetween={20}
                    loop={true}
                    navigationOn={true}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        500: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                />
            </Container>
        </Section>
    );
};

export default HomeServiceSection;
