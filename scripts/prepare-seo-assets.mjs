import sharp from "sharp";

// Derive square icons from the existing approved logo, preserving its proportions.
for (const [size, file] of [[48, "mads-icon-48-v2.png"], [192, "mads-icon-192-v2.png"], [180, "mads-apple-icon-v2.png"]]) {
  const inner = Math.round(size * 0.82);
  const logo = await sharp("public/media/mads-logo.png").resize(inner, inner, { fit: "inside" }).png().toBuffer();
  await sharp({ create: { width:size, height:size, channels:3, background:"#ffffff" } }).composite([{ input:logo, gravity:"centre" }]).png().toFile(`public/media/${file}`);
}

// A static branded share image avoids loading the large portrait-oriented original.
// The central safe area also fits square crops used by some messaging apps.
const logo = await sharp("public/media/mads-logo.png").resize(400, 300, { fit:"inside" }).png().toBuffer();
await sharp({ create: { width:1200, height:630, channels:3, background:"#ffffff" } }).composite([{ input:logo, gravity:"centre" }]).jpeg({quality:92}).toFile("public/media/mads-social-v2.jpg");
console.log("Prepared MADS icons and a 1200×630 social image from the existing logo.");
