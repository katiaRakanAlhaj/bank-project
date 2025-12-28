import i18next from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useSubmitData from "../../hooks/useSubmitData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dropdown = ({ title, isOpen, toggle, items, onSelect, error }) => {
  return (
    <div className="relative">
      <div
        className={`w-full relative flex justify-between items-center px-[0.5rem] h-[3.5rem] border ${error ? 'border-red-500' : 'border-[#EDEDED]'} text-[0.9rem] font-[500] text-[#666666] rounded-sm cursor-pointer`}
        onClick={toggle}
      >
        <p>{title}</p>
        {i18next.language == "en" ? (
          <IoIosArrowForward
            className={`text-[#292D32] transition-transform duration-500 ${isOpen ? "rotate-90" : ""}`}
          />
        ) : <IoIosArrowBack
          className={`text-[#292D32] transition-transform duration-500 ${isOpen ? "rotate-90" : ""}`}
        />}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      <div
        className={`absolute bg-white z-20 w-full shadow-lg transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}`}
      >
        <ul className={`${isOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
          <div className="h-[0.2rem] bg-secondary"></div>
          {items?.map((item, index) => (
            <li
              key={index}
              className="flex items-center text-[1rem] font-[400] text-[#525252] p-2 h-[4rem] hover:bg-gradient-to-l from-[#172B62] to-[#2F57C8] hover:text-white cursor-pointer border-b border-dashed border-[#C4C4C4]"
              onClick={() => {
                onSelect(item);
                toggle();
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Form = () => {
  const [handleSubmit, loading, success, isErr, err, sendStat] = useSubmitData();
  const [isHovered, setIsHovered] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [errors, setErrors] = useState({});
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    branchDate: "",
    textareaContent: "",
    governorate: "",
  });
  
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}));
    }
  };

    // Load reCAPTCHA script
    useEffect(() => {
      const loadRecaptcha = () => {
        if (document.getElementById('recaptcha-script')) return;
  
        const script = document.createElement('script');
        script.id = 'recaptcha-script';
        script.src = `https://www.google.com/recaptcha/api.js?render=6LfJpyorAAAAABspvmIAUwaqeOKL1ej2YUwYvqYX`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          setIsRecaptchaLoaded(true);
          console.log('reCAPTCHA loaded');
        };
        document.body.appendChild(script);
      };
  
      loadRecaptcha();
  
      return () => {
        const script = document.getElementById('recaptcha-script');
        if (script) document.body.removeChild(script);
      };
    }, []);
  
      // Get reCAPTCHA token
      const getRecaptchaToken = async () => {
        if (!window.grecaptcha) {
          console.error('reCAPTCHA not loaded');
          return '';
        }
    
        try {
          const token = await window.grecaptcha.execute('6LfJpyorAAAAABspvmIAUwaqeOKL1ej2YUwYvqYX', { action: 'submit' });
          return token;
        } catch (error) {
          console.error('reCAPTCHA error:', error);
          return '';
        }
      };
    
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = t('هذا الحقل مطلوب');
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = t('هذا الحقل مطلوب');
    }
    
    if (!selectedBranch) {
      newErrors.branch = t('هذا الحقل مطلوب');
    }
    
    if (!formData.branchDate) {
      newErrors.branchDate = t('هذا الحقل مطلوب');
    }
    
    if (!selectedDay) {
      newErrors.day = t('هذا الحقل مطلوب');
    }
    
    if (!selectedDirection) {
      newErrors.direction = t('هذا الحقل مطلوب');
    }
    
    if (!formData.governorate.trim()) {
      newErrors.governorate = t('هذا الحقل مطلوب');
    }
    
    if (!formData.textareaContent.trim()) {
      newErrors.textareaContent = t('هذا الحقل مطلوب');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!isRecaptchaLoaded) {
      setRecaptchaError(t("جاري تحميل نظام التحقق، يرجى الانتظار"));
      return;
    }
    // Get reCAPTCHA token first
