import React from 'react';
import Wishlist from '@/components/wishlist';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Wishlist | Advanced Beauty',
    description:
        'Save your favorite beauty products and services with Advanced Beauty&apos;s Wishlist feature. Whether you&apos;re looking for skincare, makeup, or exclusive beauty treatments, our Wishlist allows you to organize and revisit the items you love for future reference. Create your personalized wishlist today and easily access the best beauty essentials for your self-care routine.',
};

const page = () => {
    return <Wishlist />;
};

export default page;
