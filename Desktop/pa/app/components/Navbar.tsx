"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/deals", label: "Deals" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className={`text-2xl sm:text-3xl font-serif font-bold tracking-wider transition-colors ${
                scrolled ? "text-text" : "text-white"
              }`}
            >
              Moments
            </span>
            <span
              className={`text-xl sm:text-2xl font-serif font-light italic transition-colors ${
                scrolled ? "text-secondary" : "text-secondary"
              }`}
            >
              Salon
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-300 group ${
                  scrolled
                    ? "text-text hover:text-primary"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                      scrolled ? "bg-primary" : "bg-secondary"
                    }`}
                  />
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-secondary hover:bg-secondary-dark text-white text-sm font-medium tracking-wide uppercase rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-full transition-colors ${
              scrolled
                ? "text-text hover:bg-muted"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-muted overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium uppercase tracking-wide transition-colors ${
                    pathname === link.href
                      ? "text-primary bg-muted"
                      : "text-text hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block mt-4 px-6 py-3 bg-secondary hover:bg-secondary-dark text-white text-sm font-medium tracking-wide uppercase rounded-full text-center transition-all"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