const token = await getRecaptchaToken();
console.log('reCAPTCHA Token:', token);
setRecaptchaToken(token);
    // Validate form before submission
    const isValid = validateForm();
    if (!isValid) {
      toast.error(t('الرجاء إكمال جميع الحقول المطلوبة'));
      return;
    }

    const formattedDate = new Date(formData.branchDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const dataToSend = {
      full_name: formData.fullName,
      phone_number: formData.phoneNumber,
      bank_branch: selectedBranch,
      attendance_date: formattedDate,
      attendance_day: selectedDay,
      counterparty: selectedDirection,
      governorate: formData.governorate,
      note: formData.textareaContent,
      'g-recaptcha-response': token // Add reCAPTCHA token to form data

    };

    try {
      const response = await handleSubmit("Complaint", dataToSend);
      if (response) {
        toast.success(t('تم إرسال البيانات بنجاح'));
        setFormData({
          fullName: "",
          phoneNumber: "",
          branchDate: "",
          textareaContent: "",
          governorate: "",
        });
        setSelectedBranch("");
        setSelectedDay("");
        setSelectedDirection("");
        setErrors({});
        if (window.grecaptcha) {
          window.grecaptcha.reset();
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
    }
  };

  const { t } = useTranslation();
  const branchItems = [t('فرع الرئيسي'), t('فرع الشورجة'), t('فرع جميلة'), t('فرع المنصور')];
  const directionItems = [t('حضور الى الفرع'), t('اتصال هاتفي'), t('منصات تواصل الاجتماعي')];
  const dayItems = [t('الاحد'), t('الاثنين'), t('الثلاثاء'), t('الاربعاء'), t('الخميس')];
  const textAlign = i18next.language === "en" ? "left" : "right";

  return (
    <div>
      <ToastContainer />
      <h1 className="text-[#000000] font-[700] text-[1.2rem] mt-[2rem]">
        {t('او املأ الاستمارة ادناه')}
      </h1>
      <form className="mt-[1rem]" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-y-4">
          <div className="relative">
            <input
              name="fullName"
              className={`w-full placeholder-[#666666] h-[3.5rem] px-[0.5rem] text-[0.9rem] font-[500] border ${errors.fullName ? 'border-red-500' : 'border-[#EDEDED]'} rounded-sm`}
              type="text"
              placeholder={t('الاسم الثلاثي')}
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          <div className="relative">
            <input
              dir="ltr"
              name="phoneNumber"
              className={`w-full text-${textAlign} placeholder-[#666666] h-[3.5rem] px-[0.5rem] text-[0.9rem] font-[500] border ${errors.phoneNumber ? 'border-red-500' : 'border-[#EDEDED]'} rounded-sm`}
              type="text"
              placeholder={t('رقم الهاتف')}
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
          </div>
          <div className="grid lg:grid-cols-2 gap-x-4 gap-y-4">
            <Dropdown
              title={selectedBranch || t('الفرع')}
              isOpen={openDropdown === "branch"}
              toggle={() => toggleDropdown("branch")}
              items={branchItems}
              onSelect={(item) => {
                setSelectedBranch(item);
                if (errors.branch) setErrors(prev => ({...prev, branch: ''}));
              }}
              error={errors.branch}
            />
            <div>
              <input
                type="date"
                name="branchDate"
                className={`w-full placeholder-[#666666] h-[3.5rem] px-[0.5rem] text-[0.9rem] font-[500] border ${errors.branchDate ? 'border-red-500' : 'border-[#EDEDED]'} rounded-sm`}
                placeholder={t('تاريخ حضور الى الفرع')}
                value={formData.branchDate}
                onChange={handleChange}
              />
              {errors.branchDate && <p className="text-red-500 text-xs mt-1">{errors.branchDate}</p>}
            </div>
            <Dropdown
              title={selectedDay || t('يوم الحضور الى الفرع')}
              isOpen={openDropdown === "day"}
              toggle={() => toggleDropdown("day")}
              items={dayItems}
              onSelect={(item) => {
                setSelectedDay(item);
                if (errors.day) setErrors(prev => ({...prev, day: ''}));
              }}
              error={errors.day}
            />
            <Dropdown
              title={selectedDirection || t('الجهة التي تعاملت معها')}
              isOpen={openDropdown === "direction"}
              toggle={() => toggleDropdown("direction")}
              items={directionItems}
              onSelect={(item) => {
                setSelectedDirection(item);
                if (errors.direction) setErrors(prev => ({...prev, direction: ''}));
              }}
              error={errors.direction}
            />
          </div>
          <div className="relative">
            <input
              name="governorate"
              className={`w-full placeholder-[#666666] h-[3.5rem] px-[0.5rem] text-[0.9rem] font-[500] border ${errors.governorate ? 'border-red-500' : 'border-[#EDEDED]'} rounded-sm`}
              type="text"
              placeholder={t('محافظة')}
              value={formData.governorate}
              onChange={handleChange}
            />
            {errors.governorate && <p className="text-red-500 text-xs mt-1">{errors.governorate}</p>}
          </div>
          <div className="relative">
            <textarea
              className={`w-full h-[10rem] border ${errors.textareaContent ? 'border-red-500' : 'border-[#EDEDED]'} rounded-sm px-[0.5rem] placeholder-[#666666] text-[0.9rem] py-[1rem] font-[500]`}
              name="textareaContent"
              placeholder={t('اكتب هنا')}
              value={formData.textareaContent}
              onChange={handleChange}
            />
            {errors.textareaContent && <p className="text-red-500 text-xs mt-1">{errors.textareaContent}</p>}
          </div>
          <div className="flex items-center mt-[1.5rem]">
  <button
    type="submit"
    className={`relative w-[11rem] h-[3rem] transition-all duration-500 ease-in-out text-white font-bold overflow-hidden bg-gradient-to-l from-[#2F57C8] to-[#172B62]`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    disabled={loading}
  >
    <span
      className={`absolute inset-0 transition-all duration-500 ease-in-out ${
        isHovered ? "bg-secondary" : ""
      } transform ${
        isHovered ? "scale-x-100" : "scale-x-0"
      } origin-left`}
    ></span>
    <div className="relative z-10 flex items-center justify-center gap-2">
     
      <p>{loading ? t("جاري الإرسال") : t("ارسال")}</p>
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
    </div>
  </button>
  {!loading && (
    <div
      className={`flex items-center justify-center transition-all duration-300 ease-linear ${
        isHovered
          ? "rotate-0 h-[3rem] w-[3rem] top-0 bg-gradient-to-l from-[#2F57C8] to-[#172B62]"
          : "rotate-[-45deg] top-2"
      } w-[2.1rem] h-[2.1rem] ${
        i18next.language === "ar" || i18next.language === "ku"
          ? "mr-[-1.1rem]"
          : "ml-[-1.1rem]"
      } bg-secondary`}
    >
      {i18next.language === "ar" || i18next.language === "ku" ? (
        <FaArrowLeftLong
          className={`text-white ${
            isHovered ? "rotate-0" : "rotate-[45deg]"
          }`}
        />
      ) : (
        <FaArrowRightLong
          className={`text-white ${
            isHovered ? "rotate-0" : "rotate-[45deg]"
          }`}
        />
      )}
    </div>
  )}
</div>
        </div>
      </form>
    </div>
  );
};

export default Form;