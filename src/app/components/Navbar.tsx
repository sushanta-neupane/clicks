"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Import useRouter hook
import { LuSearch, LuX } from 'react-icons/lu';
import { TbCaptureFilled } from 'react-icons/tb';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter(); // Initialize useRouter
    const params = useSearchParams();
    const isSearched = params.get("s");

    useEffect(() => {
        if (isSearched) {
            setSearchTerm(isSearched);
        } else {
            setSearchTerm('');
        }
    }, [isSearched]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm) {
            router.push('?s=' + searchTerm); // Apply search filter
        }
    };

    const handleClearFilter = () => {
        router.push('/'); // Clear search filter by navigating to the base URL
    };

    return (
        <div className="flex items-center justify-between px-12 py-4">
            {/* Logo */}
            <div className="text-2xl font-bold tracking-widest text-neutral-600 items-center -gap-1">
                <span className="flex items-center">
                    CLI <TbCaptureFilled /> KS
                </span>
            </div>

            {/* Search Bar */}
            <div className="rounded-lg border bg-card text-card-foreground p-2 w-[25%]">
                <form onSubmit={handleSubmit}>
                    <div className="flex">
                        <input
                            title="alt-text"
                            type="text"
                            className="flex h-10 rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[90%] mr-2 border-0 ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:border-none border-transparent focus:border-transparent focus-visible:ring-none"
                            placeholder="Search photos ..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button
                            type="button"
                            title={isSearched ? "Clear search" : "Search"}
                            onClick={isSearched ? handleClearFilter : handleSubmit}
                            className="text-blue-500 bg-blue-100 rounded-md inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            {isSearched ? <LuX /> : <LuSearch />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Navbar;
