import React from 'react';
import { PiSpinner } from 'react-icons/pi';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen w-full ">
            <PiSpinner className="animate-spin" />
        </div>
    );
};

export default Loading;
