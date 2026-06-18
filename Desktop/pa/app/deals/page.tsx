import { Metadata } from "next";
import DealsClient from "./DealsClient";

export const metadata: Metadata = {
  title: "Deals & Offers",
  description:
    "Check out our exclusive deals and offers on bridal makeup, hair treatments, skincare, nails, and spa packages. Limited time savings at Moments Salon.",
};

export default function DealsPage() {
  return <DealsClient />;
}
