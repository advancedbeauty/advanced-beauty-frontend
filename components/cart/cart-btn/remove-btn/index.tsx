import React from 'react';
import { Button } from '@/components/ui/button';
import UseCart from '@/hooks/use-cart';
import { Trash2 } from 'lucide-react';

interface RemoveButtonProps {
    listingId: string;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ listingId }) => {
    const { hasCarted, toggleCart } = UseCart({ listingId });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // Cast the event type to match what toggleCart expects
        toggleCart(e as unknown as React.MouseEvent<HTMLDivElement>);
    };

    return (
        <Button type="button" variant="destructive" size="sm" className="flex items-center gap-2" onClick={handleClick}>
            <Trash2 className="h-4 w-4" />
            {hasCarted ? 'Remove' : 'Add'}
        </Button>
    );
};

export default RemoveButton;
