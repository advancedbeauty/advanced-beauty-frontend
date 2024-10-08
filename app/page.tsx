import Footer from '@/components/footer';
import FooterBar from '@/components/footer/footer-bar';
import HomeAboutSection from '@/components/home/about-section';
import HomeBloggerSection from '@/components/home/blogger-section';
import HomeGetInTouch from '@/components/home/get-in-touch';
import HeroSection from '@/components/home/hero-section';
import HomeServiceSection from '@/components/home/service-section';
import HomeShopSection from '@/components/home/shop-section';
import HomeReviewSection from '@/components/home/review-section';
import Navbar from '@/components/navbar';
import React from 'react';
import HomeAwardsSection from '@/components/home/awards-section';
import HomeCertificatesSection from '@/components/home/certificates-section';
import HomeFAQSection from '@/components/home/faq-section';
import HomeSubscribeNewsletter from '@/components/home/subscribe-newsletter';

const page = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start min-w-screen overflow-x-hidden relative">
            <Navbar />
            <HeroSection />
            <HomeAboutSection />
            <HomeServiceSection />
            <HomeGetInTouch />
            <HomeShopSection />
            <HomeBloggerSection />
            <HomeReviewSection />
            <HomeAwardsSection />
            <HomeCertificatesSection />
            <HomeFAQSection />
            <HomeSubscribeNewsletter />
            <FooterBar />
            <Footer />
        </main>
    );
};

export default page;
