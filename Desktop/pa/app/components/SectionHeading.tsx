"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${centered ? "text-center" : ""}`}
    >
      {subtitle && (
        <span
          className={`text-sm font-sans font-medium uppercase tracking-[0.2em] ${
            light ? "text-secondary" : "text-secondary"
          }`}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold mt-3 ${
          light ? "text-white" : "text-text"
        }`}
      >
        {title}
      </h2>
      <div
        className={`w-20 h-0.5 mt-4 mx-auto ${
          centered ? "mx-auto" : ""
        } ${light ? "bg-secondary" : "bg-primary"}`}
      />
    </motion.div>
  );
}
