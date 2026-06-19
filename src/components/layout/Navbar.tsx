"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/config";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { RiMenuLine, RiCloseLine, RiWhatsappFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-navy-950/92 shadow-glass backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="container mx-auto flex h-16 items-center justify-between md:h-[72px]"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label="SharmRush home"
        >
          <Image
            src="/logo.png"
            alt="SharmRush"
            width={160}
            height={160}
            priority
            className="h-12 w-12 rounded-2xl object-cover ring-2 ring-aqua-500/40 transition group-hover:ring-aqua-400 md:h-14 md:w-14"
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-base font-black tracking-tight text-white">
              SHARM KITE <span className="text-sun-400">DREAMS</span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-aqua-400">
              Watersports
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {NAV_LINKS.map(({ href, labelKey }) => (
            <li key={href}>
              <Link
                href={href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:text-aqua-400 ${
                  isActive(href) ? "text-aqua-400" : "text-white/85"
                }`}
              >
                {t(labelKey)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* WhatsApp CTA — desktop */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 hidden items-center gap-2 rounded-full bg-aqua-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-aqua-400 sm:flex"
          >
            <RiWhatsappFill size={16} aria-hidden />
            {t("nav.book")}
          </a>

          {/* Hamburger — mobile */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-navy-950/95 backdrop-blur-md lg:hidden"
          >
            <ul className="container mx-auto flex flex-col py-4" role="list">
              {NAV_LINKS.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block rounded-lg px-3 py-3.5 text-base font-medium transition-colors hover:text-aqua-400 ${
                      isActive(href) ? "text-aqua-400" : "text-white/80"
                    }`}
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
              <li className="mt-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-aqua-500 py-3 text-base font-semibold text-white shadow-glow"
                >
                  <RiWhatsappFill size={18} aria-hidden />
                  {t("nav.book")}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
