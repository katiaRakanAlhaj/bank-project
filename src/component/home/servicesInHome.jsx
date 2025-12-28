import React, { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useNavigate } from "react-router-dom";
import wifi from "../../assets/images/wifi.png";
const ServicesInHome = ({ homePageData, servicesData }) => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null); // State to track which card is hovered
  const [isHovered, setIsHovered] = useState(false); // State to track hover status

  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleButtonClick = (pageUrl) => {
    if (pageUrl) {
      navigate(`/service/${pageUrl}`);
    } else {
      console.error("No page_url found in the data.");
    }
  };

  // Function to split servicesData into chunks of 4 cards each
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };
  // Split servicesData into chunks of 4
  const cardChunks = chunkArray(servicesData?.data || [], 4);
  const arrowClass = i18next.language === "en" ? "arrow3" : "arrow";
  const paragClass = i18next.language == "en" ? "parag3" : "parag";
  // Function to render cards dynamically from servicesData
  const renderCards = (cards) => {
    return cards.map((service, index) => (
      <div
        onMouseEnter={() => setHoveredCardIndex(index)} // Set hovered card index
        onMouseLeave={() => setHoveredCardIndex(null)} // Reset hovered card index
        key={service.id}
        className="box group relative flex flex-col px-[1.8rem] py-[2rem] transition-all duration-500"
      >
        {/* Image */}
        <img
          className="z-10 w-[40%] transition-transform duration-300 ease-in transform group-hover:scale-110"
          src={
            hoveredCardIndex === index ? service.pre_image : service.post_image
          } // Swap images on hover
          alt={service.title}
        />
        {/* Title */}
        <h1 className="z-10 font-[700] text-[1.1rem] text-[#333333] transition-all duration-500 group-hover:text-white mt-[0.5rem]">
          {service.title}
        </h1>
        {/* Description */}
        <p className="relative z-10 text-[1rem] text-[#333333] font-[400] transition-colors duration-500 group-hover:text-white">
          {truncateText(service.description, 20)}{" "}
          {/* Truncate description to 15 words */}
        </p>
        {/* Icon and Text */}
        <div className="flex gap-x-4 mt-[0.5rem] items-center z-10">
          <img
            className="z-10 w-[1rem] h-[1rem] transition-transform duration-300 ease-in transform group-hover:scale-110"
            src={hoveredCardIndex === index ? service.pre_icon : service.icon} // Swap images on hover
          />
          <p className="text-primary font-[700] text-[0.8rem] transition-colors duration-500 group-hover:text-white">
            {service.text_icon}
          </p>
        </div>
        {/* Button */}
        {service.page_url && (
          <button
            onClick={() => handleButtonClick(service.page_url)} // Pass the page_url from the slide data
            className={`relative button group mt-[1rem] lg:w-[17rem]  h-[3.5rem] text-[#FFFFCC] gap-x-2 flex justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              i18next.language === "en" ? "lang-en" : ""
            }`}
          >
            <div className="flex absolute gap-x-2 items-center">
              <p className={`text-white ${paragClass} font-[700] text-[1rem]`}>
                {t("شاهد المزيد")}
              </p>
              {i18next.language == "en" ? (
                <FaArrowRightLong className={`text-[1.2rem] ${arrowClass}`} />
              ) : (
                <FaArrowLeftLong className={`text-[1.2rem] ${arrowClass}`} />
              )}
            </div>
          </button>
        )}
      </div>
    ));
  };
  return (
    <div className="relative">
      <div className="mt-[3rem] container mx-auto lg:h-[70vh]">
        {/* Render home page data */}
        {homePageData?.data?.map((homePage) => (
          <>
            <div className="flex items-center justify-center text-center gap-x-2">
              <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
              <h1 className="text-[#333333] font-[700] text-[1.8rem]">
                {homePage.services_title}
              </h1>
              <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
            </div>
            <h1 className="text-[#333333] text-center font-[400] text-[1.1rem] mt-[0.5rem] mb-[2rem]">
              {homePage.services_description}
            </h1>
          </>
        ))}
        {/* Swiper with dynamic slides */}
        <Swiper className="lg:overflow-visible overflow-hidden"
          // style={{ overflow: "visible" }}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
        >
          {cardChunks.map((chunk, index) => (
            <SwiperSlide key={index}>
              <div className="grid lg:grid-cols-4 gap-y-5 md:grid-cols-2 grid-cols-1 gap-x-8">
                {renderCards(chunk)} {/* Render 4 cards per slide */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Fixed red div */}
        {/* Styles for box */}
        <style jsx>{`
          .box {
            position: relative;
            overflow: hidden;
            cursor: pointer;
            border-radius: 0.5rem;
            border:solid 0.1px wheat;
            z-index: 1;
            flex: 1;
            max-width: 100%;
            height: 22rem; /* Default height */
            box-shadow: 0px 0px 4px 0px #00000040;
            transition: height 0.5s ease, border-color 0.5s ease; /* Add height transition */
          }
          .box:hover {
            transition-delay: 0.2s;
            height: 26rem; /* Height on hover */
          }
          .box::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: scale(0);
            z-index: -1;
            background-color: #006fd6;
            transform: translate(-100%, -100%);
            transition: transform 0.3s ease-out;
            border-radius: 0.5rem;
          }
          .box:hover::before {
            transform: translate(0, 0);
          }
          .box p {
            transition: color 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .box:hover p {
            color: white;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ServicesInHome;
