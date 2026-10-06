import sharp from 'sharp';
import fs from 'node:fs/promises';
const root = '/Users/jeremyaustin/Desktop/MADS/MADS Website/SITC';
const text = await fs.readFile('data/gallery.ts', 'utf8');
const ids = text.match(/const sitcPhotos = photos\("sitc", \[([^\]]+)/)[1].split(',').map(n => n.padStart(3,'0'));
const extras = text.match(/const sitcAdditionalPhotos: GalleryPhoto\[\] = \[([^\]]+)/)[1].split(',').map(n => 'additional-'+n.padStart(3,'0'));
const folders = text.match(/const sitcFolderPhotos: GalleryPhoto\[\] = \[([^\]]+)/)[1].split(',').map(n => 'folder-'+n.padStart(3,'0'));
const entries = [...ids,...extras,...folders,'045','055'].map(name=>({name,path:`public/media/galleries/sitc/${name}.webp`,existing:true,removed:['045','055'].includes(name)}));
const files = (await fs.readdir(root)).filter(n=>/\.(jpe?g|png|webp)$/i.test(n)).sort();
entries.push(...files.map((name,i)=>({name,path:`${root}/${name}`,id:i,existing:false})));
for(const e of entries){const m=await sharp(e.path).metadata();e.width=m.width;e.height=m.height;e.pixels=m.width*m.height;e.sample=await sharp(e.path).rotate().resize(32,32,{fit:'fill'}).removeAlpha().raw().toBuffer();}
const pairs=[];
for(let i=0;i<entries.length;i++)for(let j=0;j<i;j++){
 const a=entries[i],b=entries[j]; if(a.existing&&b.existing)continue;
 let mse=0;for(let k=0;k<a.sample.length;k++)mse+=(a.sample[k]-b.sample[k])**2;
 mse/=a.sample.length;if(mse<300)pairs.push({a:a.existing?a.name:a.id,b:b.existing?b.name:b.id,mse:Math.round(mse*10)/10});
}
await fs.writeFile('/tmp/sitc-audit.json',JSON.stringify({entries:entries.map(({sample,...e})=>e),pairs},null,2));
for(let start=0;start<files.length;start+=40){const group=entries.filter(e=>!e.existing).slice(start,start+40),tiles=[];for(let i=0;i<group.length;i++){const e=group[i];tiles.push({input:await sharp(e.path).rotate().resize(220,155,{fit:'contain',background:'white'}).toBuffer(),left:i%5*220,top:Math.floor(i/5)*180});tiles.push({input:Buffer.from(`<svg width="220" height="25"><text x="5" y="18" font-size="14">${e.id}: ${e.width} x ${e.height}</text></svg>`),left:i%5*220,top:Math.floor(i/5)*180+155});}await sharp({create:{width:1100,height:Math.ceil(group.length/5)*180,channels:3,background:'white'}}).composite(tiles).jpeg().toFile(`/tmp/sitc-sheet-${start}.jpg`);}
console.log(JSON.stringify({incoming:files.length,pairs}));
