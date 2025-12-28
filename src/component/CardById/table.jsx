import React from "react";
import i18next from "i18next";
import parse, { domToReact } from "html-react-parser";

const TableCard = ({ pageData }) => {
    const fontFamily = i18next.language === 'ar' ? 'Cairo' : 
                      (i18next.language === 'ku' ? 'Droid Kufi' : 'Roboto');
  // Extract the table section directly from pageData.page
  const tableSection = pageData?.page?.table_section;

  // Track the index of the current <tr> and <td>
  let trIndex = 0;
  let tdIndex = 0;

  // Function to add classes to <tr> and <td> elements
  const addClasses = (node) => {
       if (node.name === "table") {
          return (
            <div className="w-full">
              <table style={{ 
                boxShadow: "0px 0px 10px 0px #00000040",
                fontFamily: fontFamily
              }}>
                {domToReact(node.children, { replace: addClasses })}
              </table>
            </div>
          );
        }
    if (node.name === "tr") {
      // Reset tdIndex for each new row
      tdIndex = 0;

      // Apply gray background to the first <tr> (header row)
      const trClass =
        trIndex === 0
          ? "bg-[#ECECEC]" // Header row
          : "bg-white border-b-[0.1rem] border-[#EAEAEA]"; // Data rows
      trIndex++;

      return (
        <tr className={trClass} style={{ fontFamily: fontFamily }}>
          {domToReact(node.children, { replace: addClasses })}
        </tr>
      );
    }
    
    if (node.name === "td") {
      // Apply different styling for header cells vs data cells
      const tdClass = trIndex === 1 // Header row (trIndex was incremented)
        ? "px-6 py-4 text-[1rem] font-[700] text-[#333333]" // Header cells
        : "px-6 py-4 text-[1rem] text-[#666666]"; // Data cells
      
      tdIndex++;
      
      return (
        <td className={tdClass}>
          {domToReact(node.children)}
        </td>
      );
    }
    
    return node; // Return the node unchanged if it's not <tr> or <td>
  };

  return (
    <div>
      <div className="relative mt-[2.5rem]">
        {/* Render the parsed HTML table with modified classes */}
        {tableSection && tableSection.trim() ? (
          <div
            className={`overflow-x-auto border-r
            }`}
          >
            {parse(tableSection, { replace: addClasses })}
          </div>
        ) : (
          <p className="text-center py-4 text-gray-500">
            No table data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default TableCard;