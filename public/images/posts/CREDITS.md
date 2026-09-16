# Post landscapes

Photographic sources are from Unsplash, used under the Unsplash License:
https://unsplash.com/license

The source photo ID for each post is recorded in `scripts/post-landscapes.json`.
Original photos are available at `https://images.unsplash.com/<photo-id>`.
The thumbnails are square-cropped, color-graded, ordered-dithered adaptations;
night versions use a cooler, darker palette of the same scene.

Regenerate all thumbnails from the repository root with:
`node scripts/dither-post-landscapes.mjs`

The script requires network access and uses Sharp, included with Next.js.
