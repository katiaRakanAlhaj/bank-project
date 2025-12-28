import React from "react";
import FAQContent from "./FAQContent";
import BankEvents from "../BankEvents/bankEvents";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../loader/loader";
import useLoaderScroll from "../../hooks/useLoader";
import { Helmet } from "react-helmet";
import logo from "../../assets/images/logo1.png";
import Flags from "../home/flags";
import i18next from "i18next";
import ScrollToTop from "../../component/ScrollToTop";
import { SiOpslevel } from "react-icons/si";

const MoreFAQ = () => {
  // const { id } = useParams();
  const { data: eventsData, isLoading: eventsDataLoading , error:eventDataError } =
    useFetchData("events");
    const {data:flagData , isLoading:flagDataLoading  ,error:flagDataError} = useFetchData('exchange-rate');

  const { data: homePageData, isLoading: homePageDataLoading , error:homePageDataError } =
    useFetchData("HomePage");
  const { data: accountData, isLoading: accountDataLoading , error:accountDataError } =
    useFetchData("Accounts");
  const { data: faqData, isLoading: questionDataLoading , error:faqDataError } =
    useFetchData("Questions");
  const { data: moreFaqData, isLoading: moreFaqDataLoading ,error:moreFaqDataError} = useFetchData(
    "MostRecentQuestionsPage"
  );
  // const { data: answerData } = useFetchData(`question-by-id?id=${id}`);
  const combinedLoading =
    eventsDataLoading ||
    homePageDataLoading ||
    accountDataLoading ||
    moreFaqDataLoading ||
    flagDataLoading || 
    questionDataLoading;
  useLoaderScroll(combinedLoading);
  const handleRetry = () => {
    window.location.reload();
  };

  const hasError = eventDataError || homePageDataError || accountDataError || moreFaqDataError || flagDataError || faqDataError;
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
    
  if (combinedLoading) {
    return <Loader />;
  }
  const { meta_title, meta_description } = moreFaqData?.data?.[0] || {}; // Use optional chaining to safely access the first item

  return (
    <div>
      <Helmet>
        <title>{meta_title}</title>
        <meta name="description" content={meta_description} />

        <link rel="icon" href={logo} type="image/png" />
      </Helmet>
      <ScrollToTop/>
      {moreFaqData?.data?.map((faq) => (
        <div className="w-full h-[70svh] relative" key={faq.id}>
          <div
            className="absolute h-[100%] w-[100%] inset-0 bg-cover -z-10 transition-all duration-700"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(45, 84, 193, 0) 11.81%, rgba(29, 53, 121, 0.8) 80.27%), url(${faq.banner_image})`,
              backgroundPosition: "center",
            }}
          />
          <div className="flex flex-col justify-center items-start pt-[15rem] lg:px-[6rem] md:px-[4rem] px-[2rem] relative z-10 gap-y-2">
            <h1 className="text-[#FFFFFF] font-[700] text-[2rem] text-nowrap">
              {faq.banner_title}
            </h1>
          </div>
        </div>
      ))}
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
      <div className="container mx-auto mt-[3rem]">
        <div className="grid grid-cols-12 gap-x-12">
          <div className="col-span-8">
            <FAQContent faqData={faqData} />
          </div>
          <div className="col-span-4">
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

export default MoreFAQ;
