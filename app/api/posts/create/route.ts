import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Post from '@/models/Post';
import slugify from 'slugify';

export async function POST(req: NextRequest) {
  await dbConnect();

  const { title, content } = await req.json();
  const slug = slugify(title, { lower: true, strict: true });

try {
  const post = await Post.create({ title, content, slug });
  return NextResponse.json({ success: true, post });
} catch (error: unknown) {
  if (error instanceof Error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: false, error: 'Unknown error occurred' },
    { status: 500 }
  );
}

}
