'use client';

import React from 'react';
import Section from '@/components/ui/features/Section';
import Container from '@/components/ui/features/Container';
import MainTitle from '@/components/ui/title/main-title';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useOrders } from '@/hooks/use-order';
import OrderCard from './orders-card';

const OrdersPage = () => {
    const { orders, isLoading, error } = useOrders();

    return (
        <Section className="py-10 md:py-20">
            <Container className="w-full">
                <div className="flex items-center justify-between flex-wrap mb-8">
                    <MainTitle heading="My Orders" subheading="View and manage your recent purchases" />
                    <Button asChild>
                        <Link href="/shop">Continue Shopping</Link>
                    </Button>
                </div>

                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, index) => (
                            <Skeleton key={index} className="h-40 w-full" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500">
                        {error}
                        <Button onClick={() => window.location.reload()} className="mt-4">
                            Retry
                        </Button>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center space-y-4">
                        <p className="text-gray-500">You haven&apos;t placed any orders yet.</p>
                        <Button asChild>
                            <Link href="/shop">Shop Now</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </Container>
        </Section>
    );
};

export default OrdersPage;
