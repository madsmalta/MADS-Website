import sharp from "sharp";

// Preserve the exact white-background logo; only its outside corners become transparent.
for (const [size, source, file] of [
  [48, "mads-icon-48-v2.png", "mads-icon-48-v4.png"],
  [192, "mads-icon-192-v2.png", "mads-icon-192-v4.png"],
  [180, "mads-apple-icon-v2.png", "mads-apple-icon-v4.png"],
]) {
  const radius = Math.round(size * 0.17);
  const mask = Buffer.from(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" rx="${radius}" fill="white"/></svg>`);
  await sharp(`public/media/${source}`)
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(`public/media/${file}`);
}
console.log("Prepared rounded MADS icons from the original white logo.");
