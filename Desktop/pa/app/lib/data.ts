// Static data for Moments Salon website

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  image: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  originalPrice: string;
  discountedPrice: string;
  category: string;
  image: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  image: string;
  service?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

// ---------- Services ----------

export const services: Service[] = [
  {
    id: "hair-cut-style",
    title: "Hair Cut & Style",
    description:
      "Precision haircut tailored to your face shape and lifestyle, finished with a professional blow-dry or styling.",
    price: "$65",
    duration: "60 min",
    category: "Hair",
    image:
      "https://images.unsplash.com/photo-1634302084212-5b1b50e1b66b?w=600&q=80",
  },
  {
    id: "hair-color",
    title: "Hair Color & Highlights",
    description:
      "Full color, balayage, ombré, or highlights using premium ammonia-free color for vibrant, healthy-looking hair.",
    price: "$120",
    duration: "120 min",
    category: "Hair",
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&q=80",
  },
  {
    id: "facial",
    title: "Luxury Facial",
    description:
      "Deep cleansing, exfoliation, extraction, and hydration facial tailored to your skin type using premium products.",
    price: "$85",
    duration: "75 min",
    category: "Skin",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
  },
  {
    id: "bridal-makeup",
    title: "Bridal Makeup",
    description:
      "Full bridal makeup application with trial session, using high-end products for a flawless, long-lasting look.",
    price: "$250",
    duration: "120 min",
    category: "Makeup",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
  },
  {
    id: "manicure-pedicure",
    title: "Manicure & Pedicure",
    description:
      "Complete nail care including shaping, cuticle care, exfoliation, massage, and your choice of polish.",
    price: "$75",
    duration: "90 min",
    category: "Nails",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
  },
  {
    id: "bridal-package",
    title: "Bridal Package",
    description:
      "Complete bridal package including hair, makeup, facial, and nails — everything you need for your special day.",
    price: "$550",
    duration: "Full Day",
    category: "Bridal",
    image:
      "https://images.unsplash.com/photo-1461748226814-9112a636f93b?w=600&q=80",
  },
  {
    id: "spa-therapy",
    title: "Spa Therapy",
    description:
      "Full body massage with aromatherapy oils, hot towels, and a relaxing ambiance to rejuvenate your senses.",
    price: "$110",
    duration: "90 min",
    category: "Spa",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=600&q=80",
  },
  {
    id: "keratin-treatment",
    title: "Keratin Treatment",
    description:
      "Professional keratin smoothing treatment to eliminate frizz and add shine for silky, manageable hair.",
    price: "$180",
    duration: "150 min",
    category: "Hair",
    image:
      "https://images.unsplash.com/photo-1560067174-c5a3a8f8e5f2?w=600&q=80",
  },
];

export const serviceCategories = [
  "Hair",
  "Skin",
  "Makeup",
  "Nails",
  "Bridal",
  "Spa",
];

// ---------- Deals ----------

export const deals: Deal[] = [
  {
    id: "bridal-glow",
    title: "Bridal Glow Package",
    description:
      "Get red carpet-ready with our complete bridal package including trial makeup, hairstyling, facial, and manicure.",
    originalPrice: "$450",
    discountedPrice: "$349",
    category: "Bridal",
    image:
      "https://images.unsplash.com/photo-1461748226814-9112a636f93b?w=600&q=80",
    badge: "Best Seller",
  },
  {
    id: "hair-transformation",
    title: "Hair Transformation",
    description:
      "Cut, color, and blow-dry combo. Transform your look with our expert stylists at an exclusive price.",
    originalPrice: "$250",
    discountedPrice: "$179",
    category: "Hair",
    image:
      "https://images.unsplash.com/photo-1560067174-c5a3a8f8e5f2?w=600&q=80",
    badge: "Save 28%",
  },
  {
    id: "glow-skin",
    title: "Glow Skin Ritual",
    description:
      "Luxury facial + microdermabrasion + hydrating mask. Reveal radiant, youthful skin.",
    originalPrice: "$200",
    discountedPrice: "$149",
    category: "Skin",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    badge: "Popular",
  },
  {
    id: "mani-pedi-combo",
    title: "Mani-Pedi Combo",
    description:
      "Classic manicure and pedicure with gel polish option. Walk out with perfect hands and feet.",
    originalPrice: "$100",
    discountedPrice: "$69",
    category: "Nails",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
    badge: "Weekend Special",
  },
  {
    id: "makeup-lesson",
    title: "Makeup Workshop",
    description:
      "One-on-one professional makeup lesson. Learn techniques and get a full makeup look.",
    originalPrice: "$150",
    discountedPrice: "$99",
    category: "Makeup",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
    badge: "Limited",
  },
  {
    id: "spa-escape",
    title: "Spa Escape Duo",
    description:
      "Full body massage + luxury facial + scalp treatment. The ultimate relaxation experience.",
    originalPrice: "$260",
    discountedPrice: "$199",
    category: "Spa",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=600&q=80",
    badge: "Best Value",
  },
];

