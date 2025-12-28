// import {
//   useState,
//   useRef,
//   useEffect,
//   useContext,
//   useCallback,
//   memo,
// } from "react";
// import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
// import { IoMdArrowDropdown } from "react-icons/io";
// import logo from "../assets/images/logologo 2.png";
// import logo1 from "../assets/images/logo1.png";
// import { Link, useNavigate } from "react-router-dom";
// import arabicFlag from "../assets/images/arabic flag.png";
// import englishFlag from "../assets/images/english falg.png";
// import kerdiEnglish from "../assets/images/kerdi flag.png";
// import { MyContext } from "../component/store/store";
// import i18n from "../i18n"; // Assuming you have i18n set up for internationalization
// import { useTranslation } from "react-i18next";
// import Loader from "../component/loader/loader";
// import i18next from "i18next";
// import useFetchData from "../hooks/useFetchData";
// import Fuse from "fuse.js";
// import { FaSearch } from "react-icons/fa"; // Import the search icon
// import wifi from "../assets/images/wifi.png";
// // LanguageDropdown Component
// const LanguageDropdown = ({ isOpen, onLanguageChange }) => {
//   const { t } = useTranslation();
//   return (
//     <div
//       className={`absolute top-[8rem] ${
//         i18next.language == "ar" || i18next.language === "ku"
//           ? "right-8"
//           : "left-8"
//       } bg-white shadow-lg transition-all duration-300 ${
//         isOpen ? "max-h-[10rem] opacity-100" : "max-h-0 opacity-0"
//       }`}
//     >
//       <ul className="flex flex-col">
//         <li
//           className="flex items-center p-2 cursor-pointer hover:bg-gradient-to-l from-[#172B62] to-[#2F57C8] gap-x-2"
//           onClick={() => onLanguageChange("ar")}
//         >
//           <img src={arabicFlag} alt="Arabic" className="w-4 h-4 mr-2" />
//           <span>{t("العربية")}</span>
//         </li>
//         <li
//           className="flex items-center p-2 cursor-pointer hover:bg-gradient-to-l from-[#172B62] to-[#2F57C8] gap-x-2"
//           onClick={() => onLanguageChange("en")}
//         >
//           <img src={englishFlag} alt="English" className="w-4 h-4 mr-2" />
//           <span>{t("الانكليزية")}</span>
//         </li>
//         <li
//           className="flex items-center p-2 cursor-pointer hover:bg-gradient-to-l from-[#172B62] to-[#2F57C8] gap-x-2"
//           onClick={() => onLanguageChange("ku")}
//         >
//           <img src={kerdiEnglish} alt="Kurdish" className="w-4 h-4 mr-2" />
//           <span>{t("الكردية")}</span>
//         </li>
//       </ul>
//     </div>
//   );
// };

// // Dropdown Component (Memoized)
// const Dropdown = memo(
//   ({ title, items, isOpen, toggle, closeDropdown, categoryData }) => {
//     const navigate = useNavigate();
//     const handleItemClick = (item) => {
//       if (isOpen) {
//         // Find the page_id based on the item clicked
//         const page = categoryData?.categories
//           .flatMap((category) => category.pages)
//           .find((page) => page.banner_title === item);
//         if (page) {
//           navigate(`/category/page/${page.page_url}`); // Navigate to the URL with page_id
//         }
//         closeDropdown();
//       }
//     };

//     return (
//       <div className="relative flex justify-center items-center">
//         <p
//           onClick={toggle}
//           className="cursor-pointer text-[#FFFFFF] flex items-center"
//         >
//           {title}
//           {i18n.language == "ar" || i18n.language == "ku" ? (
//             <MdOutlineArrowLeft
//               className={`text-[1.5rem] text-[#FFFFFF] transition-transform duration-500 ease-linear ${
//                 isOpen ? "rotate-90" : ""
//               }`}
//             />
//           ) : (
//             <MdOutlineArrowRight
//               className={`text-[1.5rem] text-[#FFFFFF] transition-transform duration-500 ease-linear ${
//                 isOpen ? "rotate-[-90deg]" : ""
//               }`}
//             />
//           )}
//         </p>
//         <div
//           className={`absolute scroll overflow-auto bg-white top-[4.5rem] text-black ${
//             i18n.language == "ar" || i18n.language == "ku"
//               ? "right-0"
//               : "left-0"
//           } w-[20rem] shadow-lg transition-all duration-1000 ease-in-out ${
//             isOpen ? "max-h-[60vh]" : "max-h-0 h-0"
//           }`}
//         >
//           <ul
//             className={`${
//               isOpen ? "opacity-100" : "opacity-0"
//             } transition-opacity duration-1000`}
//           >
//             <div className="w-full h-[0.2rem] bg-secondary"></div>
//             {items.map((item, index) => (
//               <li
//                 key={index}
//                 onClick={() => handleItemClick(item)}
//                 className="flex items-center text-[1rem] font-[400] text-[#525252] p-2 h-[4rem] hover:bg-gradient-to-l from-[#172B62] to-[#2F57C8] hover:text-white cursor-pointer border-b border-dashed border-[#C4C4C4]"
//               >
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     );
//   }
// );

