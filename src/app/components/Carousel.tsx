"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { Photo } from '@/models/Images'
import { useRouter } from 'next/navigation'

type CarouselProps = {
    images: Photo[];
    index: number
}

const Carousel = ({ index, images }: CarouselProps) => {
    const [currIndex, setCurrIndex] = useState(index);
    const [direction, setDirection] = useState<'left' | 'right' | 'none'>('none');
    const currentImage = images[currIndex];
    const router = useRouter();


    function handleClose() {
        router.push('/')
    }

    useEffect(() => {
        if (currIndex !== index) {
            router.replace(`/img/${currIndex}`);
        }
    }, [currIndex, router]);

    const handleChangeIndex = (newVal: number) => {
        const clampedIndex = Math.max(0, Math.min(images.length - 1, newVal));
        setDirection(clampedIndex > currIndex ? 'right' : 'left');
        setCurrIndex(clampedIndex);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <button
                className="absolute inset-0 z-30 cursor-default"
            >
                <Image
                    src={`${currentImage.blurredDataUrl}`}
                    className="pointer-events-none h-full w-full"
                    alt="blurred background"
                    fill
                    priority={true}
                />
            </button>

            <Modal
                changeIndex={handleChangeIndex}
                closeModal={handleClose}
                images={images}
                index={currIndex}
                direction={direction}
            />
        </div>
    )
}

export default Carousel
