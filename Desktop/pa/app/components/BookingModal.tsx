"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Calendar } from "lucide-react";
import { services } from "@/app/lib/data";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        date: "",
        time: "",
        message: "",
      });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-muted">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-3">
                <Calendar className="text-secondary" size={24} />
                <div>
                  <h3 className="text-xl font-serif font-semibold">
                    Book Appointment
                  </h3>
                  <p className="text-sm text-text-light">
                    We&apos;ll confirm your booking shortly
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-light mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-accent/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-light mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone"
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-accent/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-light mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-muted-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-accent/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-light mb-1">
                  Service *
                </label>
                <select
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-muted-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-accent/50"
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title} — {s.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-light mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-accent/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-light mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-accent/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-light mb-1">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any special requests..."
                  className="w-full px-4 py-2.5 rounded-xl border border-muted-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-accent/50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 disabled:opacity-70"
              >
                {submitted ? "Booking Sent! ✨" : "Confirm Booking"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
