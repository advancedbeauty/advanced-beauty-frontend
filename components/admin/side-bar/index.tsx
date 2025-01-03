'use client';
import React, { useEffect } from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
} from '@/components/ui/sidebar';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Logo from '@/components/ui/features/Logo';
import { IoLogOutOutline } from 'react-icons/io5';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useCurrentUserStore from '@/store/auth/currentUserStore';

const DashboardSideBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        const isAdmin = useCurrentUserStore.getState().currentUser;
        if (!isAdmin) {
            router.push('/');
        }
    }, [router]);

    const handleLogout = () => {
        signOut();
    };

    const getLinkClassName = (href: string) => {
        return `w-full flex gap-2 items-center hover:bg-neutral-700 py-2 px-3 rounded cursor-pointer transition-colors duration-200 ${
            pathname === href ? 'bg-neutral-800' : ''
        }`;
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <Logo />
            </SidebarHeader>

            <div className="border-b border-gray-700 mt-1"></div>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Link href={'/admin/dashboard'} className={getLinkClassName('/admin/dashboard')}>
                            Dashboard
                        </Link>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Manage items</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Link
                            href={'/admin/create/service-category'}
                            className={getLinkClassName('/admin/create/service-category')}
                        >
                            Service category
                        </Link>
                    </SidebarGroupContent>
                    <SidebarGroupContent>
                        <Link
                            href={'/admin/create/service-item'}
                            className={getLinkClassName('/admin/create/service-item')}
                        >
                            Service item
                        </Link>
                    </SidebarGroupContent>
                    <SidebarGroupContent>
                        <Link
                            href={'/admin/create/shop/shop-category'}
                            className={getLinkClassName('/admin/create/shop/shop-category')}
                        >
                            Shop category
                        </Link>
                    </SidebarGroupContent>
                    <SidebarGroupContent>
                        <Link
                            href={'/admin/create/shop/shop-item'}
                            className={getLinkClassName('/admin/create/shop/shop-item')}
                        >
                            Shop item
                        </Link>
                    </SidebarGroupContent>
                    <SidebarGroupContent>
                        <Link
                            href={'/admin/create/offers'}
                            className={getLinkClassName('/admin/create/offers')}
                        >
                            Offers
                        </Link>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Manage Orders</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Link
                            href={'/admin/manage/orders'}
                            className={getLinkClassName('/admin/manage/orders')}
                        >
                            Orders
                        </Link>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Manage Home</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Link
                            href={'/admin/create/hero-section'}
                            className={getLinkClassName('/admin/create/hero-section')}
                        >
                            Hero section
                        </Link>
                    </SidebarGroupContent>
                    <SidebarGroupContent>
                        <Link
                            href={'/admin/create/home-reviews'}
                            className={getLinkClassName('/admin/create/home-reviews')}
                        >
                            Home reviews
                        </Link>
                    </SidebarGroupContent>
                    <SidebarGroupContent>
                        <Link
                            href={'/admin/create/newsletter-subscriber'}
                            className={getLinkClassName('/admin/create/newsletter-subscriber')}
                        >
                            Newsletter subscriber
                        </Link>
                    </SidebarGroupContent>
                    <SidebarGroupContent>
                        <Link href={'/admin/create/faq'} className={getLinkClassName('/admin/create/faq')}>
                            FAQ
                        </Link>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <div className="border-b border-gray-700 mb-1"></div>

            <SidebarFooter>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <div className="w-full flex gap-2 items-center bg-neutral-800 hover:bg-neutral-700 py-2 px-3 rounded cursor-pointer transition-colors duration-200">
                            <IoLogOutOutline size={24} />
                            <span className="font-medium">Logout</span>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                            <AlertDialogDescription>
                                You will be signed out of your current session. You can always log back in.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="mr-2">Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
                                Log Out
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SidebarFooter>
        </Sidebar>
    );
};

export default DashboardSideBar;
