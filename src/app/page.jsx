import About from "@/Components/Home/About";
import Banner from "@/Components/Home/Banner";
import ServicesOverview from "@/Components/Home/ServicesOverview";
import Testimonials from "@/Components/Home/Testimonials";
import WhyChooseUs from "@/Components/Home/WhyChooseUs";
import HowItWorks from "@/Components/Home/HowItWorks";
import Stats from "@/Components/Home/Stats";
import Image from "next/image";

export const metadata = {
  title: "Care.IO - Professional Home Care Services",
  description: "Care.IO provides professional home care services including baby care, elderly care, and sick care. Trusted by 10,000+ families with certified caregivers available 24/7.",
  keywords: ["home care", "baby care", "elderly care", "sick care", "professional caregivers", "healthcare services", "nursing services"],
  authors: [{ name: "Care.IO" }],
  openGraph: {
    title: "Care.IO - Professional Home Care Services",
    description: "Professional home care services with certified caregivers available 24/7. Quality care you can trust.",
    type: "website",
    url: "https://care-io.com",
    siteName: "Care.IO",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Care.IO Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Care.IO - Professional Home Care Services",
    description: "Professional home care services with certified caregivers available 24/7.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
   <div>
    <Banner/>
    <About/>
    <ServicesOverview/>
    <WhyChooseUs/>
    <HowItWorks/>
    <Stats/>
    <Testimonials/>
   </div>
  );
}
