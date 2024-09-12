import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import Image from 'next/image';
import React from 'react';

const HomeAboutSection = () => {
  return (
    <Section className='py-40'>
        <Container className='w-full flex flex-col gap-10'>
            <div className='flex justify-between items-center relative'>
                <div className='absolute left-1/2 -translate-x-1/2 w-full'>
                    <span className='select-none text-[370px] font-quentin z-[5] text-[#FBF1EA]'>
                        nail bar
                    </span>
                </div>
                <div className='w-1/2 z-10'>
                    <h1 className='text-3xl max-w-[600px] font-medium'>
                        Creative manicure and pedicure studio with masterly performance of services for the beauty of your nails
                    </h1>
                    <p className='mt-10 font-medium max-w-[700px]'>
                        Vestibulum congue, sapien a sollicitudin euismod, lorem ex auctor arcu, eget convallis mauris nisl sagittis dui. Ut nec laoreet ante. Duis ultricies congue libero, et accumsan purus malesuada  aptent taciti.
                    </p>
                </div>
                <div className='w-1/2 flex gap-5 z-10'>
                    <Image
                        src={'/aboutImg-1.jpg'}
                        alt=''
                        width={353}
                        height={490}
                    />
                    <Image
                        src={'/aboutImg-1.jpg'}
                        alt=''
                        width={353}
                        height={490}
                    />
                </div>
            </div>
            <div>

            </div>
        </Container>
    </Section>
  )
}

export default HomeAboutSection;