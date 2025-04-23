import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = ["Startups", "Fitness", "Life Learnings"];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-6">
      <h1 className="text-5xl font-bold mb-4">Connor Paton</h1>
      <div className="flex flex-col gap-4">
        {categories.map((cat) => (
          <motion.div
            key={cat}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={`/${cat.toLowerCase().replace(/\s/g, "")}`}>
              <a className="px-6 py-3 bg-white/10 rounded-lg text-xl border border-white/20 hover:bg-white/20 transition-all">
                {cat}
              </a>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
