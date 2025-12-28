import PersonalInfo from "../ElectronicServices/account";
import useFetchData from "../../hooks/useFetchData";
import { useSearchParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import BankEvents from "../../component/BankEvents/bankEvents";
const Account = () => {
    const [searchParams] = useSearchParams();
const pageId = searchParams.get("page_id");
const { data: eventsData , isLoading:eventsDataLoading } = useFetchData("events");
const { data: homePageData ,isLoading:homePageDataLoaidng} = useFetchData("HomePage");
const { data: accountData , isLoading:accountDataLoading } = useFetchData("Accounts");

const {
    data: pageData,isLoading:pageDataLoading
  } = useFetchData(`get-page?page_id=${pageId}`);
    useEffect(() => {
      console.log("Page ID changed:", pageId);
    }, [pageId]);
  return (
    <div>
      <div className="w-full h-[70svh] relative">
        {/* Background image with gradients */}
        <div
          className="absolute h-[100%] w-[100%] inset-0 bg-cover -z-10 transition-all duration-700"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(45, 84, 193, 0) 11.81%, rgba(29, 53, 121, 0.8) 80.27%), url()`,
            backgroundPosition: "center",
          }}
        />
        <div className="flex flex-col justify-center items-start pt-[15rem] lg:px-[6rem] md:px-[4rem] px-[2rem] relative z-10 gap-y-2">
          <h1 className="text-[#FFFFFF] font-[700] text-[2rem] text-nowrap"></h1>
        </div>
      </div>
      <div className="container mx-auto mt-[3rem]">
        <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-x-12">
          <div className="lg:col-span-8 md:col-span-8">
            <PersonalInfo />
          
            {/* <Document/> */}
          </div>
          <div className="lg:col-span-4 md:col-span-4">
            <BankEvents      eventsData={eventsData}
              homePageData={homePageData}
              accountData={accountData}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;
