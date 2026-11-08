import Image from "next/image";
import preparedCovers from "@/data/performance-covers.json";
export function Photo({src,alt,className="",priority=false}:{src:string;alt:string;className?:string;priority?:boolean}){
 const sizes = className.includes("home-group") ? "(max-width: 800px) calc(100vw - 40px), (max-width: 1500px) 53vw, 740px"
  : className.includes("gallery-tile") ? "(max-width: 800px) 46vw, (max-width: 1500px) 30vw, 430px"
  : className.includes("about-group") || className.includes("gallery-full") ? "(max-width: 800px) calc(100vw - 40px), (max-width: 1500px) calc(100vw - 88px), 1320px"
  : className.includes("portrait") ? "(max-width: 800px) 46vw, (max-width: 1500px) 30vw, 430px"
  : "(max-width: 800px) calc(100vw - 40px), (max-width: 1500px) 46vw, 650px";
 const prepared = priority ? (preparedCovers as Record<string, { width: number; src: string }[]>)[src] : undefined;
 if (prepared) return <div className={`photo ${className}`}><picture>
  {/* Prepared covers avoid first-request image processing on the page's largest image. */}
  <img src={prepared.at(-1)!.src} srcSet={prepared.map(image => `${image.src} ${image.width}w`).join(", ")} sizes={sizes} alt={alt} loading="eager" fetchPriority="high" decoding="sync" style={{position:"absolute",inset:0,width:"100%",height:"100%"}} />
 </picture></div>;
 return <div className={`photo ${className}`}><Image src={src} alt={alt} fill fetchPriority={priority ? "high" : undefined} loading={priority ? "eager" : undefined} sizes={sizes} quality={75}/></div>;
}
