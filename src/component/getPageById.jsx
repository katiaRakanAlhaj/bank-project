// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useFetchData from "../hooks/useFetchData";
// import SecondModel from "./commonModel/secondModel";
// import ThirdModel from "./commonModel/thirdModel";
// import useLoaderScroll from "../hooks/useLoader";
// import Loader from "./loader/loader";
// import TableTwo from "../component/TableTwo/TableTwo";
// import PersonalInfo from "./ElectronicServices/account";
// import UploadFileTwo from "./uploadFileTwo/uploadFileTwo";
// import Fuse from "fuse.js";
// import FourthModel from "./commonModel/fourthModel";
// import Report from "../component/Report/report";
// import BankEvents from "../component/BankEvents/bankEvents";
// import CustomerComplaitns from "../component/customerComplaints/customerComplaints";
// import FifthModel from "./commonModel/fifthModel";
// import News from "./News/News";
// import Flags from "./home/flags";
// import i18next from "i18next";
// import Partners from "./partners/partners";
// import Branches from "./branches/branches";
// import MetaHelmet from "./Helmet/helemt";
// import Banner from "./imageBanner/imageBanner";
// import CommonModel from "./commonModel/commonModel";
// import SixthModels from "./commonModel/sixthModels";
// import ScrollToTop from "./ScrollToTop";

// const GetPageById = () => {
//   const { page_url } = useParams();
//   const [currentPage, setCurrentPage] = useState(1);

//   const { data: pageData, isLoading: pageDataLoading } = useFetchData(
//     `category/page?page_url=${page_url}`
//   );
//   const { data: eventsData, isLoading: eventsDataLoading } =
//     useFetchData("events");
//   const { data: event, isLoading: eventLoading } = useFetchData(
//     `Events&News?page=${currentPage}`
//   );

//   const { data: homePageData, isLoading: homePageDataLoading } =
//     useFetchData("HomePage");
//   const { data: accountData, isLoading: accountDataLoading } =
//     useFetchData("Accounts");
//   const { data: flagData, isLoading: flagDataLoading } =
//     useFetchData("exchange-rate");
//   const { data: partnersData, isLoading: partnersDataLoading } =
//     useFetchData("our-partners");
//   const { data: branchData, isLoading: branchDataLoading } =
//     useFetchData("our-branches");

//   useEffect(() => {
//     console.log("Page ID changed:", page_url);
//   }, [page_url]);

//   const combinedLoading =
//     pageDataLoading ||
//     eventsDataLoading ||
//     homePageDataLoading ||
//     accountDataLoading ||
//     flagDataLoading ||
//     partnersDataLoading ||
//     eventLoading ||
//     branchDataLoading;

//   useLoaderScroll(combinedLoading);

//   // Define the target phrases
//   const targetPhrase = [
//     "فتح حساب افراد",
//     "Individual Account Opening",
//     "کردنەوەی ئەکاونتی کەسی",
//     "کردنەوەی هەژمار بۆ کەسی تاک",
//   ];
//   const reportTitles = [
//     "التقارير المالية والمصرفية",
//     "التقارير المالية",
//     "التقارير المالية الفصلية و السنوية",
//     "Financial Reports",
//     "Financial and Banking Reports",
//     "Quarterly and Annual Financial Reports",
//     "ڕاپۆرتەکانی دارایی ساڵانە و چارەکی",
//     "راپۆرتە مالییەکانى ساڵانە و مانگانە",
//     "ڕاپۆرتەکانی دارایی و بانکی",
//   ];
//   const companyPhrase = [
//     "فتح حساب الشركات",
//     "Company Account Opening",
//     "کردنەوەی هەژمار بۆ کۆمپانیاکان",
//   ];
//   const customerPhrase = [
//     "شكاوي العملاء",
//     "شکاوەکانی کڕیارەکان",
//     "Customer Complaints",
//   ];
//   const NewsPhrase = ["الأخبار", "News", "هەواڵ"];
//   const partnersPhrases = ["شركائنا", "Our Partners", "هاوپەیمانەکانمان"];
//   const branchesPhrases = ["فروعنا", "our branches", "شاخەکانمانن"];

