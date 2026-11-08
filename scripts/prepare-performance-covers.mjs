import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";
import { createRequire } from "node:module";
import sharp from "sharp";
import ts from "typescript";

const root = process.cwd();
const require = createRequire(import.meta.url);
const cache = new Map();

// Read the gallery data itself, so the prepared covers stay in sync with the
// photos chosen for each gallery without maintaining a second list.
function loadData(file) {
  file = path.resolve(root, file);
  if (cache.has(file)) return cache.get(file).exports;
  const record = { exports: {} };
  cache.set(file, record);
  const source = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const execute = vm.runInThisContext(`(function(require, module, exports) { ${source}\n})`, { filename: file });
  execute((spec) => spec.startsWith(".")
    ? loadData(path.resolve(path.dirname(file), `${spec}.ts`))
    : require(spec), record, record.exports);
  return record.exports;
}

const { galleries } = loadData("data/gallery.ts");
const sources = new Set([
  "/media/committee-home-original.png",
  "/media/committee-edited.webp",
  "/media/galleries/sitc/october-057.webp",
  "/media/galleries/sitc/additional-047.webp",
  "/media/galleries/sitc/140.webp",
  ...galleries.map((gallery) => gallery.image),
]);
const output = path.join(root, "public/media/performance");
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
const manifest = {};

for (const src of sources) {
  const input = path.join(root, "public", src.slice(1));
  const hash = crypto.createHash("sha1").update(src).digest("hex").slice(0, 12);
  const variants = [];
  const originalWidth = (await sharp(input).metadata()).width;
  if (!originalWidth) throw new Error(`Missing image width: ${src}`);
  for (const width of [...new Set([680, 850, 1280, 2400].map(width => Math.min(width, originalWidth)))]) {
    const name = `${hash}-${width}.webp`;
    const target = path.join(output, name);
    const result = await sharp(input).rotate().resize({ width })
      .webp({ quality: width <= 850 ? 72 : 78, effort: 6 })
      .toFile(target);
    variants.push({ width: result.width, src: `/media/performance/${name}` });
  }
  manifest[src] = variants;
}

fs.writeFileSync(path.join(root, "data/performance-covers.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Prepared ${sources.size} cover images at up to four responsive widths.`);
