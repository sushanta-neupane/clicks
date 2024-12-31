import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

type Props = {
    tags: string[];
    altText: string;
    handleAltTextChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextArea = ({ tags, altText, handleAltTextChange }: Props) => {
    const handleCopyAltText = () => {
        navigator.clipboard.writeText(altText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success("Alt text copied to clipboard!");
    };
    const [copied, setCopied] = useState(false);
    return (
        <div className=" relative grid grid-cols-1 items-stretch bg-muted rounded-2xl ">
            <textarea
                title="Generated Alt Text"
                value={altText}
                onChange={handleAltTextChange}
                className="w-full text-sm text-foreground bg-muted p-2 rounded-2xl border-none focus:outline-none resize-none min-h-[60px]"
            />
            <button
                onClick={handleCopyAltText}
                className="absolute bottom-0 right-0 p-2 text-gray-500 hover:text-gray-700"
                title="Copy alt text"
            >
                {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>

            <div className="my-2 flex gap-2 flex-wrap mx-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-indigo-100 text-indigo-700 text-xs py-1 px-3 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>


        </div>
    )
}

export default TextArea