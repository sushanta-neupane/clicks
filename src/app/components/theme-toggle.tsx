"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();


    const handleToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div onClick={handleToggle} className="cursor-pointer">
            {theme === "dark" ? <FaToggleOn size={18} /> : <FaToggleOff size={18} />}
        </div>
    );
}
