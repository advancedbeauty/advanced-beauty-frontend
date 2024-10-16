'use client';

import React, { useState } from 'react';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import axiosApi from '@/utils/refresh-interceptors';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // try {
        //     // const response = await axiosApi.post('/auth/login', { email, password });            
        //     if (response.data.success === 'true') {
        //         router.push('/');
        //         toast.success('Logged In!')
        //     } else {
        //         toast.error('Login failed. Please check your credentials.');
        //     }
        // } catch (error) {
        //     toast.error('An error occurred during login. Please try again.');
        // }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto flex flex-col gap-3">
            <div className="relative">
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-md py-2 pl-10 pr-3 focus:outline-none"
                />
                <MdEmail size={20} className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            </div>
            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-md py-2 pl-10 pr-10 focus:outline-none"
                />
                <MdLock size={20} className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400 focus:outline-none"
                >
                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </button>
            </div>
            <button type="submit" className="bg-[#D9C1A3] rounded-sm py-2 font-medium">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
