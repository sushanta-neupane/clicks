
"use client"
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ImageCard from '@/app/(cms)/_components/ImageCard';
import VectorCard from '@/app/components/Card/VectorCard';
import Footer from '@/app/components/Footer';

import HeroHead from '@/app/(home)/_components/HeroHead';
import AnimatedButton from '@/app/components/animated-button';
import { PiArrowRightLight } from 'react-icons/pi';


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('');
    const router = useRouter();





    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const result = await signIn('credentials', {
            redirect: false,
            username,
            password,
        });

        if (result?.error) {
            setIsLoading(false)

            setError('Invalid username or password');
        } else {
            setIsLoading(false)
            router.push("/dashboard")
        }
        setIsLoading(false)


    };
    return (
        <>

            <div className="flex flex-col lg:flex-row min-h-screen w-full ">
                {/* LEFT CONTENT - Fixed */}
                <VectorCard >
                    <ImageCard src={'/asserts/login.jpg'} />
                </VectorCard>

                {/* Spacer for fixed left content */}
                <div className="hidden lg:block lg:w-1/2" />

                {/* RIGHT CONTENT - Scrollable */}
                <div className="w-full mt-3 lg:mt-0 lg:w-1/2 space-y-3 pb-3 pt-3">




                    <div className="bg-muted p-5 rounded-2xl">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4  ">
                            <HeroHead
                                title="Login"
                                subtitle="Login to manage the image"
                                className=""
                            />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className=" rounded-md px-4 py-3 border placeholder:font-thin focus:outline-none focus:ring-2 focus:ring-foreground"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className=" rounded-md px-4 py-3 border placeholder:font-thin focus:outline-none focus:ring-2 focus:ring-foreground"
                            />

                            <AnimatedButton
                                title='Sign In'
                                type="submit"
                                icon={<PiArrowRightLight />}
                                next_icon={<PiArrowRightLight />}

                                onSubmit={handleSubmit}
                                isLoading={isLoading}
                                className='bg-foreground text-background hover:bg-'
                            />

                        </form>

                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default LoginForm