export interface OrderItem {
    id: string;
    itemId: string;
    itemName: string;
    itemImage: string;
    itemType: 'SERVICE' | 'SHOP';
    quantity: number;
    price: number;
    discount: number;
    finalPrice: number;
    appointmentDate?: Date | null;
    appointmentTime?: string | null;
}

export interface OrderData {
    userId: string;
    orderNumber: string;
    totalAmount: number;
    paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
    address: {
        fullName: string;
        email: string;
        phoneNumber: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        postalCode: string;
        country: string;
    };
    orderItems: OrderItem[];
}

export interface Order {
    id: string;
    userId: string;
    orderNumber: string;
    status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED';
    totalAmount: number;
    paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
    address: {
        fullName: string;
        email: string;
        phoneNumber: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        postalCode: string;
        country: string;
    };
    orderItems: OrderItem[];
    createdAt: Date;
    user?: {
        name: string | null;
        email: string | null;
    };
}

export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED',
    DELIVERED = 'DELIVERED',
}

// Utility function to convert Prisma order to our Order type
export function convertPrismaOrderToOrder(prismaOrder: any): Order {
    return {
        id: prismaOrder.id,
        userId: prismaOrder.userId,
        orderNumber: prismaOrder.orderNumber,
        status: prismaOrder.status,
        totalAmount: prismaOrder.totalAmount,
        paymentStatus: prismaOrder.paymentStatus,
        address: JSON.parse(prismaOrder.address),
        orderItems: prismaOrder.orderItems.map((item: any) => ({
            id: item.id,
            itemId: item.itemId,
            itemType: item.itemType,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount,
            finalPrice: item.finalPrice,
            appointmentDate: item.appointmentDate,
            appointmentTime: item.appointmentTime,
        })),
        createdAt: prismaOrder.createdAt,
        user: prismaOrder.user,
    };
}