//   // Configure Fuse.js for fuzzy matching
//   const fuseOptions = {
//     includeScore: true,
//     threshold: 0.4,
//   };
//   const fuseAccount = new Fuse(targetPhrase, fuseOptions);
//   const fuseReport = new Fuse(reportTitles, fuseOptions);
//   const fuseCompany = new Fuse(companyPhrase, fuseOptions);
//   const fuseCustpomer = new Fuse(customerPhrase, fuseOptions);
//   const fuseNews = new Fuse(NewsPhrase, fuseOptions);
//   const fusePartners = new Fuse(partnersPhrases, fuseOptions);
//   const fuseBranches = new Fuse(branchesPhrases, fuseOptions);

//   const isSimilarToTargetPhrase = (title) => {
//     const results = fuseAccount.search(title);
//     return results.length > 0 && results[0].score < 0.4;
//   };
//   const isSimilarToNewstPhrase = (title) => {
//     const results = fuseNews.search(title);
//     return results.length > 0 && results[0].score < 0.4;
//   };
//   const isSimilarToBranchesPhrase = (title) => {
//     const results = fuseBranches.search(title);
//     return results.length > 0 && results[0].score < 0.4;
//   };
//   const isSimilarToReportTitle = (title) => {
//     const results = fuseReport.search(title);
//     return results.length > 0 && results[0].score < 0.4;
//   };
//   const isSimilarToCompanyTitle = (title) => {
//     const results = fuseCompany.search(title);
//     return results.length > 0 && results[0].score < 0.4;
//   };
//   const isSimilarToCustomerTitle = (title) => {
//     const results = fuseCustpomer.search(title);
//     return results.length > 0 && results[0].score < 0.4;
//   };
//   // const isSimilarToPartnersTitle = (title) => {
//   //   const results = fusePartners.search(title);
//   //   return results.length > 0 && results[0].score < 0.4;
//   // };
//   const isSimilarToPartnersTitle = (title) => {
//     return partnersPhrases.includes(title);
//   };

//   if (combinedLoading) {
//     return <Loader />;
//   }

//   const metaTitle =
//     pageData?.category?.[0]?.pages?.[0]?.meta_title || "Default Title";
//   const metaDescription =
//     pageData?.category?.[0]?.pages?.[0]?.meta_description ||
//     "Default description";

//   // Check if we should show Branches or BankNews
//   const showBranches = isSimilarToBranchesPhrase(
//     pageData?.category[0]?.pages[0]?.banner_title
//   );
//   const showBankNews = isSimilarToNewstPhrase(
//     pageData?.category[0]?.pages[0]?.banner_title
//   );

//   // Don't show models/files/table for these special cases
//   const showMainContent = !showBranches && !showBankNews;

//   return (
//     <div>
//       <MetaHelmet title={metaTitle} description={metaDescription} />
//       <ScrollToTop/>
//       {pageData?.category?.map((category) => (
//         <div key={category.id}>
//           {category.pages.map((page) => (
//             <Banner key={page.id} bannerTitle={page.banner_title} bannerImage={page.banner_image}/>
//           ))}
//         </div>
//       ))}
//       <div className="grid grid-cols-12 items-center lg:mt-[-2rem] mt-[-1.9rem]">
//         <div className="col-span-9">
//           <div
//             dir="ltr"
//             style={{
//               background:
//                 "linear-gradient(270deg ,#172B62 0.59%, #2F57C8 100.35%)",
//             }}
//             className="h-[4rem] z-10 w-[100%]"
//           >
//             <Flags flagData={flagData} />
//           </div>
//         </div>
//         <div className="col-span-3">
//           <div
//             className={`h-[2.8rem] z-10 w-[3rem] ${
//               i18next.language == "ar" || i18next.language == "ku"
//                 ? "mr-[-1.5rem]"
//                 : "ml-[-1.5rem]"
//             } rotate-[45deg] flex items-center justify-center bg-[#2B4FB5]`}
//           ></div>
//         </div>
//       </div>

