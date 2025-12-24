'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Nav() {
  return (
    <nav className="flex items-center gap-3 text-sm text-black/75 dark:text-white/75">
      <ThemeToggle />
      <Link className="opacity-80 hover:opacity-100 text-black dark:text-white" href="/writing">
        Writing
      </Link>
    </nav>
  );
}

