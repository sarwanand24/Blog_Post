// app/posts/page.tsx
import { dbConnect } from '@/lib/dbConnect';
import Post from '@/models/Post';
import Link from 'next/link';

export default async function AllPostsPage() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 });

  return (
    <main className="min-h-screen bg-[#f9fafb] px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">📚 All Blog Posts</h1>
          <p className="text-gray-600 mt-2 text-lg">Read the latest entries and thoughts.</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-20">
            🚫 No blog posts available yet.
          </div>
        ) : (
          <ul className="space-y-6">
            {posts.map((post: any) => (
              <li
                key={post._id}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-200"
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-2xl font-semibold text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(post.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
