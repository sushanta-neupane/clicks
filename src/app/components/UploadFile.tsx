"use client";
import { convertBlobUrlToFile, extractKeywords } from '@/lib/utils';
import { uploadImage } from '@/supabase/storage/client';
import Image from 'next/image';
import React, { ChangeEvent, useRef, useState, useTransition } from 'react';
import { LuImagePlus, LuSparkles, LuUpload } from 'react-icons/lu';
import toast from 'react-hot-toast'; // Import react-hot-toast

const UploadFile = ({ onUploadSuccess }: { onUploadSuccess: () => void }) => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [altText, setAltText] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false); // Loading state

    const imageInputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File | null>();

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file) {
                setImage(file);
            }
            const filesArray = Array.from(e.target.files);
            const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
            setImageUrls([...imageUrls, ...newImageUrls]);
        }
    };

    const handleGenerateAltText = async () => {
        if (!image) {
            toast.error("Provide an image to generate alt text.");
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await fetch('/api/generate_alt_text', {
                method: 'POST',
                body: image,
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Unknown error');
            }

            const generatedAltText = data.result[0].generated_text;
            setAltText(generatedAltText); // Set the alt text
            setTags(extractKeywords(generatedAltText)); // Extract tags

            // Show success toast
            toast.success("Alt text generated successfully!");


        } catch (err) {
            console.log(err);
            toast.error("Failed to generate alt text!");
        } finally {
            setLoading(false);
        }
    };

    const handleClickUploadImagesButton = async () => {
        startTransition(async () => {
            const urls: string[] = [];
            setLoading(true); // Start loading



            try {
                for (const url of imageUrls) {
                    const imageFile = await convertBlobUrlToFile(url);
                    const { imageUrl, error } = await uploadImage({
                        file: imageFile,
                        bucket: "clicks",
                        options: {
                            tags: tags,
                            alt: altText,
                        },
                    });

                    if (error) {
                        toast.error("Failed to upload images!");
                        return;
                    }

                    urls.push(imageUrl);
                }

                // Successfully uploaded images
                toast.success("Images uploaded successfully");
                onUploadSuccess();

                setImageUrls([]); // Clear image URLs after upload
                setAltText(''); // Clear alt text after upload
                setTags([]); // Clear tags after upload
                setImage(null);//Clear Image from upload

            } catch (error) {
                console.error('Error uploading images:', error);
                toast.error("Failed to upload images!");
            } finally {
                setLoading(false); // Stop loading
            }
        });
    };

    const handleDeleteImage = (index: number) => {
        setImageUrls(imageUrls.filter((_, i) => i !== index));
    };

    const handleAltTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAltText(e.target.value);
        setTags(extractKeywords(e.target.value)); // Update tags when alt text changes manually
    };

    return (
        <div className="p-6 bg-white rounded-full mx-auto w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] max-w-[600px] ">
            {/* Image Upload Input */}
            <input
                type="file"
                hidden
                multiple
                ref={imageInputRef}
                onChange={handleImageChange}
                disabled={isPending}
            />

            {/* Image Preview */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-4">
                {imageUrls.map((url, index) => (
                    <div key={url} className="relative">
                        <Image
                            src={url}
                            width={300}
                            height={300}
                            alt={`Image ${index + 1}`}
                            className="object-cover rounded-lg shadow-md"
                        />
                        <button
                            title='clear'
                            onClick={() => handleDeleteImage(index)}
                            className="absolute top-2 right-2 text-white bg-gray-500 hover:bg-gray-700 rounded-full p-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            {/*  for Buttons and Input */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2">
                <form>
                    <div className="flex">
                        <button
                            title="hello"
                            type="button"
                            className="text-gray-500 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                            onClick={() => imageInputRef.current?.click()}
                            disabled={isPending}
                        >
                            <LuImagePlus />
                        </button>

                        <input
                            title="alt-text"
                            type="text"
                            className="flex h-10 rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[95%] mr-2 border-0 ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:border-none border-transparent focus:border-transparent focus-visible:ring-none"
                            placeholder="Describe the image..."
                            value={altText}
                            onChange={handleAltTextChange} // Update tags on manual alt text change
                        />

                        <button
                            title="Upload"
                            type="button"
                            className="text-blue-500 bg-blue-100 rounded-md inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                            onClick={handleClickUploadImagesButton}
                            disabled={isPending}
                        >
                            <LuUpload />
                        </button>
                    </div>
                </form>
            </div>

            {/* Generate Button */}
            {image && (
                <div
                    onClick={handleGenerateAltText}
                    className="inline-flex ml-1 justify-end items-center gap-2 text-sm text-gray-500 cursor-pointer mt-4"
                >
                    {loading ? (
                        <LuSparkles className=' animate-spin ' />
                    ) : (
                        <LuSparkles />
                    )}
                    Generate Alt Text
                </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
                <div className="mt-4 flex gap-2 flex-wrap">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-indigo-100 text-indigo-700 text-xs py-1 px-3 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}


        </div>
    );
};

export default UploadFile;
