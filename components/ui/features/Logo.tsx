import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <Link href={'/'} className={`${className} select-none logo-font font-bold text-2xl flex items-center gap-3`}>
            <Image src="/logo_full.png" alt="" width={1000000} height={1000000} quality={100} className="w-[320px]"/>
        </Link>
    );
};

export default Logo;
