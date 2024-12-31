import type { Photo } from '@/models/Images';
import Image from "next/image";
import Link from "next/link";

interface ImgContainerProps {
    photo: Photo;
    index: number
}

const ImgContainer = ({ photo, index }: ImgContainerProps) => {
    const widthHeightRatio = photo.height / photo.width;
    const galleryHeight = Math.ceil(250 * widthHeightRatio);
    const photoSpan = Math.ceil(galleryHeight / 10) + 1;
    return (
        <div
            className="w-[250px] justify-self-center "
            style={{ gridRow: `span ${photoSpan}` }}
        >
            <Link
                href={`/img/${index}`}
                className="grid place-content-center"
            >
                <div className="overflow-hidden rounded-xl group">
                    <Image
                        src={photo.url}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        // placeholder="blur"
                        blurDataURL={photo.blurredDataUrl}
                        sizes="250px"
                        className="group-hover:opacity-75"
                    />
                </div>
            </Link>
        </div>
    );
};

export default ImgContainer;
