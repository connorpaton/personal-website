'use client';

import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4 font-bebas-neue">Test Page</h1>
      <p className="mb-8">This is a minimal test page to verify that the site is working correctly.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return Home
      </Link>
    </div>
  );
} 