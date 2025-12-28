import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import upload from "../../assets/images/upload.png";

const SixthModelcard = ({ pageData }) => {
  const { t } = useTranslation();
  const [hoveredFiles, setHoveredFiles] = useState({});

  // Function to handle file download in the same window
  const handleFileDownload = (fileUrl) => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = fileUrl;
    // Extract filename from URL or use a default name
    const fileName = fileUrl.split("/").pop() || "download";
    link.download = fileName;
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Extract files data from pageData
  const files = pageData?.page?.files || [];

  const handleHover = (fileId, isHovering) => {
    setHoveredFiles((prev) => ({
      ...prev,
      [fileId]: isHovering,
    }));
  };

  return (
    <div>
      <div className="mt-[1rem]">
        {files.map((fileItem) => (
          <div key={fileItem.id} className="mb-6">
            {/* File description */}
            <div className="flex items-center mb-4">
              <div className="w-[3rem] h-[0.3rem]  bg-secondary"></div>

              {fileItem?.description && (
                <p className="text-[#333333 font-[700] text-[1.8rem]">
                  {fileItem.description}
                </p>
              )}
            </div>
            {/* File download buttons in grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {fileItem?.file_section?.map((fileSection, sectionIndex) => (
                <div key={sectionIndex}>
                  {/* Section description if exists */}
                  {fileSection?.description && (
                    <p className="text-[#333333] text-[1.2rem] text-center font-[700] mb-2">
                      {fileSection.description}
                    </p>
                  )}
                  {/* File download button */}
                {fileSection?.file && (
                    <div
                    className="flex items-center group"
                    onMouseEnter={() =>
                      handleHover(`${fileItem.id}-${sectionIndex}`, true)
                    }
                    onMouseLeave={() =>
                      handleHover(`${fileItem.id}-${sectionIndex}`, false)
                    }
                  >
                    <button
                      className={`relative w-full h-[3rem] transition-all duration-500 ease-in-out text-white font-bold overflow-hidden bg-gradient-to-l from-[#2F57C8] to-[#172B62]`}
                      onClick={() => handleFileDownload(fileSection.file)}
                    >
                      <span
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                          hoveredFiles[`${fileItem.id}-${sectionIndex}`]
                            ? "bg-secondary"
                            : ""
                        } transform ${
                          hoveredFiles[`${fileItem.id}-${sectionIndex}`]
                            ? "scale-x-100"
                            : "scale-x-0"
                        } origin-left`}
                      ></span>
                      <p className={`relative z-10`}>{t("حمل الملف من هنا")}</p>
                    </button>
                    <div
                      className={`flex items-center justify-center transition-all duration-300 ease-linear ${
                        hoveredFiles[`${fileItem.id}-${sectionIndex}`]
                          ? "rotate-0 h-[3rem] w-[3rem] top-0 bg-gradient-to-l from-[#2F57C8] to-[#172B62]"
                          : "rotate-[-45deg] top-2"
                      } w-[2.1rem] h-[2.1rem] ${
                        i18next.language === "en"
                          ? "ml-[-1.1rem]"
                          : "mr-[-1.1rem]"
                      } bg-secondary`}
                    >
                      {hoveredFiles[`${fileItem.id}-${sectionIndex}`] ? (
                        <img
                          src={upload}
                          alt="Upload icon"
                          className="w-[1.5rem] h-[1.5rem]"
                        />
                      ) : i18next.language === "en" ? (
                        <FaArrowRightLong
                          className={`text-white ${
                            hoveredFiles[`${fileItem.id}-${sectionIndex}`]
                              ? "rotate-0"
                              : "rotate-[45deg]"
                          }`}
                        />
                      ) : (
                        <FaArrowLeftLong
                          className={`text-white ${
                            hoveredFiles[`${fileItem.id}-${sectionIndex}`]
                              ? "rotate-0"
                              : "rotate-[45deg]"
                          }`}
                        />
                      )}
                    </div>
                  </div>
                )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SixthModelcard;
