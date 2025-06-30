import { dbConnect } from '@/lib/dbConnect';
import Post from '@/models/Post';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;
  await dbConnect();
  const post = await Post.findOne({ slug });

  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function PUT(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;
  const { title, content } = await req.json();

  await dbConnect();
  const post = await Post.findOneAndUpdate(
    { slug },
    { title, content },
    { new: true }
  );

  return NextResponse.json({ post });
}

export async function DELETE(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;

  await dbConnect();
  await Post.findOneAndDelete({ slug });

  return NextResponse.json({ success: true });
}
