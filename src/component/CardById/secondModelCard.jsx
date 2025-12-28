import i18next from "i18next";
import React from "react";

const SecondModelCard = ({ pageData }) => {

  return (
    <div>
      {/* Render the banner title if it exists */}
      {pageData?.page?.banner_title && (
        <div className="flex items-center text-center gap-x-2">
          <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
          <p className="text-[1.8rem] font-[700] text-[#333333]">{pageData.banner_title}</p>
        </div>
      )}

      {/* Render descriptions and images dynamically */}
      {pageData?.page?.descriptions?.map((desc, index) => (
        <div key={index} className={`grid lg:grid-cols-2 mt-[3rem] gap-x-4`} dir={index % 2 === 0 ? 'rtl' : 'ltr'}>
          {pageData?.page?.images?.[index] && (
            <img
              className="w-[100%] h-[20rem]"
              src={pageData?.page?.images[index]}
            />
          )}
          <p dir={i18next.language === "ar" || i18next.language === "ku" ? "rtl" : "ltr"} className="flex text-justify text-[1.3rem] text-[#333333] font-[400]">
          {desc?.split('\n').map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {line}
                {lineIndex < desc?.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SecondModelCard;