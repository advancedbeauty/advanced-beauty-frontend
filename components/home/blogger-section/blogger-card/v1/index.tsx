import InstagramEmbed from '@/components/ui/instagram-embed';
import React from 'react';

const BloggerCard = () => {
    return (
        <div className='flex gap-5 flex-wrap'>
            <div className="max-w-lg mx-auto">
                <InstagramEmbed postUrl="https://www.instagram.com/reel/C3xLL_HNXg2/" />
            </div>
            <div className="max-w-lg mx-auto">
                <InstagramEmbed postUrl="https://www.instagram.com/reel/C63MARGPtRq/" />
            </div>
            <div className="max-w-lg mx-auto">
                <InstagramEmbed postUrl="https://www.instagram.com/reel/C0k0wu5KDqg/" />
            </div>
            <div className="max-w-lg mx-auto">
                <InstagramEmbed postUrl="https://www.instagram.com/reel/C3SVQInvk8t/" />
            </div>
        </div>
    );
};

export default BloggerCard;
