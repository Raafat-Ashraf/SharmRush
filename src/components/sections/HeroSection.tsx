"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WHATSAPP_URL } from "@/lib/config";
import WaveBackground from "@/components/ui/WaveBackground";
import { RiWhatsappFill, RiArrowDownLine } from "react-icons/ri";

const STATS_KEYS = ["years", "students", "rating", "wind"] as const;
const STATS_VALUES = ["5+", "1200+", "4.9★", "300+"] as const;

export default function HeroSection() {
  const t = useTranslations("home");

  const scrollDown = () => {
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ocean-gradient"
      aria-label="Hero"
    >
      <WaveBackground />

      {/* Content */}
      <div className="container relative z-10 mx-auto flex flex-col items-center px-5 pt-24 pb-32 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-aqua-500/30 bg-aqua-500/10 px-4 py-1.5 text-sm font-medium text-aqua-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-aqua-400" />
          </span>
          {t("hero.badge")}
        </motion.div>


        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t("hero.title")}{" "}
          <span className="text-gradient-aqua">{t("hero.titleHighlight")}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mb-10 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg md:text-xl"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
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
            className="inline-flex items-center justify-center gap-2 rounded-full border border-aqua-400/40 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 hover:border-aqua-400/80"
          >
            {t("hero.secondaryCta")}
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8"
        >
          {STATS_KEYS.map((key, i) => (
            <div key={key} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-extrabold text-gradient-aqua sm:text-4xl">
                {STATS_VALUES[i]}
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-white/55">
                {t(`stats.${key}`)}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={scrollDown}
        aria-label="Scroll to explore"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-white/40 transition hover:text-white/70"
      >
        <span className="text-xs tracking-widest">SCROLL</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="block"
        >
          <RiArrowDownLine size={18} aria-hidden />
        </motion.span>
      </motion.button>
    </section>
  );
}
