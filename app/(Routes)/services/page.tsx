import React from 'react';
import Services from '@/components/services';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Services | Advanced Beauty`,
    description:
        'Explore luxurious beauty services at Advanced Beauty. From rejuvenating facials to expert hair treatments, indulge in personalized services that enhance your natural beauty and well-being.',
};

const page = () => {
    return <Services />;
};

export default page;
