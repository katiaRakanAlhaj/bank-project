import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import logo from "../../assets/images/logo1.png"; // Adjust the path to your logo image
import logo2 from "../../assets/images/logologo 2.png";// Adjust the path to your logo image
import i18next from "i18next";

const Banner = ({ bannerImage, bannerTitle }) => {
  return (
    <div className="w-full lg:h-[70vh] relative">
      <div
        className="absolute inset-0 bg-cover -z-10 transition-all duration-700"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(45, 84, 193, 0) 11.81%, rgba(29, 53, 121, 0.8) 80.27%), url(${bannerImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      {/* Logo positioned at the top right corner */}
   
      <div className="flex flex-col justify-center items-start pt-[15rem] lg:px-[6rem] md:px-[4rem] px-[2rem] relative z-10 gap-y-2">
        <h1 className="text-[#FFFFFF] lg:mb-[0rem] mb-[4rem] font-[700] lg:text-[2rem] text-[1rem] text-nowrap">
          {bannerTitle}
        </h1>
      </div>
    </div>
  );
};

export default Banner;
