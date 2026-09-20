import sharp from 'sharp';

// Web-sized copies only: preserve the supplied artwork and keep originals untouched.
const names = ['Andreya', 'Nicole', 'Jeremy', 'Maria', 'Kylie', 'Kayleigh', 'Adam', 'Judith', 'Shakira'];
for (const name of names) {
 await sharp(`/Users/jeremyaustin/Downloads/MADS Committee photos/${name} Edited.png`)
  .resize({ width: 1200, withoutEnlargement: true })
  .webp({ quality: 90 })
  .toFile(`public/media/portrait-edited-${name.toLowerCase()}.webp`);
}
console.log('Prepared all nine edited committee portraits without cropping.');
