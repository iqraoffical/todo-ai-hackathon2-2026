"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Scissors, Sparkles, Eye, Hand, Heart, Sun } from "lucide-react";
import SectionHeading from "@/app/components/SectionHeading";
import BookingModal from "@/app/components/BookingModal";
import { services, serviceCategories } from "@/app/lib/data";

const categoryIcons: Record<string, React.ReactNode> = {
  Hair: <Scissors size={24} />,
  Skin: <Sparkles size={24} />,
  Makeup: <Eye size={24} />,
  Nails: <Hand size={24} />,
  Bridal: <Heart size={24} />,
  Spa: <Sun size={24} />,
};

export default function ServicesClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [bookingOpen, setBookingOpen] = useState(false);

  const filtered =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=85"
            alt="Salon services"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-secondary text-sm font-sans uppercase tracking-[0.2em] block mb-4"
          >
            Premium Treatments
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white"
          >
            Our Services
          </motion.h1>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["All", ...serviceCategories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-secondary text-white shadow-md"
                    : "bg-white text-text hover:bg-muted border border-muted-dark"
                }`}
              >
                {cat !== "All" && categoryIcons[cat]}
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs text-white/80 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {service.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-text-light text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-muted">
                    <span className="text-2xl font-serif font-bold text-primary">
                      {service.price}
                    </span>
                    <span className="text-sm text-text-light flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                      {service.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-text-light mb-6">
              Not sure which service is right for you? Contact us for a
              personalized consultation.
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              className="px-8 py-3 bg-secondary hover:bg-secondary-dark text-white rounded-full transition-all duration-300 text-sm font-medium uppercase tracking-wider shadow-lg"
            >
              Book a Consultation
            </button>
          </motion.div>
        </div>
      </section>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
}
