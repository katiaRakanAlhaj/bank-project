import BankEvents from "../../component/BankEvents/bankEvents";
import ContactInfo from "./contactInfo";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../loader/loader";
import useLoaderScroll from "../../hooks/useLoader";
import Flags from "../home/flags";
import i18next from "i18next";
import MetaHelmet from "../Helmet/helemt";
import Banner from "../imageBanner/imageBanner";
import ScrollToTop from "../ScrollToTop";
import { SiOpslevel } from "react-icons/si";

const Contact = () => {
  const { data: eventsData, isLoading: eventsDataLoading ,error:eventsDataError} =
    useFetchData("events");
        const {data:flagData , isLoading:flagDataLoading , error:flagDataError} = useFetchData('exchange-rate');
    
  const { data: homePageData, isLoading: homePageDataLoading , error:homePageDataError } =
    useFetchData("HomePage");
  const { data: accountData, isLoading: accountDataLoading , error:accountDataError} =
    useFetchData("Accounts");
  const { data: contactData, isLoading: contactDataLaoding , error:contactDataError } =
    useFetchData("ContactUsPage");
    const {data:countryData , error:countryDataError}= useFetchData("Country");
    const combinedLoading = eventsDataLoading || homePageDataLoading || accountDataLoading || contactDataLaoding ||flagDataLoading;
    useLoaderScroll(combinedLoading);
    if(combinedLoading){
      return(
        <Loader/>
      )
    }
    
    const hasError = eventsDataError || homePageDataError || accountDataError || contactDataError || flagDataError || countryDataError;
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
        
    const { meta_title, meta_description } = contactData?.data?.[0] || {}; // Use optional chaining to safely access the first item

  return (
    <div>
  <MetaHelmet title={meta_title} description={meta_description}/>
  <ScrollToTop/>
   {contactData?.data?.map((contact)=>(
    <Banner key={contact.id} bannerTitle={contact.banner_title} bannerImage={contact.banner_image}/>
   ))}
        <div className="grid grid-cols-12 items-center lg:mt-[-2rem] mt-[-1.9rem]">
       <div className="col-span-9">
       <div dir="ltr"
          style={{
            background: "linear-gradient(270deg ,#172B62 0.59%, #2F57C8 100.35%)",
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
      <div className="container mx-auto mt-[3rem]">
        <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-x-12">
          <div className="lg:col-span-8 md:col-span-8">
            <ContactInfo contactData={contactData} countryData={countryData} />
          </div>
          <div className="lg:col-span-4 md:col-span-4">
            <BankEvents
              eventsData={eventsData}
              homePageData={homePageData}
              accountData={accountData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
