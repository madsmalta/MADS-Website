import sharp from "sharp";

// Derive square icons from the existing approved logo, preserving its proportions.
for (const [size, file] of [[48, "mads-icon-48.png"], [192, "mads-icon-192.png"], [180, "mads-apple-icon.png"]]) {
  await sharp("public/media/mads-logo.png").resize(size, size, { fit: "contain", background: "#ffffff" }).flatten({ background: "#ffffff" }).png().toFile(`public/media/${file}`);
}

// A static branded share image avoids loading the large portrait-oriented original.
const logo = await sharp("public/media/mads-logo.png").resize(310, 250, { fit: "contain", background: "#ffffff" }).flatten({ background: "#ffffff" }).png().toBuffer();
const text = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect x="430" y="172" width="4" height="286" fill="#c3a267"/><g fill="#ffffff" font-family="sans-serif" font-size="54"><text x="485" y="250">Malta Association</text><text x="485" y="320">of Dental Students</text></g><text x="485" y="401" fill="#d7bd8c" font-family="sans-serif" font-size="28">One dental community.</text></svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#102c46" } }).composite([{ input: logo, left: 65, top: 190 }, { input: text }]).jpeg({ quality: 88 }).toFile("public/media/mads-social.jpg");
console.log("Prepared MADS icons and a 1200×630 social image from the existing logo.");
