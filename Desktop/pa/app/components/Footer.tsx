import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { contactInfo, services } from "@/app/lib/data";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  const categories = [
    ...new Set(services.map((s) => s.category)),
  ];

  return (
    <footer className="bg-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-2xl font-serif font-bold tracking-wider text-white">
                Moments
              </span>
              <span className="text-xl font-serif font-light italic text-secondary">
                Salon
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Experience luxury beauty treatments in an elegant &apos;setting.
              Where every moment becomes a masterpiece.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-sans font-semibold uppercase tracking-widest text-secondary mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/deals", label: "Deals & Offers" },
                { href: "/gallery", label: "Gallery" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-secondary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-sans font-semibold uppercase tracking-widest text-secondary mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-secondary text-sm transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-sans font-semibold uppercase tracking-widest text-secondary mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-secondary mt-1 shrink-0" />
                <span className="text-gray-400 text-sm">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-secondary shrink-0" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-400 hover:text-secondary text-sm transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-secondary shrink-0" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-400 hover:text-secondary text-sm transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-secondary mt-1 shrink-0" />
                <div className="text-gray-400 text-sm">
                  {Object.entries(contactInfo.hours).map(([day, time]) => (
                    <span key={day} className="block">
                      <span className="text-white/70">{day}:</span> {time}
                    </span>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Moments Salon. All rights
            reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Designed with ✨ for beauty
          </p>
        </div>
      </div>
    </footer>
  );
}
