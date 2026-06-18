import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Moments Salon's story, our expert team, and our mission to provide luxury beauty experiences in an elegant setting.",
};

export default function AboutPage() {
  return <AboutClient />;
}
