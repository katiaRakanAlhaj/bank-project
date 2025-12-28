// import React from "react";
// import Accordion from "../home/accordion";

// const FAQContent = ({answerData}) => {
//   return (
//     <div className="flex flex-col mt-[2.2rem]">
//       {answerData?.data ? (
//         <Accordion faqData={{ data: [answerData.data] }} showMore={false} />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default FAQContent;
import React from "react";
import Accordion from "../home/accordion";

const FAQContent = ({faqData}) => {
  return (
    <div className="flex flex-col mt-[2.2rem]">
        <Accordion isTwoColumns={false} showMore={false} faqData={faqData} columns={1} sliceData={false} />
        </div>
  );
};

export default FAQContent;
