import React from "react";
import logo from "../../assets/images/logo1.png";
import logo2 from "../../assets/images/logologo 2.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import FooterLink from "./footerLink";
import useFetchData from "../../hooks/useFetchData";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
// const advices = [
//   "حقوق وواجبات العميل",
//   "نصائح وإرشادات",
//   "IBAN",
//   "شكاوى العملاء",
//   "مواقع نقاط البيع وأجهزة الصراف الآلي",
//   "الشركاء",
// ];

const ServiceItem = ({ service, pageId }) => {
  const navigate = useNavigate(); // Get navigate from useNavigate

  const handleClick = () => {
    if (pageId) {
      navigate(`/category/page/${pageId}`); // Navigate to the URL with page_id
    }
  };

  return (
    <li className="flex gap-x-2 items-center cursor-pointer" onClick={handleClick}>
      <div className="w-[0.6rem] h-[0.6rem] bg-secondary"></div>
      <p className="text-[#FFFFFF] text-wrap text-[1rem] font-[400]">{service}</p>
    </li>
  );
};

const Footer = ({ contactData, footerData }) => {
  const style = {
    background: `linear-gradient(180deg, #2F57C8 0%, #172B62 100%)`,
  };
  const { data: categoryData } = useFetchData("categories-with-pages-content"); // Fetch data once

  // Extract the first three categories
  const excludedTitles = [
    "فروعنا", // Arabic
    "Our Branches", // English
    "شاخەکانمان", // Kurdish
    "شركائنا", // Arabic
    "Our Partners", // English
    "شریکەکانمان", // Kurdish
    "نصائح وإرشادات",
    "شون و رێبەریە",
    "شكوى العملاء",
    "گیلەی کڕیاران",
    "هەواڵ",
    "News",
    "الاخبار",
    "Tips and Guidelines",
    " Customer Complaints",
    "حقوق وواجبات العميل",
    "ماف و بەرپرسیارییەکانی کڕیار",
    "Customer Rights and Responsibilities"
  ];

  // Extract categories and filter out excluded titles
  const categories = categoryData?.categories?.slice(0, 4).map(category => ({
    ...category,
    pages: category.pages.filter(page => !excludedTitles.includes(page.banner_title))
  })) || [];
  return (
    <footer>
      <div style={style} className="w-full lg:h-[34rem] mt-[3.5rem] py-14">
        {footerData?.data?.map((footer) => (
          <div key={footer.id} className="grid lg:grid-cols-5 gap-x-10 lg:gap-y-0 gap-y-4 container mx-auto">
            {/* Logo Section */}
            <div className="flex flex-col items-center">
              <div>
                <Link to = "/">
                <img src={footer.logo} alt="Logo" />

                </Link>
              </div>
              <p className="text-[#FFFFFF] font-[400] mt-[0.5rem] text-[1.3rem]">
                {footer.description}
              </p>
            </div>

            {categories.map((category) => (
              <div key={category.id}>
                <h1 className="text-[#FFFFFF] text-nowrap font-[700] text-[1.3rem] mb-[1rem]">
                  {category.name}
                </h1>
                <ul className="space-y-4">
                  {/* Map through the first 10 services based on the category */}
                  {category.pages.slice(0, 9).map((service, index) => (
                    <ServiceItem key={index} service={service.banner_title} pageId={service.page_url} />
                  ))}
                </ul>
              </div>
            ))}

            {/* Advice Section */}
            {/* <div>
              <h1 className="text-[#FFFFFF] font-[700] text-[1.3rem] mb-[1rem]">
                نصائح وإرشادات
              </h1>
              <ul className="space-y-4">
                {advices.map((service, index) => (
                  <ServiceItem key={index} service={service} />
                ))}
              </ul>
            </div> */}
          </div>
        ))}
      </div>
      <div className="w-full lg:h-[3.7rem] h-[9rem] bg-[#333333] items-center flex justify-center">
        <div className="container mx-auto">
          <div className="lg:flex lg:space-y-0 space-y-4 justify-between items-center">
            <div className="font-[400] text-[#FFFFFF] text-[1rem]">
              جميع الحقوق محفوظة © 2025 لنور العراق
            </div>
            <div className="font-[400] text-[#FFFFFF] text-[1rem]">
              الخصوصية | شروط الاستخدام
            </div>
            {contactData?.data?.map((contact) => (
              <div key={contact.id} className="flex items-center gap-x-14 justify-between">
                <div className="text-[#FFFFFF] text-[1.5rem]">
                  <FooterLink icon={<FaLinkedinIn />} href={contact.linkedin} />
                </div>
                <div className="text-[#FFFFFF] text-[1.5rem]">
                  <FooterLink icon={<FaXTwitter />} href={contact.x} />
                </div>
                <div className="text-[#FFFFFF] text-[1.5rem]">
                  <FooterLink icon={<FaInstagram />} href={contact.instagram} />
                </div>
                <div className="text-[#FFFFFF] text-[1.5rem]">
                  <FooterLink icon={<FaFacebookF />} href={contact.facebook} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;