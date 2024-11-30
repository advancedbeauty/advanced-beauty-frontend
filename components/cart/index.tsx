'use client';

import React from 'react';
import Section from '../ui/features/Section';
import Container from '../ui/features/Container';
import useCurrentUserStore from '@/store/auth/currentUserStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { AlertCircle, Loader2, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import MainTitle from '../ui/title/main-title';
import CartItem from './cart-item';
import OrderSummary from './order-summary';
import { useCartStore } from '@/store/cart/cartStore';

const Cart = () => {
    const { currentUser } = useCurrentUserStore();
    const { cart, isLoading } = useCartStore();

    if (!currentUser) {
        return (
            <Section className="py-10 md:py-20 min-h-[700px]">
                <Container className="w-full">
                    <Card className="w-full max-w-md mx-auto">
                        <CardHeader className="text-center">
                            <CardTitle className="flex items-center justify-center gap-2">
                                <AlertCircle className="h-6 w-6 text-yellow-500" />
                                <span>Login Required</span>
                            </CardTitle>
                            <CardDescription>Please log in to view and manage your cart</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <Link href="/auth">
                                <Button className="bg-[#D9C1A3] hover:bg-[#c4ac8e] text-neutral-950">
                                    Login to Account
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </Container>
            </Section>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-[#D9C1A3]" />
                <p className="text-gray-500 font-medium">Loading your cart...</p>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <Section className="py-10 md:py-20 min-h-[700px]">
                <Container>
                    <Card className="w-full max-w-lg mx-auto">
                        <CardHeader className="text-center">
                            <CardTitle className="flex items-center justify-center gap-2">
                                <ShoppingCart className="h-6 w-6 text-gray-400" />
                                <span>Your Cart is Empty</span>
                            </CardTitle>
                            <CardDescription>Add items to your cart to begin shopping</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <Link href="/">
                                <Button className="bg-[#D9C1A3] hover:bg-[#c4ac8e] text-neutral-950">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </Container>
            </Section>
        );
    }

    const calculateTotals = () => {
        const subtotal = cart.reduce((sum, item) => {
            const price = item.service?.price || item.shop?.price || 0;
            return sum + price * item.quantity;
        }, 0);

        const totalDiscount = cart.reduce((sum, item) => {
            const price = item.service?.price || item.shop?.price || 0;
            const discount = item.service?.discount || item.shop?.discount || 0;
            return sum + (price * item.quantity * discount) / 100;
        }, 0);

        const shippingFee = subtotal > 1000 ? 100 : 150;
        const total = Math.round(subtotal - totalDiscount + shippingFee);

        return {
            subtotal: Math.round(subtotal),
            totalDiscount: Math.round(totalDiscount),
            shippingFee,
            total,
        };
    };

    const totals = calculateTotals();

    return (
        <Section className="py-10 md:py-20">
            <Container className="w-full">
                <div className="flex items-center justify-between flex-wrap">
                    <MainTitle heading="Cart" subheading="Your Shopping Cart is Almost Ready" />
                    <Link
                        href="/order"
                        className="w-fit bg-[#D9C1A3] hover:bg-[#c4ac8e] text-neutral-950 mt-6 font-medium py-2 px-5 rounded transition-colors"
                    >
                        Your Orders
                    </Link>
                </div>
                <div className="mt-8 flex gap-8 flex-wrap lg:flex-nowrap">
                    <div className="space-y-4 w-full">
                        {cart.map((item) => {
                            return (
                                <CartItem
                                    key={item.id}
                                    item={item.service || item.shop}
                                    selectedDate={item.appointmentDate}
                                    selectedTime={item.appointmentTime}
                                    cartItemId={item.id}
                                    quantity={item.quantity}
                                />
                            );
                        })}
                    </div>
                    <div className="lg:max-w-[350px] w-full">
                        <OrderSummary {...totals} />
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default Cart;
