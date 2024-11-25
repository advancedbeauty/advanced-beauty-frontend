'use server';

import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '../auth/getCurrentUser';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function addToCart(listingId: string) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return { success: false, error: 'Not logged in' };
    }

    if (!listingId || typeof listingId !== 'string') {
        return { success: false, error: 'Invalid ID' };
    }

    try {
        const user = await prisma.user.update({
            where: { id: currentUser.id },
            data: {
                cartIds: {
                    push: listingId,
                },
            },
        });

        revalidatePath('/cart');
        return { success: true, cartIds: user.cartIds };
    } catch (error) {
        console.error('Failed to add item to cart:', error);
        return { success: false, error: 'Failed to add item to cart' };
    }
}

export async function removeFromCart(listingId: string) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return { success: false, error: 'Not logged in' };
    }

    if (!listingId || typeof listingId !== 'string') {
        return { success: false, error: 'Invalid ID' };
    }

    try {
        const user = await prisma.user.update({
            where: { id: currentUser.id },
            data: {
                cartIds: {
                    set: currentUser?.cartIds?.filter((id) => id !== listingId),
                },
            },
        });

        revalidatePath('/cart');
        return { success: true, cartIds: user.cartIds };
    } catch (error) {
        console.error('Failed to remove item from cart:', error);
        return { success: false, error: 'Failed to remove item from cart' };
    }
}

export async function getCartItems() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return {
                success: false,
                error: 'Not logged in',
                items: [],
            };
        }

        // Fetch all items in parallel
        const [serviceItems, shopItems] = await Promise.all([
            prisma.service.findMany({
                where: {
                    id: {
                        in: currentUser.cartIds,
                    },
                },
                select: {
                    id: true,
                    imageSrc: true,
                    category: true,
                    title: true,
                    description: true,
                    price: true,
                    discount: true,
                    otherInfo: true,
                },
            }),
            prisma.shop.findMany({
                where: {
                    id: {
                        in: currentUser.cartIds,
                    },
                },
                select: {
                    id: true,
                    imageSrc: true,
                    category: true,
                    title: true,
                    description: true,
                    price: true,
                    discount: true,
                    quantity: true,
                    otherInfo: true,
                },
            }),
        ]);

        // Transform and combine items
        const transformedItems = [
            ...serviceItems.map((item) => ({
                ...item,
                type: 'service' as const,
            })),
            ...shopItems.map((item) => ({
                ...item,
                type: 'shop' as const,
            })),
        ];

        return {
            success: true,
            items: transformedItems,
            cartIds: currentUser.cartIds,
        };
    } catch (error) {
        console.error('Failed to fetch cart items:', error);
        return {
            success: false,
            error: 'Failed to fetch cart items',
            items: [],
        };
    }
}
