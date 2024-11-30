import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/formatPrice';
import { formatUrlString } from '@/lib/formatUrlString';
import WishlistButton from '../cart-btn/wishlist-btn';
import RemoveButton from '../cart-btn/remove-btn';
import { ServiceItem } from '@/types/service/service-item';
import { ShopItem } from '@/actions/admin/shop/shop-item.actions';
import { format } from 'date-fns';
import CartItemQuantity from '../cart-btn/cart-item-quantity';

interface CartItemProps {
    item: ServiceItem | ShopItem | null | undefined;
    selectedDate?: Date;
    selectedTime?: string;
    cartItemId?: string; // New prop to pass cart item ID
    quantity?: number; // New prop to pass quantity
}

const CartItem: React.FC<CartItemProps> = ({ item, selectedDate, selectedTime, cartItemId, quantity = 1 }) => {
    return (
        <>
            {item && (
                <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow duration-300 rounded">
                    <div className="flex flex-col md:flex-row gap-4">
                        <Link
                            href={`/${item.type == 'service' ? 'services' : 'shop'}/${formatUrlString(
                                item.category
                            )}/${formatUrlString(item.title)}`}
                            className="relative min-w-32 max-w-52 h-32 rounded-lg overflow-hidden group"
                        >
                            <Image
                                fill
                                src={item.imageSrc}
                                alt={item.title}
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                        </Link>
                        <div className="flex flex-col justify-between w-full">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Badge variant={`secondary`} className="flex items-center gap-1.5">
                                        <span className="capitalize font-medium">{item.type}</span>
                                    </Badge>
                                    <Badge variant="secondary" className="flex items-center gap-1.5">
                                        <span className="capitalize font-medium">{item.category}</span>
                                    </Badge>
                                </div>
                                <Link
                                    href={`/${item.type == 'service' ? 'services' : 'shop'}/${formatUrlString(
                                        item.category
                                    )}/${formatUrlString(item.title)}`}
                                    className="font-semibold text-lg md:text-xl capitalize transition-colors"
                                >
                                    {item.title}
                                </Link>

                                {selectedDate && selectedTime && (
                                    <div className="text-sm font-medium">
                                        <div>
                                            <span>Booking Date: {format(selectedDate, 'EEEE, d MMMM, yyyy')}</span>
                                        </div>
                                        <div>
                                            <span>Booking Time: {selectedTime}</span>
                                        </div>
                                    </div>
                                )}
                                <div className="flex flex-wrap items-baseline gap-3">
                                    {item.discount > 0 && (
                                        <span className="text-sm text-muted-foreground line-through">
                                            {formatPrice(item.price * quantity)}
                                        </span>
                                    )}
                                    <div className="font-semibold text-lg">
                                        {formatPrice(
                                            Math.round((item.price - (item.price * item.discount) / 100) * quantity)
                                        )}
                                    </div>
                                    {item.discount > 0 && (
                                        <span className="text-sm font-semibold text-green-600">
                                            {item.discount}% OFF
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-7 flex flex-wrap gap-4 items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <CartItemQuantity
                                listingId={item.id}
                                itemType={'service' || 'shop'}
                                cartItemId={cartItemId}
                                currentQuantity={quantity}
                                availableQuantity={'quantity' in item ? item.quantity : 25}
                            />
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <WishlistButton listingId={item.id} />
                            <RemoveButton listingId={item.id} />
                        </div>
                    </div>
                </Card>
            )}
        </>
    );
};

export default CartItem;