// // Navbar Component
// const Navbar = () => {
//   const [loading, setLoading] = useState(false);
//   const { language, setLanguage } = useContext(MyContext);
//   const [selectedLanguage, setSelectedLanguage] = useState(language);
//   const { data: categoryData } = useFetchData("categories-with-pages-content");
//   const { t } = useTranslation();
//   // const [isSubMenuItemClicked, setSubMenuItemClicked] = useState(false);
//   const [clickedSubMenuIndex, setClickedSubMenuIndex] = useState(null); // State for clicked submenu index

//   useEffect(() => {
//     const storedLanguage = localStorage.getItem("language") || "ar";
//     setLanguage(storedLanguage);
//     setSelectedLanguage(storedLanguage);
//     i18n.changeLanguage(storedLanguage);
//   }, [setLanguage]);

//   // Initialize dropdown states - we'll need one more for the "More" dropdown
//   const [isDropdownOpen, setDropdownOpen] = useState([
//     false,
//     false,
//     false,
//     false,
//     false,
//     false, // 5 for categories + 1 for More
//   ]);
//   const navigate = useNavigate();
//   const [isCircleClicked, setCircleClicked] = useState(false);
//   const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);

//   const handleCircleClick = () => {
//     setCircleClicked(!isCircleClicked);
//     setLanguageDropdownOpen(!isLanguageDropdownOpen);
//     if (!isLanguageDropdownOpen) {
//       closeAllDropdowns();
//     }
//   };

//   const toggleDropdown = useCallback((index) => {
//     setDropdownOpen((prev) =>
//       prev.map((_, i) => (i === index ? !prev[i] : false))
//     );
//   }, []);

//   const closeAllDropdowns = useCallback(
//     () => setDropdownOpen([false, false, false, false, false, false]),
//     []
//   );
//   // array for itmes wich i delete it
//   const excludedTitles = [
//     "فروعنا", // Arabic
//     "Our Branches", // English
//     "شاخەکانمان", // Kurdish
//     "شركائنا", // Arabic
//     "Our Partners", // English
//     "شریکەکانمان", // Kurdish
//     "نصائح وإرشادات",
//     "شانەکان و ڕێنماییەکان",
//     "شکاوەکانی کڕیارەکان",
//     "شون و رێبەریە",
//     "شكوى العملاء",
//     "گیلەی کڕیاران",
//     "شەعبەکانیمان",
//     "هەواڵ",
//     "News",
//     "الاخبار",
//     "هاوپەیمانەکانمان",
//     "Tips and Guidelines",
//     " Customer Complaints",
//     "حقوق وواجبات العميل",
//     "ماف و بەرپرسیارییەکانی کڕیار",
//     "Customer Rights and Responsibilities",
//     "هاوپەیمانەکانمان"
//   ];

//   // Generate dropdownItems from the fetched categoryData
//   const allDropdownItems =
//     categoryData?.categories?.map((category) => ({
//       title: category.name,
//       items: category.pages
//         .map((page) => page.banner_title)
//         .filter((title) => {
//           console.log(title); // Log each title
//           return !excludedTitles.includes(title); // Check if it's excluded
//         }), // Exclude titles in the excludedTitles array
//     })) || [];
//   // Split into main categories (first 5) and more categories (the rest)
//   const mainDropdownItems = allDropdownItems.slice(0, 5);
//   const moreDropdownItems = allDropdownItems.slice(5);

//   // Rest of your existing code (customer complaints phrases, fuse options, etc.)
//   const customerComplaintsPhrases = [
//     "شكاوي العملاء",

//     "Customer Complaints",
// "شکاوەکانی کڕیارەکان",

//   ];
//   const tipsAndGuidelinesPhrases = [
//     "نصائح وإرشادات",
//     "Tips and Guidelines",
//     "شانەکان و ڕێنماییەکان",
//   ];
//   const customerPhrases = [
//     "حقوق وواجبات العميل",
//     "Rights and Duties of the Client",
//     "ماف و بەرپرسیارییەکانی کڕیار",
//   ];
//   // Array of news phrases in different languages
//   const newsPhrases = ["الأخبار", "News", "هەواڵ"];
//   const partnersPhrases = ["شركائنا", "Our Partners", "هاوپەیمانەکانمان"];
//   const branchesPhrases = ["فروعنا", "our branches", "شاخەکانمانن"];
//   const fuseOptions = {
//     includeScore: true,
//     threshold: 0.4,
//   };
//   const fuseNews = new Fuse(newsPhrases, fuseOptions);
//   const isNews = (title) => {
//     const results = fuseNews.search(title);
//     return results.length > 0 && results[0].score < 0.4;
//   };
//   const fusePartners = new Fuse(partnersPhrases, fuseOptions);
//   const isPartners = (title) => {
//     return partnersPhrases.includes(title);
//   };
//   const fuseBranches = new Fuse(branchesPhrases, fuseOptions);
//   const isBranches = (title) => {
//     const results = fuseBranches.search(title);
//     return results.length > 0 && results[0].score < 0.4;
//   };
//   const fuseTipsAndGuidelines = new Fuse(tipsAndGuidelinesPhrases, fuseOptions);
//   const fuseCustomerComplaints = new Fuse(
//     customerComplaintsPhrases,
//     fuseOptions
//   );
//   const fuseCustomer = new Fuse(customerPhrases, fuseOptions);
//   const isTipsAndGuidelines = (title) => {
//     const results = fuseTipsAndGuidelines.search(title);
//     return results.length > 0 && results[0].score < 0.4;
//   };
//   const isCustomerComplaints = (title) => {
//     const results = fuseCustomerComplaints.search(title);
//     return results.length > 0 && results[0].score < 0.4;
//   };
//   const isCustomer = (title) => {
//     const results = fuseCustomer.search(title);
//     return results.length > 0 && results[0].score < 0.4;
//   };
//   const tipsAndGuidelinesPage = categoryData?.categories
//     ?.flatMap((category) => category.pages)
//     .find((page) => isTipsAndGuidelines(page.banner_title));

