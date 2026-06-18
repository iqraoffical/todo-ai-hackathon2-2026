"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Award, Users, Heart } from "lucide-react";
import SectionHeading from "@/app/components/SectionHeading";
import { team, contactInfo } from "@/app/lib/data";

const stats = [
  { icon: <Award size={28} />, value: "10+", label: "Years Experience" },
  { icon: <Users size={28} />, value: "15+", label: "Expert Stylists" },
  { icon: <Heart size={28} />, value: "5K+", label: "Happy Clients" },
  { icon: <Award size={28} />, value: "50+", label: "Awards Won" },
];

export default function AboutClient() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=85"
            alt="About Moments Salon"
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
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white"
          >
            About Us
          </motion.h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-secondary text-sm font-sans uppercase tracking-[0.2em]">
                Our Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold mt-3 mb-6">
                A Decade of{" "}
                <span className="text-primary italic">Beauty Excellence</span>
              </h2>
              <div className="space-y-4 text-text-light leading-relaxed">
                <p>
                  Moments Salon was born from a simple vision — to create a
                  sanctuary where beauty meets tranquility. Founded by Sophia
                  Williams, our salon has grown from a small boutique studio
                  into one of the most acclaimed beauty destinations.
                </p>
                <p>
                  Over the past decade, we have had the privilege of serving
                  thousands of clients, each leaving with not just a new
                  look, but a renewed sense of confidence and well-being.
                </p>
                <p>
                  Our philosophy is simple: every client is unique, and every
                  treatment should be tailored to their individual needs. We
                  combine time-honored techniques with the latest innovations
                  to deliver results that exceed expectations.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-[450px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560067174-c5a3a8f8e5f2?w=800&q=85"
                  alt="Salon interior"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-secondary text-white rounded-2xl p-6 shadow-lg hidden sm:block">
                <Quote size={32} className="mb-2 opacity-50" />
                <p className="text-sm italic max-w-[200px]">
                  Beauty is not just about appearance — it&apos;s about how
                  you feel.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                  {stat.icon}
                </div>
                <p className="text-3xl font-serif font-bold text-text">
                  {stat.value}
                </p>
                <p className="text-sm text-text-light">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Meet Our Team"
            subtitle="Expert Professionals"
          />
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group text-center"
              >
                <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden mb-5 shadow-md">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-serif font-semibold">
                  {member.name}
                </h3>
                <p className="text-secondary text-sm font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-text-light text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-secondary text-sm font-sans uppercase tracking-[0.2em]">
                Visit Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold mt-3 mb-6">
                Our <span className="text-primary italic">Location</span>
              </h2>
              <p className="text-text-light mb-8">
                Nestled in the heart of Beverly Hills, our salon offers a
                serene escape from the bustle of everyday life.
              </p>
              <div className="space-y-4 text-sm">
                <p className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mt-0.5 shrink-0">
                    📍
                  </span>
                  <span className="text-text-light">
                    {contactInfo.address}
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mt-0.5 shrink-0">
                    📞
                  </span>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mt-0.5 shrink-0">
                    ✉️
                  </span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-text-light hover:text-primary transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-[350px] rounded-2xl overflow-hidden shadow-lg"
            >
              <iframe
                src={contactInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Moments Salon Location"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
