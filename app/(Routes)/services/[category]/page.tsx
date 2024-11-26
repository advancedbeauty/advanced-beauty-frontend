import React from 'react';
import GetServiceItem from '@/components/services/service-item';
import type { Metadata } from 'next';

const formatUrlToTitle = (urlString: string) => {
    return urlString
        .split('-')
        .map((word) => {
            if (word.toLowerCase() === 'and') return '&';
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
};

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
    // Await params if it's a Promise
    const awaitedParams = await params;
    const formatedTitle = formatUrlToTitle(awaitedParams.category);
    return {
        title: `${formatedTitle} | Services`,
        description:
            'Explore luxurious beauty services at Advanced Beauty. From rejuvenating facials to expert hair treatments, indulge in personalized services that enhance your natural beauty and well-being.',
    };
}

interface PageProps {
    params: {
        category: string;
    };
}

const Page = async ({ params }: PageProps) => {
    const awaitedParams = await params;
    return <GetServiceItem params={awaitedParams} />;
};

export default Page;