//   const tipsComplaintPage = categoryData?.categories
//     ?.flatMap((category) => category.pages)
//     .find((page) => isCustomerComplaints(page.banner_title));
//   const tipsCustomerPage = categoryData?.categories
//     ?.flatMap((category) => category.pages)
//     .find((page) => isCustomer(page.banner_title));
//   // const tipsPartnersPage = categoryData?.categories
//   //   ?.flatMap((category) => category.pages)
//   //   .find((page) => isPartners(page.banner_title));
//   const tipsPartnersPage = categoryData?.categories
//   ?.flatMap((category) => category.pages)
//   .find((page) => partnersPhrases.includes(page.banner_title));
//   const tipsBranchesPage = categoryData?.categories
//     ?.flatMap((category) => category.pages)
//     .find((page) => isBranches(page.banner_title));
//   const tipsNewsPage = categoryData?.categories
//     ?.flatMap((category) => category.pages)
//     .find((page) => isNews(page.banner_title));
//   const subMenu = [
//     { title: t("اتصل بنا"), action: "/contact" },
//     {
//       title: t("شكاوى العملاء"),
//       action: tipsAndGuidelinesPage
//         ? `/category/page/${tipsComplaintPage?.page_url}`
//         : null,
//     },
//     { title: t("IBAN"), action: "/IBAN" },
//     {
//       title: t("نصائح وإرشادات"),
//       action: tipsAndGuidelinesPage
//         ? `/category/page/${tipsAndGuidelinesPage?.page_url}`
//         : null,
//     },
//     {
//       title: `(POS) ${t("و")} (ATM)`,
//       action: "ATM",
//     },
//     {
//       title: t("حقوق وواجبات العميل"),
//       action: tipsCustomerPage
//         ? `/category/page/${tipsCustomerPage?.page_url}`
//         : null,
//     },
//     { title: t("الاسثلة الاكثر تكرارا"), action: "/moreFaq" },
//     {
//       title: t("الشركاء"),
//       action: tipsPartnersPage
//         ? `/category/page/${tipsPartnersPage?.page_url}`
//         : null,
//     },
//     {
//       title: t("فروعنا"),
//       action: tipsBranchesPage
//         ? `/category/page/${tipsBranchesPage?.page_url}`
//         : null,
//     },
//     {
//       title: t("الأخبار"),
//       action: tipsNewsPage ? `/category/page/${tipsNewsPage?.page_url}` : null,
//     },
//   ];

//   const isAnyDropdownOpen =
//     isDropdownOpen.some((open) => open) || isLanguageDropdownOpen;

//   const handleLanguageChange = (lang) => {
//     setLoading(true);
//     setLanguage(lang);
//     window.location.reload();
//     localStorage.setItem("language", lang);
//     i18n
//       .changeLanguage(lang)
//       .then(() => setLoading(false))
//       .catch(() => setLoading(false));
//     // window.location.reload();
//   };

//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       try {
//         const response = await fetch(
//           `https://inibiq.hostorr.net/api/pages/search?title=${encodeURIComponent(
//             searchQuery
//           )}`
//         );
//         const data = await response.json();
//         if (data.pages.length > 0) {
//           const page = data.pages[0];
//           if (page.slider_id !== null) {
//             navigate(`/slider/${page.page_url}`);
//           } else if (page.service_id !== null) {
//             navigate(`/service/${page.page_url}`);
//           } else if (page.account_id !== null) {
//             navigate(`/account/${page.page_url}`);
//           } else if (page.event_id !== null) {
//             navigate(`/event/${page.page_url}`);
//           } else if (page.card_id !== null) {
//             navigate(`/card/${page.page_url}`);
//           } else {
//             navigate(`/category/page/${page.page_url}`);
//           }
//         } else {
//           alert("No results found");
//         }
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       }
//     }
//   };

