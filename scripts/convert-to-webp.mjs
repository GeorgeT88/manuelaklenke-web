import sharp from 'sharp';
import { readdirSync, unlinkSync } from 'fs';
import { join } from 'path';

const photoDir = './src/photo';
const files = readdirSync(photoDir).filter(f => f.endsWith('.png'));

for (const file of files) {
  const input = join(photoDir, file);
  const output = join(photoDir, file.replace('.png', '.webp'));
  await sharp(input).webp({ quality: 85 }).toFile(output);
  unlinkSync(input);
  console.log(`✓ ${file} → ${file.replace('.png', '.webp')}`);
}
