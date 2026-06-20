import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/config";
import { WHATSAPP_URL } from "@/lib/config";
import WaveBackground from "@/components/ui/WaveBackground";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLayout from "@/components/ui/SectionLayout";
import ReviewCard from "@/components/sections/ReviewCard";
import { RiWhatsappFill, RiStarFill } from "react-icons/ri";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reviews.meta" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    pathname: "/reviews",
  });
}

const REVIEWS = [
  { key: "r1", image: "/reviews/1.jpg", rating: 5 },
  { key: "r2", image: "/reviews/2.jpg", rating: 5 },
  { key: "r3", image: "/reviews/3.jpg", rating: 5 },
] as const;

export default async function ReviewsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reviews" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("title"),
    itemListElement: REVIEWS.map((r, i) => ({
      "@type": "Review",
      position: i + 1,
      author: { "@type": "Person", name: t(`items.${r.key}.name`) },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: t(`items.${r.key}.text`),
      itemReviewed: { "@type": "LocalBusiness", name: "Sharm Kite Dreams" },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ocean-gradient pb-28 pt-36 text-center text-white">
        <WaveBackground />
        <div className="container relative z-20 mx-auto">
          <ScrollReveal>
            {/* Overall rating badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sun-400/30 bg-sun-400/10 px-5 py-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <RiStarFill key={i} size={18} className="text-sun-400" aria-hidden />
              ))}
              <span className="ml-1 text-sm font-bold text-sun-400">5.0</span>
            </div>
            <h1 className="mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mx-auto max-w-xl text-lg text-white/70">{t("subtitle")}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Review cards */}
      <SectionLayout className="bg-white dark:bg-navy-950">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <ReviewCard
              key={r.key}
              index={i}
              image={r.image}
              rating={r.rating}
              name={t(`items.${r.key}.name`)}
              country={t(`items.${r.key}.country`)}
              activity={t(`items.${r.key}.activity`)}
              text={t(`items.${r.key}.text`)}
            />
          ))}
        </div>
      </SectionLayout>

      {/* CTA */}
      <SectionLayout className="bg-white dark:bg-navy-950 pt-0">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl rounded-3xl bg-ocean-gradient p-10 text-center shadow-glow md:p-14">
            <h2 className="mb-3 text-2xl font-extrabold text-white md:text-3xl">
              {t("cta.title")}
            </h2>
            <p className="mb-8 text-white/70">{t("cta.subtitle")}</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-3.5 font-bold text-white shadow-glow-sun transition hover:brightness-110 hover:scale-105"
            >
              <RiWhatsappFill size={20} aria-hidden />
              {t("cta.button")}
            </a>
          </div>
        </ScrollReveal>
      </SectionLayout>
    </>
  );
}
