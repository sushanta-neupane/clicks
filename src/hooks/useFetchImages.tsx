"use client"

import { ImagesResults } from '@/models/Images';
import { useQuery } from '@tanstack/react-query'


const useFetchImages = () => {

    const { data: images, isLoading, status } = useQuery({
        queryKey: ['image'],
        queryFn: async () => {
            const res = await fetch(`/api/images`);
            const result = await res.json();

            return result.result as ImagesResults;
        }
    })
    return { images, isLoading, status }
}

export default useFetchImages