//       <div className="container mx-auto mt-[3rem]">
//         {showMainContent ? (
//           <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-x-12">
//             <div className="lg:col-span-8 md:col-span-8">
//               {pageData?.category?.map((category) =>
//                 category.pages.map((page) => {
//                   if (isSimilarToCustomerTitle(page.banner_title)) {
//                     return <CustomerComplaitns key={page.id} />;
//                   }
//                   if (isSimilarToPartnersTitle(page.banner_title)) {
//                     return (
//                       <Partners partnersData={partnersData} key={page.id} />
//                     );
//                   }
//                   if (
//                     isSimilarToTargetPhrase(page.banner_title) ||
//                     isSimilarToCompanyTitle(page.banner_title)
//                   ) {
//                     return <PersonalInfo key={page.id} />;
//                   }
//                   if (isSimilarToReportTitle(page.banner_title)) {
//                     return <Report key={page.id} />;
//                   }

//                   switch (page.display_method) {
//                     case 1:
//                       return <CommonModel pageData={pageData} dataKey="category" dataPage = "pages"/>
//                       // return <FirstModel key={page.id} pageData={pageData} />;
//                     case 2:
//                       return <SecondModel dataKey="category" pageData={pageData} dataPage="pages"/>;
//                     case 3:
//                       return <ThirdModel dataKey="category" pageData={pageData} dataPage = "pages"/>;
//                     case 4:
//                       return <FourthModel dataKey="category" pageData={pageData} dataPage = "pages"/>;
//                     case 5:
//                       return <FifthModel dataKey="category" pageData={pageData} dataPage = "pages"/>;
//                       case 6:
//                         return <SixthModels dataKey="category" pageData={pageData} dataPage = "pages"/>;
//                     default:
//                       return null;
//                   }
//                 })
//               )}

//               {pageData?.category?.some((category) =>
//                 category.pages.some(
//                   (page) => page.file_section && page.file_section.length > 0
//                 )
//               ) && <UploadFileTwo pageData={pageData} dataPage = "pages" dataKey="category"/>}

//               {pageData?.category?.some((category) =>
//                 category.pages.some(
//                   (page) =>
//                     page.table_section && page.table_section.trim() !== ""
//                 )
//               ) && <TableTwo pageData={pageData} dataKey="category" dataPage = "pages"/>}
//             </div>

//             <div className="lg:col-span-4 md:col-span-4">
//               <BankEvents
//                 eventsData={eventsData}
//                 homePageData={homePageData}
//                 accountData={accountData}
//               />
//             </div>
//           </div>
//         ) : null}

//         {showBankNews && (
//           <div className="col-span-12">
//             <News
//               event={event}
//               currentPage={currentPage}
//               setCurrentPage={setCurrentPage}
//             />
//           </div>
//         )}

//         {showBranches && (
//           <div className="col-span-12">
//             <Branches branchData={branchData} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GetPageById;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import SecondModel from "./commonModel/secondModel";
import ThirdModel from "./commonModel/thirdModel";
import useLoaderScroll from "../hooks/useLoader";

import Loader from "./loader/loader";
import TableTwo from "../component/TableTwo/TableTwo";
import PersonalInfo from "./ElectronicServices/account";
import UploadFileTwo from "./uploadFileTwo/uploadFileTwo";
import Fuse from "fuse.js";
import FourthModel from "./commonModel/fourthModel";
import Report from "../component/Report/report";
import BankEvents from "../component/BankEvents/bankEvents";
import CustomerComplaitns from "../component/customerComplaints/customerComplaints";
import FifthModel from "./commonModel/fifthModel";
import News from "./News/News";
import Flags from "./home/flags";
import i18next from "i18next";
import Partners from "./partners/partners";
import Branches from "./branches/branches";
import MetaHelmet from "./Helmet/helemt";
import Banner from "./imageBanner/imageBanner";
import CommonModel from "./commonModel/commonModel";
import SixthModels from "./commonModel/sixthModels";
import ScrollToTop from "./ScrollToTop";
import { SiOpslevel } from "react-icons/si";

