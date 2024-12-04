'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/store/cart/cartStore';
import CheckoutItem from '../checkout-item';
import useCurrentUserStore from '@/store/auth/currentUserStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DELHI_NCR_POSTAL_CODES } from '@/data/delhiNCR-postalCodes';
import { useCreateOrder } from '@/hooks/use-create-order';
import { useRouter } from 'next/navigation';

// Checkout form component
const CheckoutForm = () => {
    // Get cart and current user from stores
    const router = useRouter();
    const { cart } = useCartStore();
    const { currentUser } = useCurrentUserStore();
    const { processOrder, isLoading } = useCreateOrder();

    // State to manage form inputs
    const [formData, setFormData] = useState({
        fullName: currentUser?.name || '',
        email: currentUser?.email || '',
        phoneNumber: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        postalCode: '',
        country: 'India',
    });

    // State for postal code suggestions and error
    const [postalCodeSuggestions, setPostalCodeSuggestions] = useState<string[]>([]);
    const [postalCodeError, setPostalCodeError] = useState('');

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Reset postal code error when user starts typing
        if (name === 'postalCode') {
            setPostalCodeError('');

            // Handle postal code suggestions
            const suggestions = DELHI_NCR_POSTAL_CODES.filter((code) => code.startsWith(value)).slice(0, 3);
            setPostalCodeSuggestions(suggestions);
        }
    };

    // Handle postal code suggestion selection
    const handlePostalCodeSuggestion = (suggestion: string) => {
        setFormData((prevState) => ({
            ...prevState,
            postalCode: suggestion,
        }));
        setPostalCodeSuggestions([]);
        setPostalCodeError('');
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate phone number
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(formData.phoneNumber)) {
            alert('Please enter a valid 10-digit Indian mobile number');
            return;
        }

        // Validate postal code
        const postalCodeRegex = /^[1-9][0-9]{5}$/;
        if (!postalCodeRegex.test(formData.postalCode)) {
            alert('Please enter a valid 6-digit postal code');
            return;
        }

        // Additional check for Delhi NCR postal codes
        if (!DELHI_NCR_POSTAL_CODES.includes(formData.postalCode)) {
            setPostalCodeError(
                'Sorry, we only deliver to Delhi NCR regions. Please enter a valid Delhi NCR postal code.'
            );
            return;
        }

        // Process order
        const orderPlaced = await processOrder(formData);
        
        if (orderPlaced) {
            // Redirect to order confirmation page
            router.push('/orders/order-confirmation');
        }
    };

    // Determine state based on postal code
    useEffect(() => {
        const matchingCodes = {
            '110': 'Delhi',
            '201': 'Noida',
            '122': 'Gurgaon',
            '121': 'Faridabad',
        };

        const statePrefix = formData.postalCode.substring(0, 3);
        const matchedState = matchingCodes[statePrefix as keyof typeof matchingCodes];

        if (matchedState && formData.city !== matchedState) {
            setFormData((prev) => ({ ...prev, city: matchedState }));
        }
    }, [formData.postalCode]);

    return (
        <div className="w-full flex flex-col gap-5 md:gap-7">
            {/* Billing Details Card */}
            <Card className="rounded">
                <CardHeader className="!p-4 border-b">
                    <CardTitle className="uppercase text-lg text-gray-600">Billing Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 !p-4 mb-5">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name and Phone Number */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">
                                    Full Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">
                                    Phone Number <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter 10-digit mobile number"
                                    required
                                    maxLength={10}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                required
                                readOnly
                            />
                        </div>

                        {/* Address Line 1 */}
                        <div className="space-y-2">
                            <Label htmlFor="addressLine1">
                                Address Line 1 <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="addressLine1"
                                name="addressLine1"
                                value={formData.addressLine1}
                                onChange={handleInputChange}
                                placeholder="Street address or P.O. Box"
                                required
                            />
                        </div>

                        {/* Address Line 2 */}
                        <div className="space-y-2">
                            <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                            <Input
                                type="text"
                                id="addressLine2"
                                name="addressLine2"
                                value={formData.addressLine2}
                                onChange={handleInputChange}
                                placeholder="Apartment, suite, unit, building, floor, etc."
                            />
                        </div>

                        {/* Country, State, Postal Code */}
                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Country */}
                            <div className="space-y-2">
                                <Label htmlFor="country">
                                    Country <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value="India"
                                    readOnly
                                    className="bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            {/* State */}
                            <div className="space-y-2">
                                <Label htmlFor="city">
                                    City <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="city"
                                    name="City"
                                    value={formData.city}
                                    readOnly
                                    className="bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            {/* Postal Code */}
                            <div className="space-y-2 relative">
                                <Label htmlFor="postalCode">
                                    Postal Code <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="postalCode"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                    placeholder="Enter postal code"
                                    maxLength={6}
                                    required
                                />
                                {/* Postal Code Suggestions */}
                                {postalCodeSuggestions.length > 0 && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                                        {postalCodeSuggestions.map((suggestion) => (
                                            <div
                                                key={suggestion}
                                                onClick={() => handlePostalCodeSuggestion(suggestion)}
                                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                {suggestion}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Postal Code Error Message */}
                                {postalCodeError && <p className="text-red-500 text-sm mt-1">{postalCodeError}</p>}
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Order Summary Card */}
            <Card className="rounded">
                <CardHeader className="!p-4 border-b">
                    <CardTitle className="uppercase text-lg text-gray-600">Order summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 !p-4 mb-4">
                    {cart.map((item) => (
                        <CheckoutItem
                            key={item.id}
                            item={item.service || item.shop}
                            selectedDate={item.appointmentDate}
                            selectedTime={item.appointmentTime}
                            cartItemId={item.id}
                            quantity={item.quantity}
                        />
                    ))}
                </CardContent>
            </Card>

            {/* Order Confirmation Card */}
            <Card className="rounded p-4 flex justify-between items-center flex-wrap gap-5">
                <span>
                    Order confirmation email will be sent to <span className="font-semibold">{currentUser?.email}</span>
                </span>
                <Button
                    type="submit"
                    disabled={isLoading || cart.length === 0}
                    onClick={() => document.querySelector('form')?.requestSubmit()}
                    className="w-fit bg-[#D9C1A3] hover:bg-[#c4ac8e] text-neutral-950 font-semibold"
                >
                    {isLoading ? 'Processing...' : 'Place order'}
                </Button>
            </Card>
        </div>
    );
};

export default CheckoutForm;
