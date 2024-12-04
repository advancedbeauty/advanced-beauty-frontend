import { useCartStore } from '@/store/cart/cartStore';

export const useCalculateTotals = () => {
    const { cart, offerCode } = useCartStore();

    const calculateTotals = () => {
        const subtotal = cart.reduce((sum, item) => {
            const price = item.service?.price || item.shop?.price || 0;
            return sum + price * item.quantity;
        }, 0);

        const offerCodeDiscount = Math.min(
            (subtotal * (offerCode?.discountPercentage || 0)) / 100,
            offerCode?.discountAmount || 0
        );

        let totalDiscount = cart.reduce((sum, item) => {
            const price = item.service?.price || item.shop?.price || 0;
            const discount = item.service?.discount || item.shop?.discount || 0;
            return sum + ((price * item.quantity * discount) / 100);
        }, 0);

        totalDiscount = totalDiscount+offerCodeDiscount;

        const shippingFee = subtotal > 1000 ? 100 : 150;
        const total = Math.round(subtotal - totalDiscount + shippingFee);

        return {
            subtotal: Math.round(subtotal),
            totalDiscount: Math.round(totalDiscount),
            shippingFee,
            total,
        };
    };

    return calculateTotals();
};
