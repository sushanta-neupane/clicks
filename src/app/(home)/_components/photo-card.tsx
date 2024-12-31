"use client";

import VectorTopLeftAnimation from '@/app/components/vector-top-left-animation';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { motion } from "framer-motion";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
    title: string;
    src: string;
    img_id: string;
    isAdmin?: boolean
}

const PhotoCard = ({ title, src, img_id, isAdmin }: Props) => {

    const router = useRouter();
    return (
        <motion.div
            className="w-full relative group cursor-pointer"
            onClick={() => router.push(`${isAdmin ? (`/dashboard/edit/${img_id}`) : (`/img/${img_id}`)}`)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <AspectRatio
                ratio={0.75 / 1}
                className="overflow-hidden rounded-lg relative"
            >
                <div className='absolute inset-0'>

                    <Image
                        alt='img'
                        height={1080}
                        width={1080}
                        src={src}
                        className='transition-opacity duration-500 ease-in-out w-full h-full object-cover  '
                    >

                    </Image>
                </div>
            </AspectRatio>

            <div className="absolute top-0 left-0 z-20">
                <VectorTopLeftAnimation title={title} />
            </div>
        </motion.div>
    );
};

export default PhotoCard;
