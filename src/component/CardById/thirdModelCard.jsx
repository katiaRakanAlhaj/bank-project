import i18next from "i18next";
import React from "react";

const ThirdModelCard = ({ pageData }) => {
  // Check if pageData exists
  if (!pageData || !pageData.page) {
    return <div>No data available</div>;
  }

  // Destructure the page data
  const { images = [], descriptions = [], banner_title } = pageData.page;

  // Function to render rows dynamically
  const renderRows = (images = [], descriptions = []) => {
    const rows = [];
    let imageIndex = 0;
    let descriptionIndex = 0;
    let isImageOnLeft = true; // Flag to alternate the position

    while (
      imageIndex < images.length ||
      descriptionIndex < descriptions.length
    ) {
      // Check if it's the last iteration
      const isLastIteration =
        imageIndex === images.length - 1 &&
        descriptionIndex === descriptions.length - 1;

      // First row: Image and Description
      if (
        imageIndex < images.length &&
        descriptionIndex < descriptions.length
      ) {
        rows.push(
          <div
            key={`row-${imageIndex}-${descriptionIndex}`}
            className={`grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-x-4 mt-[3rem] ${
              isLastIteration ? "flex-row-reverse" : ""
            }`}
          >
            {isImageOnLeft ? (
              <>
                <img
                  className="w-[100%] h-[22rem]"
                  src={images[imageIndex]}
                  alt={`Image ${imageIndex + 1}`}
                />
                <p
                  dir={
                    i18next.language === "ar" || i18next.language === "ku"
                      ? "rtl"
                      : "ltr"
                  }
                  className="flex text-justify text-[1.35rem] text-[#333333] font-[400]"
                >
                  {descriptions[descriptionIndex]?.split("\n")
                    .map((line, lineIndex) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex <
                          descriptions[descriptionIndex]?.split("\n").length -
                            1 && <br />}
                      </React.Fragment>
                    ))}
                </p>
              </>
            ) : (
              <>
                <p className="flex text-justify text-[1.35rem] text-[#333333] font-[400]">
                  {descriptions[descriptionIndex]?.split("\n")
                    .map((line, lineIndex) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex <
                          descriptions[descriptionIndex]?.split("\n").length -
                            1 && <br />}
                      </React.Fragment>
                    ))}
                </p>
                <img
                  className="w-[100%] h-[22rem]"
                  src={images[imageIndex]}
                  alt={`Image ${imageIndex + 1}`}
                />
              </>
            )}
          </div>
        );
        imageIndex++;
        descriptionIndex++;
        isImageOnLeft = !isImageOnLeft; // Toggle the flag to alternate positions
      }

      // Second row: Description only
      if (descriptionIndex < descriptions.length) {
        rows.push(
          <p
            key={`description-${descriptionIndex}`}
            className="flex text-justify text-[1.35rem] text-[#333333] font-[400] mt-[1.5rem]"
          >
            {descriptions[descriptionIndex]?.split("\n")
              .map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                  {line}
                  {lineIndex <
                    descriptions[descriptionIndex]?.split("\n").length - 1 && (
                    <br />
                  )}
                </React.Fragment>
              ))}
          </p>
        );
        descriptionIndex++;
      }

      // Third row: Image only
      if (imageIndex < images.length) {
        rows.push(
          <img
            key={`image-${imageIndex}`}
            className="w-[100%] h-[24rem] mt-[2rem]"
            src={images[imageIndex]}
            alt={`Image ${imageIndex + 1}`}
          />
        );
        imageIndex++;
      }
    }
    return rows;
  };

  return (
    <div>
      <div className="flex items-center text-center gap-x-2">
        <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
        <p className="text-[1.8rem] font-[700] text-[#333333]">
          {banner_title}
        </p>
      </div>
      {/* Render rows dynamically */}
      {renderRows(images, descriptions)}
    </div>
  );
};

export default ThirdModelCard;