//   return (
//     <>
//       <nav>
//         <div
//           style={{
//             background:
//               "linear-gradient(270deg ,#172B62 0.59%, #2F57C8 100.35%)",
//             width: "95%",
//             height: "7.5rem",
//           }}
//           className="flex items-center justify-between z-20 px-[2rem] absolute top-4 w-full h-[10rem]"
//         >
//           <div
//             className={`w-[3rem] h-[3rem]  ${
//               isCircleClicked
//                 ? "bg-secondary rounded-full"
//                 : "bg-[#57C82F] rotate-[-45deg]"
//             } flex justify-center items-center cursor-pointer`}
//             onClick={handleCircleClick}
//           >
//             {isCircleClicked ? (
//               <IoMdArrowDropdown className="text-white text-[2.5rem]" />
//             ) : (
//               <p className="text-[#FFFFFF] rotate-[45deg]">
//                 {selectedLanguage === "ar"
//                   ? "AR"
//                   : selectedLanguage === "en"
//                   ? "EN"
//                   : "ku"}
//               </p>
//             )}
//           </div>
//           {isCircleClicked && (
//             <LanguageDropdown
//               isOpen={isLanguageDropdownOpen}
//               onLanguageChange={handleLanguageChange}
//             />
//           )}

//           {/* Render first 5 categories */}
//           {mainDropdownItems.map((dropdown, index) => (
//             <div key={index} className="flex">
//               <Dropdown
//                 title={dropdown.title}
//                 items={dropdown.items}
//                 isOpen={isDropdownOpen[index]}
//                 toggle={() => toggleDropdown(index)}
//                 closeDropdown={closeAllDropdowns}
//                 categoryData={categoryData}
//               />
//             </div>
//           ))}

//           {/* Render "More" dropdown if there are additional categories */}
//           {moreDropdownItems.length > 0 && (
//             <div className="flex items-center gap-x-2 cursor-pointer relative">
//               <Dropdown
//                 title={t("مزيد")}
//                 items={moreDropdownItems.flatMap((item) => item.items)}
//                 isOpen={isDropdownOpen[5]} // Using the 6th position for More dropdown
//                 toggle={() => toggleDropdown(5)}
//                 closeDropdown={closeAllDropdowns}
//                 categoryData={categoryData}
//               />
//             </div>
//           )}

//           <div className="flex">
//             <Link to="/">
//               <img
//                 className={`w-[20rem]  ${
//                   i18n.language == "ar" || i18n.language == "ku"
//                     ? "ml-[3rem]"
//                     : "mr-[3rem]"
//                 }`}
//                 src={logo}
//                 alt="Logo"
//               />
//             </Link>
//           </div>
//           <div
//             className={`w-[6rem] absolute  bg-[#2F57C8] h-[6rem] rotate-[-45deg] flex items-center justify-center ${
//               i18n.language == "ar" || i18n.language == "ku"
//                 ? "left-[-3rem]"
//                 : "right-[-3rem]"
//             }`}
//           >
//             <Link to="/">
//               <img
//                 className="w-[5rem] rotate-[45deg]"
//                 src={logo1}
//                 alt="Logo 1"
//               />
//             </Link>
//           </div>
//         </div>
//       </nav>
//       {/* New Div Below Navbar */}
//       <div>
//         <div
//           className={`h-[3.5rem] flex items-center gap-x-4 p-2 text-center absolute z-50 top-[8.5rem] ${
//             i18next.language == "en" ? "left-1" : "right-1"
//           } w-[88%]
//         transition-all duration-500 ease-in-out  ${
//           isAnyDropdownOpen ? "max-h-0 opacity-0" : " max-h-screen"
//         }`}
//           style={{
//             background:
//               i18next.language === "en"
//                 ? "linear-gradient(-270deg, #2A8F07 96.4%, rgba(0, 0, 0, 0) 100%)"
//                 : "linear-gradient(270deg, #2A8F07 96.4%, rgba(0, 0, 0, 0) 100%)",
//           }}
//         >
//           <div className="relative flex items-center">
//             <form onSubmit={handleSearch}>
//               <div className="flex items-center">
//                 <input
//                   type="search"
//                   className={`rounded-full px-6 py-1 placeholder-[#666666] ${i18next.language == "ku"?'w-[9rem]':''}`}
//                   placeholder={t("البحث عن صفحة")}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button type="submit">
//                   {/* <FaSearch
//                     className={`absolute top-[0.6rem] ${
//                       i18next.language == "en" ? "left-1" : "right-1"
//                     }  text-[#666666]`}
//                   /> */}
//                 </button>
//               </div>
//             </form>
//           </div>
//           {
// .map((submenu, index) =>
//             submenu.action ? (
//               <Link
//                 to={submenu.action}
//                 key={index}
//                 className={`font-[400] text-nowrap text-[white] ${i18next.language == "ku"?'text-[0.85rem]':'text-[1rem]'} relative ${
//                   clickedSubMenuIndex === index ? "font-bold" : ""
//                 }`}
//                 onClick={() => setClickedSubMenuIndex(index)} // Update clicked index
//               >
//                 {submenu.title}
//                 {clickedSubMenuIndex === index && ( // Show shadow only for clicked item
//                   <div
//                     style={{
//                       boxShadow: "0px -4px 10px 0px #FFFFFF",
//                     }}
//                     className="w-full h-[0.3rem] rounded-full bg-white absolute -bottom-4"
//                   ></div>
//                 )}
//               </Link>
//             ) : null
//           )}
//         </div>
//         <div
//           className={`flex items-center absolute z-50 top-40 mt-[0.3rem] ${
//             i18next.language == "en" ? "right-48" : "left-40"
//           }`}
//         >
//           <a
//             target="_blank"
//             href="https://mobile.inibiq.iq/IBS/Rl5IW1xkVwNzUTxYQFwIBS2012.do?TF5dRVNYViRTVS0IBS2012=Rl5IW1wb&WkNAUVdZQQIBS2012IBS2012=Xl5EV1wIBS2012&CHANGE_LANG_FLAG=0"
//             className="flex items-center"
//           >
//             <div
//               style={{
//                 background: "linear-gradient(90deg, #57C82F 0%, #2B6217 100%)",
//               }}
//               className={`flex justify-center  items-center text-white font-[700]  ${
//                 i18next.language == "en"
//                   ? "rounded-tr-full rounded-br-full -right-40"
//                   : "rounded-tl-full rounded-bl-full -left-32"
//               } absolute  w-[9rem] h-[2rem]
//               }`}
//             >
//               <p className={`absolute ${i18next.language == "en"?'right-[1rem]':''}`}>{t("اون لاين بنك")}</p>
//             </div>
//           </a>

