import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore our range of premium beauty services including hair styling, coloring, skincare, makeup, nails, bridal packages, and spa treatments.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
