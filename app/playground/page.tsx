import Navbar from "../components/Navbars";
import NavbarCostum from "../components/NavbarCostum"
import Footer from "../components/Footers";

export default function HomePage() {
  return (
    <div className="relative bg-white min-h-screen">

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <NavbarCostum />
        <Footer/>
      </div>
      {/* End Content */}
    </div>
  );
}
