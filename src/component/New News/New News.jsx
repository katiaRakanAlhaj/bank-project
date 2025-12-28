import image1 from "../../assets/images/marry.jpeg";
import image2 from "../../assets/images/kanaba.jpeg";
import image3 from "../../assets/images/mosque.jpeg";
import i18next from "i18next";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
const events = [
    {img:image1,title:'لوريم ايبسوم دولار',description:'لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم دولار سيت أميتلوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم دولار سيت أميت'},
    {img:image2,title:'لوريم ايبسوم دولار',description:'لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم دولار سيت أميتلوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم دولار سيت أميت'},
    {img:image3,title:'لوريم ايبسوم دولار',description:'لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم دولار سيت أميتلوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور لوريم ايبسوم دولار سيت أميت'}


]
const News = () => {
    const arrowClass = i18next.language === "en" ? "arrow4" : "arrow2";
    const paragClass = i18next.language === "en" ? "parag3" : "parag";
    const {t} = useTranslation();
  return (
      <div className="container mx-auto mt-[2rem]">
        <div className="grid lg:grid-cols-3 gap-y-6 gap-x-8">
        {events.map((event,index) => (
          <div key={index} className="relative w-[100%] h-[35rem] group">
            {/* Border container */}
            <div className="absolute inset-0 border border-white z-10"></div>
            {/* Container for scaling both image and gradient */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-500 transform group-hover:scale-105">
                <img
                  className="h-[100%] w-[100%] object-cover"
                  src={event.img}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(0deg,#000000_0%,rgba(102,102,102,0)_71.47%)]"></div>
              </div>
            </div>
            {/* Content */}
            <div
              className={`absolute top-[25rem] ${
                i18next.language === "en" ? "left-[2rem]" : "right-[2rem]"
              } transition-all duration-500 group-hover:opacity-100 group-hover:top-[20rem] z-20`}
            >
              <p className="font-[700] text-[1.5rem] text-[#FFFFFF]">
                {event.title}
              </p>
              <p className="font-[400] w-[90%] flex text-justify text-[#FFFFFF] text-[0.8rem] mt-[0.5rem] line-clamp-3">
                {event.description}
              </p>
              <div className="relative">
                <button className={`relative button group mt-[1rem] lg:w-[20rem] md:w-[20rem] w-[18rem] h-[3.5rem] text-[#FFFFCC] gap-x-2 flex justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${i18next.language === "en" ? "lang-en" : ""}`}>
                  <div className="flex absolute gap-x-2 items-center">
                    <p className={`text-white ${paragClass} font-[700] text-[1rem]`}>
                      {t("شاهد المزيد")}
                    </p>
                    {i18next.language === "en" ? (
                      <FaArrowRightLong className={`text-[1.2rem] ${arrowClass}`} />
                    ) : (
                      <FaArrowLeftLong className={`text-[1.2rem] ${arrowClass}`} />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
  );
};
export default News;
