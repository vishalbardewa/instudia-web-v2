"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Photo {
  src: string;
  caption: string;
  wide?: boolean;
}

export default function WorkshopPhotoGrid({ photos }: { photos: Photo[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const open = (i: number) => setLightbox(i);
  const close = () => setLightbox(null);

  const prev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, [photos.length]);

  const next = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, prev, next]);

  return (
    <>
      {/* Photo Grid */}
      <div className="grid grid-cols-2 gap-3">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            className={`relative overflow-hidden rounded-2xl bg-gray-100 group/img cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-brandpurple focus:ring-offset-2 ${photo.wide ? "col-span-2" : "col-span-1"}`}
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              width={photo.wide ? 1600 : 800}
              height={photo.wide ? 900 : 800}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className={`w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105 ${photo.wide ? "aspect-[16/9]" : "aspect-square"}`}
              loading="lazy"
              unoptimized
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
              <div className="p-4 translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                <p className="text-xs font-semibold text-white leading-snug">{photo.caption}</p>
                <div className="mt-1.5 flex items-center gap-1 text-white/60">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-wider">View</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Portal */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={close}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

          {/* Content */}
          <div
            className="relative z-10 flex flex-col items-center max-w-5xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute -top-14 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close lightbox"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute -top-14 left-0 text-white/60 text-sm font-semibold">
              {lightbox + 1} / {photos.length}
            </div>

            {/* Image */}
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-neutral-900">
              <Image
                src={photos[lightbox].src}
                alt={photos[lightbox].caption}
                width={1200}
                height={800}
                className="w-full max-h-[75vh] object-contain"
                unoptimized
              />
            </div>

            {/* Caption + nav */}
            <div className="mt-4 flex items-center justify-between w-full gap-4">
              <button
                onClick={prev}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Previous photo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <p className="flex-1 text-center text-sm text-white/70 font-medium">
                {photos[lightbox].caption}
              </p>

              <button
                onClick={next}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Next photo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 max-w-full">
              {photos.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${i === lightbox ? "border-brandpurple scale-105" : "border-transparent opacity-50 hover:opacity-75"}`}
                >
                  <Image src={p.src} alt={p.caption} width={56} height={56} className="w-full h-full object-cover" unoptimized />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
