"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { usePhotoSlideshow } from "./use-photo-slideshow";
import "./home-outreach-photos.css";

const photos = [
  { src: "/media/galleries/sitc/additional-047.webp", alt: "MADS volunteers and visitors at the Science in the City oral-health stand", label: "Science in the City", href: "/outreach/sitc" },
  { src: "/media/galleries/freshers-stand/stand-1-06.webp", alt: "Students visiting the MADS Freshers stand", label: "Freshers stand", href: "/outreach/freshers-stand" },
  { src: "/media/pembroke.webp", alt: "MADS volunteers demonstrating brushing with a dental model at the Pembroke talk", label: "Pembroke Skola Sajf", href: "/outreach/pembroke" },
  { src: "/media/mosta.webp", alt: "MADS volunteers delivering an oral-health presentation in Mosta", label: "Mosta Skola Sajf", href: "/outreach/mosta" },
  { src: "/media/scouts.webp", alt: "MADS presenters speaking to a group of Scouts", label: "Scouts talk", href: "/outreach/scouts" },
  { src: "/media/galleries/attard/002.webp", alt: "MADS volunteers presenting an oral-health talk in Attard", label: "Attard Skola Sajf", href: "/outreach/attard" },
];

export function HomeOutreachPhotos() {
  const { current, previous, ready, browse, markReady } = usePhotoSlideshow(photos.length);
  const photo = photos[current];

  return <div className="photo home-outreach-image home-outreach-slideshow" data-ready={previous === null || ready}>
    {previous !== null && <Image key={`previous-${previous}`} className="home-outreach-photo-previous" src={photos[previous].src} alt="" aria-hidden="true" fill sizes="(max-width: 800px) calc(100vw - 48px), (max-width: 1500px) 46vw, 650px" quality={75} />}
    <Image key={photo.src} className="home-outreach-photo-active" src={photo.src} alt={photo.alt} fill sizes="(max-width: 800px) calc(100vw - 48px), (max-width: 1500px) 46vw, 650px" quality={75} onLoad={markReady} />
    <div className="home-photo-zones" role="group" aria-label="Browse outreach photographs">
      <button type="button" className="home-photo-zone home-photo-zone--previous" aria-label="Previous outreach photograph" onClick={() => browse(-1)}><span className="home-photo-zone-icon"><ChevronLeft size={22} aria-hidden="true" /></span></button>
      <button type="button" className="home-photo-zone home-photo-zone--next" aria-label="Next outreach photograph" onClick={() => browse(1)}><span className="home-photo-zone-icon"><ChevronRight size={22} aria-hidden="true" /></span></button>
    </div>
    <span className="sr-only" role="status" aria-live="polite">{current + 1} of {photos.length}: {photo.alt}</span>
    <div className="home-outreach-photo-caption"><Link className="home-photo-caption-link" href={photo.href}>{photo.label} <ArrowUpRight size={13} aria-hidden="true" /></Link></div>
  </div>;
}
