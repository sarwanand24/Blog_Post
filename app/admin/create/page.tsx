'use client';

import { useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor';
import slugify from 'slugify';
import { useRouter } from 'next/navigation';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await fetch('/api/posts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/posts/${data.post.slug}`);
    } else {
      alert('Failed to create post');
    }
  };

  const generatedSlug = slugify(title, { lower: true, strict: true });

  return (
    <div className="min-h-screen w-full px-6 py-10 bg-[#f9f9f9]">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">📝 Create New Blog Post</h1>

      <input
        type="text"
        placeholder="Enter post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-5 py-3 mb-4 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p className="text-sm text-gray-600 mb-6">
        Slug: <code className="text-gray-800 font-mono">{generatedSlug}</code>
      </p>

      <div className="mb-6">
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-md"
      >
        🚀 Create Post
      </button>
    </div>
  );
};

export default CreatePostPage;
