import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS, SOCIAL, WHATSAPP_URL } from "@/lib/config";
import Image from "next/image";
import {
  RiInstagramLine,
  RiWhatsappFill,
  RiTelegramFill,
} from "react-icons/ri";

const socialItems = [
  { key: "instagram", href: SOCIAL.instagram, icon: RiInstagramLine },
  { key: "whatsapp", href: WHATSAPP_URL, icon: RiWhatsappFill },
  { key: "telegram", href: SOCIAL.telegram, icon: RiTelegramFill },
];

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 pt-16 pb-8 text-white/70">
      {/* Wave top */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-12 overflow-hidden">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M0,24 C360,48 720,0 1080,24 C1260,36 1380,12 1440,24 L1440,0 L0,0 Z"
            fill="rgba(11,177,191,0.1)"
          />
        </svg>
      </div>

      <div className="container mx-auto">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="SharmRush home">
              <Image
                src="/logo.png"
                alt="SharmRush"
                width={120}
                height={120}
                className="mb-4 h-16 w-auto rounded-xl object-contain"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
            {/* Social */}
            <div className="mt-6 flex gap-3">
              {socialItems.map(({ key, href, icon: Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(`social.${key}`)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-white/70 transition hover:bg-aqua-500 hover:text-white"
                >
                  <Icon size={17} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-aqua-400">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2 text-sm" role="list">
              {NAV_LINKS.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition hover:text-aqua-400"
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-aqua-400">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3 text-sm" role="list">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition hover:text-aqua-400"
                >
                  <RiWhatsappFill size={15} className="text-[#25D366]" aria-hidden />
                  +20 106 567 7390
                </a>
              </li>
              <li className="text-white/50">
                Sharm El Sheikh, South Sinai, Egypt
              </li>
              <li className="text-white/50">Daily · 8:00 — 18:00</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-xs sm:flex-row">
            <p className="text-white/50">
              © {year} Sharm Kite Dreams. {t("footer.rights")}
            </p>
            <p className="text-aqua-500/80">{t("footer.madeWith")}</p>
          </div>

          {/* DoGether credit */}
          <div className="mt-4 flex flex-col items-center gap-2 border-t border-white/5 pt-4 sm:flex-row sm:justify-center sm:gap-4">
            <p className="text-center text-[11px] text-white/35" dir="ltr">
              <span dir="rtl" className="inline-block">صُنع بواسطة</span>
              {" "}
              <span className="font-semibold text-aqua-500/70" dir="ltr">DoGether</span>
              {" "}
              <span dir="rtl" className="inline-block">للبرمجيات — مصر</span>
            </p>
            <a
              href="https://wa.me/201062485133"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-white/35 transition hover:text-[#25D366]"
              dir="ltr"
            >
              <RiWhatsappFill size={13} className="text-[#25D366]" aria-hidden />
              +20 10 624 85133
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
