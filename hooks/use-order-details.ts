import { useState, useEffect } from 'react';
import { Order, OrderStatus } from '@/types/order';
import { getOrderDetails } from '@/actions/order/order.actions';

export function useOrderDetails(orderId: string) {
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!orderId) {
            setError('Invalid order ID');
            setIsLoading(false);
            return;
        }

        const fetchOrderDetails = async () => {
            try {
                setIsLoading(true);
                const result = await getOrderDetails(orderId);

                if (result.success && result.order) {
                    // Parse the address from JSON string to object
                    const parsedAddress = JSON.parse(result.order.address);

                    // Ensure the status is correctly cast to OrderStatus
                    const orderWithCorrectStatus: Order = {
                        ...result.order,
                        status: result.order.status as OrderStatus,
                        address: parsedAddress, // Assign the parsed address
                    };
                    setOrder(orderWithCorrectStatus);
                } else {
                    setOrder(null); // Ensure order is set to null if not successful
                    setError(result.error || 'Order not found');
                }
            } catch (err) {
                setOrder(null); // Ensure order is set to null in case of an error
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    return { order, isLoading, error };
}