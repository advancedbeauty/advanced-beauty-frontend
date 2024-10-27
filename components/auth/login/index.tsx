'use client';

import React from 'react';
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { MdEmail, MdLock } from 'react-icons/md';
import toast from 'react-hot-toast';

const LoginForm = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isLoaded) return;

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push('/');
                toast.success('Logged In!');
            } else {
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            toast.error('An error occurred during login. Please try again.');
        }
    };

    const handleGoogleLogin = async () => {
        if (!isLoaded) return;

        try {
            await signIn.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/",
            });
        } catch (error) {
            toast.error('An error occurred during Google login. Please try again.');
        }
    };

    return (
        <div className="max-w-sm mx-auto flex flex-col gap-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full border rounded-md py-2 pl-10 pr-3 focus:outline-none"
                    />
                    <MdEmail size={20} className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                </div>
                <div className="relative">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full border rounded-md py-2 pl-10 pr-3 focus:outline-none"
                    />
                    <MdLock size={20} className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                </div>
                <button type="submit" className="bg-[#D9C1A3] rounded-sm py-2 font-medium">
                    Login with Email
                </button>
            </form>
            <button 
                onClick={handleGoogleLogin}
                className="bg-white border border-gray-300 rounded-sm py-2 font-medium flex items-center justify-center gap-2"
            >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-5 h-5" />
                Login with Google
            </button>
        </div>
    );
};

export default LoginForm;
