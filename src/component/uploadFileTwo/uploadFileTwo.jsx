import i18next from "i18next";
import { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import upload from "../../assets/images/upload.png";
import { useTranslation } from "react-i18next";

const UploddFileTwo = ({ pageData, dataKey ,dataPage}) => {
  const { t } = useTranslation();
  
  const handleFileDownload = (fileUrl) => {
    if (fileUrl) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", fileUrl.split("/").pop());
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("File URL is not available");
    }
  };

  return (
    <div>
      <div className="flex items-center text-center gap-x-2 mt-[1.5rem]">
        <div className="w-[3rem] h-[0.3rem] bg-secondary"></div>
        <p className="text-[1.8rem] font-[700] text-[#333333]">
          {t("لتحميل الملف")}
        </p>
      </div>
      <div className="mt-[1rem]">
        <div className="grid grid-cols-1 gap-4">
          {pageData?.[dataKey]?.map((item, itemIndex) =>
            item?.[dataPage]?.map((page, pageIndex) =>
              page.file_section.map((fileUrl, fileIndex) => {
                const [isHovered, setIsHovered] = useState(false);
                
                return (
                  <div key={`${itemIndex}-${pageIndex}-${fileIndex}`} className="flex items-center">
                    <button
                      className="relative w-[12rem] h-[3rem] transition-all duration-500 ease-in-out text-white font-bold overflow-hidden bg-gradient-to-l from-[#2F57C8] to-[#172B62]"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={() => handleFileDownload(fileUrl)}
                    >
                      <span
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                          isHovered ? "bg-secondary" : ""
                        } transform ${
                          isHovered ? "scale-x-100" : "scale-x-0"
                        } origin-left`}
                      ></span>
                      <p className="relative z-10">
                        {t("حمل الملف من هنا")}
                      </p>
                    </button>
                    
                    <div
                      className={`flex items-center justify-center transition-all duration-300 ease-linear ${
                        isHovered
                          ? "rotate-0 h-[3rem] w-[3rem] top-0 bg-gradient-to-l from-[#2F57C8] to-[#172B62]"
                          : "rotate-[-45deg] top-2"
                      } w-[2.1rem] h-[2.1rem] ${
                        i18next.language == "en" ? "ml-[-1.1rem]" : "mr-[-1.1rem]"
                      } bg-secondary`}
                    >
                      {isHovered ? (
                        <img
                          src={upload}
                          alt="Upload icon"
                          className="w-[1.5rem] h-[1.5rem]"
                        />
                      ) : i18next.language == "en" ? (
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
                );
              })
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UploddFileTwo;