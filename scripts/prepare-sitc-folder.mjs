import sharp from 'sharp';
import { access } from 'node:fs/promises';

// 4, 7 and 13 repeat existing photographs. 24 is a collage of existing photos,
// including the group photograph requested for removal.
const selected = [3, 5, 8, 9, 10, 11, 12, 14, 16, 17, 18, 19, 20, 21, 22];
const sourceDirectory = '/Users/jeremyaustin/Desktop/Photos';
for (const index of selected) await access(`${sourceDirectory}/Untitled-${index}.png`);
for (const index of selected) {
 await sharp(`${sourceDirectory}/Untitled-${index}.png`).rotate()
  .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
  .webp({ quality: 88 })
  .toFile(`public/media/galleries/sitc/folder-${String(index).padStart(3, '0')}.webp`);
}
console.log(`Prepared ${selected.length} unique additions; originals unchanged.`);
