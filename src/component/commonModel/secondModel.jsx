import i18next from "i18next";
import React from "react";

const SecondModel = ({ pageData ,dataKey,dataPage}) => {
  return (
    <div>
      {/* Iterate over all categories */}
      {pageData?.[dataKey]?.map((item) => (
        <div key={item.id}>
          {/* Iterate over all pages in the category */}
          {item?.[dataPage]?.map((page) => (
            <div key={page.id}>
              <div className="flex items-center text-center gap-x-2">
                <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
                <p className="text-[1.8rem] font-[700] text-[#333333]">{page.banner_title}</p>
              </div>
              {/* Render descriptions and images dynamically */}
              {page.descriptions?.map((desc, index) => (
                <div key={index} className={`grid lg:grid-cols-2 mt-[3rem] gap-x-4`} dir={index % 2 === 0 ? 'rtl' : 'ltr'}>
                  {page.images?.[index] && (
                    <img
                      className="w-[100%] h-[20rem]"
                      src={page.images[index]}
                      alt={`Vision Image ${index + 1}`}
                    />
                  )}
                  <p dir={i18next.language === "ar" || i18next.language === "ku" ? "rtl" : "ltr"} className="flex text-justify text-[1.3rem] text-[#333333] font-[400]">
                  {desc?.split('\n')?.map((line, lineIndex) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex < desc?.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SecondModel;