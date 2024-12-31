"use client";

import useFetchImages from '@/hooks/useFetchImages';
import { Photo } from '@/models/Images';
import React, { useState, useEffect } from 'react';
import ImgContainer from "./ImgContainer";
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import HeroHead from '../(home)/_components/HeroHead';
import { useRouter } from 'next/navigation';
import Loading from './loading';
import MsgCard from './MsgCard';

const Gallery = () => {
    const { images, isLoading, status } = useFetchImages();
    const [filteredImages, setFilteredImages] = useState<Photo[]>([]);
    const [searchText, setSearchText] = useState('');
    const [searched, setSearched] = useState(false);
    const router = useRouter(); // Hook to access the router for navigation

    // Update filteredImages when images are fetched
    useEffect(() => {
        if (images?.photos) {
            setFilteredImages(images.photos);
        }
    }, [images]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (searched && searchText) {
            // Clear filter if already searched and searchText is empty
            setFilteredImages(images?.photos || []);
            setSearched(false);
            return;
        }

        if (!images || !searchText) return;

        // Filter based on search text
        const filtered = images.photos.filter((image) =>
            Array.isArray(image.tags) &&
            image.tags.some((tag) => tag.toLowerCase().includes(searchText.toLowerCase()))
        );

        setFilteredImages(filtered);
        setSearched(true);
    };

    if (isLoading) {
        return <Loading />;
    }
    if (!filteredImages || status !== 'success') {
        return <MsgCard msg='Failed to load images' />;
    }

    return (
        <>
            <div className='flex justify-between items-center gap-4 my-5 mt-10'>
                {/* Back Button */}
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 bg-gray-200 px-4 py-2 ml-4 rounded-full w-10 h-10 hover:bg-gray-300 text-black text-sm">
                    <FaArrowLeft />
                </button>

                {/* Search Bar */}
                <div className="bg-background overflow-hidden border px-4 rounded-2xl mx-4 w-64">
                    <form onSubmit={handleFormSubmit}>
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                className="w-full py-2 text-sm bg-transparent border-none placeholder-black focus:outline-none text-black"
                                placeholder="Search..."
                                value={searchText}
                                onChange={handleInputChange}
                            />
                            <button
                                type="submit"
                                className="text-black text-xl"
                            >
                                {searched && searchText ? <FaX /> : <FaSearch />}
                            </button>
                        </div>
                    </form>
                </div>
            </div>


            <HeroHead
                title="Mansory Grid View"
                subtitle={`Enjoy the mansory  grid view`}
                className="text-black mx-6"
            />

            {searched && searchText && (
                <HeroHead
                    title=""
                    subtitle={`Results for "${searchText}"`}
                    className="text-black text-center"
                />
            )}

            <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
                {filteredImages.length === 0 && (
                    <HeroHead
                        className='mt-5 text-black'
                        title='Not Found'
                        subtitle='Try searching for something else'
                    />
                )}
                {filteredImages &&
                    filteredImages.map((photo, index) => (
                        <ImgContainer key={photo.img_id} index={index} photo={photo} />
                    ))}
            </section>
        </>
    );
};

export default Gallery;
