import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';

const sources = JSON.parse(await readFile(new URL('./post-landscapes.json', import.meta.url), 'utf8'));
const directory = 'public/images/posts';
const size = 128;
const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
await mkdir(directory, { recursive: true });

for (const [slug, photo] of Object.entries(sources)) {
  const response = await fetch(`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=512&h=512&q=90`);
  if (!response.ok) throw new Error(`${slug}: source returned ${response.status}`);
  const source = Buffer.from(await response.arrayBuffer());
  const pixels = await sharp(source).resize(size, size, { fit: 'cover' })
    .modulate({ saturation: 1.3 }).removeAlpha().toColourspace('srgb').raw().toBuffer();

  for (const theme of ['day', 'night']) {
    const output = Buffer.from(pixels);
    for (let row = 0; row < size; row++) {
      for (let column = 0; column < size; column++) {
        const offset = (row * size + column) * 3;
        const threshold = (bayer[(row % 4) * 4 + column % 4] / 16 - 0.5) * 44;
        for (let channel = 0; channel < 3; channel++) {
          const value = theme === 'night'
            ? pixels[offset + channel] * [0.48, 0.52, 0.7][channel] + [6, 8, 18][channel]
            : pixels[offset + channel];
          const step = theme === 'night' ? 24 : 36;
          output[offset + channel] = Math.max(0, Math.min(255, Math.round((value + threshold) / step) * step));
        }
      }
    }
    await sharp(output, { raw: { width: size, height: size, channels: 3 } })
      .resize(256, 256, { kernel: 'nearest' })
      .png({ palette: true, colours: 128, dither: 0 })
      .toFile(`${directory}/${slug}-${theme}.png`);
  }
  console.log(`Created ${slug}`);
}
