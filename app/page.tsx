import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl space-y-6">
        <h1 className="text-5xl font-extrabold text-gray-900">📝 Welcome to the Blog</h1>
        <p className="text-lg text-gray-600">
          Dive into rich content or login as admin to manage posts.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/posts"
            className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
          >
            📚 View All Blog Posts
          </Link>
          <Link
            href="/login"
            className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 transition"
          >
            🔐 Admin Login
          </Link>
        </div>
      </div>
    </main>
  );
}
