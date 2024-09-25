import InstagramEmbed from '@/components/ui/instagram-embed';
import React from 'react';

const BloggerCard = () => {
    return (
        <div className='flex gap-5'>
            <InstagramEmbed postUrl="https://www.instagram.com/reel/C-owXjRg3hq/" />
            <InstagramEmbed postUrl="https://www.instagram.com/reel/C-owXjRg3hq/" />
            <InstagramEmbed postUrl="https://www.instagram.com/reel/C-owXjRg3hq/" />
            <InstagramEmbed postUrl="https://www.instagram.com/reel/C-owXjRg3hq/" />
        </div>
    );
};

export default BloggerCard;
