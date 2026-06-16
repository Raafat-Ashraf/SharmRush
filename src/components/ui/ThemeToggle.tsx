"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { useTranslations } from "next-intl";
import { RiSunLine, RiMoonLine } from "react-icons/ri";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const t = useTranslations("theme");

  return (
    <button
      onClick={toggle}
      aria-label={t("toggle")}
      title={theme === "dark" ? t("light") : t("dark")}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-aqua-400 ${className ?? ""}`}
    >
      {theme === "dark" ? (
        <RiSunLine size={19} aria-hidden />
      ) : (
        <RiMoonLine size={19} aria-hidden />
      )}
    </button>
  );
}
