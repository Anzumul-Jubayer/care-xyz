import About from "@/Components/Home/About";
import Banner from "@/Components/Home/Banner";
import ServicesOverview from "@/Components/Home/ServicesOverview";
import Testimonials from "@/Components/Home/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    <Banner/>
    <About/>
    <ServicesOverview/>
    <Testimonials/>
   </div>
  );
}
