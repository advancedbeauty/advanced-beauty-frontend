import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ServiceTab = () => {
    return (
        <Tabs defaultValue="best" className="w-full flex flex-col gap-5 items-center">
            <TabsList className="grid w-full grid-cols-4 bg-transparent max-w-[600px] gap-10">
                <TabsTrigger value="best" className="bg-transparent text-lg">
                    Best Seller
                </TabsTrigger>
                <TabsTrigger value="booking" className="bg-transparent text-lg">
                    Booking
                </TabsTrigger>
                <TabsTrigger value="bridal" className="bg-transparent text-lg">
                    Bridal
                </TabsTrigger>
                <TabsTrigger value="new" className="bg-transparent text-lg">
                    New
                </TabsTrigger>
            </TabsList>
            <TabsContent value="best" className="w-full">
                best
            </TabsContent>
            <TabsContent value="booking" className="w-full">
                booking
            </TabsContent>
            <TabsContent value="bridal" className="w-full">
                bridal
            </TabsContent>
            <TabsContent value="new" className="w-full">
                new
            </TabsContent>
        </Tabs>
    );
};

export default ServiceTab;
