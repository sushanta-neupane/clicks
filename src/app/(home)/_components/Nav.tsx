"use client"
import AnimatedButton from '@/app/components/animated-button';
import AnimatedLink from '@/app/components/animated-link';
import { ThemeSwitch } from '@/app/components/theme-switch';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';



const Nav = ({ }: { isAdmin?: boolean }) => {
    const { status } = useSession()



    return (

        <nav>
            <div className="flex items-center gap-5 pb-3 px-4 relative">
                <Link href={"/"}>
                    <span className="flex items-center  gap-1">clicks.</span>
                </Link>
                <div className="hidden lg:flex gap-5">
                    <AnimatedLink link="/" label="Home" />
                    <AnimatedLink link="/dashboard" label="Dashboard" />

                </div>
                {status == "authenticated" && (
                    <div title='Logout'>

                        <AnimatedButton
                            title=''
                            isLoading={false}
                            onClick={() => signOut()}
                            icon={<LogOut size={18} />}
                            next_icon={<LogOut size={18} />}
                            className='bg-transparent h-5'
                        />
                    </div>
                )}
                <ThemeSwitch />
            </div>
        </nav>



    );
};

export default Nav;
