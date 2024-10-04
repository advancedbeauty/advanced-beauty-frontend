import React from 'react';
import Section from '@/components/ui/features/Section';
import Container from '@/components/ui/features/Container';
import Logo from '@/components/ui/features/Logo';
import Navlinks from '@/components/navbar/lower-navbar/navlinks';
import Link from 'next/link';
import { BsCart2 } from 'react-icons/bs';
import Menu from '@/components/navbar/lower-navbar/menu';

const LowerNavbar = () => {
    return (
        <Section className="py-2 shadow bg-[#111111] text-white">
            <Container className="w-full flex items-center justify-between gap-20">
                <Logo className="" />
                <Menu />
                <div className="hidden lg:flex items-center gap-5">
                    <Navlinks />
                    <Link href={''} className="bg-[#D9C1A3] p-2 rounded-full text-neutral-950">
                        <BsCart2 size={20} strokeWidth={0.2} />
                    </Link>
                    <Link href={''} className="bg-[#D9C1A3] rounded-[2px] p-2 text-neutral-950 font-semibold text-sm">
                        <span>LOGIN</span>
                    </Link>
                </div>
            </Container>
        </Section>
    );
};

export default LowerNavbar;
