import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { categoriesData } from '@/data/categoriesData';
import Section from '../ui/features/Section';

const Categories = () => {
    const categories = categoriesData;

    return (
        <Section>
            <div className='w-full max-w-[1500px]'>
                <Tabs defaultValue={categories[0].id} className="w-full flex h-[75vh] sticky">
                    <div className="w-1/5 min-w-[150px] max-w-[320px] bg-[#D9C1A3] py-3 px-1">
                        <TabsList className="flex flex-col h-auto">
                            {categories.map((category) => (
                                <TabsTrigger
                                    key={category.id}
                                    value={category.id}
                                    className="w-full rounded justify-start mb-1 text-left md:text-lg lg:text-xl"
                                >
                                    {category.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>
                    <div className="w-4/5 flex-grow px-2 py-4">
                        {categories.map((category) => (
                            <TabsContent key={category.id} value={category.id}>
                                <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {category.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div>
        </Section>
    );
};

export default Categories;