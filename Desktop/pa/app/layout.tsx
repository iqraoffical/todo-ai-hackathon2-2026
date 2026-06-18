import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppButton from "@/app/components/WhatsAppButton";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Moments Salon | Luxury Beauty & Hair Salon",
    template: "%s | Moments Salon",
  },
  description:
    "Experience luxury beauty treatments at Moments Salon. Expert hair styling, skincare, makeup, nails and bridal services in an elegant setting.",
  keywords: [
    "beauty salon",
    "hair salon",
    "luxury salon",
    "bridal makeup",
    "skincare",
    "nails",
    "Moments Salon",
  ],
  openGraph: {
    title: "Moments Salon | Luxury Beauty & Hair Salon",
    description:
      "Experience luxury beauty treatments at Moments Salon. Expert hair styling, skincare, makeup, nails and bridal services.",
    type: "website",
    locale: "en_US",
    siteName: "Moments Salon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
