"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const TABS = [
  { key: "all",         icon: "🌊" },
  { key: "kitesurfing", icon: "🪁" },
  { key: "windsurfing", icon: "🏄" },
  { key: "wingfoil",    icon: "🪂" },
] as const;

type TabKey = typeof TABS[number]["key"];

interface Props {
  /** called when user picks a tab */
  onChange?: (key: TabKey) => void;
}

const TAB_LABELS: Record<TabKey, Record<string, string>> = {
  all:         { en: "All Activities", ar: "جميع الأنشطة", ru: "Все" },
  kitesurfing: { en: "Kitesurfing",    ar: "كايت سيرف",    ru: "Кайтсёрфинг" },
  windsurfing: { en: "Windsurfing",    ar: "ويند سيرف",    ru: "Виндсёрфинг" },
  wingfoil:    { en: "Wingfoil",       ar: "وينج فويل",    ru: "Вингфойл" },
};

export default function ActivityTabs({ onChange }: Props) {
  const [active, setActive] = useState<TabKey>("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Detect locale from html lang attribute (client-safe)
  const lang = typeof document !== "undefined"
    ? (document.documentElement.lang || "en")
    : "en";

  const label = (key: TabKey) =>
    TAB_LABELS[key][lang] ?? TAB_LABELS[key]["en"];

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -160 : 160,
      behavior: "smooth",
    });
  };

  const pick = (key: TabKey) => {
    setActive(key);
    onChange?.(key);
    // Scroll active into view
    const el = scrollRef.current?.querySelector(`[data-key="${key}"]`) as HTMLElement | null;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div className="relative z-30 flex items-center gap-1 bg-navy-950/60 px-3 py-3 backdrop-blur-md sm:px-6">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/8 text-white/60 transition hover:bg-white/15 hover:text-white"
      >
        <RiArrowLeftSLine size={18} />
      </button>

      {/* Scrollable tab list */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex flex-1 gap-2 overflow-x-auto"
        role="tablist"
        aria-label="Activity filter"
      >
        {TABS.map(({ key, icon }) => (
          <button
            key={key}
            data-key={key}
            role="tab"
            aria-selected={active === key}
            onClick={() => pick(key)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-1.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              active === key
                ? "bg-sun-gradient text-white shadow-glow-sun"
                : "bg-white/8 text-white/65 hover:bg-white/15 hover:text-white"
            }`}
          >
            <span aria-hidden>{icon}</span>
            {label(key)}
          </button>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/8 text-white/60 transition hover:bg-white/15 hover:text-white"
      >
        <RiArrowRightSLine size={18} />
      </button>
    </div>
  );
}
