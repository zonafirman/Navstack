import Navbar from "./components/Navbars";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import ScrollCue from "./components/ScrollCue";
import About from "./components/About";
import StatsSection from "./components/StatsSection";
import TestimonialSection from "./components/TestimonialSection";
import NavbarView from "./components/NavbarView";
import Footer from "./components/Footers";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Showcase />
        <About />
        <StatsSection />
        <TestimonialSection />
        <NavbarView />
        <Footer />
      </div>

      {/* Scroll cue tetap global */}
      <ScrollCue />
    </div>
  );
}
