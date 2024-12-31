import Image from 'next/image'
import React from 'react'

const ImageCard = ({ src }: { src: string }) => {
    return (
        <div className='h-full  bg-muted'>
            <div className="flex-[0_0_100%] h-full relative">
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
            </div>
        </div>
    )
}

export default ImageCard