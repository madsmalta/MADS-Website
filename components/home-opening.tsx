"use client";
/* eslint-disable @next/next/no-img-element -- Responsive covers are prepared locally. */

import { type CSSProperties } from "react";
import { preload } from "react-dom";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import preparedCovers from "@/data/performance-covers.json";
import { usePhotoSlideshow } from "./use-photo-slideshow";
import "./home-opening.css";

const firstPhoto = preparedCovers["/media/committee-edited.webp"];
const firstPhotoSet = firstPhoto.map(image => `${image.src} ${image.width}w`).join(", ");
const firstPhotoSizes = "(max-width: 600px) calc(100vw - 24px), (max-width: 800px) calc(100vw - 32px), 1320px";
const portraitSourceSet = preparedCovers["/media/committee-home-original.png"].map(image => `${image.src} ${image.width}w`).join(", ");
type HeroPhoto = { src: keyof typeof preparedCovers; alt: string; label: string; href: string; position: string; committee?: boolean };
const photos: HeroPhoto[] = [
  { src: "/media/committee-edited.webp", alt: "The 2026–2027 MADS committee together", label: "Meet the committee", href: "/about", position: "50% 12%", committee: true },
  { src: "/media/galleries/sitc/october-057.webp", alt: "MADS students carrying out a dental check-up at Science in the City", label: "Science in the City", href: "/outreach/sitc", position: "50% 48%" },
  { src: "/media/galleries/freshers-stand/stand-1-06.webp", alt: "Students visiting the MADS Freshers stand", label: "Freshers stand", href: "/outreach/freshers-stand", position: "50% 58%" },
  { src: "/media/galleries/sitc/additional-047.webp", alt: "MADS volunteers and visitors at the Science in the City oral-health stand", label: "Science in the City", href: "/outreach/sitc", position: "50% 30%" },
  { src: "/media/galleries/primary-impressions/684.jpg", alt: "Students socialising at Primary Impressions", label: "Primary Impressions", href: "/student-life/primary-impressions", position: "50% 55%" },
  { src: "/media/galleries/volleyball/224.webp", alt: "Students playing beach volleyball at the MADS tournament", label: "MADS Volleyball Tournament", href: "/student-life/volleyball", position: "50% 50%" },
  { src: "/media/galleries/sitc/october-024.webp", alt: "Volunteers sharing oral-health information at Science in the City", label: "Science in the City", href: "/outreach/sitc", position: "50% 20%" },
];

export function HomeOpening() {
  preload(firstPhoto.at(-1)!.src, { as: "image", fetchPriority: "high", imageSrcSet: firstPhotoSet, imageSizes: firstPhotoSizes, media: "(min-width: 601px)" });
  preload(preparedCovers["/media/committee-home-original.png"].at(-1)!.src, { as: "image", fetchPriority: "high", imageSrcSet: portraitSourceSet, imageSizes: firstPhotoSizes, media: "(max-width: 600px)" });
  const { current, previous, ready, browse, markReady } = usePhotoSlideshow(photos.length);
  const photo = photos[current];
  const renderPhoto = (index: number, active: boolean) => {
    const item = photos[index];
    const sources = preparedCovers[item.src];
    const sourceSet = sources.map(image => `${image.src} ${image.width}w`).join(", ");
    const layerClass = active ? "home-photo-active" : "home-photo-previous";
    const image = <img
      src={sources.at(-1)!.src} srcSet={sourceSet} sizes={firstPhotoSizes}
      alt={active ? item.alt : ""} aria-hidden={active ? undefined : true}
      loading="eager" fetchPriority={active && index === 0 ? "high" : "auto"}
      decoding="async" onLoad={active ? markReady : undefined}
      style={{ "--photo-position": item.position } as CSSProperties}
    />;
    return item.committee ? <picture className={`home-photo-committee ${layerClass}`} key={`${index}-${active}`}>
      <source media="(max-width: 600px)" srcSet={portraitSourceSet} sizes={firstPhotoSizes} />
      {image}
    </picture> : <div className={`home-photo-layer ${layerClass}`} key={`${index}-${active}`}>{image}</div>;
  };

  return (
    <section className="home-clinical" aria-labelledby="home-mission-title">
      <div className="home-clinical-image" data-ready={previous === null || ready}>
        {/* Ready-sized files let the opening photograph paint without image processing. */}
        {previous !== null && renderPhoto(previous, false)}
        {renderPhoto(current, true)}
        <div className="home-photo-zones" role="group" aria-label="Browse homepage photographs">
          <button type="button" className="home-photo-zone home-photo-zone--previous" aria-label="Previous photograph" onClick={() => browse(-1)}><span className="home-photo-zone-icon"><ChevronLeft size={22} aria-hidden="true" /></span></button>
          <button type="button" className="home-photo-zone home-photo-zone--next" aria-label="Next photograph" onClick={() => browse(1)}><span className="home-photo-zone-icon"><ChevronRight size={22} aria-hidden="true" /></span></button>
        </div>
        <span className="sr-only" role="status" aria-live="polite">{current + 1} of {photos.length}: {photo.alt}</span>
        <div className="home-clinical-caption">
          <Link className="home-photo-caption-link" href={photo.href}>{photo.label} <ArrowUpRight size={13} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="home-mission">
        <div className="home-mission-heading"><h1 id="home-mission-title">Malta Association of Dental Students</h1></div>
        <div className="home-mission-aside">
          <p className="home-mission-tagline">One Dental Community</p>
          <div className="home-mission-actions"><a className="home-mission-primary" href="#newsletter">Join The Molar <ArrowUpRight size={17} aria-hidden="true" /></a>
          <Link href="/events" className="home-mission-text-link">Explore events <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
        </div>
      </div>
    </section>
  );
}
