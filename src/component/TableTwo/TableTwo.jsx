import React from "react";
import i18next from "i18next";
import parse, { domToReact } from "html-react-parser";

const TableTwo = ({ pageData, dataKey, dataPage }) => {
  const fontFamily =
    i18next.language === "ar"
      ? "Cairo"
      : i18next.language === "ku"
      ? "Droid Kufi"
      : "Roboto";

  let trIndex = 0;
  let tdIndex = 0;

  const addClasses = (node) => {
    if (node.name === "table") {
      return (
        <div className="w-full">
          <table
            style={{
              boxShadow: "0px 0px 10px 0px #00000040",
              fontFamily: fontFamily,
            }}
          >
            {domToReact(node.children, { replace: addClasses })}
          </table>
        </div>
      );
    }

    if (node.name === "tr") {
      tdIndex = 0;
      const trClass =
        trIndex === 0
          ? "bg-[#ECECEC]"
          : "bg-white border-b-[0.1rem] border-[#EAEAEA]";
      trIndex++;
      return (
        <tr className={trClass} style={{ fontFamily: fontFamily }}>
          {domToReact(node.children, { replace: addClasses })}
        </tr>
      );
    }

    if (node.name === "td" || node.name === "th") {
      const isHeaderCell = trIndex === 1;
      const isFirstColumn = tdIndex === 0;
      const baseClasses = "py-4 text-[1rem] font-[700] px-14";
      const tdClass =
        isHeaderCell && isFirstColumn
          ? `${baseClasses} bg-[#ECECEC]`
          : baseClasses;

      tdIndex++;
      return (
        <td className={tdClass} style={{ fontFamily: fontFamily }}>
          {domToReact(node.children, {
            replace: (childNode) => {
              if (childNode.name) {
                const props = {
                  ...childNode.attribs,
                  style: { fontFamily: fontFamily }, // Simplified style assignment
                };
                return React.createElement(
                  childNode.name,
                  props,
                  childNode.children &&
                    domToReact(childNode.children, { replace: addClasses })
                );
              }
              return childNode;
            },
          })}
        </td>
      );
    }

    if (node.name) {
      const props = {
        ...node.attribs,
        style: { fontFamily: fontFamily }, // Simplified style assignment
      };
      return React.createElement(
        node.name,
        props,
        node.children && domToReact(node.children, { replace: addClasses })
      );
    }

    return node;
  };

  return (
    <div>
      <div className="relative mt-[2.5rem]">
        {pageData?.[dataKey]?.map((item, itemIndex) =>
          item?.[dataPage]?.map((page, pageIndex) => {
            const tableSection = page.table_section;
            return (
              <div
                className="overflow-x-auto border-r"
                key={`${itemIndex}-${pageIndex}`}
              >
                {tableSection ? (
                  <div>{parse(tableSection, { replace: addClasses })}</div>
                ) : (
                  <p>No table data available for this page.</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TableTwo;
