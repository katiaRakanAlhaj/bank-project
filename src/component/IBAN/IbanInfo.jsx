import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BankEvents from "../BankEvents/bankEvents";
import useSubmitData from "../../hooks/useSubmitData";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications

const Dropdown = ({ title, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const toggle = () => setIsOpen(!isOpen);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <div className="relative flex-col">
      <div
        onClick={toggle}
        className="cursor-pointer w-full h-[3.5rem] border border-[#EDEDED] rounded-sm flex justify-between items-center px-[0.5rem]"
      >
        <p className="font-[500] text-[#666666] text-[1rem]">
          {selectedItem || title}
        </p>
        {i18next.language == "en" ? (
          <IoIosArrowForward
            className={`text-[#292D32] transition-transform duration-300 ${
              isOpen ? "rotate-[-90deg]" : ""
            }`}
          />
        ) : (
          <IoIosArrowBack
            className={`text-[#292D32] transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        )}
      </div>
      <div
        className={`absolute bg-white z-20 w-full shadow-lg transition-all duration-1000 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <ul
          className={`${
            isOpen ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          <div className="h-[0.2rem] bg-secondary"></div>
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center text-[1rem] font-[400] text-[#525252] p-2 h-[4rem] hover:bg-gradient-to-l from-[#172B62] to-[#2F57C8] hover:text-white cursor-pointer border-b border-dashed border-[#C4C4C4]"
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const IbanInfo = ({ eventsData, homePageData, accountData }) => {
  const [branchValue, setBranchValue] = useState("");
  const [currencyValue, setCurrencyValue] = useState("");
  const [accountTypeValue, setAccountTypeValue] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false); // State to track if code is sent successfully
  const [handleSubmit, loading, success, isErr, err, sendStat] =
    useSubmitData();
  const { t } = useTranslation();

  const branchItems = [
    t("الفرع الرئيسي - 201"),
    t("فرع الشورجة - 202"),
    t("فرع المنصور - 203"),
    t("فرع جميلة - 204"),
  ];
  const currencyItems = [t("1 - عراقي"), t("2 - دولار")];
  const accountTypeItems = [t("2517 - جاري افراد"), t("2516 - جاري شركات")];
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
  const handleSearch = async () => {
    if (!isRecaptchaLoaded) {
      setRecaptchaError(t("جاري تحميل نظام التحقق، يرجى الانتظار"));
      return;
    }
    // Get reCAPTCHA token first
    const token = await getRecaptchaToken();
    setRecaptchaToken(token);

    const data = {
      bra_code: branchValue.split(" - ")[1], // Extract the branch code
      cus_num: customerNumber,
      cur_code: currencyValue.split(" - ")[0].trim(), // Extract the currency code
      led_code: accountTypeValue.split(" - ")[0].trim(), // Extract the account type code
      "g-recaptcha-response": token,
    };
    const response = await handleSubmit("send-code", data);
    if (response) {
      toast.success(t("تم إرسال البيانات بنجاح")); // Show success toast
      setIsCodeSent(true);
    } else {
      toast.error(t("The requested record was not found")); // Show success toast
    }
  };

  const handleVerifyCode = async () => {
    if (!isRecaptchaLoaded) {
      setRecaptchaError(t("جاري تحميل نظام التحقق، يرجى الانتظار"));
      return;
    }
    // Get reCAPTCHA token for verification
    const token = await getRecaptchaToken();
    setRecaptchaToken(token);

    const data = {
      code: verificationCode,
      "g-recaptcha-response": token, // Add reCAPTCHA token to verification request
    };

    const response = await handleSubmit("verify-code", data);

    // Check if the response contains iban_acc_no
    if (response && response.iban_acc_no) {
      // Show the IBAN number as a notification
      toast.success(`Your IBAN Number: ${response.iban_acc_no}`, {
        position: "top-right",
        autoClose: 5000, // Close after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error(t("Invalid verification code"));
    }
  };

  return (
    <div className="container mx-auto mt-[3rem]">
      <ToastContainer /> {/* Add ToastContainer to render notifications */}
      <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-x-12">
        <div className="lg:col-span-8 md:col-span-8">
          {isCodeSent ? (
            <div className="flex flex-col gap-y-4">
              <p className="font-[700] text-[1.2rem] mt-[1.5rem] text-[#333333]">
                {t(
                  "الرجاء ادخال الرمز الذي قمنا بارساله الى البريد الالكتروني :"
                )}
              </p>
              <p className="font-[700] text-[1.2rem] text-[#333333]">
                AH*****@YAHO.COM
              </p>
              <input
                type="text"
                className="w-[50%] px-[0.5rem] h-[4rem] rounded-sm border border-[#EDEDED]"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <div className="w-[5.5rem] rounded-[0.5rem] h-[2.5rem] bg-primary flex justify-center text-white font-[700]">
                <button onClick={handleVerifyCode}>{t("ارسال")}</button>
              </div>
            </div>
          ) : (
            <div className="mt-[5.5rem]">
              <div className="flex items-center text-center gap-x-2">
                <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
                <p className="text-[1.8rem] font-[700] text-[#333333]">
                  {t("الاستعلام عن")} IBAN
                </p>
              </div>
              <div className="grid lg:grid-cols-2 lg:space-y-0 space-y-4 mt-[2.5rem] gap-x-4">
                <div className="space-y-4">
                  <Dropdown
                    title={t("رقم الفرع")}
                    items={branchItems}
                    onSelect={setBranchValue}
                  />
                  <Dropdown
                    title={t("رقم العملة")}
                    items={currencyItems}
                    onSelect={setCurrencyValue}
                  />
                </div>
                <div className="space-y-4">
                  <input
                    className="w-full h-[3.5rem] border border-[#EDEDED] rounded-sm font-[500] placeholder-[#666666] text-[1rem] px-[0.5rem]"
                    type="text"
                    placeholder={t("رقم العميل")}
                    value={customerNumber}
                    onChange={(e) => setCustomerNumber(e.target.value)}
                  />
                  <Dropdown
                    title={t("نوع الحساب")}
                    items={accountTypeItems}
                    onSelect={setAccountTypeValue}
                  />
                </div>
              </div>
              <div className="flex items-center mt-[1rem]">
                <button
                  className={`relative w-[11rem] h-[3rem] transition-all duration-500 ease-in-out text-white font-bold overflow-hidden bg-gradient-to-l from-[#2F57C8] to-[#172B62]`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={handleSearch}
                >
                  <span
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      isHovered ? "bg-secondary" : ""
                    } transform ${
                      isHovered ? "scale-x-100" : "scale-x-0"
                    } origin-left`}
                  ></span>
                  <p className={`relative z-10`}>{t("ارسال")}</p>
                </button>
                <div
                  className={`flex items-center justify-center transition-all duration-300 ease-linear ${
                    isHovered
                      ? "rotate-0 h-[3rem] w-[3rem] top-0 bg-gradient-to-l from-[#2F57C8] to-[#172B62]"
                      : "rotate-[-45deg] top-2"
                  } w-[2.1rem] h-[2.1rem] ${
                    i18next.language == "en" ? "ml-[-1.1rem]" : "mr-[-1.1rem]"
                  } bg-secondary`}
                >
                  {i18next.language == "en" ? (
                    <FaArrowRightLong
                      className={`text-white ${
                        isHovered ? "rotate-0" : "rotate-[45deg]"
                      }`}
                    />
                  ) : (
                    <FaArrowLeftLong
                      className={`text-white ${
                        isHovered ? "rotate-0" : "rotate-[45deg]"
                      }`}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="lg:col-span-4 md:col-span-4">
          <BankEvents
            eventsData={eventsData}
            homePageData={homePageData}
            accountData={accountData}
          />
        </div>
      </div>
    </div>
  );
};

export default IbanInfo;
