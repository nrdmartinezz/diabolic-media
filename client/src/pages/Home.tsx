/* ============================================================
   DIABOLIC MEDIA — HOME PAGE
   Nocturnal Salon design system
   Sections: Navbar → Hero → Services → About → Work → Manifesto → Process → Contact → Footer
   ============================================================ */
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Manifesto from "@/components/Manifesto";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#181818", color: "#999578" }}
    >
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Work />
      <Manifesto />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
}
