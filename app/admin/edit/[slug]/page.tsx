'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';

export default function EditPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/posts/${slug}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.post.title);
        setContent(data.post.content);
      });
  }, [slug]);

  const handleUpdate = async () => {
    const res = await fetch(`/api/posts/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
    if (res.ok) router.push(`/posts/${slug}`);
    else alert('Update failed');
  };

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
    if (res.ok) router.push('/admin');
    else alert('Delete failed');
  };

  return (
    <div className="min-h-screen w-full px-6 py-10 bg-[#f9f9f9]">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">✏️ Edit Blog Post</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
        className="w-full px-5 py-3 mb-6 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mb-6">
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-md"
        >
          ✅ Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 transition text-white px-6 py-3 rounded-md"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
