import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className, style, id }) => {
    return (
        <section className={`${className} w-full flex justify-center items-center`} style={style} id={id}>
            {children}
        </section>
    );
};

export default Section;
