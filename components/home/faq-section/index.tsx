import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import React from 'react';
import FaqContent from './faq-content';

const HomeFAQSection = () => {
    return (
        <Section className="py-20">
            <Container className='w-full flex flex-col gap-10'>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-2xl sm:text-3xl">FAQ<span className='text-xl'>s</span></span>
                        <p className="font-semibold text-xl text-gray-600">Most frequently asked questions</p>
                    </div>
                    <FaqContent />
            </Container>
        </Section>
    );
};

export default HomeFAQSection;
