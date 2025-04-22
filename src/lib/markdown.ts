import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const contentDirectory = path.join(process.cwd(), 'content');

export interface Post {
  slug: string;
  title: string;
  description: string;
  image: string;
  content: string;
  category: string;
}

export async function getPostBySlug(category: string, slug: string): Promise<Post> {
  const fullPath = path.join(contentDirectory, category, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .use(remarkGfm)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title,
    description: data.description,
    image: data.image,
    content: contentHtml,
    category,
  };
}

export async function getAllPosts(category: string): Promise<Post[]> {
  const categoryPath = path.join(contentDirectory, category);
  const files = fs.readdirSync(categoryPath);
  
  const posts = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.md$/, '');
      return getPostBySlug(category, slug);
    })
  );

  return posts.sort((a, b) => (a.title > b.title ? 1 : -1));
} 