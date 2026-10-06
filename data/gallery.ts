export type GalleryPhoto = { src: string; alt: string };
export type Gallery = { slug: string; title: string; category: string; image: string; alt: string; description: string; photos?: GalleryPhoto[] };

function photos(slug: string, indexes: number[], describe: (index: number) => string): GalleryPhoto[] {
 return indexes.map((index, position) => ({
  src: `/media/galleries/${slug}/${String(index).padStart(3, "0")}.webp`,
  alt: `${describe(index)} (photo ${position + 1} of ${indexes.length})`,
 }));
}

const openWidePool = new Set([8,20,22,40,46,48,68,72,88,92,146]);
const openWidePhotos = photos("open-wide", [168,164,24,64,78,98,100,104,114,116,124,128,152,156,32,38,8,4,20,22,40,46,48,68,72,82,88,92,94,96,108,146,148,150], index =>
 index === 168 || index === 164 ? "MADS volunteers together at Open Wide Open Bar" :
 index === 150 ? "The DJ at Open Wide Open Bar" :
 openWidePool.has(index) ? "Guests enjoying the pool at Open Wide Open Bar" :
 "Students socialising at Open Wide Open Bar"
);

const sitcBooth = new Set([5,20,30,45,50,80,85,100,110,120,200,205,215,220]);
const sitcPhotos = photos("sitc", [140,55,5,10,15,20,25,30,35,40,45,50,60,65,70,75,80,85,90,95,100,110,115,120,135,145,150,155,165,170,175,180,195,200,205,215,220,225], index =>
 index === 55 ? "MADS volunteers and dental professionals at Science in the City" :
 [145,175,180,225].includes(index) ? "The MADS oral-health stand at Science in the City" :
 sitcBooth.has(index) ? "MADS volunteers speaking with visitors about oral health at Science in the City" :
 "Visitors exploring MADS activities at Science in the City"
);
const sitcAdditionalPhotos: GalleryPhoto[] = [3,13,15,20,24,29,36,37,40,41,47,49,50,83,84,99].map(index => ({
 src: `/media/galleries/sitc/additional-${String(index).padStart(3, "0")}.webp`,
 alt: [83,99].includes(index) ? "MADS volunteers smiling together at the Science in the City stand" :
 index === 49 ? "MADS volunteers smiling at the Science in the City stand" :
 "MADS volunteers talking with visitors at the Science in the City oral-health stand",
}));
const attardPhotos = photos("attard", [2,1,3,4,5,6,7,8], index => index === 1 ? "Participants showing oral-health activity materials at the Attard talk" : "MADS volunteers presenting an oral-health talk to participants in Attard");
const mostaPhotos = photos("mosta", [1,2,3,4,5,6,7,8,9,10], index => [2,3,5,6,7].includes(index) ? "MADS volunteers demonstrating oral-health activities with participants in Mosta" : "MADS volunteers presenting an oral-health talk in Mosta");
const pembrokePhotos = photos("pembroke", [1,2,3,4,5,6,7,8,9,10,11,12], index => index === 3 ? "Participants holding oral-health activity materials at the Pembroke talk" : "MADS volunteers demonstrating oral-health activities at the Pembroke talk");
const scoutsPhotos = photos("scouts", [2,3,6,4,5,1], index => index === 1 ? "Scouts showing tooth-themed stickers on their hands" : index === 5 ? "MADS volunteers and Scouts together after the oral-health talk" : "MADS volunteers presenting oral-health activities to Scouts");

const volleyballGathering = new Set([56,70,112,154,175,210,217,231,238,266,308]);
const volleyballPhotos = photos("volleyball", [224,28,49,56,63,70,77,84,91,98,105,112,119,126,140,147,154,161,175,182,203,210,231,238,245,252,259,266,273,280,301,308], index =>
 volleyballGathering.has(index) ? "Participants together at the MADS Volleyball Tournament" :
 "Students playing beach volleyball at the MADS tournament"
);

export const galleries: Gallery[] = [
 {slug:"pembroke",title:"Pembroke outreach talk",category:"Outreach",image:"/media/pembroke.webp",alt:"MADS volunteers demonstrating brushing with a dental model at the Pembroke talk",description:"A look at the MADS oral-health outreach talk in Pembroke.",photos:pembrokePhotos},
 {slug:"mosta",title:"Mosta outreach talk",category:"Outreach",image:"/media/mosta.webp",alt:"MADS volunteers delivering an oral-health presentation in Mosta",description:"Moments from the MADS oral-health outreach talk in Mosta.",photos:mostaPhotos},
 {slug:"scouts",title:"Scouts talk",category:"Outreach",image:"/media/scouts.webp",alt:"MADS presenters speaking to a group of Scouts",description:"MADS students talking with Scouts about looking after their teeth.",photos:scoutsPhotos},
 {slug:"attard",title:"Attard outreach talk",category:"Outreach",image:attardPhotos[0].src,alt:attardPhotos[0].alt,description:"Photographs from the MADS oral-health outreach talk in Attard.",photos:attardPhotos},
 {slug:"sitc",title:"Science in the City",category:"Outreach",image:sitcPhotos[0].src,alt:"MADS volunteers speaking with visitors at Science in the City",description:"MADS students sharing oral-health activities and conversations with visitors at Science in the City.",photos:[...sitcPhotos,...sitcAdditionalPhotos]},
 {slug:"open-wide",title:"Open Wide Open Bar",category:"Student life",image:openWidePhotos[0].src,alt:"MADS volunteers together at Open Wide Open Bar",description:"Photos from Open Wide Open Bar, a MADS social event.",photos:openWidePhotos},
 {slug:"volleyball",title:"MADS Volleyball Tournament",category:"Student life",image:volleyballPhotos[0].src,alt:"Students playing beach volleyball at the MADS tournament",description:"Beach volleyball and moments together at the MADS Volleyball Tournament.",photos:volleyballPhotos},
];
export const committee: {file:string;name:string;role?:string}[]=[
 {file:"edited-andreya",name:"Andreya Gauci",role:"President"},
 {file:"edited-nicole",name:"Nicole Caruana",role:"Vice President"},
 {file:"edited-jeremy",name:"Jeremy Austin",role:"Secretary General"},
 {file:"edited-maria",name:"Maria Sammut",role:"Financial Officer"},
 {file:"edited-kylie",name:"Kylie Zerafa",role:"Education Officer"},
 {file:"edited-kayleigh",name:"Kayleigh Vella Barberi",role:"Leisure Officer"},
 {file:"edited-adam",name:"Adam Demajo",role:"Public Relations Officer"},
 {file:"edited-judith",name:"Judith Zammit",role:"PR & Marketing Officer"},
 {file:"edited-shakira",name:"Shakira Yusuf",role:"Social Policy Officer"}
];
