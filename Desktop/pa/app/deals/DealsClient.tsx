"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Tag, Clock } from "lucide-react";
import SectionHeading from "@/app/components/SectionHeading";
import BookingModal from "@/app/components/BookingModal";
import { deals, dealCategories } from "@/app/lib/data";

export default function DealsClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [bookingOpen, setBookingOpen] = useState(false);

  const filtered =
    activeCategory === "All"
      ? deals
      : deals.filter((d) => d.category === activeCategory);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1920&q=85"
            alt="Special offers"
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
            Limited Time
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white"
          >
            Exclusive Deals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/70 mt-4 max-w-lg mx-auto"
          >
            Treat yourself with our special packages and save big on premium
            beauty services.
          </motion.p>
        </div>
      </section>

      {/* Deals */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["All", ...dealCategories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-secondary text-white shadow-md"
                    : "bg-white text-text hover:bg-muted border border-muted-dark"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((deal, i) => (
              <motion.div
                key={deal.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col sm:flex-row"
              >
                <div className="relative sm:w-72 h-56 sm:h-auto shrink-0 overflow-hidden">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {deal.badge && (
                    <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {deal.badge}
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-serif font-semibold mb-2">
                      {deal.title}
                    </h3>
                    <p className="text-text-light text-sm leading-relaxed mb-4">
                      {deal.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-text-light mb-3">
                      <Clock size={14} />
                      <span>Limited time offer</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-muted">
                    <div className="flex items-center gap-3">
                      <span className="text-text-light line-through text-lg">
                        {deal.originalPrice}
                      </span>
                      <span className="text-3xl font-serif font-bold text-primary">
                        {deal.discountedPrice}
                      </span>
                    </div>
                    <button
                      onClick={() => setBookingOpen(true)}
                      className="px-5 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-full text-sm font-medium transition-all"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-text-light py-12">
              No deals available in this category right now. Check back soon!
            </p>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16 bg-muted rounded-3xl p-8 sm:p-12"
          >
            <Tag size={32} className="text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-semibold mb-3">
            Don&apos;t Miss Out!
            </h3>
            <p className="text-text-light mb-6 max-w-md mx-auto">
              Subscribe to our newsletter to receive exclusive deals and
              offers directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3 rounded-xl border border-muted-dark focus:border-primary outline-none transition-colors"
              />
              <button className="px-6 py-3 bg-secondary hover:bg-secondary-dark text-white rounded-xl font-medium transition-all">
                Subscribe
              </button>
            </div>
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
