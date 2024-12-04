'use server';

import { prisma } from '@/lib/prisma';
import { OrderData } from '@/types/order';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getCurrentUser } from '../auth/getCurrentUser';
import { auth } from '@/auth';

// Validation Schema
const OrderSchema = z.object({
    userId: z.string(),
    orderNumber: z.string(),
    totalAmount: z.number().positive(),
    paymentStatus: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED']),
    address: z.object({
        fullName: z.string().min(2),
        email: z.string().email(),
        phoneNumber: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
        addressLine1: z.string().min(5),
        addressLine2: z.string().optional(),
        city: z.string(),
        postalCode: z.string().regex(/^[1-9][0-9]{5}$/, 'Invalid postal code'),
        country: z.string(),
    }),
    orderItems: z.array(
        z.object({
            itemId: z.string(),
            itemType: z.enum(['SERVICE', 'SHOP']),
            quantity: z.number().positive(),
            price: z.number().positive(),
            discount: z.number().min(0),
            finalPrice: z.number().positive(),
            appointmentDate: z.date().optional(),
            appointmentTime: z.string().optional(),
        })
    ),
});

export async function createOrder(orderData: OrderData) {
    try {
        // Validate order data
        const validatedOrder = OrderSchema.parse(orderData);

        // Start a transaction
        const order = await prisma.$transaction(async (prisma) => {
            // Create order
            const newOrder = await prisma.order.create({
                data: {
                    userId: validatedOrder.userId,
                    orderNumber: validatedOrder.orderNumber,
                    status: 'PENDING',
                    totalAmount: validatedOrder.totalAmount,
                    paymentStatus: validatedOrder.paymentStatus,
                    address: JSON.stringify(validatedOrder.address),
                    orderItems: {
                        create: validatedOrder.orderItems.map((item) => ({
                            itemId: item.itemId,
                            itemType: item.itemType,
                            quantity: item.quantity,
                            price: item.price,
                            discount: item.discount,
                            finalPrice: item.finalPrice,
                            appointmentDate: item.appointmentDate,
                            appointmentTime: item.appointmentTime,
                        })),
                    },
                },
            });

            // Update inventory for shop items
            for (const item of validatedOrder.orderItems) {
                if (item.itemType === 'SHOP') {
                    await prisma.shop.update({
                        where: { id: item.itemId },
                        data: { quantity: { decrement: item.quantity } },
                    });
                }
            }

            // Clear user's cart
            await prisma.cart.deleteMany({
                where: { userId: validatedOrder.userId },
            });

            return newOrder;
        });

        // Revalidate paths
        revalidatePath('/orders');
        revalidatePath('/account');

        return {
            success: true,
            order: order,
        };
    } catch (error) {
        console.error('Order creation error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
}

export async function generateOrderNumber() {
    // Generate a unique order number
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `ORDER-${timestamp}-${randomStr}`;
}

export async function getOrders() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            throw new Error('You must be logged in to clear cart');
        }

        const orders = await prisma.order.findMany({
            where: { userId: session.user.id },
            include: { orderItems: true },
            orderBy: { createdAt: 'desc' },
        });

        return {
            success: true,
            orders: orders,
        };
    } catch (error) {
        console.error('Error fetching orders:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
}
