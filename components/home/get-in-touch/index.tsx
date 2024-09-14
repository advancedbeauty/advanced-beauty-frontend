import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';

const HomeGetInTouch = () => {
    return (
        <Section className="py-20 bg-[#000]">
            <Container className="w-full relative">
                <Image
                    src={'/getInTouch.jpg'}
                    alt="Get in touch"
                    width={1000000}
                    height={1000000}
                    className="w-[800px] h-[700px] ml-16"
                />
                <div className="bg-white absolute w-[800px] h-[500px] right-16 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-5">
                    <span className="font-quentin text-3xl">Get in touch</span>
                    <div className="uppercase flex flex-col items-center text-5xl gap-3">
                        <span>Book Time</span>
                        <span>To Get Manicure</span>
                    </div>
                    <div className="px-20">
                        <p className="text-center">
                            Sed quam urna, facilisis eleifend ipsum vel, imperdiet tristique ante. Phasellus pretium
                            dapibus gravida. Sed eu ligula hendrerit, venenatis eros in, vulputate diam.
                        </p>
                    </div>
                    <Link
                        href={'/'}
                        className="border px-5 py-3 flex items-center gap-2 text-xs sm:text-sm lg:text-base"
                    >
                        Read More
                        <FaArrowRight />
                    </Link>
                </div>
            </Container>
        </Section>
    );
};

export default HomeGetInTouch;
