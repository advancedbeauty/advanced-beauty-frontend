'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Copy, CheckIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface OffersCardProps {
    imageSrc: string;
    code: string;
}

const OffersCard: React.FC<OffersCardProps> = ({ imageSrc, code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard
            .writeText(code)
            .then(() => {
                setCopied(true);
                toast.success('Copied!');
                setTimeout(() => setCopied(false), 2000);
            })
            .catch((err) => {
                console.error('Failed to copy:', err);
                toast.error('Failed to copy');
            });
    };

    return (
        <div className="p-4 flex flex-col items-end gap-4 rounded hover:shadow-lg transition-shadow border w-fit">
            <div className="relative w-full min-h-[250px] min-w-[250px] max-w-[350px] shrink-0 overflow-hidden rounded">
                <Image
                    fill
                    src={imageSrc}
                    alt={'title'}
                    className="object-contain hover:scale-110 transition-all ease-in-out duration-300 select-none rounded"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="text-sm md:text-base text-gray-600 flex gap-3 items-center border rounded p-2 font-semibold">
                {code}
                <button onClick={handleCopy} className="text-gray-500 hover:text-gray-800 transition-colors">
                    {copied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
            </div>
        </div>
    );
};

export default OffersCard;