export const dealCategories = [
  "Bridal",
  "Hair",
  "Skin",
  "Nails",
  "Makeup",
  "Spa",
];

// ---------- Testimonials ----------

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Johnson",
    text: "Absolutely stunning experience! The bridal makeup was flawless and lasted all day. I've never felt more beautiful. Moments Salon made my wedding day truly special.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    service: "Bridal Package",
  },
  {
    id: "t2",
    name: "Emily Davis",
    text: "The keratin treatment transformed my hair. It's so silky and smooth now. The salon ambiance is incredibly relaxing and the staff is so professional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    service: "Keratin Treatment",
  },
  {
    id: "t3",
    name: "Jessica Martinez",
    text: "I've been coming to Moments for over a year now and I've never been disappointed. The facials are amazing and my skin has never looked better!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&q=80",
    service: "Luxury Facial",
  },
  {
    id: "t4",
    name: "Amanda Lee",
    text: "Best haircut I've ever had! The stylist really listened to what I wanted and delivered beyond expectations. The attention to detail is remarkable.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    service: "Hair Cut & Style",
  },
  {
    id: "t5",
    name: "Rachel Kim",
    text: "The Spa Escape package is pure heaven. I walked out feeling like a new person. Worth every penny! Highly recommend for anyone needing some self-care.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    service: "Spa Escape Duo",
  },
];

// ---------- Gallery ----------

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1560067174-c5a3a8f8e5f2?w=600&q=80",
    alt: "Elegant hairstyle with blonde highlights",
    category: "Hair Styles",
    width: 600,
    height: 750,
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    alt: "Salon interior with modern decor",
    category: "Salon Interior",
    width: 600,
    height: 400,
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1634302084212-5b1b50e1b66b?w=600&q=80",
    alt: "Professional blow-dry styling",
    category: "Hair Styles",
    width: 600,
    height: 800,
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
    alt: "Bridal makeup look",
    category: "Bridal",
    width: 600,
    height: 600,
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    alt: "Luxury facial treatment",
    category: "Salon Interior",
    width: 600,
    height: 450,
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1461748226814-9112a636f93b?w=600&q=80",
    alt: "Bridal hair and makeup",
    category: "Bridal",
    width: 600,
    height: 700,
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80",
    alt: "Before and after haircut transformation",
    category: "Before/After",
    width: 600,
    height: 500,
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=600&q=80",
    alt: "Spa treatment room",
    category: "Salon Interior",
    width: 600,
    height: 400,
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
    alt: "Elegant nail art designs",
    category: "Before/After",
    width: 600,
    height: 650,
  },
  {
    id: "g10",
    src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&q=80",
    alt: "Hair color transformation",
    category: "Before/After",
    width: 600,
    height: 750,
  },
];

export const galleryCategories = [
  "All",
  "Hair Styles",
  "Bridal",
  "Before/After",
  "Salon Interior",
];

// ---------- Team ----------

export const team: TeamMember[] = [
  {
    id: "m1",
    name: "Sophia Williams",
    role: "Founder & Senior Stylist",
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&q=80",
    bio: "With over 15 years of experience, Sophia founded Moments Salon to create a space where luxury meets personalized beauty care.",
  },
  {
    id: "m2",
    name: "Isabella Chen",
    role: "Master Colorist",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80",
    bio: "Isabella specializes in balayage, highlights, and creative color techniques. Her passion is creating custom shades for every client.",
  },
  {
    id: "m3",
    name: "Olivia Patel",
    role: "Skincare Specialist",
    image:
      "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=400&q=80",
    bio: "Olivia is a licensed esthetician with expertise in advanced facial treatments and skin rejuvenation techniques.",
  },
  {
    id: "m4",
    name: "Mia Rodriguez",
    role: "Makeup Artist",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    bio: "Mia creates stunning bridal and event makeup looks. Her artistry has been featured in several bridal magazines.",
  },
];

// ---------- Contact ----------

export const contactInfo = {
  address: "123 Beauty Lane, Beverly Hills, CA 90210",
  phone: "+1 (310) 555-0123",
  email: "hello@momentssalon.com",
  hours: {
    "Mon–Fri": "9:00 AM – 7:00 PM",
    Saturday: "9:00 AM – 6:00 PM",
    Sunday: "10:00 AM – 5:00 PM",
  },
  whatsapp: "13105550123",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.935903295001!2d-118.40631982467675!3d34.05421952063362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc7e2b1c3d6b%3A0x8f8f8f8f8f8f8f8f!2sBeverly+Hills%2C+CA!5e0!3m2!1sen!2sus!4v1",
};
