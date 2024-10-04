import React from 'react';
import Section from '@/components/ui/features/Section';
import Container from '@/components/ui/features/Container';
import Logo from '@/components/ui/features/Logo';
import Menu from '@/components/navbar/lower-navbar/menu';
import Navlinks from '@/components/navbar/lower-navbar/navlinks';
import Link from 'next/link';
import { BsCart2 } from 'react-icons/bs';

const LowerNavbar = () => {
    return (
        <Section className="py-2 shadow bg-[#111111] text-white">
            <Container className="w-full flex justify-center items-center md:justify-between">
                <Logo className="" />
                <div className="hidden md:flex items-center gap-5">
                    <Navlinks />
                    {/* <Menu /> */}
                    <Link href={''} className="bg-red-100 p-2 rounded-full text-black">
                        <BsCart2 size={20} strokeWidth={0.2}/>
                    </Link>
                    <Link href={''} className="bg-red-100 rounded-[2px] p-2 text-black font-semibold text-sm">
                        <span>LOGIN</span>
                    </Link>
                </div>
            </Container>
        </Section>
    );
};

export default LowerNavbar;
