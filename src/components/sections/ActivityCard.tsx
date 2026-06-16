"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WHATSAPP_URL } from "@/lib/config";
import type { Activity } from "@/lib/activities";
import Image from "next/image";
import { RiWhatsappFill, RiArrowRightLine } from "react-icons/ri";

interface Props {
  activity: Activity;
  index: number;
  variant?: "grid" | "feature";
}

export default function ActivityCard({ activity, index, variant = "grid" }: Props) {
  const t = useTranslations("activities");
  const tc = useTranslations("common");
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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-navy-900/60 shadow-glass backdrop-blur-sm transition-all duration-300 hover:border-aqua-500/40 hover:shadow-glow dark:bg-navy-900/80"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden sm:h-60">
        <Image
          src={activity.image}
          alt={activity.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
        {/* Icon badge */}
        <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-navy-950/60 text-xl backdrop-blur-sm">
          {activity.icon}
        </div>
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
          <span className="flex items-center gap-1">
            <span className="font-semibold text-aqua-400/80">{t("labels.level")}:</span>{" "}
            {t(`items.${activity.key}.level`)}
          </span>
          <span className="flex items-center gap-1">
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
