import { useState } from "react";
import service1 from "../../assets/images/service1.png";
import service2 from "../../assets/images/service2.png";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import logo from "../../assets/images/logo1.png";
import booin from "../../assets/images/booin.png";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BankAccounts = ({ accountData, homePageData }) => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const handleButtonClick = (pageUrl) => {
    if (pageUrl) {
      navigate(`/account/${pageUrl}`);
    } else {
      console.error("No page_url found in the data.");
    }
  };

  const bankServices = [
    {
      title: "الخدمات المصرفية للشركات",
      description:
        "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم دولار سيت أميتلوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم دولار سيت أميت",
      img: service1,
    },
    {
      title: "الخدمات المصرفية للأفراد",
      description:
        "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم دولار سيت أميتلوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم دولار سيت أميت",
      img: booin,
    },
  ];
  const { t } = useTranslation();
  return (
    <div className="mt-[3rem]">
      <div className="grid lg:grid-cols-2 gap-y-4 relative">
        {accountData?.data?.map((account, index) => (
          <div
            key={account.id}
            className="w-[100%] h-[29.5rem] relative  flex justify-center items-center"
          >
            <img src={account.image} className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>

            <div
              className={`absolute top-[10rem]  ${
                i18next.language == "en" ? "lg:left-[5rem] left-[2.2rem]" : "lg:right-[5rem] right-[2.2rem]"
              }`}
            >
              <h1 className="lg:text-[1.8rem] text-[#FFFFFF] font-[700] line-clamp-1">
                {account.title}
              </h1>
              <p className="font-[400] lg:text-[1.2rem] lg:w-[70%] w-[100%] mt-[0.5rem] text-[#FFFFFF] line-clamp-5">
                {account.description}
              </p>
             {account.page_url &&(
               <div className="flex items-center mt-[1rem]">
               <button
                 onClick={() => handleButtonClick(account.page_url)} // Pass the page_url from the slide data
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
        <div className="hidden lg:block md:block absolute bg-gradient(180deg, rgba(0, 0, 0, 0) -91.19%, rgba(0, 0, 0, 0.6) 71.67%)"></div>
        {homePageData?.data?.map((homePage) => (
          <div className="hidden lg:block md:block absolute left-1/2 transform -translate-x-1/2 -bottom-14 w-[7rem] h-[7rem] bg-[#FFFFFF] rotate-[45deg]">
            <img className="-rotate-[45deg]" src={homePage.logo} alt="Logo" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankAccounts;
