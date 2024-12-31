"use client"


import { Photo } from '@/models/Images';
import { useQuery } from '@tanstack/react-query'


const useFetchImage = (img_id: string) => {

    const { data: images, isLoading, status } = useQuery({
        queryKey: ['image' + img_id],
        queryFn: async () => {
            const res = await fetch(`/api/images/${img_id}`);
            const result = await res.json();

            return result.result as Photo;
        }
    })
    return { images, isLoading, status }
}

export default useFetchImage

