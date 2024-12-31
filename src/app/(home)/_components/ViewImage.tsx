"use client";
import React, { useEffect, useState } from "react";
import PhotoGrid from "@/app/(home)/_components/PhotoGrid";
import VectorCard from "@/app/components/Card/VectorCard";
import Footer from "@/app/components/Footer";
import ProfileCard from "@/app/components/profile-card";
import ImageCard from '@/app/(cms)/_components/ImageCard';
import Loading from '@/app/components/loading';
import MsgCard from '@/app/components/MsgCard';
import useFetchImage from '@/hooks/useFetchImage';
import TextArea from '@/app/components/text-area';
import { AiOutlineExpandAlt } from 'react-icons/ai';
import { PiDownloadSimple } from 'react-icons/pi';
import downloadPhoto from '@/lib/download';



const ViewImage = ({ img_id }: { img_id: string }) => {

    const [altText, setAltText] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const { images, status, isLoading } = useFetchImage(img_id);

    useEffect(() => {
        if (images) {

            setAltText(images.alt);
            setTags(images.tags);
        }
    }, [images])



    if (isLoading || !images) {
        return <Loading />;
    }
    if (status != 'success') {
        return <MsgCard msg='Failed to load image data' />;
    }






    return (
        <div className="flex flex-col lg:flex-row min-h-screen w-full">
            {/* LEFT CONTENT - Fixed */}
            <VectorCard >
                <ImageCard src={images.url} />
            </VectorCard>

            {/* Spacer for fixed left content */}
            <div className="hidden lg:block lg:w-1/2" />

            {/* RIGHT CONTENT - Scrollable */}
            <div className="w-full mt-3 lg:mt-0 lg:w-1/2 space-y-3 pb-3 ">

                <div className="flex mx-2 justify-between items-center">
                    <span className='text-sm text-gray-600'>
                        {images.tags[0]}.jpg
                    </span>
                    <span className='text-sm text-gray-600'>
                        {images.width} x {images.height}
                    </span>
                    <div className="flex gap-3">
                        {/* View Full Button */}
                        <button
                            className="bg-muted hover:bg-foreground hover:text-muted transition rounded-full w-7 h-7 flex justify-center items-center"
                            title="Expand"
                            onClick={() => window.open(images.url, '_blank')}

                        >

                            <AiOutlineExpandAlt />
                        </button>

                        {/* Download Button */}
                        <button
                            className="bg-muted hover:bg-foreground hover:text-muted transition rounded-full w-7 h-7 flex justify-center items-center"
                            title="Download"
                            onClick={(() => downloadPhoto(images.url, images.alt[0]))}
                        >
                            <PiDownloadSimple />
                        </button>
                    </div>
                </div>
                <TextArea
                    altText={altText}
                    tags={tags}
                    handleAltTextChange={() => null}


                />
                <PhotoGrid isAdmin={false} />
                <ProfileCard />
                <Footer />
            </div>
        </div>
    );
};

export default ViewImage;
