import { dbConnect } from '@/lib/dbConnect';
import Post from '@/models/Post';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Post {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
}

export async function generateStaticParams() {
  await dbConnect();
  const posts = await Post.find({}, 'slug');
  return posts.map((post: Post) => ({ slug: post.slug }));
}


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  await dbConnect();
  const post = await Post.findOne({ slug: params.slug });
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.content.replace(/<[^>]+>/g, '').slice(0, 150),
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  await dbConnect();
  const post = await Post.findOne({ slug: params.slug });

  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-[#f9fafb] px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl px-8 py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <div
          className="prose prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </main>
  );
}
