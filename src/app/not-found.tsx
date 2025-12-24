import Link from 'next/link';
import Nav from '@/components/Nav';

export default function NotFound() {
  return (
    <main className="container-raf py-16">
      <header className="mb-14">
        <div className="flex items-baseline justify-between gap-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black dark:text-white">
            Connor Paton
          </h1>
          <Nav />
        </div>
      </header>

      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4 text-black dark:text-white">
          404
        </h2>
        <p className="text-lg text-black/80 dark:text-white/80 mb-8 max-w-md">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="px-4 py-2 text-sm font-medium text-black dark:text-white border border-black/20 dark:border-white/20 rounded hover:bg-black/[0.02] dark:hover:bg-white/[0.04] transition-colors"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
