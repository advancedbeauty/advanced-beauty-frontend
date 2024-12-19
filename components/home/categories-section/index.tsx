'use client';

import React, { useEffect, useState } from 'react';
import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import MainTitle from '@/components/ui/title/main-title';
import { ServiceCategory } from '@/types/service/service-category';
import { fetchServiceCategories } from '@/actions/admin/service/service-category.actions';
import CategoriesCard from './categories-card';
import { formatUrlString } from '@/lib/formatUrlString';

const HomeCategoriesSection = () => {
    const [categories, setCategories] = useState<ServiceCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetchServiceCategories();
                if (response.success) {
                    setCategories(response.categories || []);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <Section className="py-10 md:py-20 bg-[#FBF1EA]">
            <Container className='w-full'>
                <MainTitle heading="India's Best Professional Home Salon" />
                <div className="mt-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-8 justify-items-center">
                    {isLoading
                        ? Array.from({ length: 12 }).map((_, index) => (
                            <div key={index}>
                                <CategoriesCard src="" alt="" isLoading={true} />
                            </div>
                        ))
                        : categories.map((category) => (
                            <div key={category.id}>
                                <CategoriesCard
                                    src={category.imageSrc}
                                    alt={category.title}
                                    title={category.title}
                                    href={`/services/${formatUrlString(category.title)}`}
                                    isLoading={false}
                                />
                            </div>
                        ))}
                </div>
            </Container>
        </Section>
    );
};

export default HomeCategoriesSection;