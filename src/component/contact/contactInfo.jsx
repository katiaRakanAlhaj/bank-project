import call from "../../assets/images/call.png";
import sms from "../../assets/images/sms.png";
import bulk from "../../assets/images/bulk.png";
import { useState, useEffect } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import useSubmitData from "../../hooks/useSubmitData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactDetails = ({ img, text, type }) => {
  const formatPhoneNumber = (phone) => {
    if (!phone) return phone;
    const digitsOnly = phone.replace(/\D/g, "");
    return digitsOnly.startsWith("+") ? digitsOnly : `+${digitsOnly}`;
  };

  switch (type) {
    case "phone":
      const formattedPhone = formatPhoneNumber(text);
      return (
        <div className="flex items-center gap-x-2">
          <img src={img} alt="contact-icon" className="w-6 h-6" />
          <a
            href={`tel:${formattedPhone}`}
            className="text-[#000000] underline font-[700] text-[1.4rem] hover:underline hover:text-primary text-left rtl:text-left ltr:text-left"
            dir="ltr"
          >
            {formattedPhone}
          </a>
        </div>
      );
    case "email":
      return (
        <div className="flex items-center gap-x-2">
          <img src={img} alt="contact-icon" className="w-6 h-6" />
          <a
            href={`mailto:${text}`}
            className="text-[#000000] underline font-[700] text-[1.4rem] hover:underline hover:text-primary"
          >
            {text}
          </a>
        </div>
      );
    case "location":
      return (
        <div className="flex items-center gap-x-2">
          <img src={img} alt="contact-icon" className="w-6 h-6" />
          <a
            href={text.startsWith("http") ? text : `https://${text}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#000000] underline font-[700] text-[1.4rem] hover:underline hover:text-primary"
          >
            {text}
          </a>
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-x-2">
          <img src={img} alt="contact-icon" className="w-6 h-6" />
          <p className="text-[#000000] font-[400] text-[1.2rem]">{text}</p>
        </div>
      );
  }
};

const ContactInfo = ({ contactData, countryData }) => {
  const [isHovered, setIsHovered] = useState("");
  const { t } = useTranslation();
  const [handleSubmit, loading, success, isErr, err, sendStat] =
    useSubmitData();

  // Form state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);

  // Error state variables
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    address: "",
    country: "",
    message: "",
  });

  // State for API data and country options
  const [apiData, setApiData] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    if (countryData && countryData.data) {
      const options = countryData.data.map((country) => ({
        value: country.id,
        label: country.name,
      }));
      setCountryOptions(options);
    }
  }, [countryData]);

  useEffect(() => {
    if (contactData && contactData.data && contactData.data.length > 0) {
      setApiData(contactData.data);
    }
  }, [contactData]);

  // Load reCAPTCHA script
  useEffect(() => {
    const loadRecaptcha = () => {
      if (document.getElementById("recaptcha-script")) return;

      const script = document.createElement("script");
      script.id = "recaptcha-script";
      script.src = `https://www.google.com/recaptcha/api.js?render=6LfJpyorAAAAABspvmIAUwaqeOKL1ej2YUwYvqYX`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsRecaptchaLoaded(true);
        console.log("reCAPTCHA loaded");
      };
      document.body.appendChild(script);
    };

    loadRecaptcha();

    return () => {
      const script = document.getElementById("recaptcha-script");
      if (script) document.body.removeChild(script);
    };
  }, []);

  // Get reCAPTCHA token
  const getRecaptchaToken = async () => {
    if (!window.grecaptcha) {
      console.error("reCAPTCHA not loaded");
      return "";
    }

    try {
      const token = await window.grecaptcha.execute(
        "6LfJpyorAAAAABspvmIAUwaqeOKL1ej2YUwYvqYX",
        { action: "submit" }
      );
      return token;
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      return "";
    }
  };

  // Validate form function
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      subject: "",
      address: "",
      country: "",
      message: "",
    };

    if (!name.trim()) {
      newErrors.name = t("هذا الحقل مطلوب");
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = t("هذا الحقل مطلوب");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("بريد إلكتروني غير صالح");
      valid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = t("هذا الحقل مطلوب");
      valid = false;
    }

    if (!subject.trim()) {
      newErrors.subject = t("هذا الحقل مطلوب");
      valid = false;
    }

    if (!address.trim()) {
      newErrors.address = t("هذا الحقل مطلوب");
      valid = false;
    }

    if (!selectedCountry) {
      newErrors.country = t("هذا الحقل مطلوب");
      valid = false;
    }

    if (!value.trim()) {
      newErrors.message = t("هذا الحقل مطلوب");
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!isRecaptchaLoaded) {
      setRecaptchaError(t("جاري تحميل نظام التحقق، يرجى الانتظار"));
      return;
    }

    // Get reCAPTCHA token first
    const token = await getRecaptchaToken();
    console.log("reCAPTCHA Token:", token); // Debugging log
    setRecaptchaToken(token);

    // Validate form after getting token
    if (!validateForm()) {
      return;
    }

    const payload = {
      name,
      email,
      phone,
      subject,
      country: selectedCountry ? selectedCountry.label : null,
      address,
      message: value,
      "g-recaptcha-response": token, // Use the token retrieved above
    };

    try {
      const response = await handleSubmit("Contact", payload);
      if (response) {
        toast.success(t("تم إرسال البيانات بنجاح"));
        // Reset form
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setAddress("");
        setValue("");
        setSelectedCountry(null);
        setRecaptchaToken("");
        // Clear errors
        setErrors({
          name: "",
          email: "",
          phone: "",
          subject: "",
          address: "",
          country: "",
          message: "",
        });
        // Reset reCAPTCHA
        if (window.grecaptcha) {
          window.grecaptcha.reset();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(t("حدث خطأ أثناء الإرسال"));
      // Reset reCAPTCHA on error
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
    }
  };
  const textAlign = i18next.language === "en" ? "left" : "right";

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="flex items-center text-center gap-x-2">
        <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
        <p className="text-[1.8rem] font-bold text-[#333333]">
          {t("معلومات الاتصال")}
        </p>
      </div>

      {apiData.length > 0 &&
        apiData.map((item, index) => (
          <div
            key={index}
            className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-x-20 items-center justify-center gap-y-1 lg:mt-[2rem] md:mt-[1.5rem] mt-[1.5rem]"
          >
            <ContactDetails img={sms} text={item.email} type="email" />
            <ContactDetails img={bulk} text={item.link} type="location" />
            <ContactDetails img={call} text={item.phone_number} type="phone" />
            <ContactDetails
              img={call}
              text={item.speed_dial_number}
              type="phone"
            />
          </div>
        ))}
      <div className="mt-[2rem]">
        {apiData.map((item, index) => (
          <div key={index} className="h-[23rem] mb-[2rem]">
            <iframe
              src={item.location1}
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              title={`Google Maps ${index + 1}`}
            ></iframe>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitForm}>
        <div className="grid gap-6 md:grid-cols-2 mt-[1.5rem]">
          {/* Name Field */}
          <div className="relative">
            <input
              type="text"
              className={`w-full h-[3.5rem] placeholder-[#666666] border ${
                errors.name ? "border-red-500" : "border-[#EDEDED]"
              } rounded-sm px-4 font-medium`}
              placeholder={t("الاسم")}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="relative">
            <input
            style={{unicodeBidi: 'plaintext'}}
              type="text"
              className={`w-full h-[3.5rem] placeholder-[#666666] border ${
                errors.phone ? "border-red-500" : "border-[#EDEDED]"
              } rounded-sm px-4 font-medium text-${textAlign}`}
              placeholder={t("الهاتف")}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: "" });
              }}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              className={`w-full h-[3.5rem] placeholder-[#666666] border ${
                errors.email ? "border-red-500" : "border-[#EDEDED]"
              } rounded-sm px-4 font-medium`}
              placeholder={t("الإيميل")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Subject Field */}
          <div className="relative">
            <input
              type="text"
              className={`w-full h-[3.5rem] placeholder-[#666666] border ${
                errors.subject ? "border-red-500" : "border-[#EDEDED]"
              } rounded-sm px-4 font-medium`}
              placeholder={t("الموضوع")}
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                if (errors.subject) setErrors({ ...errors, subject: "" });
              }}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
            )}
          </div>

          {/* Country Field */}
          <div className="relative">
            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={(selected) => {
                setSelectedCountry(selected);
                if (errors.country) setErrors({ ...errors, country: "" });
              }}
              placeholder={t("اختر الدولة")}
              className="w-full"
              classNamePrefix="select"
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: errors.country ? "#ef4444" : "#EDEDED",
                  "&:hover": {
                    borderColor: errors.country ? "#ef4444" : "#EDEDED",
                  },
                  height: "3.5rem",
                }),
              }}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          {/* Address Field */}
          <div className="relative">
            <input
              type="text"
              className={`w-full h-[3.5rem] placeholder-[#666666] border ${
                errors.address ? "border-red-500" : "border-[#EDEDED]"
              } rounded-sm px-4 font-medium`}
              placeholder={t("عنوان السكن")}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (errors.address) setErrors({ ...errors, address: "" });
              }}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
        </div>

        {/* Message Textarea */}
        <div className="relative mt-[1rem]">
          <textarea
            placeholder={t("الرسالة")}
            className={`w-full py-4 h-[10.5rem] placeholder-[#666666] border ${
              errors.message ? "border-red-500" : "border-[#EDEDED]"
            } rounded-sm px-4 font-medium`}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (errors.message) setErrors({ ...errors, message: "" });
            }}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* reCAPTCHA Badge - This will show the reCAPTCHA branding */}
        <div
          className="g-recaptcha mt-4"
          data-sitekey="6LfJpyorAAAAABspvmIAUwaqeOKL1ej2YUwYvqYX"
          data-size="invisible"
        ></div>

        {/* reCAPTCHA error */}
        {recaptchaError && (
          <p className="text-red-500 text-sm mt-1">{recaptchaError}</p>
        )}

        {/* Submit Button */}
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
      </form>
    </div>
  );
};

export default ContactInfo;
