import EditSection from '@/app/(cms)/_components/EditSection'


import React from 'react'


const Edit = async (
    {
        params,
    }: {
        params: Promise<{ img: string }>
    }
) => {

    const img = (await params).img
    return (
        <>
            <div className='bg-background '>

                <EditSection img_id={img} />
            </div>
        </>
    )
}

export default Edit