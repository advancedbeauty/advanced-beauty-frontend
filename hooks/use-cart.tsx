import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart/cartStore';
import useCurrentUserStore from '@/store/auth/currentUserStore';

interface UseCartProps {
    listingId: string;
    itemType?: 'service' | 'shop';
    quantity?: number;
    appointmentDate?: Date;
    appointmentTime?: string;
}

const useCart = ({ listingId, itemType = 'shop', quantity = 1, appointmentDate, appointmentTime }: UseCartProps) => {
    const { currentUser } = useCurrentUserStore();
    const router = useRouter();
    const { cart, addItem, removeItem } = useCartStore();

    const hasCarted = useMemo(() => {
        return cart.some((item) => item.itemId === listingId);
    }, [cart, listingId]);

    const toggleCart = useCallback(
        async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            if (!currentUser) {
                return router.push('/auth');
            }
            try {
                if (hasCarted) {
                    const cartItemToRemove = cart.find((item) => item.itemId === listingId);

                    if (cartItemToRemove) {
                        await removeItem(cartItemToRemove.id);
                        toast.success('Removed from cart');
                    }
                } else {
                    await addItem(listingId, itemType, quantity, appointmentDate, appointmentTime);
                    toast.success('Added to cart');
                }
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Something went wrong');
            }
        },
        [hasCarted, listingId, cart, addItem, removeItem, itemType, quantity, appointmentDate, appointmentTime]
    );

    return { hasCarted, toggleCart };
};

export default useCart;
