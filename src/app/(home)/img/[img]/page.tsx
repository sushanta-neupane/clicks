import Nav from '../../_components/Nav'
import ViewImage from '../../_components/ViewImage'

const Page = async (
    {
        params,
    }: {
        params: Promise<{ img: string }>
    }
) => {
    const img_id = (await params).img


    return (
        <>
            <div className='bg-background '>
                <Nav />
                <ViewImage img_id={img_id} />

            </div>

        </>
    )
}

export default Page






