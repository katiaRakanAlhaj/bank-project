import i18next from "i18next";
import React, { useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useTranslation } from "react-i18next";

const AccordionItem = ({ title, content, showMore, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullContentVisible, setIsFullContentVisible] = useState(false); // State to manage full content visibility
  const toggleAccordion = () => setIsOpen(!isOpen);
  const getTruncatedContent = (text) => {
    const words = text.split(" ");
    return words.length > 30 ? words.slice(0, 30).join(" ") : text;
  };
  const { t } = useTranslation();
  
  return (
    <div className="mb-[1rem] rounded-[5px]">
      <div
        style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
        className={`font-[400] lg:text-[1.2rem] text-[1rem] lg:h-[4rem]  py-[1.5rem] flex justify-between ${
          isOpen ? "bg-secondary text-white" : "bg-white text-primary"
        } rounded-[0.2rem] items-center px-[2rem]`}
      >
        <div className="flex w-full justify-between items-center">
          <p>{title}</p>
          <icon
            className={`text-[2.5rem] cursor-pointer transition-transform duration-500 ${
              isOpen
                ? i18next.language === "en"
                  ? "rotate-[-90deg]" // Rotate -90deg if language is English
                  : "rotate-[90deg]" // Rotate 90deg for other languages
                : "" // No rotation if not open
            }`}
          >
            {i18next.language === "en" ? (
              <IoMdArrowDropright onClick={toggleAccordion} />
            ) : (
              <IoMdArrowDropleft onClick={toggleAccordion} />
            )}
          </icon>
        </div>
      </div>
      <div
        style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen py-4" : "max-h-0 py-0"
        } mt-[0.5rem] flex flex-col items-start px-[2rem] text-[#333333] font-[700] text-[1rem]`}
      >
        {isOpen && (
          <>
            <p>{isFullContentVisible ? content : getTruncatedContent(content)}</p>
            {showMore && !isFullContentVisible && content.split(" ").length > 30 && (
              <button
                onClick={() => setIsFullContentVisible(true)} // Show full content
                className="text-secondary underline cursor-pointer mt-2"
              >
                {t('عرض المزيد')}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const Accordion = ({ faqData, showMore, columns = 2, sliceData = true , isTwoColumns = true }) => {
  const slicedData = sliceData ? faqData?.data?.slice(0, 8) : faqData?.data; // Control slicing with prop
  const columnData = Array.from({ length: columns }, (_, i) =>
    slicedData?.filter((_, index) => index % columns === i)
  );
  
  return (
    <div className={`mt-[2rem] relative z-30 grid ${isTwoColumns ? 'lg:grid-cols-2' : ''} gap-6`}>
      {columnData.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-y-4">
          {column?.map((faq) => (
            <AccordionItem
              key={faq.id}
              title={faq.question}
              content={faq.answer}
              showMore={showMore}
              id={faq.id} // Pass the ID to AccordionItem
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Accordion;