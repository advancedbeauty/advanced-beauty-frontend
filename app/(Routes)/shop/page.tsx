import React from 'react';
import Shop from '@/components/shop';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shop | Advanced Beauty',
    description:
        'Shop premium skincare, makeup, and beauty essentials at Advanced Beauty. Discover top products to enhance your beauty routine and experience luxurious self-care.',
};

const page = () => {
    return <Shop />;
};

export default page;
