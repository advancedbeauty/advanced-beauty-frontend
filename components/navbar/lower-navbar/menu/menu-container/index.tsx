'use client';

import IconLink from '@/components/footer/footer-bar/icon-link';
import UpperNavbar from '@/components/navbar/upper-navbar';
import Logo from '@/components/ui/features/Logo';
import useCurrentUserStore from '@/store/auth/currentUserStore';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { BiSolidOffer } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';

interface MenuContainerProps {
    onClose?: () => void;
}

const MenuContainer: React.FC<MenuContainerProps> = ({ onClose }) => {
    const { currentUser } = useCurrentUserStore();
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 z-40" aria-hidden="true" onClick={onClose} />

            {/* Menu Panel */}
            <div
                role="dialog"
                aria-modal="true"
                className={`fixed top-0 left-0 w-full max-w-[450px] h-screen bg-white z-50 shadow-xl transition-transform duration-300 ease-in-out text-black overflow-y-auto`}
            >
                <header>
                    <UpperNavbar />
                    <div className="flex items-center justify-between gap-[70px] py-2 px-4 bg-[#111111] text-white">
                        <Logo onClick={onClose} />
                        <div className="flex items-center justify-center gap-2">
                            <IconLink activeIcon={BiSolidOffer} icon={BiSolidOffer} href="/offers" />
                            <IoClose size={36} color="#FBF1EA" onClick={onClose} />
                        </div>
                    </div>
                </header>
                <div className="pb-5 flex flex-col">
                    {currentUser?.isAdmin && (
                        <>
                            <Link href={'/admin/dashboard'} className="px-3 border-b py-3">
                                Dasboard
                            </Link>
                        </>
                    )}
                    {currentUser ? (
                        <div className="px-3 border-b py-3" onClick={() => signOut()}>
                            <span>Logout</span>
                        </div>
                    ) : (
                        <Link
                            href={'/auth'}
                            className="px-3 border-b py-3"
                        >
                            <span>Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default MenuContainer;
