import { useState } from 'react';
import { createOrder, generateOrderNumber } from '@/actions/order/order.actions';
import { useCartStore } from '@/store/cart/cartStore';
import useCurrentUserStore from '@/store/auth/currentUserStore';
import { useOrderStore } from '@/store/store/order/orderStore';
import { toast } from 'react-hot-toast';
import { OrderData, OrderItem } from '@/types/order';
import { useCalculateTotals } from './use-calculateTotal';

export const useCreateOrder = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { cart, clearEntireCart } = useCartStore();
    const { currentUser } = useCurrentUserStore();
    const { setCurrentOrder } = useOrderStore();
    const totalPrice = useCalculateTotals();

    const processOrder = async (formData: any) => {
        if (!currentUser) {
            toast.error('Please log in to place an order');
            return false;
        }

        setIsLoading(true);

        try {
            // Generate order number
            const orderNumber = await generateOrderNumber();

            // Prepare order items
            const orderItems: OrderItem[] = cart.map((cartItem) => ({
                id: cartItem.id,
                itemId: cartItem.service?.id || cartItem.shop?.id || '',
                itemName: cartItem.service?.title || cartItem.shop?.title || '',
                itemImage: cartItem.service?.imageSrc || cartItem.shop?.imageSrc || '',
                itemType: cartItem.service ? 'SERVICE' : 'SHOP',
                quantity: cartItem.quantity,
                price: cartItem.service?.price || cartItem.shop?.price || 0,
                discount: cartItem.service?.discount || cartItem.shop?.discount || 0,
                finalPrice: Math.round(
                    (cartItem.service?.price || cartItem.shop?.price || 0) *
                        (1 - (cartItem.service?.discount || cartItem.shop?.discount || 0) / 100) *
                        cartItem.quantity
                ),
                appointmentDate: cartItem.appointmentDate,
                appointmentTime: cartItem.appointmentTime,
            }));

            // Calculate total amount
            const totalAmount = totalPrice.total;

            // Prepare order data
            const orderData: OrderData = {
                userId: currentUser.id || '',
                orderNumber,
                totalAmount,
                paymentStatus: 'PENDING',
                address: {
                    fullName: formData.fullName,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    addressLine1: formData.addressLine1,
                    addressLine2: formData.addressLine2,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    country: formData.country,
                },
                orderItems,
            };

            // Create order
            const result = await createOrder(orderData);

            if (result.success) {
                // Store current order in global state
                setCurrentOrder(orderData);

                // Clear cart
                clearEntireCart();

                // Show success toast
                toast.success('Order placed successfully!');

                return true;
            } else {
                toast.error('Failed to place order');
                return false;
            }
        } catch (error) {
            console.error('Order processing error:', error);
            toast.error('An unexpected error occurred');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { processOrder, isLoading };
};
