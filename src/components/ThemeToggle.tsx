'use client';

import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors
                 border-black/20 bg-black/[0.04] text-black/80 hover:bg-black/[0.08]
                 dark:border-white/15 dark:bg-white/[0.04] dark:text-white/80 dark:hover:bg-white/[0.08]"
      aria-label="Toggle light/dark mode"
    >
      <span aria-hidden className="text-base leading-none">
        {theme === 'dark' ? '☀︎' : '☾'}
      </span>
    </button>
  );
}

