import Footer from '@/app/components/Footer'
import { ImageSlider } from '@/app/components/img-slider'
import MotionFadeIn from '@/app/components/motion-fade-in'
import ProfileCard from '@/app/components/profile-card'

import ImgToText from './_components/ImgToText'

import PhotoGrid from './_components/PhotoGrid'
import VectorCard from '../components/Card/VectorCard'


const Page = () => {

    return (
        <>
            <div className='bg-background   '>

                <div className="flex flex-col lg:flex-row min-h-screen w-full ">
                    {/* LEFT CONTENT - Fixed */}

                    <VectorCard>

                        <ImageSlider />
                    </VectorCard>

                    {/* Spacer for fixed left content */}
                    <div className="hidden lg:block lg:w-1/2" />

                    {/* RIGHT CONTENT - Scrollable */}
                    <div className="w-full mt-3 lg:mt-0 lg:w-1/2 space-y-3 pb-3 pt-3">



                        <MotionFadeIn delay={0.4}>
                            <ImgToText />
                        </MotionFadeIn>

                        <MotionFadeIn delay={0.4}>


                            <PhotoGrid />

                        </MotionFadeIn>


                        <MotionFadeIn>
                            <ProfileCard />
                        </MotionFadeIn>



                        <MotionFadeIn delay={0.4}>
                            <Footer />
                        </MotionFadeIn>


                    </div>
                </div>
            </div>

        </>
    )
}

export default Page






