"use client"
import DragNDrop, { ExtendedImage } from '@/app/components/drag-n-drop'
import { useState } from 'react'
import { uploadImage } from '@/supabase/storage/client'
import toast from 'react-hot-toast'
import HeroHead from '@/app/(home)/_components/HeroHead'
import AnimatedButton from '@/app/components/animated-button'
import MotionFadeIn from '@/app/components/motion-fade-in'
import { PiUpload, PiArrowUp } from 'react-icons/pi'




const UploadCard = () => {
    const [images, setImages] = useState<ExtendedImage[]>();
    const [isLoading, setLoading] = useState(false);

    const handleUpload = async () => {


        if (!images) return null;

        try {
            setLoading(true)
            for (const img of images) {

                const { error } = await uploadImage({
                    file: img.file!,
                    bucket: "clicks",
                    options: {
                        tags: img.tags!,
                        alt: img.altText!,
                    },
                });

                if (error) {
                    toast.error("Failed to upload images!");
                    return;
                }



            }

            // Successfully uploaded images
            toast.success("Images uploaded successfully");

            setLoading(false)



        } catch (error) {

            console.error('Error uploading images:', error);
            toast.error("Failed to upload images!");

        } finally {
            setLoading(false); // Stop loading

        }

    };
    return (
        <>


            <div className='h-full pt-10 px-5'>

                <HeroHead className="pb-10" title='Upload Image' subtitle='Upload the Image to the Store' />

                <DragNDrop setImageState={setImages} isMultiple />


                {images && images?.length > 0 && (

                    <>
                        <MotionFadeIn delay={0.4} className="h-full">
                            <AnimatedButton
                                title="Upload"
                                className="w-1/2 hover:bg-primary hover:text-white dark:hover:text-muted transition-all"
                                icon={<PiUpload />}
                                next_icon={<PiArrowUp />}
                                isLoading={isLoading}
                                onClick={handleUpload}

                            />
                        </MotionFadeIn>
                    </>
                )}
            </div>
        </>
    )
}

export default UploadCard