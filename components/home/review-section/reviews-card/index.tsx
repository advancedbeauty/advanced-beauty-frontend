import Image from 'next/image';
import React from 'react';

interface ReviewsCardProps {
    name: string;
    img?: string;
    reviewText: string;
};

const ReviewsCard: React.FC<ReviewsCardProps> = ({ name, img, reviewText }) => {
  return (
    <div className='flex flex-col items-center sm:px-7 md:px-14 lg:px-20 transition'>
        <h1 className='text-center text-xl'>
            {reviewText}
        </h1>
        <div className='border border-black w-full max-w-[400px] mt-10'></div>
        <Image 
            src={img || '/noProfile.webp'}
            alt=''
            width={65}
            height={65}
            className='object-contain rounded-full select-none mt-10'
        />
        <h1 className='mt-3 text-lg font-medium'>
            {name}
        </h1>
    </div>
  )
}

export default ReviewsCard;