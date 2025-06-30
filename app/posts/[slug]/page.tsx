import { dbConnect } from '@/lib/dbConnect';
import Post from '@/models/Post';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageParams {
  params: Promise<{ slug: string }>;
}

// ✅ Updated generateStaticParams (no change needed here)
export async function generateStaticParams() {
  await dbConnect();
  const posts = await Post.find({}, 'slug');
  return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

// ✅ UPDATED generateMetadata to await `params`
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const post = await Post.findOne({ slug });
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.content.replace(/<[^>]+>/g, '').slice(0, 150),
  };
}

// ✅ UPDATED main component to await `params`
export default async function PostPage({ params }: PageParams) {
  const { slug } = await params;
  await dbConnect();
  const post = await Post.findOne({ slug });

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
