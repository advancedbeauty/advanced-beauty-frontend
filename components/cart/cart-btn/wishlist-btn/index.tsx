'use client';

import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import useWishlist from '@/hooks/use-wishlist';

interface WishlistButtonProps {
    listingId: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ listingId }) => {
    const { hasWishlisted, toggleWishlist } = useWishlist({ listingId });

    return (
        <div
            onClick={toggleWishlist}
            className="hover:opacity-80 transition cursor-pointer flex items-center gap-2 w-fit border border-gray-300 rounded-md p-2"
            role="button"
            aria-label={hasWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            <AiFillHeart size={24} className={hasWishlisted ? 'fill-red-500' : 'fill-neutral-500/70'} />
            <span>{hasWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}</span>
        </div>
    );
};

export default WishlistButton;
