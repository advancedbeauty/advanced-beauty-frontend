import React from 'react';
import Section from '../ui/features/Section';
import Container from '../ui/features/Container';
import Image from 'next/image';
import SocialIcon from '../ui/social-icon';
import { FaFacebook, FaS } from 'react-icons/fa6';

const Footer = () => {
    return (
        <Section className="bg-[#111111] text-white py-10 relative">
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
                        <SocialIcon icon={FaFacebook} href='/' />
                        <SocialIcon icon={FaFacebook} href='/' />
                        <SocialIcon icon={FaFacebook} href='/' />
                        <SocialIcon icon={FaFacebook} href='/' />
                    </div>
                </div>
                <div className='border-b'></div>
            </Container>
        </Section>
    );
};

export default Footer;
