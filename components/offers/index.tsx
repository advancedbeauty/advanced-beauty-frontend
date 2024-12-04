import React from 'react';
import Section from '../ui/features/Section';
import Container from '../ui/features/Container';
import OffersCard from './offers-card';
import MainTitle from '../ui/title/main-title';
import { fetchOffers } from '@/actions/admin/offers/offers.actions';

const OffersPage = async () => {
    const offerResponse = await fetchOffers();
    return (
        <Section className="py-10 md:py-20">
            <Container className="w-full flex flex-col gap-10">
                <MainTitle heading="Offers" subheading="Special Offers Just for You" />
                <div className="flex flex-wrap justify-around gap-6 md:gap-8">
                    {offerResponse.offers?.map((item) => (
                        <OffersCard 
                            key={item.id}
                            imageSrc={item.imageSrc}
                            code={item.code}
                        />
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default OffersPage;
