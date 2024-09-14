import React from 'react';
import Section from '../ui/features/Section';
import Container from '../ui/features/Container';
import Image from 'next/image';
import SocialIcon from '../ui/social-icon';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { CgFacebook } from 'react-icons/cg';
import { FaYoutube } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';

const Footer = () => {
    return (
        <Section className="bg-[#111111] text-white pt-10 relative flex-col">
            <Container className="w-full flex flex-col gap-5">
                <div className="w-full flex justify-center flex-col items-center gap-7">
                    <div className="rounded-[100%] bg-[#111111] p-5 absolute -top-[75px] left-1/2 -translate-x-1/2">
                        <Image
                            src="/logo.png"
                            alt=""
                            width={1000000}
                            height={100000}
                            quality={100}
                            className="w-[120px] select-none"
                        />
                    </div>
                    <div className='uppercase mt-10 text-xl font-bold'>
                        Advanced Beauty
                    </div>
                    <div className='flex gap-5'>
                        <SocialIcon color='#000' className='bg-neutral-400 hover:bg-gray-100 transition duration-150' icon={CgFacebook} href='/' />
                        <SocialIcon color='#000' className='bg-neutral-400 hover:bg-gray-100 transition duration-150' icon={FaInstagram} href='/' />
                        <SocialIcon color='#000' className='bg-neutral-400 hover:bg-gray-100 transition duration-150' icon={FaYoutube} href='/' />
                        <SocialIcon color='#000' className='bg-neutral-400 hover:bg-gray-100 transition duration-150' icon={IoIosMail} href='/' />
                        <SocialIcon color='#000' className='bg-neutral-400 hover:bg-gray-100 transition duration-150' icon={FaLinkedinIn} href='/' />
                    </div>
                </div>
                <div className='border-b border-neutral-400'></div>
                <div className='border-b border-neutral-400'></div>
                <div className='border-b border-neutral-400'></div>
            </Container>
            <div className='w-full mt-5'>
                <div className='border-b border-neutral-400'></div>
                <Container className='w-full py-5 flex justify-center font-semibold text-sm text-neutral-400'>
                    Copyright © 2024 ADVANCED BEAUTY. All rights reserved.
                </Container>
            </div>
        </Section>
    );
};

export default Footer;
