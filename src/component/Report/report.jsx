import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import useFetchData from "../../hooks/useFetchData";
import upload from "../../assets/images/upload.png";

const Report = () => {
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState({});
  const { t } = useTranslation();
  const { data: reportData } = useFetchData("FinancialReport");

  const getQuarterLabel = (fileIndex) => {
    switch (fileIndex) {
      case 0:
        return t('الربع الأول'); // First quarter
      case 1:
        return t('الربع الثاني'); // Second quarter
      case 2:
        return t('الربع الثالث'); // Third quarter
      case 3:
        return t('الربع الرابع'); // Fourth quarter
      default:
        return ""; // Default case if fileIndex is out of range
    }
  };

  const renderButton = (year, file, yearIndex, fileIndex) => {
    const isHovered = hoveredButtonIndex[yearIndex] === fileIndex; // Check if this button is hovered
    return (
      <div key={fileIndex}>
        <div className="flex flex-col items-center">
          <p className="text-[#000000] font-[500] text-[1.2rem]">{year}</p>
          <div>
            <div className="flex items-center text-center gap-x-2"></div>
            <div className="flex items-center mt-[1rem]">
              <a
                href={file}
                download // This attribute prompts the browser to download the file
                className={`relative w-[11rem] h-[3rem] transition-all duration-500 ease-in-out text-white font-bold overflow-hidden bg-gradient-to-l from-[#2F57C8] to-[#172B62] items-center flex justify-center`}
                onMouseEnter={() =>
                  setHoveredButtonIndex((prev) => ({
                    ...prev,
                    [yearIndex]: fileIndex,
                  }))
                } // Set the hovered button index for the specific year
                onMouseLeave={() =>
                  setHoveredButtonIndex((prev) => ({
                    ...prev,
                    [yearIndex]: null,
                  }))
                } // Reset on mouse leave for the specific year
              >
                <span
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    isHovered ? "bg-secondary" : ""
                  } transform ${
                    isHovered ? "scale-x-100" : "scale-x-0"
                  } origin-left`}
                ></span>
                <p className={`relative z-10 items-center`}>
                  {t("حمل الملف من هنا")}{" "}
                  {/* Display file name or default text */}
                </p>
              </a>
              <div
                className={`flex items-center justify-center transition-all duration-300 ease-linear ${
                  isHovered
                    ? "rotate-0 h-[3rem] w-[3rem] top-0 bg-gradient-to-l from-[#2F57C8] to-[#172B62]"
                    : "rotate-[-45deg] top-2"
                } w-[2.1rem] h-[2.1rem] ${
                  i18next.language === "en" ? "ml-[-1.1rem]" : "mr-[-1.1rem]"
                } bg-secondary`}
              >
                {isHovered ? (
                  <img
                    src={upload}
                    alt="Your Alt Text"
                    className="w-[1.5rem] h-[1.5rem]"
                  />
                ) : i18next.language === "en" ? (
                  <FaArrowRightLong
                    className={`text-white ${
                      isHovered ? "rotate-0" : "rotate-[45deg]"
                    }`}
                  />
                ) : (
                  <FaArrowLeftLong
                    className={`text-white ${
                      isHovered ? "rotate-0" : "rotate-[45deg]"
                    }`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {reportData?.data?.map((item, yearIndex) => (
        <div key={item.id}>
          <div className="flex items-center gap-x-2 mt-[1.5rem]">
            <div className="w-[3rem] h-[0.3rem]  bg-secondary"></div>
            <h1 className="text-[1.8rem] font-[700] text-[#333333]">
              {t('لسنة')} {item.for_year}{" "}
            </h1>
          </div>
          <div className="grid lg:grid-cols-4 grid-cols-1">
            {item.report_file.map((file, fileIndex) =>
              renderButton(getQuarterLabel(fileIndex), file, yearIndex, fileIndex)
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Report;