import React, { useState } from 'react';
import { Upload, Sparkles } from 'lucide-react';
import ImageUploading, { ImageListType } from "react-images-uploading";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import Image from "next/image";
import toast from "react-hot-toast";
import { extractKeywords } from '@/lib/utils';
import { FaPlus } from 'react-icons/fa6';
import { PiX } from 'react-icons/pi';
import TextArea from './text-area';

type Props = {
    setImageState: (img: ImageListType) => void;
    isMultiple?: boolean;

}

export type ExtendedImage = {
    altText?: string;
    tags?: string[];
} & ImageListType[number]; // Extend each image with altText and tags


const DragNDrop = ({ setImageState, isMultiple }: Props) => {
    const [image, setImage] = useState<ExtendedImage[]>([]);
    const [altText, setAltText] = useState("");
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState<string[]>([]);


    const onChange = (img: ImageListType) => {
        const extendedImages = img.map((img) => ({
            ...img,
            altText: undefined,
            tags: [],
        }));
        setImage(extendedImages);


        setImageState(extendedImages)

    };



    const handleGenerateAltText = async () => {
        if (image.length === 0) {
            toast.error("Provide an image to generate alt text.");
            return;
        }

        setLoading(true);

        try {

            const updatedImages = await Promise.all(
                image.map(async (img) => {
                    if (!img.file) return img;

                    const response = await fetch('/api/generate_alt_text', {
                        method: 'POST',
                        body: img.file,
                    });

                    const data = await response.json();
                    if (!data.success) {
                        throw new Error(data.error || 'Unknown error');
                    }

                    const generatedAltText = data.result[0].generated_text;
                    setAltText(generatedAltText);
                    setTags(extractKeywords(generatedAltText))

                    return {
                        ...img,
                        altText: generatedAltText,
                        tags: extractKeywords(generatedAltText),
                    };
                })
            );

            setImage(updatedImages);


            setImageState(updatedImages)

            toast.success("Alt text generated successfully!");
        } catch (err) {
            console.log(err);
            toast.error("Failed to generate alt text!");
        } finally {
            setLoading(false);
        }
    };



    const handleAltTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAltText(e.target.value);
        setTags(extractKeywords(e.target.value));
    };

    return (
        <div className="">
            <ImageUploading
                multiple={isMultiple}
                value={image}
                onChange={onChange}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    onImageRemoveAll
                }) => (
                    <div className="gap-4">
                        {/* Image Preview */}
                        <div className="flex flex-wrap gap-4 ">
                            {imageList.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative group w-32 h-32 rounded-lg overflow-hidden border border-gray-200 shadow-sm"
                                >
                                    <Image
                                        height={128}
                                        width={128}
                                        src={image["data_url"]}
                                        alt="Uploaded preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button
                                            className="p-1.5 rounded-full bg-white/90 text-gray-700 hover:bg-white"
                                            onClick={() => onImageUpdate(index)}
                                        >
                                            <AiOutlineEdit size={16} />
                                        </button>
                                        <button
                                            className="p-1.5 rounded-full bg-white/90 text-gray-700 hover:bg-white"
                                            onClick={() => onImageRemove(index)}
                                        >
                                            <AiOutlineClose size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {isMultiple && image.length > 0 && (
                                <div className='flex justify-center items-center gap-2'>
                                    <div onClick={onImageUpload} className='border flex justify-center items-center h-10 w-10 rounded-full'><FaPlus /></div>
                                    <div onClick={onImageRemoveAll} className='border flex justify-center items-center h-10 w-10 rounded-full'><PiX /></div>
                                </div>
                            )}
                        </div>

                        {/* Upload Area */}
                        {image.length <= 0 && (
                            <>
                                <div
                                    className={`w-full h-48 flex flex-col items-center justify-center gap-3 border-2 
                            ${isDragging ? "border-neutral-500 bg-blue-50" : "border-gray-300"} 
                            border-dashed rounded-lg cursor-pointer hover:border-neutral-400 hover:bg-background transition-colors`}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    <div {...dragProps} className="flex flex-col items-center justify-center w-full h-full">
                                        <Upload className="w-8 h-8 text-gray-400" />
                                        <div className="text-center">
                                            <span className="text-sm text-gray-600">
                                                Drop your image here, or{" "}
                                                <span className="text-blue-500 font-medium">browse</span>
                                            </span>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Supports: JPG, PNG, GIF
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Generate Alt Text Button */}
                        {image.length > 0 && (
                            <div
                                onClick={handleGenerateAltText}
                                className="flex items-center gap-2 text-sm text-foreground cursor-pointer my-4"
                            >
                                {loading ? (
                                    <Sparkles size={15} className="animate-spin" />
                                ) : (
                                    <Sparkles size={15} />
                                )}
                                Generate Alt Text
                            </div>
                        )}

                        {/* Alt Text Display - Now Editable with Copy Button */}
                        {altText && image.length > 0 && (


                            <div className="my-4 p-4 bg-transparent rounded-lg border border-gray-200 relative">
                                <h3 className="text-sm font-medium text-foreground mb-2">Generated Alt Text</h3>
                                <TextArea
                                    tags={tags}
                                    altText={altText}
                                    handleAltTextChange={handleAltTextChange}

                                />

                            </div>
                        )}


                    </div>
                )}
            </ImageUploading>
        </div>
    );
};

export default DragNDrop;