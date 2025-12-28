import { useTranslation } from "react-i18next";
import Triangle from "./trinagle";
import { Link, useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import Fuse from "fuse.js";

const GoogleMaps = ({ id, contactData, homePageData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: categoryData } = useFetchData("categories-with-pages-content");

  // Function to find the branches page
  const findBranchesPage = () => {
    const branchesPhrases = ["فروعنا", "our branches", "شاخەکانمان"];
    const fuseOptions = {
      includeScore: true,
      threshold: 0.4,
    };
    const fuseBranches = new Fuse(branchesPhrases, fuseOptions);
    
    const isBranches = (title) => {
      const results = fuseBranches.search(title);
      return results.length > 0 && results[0].score < 0.4;
    };

    const branchesPage = categoryData?.categories
      ?.flatMap((category) => category.pages)
      .find((page) => isBranches(page.banner_title));

    return branchesPage ? `/category/page/${branchesPage.page_url}` : "#";
  };

  const branchesLink = findBranchesPage();

  return (
    <>
      {contactData?.data?.map((contact) => (
        <div id={id} className="grid lg:grid-cols-2 gap-y-4 gap-x-4 mt-[3rem] relative">
          {/* Set relative positioning */}
          <div className="h-[70vh] relative">
            <iframe
              src={contact.location1}
              width="100%"
              height="100%"
              allowFullScreen={true}
              loading="lazy"
              className=""
            ></iframe>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
              <Link to="/ATM">
                <Triangle
                  textMarginX={-20}
                  w={90}
                  h={250}
                  direction="right"
                  color="#44a6e8"
                  textRotation={-90}
                >
                  POS & ATM
                </Triangle>
              </Link>
            </div>
          </div>
          <div className="h-[70vh] relative">
            <iframe
              src={contact.location2}
              width="100%"
              height="100%"
              allowFullScreen={true}
              loading="lazy"
              className=""
            ></iframe>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <Link to={branchesLink}>
                <Triangle w={90} h={250} direction="left" color="#44a6e8">
                  {t('فروعنا')}
                </Triangle>
              </Link>
            </div>
            <div style={{boxShadow:'0px 4px 4px 4px #00000040'}} className="absolute right-32 bottom-10 lg:block md:hidden hidden rounded-sm">
              {homePageData?.data?.map((homePage) => (
                <div
                  key={homePage.id}
                  className="w-[26rem] h-[15rem] bg-white p-4 flex gap-x-2"
                >
                  <img className="w-[50%] object-cover" src={homePage.image_location} />
                  <div>
                    <h1 className="text-[#000000] font-[700] text-[1.2rem]">
                      {homePage.title_location}{" "}
                    </h1>
                    <p className="text-[#000000] font-[400] text-[0.9rem] mt-[0.5rem]">
                      {homePage.description_location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GoogleMaps;