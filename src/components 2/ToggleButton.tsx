import { useTheme } from "@/context/ThemeContext";

export default function ToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 text-white bg-white/10 px-4 py-2 rounded-full border border-white/30 hover:bg-white/20 transition-all"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
