import { listImages } from '@/supabase/storage/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET!;
    const table = process.env.NEXT_PUBLIC_SUPABASE_TABLE!;

    const result = await listImages(table);

    return NextResponse.json({ success: true, result }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error in GET /api/fetch_images:', error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
