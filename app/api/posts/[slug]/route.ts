// app/api/posts/[slug]/route.ts
import { dbConnect } from '@/lib/dbConnect';
import Post from '@/models/Post';
import { NextRequest, NextResponse } from 'next/server';

// ✅ GET Handler
export async function GET(req: NextRequest, context: Promise<{ params: { slug: string } }>) {
  const { params } = await context;
  await dbConnect();

  const post = await Post.findOne({ slug: params.slug });
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ post });
}

// ✅ PUT Handler
export async function PUT(req: NextRequest, context: Promise<{ params: { slug: string } }>) {
  const { params } = await context;
  await dbConnect();

  const { title, content } = await req.json();
  const post = await Post.findOneAndUpdate(
    { slug: params.slug },
    { title, content },
    { new: true }
  );

  return NextResponse.json({ post });
}

// ✅ DELETE Handler
export async function DELETE(req: NextRequest, context: Promise<{ params: { slug: string } }>) {
  const { params } = await context;
  await dbConnect();

  await Post.findOneAndDelete({ slug: params.slug });
  return NextResponse.json({ success: true });
}
