import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import upload from "../../assets/images/upload.png";

const SixthModels = ({ pageData, dataPage, dataKey }) => {
  const { t } = useTranslation();
  const [hoveredFiles, setHoveredFiles] = useState({});

  // Function to handle file download in the same window
  const handleFileDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    const fileName = fileUrl.split("/").pop() || "download";
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Extract files data from pageData
  const files =
    pageData?.[dataKey]?.flatMap((category) =>
      category?.[dataPage]?.flatMap((page) =>
        page.files.map((file) => ({
          id: file.id,
          description: file.description,
          fileSections: file.file_section, // Keep the whole section for further extraction
        }))
      )
    ) || [];

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
            <div className="flex gap-x-2 items-center mb-4">
              <div className="w-[3rem] h-[0.3rem]  bg-secondary"></div>
              {fileItem.description && (
                <p className="text-[#333333] text-[1.8rem]  font-[700]">
                  {fileItem.description}
                </p>
              )}
            </div>
            {/* File download buttons in grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fileItem.fileSections.map((fileSec, fileIndex) => (
  <div key={fileIndex} className="flex flex-col group">
    {/* Description for each file in file_section */}
    {fileSec.description && (
      <p className="text-[#333333] text-center font-[700] text-[1.1rem] mb-1">
        {fileSec.description}
      </p>
    )}
    {/* Only show download button if file exists */}
    {fileSec.file && (
      <div
        className="flex flex-row items-center"
        onMouseEnter={() => handleHover(`${fileItem.id}-${fileIndex}`, true)}
        onMouseLeave={() => handleHover(`${fileItem.id}-${fileIndex}`, false)}
      >
        <button
          className={`relative w-full h-[3rem] transition-all duration-500 ease-in-out text-white font-bold overflow-hidden bg-gradient-to-l from-[#2F57C8] to-[#172B62]`}
          onClick={() => handleFileDownload(fileSec.file)}
        >
          <span
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              hoveredFiles[`${fileItem.id}-${fileIndex}`]
                ? "bg-secondary"
                : ""
            } transform ${
              hoveredFiles[`${fileItem.id}-${fileIndex}`]
                ? "scale-x-100"
                : "scale-x-0"
            } origin-left`}
          ></span>
          <p className={`relative z-10`}>{t("حمل الملف من هنا")}</p>
        </button>
        <div
          className={`flex items-center justify-center transition-all duration-300 ease-linear ${
            hoveredFiles[`${fileItem.id}-${fileIndex}`]
              ? "rotate-0 h-[3rem] w-[3rem] top-0 bg-gradient-to-l from-[#2F57C8] to-[#172B62]"
              : "rotate-[-45deg] top-2"
          } w-[2.1rem] h-[2.1rem] ${
            i18next.language === "en" ? "ml-[-1.1rem]" : "mr-[-1.1rem]"
          } bg-secondary`}
        >
          {hoveredFiles[`${fileItem.id}-${fileIndex}`] ? (
            <img
              src={upload}
              alt="Upload icon"
              className="w-[1.5rem] h-[1.5rem]"
            />
          ) : i18next.language === "en" ? (
            <FaArrowRightLong
              className={`text-white ${
                hoveredFiles[`${fileItem.id}-${fileIndex}`]
                  ? "rotate-0"
                  : "rotate-[45deg]"
              }`}
            />
          ) : (
            <FaArrowLeftLong
              className={`text-white ${
                hoveredFiles[`${fileItem.id}-${fileIndex}`]
                  ? "rotate-0"
                  : "rotate-[45deg]"
              }`}
            />
          )}
        </div>
      </div>
    ) }
  </div>
))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SixthModels;
