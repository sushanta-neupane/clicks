"use client";
import React from "react";
import DragNDrop from '../../components/drag-n-drop';
import HeroHead from './HeroHead';

const ImgToText = () => {



    return (
        <div className="flex flex-col gap-12 p-16 pb-12  rounded-xl font-light relative  bg-muted">

            <HeroHead className='' title='Image Alt Generation AI' subtitle='Convert your Image to Text Description ' />

            <DragNDrop setImageState={() => null} />
        </div>
    );
};

export default ImgToText;