'use client';

import { useState } from 'react';
import { OrderStatus } from '@/types/order';
import { updateOrderStatus as updateOrderStatusAction } from '@/actions/order/order.actions';
import { toast } from 'react-hot-toast';

export const useUpdateOrderStatus = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateOrderStatus = async (orderId: string, status: OrderStatus, note?: string) => {
        try {
            setIsLoading(true);
            const result = await updateOrderStatusAction(orderId, status);
            
            if (result.success) {
                toast.success('Order status updated successfully');
                return true;
            } else {
                toast.error(result.error || 'Failed to update order status');
                return false;
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('An unexpected error occurred');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { updateOrderStatus, isLoading };
}; 