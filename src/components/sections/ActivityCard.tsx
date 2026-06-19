"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WHATSAPP_URL } from "@/lib/config";
import type { Activity } from "@/lib/activities";
import Image from "next/image";
import { RiWhatsappFill, RiArrowRightLine } from "react-icons/ri";

interface Props {
  activity: Activity;
  index: number;
}

export default function ActivityCard({ activity, index }: Props) {
  const t = useTranslations("activities");
  const tc = useTranslations("common");
  const [activeImg, setActiveImg] = useState(0);

  const highlights = [
    t(`items.${activity.key}.highlights.one`),
    t(`items.${activity.key}.highlights.two`),
    t(`items.${activity.key}.highlights.three`),
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-navy-900/60 shadow-glass backdrop-blur-sm transition-all duration-300 hover:border-aqua-500/40 hover:shadow-glow dark:bg-navy-900/80"
    >
      {/* Main image with crossfade */}
      <div className="relative h-56 overflow-hidden sm:h-64">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeImg}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={activity.images[activeImg]}
              alt={`${t(`items.${activity.key}.name`)} — Sharm Kite Dreams`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Icon badge */}
        <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-navy-950/60 text-lg backdrop-blur-sm">
          {activity.icon}
        </div>
      </div>

      {/* Thumbnail strip — 3 sub-images */}
      <div className="flex gap-1.5 bg-navy-950/30 px-3 py-2">
        {activity.images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(i)}
            aria-label={`View image ${i + 1}`}
            className={`relative h-14 flex-1 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
              i === activeImg
                ? "border-aqua-400 opacity-100"
                : "border-transparent opacity-55 hover:opacity-80"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="mb-1 text-xl font-bold text-white">
          {t(`items.${activity.key}.name`)}
        </h3>
        <p className="mb-3 text-sm font-medium text-aqua-400">
          {t(`items.${activity.key}.tagline`)}
        </p>
        <p className="mb-4 text-sm leading-relaxed text-white/65 line-clamp-3">
          {t(`items.${activity.key}.description`)}
        </p>

        {/* Meta */}
        <div className="mb-4 flex flex-wrap gap-3 text-xs text-white/50">
          <span>
            <span className="font-semibold text-aqua-400/80">{t("labels.level")}:</span>{" "}
            {t(`items.${activity.key}.level`)}
          </span>
          <span>
            <span className="font-semibold text-aqua-400/80">{t("labels.duration")}:</span>{" "}
            {t(`items.${activity.key}.duration`)}
          </span>
        </div>

        {/* Highlights */}
        <ul className="mb-5 space-y-1.5" role="list">
          {highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-xs text-white/65">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-aqua-400" aria-hidden />
              {h}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hi, I'd like to book ${t(`items.${activity.key}.name`)}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
          >
            <RiWhatsappFill size={16} aria-hidden />
            {tc("bookWhatsApp")}
          </a>
          <Link
            href="/activities"
            className="flex items-center justify-center gap-1.5 rounded-full border border-aqua-500/30 px-4 py-2.5 text-sm font-semibold text-aqua-400 transition hover:border-aqua-400 hover:bg-aqua-400/10"
          >
            {tc("learnMore")}
            <RiArrowRightLine size={15} aria-hidden />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
