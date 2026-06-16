import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildMetadata, buildLocalBusinessJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/config";
import { WHATSAPP_URL, GOOGLE_MAPS_EMBED } from "@/lib/config";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLayout from "@/components/ui/SectionLayout";
import WaveBackground from "@/components/ui/WaveBackground";
import {
  RiMapPin2Line,
  RiTimeLine,
  RiWhatsappFill,
  RiExternalLinkLine,
} from "react-icons/ri";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "location.meta" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    pathname: "/location",
  });
}

export default async function LocationPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "location" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const jsonLd = buildLocalBusinessJsonLd(locale as Locale);

  const MAPS_LINK =
    "https://maps.google.com/?q=SharmRush+Sharm+El+Sheikh";

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

      {/* Map + info */}
      <SectionLayout className="bg-white dark:bg-navy-950">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Map */}
          <ScrollReveal className="lg:col-span-3" direction="left">
            <div className="overflow-hidden rounded-2xl shadow-glass">
              <iframe
                src={GOOGLE_MAPS_EMBED}
                title={t("mapTitle")}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[340px] w-full border-0 md:h-[450px]"
                allowFullScreen
              />
            </div>
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal className="flex flex-col justify-center gap-6 lg:col-span-2" direction="right">
            <p className="text-base leading-relaxed text-navy-700/80 dark:text-white/65">
              {t("body")}
            </p>

            <div className="space-y-4">
              <InfoRow
                icon={<RiMapPin2Line size={20} className="text-aqua-400" />}
                label={t("address.label")}
                value={t("address.value")}
              />
              <InfoRow
                icon={<RiTimeLine size={20} className="text-aqua-400" />}
                label={t("hours.label")}
                value={t("hours.value")}
              />
              <InfoRow
                icon={<RiWhatsappFill size={20} className="text-[#25D366]" />}
                label={t("phone.label")}
                value="+20 106 567 7390"
                href={WHATSAPP_URL}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-bold text-white shadow-glow-sun transition hover:brightness-110"
              >
                <RiWhatsappFill size={18} aria-hidden />
                {tc("bookWhatsApp")}
              </a>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-aqua-500/40 px-5 py-3 font-semibold text-aqua-600 dark:text-aqua-400 transition hover:bg-aqua-400/10"
              >
                <RiExternalLinkLine size={16} aria-hidden />
                {t("directions")}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </SectionLayout>
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-navy-400 dark:text-aqua-400/70">
          {label}
        </p>
        <p className="mt-0.5 text-sm text-navy-800 dark:text-white/80">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
}
