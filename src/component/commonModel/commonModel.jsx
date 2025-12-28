// components/CommonModel.js
import React from "react";

const CommonModel = ({ pageData, dataKey , dataPage }) => {
  
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
                <p className="text-[1.8rem] font-[700] text-[#333333]">
                  {page.banner_title}
                </p>
              </div>

              {/* Determine the maximum length between descriptions and images */}
              {Array.from({
                length: Math.max(
                  page.descriptions?.length || 0,
                  page.images?.length || 0
                ),
              }).map((_, index) => (
                <div key={index}>
                  {/* Render description if it exists at this index */}
                  {page?.descriptions?.[index] && (
                    <p className="flex text-justify mt-[2rem] text-[#333333] font-[400] text-[1.2rem]">
                      {/* Replace \n with <br /> */}
                      {page?.descriptions[index]?.split("\n")?.map((line, lineIndex) => (
                          <React.Fragment key={lineIndex}>
                            {line}
                            {lineIndex <
                              page.descriptions[index]?.split("\n").length -
                                1 && <br />}
                          </React.Fragment>
                        ))}
                    </p>
                  )}

                  {/* Render image if it exists at this index */}
                  {page.images?.[index] && (
                    <div className="w-[100%] h-[30rem] mt-[1rem]">
                      <img
                        className="w-[100%] h-[100%] object-cover"
                        src={page.images[index]}
                        alt={`Image ${index + 1}`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

};

export default CommonModel;