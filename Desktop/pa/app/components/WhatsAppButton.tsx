"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { contactInfo } from "@/app/lib/data";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      aria-label="Chat on WhatsApp"
    >
      <Phone size={20} fill="white" stroke="white" />
      <span className="text-sm font-medium hidden sm:inline">Chat</span>
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
      />
    </motion.a>
  );
}
