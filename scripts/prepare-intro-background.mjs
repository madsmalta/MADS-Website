import sharp from 'sharp';
await sharp('/Users/jeremyaustin/Downloads/pexels-polina-kovaleva-7682008.jpg')
 .resize({ width: 1920, withoutEnlargement: true })
 .webp({ quality: 82 })
 .toFile('public/media/intro-coast.webp');
console.log('Prepared intro photograph; original untouched.');
