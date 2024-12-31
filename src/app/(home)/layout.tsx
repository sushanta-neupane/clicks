import { Metadata } from 'next';
import Header from '../components/Header/header';


export const metadata: Metadata = {
    title: "Home-Clicks",
    description: "Photo click by Sushanta",
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="p-3 h-full">{children}</main>
        </>
    );
};

export default HomeLayout;
