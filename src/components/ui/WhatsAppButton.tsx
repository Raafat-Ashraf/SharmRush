"use client";

import { motion } from "framer-motion";
import { RiWhatsappFill } from "react-icons/ri";
import { WHATSAPP_URL } from "@/lib/config";
import { useTranslations } from "next-intl";

export default function WhatsAppButton() {
  const t = useTranslations("common");

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("bookWhatsApp")}
      title={t("bookWhatsApp")}
      className="fixed bottom-6 end-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-glow-sun transition-transform duration-200 hover:scale-110 active:scale-95 md:bottom-8 md:end-8"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
    >
      <RiWhatsappFill size={30} className="text-white" aria-hidden />
    </motion.a>
  );
}
