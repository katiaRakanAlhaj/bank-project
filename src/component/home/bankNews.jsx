import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { IoIosArrowBack } from "react-icons/io";
import { EffectFade, Autoplay } from "swiper/modules"; // Import Swiper modules

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules

const BankNews = ({ eventsData, homePageData, categoryData }) => {
  const navigate = useNavigate();
  const arrowClass = i18next.language === "en" ? "arrow4" : "arrow2";
  const paragClass = i18next.language === "en" ? "parag3" : "parag";
  const { t } = useTranslation();

  // Array of news phrases in different languages
  const newsPhrases = ["الأخبار", "News", "هەواڵ"];

  // Fuse.js options
  const fuseOptions = {
    includeScore: true,
    threshold: 0.4,
  };

  const fuse = new Fuse(newsPhrases, fuseOptions);

  const handleButtonClick = (pageUrl) => {
    if (pageUrl) {
      navigate(`/event/${pageUrl}`);
    } else {
      console.error("No page_url found in the data.");
    }
  };

  const handleSeeMoreClick = () => {
    let newsPageUrl = null;

    if (categoryData?.categories) {
      // Search through all categories and pages
      for (const category of categoryData.categories) {
        if (category.pages) {
          for (const page of category.pages) {
            // Use Fuse.js to check if the banner_title matches any news phrase
            const results = fuse.search(page.banner_title || "");
            if (results.length > 0 && results[0].score < 0.4) {
              newsPageUrl = page.page_url;
              break;
            }
          }
          if (newsPageUrl) break;
        }
      }
    }

    if (newsPageUrl) {
      navigate(`/category/page/${newsPageUrl}`);
    } else {
      console.error("No news page found");
      // Fallback: Try to find a page with "news" in the URL if banner_title search fails
      const fallbackNewsPage = categoryData?.categories
        ?.flatMap((category) => category.pages)
        .find((page) => page.page_url.toLowerCase().includes("news"));

      if (fallbackNewsPage) {
        navigate(`/category/page/${fallbackNewsPage.page_url}`);
      } else {
        // If still not found, navigate to a generic page or show an error
        navigate("/");
      }
    }
  };

  return (
    <div className="relative">
      <div className="container mx-auto">
        {homePageData?.data?.map((homePage) => (
          <div key={homePage.id}>
            <div className="flex gap-x-2 mt-[2rem] items-center text-center justify-center">
              <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
              <h1 className="font-[700] text-[#333333] text-[1.8rem]">
                {homePage.event_title}
              </h1>
              <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
            </div>
            <h1 className="text-center mb-[2rem] text-[1.2rem] font-[400] text-[#333333] mt-[1rem]">
              {homePage.event_description}
            </h1>
          </div>
        ))}

        <Swiper
        modules={[EffectFade, Autoplay]} // Add Autoplay module here
        autoplay={{
          delay: 3000, // Delay in milliseconds
        }}
        loop = {true}
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {eventsData?.data?.map((events) => (
            <SwiperSlide key={events.id}>
              <div className="relative w-[100%] h-[35rem] group">
                <div className="absolute inset-0 border border-white z-10"></div>
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-500 transform group-hover:scale-105">
                    <img
                      className="h-[100%] w-[100%] object-cover relative"
                      src={events.image}
                      alt={events.title}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,#000000_0%,rgba(102,102,102,0)_71.47%)]"></div>
                  </div>
                </div>
                <div
                  className={`absolute top-[25rem] ${
                    i18next.language === "en"
                      ? "left-[2rem]"
                      : "right-[2rem]"
                  } transition-all duration-500 group-hover:opacity-100 group-hover:top-[20rem] z-20`}
                >
                  <p className="font-[700] text-[1.5rem] text-[#FFFFFF] line-clamp-1">
                    {events.title}
                  </p>
                  <p className="font-[700] text-[1.2rem] text-white">
                    {events.created_at.split("T")[0]}
                  </p>
                  <p className="font-[400] w-[90%] flex text-justify text-[#FFFFFF] text-[0.8rem] mt-[0.5rem] line-clamp-3">
                    {events.description}
                  </p>
                  <div className="relative">
                    {events.page_url && (
                      <button
                        onClick={() => handleButtonClick(events.page_url)}
                        className={`relative button group mt-[1rem] lg:w-[20rem] md:w-[20rem] w-[16rem] h-[3.5rem] text-[#FFFFCC] gap-x-2 flex justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                          i18next.language === "en" ? "lang-en" : ""
                        }`}
                      >
                        <div className="flex absolute gap-x-2 items-center">
                          <p
                            className={`text-white ${paragClass} font-[700] text-[1rem]`}
                          >
                            {t("شاهد المزيد")}
                          </p>
                          {i18next.language === "en" ? (
                            <FaArrowRightLong
                              className={`text-[1.2rem] ${arrowClass}`}
                            />
                          ) : (
                            <FaArrowLeftLong
                              className={`text-[1.2rem] ${arrowClass}`}
                            />
                          )}
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BankNews;
