export type GalleryPhoto = { src: string; alt: string };
export type Gallery = { slug: string; title: string; category: string; image: string; alt: string; description: string; photos?: GalleryPhoto[] };

function photos(slug: string, indexes: number[], describe: (index: number) => string): GalleryPhoto[] {
 return indexes.map((index, position) => ({
  src: `/media/galleries/${slug}/${String(index).padStart(3, "0")}.webp`,
  alt: `${describe(index)} (photo ${position + 1} of ${indexes.length})`,
 }));
}

// Selected favourites replace similar original shots; distinct originals remain.
const openWideFiles = [
 "favourite-dscf5577", "favourite-dscf5580", "favourite-p7021706",
 "favourite-p7021680", "favourite-img_0321", "098", "favourite-p1000201",
 "114", "116", "favourite-img_0288", "favourite-img_0285", "152", "156", "032",
 "favourite-p7021721", "favourite-p7021709", "favourite-p7021710",
 "favourite-p7021698", "favourite-p7021697", "favourite-p7021693", "068", "072",
 "082", "favourite-p1000205", "004", "094", "favourite-p1000197", "148",
 "favourite-img_0290", "favourite-img_0297", "favourite-img_0316",
 "favourite-img_0318", "favourite-img_0322", "favourite-img_0326",
 "favourite-img_0332", "favourite-p1000215", "favourite-p1000217",
 "favourite-p1000218", "favourite-p7021663", "favourite-p7021665",
 "favourite-p7021666", "favourite-p7021671", "favourite-p7021673",
 "favourite-p7021675", "favourite-p7021678", "favourite-p7021691",
 "favourite-p7021700", "favourite-p7021701", "favourite-p7021704",
 "favourite-p7021713", "favourite-p7021715",
];
const openWidePool = new Set([
 "068", "072", "favourite-p7021721", "favourite-p7021709", "favourite-p7021710",
 "favourite-p7021698", "favourite-p7021697", "favourite-p7021693",
 "favourite-p7021691", "favourite-p7021715",
]);
const openWidePhotos: GalleryPhoto[] = openWideFiles.map((file, position) => ({
 src: `/media/galleries/open-wide/${file}.webp`,
 alt: `${position < 2 ? "MADS volunteers together at Open Wide Open Bar" :
  openWidePool.has(file) ? "Guests enjoying the pool at Open Wide Open Bar" :
  "Students socialising at Open Wide Open Bar"} (photo ${position + 1} of ${openWideFiles.length})`,
}));

const sitcBooth = new Set([5,20,30,45,50,80,85,100,110,120,200,205,215,220]);
const sitcPhotos = photos("sitc", [140,5,10,15,20,25,30,35,40,50,60,65,70,75,80,85,90,95,100,110,115,120,135,145,150,155,165,170,175,180,195,200,205,215,220,225], index =>
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
// The supply collage (14) is now represented by its higher-detail individual photos.
const sitcFolderPhotos: GalleryPhoto[] = [3,5,8,9,10,11,12,16,17,18,19,20,21,22].map(index => ({
 src: index === 9 ? "/media/galleries/sitc/batch-072.webp" : `/media/galleries/sitc/folder-${String(index).padStart(3, "0")}.webp`,
 alt: [3,8,9,16].includes(index) ? "MADS volunteers and dental professionals at the Science in the City mobile dental clinic" :
  [10,11,12].includes(index) ? "Dental professionals and visitors inside the Science in the City mobile dental clinic" :
  [14,22].includes(index) ? "Oral-health information and supplies at the MADS Science in the City stand" :
  index === 19 ? "The mobile dental clinic at Science in the City" :
  "MADS volunteers speaking with visitors at Science in the City",
}));
const sitcBatchPhotos: GalleryPhoto[] = [1,2,3,4,6,7,8,9,10,11,13,14,15,16,19,20,21,22,26,27,29,32,33,34,36,41,45,46,47,48,53,58,59,63,73].map(index => ({
 src: `/media/galleries/sitc/batch-${String(index).padStart(3, "0")}.webp`,
 alt: [1,2,26,27,29,41,45,46,47,48].includes(index) ? "Dental professionals assisting visitors inside the Science in the City mobile dental clinic" :
  [13,14,15,19].includes(index) ? "Oral-health supplies displayed at the MADS Science in the City stand" :
  [6,10,11,22,32,33,34,73].includes(index) ? "MADS volunteers and dental professionals together at Science in the City" :
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
 {slug:"pembroke",title:"Pembroke Skola Sajf",category:"Outreach",image:"/media/pembroke.webp",alt:"MADS volunteers demonstrating brushing with a dental model at the Pembroke talk",description:"A look at the MADS oral-health outreach talk in Pembroke.",photos:pembrokePhotos},
 {slug:"mosta",title:"Mosta Skola Sajf",category:"Outreach",image:"/media/mosta.webp",alt:"MADS volunteers delivering an oral-health presentation in Mosta",description:"Moments from the MADS oral-health outreach talk in Mosta.",photos:mostaPhotos},
 {slug:"scouts",title:"Scouts talk",category:"Outreach",image:"/media/scouts.webp",alt:"MADS presenters speaking to a group of Scouts",description:"MADS students talking with Scouts about looking after their teeth.",photos:scoutsPhotos},
 {slug:"attard",title:"Attard Skola Sajf",category:"Outreach",image:attardPhotos[0].src,alt:attardPhotos[0].alt,description:"Photographs from the MADS oral-health outreach talk in Attard.",photos:attardPhotos},
 {slug:"sitc",title:"Science in the City",category:"Outreach",image:sitcPhotos[0].src,alt:"MADS volunteers speaking with visitors at Science in the City",description:"MADS students sharing oral-health activities and conversations with visitors at Science in the City.",photos:[...sitcPhotos,...sitcAdditionalPhotos,...sitcFolderPhotos,...sitcBatchPhotos]},
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
