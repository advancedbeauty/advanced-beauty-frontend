'use client';

import Avatar from '@/components/ui/features/Avatar';
import React, { useState } from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(() => !isOpen);
    };

    return (
        <div className="relative">
            <div
                onClick={toggleMenu}
                className="rounded-full border-2 dark:border-gray-500/50 p-2 flex items-center gap-2 cursor-pointer"
            >
                <HiOutlineMenuAlt3 />
                <Avatar />
            </div>
            {isOpen && <div className="absolute bg-background border-2 top-12 right-0 rounded-3xl w-52">Hello</div>}
        </div>
    );
};

export default Menu;
