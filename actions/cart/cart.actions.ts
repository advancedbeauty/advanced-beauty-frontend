'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addToCart(
    itemId: string,
    itemType: 'service' | 'shop',
    quantity: number = 1,
    appointmentDate?: Date,
    appointmentTime?: string
) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('You must be logged in to add items to cart');
    }

    // Find or create user's cart
    let cart = await prisma.cart.findFirst({
        where: { userId: session.user.id },
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: { userId: session.user.id },
        });
    }

    // Check if item already exists in cart
    const existingCartItem = await prisma.cartItem.findFirst({
        where: {
            cartId: cart.id,
            itemId: itemId,
        },
    });

    if (existingCartItem) {
        // Update existing cart item
        await prisma.cartItem.update({
            where: { id: existingCartItem.id },
            data: {
                quantity: existingCartItem.quantity + quantity,
                ...(appointmentDate && { appointmentDate }),
                ...(appointmentTime && { appointmentTime }),
            },
        });
    } else {
        // Create new cart item
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                itemId,
                quantity,
                ...(appointmentDate && { appointmentDate }),
                ...(appointmentTime && { appointmentTime }),
            },
        });
    }

    revalidatePath('/cart');
}

export async function removeFromCart(cartItemId: string) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('You must be logged in to modify cart');
    }

    await prisma.cartItem.delete({
        where: {
            id: cartItemId,
        },
    });

    revalidatePath('/cart');
}

export async function updateCartItemQuantity(cartItemId: string, quantity: number) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('You must be logged in to modify cart');
    }

    if (quantity <= 0) {
        await removeFromCart(cartItemId);
        return;
    }

    await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
    });

    revalidatePath('/cart');
}

export async function getCart() {
    const session = await auth();

    if (!session?.user?.id) {
        return null;
    }
    
    const cart = await prisma.cart.findFirst({
        where: { userId: session.user.id },
        include: {
            cartItem: {
                include: {
                    service: true,
                    shop: true,
                },
            },
        },
    });

    return cart;
}

export async function clearCart() {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('You must be logged in to clear cart');
    }

    const cart = await prisma.cart.findFirst({
        where: { userId: session.user.id },
    });

    if (cart) {
        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id },
        });
    }

    revalidatePath('/cart');
}
