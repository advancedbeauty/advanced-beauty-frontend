import React from 'react';
import { notFound } from 'next/navigation';
import { fetchServiceCategories, ServiceCategory } from '@/actions/admin/service/service-category.actions';
import { fetchServiceItems, ServiceItem } from '@/actions/admin/service/service-item.actions';
import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import { Skeleton } from '@/components/ui/skeleton';
import ServiceCard from '@/components/home/service-section/service-card';

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

interface PageProps {
    params: {
        category: string;
    };
}

async function GetServiceItem({ params }: PageProps) {
    // Use Promise.resolve to ensure params is a promise
    const resolvedParams = await Promise.resolve(params);
    const categoryTitle = formatUrlToTitle(resolvedParams.category);

    // Fetch category to verify it exists
    const categoriesResponse = await fetchServiceCategories();

    if (!categoriesResponse.success || !categoriesResponse.categories) {
        notFound();
    }

    const categoryExists = categoriesResponse.categories.some(
        (cat: ServiceCategory) => cat.title.toLowerCase() === categoryTitle.toLowerCase()
    );

    if (!categoryExists) {
        notFound();
    }

    // Fetch services filtered by category
    const servicesResponse = await fetchServiceItems(categoryTitle);

    if (!servicesResponse.success || !servicesResponse.items) {
        notFound();
    }

    return (
        <Section className="py-10 md:py-16 mb-20">
            <Container className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-center">{categoryTitle}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {servicesResponse.items.map((service: ServiceItem) => (
                        <ServiceCard
                            key={service.id}
                            src={service.imageSrc}
                            title={service.title}
                            price={service.price}
                            discount={service.discount}
                            category={service.category}
                            id={service.id}
                        />
                    ))}
                </div>
            </Container>
        </Section>
    );
}

export default GetServiceItem;