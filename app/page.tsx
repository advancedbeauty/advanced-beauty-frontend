import React from 'react';
import FooterBar from '@/components/footer/footer-bar';
import Footer from '@/components/footer';
import HeroSection from '@/components/home/hero-section';
import HomeServiceSection from '@/components/home/service-section';
import HomeAboutSection from '@/components/home/about-section';
import HomeShopSection from '@/components/home/shop-section';
import HomeGetInTouch from '@/components/home/get-in-touch';
import HomeBloggerSection from '@/components/home/blogger-section';
import ReviewSection from '@/components/home/review-section';
import HomeAwardsSection from '@/components/home/awards-section';
import HomeCertificatesSection from '@/components/home/certificates-section';
import HomeFAQSection from '@/components/home/faq-section';
import HomeSubscribeNewsletter from '@/components/home/subscribe-newsletter';
import FloatingActions from '@/components/ui/features/FloatingActions';
import HomeCategoriesSection from '@/components/home/categories-section';
import NavbarMarginLayout from '@/components/ui/navbar-margin-layout';

const page = () => {
    return (
        <NavbarMarginLayout>
            <HeroSection />
            <HomeCategoriesSection />
            <HomeAboutSection />
            <HomeServiceSection />
            <HomeGetInTouch />
            <HomeShopSection />
            <HomeBloggerSection />
            <ReviewSection />
            <HomeAwardsSection />
            <HomeCertificatesSection />
            <HomeFAQSection />
            <HomeSubscribeNewsletter />
            <FloatingActions />
            <FooterBar />
            <Footer />
        </NavbarMarginLayout>
    );
};

export default page;