//           <div className="w-[3rem] h-[3rem] rounded-full bg-[#57C82F] absolute left-0  z-10">
//             <a target="_blank" href="https://www.inibiq.iq/">
//               <img className="cursor-pointer" src={wifi} alt="WiFi Icon" />
//             </a>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Navbar;
import {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
  memo,
} from "react";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import logo from "../assets/images/logologo 2.png";
import logo1 from "../assets/images/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import arabicFlag from "../assets/images/arabic flag.png";
import englishFlag from "../assets/images/english falg.png";
import kerdiEnglish from "../assets/images/kerdi flag.png";
import { MyContext } from "../component/store/store";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import Loader from "../component/loader/loader";
import i18next from "i18next";
import useFetchData from "../hooks/useFetchData";
import Fuse from "fuse.js";
import { FaSearch } from "react-icons/fa";
import wifi from "../assets/images/wifi.png";

// LanguageDropdown Component
const LanguageDropdown = ({ isOpen, onLanguageChange }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`absolute top-[8rem] ${
        i18next.language == "ar" || i18next.language === "ku"
          ? "right-8"
          : "left-8"
      } bg-white shadow-lg transition-all duration-300 ${
        isOpen ? "max-h-[10rem] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <ul className="flex flex-col">
        <li
          className="flex items-center p-2 cursor-pointer hover:bg-gradient-to-l from-[#172B62] to-[#2F57C8] gap-x-2"
          onClick={() => onLanguageChange("ar")}
        >
          <img src={arabicFlag} alt="Arabic" className="w-4 h-4 mr-2" />
          <span>العربية</span>
        </li>
        <li
          className="flex items-center p-2 cursor-pointer hover:bg-gradient-to-l from-[#172B62] to-[#2F57C8] gap-x-2"
          onClick={() => onLanguageChange("en")}
        >
          <img src={englishFlag} alt="English" className="w-4 h-4 mr-2" />
          <span>English</span>
        </li>
        <li
          className="flex items-center p-2 cursor-pointer hover:bg-gradient-to-l from-[#172B62] to-[#2F57C8] gap-x-2"
          onClick={() => onLanguageChange("ku")}
        >
          <img src={kerdiEnglish} alt="Kurdish" className="w-4 h-4 mr-2" />
          <span>کوردی</span>
        </li>
      </ul>
    </div>
  );
};

// Dropdown Component (Memoized)
const Dropdown = memo(
  ({ title, items, isOpen, toggle, closeDropdown, categoryData }) => {
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
        // Don't reset clickedSubMenuIndex here - let it stay until another item is clicked
      }
    };
    return (
      <div className="relative flex justify-center items-center">
        <p
          onClick={toggle}
          className="cursor-pointer text-[#FFFFFF] flex items-center"
        >
          {title}
          {i18n.language == "ar" || i18n.language == "ku" ? (
            <MdOutlineArrowLeft
              className={`text-[1.5rem] text-[#FFFFFF] transition-transform duration-500 ease-linear ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          ) : (
            <MdOutlineArrowRight
              className={`text-[1.5rem] text-[#FFFFFF] transition-transform duration-500 ease-linear ${
                isOpen ? "rotate-[-90deg]" : ""
              }`}
            />
          )}
        </p>
        <div
          className={`absolute scroll overflow-auto bg-white top-[4.5rem] text-black ${
            i18n.language == "ar" || i18n.language == "ku"
              ? "right-0"
              : "left-0"
          } w-[20rem] shadow-lg transition-all duration-1000 ease-in-out ${
            isOpen ? "max-h-[60vh]" : "max-h-0 h-0"
          }`}
        >
          <ul
            className={`${
              isOpen ? "opacity-100" : "opacity-0"
            } transition-opacity duration-1000`}
          >
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
  }
);

