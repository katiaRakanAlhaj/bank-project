import React, { useEffect, useState } from "react";
import i18next from "i18next";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const News = ({ event, currentPage, setCurrentPage }) => {
  const { t } = useTranslation();
const navigate = useNavigate();
  // Handle pagination logic
  const totalPages = event?.meta?.last_page || 1; // Get total pages from the fetched data

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleButtonClick = (pageUrl) => {
    if (pageUrl) {
      navigate(`/event/${pageUrl}`);
    } else {
      console.error("No page_url found in the data.");
    }
  };
 // Array of news phrases in different languages
 const newsPhrases = [
  "الأخبار",
  "News",
  "هەواڵ"
];
  const arrowClass = i18next.language === "en" ? "arrow4" : "arrow2";
  const paragClass = i18next.language === "en" ? "parag3" : "parag";
  return (
    <div className="container mx-auto mt-[2rem]">
      <div className="grid lg:grid-cols-3 gap-y-6 gap-x-8">
        {event?.data?.map((event) => (
          <div key={event.id} className="relative w-[100%] h-[35rem] group">
            <div className="absolute inset-0 border border-white z-10"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-500 transform group-hover:scale-105">
                <img
                  className="h-[100%] w-[100%] object-cover"
                  src={event.image}
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,#000000_0%,rgba(102,102,102,0)_71.47%)]"></div>
              </div>
            </div>
            <div
              className={`absolute top-[25rem] ${
                i18next.language === "en" ? "left-[2rem]" : "right-[2rem]"
              } transition-all duration-500 group-hover:opacity-100 group-hover:top-[20rem] z-20`}
            >
              <p className="font-[700] text-[1.5rem] text-[#FFFFFF] line-clamp-1">
                {event.title}
              </p>
              <p className="font-[700] text-[1.2rem] text-white">
                    {event.created_at.split("T")[0]}
                  </p>
              <p className="font-[400] w-[90%] flex text-justify text-[#FFFFFF] text-[0.8rem] mt-[0.5rem] line-clamp-3">
                {event.description}
              </p>
              <div className="relative">
               {event.page_url && (
                 <button
                 onClick={() => handleButtonClick(event.page_url)}
                 className={`relative button group mt-[1rem] lg:w-[20rem] md:w-[20rem] w-[18rem] h-[3.5rem] text-[#FFFFCC] gap-x-2 flex justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                   i18next.language === "en" ? "lang-en" : ""
                 }`}
               >
                 <div className="flex absolute gap-x-2 items-center">
                   <p
                     className={`text-white ${paragClass} font-[700] text-[1rem]`}
                   >
                     {t("شاهد المزيد")}
                   </p>
                   {i18next.language === "en" ? (
                     <FaArrowRightLong
                       className={`text-[1.2rem] ${arrowClass}`}
                     />
                   ) : (
                     <FaArrowLeftLong
                       className={`text-[1.2rem] ${arrowClass}`}
                     />
                   )}
                 </div>
               </button>
               )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      
        <div className="flex justify-center items-center">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm">
              <li>
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center  border px-4 h-8 text-sm font-medium ${
                    currentPage === 1
                      ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {t("السابق")}
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                      currentPage === index + 1
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-500 bg-white"
                    } border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`relative ml-3 inline-flex items-center border px-4 h-8 text-sm font-medium ${
                    currentPage === totalPages
                      ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {t("التالي")}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default News;
