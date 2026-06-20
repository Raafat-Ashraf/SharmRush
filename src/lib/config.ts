export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharmrush.com";

export const WHATSAPP_NUMBER = "201065677390";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const SOCIAL = {
  whatsapp: WHATSAPP_URL,
  instagram: "https://www.instagram.com/kitesurfing_one?igsh=eDBrY3VoN3hvZDI0&utm_source=qr",
  telegram: "https://t.me/Errrror0",
};

export const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112785.31534318488!2d34.34875314999999!3d27.946710099999997!2m3!1f0!2f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14533bca3624d2e3%3A0xdd987e9c1945fd9c!2z2LTYsdmFINin2YTYtNmK2K7YjCDYq9in2YYg2LTYsdmFINin2YTYtNmK2K7YjCDZhdit2KfZgdi42Kkg2KzZhtmI2Kgg2LPZitmG2KfYoQ!5e0!3m2!1sar!2seg!4v1781569676115!5m2!1sar!2seg";

export const LOCALES = ["en", "ar", "ru"] as const;
export type Locale = (typeof LOCALES)[number];

export const NAV_LINKS = [
  { href: "/", labelKey: "nav.home" },
  { href: "/activities", labelKey: "nav.activities" },
  { href: "/reviews", labelKey: "nav.reviews" },
  { href: "/location", labelKey: "nav.location" },
  { href: "/gallery", labelKey: "nav.gallery" },
  { href: "/contact", labelKey: "nav.contact" },
] as const;
