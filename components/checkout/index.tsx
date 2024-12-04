'use client';

import React from 'react';
import Section from '../ui/features/Section';
import Container from '../ui/features/Container';
import PriceDetails from '../cart/price-details';
import { useCalculateTotals } from '@/hooks/use-calculateTotal';
import CheckoutForm from './checkout-form';

const CheckoutPage = () => {
    const calculatePrice = useCalculateTotals();
    return (
        <Section className="py-10 md:py-20 bg-gray-50">
            <Container className="w-full flex flex-col sm:flex-row gap-5 md:gap-7 items-start">
                <CheckoutForm />
                <div className="w-full max-w-[350px]">
                    <PriceDetails {...calculatePrice} />
                </div>
            </Container>
        </Section>
    );
};

export default CheckoutPage;
