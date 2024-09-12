import Container from "@/components/ui/features/Container";
import Section from "@/components/ui/features/Section";
import React from "react";
import ReviewsCarousel from "./reviews-carousel";

const HomeReviewSection = () => {
  return (
    <Section className="py-20">
      <Container className="w-full">
        <div className="w-full flex flex-col items-center gap-2">
          <h1 className="font-quentin text-3xl font-semibold">testimonials</h1>
          <h2 className="text-4xl font-semibold">what our client says</h2>
        </div>
        <ReviewsCarousel />
      </Container>
    </Section>
  );
};

export default HomeReviewSection;
