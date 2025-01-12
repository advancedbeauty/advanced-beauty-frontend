import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import React from 'react';
import InstagramEmbed from '@/components/ui/instagram-embed';
import MainTitle from '@/components/ui/title/main-title';
import CustomCarousel from '@/components/ui/custom-carousel'; // Import CustomCarousel

const HomeBloggerSection = () => {
    const carouselItems = [
        { postUrl: "https://www.instagram.com/reel/C3xLL_HNXg2/" },
        { postUrl: "https://www.instagram.com/reel/DDcjZCVz2Iw/" },
        { postUrl: "https://www.instagram.com/reel/DDmZRzpzdCD/" },
        { postUrl: "https://www.instagram.com/reel/C_-czqJvUAq/" }
    ].map((item, index) => (
        <InstagramEmbed postUrl={item.postUrl} key={index}/>
    ));

    return (
        <Section className="py-16 md:py-20">
            <Container className="w-full">
                <MainTitle heading="Our Bloggers" subheading="Explore our Instagram highlights!" />
                <CustomCarousel
                    items={carouselItems}
                    slidesPerView={3}
                    spaceBetween={20}
                    loop={true}
                    navigationOn={false}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        500: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                />
            </Container>
        </Section>
    );
};

export default HomeBloggerSection;