'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useOrderStore } from '@/store/store/order/orderStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

const OrderConfirmationPage = () => {
    const { currentOrder } = useOrderStore();
    const router = useRouter(); 
    const [isClient, setIsClient] = useState(false);

    // Use useLayoutEffect for initial client-side render check
    useLayoutEffect(() => {
        setIsClient(true);
    }, []);

    // Redirect logic
    useEffect(() => {
        // Only set up redirect if we're on the client and have a current order
        if (!isClient || !currentOrder) {
            return;
        }

        // Redirect immediately if no current order
        if (!currentOrder) {
            router.push('/');
            return;
        }

        // Countdown timer for automatic redirect
        const timer = setTimeout(() => {
            router.push('/orders');
        }, 7000);

        return () => clearTimeout(timer);
    }, [currentOrder, router, isClient]);

    // If no current order or not client-side, return null
    if (!isClient || !currentOrder) {
        return null;
    }

    return (
        <div className="container mx-auto p-6 flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-2xl">
                <CardHeader className="space-y-2">
                    <CardTitle className="flex items-center text-green-600">
                        <CheckCircle2 className="mr-2 h-6 w-6" />
                        Order Confirmed
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert variant="default">
                        <AlertTitle>Thank You, {currentOrder.address.fullName}!</AlertTitle>
                        <AlertDescription>
                            Your order <span className="font-bold">{currentOrder.orderNumber}</span> has been placed
                            successfully.
                        </AlertDescription>
                    </Alert>

                    <div className="bg-white border rounded-lg p-4 space-y-2">
                        <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
                        <div className="text-gray-700">
                            <p>{currentOrder.address.fullName}</p>
                            <p>{currentOrder.address.addressLine1}</p>
                            {currentOrder.address.addressLine2 && <p>{currentOrder.address.addressLine2}</p>}
                            <p>
                                {currentOrder.address.city}, {currentOrder.address.postalCode}
                            </p>
                            <p>{currentOrder.address.country}</p>
                        </div>
                    </div>

                    <div className="flex items-center text-gray-500">
                        <Clock className="mr-2 h-5 w-5" />
                        <p>Redirecting to your orders in 7 seconds...</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Link href="/orders">
                        <Button variant="outline">View Orders</Button>
                    </Link>
                    <Link href="/">
                        <Button>Continue Shopping</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default OrderConfirmationPage;
