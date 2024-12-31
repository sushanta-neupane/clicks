"use client"
import PhotoGrid from '@/app/(home)/_components/PhotoGrid'
import VectorCard from '@/app/components/Card/VectorCard'
import Footer from '@/app/components/Footer'
import MotionFadeIn from '@/app/components/motion-fade-in'
import ProfileCard from '@/app/components/profile-card'
import React from 'react'
import UploadCard from '../../_components/UploadCard'
import { ImageSlider } from '@/app/components/img-slider'

const Dashboard = () => {
    return (
        <>

            <div className="flex flex-col lg:flex-row min-h-screen w-full">
                {/* LEFT CONTENT - Fixed */}
                <VectorCard>
                    <ImageSlider />
                </VectorCard>

                {/* Spacer for fixed left content */}
                <div className="hidden lg:block lg:w-1/2" />

                {/* RIGHT CONTENT - Scrollable */}
                <div className="w-full mt-3 lg:mt-0 lg:w-1/2 space-y-3 pb-3 ">

                    <MotionFadeIn delay={0.4}>
                        <UploadCard />
                    </MotionFadeIn>

                    <MotionFadeIn delay={0.4}>
                        <PhotoGrid isAdmin />
                    </MotionFadeIn>


                    <MotionFadeIn delay={0.4}>
                        <ProfileCard />
                    </MotionFadeIn>

                    <MotionFadeIn delay={0.4}>
                        <Footer />
                    </MotionFadeIn>


                </div>
            </div>
        </>
    )
}

export default Dashboard