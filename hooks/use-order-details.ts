import { useState, useEffect } from 'react';
import { Order } from '@/types/order';
import { getOrderDetails } from '@/actions/order/order.actions';

export function useOrderDetails(orderId: string) {
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchOrderDetails() {
            try {
                setIsLoading(true);
                const result = await getOrderDetails(orderId);

                if (result.success) {
                    setOrder(result.order);
                } else {
                    setError(result.error as string);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            } finally {
                setIsLoading(false);
            }
        }

        fetchOrderDetails();
    }, [orderId]);

    return { order, isLoading, error };
}
