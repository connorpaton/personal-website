import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

export default function Post({ title, content }) {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <div
          className="prose prose-invert max-w-none text-white/90"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = ["startups", "fitness", "lifelearnings"];
  const paths = categories.flatMap((category) => {
    const dir = path.join(process.cwd(), "content", category);
    return fs.readdirSync(dir).map((filename) => ({
      params: { category, slug: filename.replace(/\.md$/, "") },
    }));
  });

  return {
    paths: paths.map(({ params }) => ({
      params: { category: params.category, slug: params.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category, slug } = params;
  const filePath = path.join(process.cwd(), "content", category, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);

  return {
    props: {
      title: data.title,
      content: processedContent.toString(),
    },
  };
};