const GetPageById = () => {
  const { page_url } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: pageData,
    isLoading: pageDataLoading,
    error: pageDataError,
  } = useFetchData(`category/page?page_url=${page_url}`);
  const {
    data: eventsData,
    isLoading: eventsDataLoading,
    error: eventsDataError,
  } = useFetchData("events");
  const {
    data: event,
    isLoading: eventLoading,
    error: eventError,
  } = useFetchData(`Events&News?page=${currentPage}`);

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
  const {
    data: flagData,
    isLoading: flagDataLoading,
    error: flagDataError,
  } = useFetchData("exchange-rate");
  const {
    data: partnersData,
    isLoading: partnersDataLoading,
    error: partnersDataError,
  } = useFetchData("our-partners");
  const {
    data: branchData,
    isLoading: branchDataLoading,
    error: branchDataError,
  } = useFetchData("our-branches");

  useEffect(() => {
    console.log("Page ID changed:", page_url);
  }, [page_url]);

  const combinedLoading =
    pageDataLoading ||
    eventsDataLoading ||
    homePageDataLoading ||
    accountDataLoading ||
    flagDataLoading ||
    partnersDataLoading ||
    eventLoading ||
    branchDataLoading;

  const hasError =
    pageDataError ||
    eventsDataError ||
    homePageDataError ||
    accountDataError ||
    flagDataError ||
    partnersDataError ||
    eventError ||
    branchDataError;

  useLoaderScroll(combinedLoading);

  // Define the target phrases
  const targetPhrase = [
    "فتح حساب افراد",
    "Individual Account Opening",
    "کردنەوەی ئەکاونتی کەسی",
    "کردنەوەی هەژمار بۆ کەسی تاک",
  ];
  const reportTitles = [
    "التقارير المالية والمصرفية",
    "التقارير المالية",
    "التقارير المالية الفصلية و السنوية",
    "Financial Reports",
    "Financial and Banking Reports",
    "Quarterly and Annual Financial Reports",
    "ڕاپۆرتەکانی دارایی ساڵانە و چارەکی",
    "راپۆرتە مالییەکانى ساڵانە و مانگانە",
    "ڕاپۆرتەکانی دارایی و بانکی",
  ];
  const companyPhrase = [
    "فتح حساب الشركات",
    "Company Account Opening",
    "کردنەوەی هەژمار بۆ کۆمپانیاکان",
  ];
  const customerPhrase = [
    "شكاوي العملاء",
    "شکاوەکانی کڕیارەکان",
    "Customer Complaints",
  ];
  const NewsPhrase = ["الأخبار", "News", "هەواڵ"];
  const partnersPhrases = ["شركائنا", "Our Partners", "هاوپەیمانەکانمان"];
  const branchesPhrases = ["فروعنا", "our branches", "شاخەکانمانن"];

  // Configure Fuse.js for fuzzy matching
  const fuseOptions = {
    includeScore: true,
    threshold: 0.4,
  };
  const fuseAccount = new Fuse(targetPhrase, fuseOptions);
  const fuseReport = new Fuse(reportTitles, fuseOptions);
  const fuseCompany = new Fuse(companyPhrase, fuseOptions);
  const fuseCustpomer = new Fuse(customerPhrase, fuseOptions);
  const fuseNews = new Fuse(NewsPhrase, fuseOptions);
  const fusePartners = new Fuse(partnersPhrases, fuseOptions);
  const fuseBranches = new Fuse(branchesPhrases, fuseOptions);

  const isSimilarToTargetPhrase = (title) => {
    if (!title) return false;
    const results = fuseAccount.search(title);
    return results.length > 0 && results[0].score < 0.4;
  };
  const isSimilarToNewstPhrase = (title) => {
    if (!title) return false;
    const results = fuseNews.search(title);
    return results.length > 0 && results[0].score < 0.4;
  };
  const isSimilarToBranchesPhrase = (title) => {
    if (!title) return false;
    const results = fuseBranches.search(title);
    return results.length > 0 && results[0].score < 0.4;
  };
  const isSimilarToReportTitle = (title) => {
    if (!title) return false;
    const results = fuseReport.search(title);
    return results.length > 0 && results[0].score < 0.4;
  };
  const isSimilarToCompanyTitle = (title) => {
    if (!title) return false;
    const results = fuseCompany.search(title);
    return results.length > 0 && results[0].score < 0.4;
  };
  const isSimilarToCustomerTitle = (title) => {
    if (!title) return false;
    const results = fuseCustpomer.search(title);
    return results.length > 0 && results[0].score < 0.4;
  };
  const isSimilarToPartnersTitle = (title) => {
    if (!title) return false;
    return partnersPhrases.includes(title);
  };

  if (combinedLoading) {
    return <Loader />;
  }
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

  const metaTitle =
    pageData?.category?.[0]?.pages?.[0]?.meta_title || "Default Title";
  const metaDescription =
    pageData?.category?.[0]?.pages?.[0]?.meta_description ||
    "Default description";

  // Check if we should show Branches or BankNews
  const showBranches = isSimilarToBranchesPhrase(
    pageData?.category?.[0]?.pages?.[0]?.banner_title
  );
  const showBankNews = isSimilarToNewstPhrase(
    pageData?.category?.[0]?.pages?.[0]?.banner_title
  );

  // Don't show models/files/table for these special cases
  const showMainContent = !showBranches && !showBankNews;

  return (
    <div>
      <MetaHelmet title={metaTitle} description={metaDescription} />
      <ScrollToTop />
      {pageData?.category?.map((category) => (
        <div key={category.id}>
          {category.pages?.map((page) => (
            <Banner
              key={page.id}
              bannerTitle={page.banner_title}
              bannerImage={page.banner_image}
            />
          ))}
        </div>
      ))}
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

      <div className="container mx-auto mt-[3rem]">
        {showMainContent ? (
          <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-x-12">
            <div className="lg:col-span-8 md:col-span-8">
              {pageData?.category?.map((category) =>
                category.pages?.map((page) => {
                  if (isSimilarToCustomerTitle(page?.banner_title)) {
                    return <CustomerComplaitns key={page.id} />;
                  }
                  if (isSimilarToPartnersTitle(page?.banner_title)) {
                    return (
                      <Partners partnersData={partnersData} key={page.id} />
                    );
                  }
                  if (
                    isSimilarToTargetPhrase(page?.banner_title) ||
                    isSimilarToCompanyTitle(page?.banner_title)
                  ) {
                    return <PersonalInfo key={page.id} />;
                  }
                  if (isSimilarToReportTitle(page?.banner_title)) {
                    return <Report key={page.id} />;
                  }

                  switch (page?.display_method) {
                    case 1:
                      return (
                        <CommonModel
                          pageData={pageData}
                          dataKey="category"
                          dataPage="pages"
                        />
                      );
                    case 2:
                      return (
                        <SecondModel
                          dataKey="category"
                          pageData={pageData}
                          dataPage="pages"
                        />
                      );
                    case 3:
                      return (
                        <ThirdModel
                          dataKey="category"
                          pageData={pageData}
                          dataPage="pages"
                        />
                      );
                    case 4:
                      return (
                        <FourthModel
                          dataKey="category"
                          pageData={pageData}
                          dataPage="pages"
                        />
                      );
                    case 5:
                      return (
                        <FifthModel
                          dataKey="category"
                          pageData={pageData}
                          dataPage="pages"
                        />
                      );
                    case 6:
                      return (
                        <SixthModels
                          dataKey="category"
                          pageData={pageData}
                          dataPage="pages"
                        />
                      );
                    default:
                      return null;
                  }
                })
              )}

              {pageData?.category?.some((category) =>
                category.pages?.some(
                  (page) => page?.file_section && page.file_section.length > 0
                )
              ) && (
                <UploadFileTwo
                  pageData={pageData}
                  dataPage="pages"
                  dataKey="category"
                />
              )}

              {pageData?.category?.some((category) =>
                category.pages?.some(
                  (page) =>
                    page?.table_section && page.table_section.trim() !== ""
                )
              ) && (
                <TableTwo
                  pageData={pageData}
                  dataKey="category"
                  dataPage="pages"
                />
              )}
            </div>

            <div className="lg:col-span-4 md:col-span-4">
              <BankEvents
                eventsData={eventsData}
                homePageData={homePageData}
                accountData={accountData}
              />
            </div>
          </div>
        ) : null}

        {showBankNews && (
          <div className="col-span-12">
            <News
              event={event}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}

        {showBranches && (
          <div className="col-span-12">
            <Branches branchData={branchData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GetPageById;
