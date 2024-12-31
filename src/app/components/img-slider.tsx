"use client"
import React, { } from 'react'
import Carousel from './ModernCarousel'
import Image from 'next/image'
import { memo } from 'react'

import useFetchImages from '@/hooks/useFetchImages'
import { getRandomIndices } from '@/lib/generateFive'
import Loading from './loading'
import MsgCard from './MsgCard'



const ImageSlider = memo(function ImageSlider() {

    const { images, isLoading, status } = useFetchImages()

    if (isLoading || !images) {
        return <Loading />
    }
    if (status !== "success") {
        return <MsgCard msg='Failed to load Image' />
    }

    // Generate 5 random indices
    const randomIndices = getRandomIndices(images?.photos.length, 5);

    return (
        <>
            <Carousel
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                containerClassName="h-full"
            >
                {randomIndices.map((index: number) => {
                    const photo = images?.photos[index];
                    return (
                        <div key={index} className="flex-[0_0_100%] h-full relative">
                            <div className='absolute inset-0'>
                                <Image
                                    alt='img'
                                    height={1080}
                                    width={1080}
                                    src={photo.url}
                                    className='transition-opacity duration-500 ease-in-out w-full h-full object-cover '
                                />
                            </div>
                        </div>
                    );
                })}
            </Carousel>
        </>
    )
});

export { ImageSlider };
