import Flags from "../../component/home/flags";
import i18next from "i18next";
import IbanInfo from "./IbanInfo";
import useFetchData from "../../hooks/useFetchData";
import useLoaderScroll from "../../hooks/useLoader";
import Loader from "../loader/loader";
import MetaHelmet from "../Helmet/helemt";
import logo from "../../assets/images/logo1.png"; // Adjust the path to your logo image
import logo2 from "../../assets/images/logologo 2.png";
import { Link } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import { SiOpslevel } from "react-icons/si";

const IBAN = () => {
  const { data: IbanData, isLoading: IbanDataLoading , error:IbanDataError} = useFetchData("Iban");
  const { data: eventsData, isLoading: eventsDataLoading , error:eventsDataError } =
    useFetchData("events");
  const { data: homePageData, isLoading: homePageDataLoading ,error:homePageDataError} =
    useFetchData("HomePage");
  const { data: accountData, isLoading: accountDataLoading , error:accountDataError } =
    useFetchData("Accounts");
  const { data: flagData, isLoading: flagDataLoading , error:flagDataError} =
    useFetchData("exchange-rate");
  const combinedLoading =
    IbanDataLoading ||
    eventsDataLoading ||
    accountDataLoading ||
    homePageDataLoading ||
    flagDataLoading;
  useLoaderScroll(combinedLoading);
  if (combinedLoading) {
    return <Loader />;
  }
  const handleRetry = () => {
    window.location.reload();
  };

  const hasError = IbanDataError || eventsDataError || accountDataError || homePageDataError || flagDataError;
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
  
  const bannerImage = IbanData?.data?.[0]?.banner_image || "";
  const bannerTitle = IbanData?.data?.[0]?.banner_title || "";
  const metaTitle = IbanData?.data?.[0]?.meta_title || "Default Title"; // Fallback title if not available
  const metaDescription =
    IbanData?.data?.[0]?.meta_description || "Default description";
  return (
    <div>
      <MetaHelmet title={metaTitle} description={metaDescription} />
      <ScrollToTop/>
      <div className="w-full h-[70svh] relative">
        <div
          className="absolute inset-0 bg-cover -z-10 transition-all duration-700"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(45, 84, 193, 0) 11.81%, rgba(29, 53, 121, 0.8) 80.27%), url(${bannerImage})`,
            backgroundPosition: "center",
          }}
        />
 
        <div className="flex flex-col justify-center items-start pt-[15rem] lg:px-[6rem] md:px-[4rem] px-[2rem] relative z-10 gap-y-2">
          <h1 className="text-[#FFFFFF] font-[700] text-[2rem] text-nowrap">
            {bannerTitle}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-12 items-center lg:mt-[-2rem] mt-[-1.9rem]">
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
      {/* Pass the fetched data as props to IbanInfo */}
      <IbanInfo
        eventsData={eventsData}
        homePageData={homePageData}
        accountData={accountData}
      />
    </div>
  );
};

export default IBAN;
