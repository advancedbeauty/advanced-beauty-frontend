import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';

interface SocialIconProps {
    icon: IconType;
    href: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon: Icon, href }) => {
    return (
        <Link
            href={href}
            className=''
        >
            <div className='bg-red-500 p-2 rounded-full'>
                <Icon size={20} />
            </div>
        </Link>
    );
};

export default SocialIcon;
