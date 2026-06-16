import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildMetadata, buildLocalBusinessJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/config";
import { ACTIVITIES } from "@/lib/activities";
import ActivityCard from "@/components/sections/ActivityCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLayout from "@/components/ui/SectionLayout";
import { WHATSAPP_URL } from "@/lib/config";
import { RiWhatsappFill } from "react-icons/ri";
import WaveBackground from "@/components/ui/WaveBackground";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "activities.meta" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    pathname: "/activities",
  });
}

export default async function ActivitiesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "activities" });
  const jsonLd = buildLocalBusinessJsonLd(locale as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page hero */}
      <section className="relative overflow-hidden bg-ocean-gradient pb-24 pt-36 text-center text-white">
        <WaveBackground />
        <div className="container relative z-10 mx-auto">
          <ScrollReveal>
            <h1 className="mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/70">{t("subtitle")}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro */}
      <SectionLayout className="bg-white dark:bg-navy-950">
        <ScrollReveal>
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-navy-700/80 dark:text-white/65 md:text-lg">
            {t("intro")}
          </p>
        </ScrollReveal>
      </SectionLayout>

      {/* Activity cards */}
      <SectionLayout className="bg-navy-950/5 dark:bg-navy-900/40">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ACTIVITIES.map((act, i) => (
            <ActivityCard key={act.key} activity={act} index={i} />
          ))}
        </div>
      </SectionLayout>

      {/* CTA */}
      <SectionLayout className="bg-white dark:bg-navy-950">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl rounded-3xl bg-ocean-gradient p-10 text-center shadow-glow">
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
