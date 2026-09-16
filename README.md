# Personal Website

My personal website built with Next.js 15.3.1, featuring:

- Dithered landscape post cards with matching light and dark palettes
- An optional interactive landscape for exploring writing at `/walk`
- Book reviews and summaries
- Collections of inspirational and philosophical quotes
- Personal insights on startups, fitness, and life learnings

## Technologies Used

- Next.js 15.3.1
- TypeScript
- Tailwind CSS
- Framer Motion
- Markdown for content

## Deployment

The site is deployed on Vercel.

## Landscapes and the Walk

Post-card photo assignments live in `scripts/post-landscapes.json`. After adding
or changing an assignment, run `node scripts/dither-post-landscapes.mjs` to
regenerate the day and night thumbnails. This requires network access; the
generated PNGs are committed so the website itself does not need external image
requests. Source and license details are in `public/images/posts/CREDITS.md`.

The homepage's **Take a walk** link opens `/walk`. Each map location selects a
curated reading list; the campfire contains a reflection linked to its source
essay. Edit the locations, post paths, and campfire text in `src/lib/walk.ts`.
The scene is SVG, follows the site's theme, and uses keyboard-accessible buttons.
The regular writing archive remains available from the map.

## Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
