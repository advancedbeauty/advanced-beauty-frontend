import React from 'react';
import GetShopItem from '@/components/shop/shop-item';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Shop | Advanced Beauty`,
    description:
        'Shop premium skincare, makeup, and beauty essentials at Advanced Beauty. Discover top products to enhance your beauty routine and experience luxurious self-care.',
};


interface PageProps {
    params: Promise<{
        category: string;
    }>;
}

const page  = async ({ params }: PageProps) => {
    // Create a Promise that resolves with the params
    const paramsPromise = Promise.resolve(params);
    return <GetShopItem params={paramsPromise} />;
};

export default page;
