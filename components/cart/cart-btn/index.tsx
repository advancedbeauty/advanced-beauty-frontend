import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UseCart from '@/hooks/use-cart';

interface CartButtonProps {
    listingId: string;
    disabled?: boolean;
    selectedDate?: Date;
    selectedTime?: string;
    itemType?: 'service' | 'shop';
}

const CartButton: React.FC<CartButtonProps> = ({ listingId, disabled, selectedDate, selectedTime, itemType }) => {
    const { hasCarted, toggleCart } = UseCart({ listingId, appointmentDate:selectedDate, appointmentTime:selectedTime, itemType:itemType });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        toggleCart(e as unknown as React.MouseEvent<HTMLDivElement>);
    };

    return (
        <Button type="button" variant="outline" className="flex-1" onClick={handleClick} disabled={disabled}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {hasCarted ? 'Remove from Cart' : 'Add to Cart'}
        </Button>
    );
};

export default CartButton;
