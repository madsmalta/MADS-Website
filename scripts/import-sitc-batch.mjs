import sharp from 'sharp';
import fs from 'node:fs/promises';
const audit=JSON.parse(await fs.readFile('/tmp/sitc-audit.json','utf8'));
const incoming=audit.entries.filter(e=>!e.existing);
const existing=audit.entries.filter(e=>e.existing&&!e.removed);
const parent=new Map(audit.entries.map(e=>[e.existing?e.name:e.id,e.existing?e.name:e.id]));
function find(n){const p=parent.get(n);if(p!==n)parent.set(n,find(p));return parent.get(n);}
function join(a,b){parent.set(find(a),find(b));}
// Pixel comparisons identify recompressed copies; visual review confirms branded
// versions whose white corner logos make their pixel differences larger.
for(const p of audit.pairs)join(p.a,p.b);
join(5,'folder-008');join(30,'additional-083');join(72,'folder-009');
const groups=new Map();
for(const e of [...existing,...incoming]){const key=find(e.existing?e.name:e.id);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(e);}
const additions=[],replacements=[];
for(const group of groups.values()){
 group.sort((a,b)=>b.pixels-a.pixels||Number(b.existing)-Number(a.existing));
 const best=group[0],old=group.find(e=>e.existing);
 if(best.existing)continue;
 const stem=`batch-${String(best.id).padStart(3,'0')}`;
 await sharp(best.path).rotate().resize({width:1920,height:1920,fit:'inside',withoutEnlargement:true}).webp({quality:90}).toFile(`public/media/galleries/sitc/${stem}.webp`);
 const entry={stem,source:best.path,width:best.width,height:best.height};
 if(old)replacements.push({...entry,old:old.name});else additions.push(entry);
}
await fs.writeFile('/tmp/sitc-import-result.json',JSON.stringify({additions,replacements},null,2));
console.log(JSON.stringify({added:additions.length,replacements,ids:additions.map(e=>e.stem)}));
