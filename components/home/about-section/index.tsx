import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import Image from 'next/image';
import { Roboto_Slab } from 'next/font/google';
import React from 'react';

const roboslab = Roboto_Slab({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const HomeAboutSection = () => {
    return (
        <Section className="py-20 md:py-40">
            <Container className="w-full flex flex-col lg:flex-row items-center justify-center md:justify-between gap-10 relative text-center lg:text-left lg:px-10">
                <div className="absolute left-1/2 -translate-x-1/2 w-full top-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="select-none text-[150px] sm:text-[200px] md:text-[300px] lg:text-[385px] font-quentin z-[5] text-[#FBF1EA] whitespace-nowrap">nail bar</span>
                </div>
                <div className="z-10 w-full lg:w-1/2">
                    <h1 className="text-xl sm:text-2xl md:text-3xl max-w-[600px] font-medium mx-auto lg:mx-0">
                        Creative manicure and pedicure studio with masterly performance of services for the beauty of
                        your nails
                    </h1>
                    <p className="mt-6 md:mt-10 font-medium max-w-[700px] mx-auto lg:mx-0">
                        Vestibulum congue, sapien a sollicitudin euismod, lorem ex auctor arcu, eget convallis mauris
                        nisl sagittis dui. Ut nec laoreet ante. Duis ultricies congue libero, et accumsan purus
                        malesuada aptent taciti.
                    </p>
                    <div className={`flex flex-col sm:flex-row justify-center lg:justify-start gap-8 sm:gap-16 mt-6 md:mt-10 ${roboslab.className}`}>
                        <div className='flex gap-2 items-center justify-center sm:justify-start'>
                            <div className='text-5xl sm:text-7xl'>
                                18
                            </div>
                            <div className='flex flex-col text-lg sm:text-2xl font-light text-start'>
                                <span>Professional</span>
                                <span>masters</span>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center justify-center sm:justify-start'>
                            <div className='text-5xl sm:text-7xl'>
                                265
                            </div>
                            <div className='flex flex-col text-lg sm:text-2xl font-light text-start'>
                                <span>Nail polish</span>
                                <span>colors</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-5 z-10 w-full lg:w-1/2">
                    <div className="w-1/2">
                        <Image src={'/aboutImg-1.jpg'} alt="" width={1000} height={1000} className="w-full h-auto object-cover" />
                    </div>
                    <div className="w-1/2">
                        <Image src={'/aboutImg-1.jpg'} alt="" width={1000} height={1000} className="w-full h-auto object-cover" />
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default HomeAboutSection;