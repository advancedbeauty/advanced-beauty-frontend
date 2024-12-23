'use client';

import React from 'react';
import { Order, OrderStatus } from '@/types/order';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/formatPrice';
import Link from 'next/link';
import Image from 'next/image';
import { formatUrlString } from '@/lib/formatUrlString';
import { Card } from '@/components/ui/card';
import { useUpdateOrderStatus } from '@/hooks/use-update-order-status';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface OrderCardProps {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const { updateOrderStatus, isLoading } = useUpdateOrderStatus();

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.PENDING:
                return 'bg-yellow-100 text-yellow-800';
            case OrderStatus.ACCEPTED:
                return 'bg-blue-100 text-blue-800';
            case OrderStatus.COMPLETED:
                return 'bg-green-100 text-green-800';
            case OrderStatus.CANCELLED:
                return 'bg-red-100 text-red-800';
            case OrderStatus.REFUNDED:
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleCancelOrder = async () => {
        await updateOrderStatus(order.id, OrderStatus.CANCELLED);
    };

    return (
        <Card className="divide-y divide-gray-200">
            <div className="p-4 flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-500">Order #{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <Badge className={`${getStatusColor(order.status)} px-3 py-1`}>{order.status.replace(/_/g, ' ')}</Badge>
            </div>

            {order.orderItems.map((item) => (
                <div key={item.id} className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <Link
                        href={`/${item.itemType === 'SERVICE' ? 'services' : 'shop'}/${formatUrlString(
                            item.itemType
                        )}/${formatUrlString(item.itemName)}`}
                        className="relative w-full md:w-48 h-48 md:h-32 rounded-lg overflow-hidden group"
                    >
                        <Image
                            fill
                            src={item.itemImage}
                            alt={item.itemName}
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 space-y-4">
                        <div className="flex justify-between">
                            <div>
                                <Link
                                    href={`/${item.itemType === 'SERVICE' ? 'services' : 'shop'}/${formatUrlString(
                                        item.itemType
                                    )}/${formatUrlString(item.itemName)}`}
                                    className="text-lg font-semibold capitalize hover:underline"
                                >
                                    {item.itemName}
                                </Link>
                                <p className="text-sm text-gray-500">
                                    <span className="font-semibold">Quantity: </span>
                                    {item.quantity}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-semibold">Price: </span>
                                    {formatPrice(item.price)}
                                </p>
                                {item.discount > 0 && (
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">Discount: </span>
                                        {item.discount}%
                                    </p>
                                )}
                                <p className="text-sm font-semibold">
                                    <span className="font-semibold">Final Price: </span>
                                    {formatPrice(item.finalPrice)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Actions */}
            <div className="p-4 flex justify-between items-center">
                <div className="text-lg font-semibold">Total: {formatPrice(order.totalAmount)}</div>
                <div className="space-x-3">
                    {order.status !== OrderStatus.COMPLETED &&
                        order.status !== OrderStatus.CANCELLED &&
                        order.status !== OrderStatus.REFUNDED && (
                            <>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/orders/${order.id}`}>View Details</Link>
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm" disabled={isLoading}>
                                            Cancel Order
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to cancel this order? This action cannot be
                                                undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>No, keep order</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleCancelOrder} disabled={isLoading}>
                                                Yes, cancel order
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </>
                        )}
                </div>
            </div>
        </Card>
    );
};

export default OrderCard;
