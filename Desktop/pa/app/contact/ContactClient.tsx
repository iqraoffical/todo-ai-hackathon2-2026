"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";
import { contactInfo } from "@/app/lib/data";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1920&q=85"
            alt="Contact us"
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
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/70 mt-4 max-w-lg mx-auto"
          >
            We&apos;d love to hear from you. Reach out for appointments,
            inquiries, or just to say hello.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-2">
                Send Us a Message
              </h2>
              <p className="text-text-light mb-8">
                Fill out the form and we&apos;ll get back to you within 24
                hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-8 text-center shadow-sm"
                >
                  <CheckCircle
                    size={48}
                    className="text-secondary mx-auto mb-4"
                  />
                  <h3 className="text-xl font-serif font-semibold mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-text-light">
                    Thank you for reaching out. We&apos;ll respond shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-text-light mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-muted-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-light mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-muted-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-light mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-muted-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-light mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-muted-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-secondary hover:bg-secondary-dark text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-secondary/30"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-serif font-semibold mb-6">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Address</p>
                      <p className="text-text-light text-sm">
                        {contactInfo.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Phone</p>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-text-light text-sm hover:text-primary transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Email</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-text-light text-sm hover:text-primary transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Business Hours</p>
                      <div className="text-text-light text-sm space-y-1 mt-1">
                        {Object.entries(contactInfo.hours).map(
                          ([day, time]) => (
                            <div key={day} className="flex justify-between gap-6">
                              <span className="font-medium">{day}</span>
                              <span>{time}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-[#25D366]/10 rounded-2xl p-6 border border-[#25D366]/20">
                <p className="font-serif font-semibold mb-2">
                  Prefer WhatsApp?
                </p>
                <p className="text-text-light text-sm mb-4">
                  Chat with us instantly on WhatsApp for quick inquiries and
                  bookings.
                </p>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-full text-sm font-medium hover:bg-[#1DA851] transition-colors"
                >
                  <Phone size={16} />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 h-[400px] rounded-2xl overflow-hidden shadow-md"
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
      </section>
    </>
  );
}
