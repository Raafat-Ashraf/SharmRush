"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { GALLERY_IMAGES } from "@/lib/activities";
import { RiCloseLine, RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

export default function GalleryGrid() {
  const t = useTranslations("gallery");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const open = (i: number) => setLightboxIdx(i);
  const close = () => setLightboxIdx(null);

  const prev = useCallback(() =>
    setLightboxIdx((i) => i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length),
  []);

  const next = useCallback(() =>
    setLightboxIdx((i) => i === null ? null : (i + 1) % GALLERY_IMAGES.length),
  []);

  return (
    <>
      <div className="masonry-grid" role="list" aria-label={t("title")}>
        {GALLERY_IMAGES.map((img, i) => (
          <div key={img.key} className="masonry-item" role="listitem">
            <motion.button
              onClick={() => open(i)}
              className="group relative block w-full overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:ring-aqua-400"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25 }}
              aria-label={`Photo ${i + 1}`}
            >
              <Image
                src={img.src}
                alt={`Sharm Kite Dreams watersports photo ${i + 1}`}
                width={img.width}
                height={img.height}
                loading={i < 4 ? "eager" : "lazy"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy-950/0 transition-all duration-300 group-hover:bg-navy-950/25" />
            </motion.button>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            key="lightbox"
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            onClick={close}
          >
            <button
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              onClick={close}
              aria-label={t("close")}
            >
              <RiCloseLine size={22} />
            </button>

            <button
              className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label={t("previous")}
            >
              <RiArrowLeftLine size={20} />
            </button>

            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[88vh] max-w-[92vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_IMAGES[lightboxIdx].src}
                alt={`Sharm Kite Dreams photo ${lightboxIdx + 1}`}
                width={GALLERY_IMAGES[lightboxIdx].width}
                height={GALLERY_IMAGES[lightboxIdx].height}
                className="max-h-[88vh] w-auto rounded-xl object-contain"
                priority
              />
              <p className="mt-2 text-center text-xs text-white/50">
                {lightboxIdx + 1} / {GALLERY_IMAGES.length}
              </p>
            </motion.div>

            <button
              className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label={t("next")}
            >
              <RiArrowRightLine size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
