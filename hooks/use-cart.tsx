import { useCallback, useEffect, useMemo, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/cart/cartStore';
import useCurrentUserStore from '@/store/auth/currentUserStore';
import { addToCart, removeFromCart } from '@/actions/cart/cart.actions';

interface UseCartProps {
    listingId: string;
}

const useCart = ({ listingId }: UseCartProps) => {
    const router = useRouter();
    const { currentUser } = useCurrentUserStore();
    const { cartIds, setCartIds, addItem, removeItem } = useCartStore();
    const initialSyncDone = useRef(false);

    useEffect(() => {
        if (currentUser?.cartIds && !initialSyncDone.current) {
            setCartIds(currentUser.cartIds);
            initialSyncDone.current = true;
        }
    }, [currentUser?.cartIds, setCartIds]);

    const hasCarted = useMemo(() => {
        return cartIds.includes(listingId);
    }, [cartIds, listingId]);

    const toggleCart = useCallback(
        async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            if (!currentUser) {
                return router.push('/auth');
            }
            try {
                if (hasCarted) {
                    removeItem(listingId);
                    const result = await removeFromCart(listingId);
                    if (!result.success) {
                        addItem(listingId);
                        toast.error(result.error || 'Failed to remove from cart');
                        return;
                    }
                    toast.success('Removed from cart');
                } else {
                    addItem(listingId);
                    const result = await addToCart(listingId);
                    if (!result.success) {
                        removeItem(listingId);
                        toast.error(result.error || 'Failed to add to cart');
                        return;
                    }
                    toast.success('Added to cart');
                }
            } catch (error) {
                hasCarted ? addItem(listingId) : removeItem(listingId);
                toast.error('Something went wrong');
            }
        },
        [currentUser, hasCarted, listingId, router, addItem, removeItem]
    );

    return { hasCarted, toggleCart };
};

export default useCart;
