import Image from "next/image";
export function Photo({src,alt,className="",priority=false}:{src:string;alt:string;className?:string;priority?:boolean}){
 const sizes = className.includes("home-group") ? "(max-width: 800px) calc(100vw - 40px), (max-width: 1500px) 53vw, 740px"
  : className.includes("gallery-tile") ? "(max-width: 800px) 46vw, (max-width: 1500px) 30vw, 430px"
  : className.includes("about-group") || className.includes("gallery-full") ? "(max-width: 800px) calc(100vw - 40px), (max-width: 1500px) calc(100vw - 88px), 1320px"
  : className.includes("portrait") ? "(max-width: 800px) 46vw, (max-width: 1500px) 30vw, 430px"
  : "(max-width: 800px) calc(100vw - 40px), (max-width: 1500px) 46vw, 650px";
 return <div className={`photo ${className}`}><Image src={src} alt={alt} fill priority={priority} sizes={sizes} quality={className.includes("home-group") || className.includes("about-group") ? 90 : 75}/></div>;
}
