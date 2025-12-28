import i18next from "i18next";
import BankDecsription from "../../component/home/bankDescription";
import BankNews from "../../component/home/bankNews";
import FAQ from "../../component/home/FAQ";
import Flags from "../../component/home/flags";
import GoogleMaps from "../../component/home/googleMaps";
import ImageHome from "../../component/home/imageHome";
import ServicesInHome from "../../component/home/servicesInHome";
import Loader from "../../component/loader/loader";
import useFetchData from "../../hooks/useFetchData";
import useLoaderScroll from "../../hooks/useLoader";
import BankAccounts from "../../component/home/bankAccount";
import MetaHelmet from "../../component/Helmet/helemt";
import SixthModels from "../../component/commonModel/sixthModels";
import ImageHomeMobile from "../../component/home/imageHomeMobile";
import useIsMobile from "../../hooks/useIsMobile";
import ScrollToTop from "../../component/ScrollToTop";
import { SiOpslevel } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa6";

const Home = () => {
  const isMobile = useIsMobile(); // You can adjust the breakpoint if needed

  const {
    data: homeData,
    isLoading: homeDataLoading,
    error: homeDataError,
  } = useFetchData("/Slider"); // Fetch data from API
  const {
    data: eventsData,
    isLoading: eventsDataLoading,
    error: eventsDataError,
  } = useFetchData("/events");
  const {
    data: servicesData,
    isLoading: servicesDataLoading,
    error: servicesDataError,
  } = useFetchData("/Services");
  const {
    data: faqData,
    isLoading: faqDataLoading,
    error: faqDataError,
  } = useFetchData("/Questions");
  const {
    data: homePageData,
    isLoading: homePageDataLoading,
    error: homePageDataError,
  } = useFetchData("/HomePage");
  const {
    data: accountData,
    isLoading: accountDataLoading,
    error: accountDataError,
  } = useFetchData("/Accounts");
  const {
    data: contactData,
    isLoading: contactDataLoading,
    error: contactDataError,
  } = useFetchData("/ContactUsPage");
  const {
    data: flagData,
    isLoading: flagDataLoading,
    error: flagDataError,
  } = useFetchData("exchange-rate");
  const { data: categoryData, error: categoryDataError } = useFetchData(
    "categories-with-pages-content"
  );
 
  const combinedLoading =
    homeDataLoading ||
    eventsDataLoading ||
    servicesDataLoading ||
    faqDataLoading ||
    homePageDataLoading ||
    accountDataLoading ||
    contactDataLoading ||
    flagDataLoading;
  useLoaderScroll(combinedLoading);
  if (combinedLoading) {
    return <Loader />;
  }
  const hasError =
  homeDataError ||
  eventsDataError ||
  servicesDataError ||
  faqDataError ||
  homePageDataError ||
  accountDataError ||
  contactDataError ||
  flagDataError ;
    const handleRetry = () => {
      window.location.reload();
    };
  
    if (hasError) {
      return (
        <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center text-center">
          <div>
              <p className="text-2xl font-bold text-[#333333]">
              <icon className="flex justify-center text-4xl mb-[1rem] text-primary">
                <SiOpslevel />
              </icon>
              Oops
              <br />
              The page you're looking for has some errors. Please try again
              <br/>
              <button 
                onClick={handleRetry}
                className="w-[5em] h-[3rem] bg-primary mt-[1rem] text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try again
              </button>
            </p>
          </div>
        </div>
      );
    }
  
  const { meta_title, meta_description } = homePageData?.data?.[0] || {}; // Use optional chaining to safely access the first item
  const whatsappNumber = ""; // Replace with your actual WhatsApp number
  const whatsappMessage = "Hello, I have a question about your services."; // Default message

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <MetaHelmet title={meta_title} description={meta_description} />
      
      <ScrollToTop />
      
      <div className="relative w-full">
        {isMobile ? (
          <ImageHomeMobile homeData={homeData} />
        ) : (
          <ImageHome homeData={homeData} />
        )}
      </div>
      <div className="grid grid-cols-12 items-center absolute z-10 lg:mt-[-2rem] mt-[-1.9rem]">
        <div className="col-span-9">
          <div
            dir="ltr"
            style={{
              background:
                "linear-gradient(270deg ,#172B62 0.59%, #2F57C8 100.35%)",
            }}
            className="h-[4rem] z-10 w-[100%]"
          >
            <Flags flagData={flagData} />
          </div>
        </div>
        <div className="col-span-3">
          <div
            className={`h-[2.8rem] z-10 w-[3rem] ${
              i18next.language == "ar" || i18next.language == "ku"
                ? "mr-[-1.5rem]"
                : "ml-[-1.5rem]"
            } rotate-[45deg] flex items-center justify-center bg-[#2B4FB5]`}
          ></div>
        </div>
      </div>
      <ServicesInHome servicesData={servicesData} homePageData={homePageData} />
      <BankDecsription homePageData={homePageData} />
      <BankNews
        categoryData={categoryData}
        eventsData={eventsData}
        homePageData={homePageData}
      />
      <BankAccounts homePageData={homePageData} accountData={accountData} />
      <FAQ faqData={faqData} homePageData={homePageData} />
      <GoogleMaps
        id="google-maps-section"
        contactData={contactData}
        homePageData={homePageData}
      />
      {/* <SixthModels/>       */}
    </div>
  );
};

export default Home;
