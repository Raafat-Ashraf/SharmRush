import type { Metadata } from "next";
import { SITE_URL } from "./config";
import type { Locale } from "./config";

interface SeoInput {
  title: string;
  description: string;
  keywords?: string;
  locale: Locale;
  pathname: string;
  ogImage?: string;
}

export function buildMetadata({
  title,
  description,
  keywords,
  locale,
  pathname,
  ogImage = "/og-default.jpg",
}: SeoInput): Metadata {
  const url = `${SITE_URL}/${locale}${pathname === "/" ? "" : pathname}`;
  const alternates: Record<string, string> = {
    en: `${SITE_URL}/en${pathname === "/" ? "" : pathname}`,
    ar: `${SITE_URL}/ar${pathname === "/" ? "" : pathname}`,
    ru: `${SITE_URL}/ru${pathname === "/" ? "" : pathname}`,
  };

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Sharm Kite Dreams",
      locale,
      type: "website",
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export function buildLocalBusinessJsonLd(locale: Locale) {
  const names: Record<Locale, string> = {
    en: "Sharm Kite Dreams Watersports Center",
    ar: "مركز شارم كايت دريمز للرياضات المائية",
    ru: "Sharm Kite Dreams — центр водных видов спорта",
  };
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: names[locale],
    url: SITE_URL,
    telephone: "+201065677390",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sharm El Sheikh",
      addressRegion: "South Sinai",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 27.9467,
      longitude: 34.3488,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
    sameAs: [
      "https://instagram.com/sharmrush",
      "https://facebook.com/sharmrush",
      "https://tiktok.com/@sharmrush",
    ],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sharm Kite Dreams",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/en/activities`,
    },
  };
}
