import React from 'react'

type Props = {
    title: string;
    subtitle: string;
    className: string;
}
const HeroHead = ({ title, subtitle, className }: Props) => {
    return (
        <div className={` w-full font-light text-black dark:text-white ${className}`}>
            <h1 className="text-balance text-xl  tracking-tight  sm:text-md">{title}</h1>
            <p className=" text-pretty text-sm  text-gray opacity-60">{subtitle}</p>
        </div>
    )
}

export default HeroHead

