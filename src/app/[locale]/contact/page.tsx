import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildMetadata, buildLocalBusinessJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/config";
import { WHATSAPP_URL, SOCIAL } from "@/lib/config";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLayout from "@/components/ui/SectionLayout";
import WaveBackground from "@/components/ui/WaveBackground";
import {
  RiWhatsappFill,
  RiMapPin2Line,
  RiTimeLine,
  RiInstagramLine,
} from "react-icons/ri";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    pathname: "/contact",
  });
}

const SOCIAL_LINKS = [
  { key: "instagram", href: SOCIAL.instagram, icon: RiInstagramLine, label: "Instagram" },
];

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const jsonLd = buildLocalBusinessJsonLd(locale as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

      <SectionLayout className="bg-white dark:bg-navy-950">
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-2">
          {/* WhatsApp primary CTA */}
          <ScrollReveal direction="left">
            <div className="flex flex-col items-center justify-center rounded-3xl bg-ocean-gradient p-10 text-center text-white shadow-glow">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#25D366]/20">
                <RiWhatsappFill size={44} className="text-[#25D366]" aria-hidden />
              </div>
              <h2 className="mb-2 text-2xl font-extrabold">{tc("bookWhatsApp")}</h2>
              <p className="mb-6 text-sm text-white/70">{t("body")}</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 w-full rounded-full bg-[#25D366] py-3.5 text-center text-base font-bold text-white shadow-glow-sun transition hover:brightness-110 hover:scale-105"
              >
                {t("whatsappCta")}
              </a>
              <p className="text-xs text-white/50">{t("responseTime")}</p>
            </div>
          </ScrollReveal>

          {/* Info panel */}
          <ScrollReveal direction="right">
            <div className="flex flex-col gap-6 rounded-3xl border border-navy-200 bg-white p-8 shadow-glass dark:border-white/10 dark:bg-navy-900/60">
              <InfoItem
                icon={<RiWhatsappFill size={22} className="text-[#25D366]" />}
                label={t("phoneLabel")}
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-900 transition hover:text-aqua-500 dark:text-white"
                >
                  +20 106 567 7390
                </a>
              </InfoItem>

              <InfoItem
                icon={<RiTimeLine size={22} className="text-aqua-400" />}
                label={t("hoursLabel")}
              >
                <span className="text-navy-700 dark:text-white/80">{t("hoursValue")}</span>
              </InfoItem>

              <InfoItem
                icon={<RiMapPin2Line size={22} className="text-aqua-400" />}
                label={t("addressLabel")}
              >
                <span className="text-navy-700 dark:text-white/80">{t("addressValue")}</span>
              </InfoItem>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-aqua-500">
                  {t("followLabel")}
                </p>
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-pink-500/30 bg-gradient-to-r from-pink-500/10 to-purple-500/10 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-pink-400/60 hover:text-white"
                >
                  <RiInstagramLine size={22} className="text-pink-400" aria-hidden />
                  <span>@kitesurfing_one</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionLayout>
    </>
  );
}

function InfoItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-navy-400 dark:text-aqua-400/70">
          {label}
        </p>
        <div className="mt-0.5 text-sm font-medium">{children}</div>
      </div>
    </div>
  );
}
