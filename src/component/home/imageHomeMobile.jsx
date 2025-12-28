import { useState, useRef } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { EffectFade, Autoplay } from "swiper/modules"; // Import Swiper modules
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Link } from "react-router-dom"; // Import Link for navigation
import logo from "../../assets/images/logo1.png"; // Adjust the path to your logo image
import logo2 from "../../assets/images/logologo 2.png"; // Adjust the path to your logo image

const ImageHomeMobile = ({ homeData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const swiperRef = useRef(null); // Create a reference for the Swiper instance
  const { t } = useTranslation();
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle button click
  const handleButtonClick = (pageUrl) => {
    if (pageUrl) {
      navigate(`/slider/${pageUrl}`);
    } else {
      console.error("No page_url found in the data.");
    }
  };

  return (
    <div className="w-full h-[80vh] relative">
      <Swiper
        ref={swiperRef} // Attach the ref to the Swiper
        spaceBetween={30}
        modules={[EffectFade, Autoplay]} // Add Autoplay module here
        autoplay={{
          delay: 3000, // Delay in milliseconds
        }}
        pagination={{ clickable: true }}
        className="mySwiper h-[80vh]"
      >
        {homeData?.data?.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Background image with gradients */}
            <div
              className="absolute inset-0 bg-cover -z-10 transition-all duration-700"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(45, 84, 193, 0) 11.81%, rgba(29, 53, 121, 0.8) 80.27%), url(${slide?.image})`,
                backgroundPosition: "center",
              }}
            />
            {/* Logo positioned at the top right corner */}
            {/* <div className={`absolute top-2  ${i18next.language == "en"?'left-6':'right-6'}`}>
              <Link to="/">
                <img
                  className={`w-[4rem]`}
                  src={logo}
                  alt="Logo"
                />
              </Link>
              <Link to="/">
                <img
                  className={`w-[10rem]`}
                  src={logo2}
                  alt="Logo"
                />
              </Link>
            </div> */}
            <div className="flex flex-col justify-center items-start lg:pt-[17rem] md:pt-[15rem] pt-[9rem] lg:px-[6rem] md:px-[4rem] px-[2rem] relative z-10 gap-y-2">
              <div className="flex items-center justify-center gap-x-1">
                <div className="w-[2rem] h-[0.2rem] bg-[#57C82F]"></div>
                <h1 className="text-[#FFFFFF] font-[700] text-[1rem]">
                  {slide.title}
                </h1>
              </div>
              <h1 className="text-[#FFFFFF] font-[700] text-[1.5rem]">
                {slide.sub_title}
              </h1>
              {/* Description */}
              {slide.description && (
                <p className="lg:w-[30%] text-[#FFFFFF] font-[400] mb-[0.7rem] text-[1.5rem] line-clamp-3">
                  {slide.description}
                </p>
              )}
            </div>
            {/* Button with absolute positioning and responsive values */}
            {slide.page_url && ( // Check if page_url exists before rendering the button
              <div className={`absolute lg:top-[29rem] lg:bottom-2 ${i18next.language === "en" ? 'lg:left-[6rem] md:left-[4rem] left-[2rem]' : 'lg:right-[6rem] md:right-[4rem] right-[2rem]'}`}>
                <div className="flex items-center">
                  <button
                    className={`relative w-[11rem] h-[3rem] transition-all duration-500 ease-in-out text-white font-bold overflow-hidden bg-gradient-to-l from-[#2F57C8] to-[#172B62]`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => handleButtonClick(slide.page_url)} // Pass the page_url from the slide data
                  >
                    <span
                      className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                        isHovered ? "bg-secondary" : ""
                      } transform ${isHovered ? "scale-x-100" : "scale-x-0"} origin-left`}
                    ></span>
                    <p className={`relative z-10`}>{t("شاهد المزيد")}</p>
                  </button>
                  <div
                    className={`flex items-center justify-center transition-all duration-300 ease-linear ${
                      isHovered
                        ? "rotate-0 h-[3rem] w-[3rem] top-0 bg-gradient-to-l from-[#2F57C8] to-[#172B62]"
                        : "rotate-[-45deg] top-2"
                    } w-[2.1rem] h-[2.1rem] ${i18next.language === "en" ? 'ml-[-1.1rem]' : 'mr-[-1.1rem]'} bg-secondary`}
                  >
                    {i18next.language === "en" ? (
                      <FaArrowRightLong
                        className={`text-white ${isHovered ? "rotate-0" : "rotate-[45deg]"}`}
                      />
                    ) : (
                      <FaArrowLeftLong
                        className={`text-white ${isHovered ? "rotate-0" : "rotate-[45deg]"}`}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* Navigation Arrows Below the Button */}
            <div className={`absolute bottom-14 ${i18next.language === "en" ? 'left-8' : 'right-8'} flex flex-row gap-x-4 gap-y-8 z-10`}>
              <div
                className={`rounded-full bg-[#09090999]`}
                onClick={() => swiperRef.current.swiper.slidePrev()} // Navigate to the previous slide
              >
                <div className="w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center">
                  {i18next.language === "ar" || i18next.language === "ku" ? (
                    <FaArrowRightLong className="text-white lg:text-2xl" />
                  ) : (
                    <FaArrowLeftLong className="text-white lg:text-2xl" />
                  )}
                </div>
              </div>
              <div
                className={`rounded-full bg-[#09090999] transform cursor-pointer`}
                onClick={() => swiperRef.current.swiper.slideNext()} // Navigate to the next slide
              >
                <div className="w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center">
                  {i18next.language === "ar" || i18next.language === "ku" ? (
                    <FaArrowLeftLong className="text-white lg:text-2xl" />
                  ) : (
                    <FaArrowRightLong className="text-white lg:text-2xl" />
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageHomeMobile;
