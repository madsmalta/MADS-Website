import sharp from 'sharp';
import { access } from 'node:fs/promises';

export const favourites = [
 'DSCF5577','DSCF5580','IMG_0285','IMG_0288','IMG_0290','IMG_0297',
 'IMG_0316','IMG_0318','IMG_0321','IMG_0322','IMG_0326','IMG_0332',
 'P1000197','P1000201','P1000205','P1000215','P1000217','P1000218',
 'P7021663','P7021665','P7021666','P7021671','P7021673','P7021675',
 'P7021678','P7021680','P7021691','P7021693','P7021697','P7021698',
 'P7021700','P7021701','P7021704','P7021706','P7021709','P7021710',
 'P7021713','P7021715','P7021721',
];
for (const name of favourites) await access(`/Users/jeremyaustin/Downloads/${name}.JPG`);
for (const name of favourites) {
 await sharp(`/Users/jeremyaustin/Downloads/${name}.JPG`).rotate()
  .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
  .webp({ quality: 88 }).toFile(`public/media/galleries/open-wide/favourite-${name.toLowerCase()}.webp`);
}
console.log(`Prepared ${favourites.length} favourites; originals unchanged.`);
