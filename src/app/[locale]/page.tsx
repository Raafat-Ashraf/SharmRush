import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildMetadata, buildLocalBusinessJsonLd, buildWebsiteJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/config";
import HeroSlider from "@/components/sections/HeroSlider";
import ActivityCard from "@/components/sections/ActivityCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLayout from "@/components/ui/SectionLayout";
import { ACTIVITIES } from "@/lib/activities";
import { WHATSAPP_URL } from "@/lib/config";

import { RiWhatsappFill, RiShieldCheckLine, RiToolsLine, RiMapPinLine, RiTeamLine } from "react-icons/ri";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    pathname: "/",
  });
}

const WHY_ICONS = [RiShieldCheckLine, RiToolsLine, RiMapPinLine, RiTeamLine];
const WHY_KEYS = ["instructors", "equipment", "spot", "languages"] as const;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const localBusiness = buildLocalBusinessJsonLd(locale as Locale);
  const website = buildWebsiteJsonLd();

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Intro */}
      <SectionLayout className="bg-white dark:bg-navy-950">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-5 text-3xl font-extrabold text-navy-900 dark:text-white md:text-4xl">
              {t("intro.title")}
            </h2>
            <p className="text-base leading-relaxed text-navy-700/80 dark:text-white/65 md:text-lg">
              {t("intro.body")}
            </p>
          </div>
        </ScrollReveal>
      </SectionLayout>

      {/* Featured activities */}
      <SectionLayout id="featured" className="bg-navy-950/5 dark:bg-navy-900/40">
        <ScrollReveal className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-extrabold text-navy-900 dark:text-white md:text-4xl">
            {t("featured.title")}
          </h2>
          <p className="text-base text-navy-700/70 dark:text-white/55">
            {t("featured.subtitle")}
          </p>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACTIVITIES.map((act, i) => (
            <div key={act.key} id={act.key}>
              <ActivityCard activity={act} index={i} />
            </div>
          ))}
        </div>
      </SectionLayout>

      {/* Why SharmRush */}
      <SectionLayout className="bg-ocean-gradient text-white">
        <ScrollReveal className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-extrabold md:text-4xl">
            {t("why.title")}
          </h2>
          <p className="text-white/70">{t("why.subtitle")}</p>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_KEYS.map((key, i) => {
            const Icon = WHY_ICONS[i];
            return (
              <ScrollReveal key={key} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 text-center transition hover:border-aqua-400/40">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-aqua-500/20">
                    <Icon size={24} className="text-aqua-400" aria-hidden />
                  </div>
                  <h3 className="mb-2 font-bold">{t(`why.items.${key}.title`)}</h3>
                  <p className="text-sm text-white/65">{t(`why.items.${key}.body`)}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </SectionLayout>

      {/* Final CTA */}
      <SectionLayout className="bg-white dark:bg-navy-950">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl rounded-3xl bg-ocean-gradient p-10 text-center shadow-glow md:p-14">
            <h2 className="mb-3 text-3xl font-extrabold text-white md:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="mb-8 text-white/70">{t("cta.subtitle")}</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-3.5 text-base font-bold text-white shadow-glow-sun transition hover:brightness-110 hover:scale-105"
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
