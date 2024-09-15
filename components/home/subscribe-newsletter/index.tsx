import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import React from 'react';
import { Roboto_Slab } from 'next/font/google';

const roboslab = Roboto_Slab({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const HomeSubscribeNewsletter = () => {
    return (
        <Section className="py-28 bg-red-50">
            <Container className='w-full flex flex-col lg:flex-row items-center justify-center md:justify-between gap-10 relative text-center lg:text-left lg:px-10'>
                <div className="absolute left-1/2 -translate-x-1/2 w-full top-1/2 -translate-y-1/2 pointer-events-none flex justify-center items-center">
                    <span className="select-none text-[150px] sm:text-[200px] md:text-[300px] lg:text-[350px] font-quentin z-[5] text-[#fff] whitespace-nowrap">
                        Subscribe
                    </span>
                </div>
                <div className='z-10 flex items-center gap-10 justify-center w-full'>
                    <div className={`flex flex-col uppercase ${roboslab.className} text-3xl font-[350]`}>
                        <span>Subscribe to</span>
                        <span>our newsletter</span>
                    </div>
                    <div className="w-full mt-6 md:mt-10 flex flex-col sm:flex-row justify-center lg:justify-start">
                        <input
                            type="text"
                            placeholder="Enter your email..."
                            className="border-b border-black px-4 py-3 w-full max-w-[500px] bg-transparent"
                        />
                        <button className="bg-black text-white px-4 py-3 w-full max-w-[400px]">
                            Subscribe
                        </button>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default HomeSubscribeNewsletter;