import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import BankEvents from "../BankEvents/bankEvents";
import useLoaderScroll from "../../hooks/useLoader";
import Loader from "../loader/loader";
import CommonModel from "../commonModel/commonModel";
import SecondModel from "../commonModel/secondModel";
import ThirdModel from "../commonModel/thirdModel";
import FourthModel from "../commonModel/fourthModel";
import Flags from "../home/flags";
import i18next from "i18next";
import UploddFileTwo from "../uploadFileTwo/uploadFileTwo";
import TableTwo from "../TableTwo/TableTwo";
import FifthModel from "../commonModel/fifthModel";
import MetaHelmet from "../Helmet/helemt";
import Banner from "../imageBanner/imageBanner";
import SixthModels from "../commonModel/sixthModels";
import ScrollToTop from "../ScrollToTop";

const ServcieById = () => {
  const { page_url } = useParams(); // Extract page_url from the URL path
  const { data: pageData, isLoading: pageDataLoading } = useFetchData(
    `service?page_url=${page_url}` // Use page_url from useParams
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
  const renderModel = (displayMethod) => {
    switch (displayMethod) {
      case 1:
        return <CommonModel dataKey="service" pageData={pageData} dataPage="page" />;
      case 2:
        return <SecondModel dataKey="service" pageData={pageData} dataPage="page"/>;
      case 3:
        return <ThirdModel dataKey="service" pageData={pageData} dataPage="page" />;
      case 4:
        return <FourthModel dataKey="service" pageData={pageData} dataPage="page"/>;
        case 5:
          return <FifthModel dataKey="service" pageData={pageData} dataPage="page"/>;
          case 6:
            return <SixthModels dataKey="service" pageData={pageData} dataPage="page"/>;
      default:
        return null; // Handle unexpected values
    }
  };
  const metaTitle =
    pageData?.service?.[0]?.page?.[0]?.meta_title || "Default Title"; // Fallback title if not available
  const metaDescription =
    pageData?.service?.[0]?.page?.[0]?.meta_description ||
    "Default description"; // Fallback description
  let showUploadAndTable = true;
  return (
    <div>
    <MetaHelmet title={metaTitle} description={metaDescription}/>
    <ScrollToTop/>
      {pageData?.service?.map((serviceItem) =>
        serviceItem?.page?.map((pageItem) => (
          <div key={pageItem.id}>
     <Banner bannerTitle={pageItem.banner_title} bannerImage={pageItem.banner_image}/>
            <div className="grid grid-cols-12 items-center lg:mt-[-2rem] mt-[-1.5rem]">
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
            {/* Render the appropriate model for each page item */}
            <div className="container mx-auto mt-[3rem]">
              <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-x-12">
                <div className="lg:col-span-8 md:col-span-8">
                  {renderModel(pageItem.display_method)}
                  {showUploadAndTable && (
                    <>
                      {pageData?.service?.some((service) =>
                        service.page.some(
                          (page) =>
                            page.file_section && page.file_section.length > 0
                        )
                      ) && (
                        <UploddFileTwo dataKey="service" pageData={pageData} dataPage="page"/>
                      )}
                      {pageData?.service?.some((service) =>
                        service.page.some(
                          (page) =>
                            page.table_section &&
                            page.table_section.trim() !== ""
                        )
                      ) && <TableTwo dataKey="service" pageData={pageData} dataPage="page"/>}
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
        ))
      )}
    </div>
  );
};
export default ServcieById;
