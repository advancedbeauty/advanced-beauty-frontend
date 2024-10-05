import Footer from '@/components/footer';
import FooterBar from '@/components/footer/footer-bar';
import Navbar from '@/components/navbar';
import React from 'react';

interface RoutesLayoutProps {
    children: React.ReactNode;
}

const RoutesLayout: React.FC<RoutesLayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className='min-h-screen'>
                {children}
            </div>
            <FooterBar />
            <Footer />
        </div>
    );
};

export default RoutesLayout;
