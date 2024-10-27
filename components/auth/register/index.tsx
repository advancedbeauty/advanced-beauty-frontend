'use client';

import React, { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { MdEmail, MdLock, MdOutlineDriveFileRenameOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';

type CustomError = {
    errors?: { message: string }[];
    message?: string;
};

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!isLoaded) {
            setIsLoading(false);
            return;
        }

        try {
            await signUp.create({
                firstName,
                lastName,
                emailAddress: email,
                password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setPendingVerification(true);
        } catch (err: unknown) {
            const customError = err as CustomError;
            setError(
                customError.errors?.[0]?.message || customError.message || 'An error occurred during registration.'
            );
        } finally {
            setIsLoading(false);
        }
    }

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });
            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push('/');
            }
        } catch (err: unknown) {
            const customError = err as CustomError;
            setError(
                customError.errors?.[0]?.message ||
                    customError.message ||
                    'An error occurred during email verification.'
            );
        }
    };

    const handleGoogleSignUp = async () => {
        if (!isLoaded) return;

        try {
            await signUp.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/',
            });
        } catch (err: unknown) {
            const customError = err as CustomError;
            setError(
                customError.errors?.[0]?.message || customError.message || 'An error occurred during Google sign up.'
            );
        }
    };

    return (
        <div className="max-w-sm mx-auto flex flex-col gap-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            {!pendingVerification ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full border rounded-md py-2 pl-10 pr-3 focus:outline-none"
                            disabled={isLoading}
                            required
                        />
                        <MdOutlineDriveFileRenameOutline size={20} className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full border rounded-md py-2 pl-10 pr-3 focus:outline-none"
                            disabled={isLoading}
                            required
                        />
                        <MdOutlineDriveFileRenameOutline size={20} className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-md py-2 pl-10 pr-3 focus:outline-none"
                            disabled={isLoading}
                            required
                        />
                        <MdEmail size={20} className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-md py-2 pl-10 pr-10 focus:outline-none"
                            disabled={isLoading}
                            required
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
                    <button type='submit' className='bg-[#D9C1A3] rounded-sm py-2 font-medium' disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Signup'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleVerify} className="flex flex-col gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter verification code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full border rounded-md py-2 pl-10 pr-3 focus:outline-none"
                            required
                        />
                        <MdEmail size={20} className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                    </div>
                    <button type='submit' className='bg-[#D9C1A3] rounded-sm py-2 font-medium'>
                        Verify Email
                    </button>
                </form>
            )}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
            </div>
            <button
                onClick={handleGoogleSignUp}
                className="flex items-center justify-center w-full border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8"/>
                    <path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z" fill="#34A853"/>
                    <path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z" fill="#FBBC04"/>
                    <path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z" fill="#EA4335"/>
                </svg>
                Sign up with Google
            </button>
        </div>
    );
};

export default RegisterForm;
