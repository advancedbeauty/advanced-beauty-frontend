import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
};

const Section: React.FC<SectionProps> = ({ children, className }) => {
  return (
    <section className={`${className} w-full flex justify-center items-center`}>
      {children}
    </section>
  )
}

export default Section;