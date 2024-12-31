"use client"
import React, { memo, useState, useEffect } from 'react';
import PhotoCard from './photo-card';
import { Photo } from '@/models/Images';
import useFetchImages from '@/hooks/useFetchImages';
import { FaSearch } from "react-icons/fa";
import HeroHead from './HeroHead';
import { FaX } from 'react-icons/fa6';
import { CiGrid31, CiBoxList } from 'react-icons/ci';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import PhotoListItem from './PhotoListItem';
import Loading from '@/app/components/loading';
import MsgCard from '@/app/components/MsgCard';


const PhotoGrid = ({ isAdmin }: { isAdmin?: boolean }) => {
    const { images, isLoading, status } = useFetchImages();
    const [filteredImages, setFilteredImages] = useState<Photo[]>([]);
    const [searchText, setSearchText] = useState('');
    const [searched, setSearched] = useState(false);
    const [displayType, setDisplayType] = React.useState<"grid" | "list">("grid")

    const dropdownIcons: Record<"grid" | "list", React.ReactNode> = {
        grid: <CiGrid31 />,
        list: <CiBoxList />,
    };
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
        return <MsgCard msg='Failed to load iamges' />;
    }


    return (
        <>

            <div className='flex justify-between items-center gap-4'>

                <div className="bg-background overflow-hidden border px-4 rounded-2xl my-5 flex-1 " >
                    <form onSubmit={handleFormSubmit}>
                        <div className="flex items-center gap-5">
                            <input
                                type="text"
                                className="w-full py-3 text-sm bg-background border-none placeholder-neutral-500 focus:outline-none"
                                placeholder="Search..."
                                value={searchText}
                                onChange={handleInputChange}
                            />
                            <button
                                type="submit"
                                className="text-foreground"
                            >
                                {searched && searchText ? <FaX /> : <FaSearch />}
                            </button>
                        </div>
                    </form>

                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                            {dropdownIcons[displayType]}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 z-50">

                        <DropdownMenuRadioGroup value={displayType} onValueChange={(value) => setDisplayType(value as "grid" | "list")}>

                            {Object.entries(dropdownIcons).map(([key, icon]) => (
                                <DropdownMenuRadioItem
                                    key={key} // Use the key from the object
                                    value={key} // The key is used as the value
                                    className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer transition"
                                >
                                    {icon}

                                </DropdownMenuRadioItem>))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

            {searched && searchText && (
                <HeroHead
                    title=""
                    subtitle={`Results for "${searchText}"`}
                    className=""
                />
            )}

            <div className="mt-3 w-full grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-[70vh]">
                {filteredImages.length === 0 && (
                    <HeroHead
                        className='mt-5'
                        title='Not Found'
                        subtitle='Try search other'
                    />
                )}
                {filteredImages.map((p: Photo) => (
                    displayType === 'grid' ? (
                        <PhotoCard
                            key={p.img_id}
                            title={p.tags ? p.tags[0] : 'unknown'}
                            src={p.url}
                            img_id={p.img_id}
                            isAdmin={isAdmin}
                        />
                    ) : (
                        <PhotoListItem
                            key={p.img_id}
                            photo={p}
                            isAdmin={isAdmin!}

                        />
                    )
                ))}
            </div>
        </>
    );
};

export default memo(PhotoGrid);
