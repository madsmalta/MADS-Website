import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
const root = '/Users/jeremyaustin/Downloads';
await mkdir('public/media', { recursive: true });
await sharp(`${root}/black logo no background.png`).trim().png().toFile('public/media/mads-logo.png');
const sources = [
 ['MADS SS PEMBROKE TALK/FINAL 1.jpg', 'pembroke'],
 ['MADS SS MOSTA TALK/F1.jpg', 'mosta'],
 ['MADS SCOUTS TALK/SCOUTS 2.png', 'scouts'],
 ['PHOTOS/PARTY 1.jpg', 'open-wide'],
 ['B4 7.24.37 PM.jpg', 'volleyball'],
];
await sharp(`${root}/MADS Committee photos/Family Edited.png`).trim().webp({quality:96}).toFile('public/media/committee-edited.webp');
for (const [file,name] of sources) {
 await sharp(`${root}/${file}`).rotate().resize({width:1920,withoutEnlargement:true}).webp({quality:85}).toFile(`public/media/${name}.webp`);
}
for (const file of await readdir(`${root}/Photos (unedited)`)) {
 if (!/\.(jpe?g|png)$/i.test(file) || file.startsWith('The Family')) continue;
 const name=file.split('.')[0].toLowerCase();
 // Keep originals intact. These resized copies support individual CSS crop positions.
 await sharp(`${root}/Photos (unedited)/${file}`).rotate().resize({width:1000,withoutEnlargement:true}).webp({quality:86}).toFile(`public/media/portrait-${name}.webp`);
}
console.log('Prepared compressed photo copies and trimmed official logo.');
