'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useOrderDetails } from '@/hooks/use-order-details';
import { formatPrice } from '@/lib/formatPrice';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OrderStatus } from '@/types/order';

const OrderDetailsPage = () => {
    const params = useParams();
    const orderId = Array.isArray(params.orderId) ? params.orderId[0] : params.orderId;

    const { order, isLoading, error } = useOrderDetails(orderId || '');

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!order) {
        return <div>Order not found</div>;
    }

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

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>
            <Card className="divide-y divide-gray-200">
                <div className="p-4 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Order #{order.orderNumber}</p>
                        <p className="text-sm text-gray-500">
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} px-3 py-1`}>
                        {order.status.replace(/_/g, ' ')}
                    </Badge>
                </div>

                {order.orderItems.map((item) => (
                    <div key={item.id} className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-4">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-lg font-semibold capitalize">{item.itemName}</p>
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

                <div className="p-4 flex justify-between items-center">
                    <div className="text-lg font-semibold">Total: {formatPrice(order.totalAmount)}</div>
                    <Button variant="outline" size="sm">
                        Download Bill
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default OrderDetailsPage;
