import type { Metadata } from 'next';
import localFont from 'next/font/local';
import NextTopLoader from 'nextjs-toploader';
import '@/stylesheets/globals.css';
import ScrollToTop from '@/components/ui/features/ScrollToTop';
import { WhatsAppSolid } from '@/public/svgs';
import { Toaster } from 'react-hot-toast';
import { ClerkLoaded, ClerkProvider } from '@clerk/nextjs';

const customFont = localFont({
    src: [
        {
            path: '../public/fonts/quentin.ttf',
            weight: '400',
        },
    ],
    variable: '--font-quentin',
});

export const metadata: Metadata = {
    title: {
        default: 'Advanced Beauty | Best Home Salon',
        template: '%s',
    },
    description:
        'Experience premium salon services from the comfort of your home in Noida, Greater Noida, and Delhi NCR. Skip the hassle of traveling to a salon—our expert team brings professional treatments right to your doorstep. Enjoy the luxury of personalized beauty care without stepping out!',
    icons: {
        icon: '/icon.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${customFont.variable} antialiased`}>
            <body>
                <ClerkProvider>
                    <ClerkLoaded>
                        <Toaster />
                        <NextTopLoader color="#FF5956" height={3} showSpinner={false} />
                        <div className="fixed bottom-24 lg:bottom-10 right-3 cursor-pointer flex flex-col gap-3 z-40">
                            <ScrollToTop />
                            <a href={`https://api.whatsapp.com/send?phone=%2B918826207080`} target="_blank" rel="noopener noreferrer" className="">
                                <WhatsAppSolid height="2.5rem" width="2.5rem" fillColor="#FF5956" strokeWidth="0" strokeColor="currentColor"/>
                            </a>
                        </div>
                        {children}
                    </ClerkLoaded>
                </ClerkProvider>
            </body>
        </html>
    );
}
