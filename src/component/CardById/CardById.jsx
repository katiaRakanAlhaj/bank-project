import React from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import Banner from "../imageBanner/imageBanner";
import BankEvents from "../BankEvents/bankEvents";
import useLoaderScroll from "../../hooks/useLoader";
import Loader from "../loader/loader";
import Flags from "../home/flags";
import i18next from "i18next";
import FirstModelCard from "./firstModelcard";
import SecondModelCard from "./secondModelCard";
import ThirdModelCard from "./thirdModelCard";
import FourthModelCard from "./fourthModelCard";
import FifthModelCard from "./fifthModelcard";
import TableCard from "./table";
import UploadFileCard from "./uploadFile";
import MetaHelmet from "../Helmet/helemt";
import SixthModelcard from "./sixthModelCard";
import ScrollToTop from "../ScrollToTop";
const CardById = () => {
  const { page_url } = useParams(); // Extract page_url from the URL path
  const { data: pageData, isLoading: pageDataLoading } = useFetchData(
    `card?page_url=${page_url}` // Use page_url from useParams
  );
  const { data: eventsData, isLoading: eventsDataLoading } =
    useFetchData("events");
  const { data: homePageData, isLoading: homePageDataLoading } =
    useFetchData("HomePage");
  const { data: accountData, isLoading: accountDataLoading } =
    useFetchData("Accounts");
  const { data: flagData, isLoading: flagDataLoading } =
    useFetchData("exchange-rate");

  const combinedLoading =
    pageDataLoading ||
    eventsDataLoading ||
    homePageDataLoading ||
    accountDataLoading ||
    flagDataLoading;
  useLoaderScroll(combinedLoading);

  if (combinedLoading) {
    return <Loader />;
  }

  // Function to render the appropriate model based on display_method
  const renderModel = (displayMethod) => {
    switch (displayMethod) {
      case 1:
        return <FirstModelCard pageData={pageData} />; // Use CommonModel
      case 2:
        return <SecondModelCard pageData={pageData} />;
      case 3:
        return <ThirdModelCard pageData={pageData} />;
      case 4:
        return <FourthModelCard pageData={pageData} />;
      case 5:
        return <FifthModelCard pageData={pageData} />;
        case 6:
          return <SixthModelcard pageData={pageData} />;
      default:
        return null; // Handle unexpected values
    }
  };
  let showUploadAndTable = true;
  const metaTitle = pageData?.page?.meta_title || "Default Title"; // Fallback title if not available
  const metaDescription =
    pageData?.page?.meta_description || "Default description"; // Fallback description
  return (
    <div>
      <MetaHelmet title={metaTitle} description={metaDescription} />
      <ScrollToTop/>
      <div>
        <Banner
          bannerTitle={pageData?.page?.banner_title}
          bannerImage={pageData?.page?.banner_image}
        />
        <div className="grid grid-cols-12 items-center lg:mt-[-2rem] mt-[-1.5rem]">
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
        {/* Render the appropriate model for each page item */}
        <div className="container mx-auto mt-[3rem]">
          <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-x-12">
            <div className="lg:col-span-8 md:col-span-8">
              {renderModel(pageData?.page?.display_method)}
              {showUploadAndTable && (
                <>
                  {pageData?.page?.file_section &&
                    pageData.page.file_section.length > 0 && (
                      <UploadFileCard pageData={pageData} />
                    )}
                  {pageData?.page?.table_section &&
                    pageData.page.table_section.trim() !== "" && (
                      <TableCard pageData={pageData} />
                    )}
                </>
              )}
            </div>

            <div className="lg:col-span-4 md:col-span-4">
              <BankEvents
                eventsData={eventsData}
                accountData={accountData}
                homePageData={homePageData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardById;
