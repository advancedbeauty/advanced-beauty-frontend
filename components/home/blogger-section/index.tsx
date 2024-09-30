import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import React from 'react';
import InstagramEmbed from '@/components/ui/instagram-embed';

const HomeBloggerSection = () => {
    return (
        <Section className="py-16 md:py-20">
            <Container>
                <div className="flex gap-5 flex-wrap">
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
            </Container>
        </Section>
    );
};

export default HomeBloggerSection;
