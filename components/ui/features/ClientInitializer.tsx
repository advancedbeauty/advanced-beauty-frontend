'use client';

import { useEffect } from 'react';
import useCurrentUserStore from '@/store/auth/currentUserStore';
import { User } from '@/actions/auth/getCurrentUser';
import { useCartStore } from '@/store/cart/cartStore';

export default function ClientInitializer({ initialUser }: { initialUser: User | null }) {
    const { setCurrentUser } = useCurrentUserStore();
    const { fetchCart } = useCartStore();

    useEffect(() => {
        setCurrentUser(initialUser);
        fetchCart();
    }, [initialUser, setCurrentUser, fetchCart]);

    return null;
}
