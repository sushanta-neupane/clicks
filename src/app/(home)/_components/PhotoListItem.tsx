import React from 'react';
import { Photo } from '@/models/Images';
import Image from 'next/image';
import { motion } from 'framer-motion';
import router from 'next/router';

const PhotoListItem = ({ photo, isAdmin }: { photo: Photo, isAdmin?: boolean }) => {
    return (
        <motion.div
            className="cursor-pointer flex justify-between h-full   gap-4 p-3 w-full"
            onClick={() => router.push(`${isAdmin ? (`/dashboard/edit/${photo.img_id}`) : (`/img/${photo.img_id}`)}`)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <Image
                src={photo.url}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1">
                <h3 className="text-xs font-medium flex flex-wrap gap-4">
                    <p className="text-xs text-foreground">{photo.alt || 'No description available'}</p>
                    {photo.tags.map((tag, index) => (
                        <span
                            key={index}
                            className=" text-indigo-700 text-xs"
                        >
                            #{tag}
                        </span>
                    ))}
                </h3>
            </div>
        </motion.div>
    );
};

export default PhotoListItem;
