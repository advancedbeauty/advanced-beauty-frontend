'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/formatPrice';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePathname } from 'next/navigation';

interface PriceDetailsProps {
    subtotal: number;
    totalDiscount: number;
    shippingFee: number;
    total: number;
}

const PriceDetails: React.FC<PriceDetailsProps> = ({ subtotal, totalDiscount, shippingFee, total }) => {
    const pathname = usePathname();
    console.log(pathname);
    return (
        <div className="sticky top-4 rounded border bg-white">
            <CardHeader className="!p-4">
                <CardTitle className="uppercase text-lg text-gray-600">Price Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 border-y !p-4">
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
                        <span>Total Payable</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                </div>
                {pathname == '/cart' && (
                    <>
                        <Link href={'/checkout'}>
                            <Button
                                className="w-full bg-[#D9C1A3] hover:bg-[#c4ac8e] text-neutral-950 mt-6 font-medium"
                                size="lg"
                            >
                                Proceed to checkout
                            </Button>
                        </Link>
                        <div className="flex gap-2">
                            <Link href="/#shopSectionHome" className="flex-1">
                                <Button variant="outline" className="w-full gap-2 font-medium">
                                    <ShoppingCart className="h-4 w-4" />
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </CardContent>
            {totalDiscount > 0 && (
                <div className="font-semibold text-green-700 p-4">You will save ₹{totalDiscount} on this order</div>
            )}
        </div>
    );
};

export default PriceDetails;
