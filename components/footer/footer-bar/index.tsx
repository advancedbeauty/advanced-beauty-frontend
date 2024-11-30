'use client';

import React from 'react';
import IconLink from './icon-link';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { HiOutlineShoppingCart, HiShoppingCart } from 'react-icons/hi';
import { RiAccountCircleFill, RiAccountCircleLine } from 'react-icons/ri';
import { PiSquaresFour, PiSquaresFourFill } from 'react-icons/pi';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import useCurrentUserStore from '@/store/auth/currentUserStore';
import { useCartStore } from '@/store/cart/cartStore';

const FooterBar = () => {
    const { currentUser } = useCurrentUserStore();
    const { cart } = useCartStore();
    const itemLength = cart.length; 
    return (
        <div className="fixed bottom-0 bg-[#111111] w-full z-30 px-3 py-2 border-t-[0.1px] border-gray-500 text-white lg:hidden flex justify-around">
            <IconLink activeIcon={GoHomeFill} icon={GoHome} href="/" text="Home" />
            <IconLink activeIcon={PiSquaresFourFill} icon={PiSquaresFour} href="/categories" text="Categories" />
            <IconLink activeIcon={IoIosHeart} icon={IoIosHeartEmpty} href="/wishlist" text="Wishlist" />
            <IconLink activeIcon={RiAccountCircleFill} icon={RiAccountCircleLine} href="/auth" text="Account" />
            <div className="relative">
                <IconLink activeIcon={HiShoppingCart} icon={HiOutlineShoppingCart} href="/cart" text="Cart" />
                {currentUser && itemLength > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                        {itemLength}
                    </span>
                )}
            </div>
        </div>
    );
};

export default FooterBar;
