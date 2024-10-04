'use client';

import React from 'react';
import IconLink from './icon-link';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { HiOutlineShoppingCart, HiShoppingCart} from 'react-icons/hi';
import { RiAccountCircleFill, RiAccountCircleLine } from 'react-icons/ri';
import { PiSquaresFour, PiSquaresFourFill } from 'react-icons/pi';

const FooterBar = () => {
    return (
        <div className='fixed bottom-0 bg-[#111111] w-full z-30 px-3 py-2 border-t-[0.1px] border-gray-500 text-white lg:hidden flex justify-around'>
            <IconLink activeIcon={GoHomeFill} icon={GoHome} href='/' text={'Home'}/>
            <IconLink activeIcon={PiSquaresFourFill } icon={PiSquaresFour} href='/categories' text={'Categories'}/>
            <IconLink activeIcon={RiAccountCircleFill} icon={RiAccountCircleLine} href='/account' text={'Account'}/>
            <IconLink activeIcon={HiShoppingCart} icon={HiOutlineShoppingCart} href='/cart' text={'Cart'}/>
        </div>
    );
};

export default FooterBar;
