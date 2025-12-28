import React from "react";
const FourthModel = ({ pageData, dataKey , dataPage }) => {
  return (
    <div>
      {pageData?.[dataKey]?.map((category) =>
        category?.[dataPage]?.map((pages) => {
          const { descriptions, images } = pages;

          return (
            <div key={pages.id}>
              <div>
                <div className="flex items-center text-center gap-x-2">
                  <div className="w-[3rem] h-[0.3rem] bg-secondary"></div>
                  <p className="text-[1.8rem] font-[700] text-[#333333]">
                    {pages.banner_title}
                  </p>
                </div>
                <p className="mt-[2rem] font-[400] text-[#333333] text-[1.2rem] leading-[2rem]">
                  {descriptions[0]?.split("\n")?.map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {line}
                      {lineIndex < descriptions[0]?.split("\n").length - 1 && (
                        <br />
                      )}
                    </React.Fragment>
                  ))}
                </p>
                <img
                  className="w-full h-[27rem] mt-[1.5rem] object-cover"
                  src={images[0]} // First image
                />
              </div>
              <div className="grid lg:grid-cols-2 lg:space-y-0 space-y-4 mt-[1.5rem]">
                {descriptions?.slice(1, 3).map((desc, index) => (
                  <p className="font-[400] text-[#333333] text-[1.2rem] leading-[2rem]" key={index}>
                    {" "}
                    {desc?.split("\n").map((line, lineIndex) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex < desc?.split("\n").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p> // Second and third descriptions
                ))}
              </div>
              <div className="mt-[1.5rem]">
                <p className="font-[400] text-[#333333] text-[1.2rem] leading-[2rem]">
                  {descriptions[3]?.split("\n")?.map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {line}
                      {lineIndex < descriptions[3]?.split("\n").length - 1 && (
                        <br />
                      )}
                    </React.Fragment>
                  ))}
                </p>
                {images[1] && ( // Check if the second image exists
                  <img
                    className="w-full h-[27rem] mt-[1.5rem] object-cover"
                    src={images[1]} // Second image
                    alt={`Image for ${pages.banner_title}`} // Add alt text for accessibility
                  />
                )}
              </div>
              <div className="grid lg:grid-cols-2 lg:space-y-0 space-y-4 mt-[1.5rem]">
                {descriptions?.slice(4)?.map((desc, index) => (
                  <p className = "font-[400] text-[#333333] text-[1.2rem] leading-[2rem]" key={index}>
                    {" "}
                    {desc?.split("\n")?.map((line, lineIndex) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex < desc?.split("\n").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p> // Fifth and sixth descriptions
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default FourthModel;
