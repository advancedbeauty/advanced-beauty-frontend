'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cart/cartStore';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';

const OfferCode = () => {
    const [offerCode, setOfferCode] = useState('');
    const { applyOfferCodeToCart, offerCode: appliedOfferCode, removeOfferCode } = useCartStore();

    const handleApplyOffer = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!offerCode.trim()) {
            toast.error('Please enter an offer code');
            return;
        }

        try {
            await applyOfferCodeToCart(offerCode);
            toast.success(`Code applied successfully!`);
            setOfferCode('');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to apply offer code');
        }
    };

    const handleRemoveDiscount = () => {
        removeOfferCode();
        toast.success('Offer code removed');
    };

    return (
        <div className="border rounded">
            <CardHeader className="!p-4">
                <CardTitle className="uppercase text-lg text-gray-600">Apply Coupon</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4 border-t !p-4'>
                <form className="flex gap-2 flex-wrap sm:flex-nowrap items-center">
                    <Input
                        type="text"
                        placeholder="Enter code"
                        value={offerCode}
                        onChange={(e) => setOfferCode(e.target.value.toUpperCase())}
                        className="uppercase"
                        disabled={!!appliedOfferCode}
                    />
                    {!appliedOfferCode ? (
                        <Button
                            className="w-full sm:w-fit bg-[#D9C1A3] hover:bg-[#c4ac8e] text-neutral-950"
                            type="submit"
                            onClick={handleApplyOffer}
                        >
                            Apply
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variant="destructive"
                            className="w-full sm:w-fit"
                            onClick={handleRemoveDiscount}
                        >
                            <X className="h-4 w-4" /> Remove
                        </Button>
                    )}
                </form>
                {appliedOfferCode && (
                    <div className="mt-2 text-green-600 text-sm flex items-center justify-between">
                        <span>
                            Offer Code: {appliedOfferCode.code}
                        </span>
                    </div>
                )}
            </CardContent>
        </div>
    );
};

export default OfferCode;
