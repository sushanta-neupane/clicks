"use client"
import { useState, useEffect } from 'react';

function useKeyPress(targetKeys: string[] | string) {
    const [keyPressed, setKeyPressed] = useState(false);

    const downHandler = (event: KeyboardEvent) => {
        const key = event.key.toLowerCase(); // Normalize key to lowercase for consistency
        const targetKeyList = Array.isArray(targetKeys) ? targetKeys.map(k => k.toLowerCase()) : [targetKeys.toLowerCase()];

        if (targetKeyList.includes(key)) {
            setKeyPressed(true);
        }
    };

    const upHandler = (event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        const targetKeyList = Array.isArray(targetKeys) ? targetKeys.map(k => k.toLowerCase()) : [targetKeys.toLowerCase()];

        if (targetKeyList.includes(key)) {
            setKeyPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, [targetKeys]);

    return keyPressed;
}

export default useKeyPress;
