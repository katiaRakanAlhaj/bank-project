import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18next from "i18next";
import { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const FifthModel = ({ pageData, dataKey, dataPage }) => {
  const navigate = useNavigate();
  const [hoveredCardId, setHoveredCardId] = useState(null); // Track hover per card
  const { t } = useTranslation();

  const handleCardClick = (pageUrl) => {
    navigate(`/card/${pageUrl}`);
  };

  const handleButtonClick = (pageUrl, e) => {
    e.stopPropagation(); // Prevent triggering the card click
    if (pageUrl) {
      navigate(`/slider/${pageUrl}`);
    } else {
      console.error("No page_url found in the data.");
    }
  };

  return (
   <div className="grid grid-cols-2 gap-x-6 gap-y-6 mt-[3.7rem]">
      {pageData?.[dataKey]?.map((item) =>
        item?.[dataPage]?.map((page) =>
          page.cards.map((card) => (
            <div
              key={card.id}
              className="w-[100%] h-[20rem] relative group cursor-pointer"
              onClick={() => handleCardClick(card.page_url)}
              onMouseEnter={() => setHoveredCardId(card.id)}
              onMouseLeave={() => setHoveredCardId(null)}
            >
              <div className="absolute inset-0 border border-white z-10"></div>
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-500 transform group-hover:scale-105">
                  <div>
                    <img
                      className="bg-cover w-[100%] h-[100%]"
                      src={card.image}
                      alt={card.title}
                    />
                  </div>
                  <div
                    className="absolute top-0 left-0 w-[100%] h-[100%]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
                    }}
                  />
                  
                  {/* Content container with higher z-index */}
                  <div className="absolute z-20 bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-[90%]">
                    {/* Title - centered */}
                    <div className="flex justify-center">
                      <p className="text-[#FFFFFF] text-[1.1rem] font-[700] mb-4 text-center">
                        {card.title}
                      </p>
                    </div>
                  
                    {/* Button - centered */}
                    {card.page_url && (
                      <div className="flex justify-center">
                        <div className="relative">
                          <div className="flex items-center">
                            <button
                              className="relative w-[11rem] h-[3rem] transition-all duration-500 ease-in-out text-white font-bold overflow-hidden bg-gradient-to-l from-[#2F57C8] to-[#172B62]"
                              onClick={(e) => handleButtonClick(card.page_url, e)}
                            >
                              <span
                                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                                  hoveredCardId === card.id ? "bg-secondary" : ""
                                } transform ${hoveredCardId === card.id ? "scale-x-100" : "scale-x-0"} origin-left`}
                              ></span>
                              <p className="relative z-10">{t("شاهد المزيد")}</p>
                            </button>
                            <div
                              className={`flex items-center justify-center transition-all duration-300 ease-linear ${
                                hoveredCardId === card.id
                                  ? "rotate-0 h-[3rem] w-[3rem] top-0 bg-gradient-to-l from-[#2F57C8] to-[#172B62]"
                                  : "rotate-[-45deg] top-2"
                              } w-[2.1rem] h-[2.1rem] ${i18next.language === "en" ? 'ml-[-1.1rem]' : 'mr-[-1.1rem]'} bg-secondary`}
                            >
                              {i18next.language === "en" ? (
                                <FaArrowRightLong
                                  className={`text-white ${hoveredCardId === card.id ? "rotate-0" : "rotate-[45deg]"}`}
                                />
                              ) : (
                                <FaArrowLeftLong
                                  className={`text-white ${hoveredCardId === card.id ? "rotate-0" : "rotate-[45deg]"}`}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default FifthModel;