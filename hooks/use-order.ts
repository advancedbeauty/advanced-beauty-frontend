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
                    // Ensure address is parsed or transformed before setting the state
                    const parsedOrders = result.orders?.map((order: any) => {
                        // If the address is stored as a string, parse it into the correct structure
                        if (typeof order.address === 'string') {
                            order.address = JSON.parse(order.address);
                        }

                        // Ensure other fields are properly mapped (e.g., orderItems)
                        order.orderItems = order.orderItems.map((item: any) => ({
                            ...item,
                            // Ensure itemType is properly typed
                            itemType: item.itemType as 'SERVICE' | 'SHOP',
                        }));

                        return order;
                    });

                    // Now we can safely cast to Order[]
                    setOrders(parsedOrders as Order[]);
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
