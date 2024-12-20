import React from 'react';
import { Order } from '@/types/order';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/formatPrice';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import { formatUrlString } from '@/lib/formatUrlString';
import { Card } from '@/components/ui/card';

interface OrderCardProps {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    return (
        <Card className="divide-y divide-gray-200">
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
                                    <span className="font-semibold">Order Date: </span>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-semibold">Quantity: </span>
                                    {item.quantity}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-semibold">Discount: </span>
                                    {item.quantity}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-semibold">Total price: </span>
                                    {item.finalPrice}
                                </p>
                            </div>
                            <Badge
                                className={`
                                ${order.status === 'COMPLETED' && 'bg-green-100 text-green-800'}
                                ${order.status === 'PENDING' && 'bg-yellow-100 text-yellow-800'}
                                ${order.status === 'CANCELLED' && 'bg-red-100 text-red-800'}
                                ${order.status === 'PROCESSING' && 'bg-blue-100 text-blue-800'}
                                ${order.status === 'CONFIRMED' && 'bg-purple-100 text-purple-800'}
                                ${order.status === 'REFUNDED' && 'bg-gray-100 text-gray-800'}
                                rounded-full p-2 h-fit
                            `}
                            >
                                {order.status}
                            </Badge>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-3">
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
                </div>
            ))}
        </Card>
    );
};

export default OrderCard;
