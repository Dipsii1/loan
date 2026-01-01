import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import Footer from "@/components/Footer";
import LogoLoop from "@/components/LogoLoop";
import CallToAction from "@/components/CallAction";
import GradientBackground from "@/components/Background";

// import icons dari react-icons
// import {
//   SiReact,
//   SiNextdotjs,
//   SiTypescript,
//   SiTailwindcss,
// } from "react-icons/si";

// daftar logo teknologi
const techLogos = [

  {
    node: <img src="/Mofi.png" alt="MOFI" className="h-18" />,
    title: "MOFI",
  },
   {
    node: <img src="/CIMB-Niaga.svg" alt="CIMB Niaga" className="h-10" />,
    title: "CIMB Niaga",
  },
   {
    node: <img src="/kb-bank.png" alt="KB Bank" className="h-10" />,
    title: "KB Bank",
  },
  {
    node: <img src="/bss-sampoerna.png" alt="BSS Sampoerna" className="h-14" />,
    title: "BSS Sampoerna",
  },
  {
    node: <img src="/bpr.png" alt="BPR" className="h-18" />,
    title: "BPR",
  },
  {
    node: <img src="/bank-dki.png" alt="Bank DKI" className="h-9" />,
    title: "Bank DKI",
  },
  {
    node: <img src="/mandiri-taspen.png" alt="Mandiri Taspen" className="h-18" />,
    title: "Mandiri Taspen",
  },
  {
    node: <img src="/kredit-plus.webp" alt="Kredit Plus" className="h-12" />,
    title: "Kredit Plus",
  },
];

export default function LandingPage() {
  return (
    <>
    {/* <GradientBackground/> */}
    <Navbar />
    <Hero />
    <div className="relative h-[200px] overflow-hidden">
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            width="100%"
            gap={40}
            pauseOnHover={false}
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
          />
        </div>
    <ProductSection />
    <CallToAction />
    <Footer />
    </>
  );
}
