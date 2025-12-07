import Navbar from "../components/Navbars";
import HeroTemplate from "../components/HeroTamplate";
import NavbarStack from "../components/NavbarStack";
import Footer from "../components/Footers";

export default function HomePage() {
  return (
    <div className="relative bg-white min-h-screen">
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroTemplate />
        <NavbarStack />
        <Footer/>
      </div>
    </div>
  );
}
