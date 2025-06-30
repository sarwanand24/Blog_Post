import { dbConnect } from '@/lib/dbConnect';
import Post from '@/models/Post';
import { NextRequest, NextResponse } from 'next/server';

// ✅ GET Handler
export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  await dbConnect();

  const post = await Post.findOne({ slug });
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ post });
}

// ✅ PUT Handler
export async function PUT(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  await dbConnect();

  const { title, content } = await req.json();
  const post = await Post.findOneAndUpdate(
    { slug },
    { title, content },
    { new: true }
  );

  return NextResponse.json({ post });
}

// ✅ DELETE Handler
export async function DELETE(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  await dbConnect();

  await Post.findOneAndDelete({ slug });
  return NextResponse.json({ success: true });
}
