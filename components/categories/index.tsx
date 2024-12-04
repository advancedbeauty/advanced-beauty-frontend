'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Section from '../ui/features/Section';
import Link from 'next/link';
import Image from 'next/image';
import { fetchServiceCategories } from '@/actions/admin/service/service-category.actions';
import ImageCard from '../ui/cards/ImageCard';
import { fetchShopCategories, ShopCategory } from '@/actions/admin/shop/shop-category.actions';
import { ServiceCategory } from '@/types/service/service-category';

const Categories = () => {
    const [categories, setCategories] = useState<ServiceCategory[]>([]);
    const [shopCategories, setShopCategories] = useState<ShopCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const formatUrlString = (title: string) => {
        return title
            .toLowerCase()
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetchServiceCategories();
                const shopResponse = await fetchShopCategories();
                if (response.success) {
                    setCategories(response.categories || []);
                }
                if (shopResponse.success) {
                    setShopCategories(shopResponse.categories || []);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <Section className="relative h-screen overflow-hidden">
            <div className="w-full max-w-[1500px] mx-auto h-full">
                <Tabs defaultValue="servicesTab" className="w-full h-full flex relative">
                    {/* Left Sidebar - Fixed */}
                    <div className="w-1/5 min-w-[150px] max-w-[320px] h-full bg-[#D9C1A3]">
                        <div className="h-full py-6 px-2">
                            <TabsList className="flex flex-col h-auto gap-3">
                                <TabsTrigger
                                    value="servicesTab"
                                    className="w-full rounded justify-center mb-1 text-left md:text-lg lg:text-xl flex flex-col lg:flex-row gap-1 lg:gap-3 items-center"
                                >
                                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                                        <Image
                                            src="/temp/categories/service_png.webp"
                                            alt="service"
                                            width={48}
                                            height={48}
                                            className="w-12 h-12"
                                        />
                                        <span className="font-medium">Services</span>
                                    </div>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="shopTab"
                                    className="w-full rounded justify-center mb-1 text-left md:text-lg lg:text-xl flex flex-col lg:flex-row gap-1 lg:gap-3 items-center"
                                >
                                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                                        <Image
                                            src="/temp/categories/shop_png.webp"
                                            alt="shop"
                                            width={48}
                                            height={48}
                                            className="w-12 h-12"
                                        />
                                        <span className="font-medium">Shop</span>
                                    </div>
                                </TabsTrigger>
                            </TabsList>
                        </div>
                    </div>

                    {/* Main Content - Scrollable */}
                    <div className="w-4/5 flex-grow px-4 py-6 overflow-y-auto h-full">
                        <TabsContent value="servicesTab" className="mt-0">
                            <h2 className="text-2xl font-bold mb-6">Services</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {isLoading
                                    ? Array.from({ length: 6 }).map((_, index) => (
                                          <div key={index} className="">
                                              <ImageCard src="" alt="" isLoading={true} />
                                          </div>
                                      ))
                                    : categories.map((category) => (
                                          <div key={category.id} className="">
                                              <ImageCard
                                                  src={category.imageSrc}
                                                  alt={category.title}
                                                  title={category.title}
                                                  href={`/services/${formatUrlString(category.title)}`}
                                                  isLoading={false}
                                              />
                                          </div>
                                      ))}
                                {/* View All button as a grid item */}
                                <div className="aspect-[4/3] flex items-center justify-center max-h-[50px] w-full">
                                    <Link
                                        href="/services"
                                        className="w-full h-full max-h-[50px] bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center font-medium"
                                    >
                                        View All Services
                                    </Link>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="shopTab" className="mt-0">
                            <h2 className="text-2xl font-bold mb-6">Shop</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {isLoading
                                    ? Array.from({ length: 6 }).map((_, index) => (
                                          <div key={index} className="">
                                              <ImageCard src="" alt="" isLoading={true} />
                                          </div>
                                      ))
                                    : shopCategories.map((category) => (
                                          <div key={category.id} className="">
                                              <ImageCard
                                                  src={category.imageSrc}
                                                  alt={category.title}
                                                  title={category.title}
                                                  href={`/shop/${formatUrlString(category.title)}`}
                                                  isLoading={false}
                                              />
                                          </div>
                                      ))}
                                <div className="aspect-[4/3] flex items-center justify-center max-h-[50px] w-full">
                                    <Link
                                        href="/shop"
                                        className="w-full h-full max-h-[50px] bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center font-medium"
                                    >
                                        View All Shop 
                                    </Link>
                                </div>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </Section>
    );
};

export default Categories;
