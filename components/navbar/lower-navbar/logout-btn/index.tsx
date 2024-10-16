'use client';

import axiosApi from '@/utils/refresh-interceptors';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const LogoutBtn = () => {
    const router = useRouter();

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            const response = await axiosApi.post('/auth/signout', {}, { withCredentials: true });
            if (response.data.success === true) {
                toast.success('Logged Out Successfully!');
                console.log('logout');
                router.push('/auth');
            }
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Logout failed! Please try again.');
        }
    };

    return (
        <div
            onClick={handleLogout}
            className="bg-[#D9C1A3] rounded-[2px] p-2 text-neutral-950 font-semibold text-sm cursor-pointer"
        >
            <span>LOGOUT</span>
        </div>
    );
};

export default LogoutBtn;