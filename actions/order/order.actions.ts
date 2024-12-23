'use server';

import { prisma } from '@/lib/prisma';
import { OrderData } from '@/types/order';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth';
import { OrderStatus, PaymentStatus } from '@prisma/client';

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
            itemName: z.string(),
            itemImage: z.string(),
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
        const validatedOrder = OrderSchema.parse(orderData);

        const order = await prisma.$transaction(async (prisma) => {
            const newOrder = await prisma.order.create({
                data: {
                    userId: validatedOrder.userId,
                    orderNumber: validatedOrder.orderNumber,
                    status: OrderStatus.PENDING,
                    totalAmount: validatedOrder.totalAmount,
                    paymentStatus: validatedOrder.paymentStatus,
                    address: JSON.stringify(validatedOrder.address),
                    orderItems: {
                        create: validatedOrder.orderItems.map((item) => ({
                            itemId: item.itemId,
                            itemName: item.itemName,
                            itemImage: item.itemImage,
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

            for (const item of validatedOrder.orderItems) {
                if (item.itemType === 'SHOP') {
                    await prisma.shop.update({
                        where: { id: item.itemId },
                        data: { quantity: { decrement: item.quantity } },
                    });
                }
            }

            await prisma.cart.deleteMany({
                where: { userId: validatedOrder.userId },
            });

            return newOrder;
        });

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
            include: {
                orderItems: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
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

// Type for order statistics
interface OrderStats {
    total: number;
    pending: number;
    processing: number;
    completed: number;
    cancelled: number;
    refunded: number;
    totalRevenue: number;
    todayRevenue: number;
}

// Get all orders with filtering and pagination
export async function getAdminOrders(params: {
    query?: string;
    status?: OrderStatus;
    page?: number;
    limit?: number;
    startDate?: Date;
    endDate?: Date;
}) {
    try {
        const { query, status, page = 1, limit = 10, startDate, endDate } = params;

        // Build where clause
        const where: any = {};

        if (query) {
            where.OR = [
                { orderNumber: { contains: query, mode: 'insensitive' } },
                { user: { name: { contains: query, mode: 'insensitive' } } },
                { user: { email: { contains: query, mode: 'insensitive' } } },
            ];
        }

        if (status) {
            where.status = status;
        }

        if (startDate && endDate) {
            where.createdAt = {
                gte: startDate,
                lte: endDate,
            };
        }

        // Get total count
        const totalOrders = await prisma.order.count({ where });

        // Get orders
        const orders = await prisma.order.findMany({
            where,
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                orderItems: true,
            },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            success: true,
            orders,
            pagination: {
                total: totalOrders,
                pages: Math.ceil(totalOrders / limit),
                page,
                limit,
            },
        };
    } catch (error) {
        console.error('Error fetching admin orders:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
}

// Get order statistics
export async function getOrderStats() {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [total, pending, processing, completed, cancelled, refunded, totalRevenue, todayRevenue] =
            await Promise.all([
                prisma.order.count(),
                prisma.order.count({ where: { status: OrderStatus.PENDING } }),
                prisma.order.count({ where: { status: OrderStatus.ACCEPTED } }),
                prisma.order.count({ where: { status: OrderStatus.COMPLETED } }),
                prisma.order.count({ where: { status: OrderStatus.CANCELLED } }), // Updated line
                prisma.order.count({ where: { status: OrderStatus.REFUNDED } }),
                prisma.order.aggregate({
                    where: { status: OrderStatus.COMPLETED },
                    _sum: { totalAmount: true },
                }),
                prisma.order.aggregate({
                    where: {
                        status: OrderStatus.COMPLETED,
                        createdAt: { gte: today },
                    },
                    _sum: { totalAmount: true },
                }),
            ]);

        const stats: OrderStats = {
            total,
            pending,
            processing,
            completed,
            cancelled,
            refunded,
            totalRevenue: totalRevenue._sum.totalAmount || 0,
            todayRevenue: todayRevenue._sum.totalAmount || 0,
        };

        return { success: true, stats };
    } catch (error) {
        console.error('Error fetching order stats:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: OrderStatus, paymentStatus?: PaymentStatus) {
    try {
        const updateData: any = { status };
        if (paymentStatus) {
            updateData.paymentStatus = paymentStatus;
        }

        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: updateData,
            include: {
                orderItems: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        revalidatePath('/admin/manage/orders');

        return { success: true, order: updatedOrder };
    } catch (error) {
        console.error('Error updating order status:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
}

// Get order details
export async function getOrderDetails(orderId: string) {
    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                orderItems: true,
            },
        });

        if (!order) {
            throw new Error('Order not found');
        }

        return { success: true, order };
    } catch (error) {
        console.error('Error fetching order details:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
}

// Delete order (soft delete or hard delete based on your requirements)
export async function deleteOrder(orderId: string) {
    try {
        await prisma.order.delete({
            where: { id: orderId },
        });

        revalidatePath('/admin/manage/orders');

        return { success: true };
    } catch (error) {
        console.error('Error deleting order:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
}

// Export orders (for CSV/Excel download)
export async function exportOrders(startDate?: Date, endDate?: Date) {
    try {
        const where: any = {};
        if (startDate && endDate) {
            where.createdAt = {
                gte: startDate,
                lte: endDate,
            };
        }

        const orders = await prisma.order.findMany({
            where,
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                orderItems: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        // Transform orders into a format suitable for export
        const exportData = orders.map((order) => ({
            orderNumber: order.orderNumber,
            customerName: order.user.name,
            customerEmail: order.user.email,
            totalAmount: order.totalAmount,
            status: order.status,
            paymentStatus: order.paymentStatus,
            items: order.orderItems.length,
            createdAt: order.createdAt.toISOString(),
            updatedAt: order.updatedAt.toISOString(),
        }));

        return { success: true, data: exportData };
    } catch (error) {
        console.error('Error exporting orders:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
}
