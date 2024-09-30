'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface ActiveLinkProps {
    href: string;
    text: string;
};

const ActiveLink: React.FC<ActiveLinkProps> = ({ href, text }) => {

    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={isActive ? 'text-red-100' : 'hover:text-red-100'}
        >
            {text}
        </Link>
    )
}

export default ActiveLink;