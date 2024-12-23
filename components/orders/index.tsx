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
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredOrders = orders.filter((order) =>
        order.orderItems.some(
            (item) =>
                item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <Section className="py-10 md:py-20">
            <Container className="w-full">
                <div className="flex items-center justify-between flex-wrap mb-8">
                    <MainTitle heading="My Orders" subheading="View and manage your recent purchases" />
                    <Button asChild>
                        <Link href="/services">Continue Shopping</Link>
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
                    <div className="text-center space-y-4 space-x-4 mt-20">
                        <p className="text-gray-500">You haven&apos;t booked any services or buy an item yet.</p>
                        <Button asChild>
                            <Link href="/services">Book services now</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/shop">Explore shope items</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search orders by product name or order number..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                            />
                            <svg
                                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        {filteredOrders.length === 0 ? (
                            <div className="text-center space-y-4 mt-8">
                                <p className="text-gray-500">No orders found matching &quot;{searchQuery}&quot;</p>
                                <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
                            </div>
                        ) : (
                            filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
                        )}
                    </div>
                )}
            </Container>
        </Section>
    );
};

export default OrdersPage;
