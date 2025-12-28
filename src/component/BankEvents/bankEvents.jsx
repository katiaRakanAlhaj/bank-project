import i18next, { t } from "i18next";
import { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const BankEvents = ({
  showCalculations = true,
  eventsData,
  homePageData,
  accountData,
}) => {
const navigate = useNavigate();
  const handleEventClick = (pageUrl) => {
    if (pageUrl) {
      navigate(`/event/${pageUrl}`);
    } else {
      console.error("No page_url found in the data.");
    }; 
  };
  const handleAccountClick = (pageUrl) => {
    if (pageUrl) {
      navigate(`/account/${pageUrl}`);
    } else {
      console.error("No page_url found in the data.");
    }; 
  };
    const [hoveredIndex, setHoveredIndex] = useState(null);
  
  return (
    <div>
      {homePageData?.data?.map((homeData) => (
        <div className="flex items-center justify-center text-center gap-x-2 mb-[1rem] lg:mt-[0] mt-[1.5rem]">
          <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
          <h1 className="text-[#333333] text-nowrap font-[700] lg:text-[1.8rem] text-[1.8rem] md:text-[1.2rem]">
            {homeData.event_title}
          </h1>
          <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
        </div>
      ))}

      {/* Render news from bankNews */}
      {eventsData?.data?.slice(0, 3).map((event, index) => (
        <div
          key={index}
          className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-2 items-center gap-x-4 mt-[1rem]"
        >
          <div
            onClick={() => handleEventClick(event.page_url)}
            className="w-[100%] h-[12rem]"
          >
            <img
              src={event.image}
              className="w-[100%] h-[100%] object-cover cursor-pointer"
              alt={`News Image ${index + 1}`}
            />
          </div>
          <div>
            <h1 className="text-wrap text-[#333333] lg:text-[1.2rem] font-[700] line-clamp-1">
              {event.title}
            </h1>
            <p className="font-[700] text-[1.2rem] text-[#333333]">{event.created_at.split("T")[0]}</p>
            <p className="text-[#333333] font-[400] text-[0.9rem] line-clamp-7">
              {event.description}
            </p>
          </div>
        </div>
      ))}

      {/* Conditionally render bank calculations */}
      {showCalculations && (
        <>
          <div className="flex items-center justify-center text-center gap-x-2 mt-[1rem]">
            <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
            <h1 className="text-[#333333] font-[700] text-[1.8rem]">
              {t("حسابات")}
            </h1>
            <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
          </div>
          {accountData?.data?.map((account, index) => (
          <div
            key={account.id}
            className="w-[100%] h-[29.5rem] relative  flex justify-center items-center mt-[2rem]"
          >
            <img src={account.image} className="w-full h-full object-cover " />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>

            <div
              className={`absolute top-[10rem] px-[2rem]`}
            >
              <h1 className="lg:text-[1rem] md:text-[0.8rem] text-[#FFFFFF] font-[700]">
                {account.title}
              </h1>
              <p className="font-[400] lg:text-[1rem] text-[0.8rem] md:text-[0.7rem] lg:w-[90%] flex text-justify w-[100%] mt-[0.5rem] text-[#FFFFFF] line-clamp-4">
                {account.description}
              </p>
             {account.page_url &&(
               <div className="flex items-center mt-[1rem]">
               <button
                 onClick={() => handleAccountClick(account.page_url)} // Pass the page_url from the slide data
                 className={`relative w-[11rem] h-[3rem] transition-all duration-500 ease-in-out text-white font-bold overflow-hidden bg-gradient-to-l from-[#2F57C8] to-[#172B62]`}
                 onMouseEnter={() => setHoveredIndex(index)}
                 onMouseLeave={() => setHoveredIndex(null)}
               >
                 <span
                   className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                     hoveredIndex === index ? "bg-secondary" : ""
                   } transform ${
                     hoveredIndex === index ? "scale-x-100" : "scale-x-0"
                   } origin-left`}
                 ></span>
                 <p className={`relative z-10`}>{t("شاهد المزيد")}</p>
               </button>
               <div
                 className={`flex items-center justify-center transition-all duration-300 ease-linear ${
                   hoveredIndex === index
                     ? "rotate-0 h-[3rem] w-[3rem] top-0 bg-gradient-to-l from-[#2F57C8] to-[#172B62]"
                     : "rotate-[-45deg] top-2"
                 } w-[2.1rem] h-[2.1rem]${
                   i18next.language == "en" ? " ml-[-1.1rem]" : " mr-[-1.1rem]"
                 } bg-secondary`}
               >
                 {i18next.language == "en" ? (
                   <FaArrowRightLong
                     className={`text-white ${
                       hoveredIndex === index ? "rotate-0" : "rotate-[45deg]"
                     }`}
                   />
                 ) : (
                   <FaArrowLeftLong
                     className={`text-white ${
                       hoveredIndex === index ? "rotate-0" : "rotate-[45deg]"
                     }`}
                   />
                 )}
               </div>
             </div>
             )}
            </div>
          </div>
        ))}
        </>
      )}
    </div>
  );
};

export default BankEvents;
