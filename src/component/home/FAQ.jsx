import React from "react";
import Accordion from "./accordion";

const FAQ = ({ faqData , homePageData }) => {
  return (
<>
{homePageData?.data?.map((home)=>(
      <div className="container mx-auto">
      <div className="flex items-center justify-center text-center gap-x-2 mt-[5rem]">
        <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
        <h1 className="text-[#333333] font-[700] text-[1.8rem]">
         {home?.questions_title}
        </h1>
        <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
      </div>
      <h1 className="text-center text-[1.2rem] font-[400] text-[#333333] mt-[1rem]">
        {home?.questions_description}
      </h1>
      <div>
        <Accordion isTwoColumns = {true} showMore={true} faqData={faqData} columns={2} sliceData = {true}/>
      </div>
    </div>
))}
</>
  );
};

export default FAQ;
