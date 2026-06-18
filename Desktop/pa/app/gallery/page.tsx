import { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse our gallery showcasing beautiful hair transformations, bridal looks, nail art, and the elegant Moments Salon interior.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
