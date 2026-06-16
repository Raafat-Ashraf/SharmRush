"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { RiTranslate2 } from "react-icons/ri";

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("language");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t("label")}
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
      >
        <RiTranslate2 size={17} aria-hidden />
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <span className="sm:hidden">{locale.toUpperCase()}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("label")}
          className="glass-dark absolute end-0 top-full z-50 mt-2 min-w-[130px] rounded-xl py-1.5 shadow-glass"
        >
          {locales.map((loc) => (
            <li key={loc} role="option" aria-selected={loc === locale}>
              <button
                onClick={() => switchLocale(loc)}
                className={`w-full px-4 py-2 text-start text-sm transition hover:text-aqua-400 ${
                  loc === locale
                    ? "font-semibold text-aqua-400"
                    : "text-white/80"
                }`}
              >
                {localeNames[loc]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
