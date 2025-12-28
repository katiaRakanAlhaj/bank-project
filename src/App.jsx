import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Wrapper from "./wrapper/wrapper";
import Home from "./pages/Home/Home";
import Contact from "./component/contact/contact";
import MoreFAQ from "./component/FAQ/MoreFAQ";
import { useState, useEffect } from "react"; // Add useEffect
import { MyContext } from "./component/store/store";
import i18n from "./i18n";
import GetPageById from "./component/getPageById";
import Account from "./component/Account/account";
import SliderById from "./component/sliderById/silderById";
import NewsById from "./component/NewsById/NewsById";
import AccountById from "./component/AccountById/AccountById";
import ServcieById from "./component/serviceById/ServiceById";
import CardById from "./component/CardById/CardById";
import BranchById from "./component/branches/branchById";
import ATM from "./component/ATM/ATM";
import IBAN from "./component/IBAN/IBAN";
import { FaWhatsapp } from "react-icons/fa6";
import useFetchData from "./hooks/useFetchData";

function App() {
  const [language, setLanguage] = useState('ar');
  const { data: contactData } = useFetchData('ContactUsPage');
  const [whatsappNumber, setWhatsappNumber] = useState(''); // State for WhatsApp number

  // Update WhatsApp number when contactData changes
  useEffect(() => {
    if (contactData?.data?.length > 0) {
      // Extract phone number and clean it (remove any non-numeric characters)
      const phone = contactData.data[0].phone_number.replace(/\D/g, '');
      setWhatsappNumber(phone);
    }
  }, [contactData]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Wrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/IBAN" element={<IBAN />} />
          <Route path="/moreFaq" element={<MoreFAQ />} />
          <Route path="/category/page/:page_url" element={<GetPageById />} />
          <Route path="/slider/:page_url" element={<SliderById />} />
          <Route path="/event/:page_url" element={<NewsById />} />
          <Route path="/account/:page_url" element={<AccountById />} />
          <Route path="/service/:page_url" element={<ServcieById />} />
          <Route path="/card/:page_url" element={<CardById />} />
          <Route path="/branch/:id" element={<BranchById />} />
          <Route path="ATM" element={<ATM />} />
        </Route>
      </Route>
    )
  );

  const fontFamily = (language === 'ar') ? 'Cairo' : (language === 'ku' ? 'Droid Kufi' : 'Roboto');
  const whatsappMessage = "Hello, I have a question about your services.";

  const handleWhatsAppClick = () => {
    if (!whatsappNumber) return; // Don't proceed if number isn't loaded
    
    // Construct WhatsApp URL
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open directly in the same tab
    window.location.href = url;
  };

  return (
    <div style={{ fontFamily }} dir={i18n.language === "ar" || i18n.language === "ku" ? "rtl" : "ltr"}>
      {whatsappNumber && (
        <div 
          className="fixed bottom-24 right-2 z-50 cursor-pointer"
          onClick={handleWhatsAppClick}
        >
          <div className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors">
            <FaWhatsapp size={32} />
          </div>
        </div>
      )}
      <MyContext.Provider
        value={{
          language,
          setLanguage,
        }}
      >
        <RouterProvider router={router} />
      </MyContext.Provider>
    </div>
  );
}

export default App;