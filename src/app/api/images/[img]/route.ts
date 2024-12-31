import { Photo } from '@/models/Images';
import { getImage } from '@/supabase/storage/client';
import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: Request, context: any) {
  try {
    const { img } = await context.params;
    if (!img)
      return NextResponse.json({ success: false, error: 'provide img_id' });
    const result = (await getImage(img as string)) as Photo[];

    return NextResponse.json(
      { success: true, result: result[0] },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error in GET /api/fetch_images:', error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
