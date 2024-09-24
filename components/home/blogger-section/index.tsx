import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import React from 'react';
import BloggerCard from './blogger-card/v1';

const HomeBloggerSection = () => {
    return (
        <Section className="py-16 md:py-20">
            <Container>
                <BloggerCard />
            </Container>
        </Section>
    );
};

export default HomeBloggerSection;
