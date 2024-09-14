import Footer from '@/components/footer';
import HomeAboutSection from '@/components/home/about-section';
import HomeBloggerSection from '@/components/home/blogger-section';
import HomeCertificatesSection from '@/components/home/certificates-section';
import HomeFAQSection from '@/components/home/faq-section';
import HomeGetInTouch from '@/components/home/get-in-touch';
import HeroSection from '@/components/home/hero-section';
import HomeReviewSection from '@/components/home/review-section';
import HomeServiceSection from '@/components/home/service-section';
import HomeShopSection from '@/components/home/shop-section';
import Navbar from '@/components/navbar';
import React from 'react';

const page = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start min-w-screen overflow-x-hidden">
            <Navbar />
            <HeroSection />
            <HomeAboutSection />
            <HomeServiceSection />
            <HomeGetInTouch />
            <HomeShopSection />
            <HomeBloggerSection />
            <HomeReviewSection />
            <HomeCertificatesSection />
            <HomeFAQSection />
            <Footer />
        </main>
    );
};

export default page;
