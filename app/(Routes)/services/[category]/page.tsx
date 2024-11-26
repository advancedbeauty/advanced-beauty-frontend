import React from 'react';
import { Metadata } from 'next';
import GetServiceItem from '@/components/services/service-item';

// Utility function for formatting
const formatUrlToTitle = (urlString: string) => {
    return urlString
        .split('-')
        .map((word) => {
            if (word.toLowerCase() === 'and') return '&';
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
};

export async function generateMetadata({ 
    params 
}: { 
    params: { category: string } 
}): Promise<Metadata> {
    // Use Promise.resolve to ensure params is a promise
    const resolvedParams = await Promise.resolve(params);
    const formatedTitle = formatUrlToTitle(resolvedParams.category);
    
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
    // Use Promise.resolve to ensure params is a promise
    const resolvedParams = await Promise.resolve(params);
    return <GetServiceItem params={resolvedParams} />;
};

export default Page;