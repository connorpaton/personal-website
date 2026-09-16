import type { Metadata } from 'next';
import BackNav from '@/components/BackNav';
import WalkExplorer from '@/components/WalkExplorer';
import { getAllPostsAcrossCategories } from '@/lib/markdown';
import { walkPlaces } from '@/lib/walk';
import styles from './walk.module.css';

export const metadata: Metadata = {
  title: 'Take a walk — Connor Paton',
  description: 'A small detour through thoughts on building, people, books, and figuring things out.',
};

export default async function WalkPage() {
  const posts = await getAllPostsAcrossCategories(['lifelearnings', 'startups', 'books']);
  const paths = new Set<string>(walkPlaces.flatMap((place) => [...place.posts]));
  const walkPosts = posts
    .filter((post) => paths.has(`${post.category}/${post.slug}`))
    .map((post) => ({
      path: `${post.category}/${post.slug}`,
      title: post.title,
      description: post.description,
    }));

  return (
    <main className={styles.page}>
      <BackNav href="/" label="← Back to the everyday" />
      <header className={styles.intro}>
        <p className={styles.eyebrow}>Somewhere in my head</p>
        <h1>Take a walk.</h1>
        <p>No particular destination. Just a few things I keep coming back to.</p>
      </header>
      <WalkExplorer posts={walkPosts} />
    </main>
  );
}
