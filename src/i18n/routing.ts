import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ar", "ru"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
  ru: "ltr",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  ru: "Русский",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});
