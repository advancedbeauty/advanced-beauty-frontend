import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <Link href={'/'} className={`${className} select-none logo-font font-bold text-2xl flex items-center gap-3`}>
            <Image
                src="/logo_full.png"
                alt="Logo"
                width={1000000}
                height={1000000}
                className="w-[320px] max-h-[61px] object-contain"
                priority
            />
        </Link>
    );
};

export default Logo;