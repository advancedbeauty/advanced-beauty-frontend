import { useEffect, useState, useCallback, useRef } from 'react';
import { getCartItems } from '@/actions/cart/cart.actions';
import useCartStore from '@/store/cart/cartStore';
import { toast } from 'react-hot-toast';
import { CartItem } from '@/types/cart';

const useCartItems = () => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { cartIds } = useCartStore();
    // const prevCartIdsRef = useRef<string[]>([]);
    const isMounted = useRef(false);

    const fetchCartItems = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await getCartItems();

            if (!response.success) {
                toast.error(response.error || 'Failed to fetch cart items');
                return;
            }

            setItems(response.items);

            // if (JSON.stringify(response.cartIds) !== JSON.stringify(cartIds)) {
            //     setCartIds(response.cartIds || []);
            // }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            toast.error('Failed to load cart items');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isMounted.current) {
            fetchCartItems();
            isMounted.current = true;
        }
    }, [fetchCartItems]);

    useEffect(() => {
        // if (isMounted.current && JSON.stringify(prevCartIdsRef.current) !== JSON.stringify(cartIds)) {
        //     prevCartIdsRef.current = cartIds;
        //     fetchCartItems();
        // }
        setItems(prevItems => prevItems.filter(item => cartIds.includes(item.id)))
    }, [cartIds]);

    return {
        items,
        isLoading,
        refreshItems: fetchCartItems,
    };
};

export default useCartItems;
