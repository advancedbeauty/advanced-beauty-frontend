import Image from 'next/image';
import React from 'react';

interface ReviewsCardProps {
    name: string;
    img?: string;
    reviewText: string;
}

const ReviewsCard: React.FC<ReviewsCardProps> = React.memo(({ name, img, reviewText }) => (
    <div className="flex flex-col items-center sm:px-7 md:px-14 lg:px-20 transition">
        <p className="text-center text-xl">{reviewText}</p>
        <div className="border border-black w-full max-w-[400px] mt-10" />
        <Image
            src={img || '/noProfile.webp'}
            alt={`${name}'s profile picture`}
            width={65}
            height={65}
            className="object-contain rounded-full select-none mt-10"
        />
        <h4 className="mt-3 text-lg font-medium">{name}</h4>
    </div>
));

ReviewsCard.displayName = 'ReviewsCard';

export default ReviewsCard;
