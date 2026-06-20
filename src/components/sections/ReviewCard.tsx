"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RiStarFill } from "react-icons/ri";

interface Props {
  image: string;
  name: string;
  country: string;
  activity: string;
  text: string;
  rating?: number;
  index: number;
}

export default function ReviewCard({
  image, name, country, activity, text, rating = 5, index,
}: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-white/10 bg-navy-900/60 p-6 shadow-glass backdrop-blur-sm transition-all duration-300 hover:border-aqua-500/40 hover:shadow-glow sm:p-8"
    >
      {/* Quote mark decoration */}
      <div
        aria-hidden
        className="absolute -right-3 -top-3 text-[96px] font-serif leading-none text-aqua-500/10 select-none"
      >
        &ldquo;
      </div>

      {/* Stars */}
      <div className="flex gap-1" aria-label={`Rating: ${rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <RiStarFill
            key={i}
            size={18}
            className={i < rating ? "text-sun-400" : "text-white/20"}
            aria-hidden
          />
        ))}
      </div>

      {/* Review text */}
      <p className="relative z-10 flex-1 text-sm leading-relaxed text-white/75 sm:text-base">
        &ldquo;{text}&rdquo;
      </p>

      {/* Activity badge */}
      <span className="inline-flex w-fit items-center rounded-full border border-aqua-500/30 bg-aqua-500/10 px-3 py-1 text-xs font-semibold text-aqua-400">
        {activity}
      </span>

      {/* Reviewer */}
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-aqua-500/40">
          <Image
            src={image}
            alt={name}
            fill
            sizes="56px"
            className="object-cover object-top"
          />
        </div>
        <div>
          <p className="font-bold text-white">{name}</p>
          <p className="text-xs text-white/50">{country}</p>
        </div>
      </div>
    </motion.article>
  );
}
