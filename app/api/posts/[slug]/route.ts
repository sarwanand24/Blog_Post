// app/api/posts/[slug]/route.ts
import { dbConnect } from '@/lib/dbConnect';
import Post from '@/models/Post';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: { slug: string } }) {
  await dbConnect();
  const slug = context.params.slug;

  const post = await Post.findOne({ slug });
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ post });
}

export async function PUT(req: NextRequest, context: { params: { slug: string } }) {
  await dbConnect();
  const { title, content } = await req.json();
  const slug = context.params.slug;

  const post = await Post.findOneAndUpdate(
    { slug },
    { title, content },
    { new: true }
  );

  return NextResponse.json({ post });
}

export async function DELETE(req: NextRequest, context: { params: { slug: string } }) {
  await dbConnect();
  const slug = context.params.slug;

  await Post.findOneAndDelete({ slug });
  return NextResponse.json({ success: true });
}
