import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import Header from '../components/Header/header';
export const metadata: Metadata = {
    title: "Dashboard-Clicks",
    description: "Dashboard For Clicks",
};



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Toaster />
            <Header />
            <main className='p-3 h-full'>
                {children}

            </main>
        </>
    );
}
