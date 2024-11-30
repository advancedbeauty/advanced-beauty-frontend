import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cart/cartStore';
import { toast } from 'react-hot-toast';

interface CartItemQuantityProps {
    currentQuantity?: number;
    cartItemId?: string;
    availableQuantity?: number;
}

const CartItemQuantity: React.FC<CartItemQuantityProps> = ({
    currentQuantity = 1,
    cartItemId,
    availableQuantity,
}) => {
    const { updateItemQuantity } = useCartStore();
    const [localQuantity, setLocalQuantity] = useState(currentQuantity);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleQuantityChange = useCallback(
        async (newQuantity: number) => {
            // Validate quantity limits
            if (availableQuantity && newQuantity > availableQuantity) {
                toast.error(`Maximum ${availableQuantity} items available`);
                return;
            }

            if (newQuantity < 1) return;

            setIsUpdating(true);
            setLocalQuantity(newQuantity);

            try {
                if (cartItemId) {
                    await updateItemQuantity(cartItemId, newQuantity);
                    toast.success('Quantity updated');
                }
            } catch (error) {
                // Revert local state if update fails
                setLocalQuantity(currentQuantity);
                console.log(error);
                toast.error('Failed to update quantity');
            } finally {
                setIsUpdating(false);
            }
        },
        [cartItemId, updateItemQuantity, currentQuantity, availableQuantity]
    );

    return (
        <div className="flex items-center space-x-2">
            <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(localQuantity - 1)}
                disabled={localQuantity <= 1 || isUpdating}
                className="h-8 w-8"
            >
                <Minus className="h-4 w-4" />
            </Button>
            <span className="px-2 text-sm font-medium">{localQuantity}</span>
            <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(localQuantity + 1)}
                disabled={isUpdating || (availableQuantity !== undefined && localQuantity >= availableQuantity)}
                className="h-8 w-8"
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default CartItemQuantity;