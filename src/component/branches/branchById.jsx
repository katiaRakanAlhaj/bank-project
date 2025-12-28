import { Link, useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import BankEvents from "../BankEvents/bankEvents";
import useLoaderScroll from "../../hooks/useLoader";
import Loader from "../loader/loader";
import branch from "../../assets/images/IBAN.jpeg";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Flags from "../home/flags";
import logo from "../../assets/images/logo1.png"; // Adjust the path to your logo image
import logo2 from "../../assets/images/logologo 2.png";
import ScrollToTop from "../ScrollToTop";
const BranchById = () => {
  const {t} = useTranslation();

  const { id } = useParams();
  const { data: eventsData, isLoading: eventsDataLoading } =
    useFetchData("events");
    const {data:flagData , isLoading:flagDataLoading} = useFetchData('exchange-rate');

  const { data: homePageData, isLoading: homePageDataLoading } =
    useFetchData("HomePage");
  const { data: accountData, isLoading: accountDataLoading } =
    useFetchData("Accounts");
  const { data: branchByIdData, isLoading: BranchByIdDataLoading } =
    useFetchData(`branch?id=${id}`);
  const combinedLoading =
    eventsDataLoading ||
    homePageDataLoading ||
    accountDataLoading ||
    flagDataLoading||
    BranchByIdDataLoading;
  useLoaderScroll(combinedLoading);
  if (combinedLoading) {
    return <Loader />;
  }
  return (
    <div>
      <ScrollToTop/>
      <div className="w-full h-[70svh] relative">
        <div
          className="absolute h-[100%] w-[100%] inset-0 bg-cover -z-10 transition-all duration-700"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(45, 84, 193, 0) 11.81%, rgba(29, 53, 121, 0.8) 80.27%), url(${branch})`,
            backgroundPosition: "center",
          }}
        />
         
        <div className="flex flex-col justify-center items-start pt-[15rem] lg:px-[6rem] md:px-[4rem] px-[2rem] relative z-10 gap-y-2">
          <h1 className="text-[#FFFFFF] font-[700] text-[2rem] text-nowrap">
      {t('فروعنا')}
          </h1>
        </div>
      </div>
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
            <p className="text-[1.5rem] font-[700] text-primary mt-[1.5rem]">
              {" "}
              {branchByIdData?.data?.branch_name}
            </p>
            <p className="text-[#333333] text-[1.2rem] font-[700] mt-[0.6rem]">
              {t('مدير الفرع')}: <span className="font-[500]">{branchByIdData?.data?.branch_admin}</span>
            </p>
            <p className="text-[#333333] text-[1.2rem] font-[700] mt-[0.6rem]">
              {t('العنوان')}:
              <span className="font-[500]">
                {branchByIdData?.data?.address}
              </span>
            </p>
            <p className="mt-[2rem] text-[2rem] font-[700] text-[#333333]">
              {t('جولة في الفرع')}
            </p>
            <div className="grid lg:grid-cols-3 md:grid-col-2 grid-cols-1 mt-[1rem] gap-x-4 gap-y-4">
              {branchByIdData?.data?.images?.map((img) => (
                <img className="w-[100%] lg:h-[12rem] object-cover" src={img} />
              ))}
            </div>
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
export default BranchById;
