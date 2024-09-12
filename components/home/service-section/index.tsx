'use client';

import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import React from 'react';
import ServicesCarousel from './services-carousel';
import ServiceTab from './service-tab';

const HomeServiceSection = () => {
    return (
        <Section className="py-20 bg-red-50">
            <Container className="w-full flex flex-col gap-32">
                <ServicesCarousel />
                <ServiceTab />
            </Container>
        </Section>
    );
};

export default HomeServiceSection;
