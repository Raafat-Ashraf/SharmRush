"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WHATSAPP_URL } from "@/lib/config";
import { RiWhatsappFill, RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import WaveBackground from "@/components/ui/WaveBackground";

const SLIDES = [
  "/slider/1.jpg",
  "/slider/2.jpg",
  "/slider/3.jpg",
  "/slider/4.jpg",
  "/slider/5.jpg",
  "/slider/6.jpg",
];

const STATS_KEYS   = ["years", "students", "rating", "wind"] as const;
const STATS_VALUES = ["5+", "1200+", "4.9★", "300+"] as const;

export default function HeroSlider() {
  const t = useTranslations("home");
  const [current, setCurrent] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent((c) => { setPrevIdx(c); return idx; });
  }, []);

  const goNext = useCallback(() =>
    goTo((current + 1) % SLIDES.length), [current, goTo]);
  const goPrev = useCallback(() =>
    goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() =>
      setCurrent((c) => { setPrevIdx(c); return (c + 1) % SLIDES.length; }), 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  return (
    <section className="relative overflow-hidden bg-ocean-gradient pt-16" aria-label="Hero">

      {/* ── IMAGE SLIDER ─────────────────────────────────── */}
      <div className="relative h-[52vh] min-h-[280px] w-full overflow-hidden sm:h-[60vh] lg:h-[68vh]">
        {/* Slides */}
        {SLIDES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: i === current ? 1 : 0,
              zIndex:  i === current ? 2 : i === prevIdx ? 1 : 0,
            }}
          >
            <Image
              src={src}
              alt={`Sharm Kite Dreams watersports — slide ${i + 1}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* Dark vignette bottom so content blends smoothly */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
        <div className="absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-navy-950/40 to-transparent" />

        {/* Prev / Next arrows */}
        <button
          onClick={() => { goPrev(); startTimer(); }}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 md:left-6"
        >
          <RiArrowLeftLine size={20} />
        </button>
        <button
          onClick={() => { goNext(); startTimer(); }}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 md:right-6"
        >
          <RiArrowRightLine size={20} />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); startTimer(); }}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-aqua-400" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
      {/* ── END SLIDER ───────────────────────────────────── */}

      {/* Wave animations between slider and text */}
      <div className="relative z-10 -mt-1">
        <WaveBackground />
      </div>

      {/* ── HERO TEXT CONTENT ────────────────────────────── */}
      <div className="relative z-20 mx-auto flex flex-col items-center px-5 pb-24 pt-10 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-aqua-500/30 bg-aqua-500/10 px-4 py-1.5 text-sm font-medium text-aqua-300 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-aqua-400" />
          </span>
          {t("hero.badge")}
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t("hero.title")}{" "}
          <span className="text-gradient-aqua">{t("hero.titleHighlight")}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="mb-9 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg md:text-xl"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-base font-bold text-white shadow-glow-sun transition hover:scale-105 hover:brightness-110 active:scale-95"
          >
            <RiWhatsappFill size={20} aria-hidden />
            {t("hero.primaryCta")}
          </a>
          <Link
            href="/activities"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            {t("hero.secondaryCta")}
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.58 }}
          className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-10"
        >
          {STATS_KEYS.map((key, i) => (
            <div key={key} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-extrabold text-gradient-aqua sm:text-4xl">
                {STATS_VALUES[i]}
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-white/50">
                {t(`stats.${key}`)}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
