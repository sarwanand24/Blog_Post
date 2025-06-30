'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/logout', { method: 'POST' }).then(() => router.push('/login'));
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
      <div className="text-center">
        <p className="text-lg text-gray-700 font-medium animate-pulse">
          🔄 Logging you out...
        </p>
      </div>
    </main>
  );
}
