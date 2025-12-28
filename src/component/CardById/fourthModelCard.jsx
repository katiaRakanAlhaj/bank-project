import React from "react";

const FourthModelCard = ({ pageData }) => {
  // Destructure the page object from pageData
  const { page } = pageData || {};

  const { descriptions, images, banner_title } = page;

  return (
    <div>
      <div key={page.id}>
        <div>
          <div className="flex items-center text-center gap-x-2">
            <div className="w-[3rem] h-[0.3rem] bg-secondary"></div>
            <p className="text-[1.8rem] font-[700] text-[#333333]">
              {banner_title}
            </p>
          </div>
          <p className="mt-[2rem] font-[400] text-[#333333] text-[1.2rem] leading-[2rem]">
            {descriptions[0]?.split("\n").map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {line}
                {lineIndex < descriptions[0]?.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
          <img
            className="w-full h-[27rem] mt-[1.5rem]"
            src={images?.[0]} // First image
            alt="Banner"
          />
        </div>
        <div className="grid lg:grid-cols-2 lg:space-y-0 space-y-4 mt-[1.5rem]">
          {descriptions?.slice(1, 3).map((desc, index) => (
            <p
              className="font-[400] text-[#333333] text-[1.2rem] leading-[2rem]"
              key={index}
            >
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
            {" "}
            {descriptions[3]?.split("\n").map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {line}
                {lineIndex < descriptions[3]?.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>{" "}
          {/* Fourth description */}
          {images[1] && (
            <img
              className="w-full h-[27rem] mt-[1.5rem]"
              src={images?.[1]} // Second image
            />
          )}
        </div>
        <div className="grid lg:grid-cols-2 lg:space-y-0 space-y-4 mt-[1.5rem]">
          {descriptions?.slice(4).map((desc, index) => (
            <p
              className="font-[400] text-[#333333] text-[1.2rem] leading-[2rem]"
              key={index}
            >
              {desc?.split("\n")?.map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                  {line}
                  {lineIndex < desc.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </p> // Fifth and sixth descriptions
          ))}
        </div>
      </div>
    </div>
  );
};

export default FourthModelCard;
