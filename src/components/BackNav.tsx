'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

interface BackNavProps {
  href: string;
  label?: string;
}

export default function BackNav({ href, label = '← Back' }: BackNavProps) {
  return (
    <div className="flex items-center justify-between gap-6">
      <Link className="text-sm opacity-80 hover:opacity-100 link text-black/80 dark:text-white/80" href={href}>
        {label}
      </Link>
      <ThemeToggle />
    </div>
  );
}

