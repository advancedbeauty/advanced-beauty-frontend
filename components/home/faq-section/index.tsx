import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import React from 'react';

const HomeFAQSection = () => {
    return (
        <Section className="py-20">
            <Container className='w-full flex flex-col gap-10'>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-bold text-2xl sm:text-3xl">Frequently Ask Questions</h2>
                        <p className="font-semibold text-xl text-gray-600">Buy your favourite items</p>
                    </div>
            </Container>
        </Section>
    );
};

export default HomeFAQSection;
