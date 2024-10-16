'use client';

import React, { useState } from 'react';
import { MdEmail, MdLock, MdOutlineDriveFileRenameOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form className="max-w-sm mx-auto flex flex-col gap-3">
            <div className="relative">
                <input
                    type="text"
                    placeholder="First name"
                    className="w-full border rounded-md py-2 pl-10 pr-3 focus:outline-none"
                />
                <MdOutlineDriveFileRenameOutline size={20} className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            </div>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Last name"
                    className="w-full border rounded-md py-2 pl-10 pr-3 focus:outline-none"
                />
                <MdOutlineDriveFileRenameOutline size={20} className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            </div>
            <div className="relative">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-md py-2 pl-10 pr-3 focus:outline-none"
                />
                <MdEmail size={20} className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            </div>
            
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
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
            <button type='submit' className='bg-[#D9C1A3] rounded-sm py-2 font-medium'>
                Signup
            </button>
        </form>
    );
};

export default RegisterForm;