// Navbar Component
const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const { language, setLanguage } = useContext(MyContext);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const { data: categoryData } = useFetchData("categories-with-pages-content");
  const { t } = useTranslation();
  const [clickedSubMenuIndex, setClickedSubMenuIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "ar";
    setLanguage(storedLanguage);
    setSelectedLanguage(storedLanguage);
    i18n.changeLanguage(storedLanguage);
  }, [setLanguage]);

  const [isDropdownOpen, setDropdownOpen] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const navigate = useNavigate();
  const [isCircleClicked, setCircleClicked] = useState(false);
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const handleCircleClick = () => {
    setCircleClicked(!isCircleClicked);
    setLanguageDropdownOpen(!isLanguageDropdownOpen);
    if (!isLanguageDropdownOpen) {
      closeAllDropdowns();
      setClickedSubMenuIndex(null); // Reset clicked submenu index
    }
  };

  const toggleDropdown = useCallback((index) => {
    setDropdownOpen((prev) =>
      prev.map((_, i) => (i === index ? !prev[i] : false))
    );
    setClickedSubMenuIndex(null); // Reset when opening a dropdown
  }, []);

  const closeAllDropdowns = useCallback(
    () => setDropdownOpen([false, false, false, false, false, false]),
    []
  );

  const excludedTitles = [
    "فروعنا",
    "Our Branches",
    "شاخەکانمان",
    "شركائنا",
    "Our Partners",
    "شریکەکانمان",
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
    "هاوپەیمانەکانمان",
  ];

  const allDropdownItems =
    categoryData?.categories?.map((category) => ({
      title: category.name,
      items: category.pages
        .map((page) => page.banner_title)
        .filter((title) => !excludedTitles.includes(title)),
    })) || [];

  const mainDropdownItems = allDropdownItems.slice(0, 5);
  const moreDropdownItems = allDropdownItems.slice(5);

  const customerComplaintsPhrases = [
    "شكاوي العملاء",
    "Customer Complaints",
    "شکاوەکانی کڕیارەکان",
  ];

  const tipsAndGuidelinesPhrases = [
    "نصائح وإرشادات",
    "Tips and Guidelines",
    "شانەکان و ڕێنماییەکان",
  ];

  const customerPhrases = [
    "حقوق وواجبات العميل",
    "Rights and Duties of the Client",
    "ماف و بەرپرسیارییەکانی کڕیار",
  ];

  const newsPhrases = ["الأخبار", "News", "هەواڵ"];
  const partnersPhrases = ["شركائنا", "Our Partners", "هاوپەیمانەکانمان"];
  const branchesPhrases = ["فروعنا", "our branches", "شاخەکانمانن"];

  const fuseOptions = {
    includeScore: true,
    threshold: 0.4,
  };

  const fuseNews = new Fuse(newsPhrases, fuseOptions);
  const isNews = (title) => {
    const results = fuseNews.search(title);
    return results.length > 0 && results[0].score < 0.4;
  };

  const fusePartners = new Fuse(partnersPhrases, fuseOptions);
  const isPartners = (title) => {
    return partnersPhrases.includes(title);
  };

  const fuseBranches = new Fuse(branchesPhrases, fuseOptions);
  const isBranches = (title) => {
    const results = fuseBranches.search(title);
    return results.length > 0 && results[0].score < 0.4;
  };

  const fuseTipsAndGuidelines = new Fuse(tipsAndGuidelinesPhrases, fuseOptions);
  const fuseCustomerComplaints = new Fuse(
    customerComplaintsPhrases,
    fuseOptions
  );
  const fuseCustomer = new Fuse(customerPhrases, fuseOptions);

  const isTipsAndGuidelines = (title) => {
    const results = fuseTipsAndGuidelines.search(title);
    return results.length > 0 && results[0].score < 0.4;
  };

  const isCustomerComplaints = (title) => {
    const results = fuseCustomerComplaints.search(title);
    return results.length > 0 && results[0].score < 0.4;
  };

  const isCustomer = (title) => {
    const results = fuseCustomer.search(title);
    return results.length > 0 && results[0].score < 0.4;
  };

  const tipsAndGuidelinesPage = categoryData?.categories
    ?.flatMap((category) => category.pages)
    .find((page) => isTipsAndGuidelines(page.banner_title));

  const tipsComplaintPage = categoryData?.categories
    ?.flatMap((category) => category.pages)
    .find((page) => isCustomerComplaints(page.banner_title));

  const tipsCustomerPage = categoryData?.categories
    ?.flatMap((category) => category.pages)
    .find((page) => isCustomer(page.banner_title));

  const tipsPartnersPage = categoryData?.categories
    ?.flatMap((category) => category.pages)
    .find((page) => partnersPhrases.includes(page.banner_title));

  const tipsBranchesPage = categoryData?.categories
    ?.flatMap((category) => category.pages)
    .find((page) => isBranches(page.banner_title));

  const tipsNewsPage = categoryData?.categories
    ?.flatMap((category) => category.pages)
    .find((page) => isNews(page.banner_title));

  const subMenu = [
    { title: t("اتصل بنا"), action: "/contact" },
    {
      title: t("شكاوى العملاء"),
      action: tipsComplaintPage
        ? `/category/page/${tipsComplaintPage?.page_url}`
        : null,
    },
    { title: t("IBAN"), action: "/IBAN" },
    {
      title: t("نصائح وإرشادات"),
      action: tipsAndGuidelinesPage
        ? `/category/page/${tipsAndGuidelinesPage?.page_url}`
        : null,
    },
    {
      title: `(POS) ${t("و")} (ATM)`,
      action: "ATM",
    },
    {
      title: t("حقوق وواجبات العميل"),
      action: tipsCustomerPage
        ? `/category/page/${tipsCustomerPage?.page_url}`
        : null,
    },
    { title: t("الاسثلة الاكثر تكرارا"), action: "/moreFaq" },
    {
      title: t("الشركاء"),
      action: tipsPartnersPage
        ? `/category/page/${tipsPartnersPage?.page_url}`
        : null,
    },
    {
      title: t("فروعنا"),
      action: tipsBranchesPage
        ? `/category/page/${tipsBranchesPage?.page_url}`
        : null,
    },
    {
      title: t("الأخبار"),
      action: tipsNewsPage ? `/category/page/${tipsNewsPage?.page_url}` : null,
    },
  ];

  const isAnyDropdownOpen =
    isDropdownOpen.some((open) => open) || isLanguageDropdownOpen;

  const handleLanguageChange = (lang) => {
    setLoading(true);
    setLanguage(lang);
    window.location.reload();
    localStorage.setItem("language", lang);
    i18n
      .changeLanguage(lang)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  // Use the useFetchData hook for search
  const { data: searchData, loading: searchLoading } = useFetchData(
    searchQuery.trim()
      ? `pages/search?title=${encodeURIComponent(searchQuery)}`
      : null
  );

  useEffect(() => {
    if (searchData?.pages) {
      setSearchResults(searchData.pages);
      setShowSearchResults(searchQuery.trim() !== "");
    } else {
      setSearchResults([]);
    }
  }, [searchData, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length > 0) {
      handleSearchResultClick(searchResults[0]);
    }
  };

  const handleSearchResultClick = (page) => {
    if (!page) return;
    setClickedSubMenuIndex(null); // Reset submenu highlight when clicking a search result

    if (page.slider_id !== null) {
      navigate(`/slider/${page.page_url}`);
    } else if (page.service_id !== null) {
      navigate(`/service/${page.page_url}`);
    } else if (page.account_id !== null) {
      navigate(`/account/${page.page_url}`);
    } else if (page.event_id !== null) {
      navigate(`/event/${page.page_url}`);
    } else if (page.card_id !== null) {
      navigate(`/card/${page.page_url}`);
    } else {
      navigate(`/category/page/${page.page_url}`);
    }
    setShowSearchResults(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav>
        <div
          style={{
            background:
              "linear-gradient(270deg ,#172B62 0.59%, #2F57C8 100.35%)",
            width: "95%",
            height: "7.5rem",
          }}
          className="flex items-center justify-between z-20 px-[2rem] absolute top-4 w-full h-[10rem]"
        >
          <div
            className={`w-[3rem] h-[3rem]  ${
              isCircleClicked
                ? "bg-secondary rounded-full"
                : "bg-[#57C82F] rotate-[-45deg]"
            } flex justify-center items-center cursor-pointer`}
            onClick={handleCircleClick}
          >
            {isCircleClicked ? (
              <IoMdArrowDropdown className="text-white text-[2.5rem]" />
            ) : (
              <p className="text-[#FFFFFF] rotate-[45deg]">
                {selectedLanguage === "ar"
                  ? "AR"
                  : selectedLanguage === "en"
                  ? "EN"
                  : "ku"}
              </p>
            )}
          </div>
          {isCircleClicked && (
            <LanguageDropdown
              isOpen={isLanguageDropdownOpen}
              onLanguageChange={handleLanguageChange}
            />
          )}

          {mainDropdownItems.map((dropdown, index) => (
            <div key={index} className="flex">
              <Dropdown
                title={dropdown.title}
                items={dropdown.items}
                isOpen={isDropdownOpen[index]}
                toggle={() => toggleDropdown(index)}
                closeDropdown={closeAllDropdowns}
                categoryData={categoryData}
                setClickedSubMenuIndex={setClickedSubMenuIndex} // Pass the function
              />
            </div>
          ))}

          {moreDropdownItems.length > 0 && (
            <div className="flex items-center gap-x-2 cursor-pointer relative">
              <Dropdown
                title={t("مزيد")}
                items={moreDropdownItems.flatMap((item) => item.items)}
                isOpen={isDropdownOpen[5]} // Using the 6th position for More dropdown
                toggle={() => toggleDropdown(5)}
                closeDropdown={closeAllDropdowns}
                categoryData={categoryData}
                setClickedSubMenuIndex={setClickedSubMenuIndex} // Pass the function
              />
            </div>
          )}

          <div className="flex">
            <Link to="/">
              <img
                className={`w-[20rem]  ${
                  i18n.language == "ar" || i18n.language == "ku"
                    ? "ml-[3rem]"
                    : "mr-[3rem]"
                }`}
                src={logo}
                alt="Logo"
              />
            </Link>
          </div>
          <div
            className={`w-[6rem] absolute  bg-[#2F57C8] h-[6rem] rotate-[-45deg] flex items-center justify-center ${
              i18n.language == "ar" || i18n.language == "ku"
                ? "left-[-3rem]"
                : "right-[-3rem]"
            }`}
          >
            <Link
              onClick={() => {
                setClickedSubMenuIndex(null);
                closeAllDropdowns();
              }}
              to="/"
            >
              <img
                className="w-[5rem] rotate-[45deg]"
                src={logo1}
                alt="Logo 1"
              />
            </Link>
          </div>
        </div>
      </nav>
      {/* New Div Below Navbar */}
      <div>
        <div
          className={`h-[3.5rem] flex items-center gap-x-4 p-2 text-center absolute z-50 top-[8.5rem]  w-[88%]
        transition-all duration-500 ease-in-out  ${
          isAnyDropdownOpen ? "max-h-0 opacity-0" : " max-h-screen"
        }`}
          style={{
            background:
              i18next.language === "en"
                ? "linear-gradient(-270deg, #2A8F07 96.4%, rgba(0, 0, 0, 0) 100%)"
                : "linear-gradient(270deg, #2A8F07 96.4%, rgba(0, 0, 0, 0) 100%)",
          }}
        >
          <div
            className="relative flex items-center"
            style={{ minWidth: "200px" }}
          >
            <form
              onSubmit={handleSearch}
              className="relative w-full"
              ref={searchRef}
            >
              <div className="flex items-center w-full">
                <input
                  type="search"
                  className={`rounded-full px-6 py-1 placeholder-[#666666] w-full min-w-[200px]`}
                  placeholder={t("البحث عن صفحة")}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.trim() === "") {
                      setShowSearchResults(false);
                    }
                  }}
                  onFocus={() => {
                    if (searchQuery.trim() && searchResults.length > 0) {
                      setShowSearchResults(true);
                    }
                  }}
                />
              </div>

              {showSearchResults && (
                <div className="absolute scroll w-[20rem] top-full left-0 right-0 bg-white shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    <ul>
                      <div className="w-full h-[0.2rem] bg-secondary"></div>
                      {searchResults.map((page) => (
                        <li
                          key={page.id}
                          className="flex items-center text-[1rem] font-[400] text-[#525252] p-2 h-[4rem] hover:bg-gradient-to-l from-[#172B62] to-[#2F57C8] hover:text-white cursor-pointer border-b border-dashed border-[#C4C4C4]"
                          onClick={() => handleSearchResultClick(page)}
                        >
                          {page.banner_title}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-2 text-gray-500">
                      {t("لا توجد نتائج")}
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
          {subMenu.map((submenu, index) =>
            submenu.action ? (
              <Link
                to={submenu.action}
                key={index}
                className={`font-[400] text-nowrap text-[white] ${
                  i18next.language == "ku" ? "text-[0.85rem]" : "text-[1rem]"
                } relative ${clickedSubMenuIndex === index ? "font-bold" : ""}`}
                onClick={() => {
                  setClickedSubMenuIndex(index);
                  closeAllDropdowns(); // Close any open dropdowns when clicking a submenu item
                }}
              >
                {submenu.title}
                {clickedSubMenuIndex === index && (
                  <div
                    style={{
                      boxShadow: "0px -4px 10px 0px #FFFFFF",
                    }}
                    className="w-full h-[0.3rem] rounded-full bg-white absolute -bottom-4"
                  ></div>
                )}
              </Link>
            ) : null
          )}
        </div>
        <div
          className={`flex items-center absolute z-50 top-40 mt-[0.3rem] ${
            i18next.language == "en" ? "right-48" : "left-40"
          }`}
        >
          <a
            target="_blank"
            href="https://mobile.inibiq.iq/IBS/Rl5IW1xkVwNzUTxYQFwIBS2012.do?TF5dRVNYViRTVS0IBS2012=Rl5IW1wb&WkNAUVdZQQIBS2012IBS2012=Xl5EV1wIBS2012&CHANGE_LANG_FLAG=0"
            className="flex items-center"
          >
            <div
              style={{
                background: "linear-gradient(90deg, #57C82F 0%, #2B6217 100%)",
              }}
              className={`flex justify-center  items-center text-white font-[700]  ${
                i18next.language == "en"
                  ? "rounded-tr-full rounded-br-full -right-40"
                  : "rounded-tl-full rounded-bl-full -left-32"
              } absolute  w-[9rem] h-[2rem]
              }`}
            >
              <p
                className={`absolute ${
                  i18next.language == "en" ? "right-[1rem]" : ""
                }`}
              >
                {t("اون لاين بنك")}
              </p>
            </div>
          </a>

          <div className="w-[3rem] h-[3rem] rounded-full bg-[#57C82F] absolute left-0  z-10">
            <a target="_blank" href="https://www.inibiq.iq/">
              <img className="cursor-pointer" src={wifi} alt="WiFi Icon" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
