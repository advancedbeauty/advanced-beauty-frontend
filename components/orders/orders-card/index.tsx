import React from 'react';
import { Order } from '@/types/order';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/formatPrice';
import { formatDistance } from 'date-fns';

interface OrderCardProps {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const statusVariants = {
        PENDING: 'secondary',
        CONFIRMED: 'default',
        PROCESSING: 'primary',
        COMPLETED: 'success',
        CANCELLED: 'destructive',
        REFUNDED: 'outline',
    };

    const paymentStatusVariants = {
        PENDING: 'warning',
        COMPLETED: 'success',
        FAILED: 'destructive',
        REFUNDED: 'outline',
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4 border">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold">Order #{order.orderNumber}</h3>
                    <p className="text-sm text-gray-500">
                        Placed {formatDistance(new Date(order.createdAt), new Date(), { addSuffix: true })}
                    </p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                    <Badge variant={statusVariants[order.status]}>{order.status}</Badge>
                    <Badge variant={paymentStatusVariants[order.paymentStatus]}>{order.paymentStatus}</Badge>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <h4 className="font-medium mb-2">Order Items</h4>
                    {order.orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm mb-1 py-1 border-b last:border-b-0">
                            <span>
                                {item.itemType} x {item.quantity}
                            </span>
                            <span>{formatPrice(item.finalPrice)}</span>
                        </div>
                    ))}
                </div>

                <div>
                    <h4 className="font-medium mb-2">Order Summary</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>{formatPrice(order.totalAmount)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Total Discount</span>
                            <span className="text-green-600">
                                - {formatPrice(order.orderItems.reduce((sum, item) => sum + item.discount, 0))}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold border-t pt-2">
                            <span>Total Amount</span>
                            <span>{formatPrice(order.totalAmount)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                    View Details
                </Button>
                {order.status === 'PENDING' && (
                    <Button variant="destructive" size="sm">
                        Cancel Order
                    </Button>
                )}
            </div>
        </div>
    );
};

export default OrderCard;
