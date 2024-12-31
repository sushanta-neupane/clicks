"use client";
import React, { useEffect, useState } from "react";
import PhotoGrid from "@/app/(home)/_components/PhotoGrid";
import VectorCard from "@/app/components/Card/VectorCard";
import Footer from "@/app/components/Footer";
import ProfileCard from "@/app/components/profile-card";
import ImageCard from "./ImageCard";
import AnimatedButton from "@/app/components/animated-button";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import { deleteImage, editImage } from "@/supabase/storage/client";
import toast from "react-hot-toast";

import { extractKeywords } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import { PiDownloadSimple } from 'react-icons/pi';
import { AiOutlineExpandAlt } from 'react-icons/ai';
import TextArea from '@/app/components/text-area';
import Loading from '@/app/components/loading';
import MsgCard from '@/app/components/MsgCard';
import useFetchImage from '@/hooks/useFetchImage';



const EditSection = ({ img_id }: { img_id: string }) => {
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [isLoadingEdit, setIsLoadingEdit] = useState(false);
    const [altText, setAltText] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const router = useRouter();
    const { images, status, isLoading } = useFetchImage(img_id);


    const handleAltTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newAltText = e.target.value;
        setAltText(newAltText);
        setTags(extractKeywords(newAltText));
    };


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


    const handleEdit = async () => {

        try {
            setIsLoadingEdit(true);
            const updatedData = { alt: altText, tags }
            const { error } = await editImage(img_id, updatedData);

            if (error) {
                toast.error("Failed to load image data!");
                return;
            }

            toast.success("Image Edited successfully!");


        } catch (err) {
            console.error("Error fetching image data:", err);
            toast.error("Something went wrong while fetching image data!");
        } finally {
            setIsLoadingEdit(false);
        }

    }
    const handleDelete = async () => {
        if (!images) return;

        try {
            setIsLoadingDelete(true);
            const { error } = await deleteImage(images.url, img_id);

            if (error) {
                toast.error("Failed to load image data!");
                return;
            }


            toast.success("Image deleted successfully!");
            router.push(`/dashboard`)

        } catch (err) {
            console.error("Error fetching image data:", err);
            toast.error("Something went wrong while fetching image data!");
        } finally {
            setIsLoadingDelete(false);
        }

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
                        {images.width} x {images.height}
                    </span>
                    <span className='text-sm text-gray-600'>
                        {images.img_id}.jpg
                    </span>
                    <div className="flex gap-3">
                        {/* View Full Button */}
                        <button
                            className="bg-muted hover:bg-foreground hover:text-muted transition rounded-full w-7 h-7 flex justify-center items-center"
                            title="Expand"
                        >
                            <AiOutlineExpandAlt />
                        </button>

                        {/* Download Button */}
                        <button
                            className="bg-muted hover:bg-foreground hover:text-muted transition rounded-full w-7 h-7 flex justify-center items-center"
                            title="Download"
                        >
                            <PiDownloadSimple />
                        </button>
                    </div>
                </div>

                <TextArea
                    tags={tags}
                    altText={altText}
                    handleAltTextChange={handleAltTextChange}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 items-stretch">
                    <AnimatedButton
                        title="Edit"
                        icon={<MdEdit size={15} />}
                        next_icon={<MdEdit size={15} />}
                        isLoading={isLoadingEdit}
                        disable={isLoadingEdit && (images.alt == altText)}
                        onClick={handleEdit}
                        className="w-full hover:bg-primary hover:text-white dark:hover:text-muted transition-all "
                    />
                    <AnimatedButton
                        title="Delete"
                        icon={<MdOutlineDelete size={15} />}
                        next_icon={<MdOutlineDelete size={15} />}
                        isLoading={isLoadingDelete}
                        disable={isLoadingDelete}
                        onClick={handleDelete}
                        className="w-full hover:bg-red-500 hover:text-white dark:hover:text-muted transition-all"
                    />
                </div>



                <PhotoGrid />
                <ProfileCard />
                <Footer />
            </div>
        </div>
    );
};

export default EditSection;
