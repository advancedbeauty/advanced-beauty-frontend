'use client';

import React, { useState, useEffect } from 'react';
import { RiArrowUpDoubleFill } from 'react-icons/ri';

const ScrollToTop = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.scrollY > 400) {
            setShowScroll(true);
        } else if (showScroll && window.scrollY <= 400) {
            setShowScroll(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => {
            window.removeEventListener('scroll', checkScrollTop);
        };
    }, [showScroll]);

    return (
        <div className={`${showScroll ? 'block' : 'hidden'} bg-red-500 p-2 rounded`} onClick={scrollTop}>
            <RiArrowUpDoubleFill size={24} color="white" />
        </div>
    );
};

export default ScrollToTop;
