'use client';

import React from 'react';
import Section from '@/components/ui/features/Section';
import Container from '@/components/ui/features/Container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/auth-tabs';
import LoginForm from '@/components/auth/login';
import RegisterForm from '@/components/auth/register';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
    const { isSignedIn } = useAuth();
    const router = useRouter();
    if (isSignedIn) {
        router.push('/');
    }
    return (
        <Section>
            <Container className="mt-10 md:mt-20 mb-20 flex flex-col gap-7">
                <div className='flex flex-col gap-4'>
                    <span className="font-medium text-center text-3xl md:text-4xl">
                        Sign in or create an account
                    </span>
                    <span className="text-center text-[14px] max-w-[500px]">
                        Elevate Your Beauty Experience with Advanced Beauty: One Account, Endless Possibilities!
                    </span>
                </div>
                <Tabs defaultValue="login" className="">
                    <div className="border rounded-sm">
                        <div className="border-b bg-[#FBF1EA]">
                            <TabsList>
                                <TabsTrigger className="text-lg rounded-tl-[2px]" value="login">
                                    Log In
                                </TabsTrigger>
                                <TabsTrigger className="text-lg" value="register">
                                    Sign Up
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent className="p-3" value="login">
                            <LoginForm />
                        </TabsContent>
                        <TabsContent className="p-3" value="register">
                            <RegisterForm />
                        </TabsContent>
                    </div>
                </Tabs>
                <div className='max-w-[500px] text-center text-[12px]'>
                    <span className=''>
                        By continuing, you have read and agree to our {` `}
                    </span>
                    <Link href='/legal/tnc' className='text-blue-500 font-medium'>
                        Terms and Conditions
                    </Link>,{` `}
                    <Link href='/legal/privacy-policy' className='text-blue-500 font-medium'>
                        Privacy Statement
                    </Link>.
                </div>
            </Container>
        </Section>
    );
};

export default AuthPage;
