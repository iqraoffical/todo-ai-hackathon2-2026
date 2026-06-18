"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Scissors,
  Sparkles,
  Eye,
  Hand,
  Heart,
  Sun,
  Star,
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SectionHeading from "@/app/components/SectionHeading";
import BookingModal from "@/app/components/BookingModal";
import { services, deals, testimonials, galleryItems } from "@/app/lib/data";

const serviceIcons: Record<string, React.ReactNode> = {
  Hair: <Scissors size={28} />,
  Skin: <Sparkles size={28} />,
  Makeup: <Eye size={28} />,
  Nails: <Hand size={28} />,
  Bridal: <Heart size={28} />,
  Spa: <Sun size={28} />,
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = () =>
    setTestimonialIndex((p) => (p + 1) % testimonials.length);
  const prevTestimonial = () =>
    setTestimonialIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560067174-c5a3a8f8e5f2?w=1920&q=85"
            alt="Luxury salon interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-secondary text-sm font-sans uppercase tracking-[0.3em] block mb-4"
          >
            Luxury Beauty Salon
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight"
          >
            Moments
            <span className="block text-secondary font-light italic">
              of Beauty
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/80 text-lg sm:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed"
          >
            Where elegance meets expertise. Experience premium beauty
            treatments crafted just for you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => setBookingOpen(true)}
              className="px-8 py-4 bg-secondary hover:bg-secondary-dark text-white font-medium rounded-full transition-all duration-300 text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:shadow-secondary/30"
            >
              Book Appointment
            </button>
            <Link
              href="/services"
              className="px-8 py-4 border-2 border-white/30 hover:border-white text-white font-medium rounded-full transition-all duration-300 text-sm uppercase tracking-wider"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
            <div className="w-1 h-3 bg-secondary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ===== WELCOME / ABOUT ===== */}
      <section className="py-20 sm:py-28 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=85"
                  alt="Moments Salon interior"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 hidden sm:block"
              >
                <p className="text-3xl font-serif font-bold text-primary">
                  10+
                </p>
                <p className="text-sm text-text-light">Years of Excellence</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-secondary text-sm font-sans uppercase tracking-[0.2em]">
                Welcome to Moments
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-text mt-3 mb-6">
                Where Beauty{" "}
                <span className="text-primary italic">Meets Elegance</span>
              </h2>
              <p className="text-text-light leading-relaxed mb-6">
                At Moments Salon, we believe every client deserves to feel
                beautiful, confident, and pampered. Our team of expert
                stylists and aestheticians are dedicated to providing
                personalized beauty experiences in a luxurious and relaxing
                environment.
              </p>
              <p className="text-text-light leading-relaxed mb-8">
                From precision haircuts to transformative skincare
                treatments, we use only the finest products and latest
                techniques to ensure you leave feeling radiant.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-secondary hover:text-secondary-dark font-medium transition-colors group"
              >
                Learn Our Story
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES OVERVIEW ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Services"
            subtitle="What We Offer"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.slice(0, 6).map((service, i) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
                className="group bg-accent rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-muted hover:border-primary/20"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {serviceIcons[service.category] || <Sparkles size={28} />}
                </div>
                <h3 className="text-lg font-serif font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-text-light text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-secondary font-semibold">
                    {service.price}
                  </span>
                  <span className="text-text-light text-xs">
                    {service.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 border border-secondary text-secondary hover:bg-secondary hover:text-white rounded-full transition-all duration-300 text-sm font-medium"
            >
              View All Services
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== DEALS / OFFERS ===== */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Exclusive Deals"
            subtitle="Limited Time Offers"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {deals.slice(0, 3).map((deal, i) => (
              <motion.div
                key={deal.id}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
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
                <div className="p-6">
                  <h3 className="text-lg font-serif font-semibold mb-2">
                    {deal.title}
                  </h3>
                  <p className="text-text-light text-sm leading-relaxed mb-4">
                    {deal.description}
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-text-light line-through text-sm">
                      {deal.originalPrice}
                    </span>
                    <span className="text-2xl font-serif font-bold text-primary">
                      {deal.discountedPrice}
                    </span>
                  </div>
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="w-full py-2.5 border border-secondary text-secondary hover:bg-secondary hover:text-white rounded-full transition-all duration-300 text-sm font-medium"
                  >
                    Claim Offer
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary-dark text-white rounded-full transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl"
            >
              View All Deals
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 sm:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Testimonials"
          />
          <div className="relative max-w-3xl mx-auto">
            {/* Carousel */}
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-accent rounded-3xl p-8 sm:p-12 text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < testimonials[testimonialIndex].rating
                        ? "fill-secondary text-secondary"
                        : "text-muted-dark"
                    }
                  />
                ))}
              </div>
              <blockquote className="text-lg sm:text-xl text-text-light leading-relaxed mb-8 italic">
                &ldquo;{testimonials[testimonialIndex].text}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Image
                    src={testimonials[testimonialIndex].image}
                    alt={testimonials[testimonialIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-serif font-semibold">
                    {testimonials[testimonialIndex].name}
                  </p>
                  {testimonials[testimonialIndex].service && (
                    <p className="text-xs text-text-light">
                      {testimonials[testimonialIndex].service}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-muted-dark hover:border-primary hover:text-primary transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === testimonialIndex
                      ? "bg-primary w-6"
                      : "bg-muted-dark hover:bg-primary/50"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-muted-dark hover:border-primary hover:text-primary transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY TEASER ===== */}
      <section className="py-20 sm:py-28 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Work"
            subtitle="Instagram"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {galleryItems.slice(0, 8).map((item, i) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                custom={i}
                className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                  i === 0 || i === 3 ? "row-span-2" : ""
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <Camera
                    size={24}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 border border-secondary text-secondary hover:bg-secondary hover:text-white rounded-full transition-all duration-300 text-sm font-medium"
            >
              View Full Gallery
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1634302084212-5b1b50e1b66b?w=1920&q=85"
            alt="Beautiful hairstyle"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/75" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              Ready for Your{" "}
              <span className="text-secondary">Transformation</span>?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto">
              Book your appointment today and experience the Moments Salon
              difference.
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              className="px-10 py-4 bg-secondary hover:bg-secondary-dark text-white font-medium rounded-full transition-all duration-300 text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:shadow-secondary/30"
            >
              Book Your Appointment
            </button>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
