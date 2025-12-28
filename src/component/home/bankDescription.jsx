import { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import line1 from "../../assets/images/line1.png";
import line2 from "../../assets/images/line2.png";
import numbers from "../../assets/images/numbers.png";
import silver from "../../assets/images/silver.png";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const BankDecsription = ({ homePageData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="w-full lg:h-[80vh] md:h-[140vh] h-[100vh] relative mt-[4rem]">
      {/* Background image with gradients */}
      {homePageData?.data?.map((homePage) => (
        <div
          key={homePage.id}
          className="absolute inset-0 object-cover  transition-all duration-700"
          style={{
            backgroundImage: `linear-gradient(20deg, #2F57C8 11.81%, rgba(29, 53, 121, 0.8) 80.27%),
                     url(${homePage.about_background_image})`,
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-y-56">
              <div key={homePage.id} className="relative mt-[2rem] px-[8rem]">
                <img
                  className="absolute w-[15rem] lg:block hidden"
                  src={line1}
                />
                <img
                  className="absolute top-[6.2rem] w-[16.4rem] right-[22.7rem] lg:block hidden"
                  src={line1}
                />
                <img
                  className={`absolute top-[1rem] lg:right-[6rem] right-0 lg:h-[19rem] lg:w-[16rem] w-[10rem] transition-transform duration-300 hover:scale-105`}
                  alt="Line 3"
                  src={homePage.about_images[0]}
                />
                <img
                  className={`absolute top-[7.3em] lg:right-[21rem] lg:h-[18.5rem] h-[10rem] lg:w-[17rem] w-[10rem] transition-transform duration-300 hover:scale-105`}
                  alt="Line 3"
                  src={homePage.about_images[1]}
                />
                <img
                  className="absolute top-[11.3rem] h-[10rem]  w-[15rem] right-[5rem] lg:block hidden"
                  src={line2}
                />
                <img
                  className="absolute top-[20.7rem] w-[15rem] right-[19.8rem] lg:block hidden"
                  src={line2}
                />
              </div>
              <div className="mt-[5rem]">
                <div className="flex items-center gap-x-1">
                  <div className="w-[2.2rem] h-[0.2rem] rounded-sm bg-secondary"></div>
                  <p className="font-[400] text-[1.2rem] text-[#FFFFFF]">
                    {" "}
                    {homePage?.about_title}
                  </p>
                </div>
                <h1 className="mt-[0.2rem] text-[#FFFFFF] text-[1.5rem] font-[700]">
                  {" "}
                  {homePage?.about_subtitle}
                </h1>
                <p className="lg:w-[100%] mt-[1rem] text-[#FFFFFF] text-[1rem] font-[400]">
                  {homePage.about_description}{" "}
                </p>
                <div>
                  {/* <div className="flex items-center mt-[1rem]">
                    <button
                      className={`relative w-[11rem] h-[3rem] transition-all duration-500 ease-in-out text-white font-bold overflow-hidden bg-gradient-to-l from-[#2F57C8] to-[#172B62]`}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <span
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                          isHovered ? "bg-secondary" : ""
                        } transform ${
                          isHovered ? "scale-x-100" : "scale-x-0"
                        } origin-left`}
                      ></span>
                      <p className={`relative z-10`}>{t("وافق الأن")}</p>
                    </button>
                    <div
                      className={`flex items-center justify-center transition-all duration-300 ease-linear ${
                        isHovered
                          ? "rotate-0 h-[3rem] w-[3rem] top-0 bg-gradient-to-l from-[#2F57C8] to-[#172B62]"
                          : "rotate-[-45deg] top-2"
                      } w-[2.1rem] h-[2.1rem] ${
                        i18next.language == "ar" || i18next.language == "ku"
                          ? "mr-[-1.1rem] "
                          : "ml-[-1.1rem] "
                      } bg-secondary`}
                    >
                      {i18next.language == "ar" || i18next.language == "ku" ? (
                        <FaArrowLeftLong
                          className={`text-white ${
                            isHovered ? "rotate-0" : "rotate-[45deg]"
                          }`}
                        />
                      ) : (
                        <FaArrowRightLong
                          className={`text-white ${
                            isHovered ? "rotate-0" : "rotate-[45deg]"
                          }`}
                        />
                      )}
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default BankDecsription;
