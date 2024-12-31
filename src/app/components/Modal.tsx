"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";

import {
    FaArrowDown,
    FaChevronLeft,
    FaChevronRight,
    FaArrowUpRightFromSquare,
    FaX,
    FaCircleInfo,
    FaPencil,
} from "react-icons/fa6";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Photo } from '@/models/Images';
import downloadPhoto from '@/lib/download';
import useKeyPress from '@/hooks/useKeyPress';
import { useEffect, useState } from 'react';
import { deleteImage, editImage } from '@/supabase/storage/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type ModelProps = {
    index: number;
    images: Photo[];
    closeModal: () => void;
    changeIndex: (newVal: number) => void;
    direction: 'left' | 'right' | 'none'; // Add direction prop
};

export default function Model({ index, images, closeModal, changeIndex, direction }: ModelProps) {

    const startBefore = Math.max(0, index - 15);
    const endBefore = index;
    const startAfter = index + 1;
    const endAfter = Math.min(images.length, index + 16);

    const beforeImages = images.slice(startBefore, endBefore);
    const afterImages = images.slice(startAfter, endAfter);

    const filteredImages = [...beforeImages, images[index], ...afterImages];
    const isArrowRightPressed = useKeyPress('ArrowRight');
    const isArrowLeftPressed = useKeyPress('ArrowLeft');
    const isEscapePressed = useKeyPress('Escape');
    const [isEditing, setIsEditing] = useState(false); // Track edit mode
    const [newAlt, setNewAlt] = useState(images[index].alt); // Track the new alt value
    const router = useRouter();
    useEffect(() => {
        if (isArrowRightPressed) {
            changeIndex(index + 1); // Loop back to the first image
        }
    }, [isArrowRightPressed]);

    useEffect(() => {
        if (isArrowLeftPressed) {
            changeIndex(index - 1); // Loop back to the first image
        }
    }, [isArrowLeftPressed]);

    useEffect(() => {
        if (isEscapePressed) {
            closeModal();
        }
    }, [isEscapePressed]);

    const handleEdit = (img_id: string) => {
        editImage(img_id, {
            alt: newAlt
        })
        toast.success("Edited Img")

        router.push("/");
    }

    const handleDelete = (url: string, img_id: string) => {
        deleteImage(url, img_id);
        toast.success("Removed Img")
        router.push("/");


    }

    const toggleEditMode = () => setIsEditing((prev) => !prev);


    return (
        <MotionConfig
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            }}
        >
            <div className="relative z-50 flex w-full items-center justify-center h-screen bg-black/50 backdrop-blur-xl">
                {/* Main Image */}
                <div className="relative flex w-full h-full items-center justify-center">
                    <AnimatePresence>

                        <motion.div
                            key={index}
                            initial={direction === 'right' ? { x: "100%" } : direction === 'left' ? { x: "-100%" } : { x: 0 }}
                            animate={{ x: 0 }}
                            exit={direction === 'right' ? { x: "-100%" } : direction === 'left' ? { x: "100%" } : { x: 0 }}
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                            }}
                            className='relative'
                        >
                            <Image
                                src={images[index].url}
                                width={1280}
                                height={853}
                                priority
                                alt="Main image"
                                className="rounded-md object-contain max-h-[90vh] max-w-[90vw]"
                            />
                        </motion.div>


                    </AnimatePresence>
                </div>

                {/* Buttons + Navigation */}
                <div className="absolute inset-0 mx-auto flex items-center justify-center">

                    <div className="relative h-full w-full">
                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                            onClick={() => changeIndex(index - 1)}
                        >
                            <FaChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                            onClick={() => changeIndex(index + 1)}
                        >
                            <FaChevronRight className="h-6 w-6" />
                        </button>

                        {/* Close Button */}
                        <div className="absolute top-3 left-3 flex items-center gap-2 p-3 text-white">
                            <button
                                onClick={closeModal}
                                className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                            >
                                <FaX className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 flex items-center gap-2 p-3 text-white">
                            <Sheet>
                                <SheetTrigger className="rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white">
                                    <FaCircleInfo className="h-5 w-5" />
                                </SheetTrigger>
                                <SheetContent className="max-h-screen overflow-y-scroll bg-gray-50">
                                    <SheetHeader className="border-b pb-4">
                                        <SheetTitle className="text-xl font-bold text-gray-800">Image Details</SheetTitle>
                                        <SheetDescription className="text-sm text-gray-500">
                                            Explore detailed information about the image
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="p-6 w-full space-y-6">
                                        {/* Image Preview */}
                                        <div className="rounded-lg overflow-hidden shadow-md">
                                            <img
                                                src={images[index].url}
                                                alt={images[index].alt}
                                                className="w-full object-cover"
                                            />
                                        </div>

                                        {/* Image Details */}
                                        <div className="grid gap-6">
                                            {/* Editable Description */}
                                            <div className="space-y-2">
                                                <h4 className="text-base font-semibold text-gray-700 uppercase tracking-wide">
                                                    Description
                                                </h4>
                                                <div className="flex items-center gap-2">
                                                    {isEditing ? (
                                                        <input
                                                            title='Alt text'
                                                            type="text"
                                                            value={newAlt}
                                                            onChange={(e) => setNewAlt(e.target.value)}
                                                            className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        />
                                                    ) : (
                                                        <p className="text-sm text-gray-600">{images[index].alt}</p>
                                                    )}
                                                    <button
                                                        onClick={toggleEditMode}
                                                        className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                                    >
                                                        {isEditing ? (
                                                            <FaX className="h-4 w-4" /> // Cancel editing
                                                        ) : (
                                                            <FaPencil className="h-4 w-4" /> // Start editing
                                                        )}
                                                    </button>
                                                </div>
                                                {isEditing && (
                                                    <button
                                                        onClick={() => {
                                                            handleEdit(images[index].img_id);
                                                            toggleEditMode(); // Exit edit mode
                                                        }}
                                                        className="mt-2 px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition"
                                                    >
                                                        Save
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => {
                                                        handleDelete(images[index].url, images[index].img_id);
                                                    }}
                                                    className="mt-2 px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>


                            <button
                                className="rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                                title="Open full-size version"
                                onClick={() => window.open(images[index].url, '_blank')}
                            >
                                <FaArrowUpRightFromSquare className="h-5 w-5" />
                            </button>

                            <button
                                className="rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                                title="Download image"
                                onClick={() => downloadPhoto(images[index].url, images[index].tags[0])}
                            >
                                <FaArrowDown className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom Navigation Bar */}
                <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
                    <motion.div
                        initial={false}
                        className="mx-auto mt-6 mb-6 flex h-14 space-x-2"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            transform: `translateX(-${(index - 3) * 80}px)`, // Adjust to center the current image and shift others
                            transition: 'transform 0.3s ease', // Smooth transition for scrolling effect
                        }}
                    >
                        {filteredImages.map((item, idx) => {
                            const isCurrent = idx === index;
                            const isPrev = idx === index - 1;
                            const isNext = idx === index + 1;

                            return (
                                <motion.button
                                    key={idx}
                                    onClick={() => changeIndex(idx)}
                                    className={`relative inline-block h-full w-16 shrink-0 overflow-hidden rounded-md transform-gpu focus:outline-none shadow shadow-black/50 ${isCurrent ? 'scale-110' : ''
                                        } ${isPrev ? 'opacity-70' : ''} ${isNext ? 'opacity-70' : ''}`}
                                >
                                    <Image
                                        alt="Thumbnail"
                                        width={180}
                                        height={120}
                                        className={`h-full w-full object-cover transition hover:brightness-110 ${isCurrent ? 'brightness-100' : 'brightness-50'
                                            }`}
                                        src={item.url}
                                    />
                                </motion.button>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </MotionConfig>
    );
}
