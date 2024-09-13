import Footer from '@/components/footer';
import HomeAboutSection from '@/components/home/about-section';
import HeroSection from '@/components/home/hero-section';
import HomeReviewSection from '@/components/home/review-section';
import HomeServiceSection from '@/components/home/service-section';
import Navbar from '@/components/navbar';
import React from 'react';

const page = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start min-w-screen overflow-x-hidden">
            <Navbar />
            <HeroSection />
            <HomeAboutSection />
            <HomeServiceSection />
            <HomeReviewSection />
            <Footer />
        </main>
    );
};

export default page;
