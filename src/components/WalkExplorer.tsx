'use client';

import { useState } from 'react';
import Link from 'next/link';
import WalkLandscape from '@/components/WalkLandscape';
import { campfireNote, walkPlaces, type WalkPlaceId, type WalkPost } from '@/lib/walk';
import styles from '@/app/walk/walk.module.css';

export default function WalkExplorer({ posts }: { posts: WalkPost[] }) {
  const [selected, setSelected] = useState<WalkPlaceId>('mountains');
  const [hovered, setHovered] = useState<WalkPlaceId | null>(null);
  const active = walkPlaces.find((place) => place.id === selected)!;
  const preview = walkPlaces.find((place) => place.id === hovered);
  const previewPost = preview && posts.find((post) => post.path === preview.posts[0]);
  const activePosts = active.posts.flatMap((path) => {
    const post = posts.find((entry) => entry.path === path);
    return post ? [post] : [];
  });

  function selectPlace(place: WalkPlaceId) {
    setSelected(place);
    setHovered(null);
    requestAnimationFrame(() => {
      const reading = document.getElementById('walk-reading');
      if (reading && reading.getBoundingClientRect().top > window.innerHeight * 0.75) {
        reading.scrollIntoView({
          block: 'nearest',
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        });
      }
    });
  }

  return (
    <>
      <div className={styles.mapFrame}>
        <div className={styles.map} role="group" aria-label="Choose a place to explore" onMouseLeave={() => setHovered(null)}>
          <WalkLandscape />
          <span className={styles.mapCaption} aria-hidden="true">A small world, a few familiar thoughts.</span>
          {walkPlaces.map((place, index) => (
            <button
              key={place.id}
              type="button"
              style={place.position}
              className={`${styles.marker} ${selected === place.id ? styles.selectedMarker : ''}`}
              aria-label={`${place.label}: ${place.theme}`}
              aria-pressed={selected === place.id}
              aria-controls="walk-reading"
              onClick={() => selectPlace(place.id)}
              onMouseEnter={(event) => { if (event.buttons === 0) setHovered(place.id); }}
              onFocus={() => setHovered(place.id)}
              onBlur={() => setHovered(null)}
            >
              <span className={styles.markerLabel}>
                <span className={styles.markerDot} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span>{place.shortLabel}</span>
              </span>
            </button>
          ))}
          <div className={`${styles.mapPreview} ${preview ? styles.previewCard : ''}`} aria-hidden="true">
            {preview ? (
              <>
                <span>{preview.theme}</span>
                <strong>{preview.id === 'campfire' ? 'A thought without an ending.' : previewPost?.title}</strong>
                <p>{preview.id === 'campfire' ? campfireNote.text : previewPost?.description}</p>
              </>
            ) : <><span>Field notes / 01</span><strong>There is no right way around.</strong></>}
          </div>
        </div>
        <div className={styles.mapFooter}>
          <span>Pick a place. Stay a while.</span>
          <span className={styles.daySky}>Sun&apos;s out. Take the long way.</span>
          <span className={styles.nightSky}>The cabin light is still on.</span>
        </div>
      </div>

      <section id="walk-reading" className={styles.reading} aria-labelledby="walk-place-title">
        <div className={styles.placeIntro}>
          <p className={styles.eyebrow}>{active.theme}</p>
          <h2 id="walk-place-title">{active.label}</h2>
          <p>{active.description}</p>
          <p className={styles.selectionStatus} role="status">
            <span className="sr-only">{active.label}. </span>
            {active.id === 'campfire' ? 'One thought to sit with.' : `${activePosts.length} paths from here.`}
          </p>
        </div>
        <div className={styles.readingLinks}>
          {active.id === 'campfire' ? (
            <div className={styles.note}>
              <span className={styles.noteLabel}>A thought by the fire</span>
              <blockquote>{campfireNote.text}</blockquote>
              <Link href={campfireNote.href}>From {campfireNote.source} <span aria-hidden="true">↗</span></Link>
            </div>
          ) : activePosts.map((post, index) => (
            <Link key={post.path} href={`/${post.path}`} className={styles.essayLink}>
              <span className={styles.essayNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{post.title}</h3><p>{post.description}</p></div>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <footer className={styles.footer}>
        <p>Some paths lead to an answer. Others are just a good walk.</p>
        <Link href="/writing">Prefer a list? All writing <span aria-hidden="true">→</span></Link>
      </footer>
    </>
  );
}
