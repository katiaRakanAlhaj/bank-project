import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import arabicFlag from "../assets/images/arabic flag.png";
import englishFlag from "../assets/images/english falg.png";
import kerdiEnglish from "../assets/images/kerdi flag.png";
import logo from "../assets/images/logologo 2.png";
import logo1 from "../assets/images/logo1.png";
import { MyContext } from "../component/store/store";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import useFetchData from "../hooks/useFetchData";
import { IoMdArrowDropdown } from "react-icons/io";
import i18next from "i18next";
import Fuse from "fuse.js";
const LanguageDropdown = ({ isOpen, onLanguageChange }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`absolute z-20 top-[6.4rem] ${i18next.language == "en"?'right-2':'left-2 '} bg-white shadow-lg transition-all duration-300 ${
        isOpen ? "max-h-[10rem] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <ul className="flex flex-col">
        <li
          className="flex items-center p-2 cursor-pointer hover:bg-gradient-to-l from-[#172B62] to-[#2F57C8] gap-x-2"
          onClick={() => onLanguageChange("ar")}
        >
          <img src={arabicFlag} alt="Arabic" className="w-4 h-4 mr-2" />
          <span>{t("العربية")}</span>
        </li>
        <li
          className="flex items-center p-2 cursor-pointer hover:bg-gradient-to-l from-[#172B62] to-[#2F57C8] gap-x-2"
          onClick={() => onLanguageChange("en")}
        >
          <img src={englishFlag} alt="English" className="w-4 h-4 mr-2" />
          <span>{t("الانكليزية")}</span>
        </li>
        <li
          className="flex items-center p-2 cursor-pointer hover:bg-gradient-to-l from-[#172B62] to-[#2F57C8] gap-x-2"
          onClick={() => onLanguageChange("ku")}
        >
          <img src={kerdiEnglish} alt="Kurdish" className="w-4 h-4 mr-2" />
          <span>{t("الكردية")}</span>
        </li>
      </ul>
    </div>
  );
};

const excludedTitles = [
    "فروعنا", // Arabic
    "Our Branches", // English
    "شاخەکانمان", // Kurdish
    "شركائنا", // Arabic
    "Our Partners", // English
    "شریکەکانمان", // Kurdish
    "نصائح وإرشادات",
    "شانەکان و ڕێنماییەکان",
    "شکاوەکانی کڕیارەکان",
    "شون و رێبەریە",
    "شكوى العملاء",
    "گیلەی کڕیاران",
    "شەعبەکانیمان",
    "هەواڵ",
    "News",
    "الاخبار",
    "هاوپەیمانەکانمان",
    "Tips and Guidelines",
    " Customer Complaints",
    "حقوق وواجبات العميل",
    "ماف و بەرپرسیارییەکانی کڕیار",
    "Customer Rights and Responsibilities",
    "هاوپەیمانەکانمان"
  ];
const Dropdown = ({
  title,
  items,
  isOpen,
  toggle,
  closeDropdown,
  closeMobileMenu,
  categoryData,
}) => {
  const navigate = useNavigate();
  const handleItemClick = (item) => {
    if (isOpen) {
      const page = categoryData?.categories
        .flatMap((category) => category.pages)
        .find((page) => page.banner_title === item);
      if (page) {
        navigate(`/category/page/${page.page_url}`);
      }
      closeDropdown();
      closeMobileMenu();
    }
  };

  return (
    <div className="relative w-full mb-4">
      <p
        onClick={toggle}
        className="cursor-pointer text-white flex items-center justify-between w-full"
      >
        {title}
        {i18next.language == "en" ? (
          <MdOutlineArrowRight
            className={`text-[1.5rem] text-white transition-transform duration-500 ease-linear ${
              isOpen ? "-rotate-90" : ""
            }`}
          />
        ) : (
          <MdOutlineArrowLeft
            className={`text-[1.5rem] text-white transition-transform duration-500 ease-linear ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        )}
      </p>
      <div
        className={`w-full bg-white transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[60vh] overflow-auto" : "max-h-0 overflow-hidden"
        }`}
      >
        <ul className={`${isOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
          <div className="w-full h-[0.2rem] bg-secondary"></div>
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(item)}
              className="flex items-center text-[1rem] font-[400] text-[#525252] p-2 h-[4rem] hover:bg-gradient-to-l from-[#172B62] to-[#2F57C8] hover:text-white cursor-pointer border-b border-dashed border-[#C4C4C4]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
const NavbarMobile = () => {
  const [isCircleClicked, setCircleClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const { language, setLanguage } = useContext(MyContext);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const { data: categoryData } = useFetchData("categories-with-pages-content");
  const { t } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "ar";
    setLanguage(storedLanguage);
    setSelectedLanguage(storedLanguage);
    i18n.changeLanguage(storedLanguage);
  }, [setLanguage]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const handleDropdownToggle = (index) => {
    if (dropdownOpenIndex === index) {
      setDropdownOpenIndex(null);
    } else {
      setDropdownOpenIndex(index);
    }
  };

  const handleLanguageChange = (lang) => {
    setLoading(true);
    setLanguage(lang);
    window.location.reload();

    localStorage.setItem("language", lang);
    i18n
      .changeLanguage(lang)
      .then(() => {
        setLoading(false);
        setSelectedLanguage(lang);
        setIsMobileMenuOpen(false);
        setCircleClicked(false);
      })
      .catch(() => setLoading(false));
  };

  const handleCircleClick = () => {
    setCircleClicked(!isCircleClicked);
    setLanguageDropdownOpen(!isLanguageDropdownOpen);
    if (!isLanguageDropdownOpen) {
      closeAllDropdowns();
    }
  };

  // Fuse.js setup for searching specific pages
  const partnersPhrases = ["شركائنا", "our partners", "شریکەکانمان"];
  const branchesPhrases = ["فروعنا", "our branches", "شاخەکانمان"];
  const customerComplaintsPhrases = [
    "شكاوي العملاء",
    "ملاحظات العملاء",
    "تظلمات العملاء",
    "شكاوى الزبائن",
    "مخاوف العملاء",
    "أخطاء العملاء",
    "ملاحظات الزبائن",
    "تذمر العملاء",
    "أصوات العملاء",
    "Customer Complaints",
    "Customer Grievances",
    "Client Concerns",
    "Customer Issues",
    "Customer Feedback",
    "Customer Dissatisfactions",
    "Customer Disputes ",
    "Customer Problems",
    "Customer Queries",
    "شکاویەکانی کڕیار",
    "پێداچوونەوەی کڕیار",
    "کێشەکانی کڕیار",
    "ھەڵەکان و کێشەکانی کڕیار",
    "تێکۆشانی کڕیار",
    "ناکۆکییەکانی کڕیار بەرامبەر بە کۆمپانیاکان ",
    "پێدانی دەستەواژەی کڕیار",
    "پێدانی دەستەواژەی کڕیار",
  ];  
  const fuseOptions = {
    includeScore: true,
    threshold: 0.4,
  };
  const fuseCustomerComplaints = new Fuse(
    customerComplaintsPhrases,
    fuseOptions
  );
  const fusePartners = new Fuse(partnersPhrases, fuseOptions);
  const fuseBranches = new Fuse(branchesPhrases, fuseOptions);
  
  const isPartners = (title) => {
    const results = fusePartners.search(title);
    return results.length > 0 && results[0].score < 0.4;
  };
  
  const isBranches = (title) => {
    const results = fuseBranches.search(title);
    return results.length > 0 && results[0].score < 0.4;
  };
  

  const isCustomerComplaints = (title) => {
    const results = fuseCustomerComplaints.search(title);
    return results.length > 0 && results[0].score < 0.4;
  };
  // Find specific pages
  const partnersPage = categoryData?.categories
    ?.flatMap((category) => category.pages)
    .find((page) => isPartners(page.banner_title));
  
  const branchesPage = categoryData?.categories
    ?.flatMap((category) => category.pages)
    .find((page) => isBranches(page.banner_title));
  


  const tipsAndGuidelinesPage = categoryData?.categories
    ?.flatMap((category) => category.pages)
    .find((page) => page.banner_title === "نصائح وإرشادات");

    const tipsComplaintPage = categoryData?.categories
    ?.flatMap((category) => category.pages)
    .find((page) => isCustomerComplaints(page.banner_title));
  const subMenu = [
    { title: t("اتصل بنا"), action: "/contact" },
    { 
      title: t("الشركاء"), 
      action: partnersPage ? `/category/page/${partnersPage.page_url}` : null 
    },
    { 
      title: `(POS) ${t("و")} (ATM)`,
      action: "ATM",
    },
    {
      title: t("شكاوى العملاء"),
      action: tipsAndGuidelinesPage
        ? `/category/page/${tipsComplaintPage?.page_url}`
        : null,
    },    { title: t("IBAN"), action: "/IBAN" },
    {
      title: t("نصائح وإرشادات"),
      action: tipsAndGuidelinesPage ? `/category/page/${tipsAndGuidelinesPage.page_url}` : null,
    },
    { 
      title: t("فروعنا"), 
      action: branchesPage ? `/category/page/${branchesPage.page_url}` : null 
    },
  ];

  // Generate dropdown items from categories
  // const allDropdownItems = categoryData?.categories?.map((category) => ({
  //   title: category.name,
  //   items: category.pages.map((page) => page.banner_title),
  // })) || [];
  const allDropdownItems =
    categoryData?.categories?.map((category) => ({
      title: category.name,
      items: category.pages
        .map((page) => page.banner_title)
        .filter((title) => {
          console.log(title); // Log each title
          return !excludedTitles.includes(title); // Check if it's excluded
        }), // Exclude titles in the excludedTitles array
    })) || [];
  // Split into main categories (first 5) and more categories (the rest)
  const mainDropdownItems = allDropdownItems.slice(0, 5);
  const moreDropdownItems = allDropdownItems.slice(5);

  return (
    <div className="absolute z-20 w-full bg-transparent">
      {/* Mobile Navbar */}
      <div className="flex justify-between items-center py-2">
      {!isMobileMenuOpen && (
          <Link to="/" className="flex items-center flex-col">
            <img className={`w-[4rem] absolute top-2 ${i18next.language == "en"?'left-8':'right-8'}`} src={logo1} alt="Logo 1" />
            <img className={`w-[10rem] absolute top-20 right-8 ${i18next.language == "en"?'left-8':'right-8'}`} src={logo} alt="Logo 1" />

          </Link>
        )}
        
        <button
          onClick={toggleMobileMenu}
          className={`text-3xl z-30 text-white absolute ${i18next.language == "en"?'right-2':'left-2'} top-2`}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      {/* Mobile Menu Items */}
      <div
        style={{ maxHeight: "100%", overflowY: "auto" }}
        className={`fixed inset-0 bg-primary  flex flex-col items-start p-5 transition-all duration-500 ease-linear ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
     <div className="flex">
     <div className="flex flex-col">
          <div className="w-[6rem] bg-[#2F57C8] h-[6rem] rotate-[-45deg] flex items-center justify-center">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img className="w-[5rem] rotate-[45deg]" src={logo1} alt="Logo 1" />
            </Link>
          </div>
          <div>
            <img
              className="w-[15rem] mt-[1rem] mb-[1rem]"
              src={logo}
              alt="Logo"
            />
          </div>
        </div>
        <div 
          className={`w-[3rem] h-[3rem] ${
            isCircleClicked
              ? "bg-secondary rounded-full"
              : "bg-[#57C82F] rotate-[-45deg]"
          }  mt-[2rem] absolute ${i18next.language == "en"?'right-4':'left-4'} ${isCircleClicked ? "bg-secondary rounded-full" : "bg-[#57C82F]"} flex justify-center items-center cursor-pointer`}
          onClick={handleCircleClick}
        >
          {isCircleClicked ? (
            <IoMdArrowDropdown className="text-white text-[2.5rem]" />
          ) : (
            <p className="text-[#FFFFFF] rotate-[45deg]">
              {selectedLanguage === 'ar' ? 'AR' : selectedLanguage === 'en' ? 'EN' : 'ku'}
            </p>
          )}
        </div>
     </div>
     
        {/* Main Category Dropdowns (first 5) */}
        {mainDropdownItems.map((dropdown, index) => (
          <Dropdown
            key={index}
            title={dropdown.title}
            items={dropdown.items}
            isOpen={dropdownOpenIndex === index}
            toggle={() => handleDropdownToggle(index)}
            closeDropdown={() => setDropdownOpenIndex(null)}
            closeMobileMenu={() => setIsMobileMenuOpen(false)}
            categoryData={categoryData}
          />
        ))}
        
        {/* More Dropdown if there are additional categories */}
        {moreDropdownItems.length > 0 && (
          <Dropdown
            title={t("مزيد")}
            items={moreDropdownItems.flatMap(item => item.items)}
            isOpen={dropdownOpenIndex === mainDropdownItems.length}
            toggle={() => handleDropdownToggle(mainDropdownItems.length)}
            closeDropdown={() => setDropdownOpenIndex(null)}
            closeMobileMenu={() => setIsMobileMenuOpen(false)}
            categoryData={categoryData}
          />
        )}

        {/* Submenu Links */}
        {subMenu.map((submenu, index) =>
          submenu.action ? (
            <Link
              to={submenu.action}
              key={index}
              className="font-[400] text-white text-[1rem] mb-[1rem]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {submenu.title}
            </Link>
          ) : (
            <span
              key={index}
              className="font-[400] text-white text-[1rem] mb-[1rem] cursor-default"
            >
              {submenu.title}
            </span>
          )
        )}
        
        {/* Language Selector */}
      
        
        {/* Language Dropdown */}
        {isCircleClicked && (
          <LanguageDropdown
            isOpen={isLanguageDropdownOpen}
            onLanguageChange={handleLanguageChange}
          />
        )}
      </div>
    </div>
  );
};

export default NavbarMobile;