'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Post = {
  _id: string;
  title: string;
  slug: string;
};

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data.posts));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">🛠️ Admin Dashboard</h1>
          <a
            href="/logout"
            className="text-sm text-red-500 hover:text-red-600 transition duration-200 underline"
          >
            Logout
          </a>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">All Posts</h2>
          <Link
            href="/admin/create"
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-200"
          >
            + Create New Post
          </Link>
        </div>

        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-gray-500">No posts yet. Create your first one!</div>
          ) : (
            posts.map(post => (
              <div
                key={post._id}
                className="bg-white shadow-sm border rounded-lg p-5 hover:shadow-md transition duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-500">Slug: <code>{post.slug}</code></p>
                  </div>
                  <div className="flex gap-3 text-sm mt-1">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/edit/${post.slug}`}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
