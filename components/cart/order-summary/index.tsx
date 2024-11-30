import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/formatPrice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderSummaryProps {
    subtotal: number;
    totalDiscount: number;
    shippingFee: number;
    total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, totalDiscount, shippingFee, total }) => {
    return (
        <Card className="sticky top-4">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Order Summary
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-{formatPrice(totalDiscount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <div className="flex items-center gap-1">
                            {shippingFee === 0 ? (
                                <>
                                    <span className="text-green-600">Free</span>
                                    <Badge variant="secondary" className="text-xs">
                                        Orders over {formatPrice(1000)}
                                    </Badge>
                                </>
                            ) : (
                                formatPrice(shippingFee)
                            )}
                        </div>
                    </div>
                </div>
                <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                </div>
                <Button className="w-full bg-[#D9C1A3] hover:bg-[#c4ac8e] text-neutral-950 mt-6" size="lg">
                    Place Order
                </Button>
                <div className="flex gap-2">
                    <Link href="/" className="flex-1">
                        <Button variant="outline" className="w-full gap-2">
                            <ShoppingCart className="h-4 w-4" />
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
                {totalDiscount > 0 && (
                    <div className="border-t pt-4 font-semibold text-green-700">
                        You will save ₹{totalDiscount} on this order
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default OrderSummary;
