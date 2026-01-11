import { useState } from "react";
import i18next from "i18next";
import useFetchData from "../../hooks/useFetchData";
import useLoaderScroll from "../../hooks/useLoader";
import BankEvents from "../BankEvents/bankEvents";
import Flags from "../home/flags";
import Loader from "../loader/loader";
import MetaHelmet from "../Helmet/helemt";
import Banner from "../imageBanner/imageBanner";
import ScrollToTop from "../ScrollToTop";
import location from "../../assets/images/location.png";
import { SiOpslevel } from "react-icons/si";

const ATM = () => {
  const [activeTab, setActiveTab] = useState("atm"); // atm | pos

  const {
    data: ATMDataPage,
    isLoading: ATMDataPageLoading,
    error: ATMDataPageError,
  } = useFetchData("atm-and-pos-address-page");

  const {
    data: ATMData,
    isLoading: ATMDataLoading,
    error: ATMDataError,
  } = useFetchData("atm-and-pos-addresses");

  const {
    data: flagData,
    isLoading: flagDataLoading,
    error: flagDataError,
  } = useFetchData("exchange-rate");

  const {
    data: eventsData,
    isLoading: eventsDataLoading,
    error: eventDataError,
  } = useFetchData("events");

  const {
    data: homePageData,
    isLoading: homePageDataLoading,
    error: homePageDataError,
  } = useFetchData("HomePage");

  const {
    data: accountData,
    isLoading: accountDataLoading,
    error: accountDataError,
  } = useFetchData("Accounts");

  const combinedLoading =
    ATMDataPageLoading ||
    ATMDataLoading ||
    eventsDataLoading ||
    homePageDataLoading ||
    accountDataLoading ||
    flagDataLoading;

  useLoaderScroll(combinedLoading);

  if (combinedLoading) {
    return <Loader />;
  }

  const hasError =
    ATMDataPageError ||
    ATMDataError ||
    eventDataError ||
    homePageDataError ||
    accountDataError ||
    flagDataError;

  const handleRetry = () => {
    window.location.reload();
  };

  if (hasError) {
    return (
      <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center text-center">
        <div>
          <div className="flex justify-center text-4xl mb-4 text-primary">
            <SiOpslevel />
          </div>
          <p className="text-2xl font-bold text-[#333333]">
            Oops
            <br />
            The page you're looking for has some errors.
            <br />
            <button
              onClick={handleRetry}
              className="w-[8rem] h-[3rem] bg-primary mt-4 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  const metaTitle = ATMDataPage?.data?.meta_title;
  const metaDescription = ATMDataPage?.data?.meta_description;

  const handleLocationClick = (locationUrl) => {
    if (locationUrl) {
      window.open(locationUrl, "_blank");
    }
  };

  // 🔥 Filter ATM / POS
  const filteredData = ATMData?.data?.filter(
    (item) => item.type === activeTab
  );

  return (
    <div>
      <MetaHelmet title={metaTitle} description={metaDescription} />
      <ScrollToTop />

      <Banner
        bannerTitle={ATMDataPage?.data?.title}
        bannerImage={ATMDataPage?.data?.banner}
      />

      {/* Flags Section */}
      <div className="grid grid-cols-12 items-center lg:mt-[-2rem] mt-[-1.9rem]">
        <div className="col-span-9">
          <div
            dir="ltr"
            style={{
              background:
                "linear-gradient(270deg ,#172B62 0.59%, #2F57C8 100.35%)",
            }}
            className="h-[4rem] z-10 w-full"
          >
            <Flags flagData={flagData} />
          </div>
        </div>
        <div className="col-span-3">
          <div
            className={`h-[2.8rem] z-10 w-[3rem] ${i18next.language === "ar" || i18next.language === "ku"
              ? "mr-[-1.5rem]"
              : "ml-[-1.5rem]"
              } rotate-[45deg] flex items-center justify-center bg-[#2B4FB5]`}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto mt-[3rem]">
        <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-x-12">
          {/* Left */}
          <div className="lg:col-span-8 md:col-span-8">
            {/* Tabs */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab("atm")}
                className={`w-[10rem] h-[3rem] border cursor-pointer text-[1.5rem]
  flex justify-center items-center  border-[#333333]
  transition-all
  ${activeTab === "atm"
                    ? "bg-primary text-white font-bold"
                    : "bg-white text-[#333333] font-[400]"
                  }`}
              >
                ATM
              </button>

              <button
                onClick={() => setActiveTab("pos")}
                className={`w-[10rem] h-[3rem] border cursor-pointer text-[1.5rem]
  flex justify-center items-center  border-[#333333]
  transition-all
  ${activeTab === "pos"
                    ? "bg-primary text-white font-bold"
                    : "bg-white text-[#333333] font-[400]"
                  }`}
              >
                POS
              </button>

            </div>

            <p className="text-[#333333] font-[700] text-[1.2rem] mt-[1rem]">
              {ATMDataPage?.data?.description}
            </p>

            {/* List */}
            {filteredData?.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 mt-[2rem] gap-y-2 text-[#333333] text-[1.2rem]"
              >
                <div className="col-span-4">
                  <p>{item.name}</p>
                </div>

                <div className="col-span-6">
                  <p>{item.address}</p>
                </div>

                <div className="col-span-2 w-[3rem] flex items-center justify-center h-[3rem] bg-primary rounded-full">
                  <div onClick={() => handleLocationClick(item.location)}>
                    <img
                      src={location}
                      alt="location"
                      className="w-[2rem] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right */}
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

export default ATM;
