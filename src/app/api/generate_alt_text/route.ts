import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Read the binary data from the request body
    const body = await request.arrayBuffer();
    const buffer = Buffer.from(body);

    // Send the binary data to Hugging Face API
    const response = await fetch(
      'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API}`,
          'Content-Type': 'application/octet-stream',
        },
        body: buffer,
      }
    );

    // Parse and return the result
    const result = await response.json();
    return NextResponse.json({ success: true, result }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error in POST /api/generate_alt_text:', error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
