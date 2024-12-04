'use client';

import { useState, useEffect } from 'react';
import { Order } from '@/types/order';
import { getOrders } from '@/actions/order/order.actions';

export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchOrders() {
            try {
                setIsLoading(true);
                const result = await getOrders();

                if (result.success) {
                    setOrders(result.orders as Order[]);
                } else {
                    setError(result.error as string);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            } finally {
                setIsLoading(false);
            }
        }

        fetchOrders();
    }, []);

    return { orders, isLoading, error };
}
