import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/config";
import WaveBackground from "@/components/ui/WaveBackground";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLayout from "@/components/ui/SectionLayout";
import GalleryGrid from "@/components/sections/GalleryGrid";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery.meta" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    pathname: "/gallery",
  });
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ocean-gradient pb-24 pt-36 text-center text-white">
        <WaveBackground />
        <div className="container relative z-10 mx-auto">
          <ScrollReveal>
            <h1 className="mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mx-auto max-w-xl text-lg text-white/70">{t("subtitle")}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro */}
      <SectionLayout className="bg-white dark:bg-navy-950">
        <ScrollReveal>
          <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-navy-700/80 dark:text-white/65">
            {t("intro")}
          </p>
        </ScrollReveal>
        <div className="mt-12">
          <GalleryGrid locale={locale as Locale} />
        </div>
      </SectionLayout>
    </>
  );
}
