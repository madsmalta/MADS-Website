import sharp from "sharp";

const source = "public/media/mads-brand-logo.png";

for (const [size, file] of [[48, "mads-icon-48-v3.png"], [192, "mads-icon-192-v3.png"], [180, "mads-apple-icon-v3.png"]]) {
  await sharp(source).resize(size, size).png().toFile(`public/media/${file}`);
}

// The complete mark stays inside the centre safe area used by square social crops.
const logo = await sharp(source).resize(560, 560).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#142f49" } })
  .composite([{ input: logo, gravity: "centre" }])
  .jpeg({ quality: 90 })
  .toFile("public/media/mads-social-v3.jpg");
console.log("Prepared MADS icons and social image from the approved brand logo.");
