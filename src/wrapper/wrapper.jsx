import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../component/footer/footer";
import NavbarMobile from "../Navbar/NavbarMobile";
import useFetchData from "../hooks/useFetchData";
import ScrollToTop from "../component/ScrollToTop";

function Wrapper() {
  const { data: contactData , isLoading:contactDataLoading } = useFetchData("/ContactUsPage");
  const { data: footerData , isLoading:footerDataLoading } = useFetchData("/Footer");
  const combinedLoading = contactDataLoading || footerDataLoading;
  return (
    <div className="size-full relative">
      <ScrollToTop />
      <div className="hidden lg:flex">
        <Navbar />
      </div>
      <div className="lg:hidden">
        <NavbarMobile />
      </div>
      <Outlet />
      {!combinedLoading && (
      <div className="footer-transition">
        <Footer contactData={contactData} footerData={footerData} />
      </div>
    )}
    </div>
  );
}
export default Wrapper;
