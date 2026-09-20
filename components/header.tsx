"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu,X,CalendarPlus } from "lucide-react";
import { useState,useRef,useEffect } from "react";
import { Logo } from "./logo";
import { siteRoutes } from "@/data/site";
export function Header(){
 const [open,setOpen]=useState(false);const path=usePathname();const toggle=useRef<HTMLButtonElement>(null);
 const header=useRef<HTMLElement>(null);
 useEffect(()=>{
  const logo=header.current?.querySelector<HTMLAnchorElement>(".logo");
  const goHome=()=>{setOpen(false);if(path==="/")window.scrollTo({top:0,behavior:"instant"});};
  logo?.addEventListener("click",goHome);
  return()=>logo?.removeEventListener("click",goHome);
 },[path]);
 useEffect(()=>{
  let last=window.scrollY, distance=0, direction=0, frame=0;
  const update=()=>{
   frame=0;const y=Math.max(0,window.scrollY);const delta=y-last;last=y;
   if(open||y<110){header.current?.classList.remove("header-hidden");distance=0;return;}
   const next=Math.sign(delta);if(next!==direction){distance=0;direction=next;}
   distance+=delta;
   if(distance>65)header.current?.classList.add("header-hidden");
   if(distance< -22)header.current?.classList.remove("header-hidden");
  };
  const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
  header.current?.classList.remove("header-hidden");
  window.addEventListener("scroll",scroll,{passive:true});
  return()=>{window.removeEventListener("scroll",scroll);cancelAnimationFrame(frame);};
 },[open,path]);
 useEffect(()=>{if(!open)return;const close=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);toggle.current?.focus();}};document.addEventListener("keydown",close);return()=>document.removeEventListener("keydown",close);},[open]);
 return <header ref={header} className="site-header"><div className="header-inner"><Logo/><nav className="desktop-nav" aria-label="Primary navigation">{siteRoutes.map(r=><Link key={r.href} href={r.href} scroll={false} aria-current={path===r.href?"page":undefined}>{r.label}</Link>)}</nav><div className="header-actions"><Link className="calendar-link" href="/events#calendar-status"><CalendarPlus size={18}/>Calendar</Link><button ref={toggle} className="menu-button" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></div>{open&&<nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">{siteRoutes.map(r=><Link key={r.href} href={r.href} scroll={false} onClick={()=>setOpen(false)}>{r.label}</Link>)}<a href="https://www.instagram.com/mads.malta" target="_blank" rel="noreferrer">Follow @mads.malta</a></nav>}</header>;
}
