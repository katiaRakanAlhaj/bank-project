import i18next from "i18next";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useSubmitData from "../../hooks/useSubmitData";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import upload from "../../assets/images/upload.png";
import deleteIcon from "../../assets/images/delete.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PersonalInfo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const [handleSubmit, loading, success, isErr, err, sendStat] = useSubmitData();
  const { t } = useTranslation();
  
  // Define uploads array at the top
  const uploads = [
    { desc: t("صورة الهوية الشخصية (امام)"), img: upload, key: "personal_id_front" },
    { desc: t("بطاقة السكن (امام)"), img: upload, key: "residence_card_front" },
    { desc: t("شهادة الجنسية"), img: upload, key: "nationality_certificate" },
    { desc: t("هوية عمل"), img: upload, key: "work_id" },
    { desc: t("صورة الهوية الشخصية (خلف)"), img: upload, key: "personal_id_back" },
    { desc: t("بطاقة السكن (خلف)"), img: upload, key: "residence_card_back" },
    { desc: t("جواز السفر"), img: upload, key: "passport" },
    { desc: t("التوقيع"), img: upload, key: "signature" },
  ];

  // State to manage each input field
  const [formData, setFormData] = useState({
    full_name: "",
    mother_full_name: "",
    husband_name: "",
    profession: "",
    source_of_income: "",
    birth_date: "",
    education_level: "",
    address: "",
    nearest_landmark_to_address: "",
    workplace: "",
    phone_number: "",
    monthly_income: "",
    banks_dealt_with: "",
    type_of_accommodation: "",
    monthly_dealing: "",
    account_kind: "",
  });

  // State for uploaded files
  const [uploadedFiles, setUploadedFiles] = useState(
    Array(uploads.length).fill(null)
  );
  const fileInputRefs = useRef([]);

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
  
  // Handle input change
  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
    
    // Mark field as touched
    setTouched({
      ...touched,
      [field]: true
    });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Required fields validation
    if (!formData.full_name.trim()) {
      newErrors.full_name = t("هذا الحقل مطلوب");
      isValid = false;
    }
    
    if (!formData.mother_full_name.trim()) {
      newErrors.mother_full_name = t("هذا الحقل مطلوب");
      isValid = false;
    }
    if (!formData.husband_name.trim()) {
      newErrors.husband_name = t("هذا الحقل مطلوب");
      isValid = false;
    }
    if (!formData.profession.trim()) {
      newErrors.profession = t("هذا الحقل مطلوب");
      isValid = false;
    }
    if (!formData.workplace.trim()) {
      newErrors.workplace = t("هذا الحقل مطلوب");
      isValid = false;
    }
    if (!formData.type_of_accommodation.trim()) {
      newErrors.type_of_accommodation = t("هذا الحقل مطلوب");
      isValid = false;
    }
    if (!formData.banks_dealt_with.trim()) {
      newErrors.banks_dealt_with = t("هذا الحقل مطلوب");
      isValid = false;
    }
    if (!formData.monthly_income.trim()) {
      newErrors.monthly_income = t("هذا الحقل مطلوب");
      isValid = false;
    }
    if (!formData.monthly_dealing.trim()) {
      newErrors.monthly_dealing = t("هذا الحقل مطلوب");
      isValid = false;
    }
    if (!formData.nearest_landmark_to_address.trim()) {
      newErrors.nearest_landmark_to_address = t("هذا الحقل مطلوب");
      isValid = false;
    }
    if (!formData.source_of_income.trim()) {
      newErrors.source_of_income = t("هذا الحقل مطلوب");
      isValid = false;
    }
    
    if (!formData.birth_date) {
      newErrors.birth_date = t("هذا الحقل مطلوب");
      isValid = false;
    }
    
    if (!formData.education_level.trim()) {
      newErrors.education_level = t("هذا الحقل مطلوب");
      isValid = false;
    }
    
    if (!formData.address.trim()) {
      newErrors.address = t("هذا الحقل مطلوب");
      isValid = false;
    }
    
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = t("هذا الحقل مطلوب");
      isValid = false;
    } 
    
    if (!formData.account_kind) {
      newErrors.account_kind = t("هذا الحقل مطلوب");
      isValid = false;
    }

    // File uploads validation
    uploads.forEach((uploadItem, index) => {
      if (!uploadedFiles[index]) {
        newErrors[uploadItem.key] = t("هذا الحقل مطلوب");
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };
  useEffect(() => {
    return () => {
      // Cleanup any pending timeouts when component unmounts
      clearTimeout(reloadTimeout.current);
    };
  }, []);
  
  const reloadTimeout = useRef();
  // Handle form submission
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
      toast.error(t("الرجاء إكمال جميع الحقول المطلوبة"));
      // Mark all fields as touched to show all errors
      setTouched({
        full_name: true,
        mother_full_name: true,
        husband_name: true,
        profession: true,
        source_of_income: true,
        birth_date: true,
        education_level: true,
        address: true,
        nearest_landmark_to_address: true,
        workplace: true,
        phone_number: true,
        monthly_income: true,
        banks_dealt_with: true,
        type_of_accommodation: true,
        monthly_dealing: true,
        account_kind: true,
        ...Object.fromEntries(uploads.map(u => [u.key, true]))
      });
      return;
    }
  
    const dataToSend = {
      ...formData,
      personal_id_front: uploadedFiles[0],
      residence_card_front: uploadedFiles[1],
      nationality_certificate: uploadedFiles[2],
      work_id: uploadedFiles[3],
      personal_id_back: uploadedFiles[4],
      residence_card_back: uploadedFiles[5],
      passport: uploadedFiles[6],
      signature: uploadedFiles[7],
      'g-recaptcha-response': token
    };
  
    const formDataObj = new FormData();
    Object.keys(dataToSend).forEach((key) => {
      formDataObj.append(key, dataToSend[key]);
    });
  
    try {
      const response = await handleSubmit("PersonalInformation", formDataObj);
      if (response) {
        toast.success(t("تم ارسال البيانات بنجاح"), {
          onClose: () => {
            // Reset form fields
            setFormData({
              full_name: "",
              mother_full_name: "",
              husband_name: "",
              profession: "",
              source_of_income: "",
              birth_date: "",
              education_level: "",
              address: "",
              nearest_landmark_to_address: "",
              workplace: "",
              phone_number: "",
              monthly_income: "",
              banks_dealt_with: "",
              type_of_accommodation: "",
              monthly_dealing: "",
              account_kind: "",
            });
            // Reset uploaded files
            setUploadedFiles(Array(uploads.length).fill(null));
            // Reset errors and touched
            setErrors({});
            setTouched({});
            
            // Force a full page reload after successful submission
            window.location.reload(true);
          }
        });
      }
    } catch (error) {
      console.log("حدث خطأ أثناء إرسال البيانات!");
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
    }
  };
  const handleImageClick = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
    // Mark file field as touched
    const fieldKey = uploads[index].key;
    setTouched({
      ...touched,
      [fieldKey]: true
    });
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newUploads = [...uploadedFiles];
      newUploads[index] = file;
      setUploadedFiles(newUploads);
      
      // Clear error for this file
      const fieldKey = uploads[index].key;
      if (errors[fieldKey]) {
        setErrors({
          ...errors,
          [fieldKey]: null
        });
      }
    }
  };

  const handleDelete = (index, event) => {
    event.stopPropagation();
    
    try {
      // Clear the file input value if it exists
      const fileInput = fileInputRefs.current[index];
      if (fileInput && fileInput instanceof HTMLInputElement) {
        fileInput.value = '';
      }
    } catch (error) {
      console.error('Error clearing file input:', error);
    }
    
    const newUploads = [...uploadedFiles];
    newUploads[index] = null;
    setUploadedFiles(newUploads);
    
    // Set error for this file if it's required
    const fieldKey = uploads[index].key;
    setErrors({
      ...errors,
      [fieldKey]: t("هذا الملف مطلوب")
    });
  };

  return (
    <div>
      <ToastContainer />

      <div className="flex items-center text-center gap-x-2">
        <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
        <p className="text-[1.8rem] font-[700] text-[#333333]">
          {t("المعلومات الشخصية")}
        </p>
      </div>
      <form className="mt-[2.5rem]" onSubmit={handleFormSubmit}>
        <div>
          <div className="grid lg:grid-cols-2 gap-x-4">
            <div className="space-y-6">
              <div>
                <input
                  className={`w-full h-[3.5rem] placeholder-[#666666] px-[0.5rem] text-[0.9rem] font-[500] border ${
                    errors.full_name && touched.full_name ? "border-red-500" : "border-[#EDEDED]"
                  } rounded-sm`}
                  type="text"
                  placeholder={t("الاسم الرباعي")}
                  value={formData.full_name}
                  onChange={handleChange("full_name")}
                  onBlur={() => setTouched({...touched, full_name: true})}
                />
                {errors.full_name && touched.full_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
                )}
              </div>
              
              <div>
                <input
                  className={`w-full h-[3.5rem] placeholder-[#666666] px-[0.5rem] text-[0.9rem] font-[500] border ${
                    errors.husband_name && touched.husband_name ? "border-red-500" : "border-[#EDEDED]"
                  } rounded-sm`}
                  type="text"
                  placeholder={t("اسم الزوج/ة")}
                  value={formData.husband_name}
                  onChange={handleChange("husband_name")}
                  onBlur={() => setTouched({...touched, husband_name: true})}
                />
                {errors.husband_name && touched.husband_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.husband_name}</p>
                )}
              </div>
              
              <div>
                <input
                  className={`w-full h-[3.5rem] placeholder-[#666666] px-[0.5rem] text-[0.9rem] font-[500] border ${
                    errors.source_of_income && touched.source_of_income ? "border-red-500" : "border-[#EDEDED]"
                  } rounded-sm`}
                  type="text"
                  placeholder={t("مصدر الدخل")}
                  value={formData.source_of_income}
                  onChange={handleChange("source_of_income")}
                  onBlur={() => setTouched({...touched, source_of_income: true})}
                />
                {errors.source_of_income && touched.source_of_income && (
                  <p className="text-red-500 text-xs mt-1">{errors.source_of_income}</p>
                )}
              </div>
              
              <div>
                <input
                  className={`w-full h-[3.5rem] placeholder-[#666666] px-[0.5rem] text-[0.9rem] font-[500] border ${
                    errors.education_level && touched.education_level ? "border-red-500" : "border-[#EDEDED]"
                  } rounded-sm`}
                  type="text"
                  placeholder={t("مستوى التعليم")}
                  value={formData.education_level}
                  onChange={handleChange("education_level")}
                  onBlur={() => setTouched({...touched, education_level: true})}
                />
                {errors.education_level && touched.education_level && (
                  <p className="text-red-500 text-xs mt-1">{errors.education_level}</p>
                )}
              </div>
              
              <div>
                <input
                  className={`w-full h-[3.5rem] placeholder-[#666666] px-[0.5rem] text-[0.9rem] font-[500] border ${
                    errors.nearest_landmark_to_address && touched.nearest_landmark_to_address ? "border-red-500" : "border-[#EDEDED]"
                  } rounded-sm`}
                  type="text"
                  placeholder={t("اقرب نقطة دالة لعنوان السكن")}
                  value={formData.nearest_landmark_to_address}
                  onChange={handleChange("nearest_landmark_to_address")}
                  onBlur={() => setTouched({...touched, nearest_landmark_to_address: true})}
                />
                {errors.nearest_landmark_to_address && touched.nearest_landmark_to_address && (
                  <p className="text-red-500 text-xs mt-1">{errors.nearest_landmark_to_address}</p>
                )}
              </div>
              
              <div>
                <input
                style={{unicodeBidi: 'plaintext'}}
                  className={`w-full h-[3.5rem] placeholder-[#666666] px-[0.5rem] text-[0.9rem] font-[500] border ${
                    errors.phone_number && touched.phone_number ? "border-red-500" : "border-[#EDEDED]"
                  } rounded-sm`}
                  type="text"
                  placeholder={t("رقم الهاتف")}
                  value={formData.phone_number}
                  onChange={handleChange("phone_number")}
                  onBlur={() => setTouched({...touched, phone_number: true})}
                />
                {errors.phone_number && touched.phone_number && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>
                )}
              </div>
              
              <div>
                <input
                  className={`w-full h-[3.5rem] placeholder-[#666666] px-[0.5rem] text-[0.9rem] font-[500] border ${
                    errors.banks_dealt_with && touched.banks_dealt_with ? "border-red-500" : "border-[#EDEDED]"
                  } rounded-sm`}
                  type="text"
                  placeholder={t("المصارف المتعامل بها")}
                  value={formData.banks_dealt_with}
                  onChange={handleChange("banks_dealt_with")}
                  onBlur={() => setTouched({...touched, banks_dealt_with: true})}
                />
                {errors.banks_dealt_with && touched.banks_dealt_with && (
                  <p className="text-red-500 text-xs mt-1">{errors.banks_dealt_with}</p>
                )}
              </div>
              
              <div>
                <input
                  className={`w-full h-[3.5rem] placeholder-[#666666] px-[0.5rem] text-[0.9rem] font-[500] border ${
                    errors.monthly_dealing && touched.monthly_dealing ? "border-red-500" : "border-[#EDEDED]"
                  } rounded-sm`}
                  type="text"
                  placeholder={t("التعامل الشهري")}
                  value={formData.monthly_dealing}
                  onChange={handleChange("monthly_dealing")}
                  onBlur={() => setTouched({...touched, monthly_dealing: true})}
                />
                {errors.monthly_dealing && touched.monthly_dealing && (
                  <p className="text-red-500 text-xs mt-1">{errors.monthly_dealing}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <input
                  className={`w-full h-[3.5rem] placeholder-[#666666] px-[0.5rem] text-[0.9rem] font-[500] border ${
                    errors.mother_full_name && touched.mother_full_name ? "border-red-500" : "border-[#EDEDED]"
                  } rounded-sm`}
                  type="text"
                  placeholder={t("اسم الام الثلاثي")}
                  value={formData.mother_full_name}
                  onChange={handleChange("mother_full_name")}
                  onBlur={() => setTouched({...touched, mother_full_name: true})}
                />
                {errors.mother_full_name && touched.mother_full_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.mother_full_name}</p>
                )}
              </div>
              
              <div>
                <input
                  className={`w-full h-[3.5rem] placeholder-[#666666] px-[0.5rem] text-[0.9rem] font-[500] border ${
                    errors.profession && touched.profession ? "border-red-500" : "border-[#EDEDED]"
                  } rounded-sm`}
                  type="text"
                  placeholder={t("المهنة")}
                  value={formData.profession}
                  onChange={handleChange("profession")}
                  onBlur={() => setTouched({...touched, profession: true})}
                />
                {errors.profession && touched.profession && (
                  <p className="text-red-500 text-xs mt-1">{errors.profession}</p>
                )}
              </div>
              
              <div>
                <input
                  className={`w-full h-[3.5rem] placeholder-[#666666] px-[0.5rem] text-[0.9rem] font-[500] border ${
                    errors.birth_date && touched.birth_date ? "border-red-500" : "border-[#EDEDED]"
                  } rounded-sm`}
                  type="date"
                  placeholder="تاريخ الولادة mm/dd/yy"
                  value={formData.birth_date}
                  onChange={handleChange("birth_date")}
                  onBlur={() => setTouched({...touched, birth_date: true})}
                />
                {errors.birth_date && touched.birth_date && (
                  <p className="text-red-500 text-xs mt-1">{errors.birth_date}</p>
                )}
              </div>
              
              <div>
                <input
                  className={`w-full h-[3.5rem] placeholder-[#666666] px-[0.5rem] text-[0.9rem] font-[500] border ${
                    errors.address && touched.address ? "border-red-500" : "border-[#EDEDED]"
                  } rounded-sm`}
                  type="text"
                  placeholder={t("العنوان")}
                  value={formData.address}
                  onChange={handleChange("address")}
                  onBlur={() => setTouched({...touched, address: true})}
                />
                {errors.address && touched.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>
              
              <div>
                <input
                  className={`w-full h-[3.5rem] placeholder-[#666666] px-[0.5rem] text-[0.9rem] font-[500] border ${
                    errors.workplace && touched.workplace ? "border-red-500" : "border-[#EDEDED]"
                  } rounded-sm`}
                  type="text"
                  placeholder={t("مكان العمل")}
                  value={formData.workplace}
                  onChange={handleChange("workplace")}
                  onBlur={() => setTouched({...touched, workplace: true})}
                />
                {errors.workplace && touched.workplace && (
                  <p className="text-red-500 text-xs mt-1">{errors.workplace}</p>
                )}
              </div>
              
              <div>
                <input
                  className={`w-full h-[3.5rem] placeholder-[#666666] px-[0.5rem] text-[0.9rem] font-[500] border ${
                    errors.monthly_income && touched.monthly_income ? "border-red-500" : "border-[#EDEDED]"
                  } rounded-sm`}
                  type="text"
                  placeholder={t("الدخل الشهري")}
                  value={formData.monthly_income}
                  onChange={handleChange("monthly_income")}
                  onBlur={() => setTouched({...touched, monthly_income: true})}
                />
                {errors.monthly_income && touched.monthly_income && (
                  <p className="text-red-500 text-xs mt-1">{errors.monthly_income}</p>
                )}
              </div>
              
              <div>
                <input
                  className={`w-full h-[3.5rem] placeholder-[#666666] px-[0.5rem] text-[0.9rem] font-[500] border ${
                    errors.type_of_accommodation && touched.type_of_accommodation ? "border-red-500" : "border-[#EDEDED]"
                  } rounded-sm`}
                  type="text"
                  placeholder={t("نوع السكن")}
                  value={formData.type_of_accommodation}
                  onChange={handleChange("type_of_accommodation")}
                  onBlur={() => setTouched({...touched, type_of_accommodation: true})}
                />
                {errors.type_of_accommodation && touched.type_of_accommodation && (
                  <p className="text-red-500 text-xs mt-1">{errors.type_of_accommodation}</p>
                )}
              </div>
              
              <div>
                <select
                  className={`w-full h-[3.5rem] placeholder-[#666666] px-[0.5rem] text-[0.9rem] font-[500] border ${
                    errors.account_kind && touched.account_kind ? "border-red-500" : "border-[#EDEDED]"
                  } rounded-sm`}
                  value={formData.account_kind}
                  onChange={handleChange("account_kind")}
                  onBlur={() => setTouched({...touched, account_kind: true})}
                >
                  <option value="" disabled>{t("اختر نوع الحساب")}</option>
                  <option value={t("Individual Account")}>{t("Individual Account")}</option>
                  <option value={t("Company Account")}>{t("Company Account")}</option>
                </select>
                {errors.account_kind && touched.account_kind && (
                  <p className="text-red-500 text-xs mt-1">{errors.account_kind}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-[2rem]">
            <div className="flex items-center text-center gap-x-2 mt-[2em]">
              <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
              <p className="text-[1.8rem] font-[700] text-[#333333]">
                {t("المستمسكات")}
              </p>
            </div>
            {/* <label className="inline-flex items-center mt-[1rem] cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              <span className="font-[500] text-[0.9rem] text-[#525252] mr-[0.5rem]">
                {t("يوجد لدي بطاقة موحدة")}
              </span>
            </label> */}
          </div>
          
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:space-y-0 space-y-2 gap-x-4 mt-[1.5rem]">
            <div className="space-y-6">
              {uploads.slice(0, 4).map((uploadItem, index) => (
                <div key={index}>
                  <div
                    className={`w-full flex items-center px-[0.5rem] ${
                      uploadedFiles[index] ? "text-white" : "text-[#666666]"
                    } font-[500] text-[0.9rem] relative h-[3.5rem] border ${
                      errors[uploadItem.key] && touched[uploadItem.key] ? "border-red-500" : "border-[#EDEDED]"
                    } rounded-sm`}
                    onClick={() => handleImageClick(index)}
                  >
                    <span
                      className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                        uploadedFiles[index] ? "bg-[#56C568]" : ""
                      } transform ${
                        uploadedFiles[index] ? "scale-x-100" : "scale-x-0"
                      } origin-left`}
                    ></span>
                    <p
                      className={`z-10 absolute ${
                        i18next.language == "en" ? "left-24" : "right-2"
                      }`}
                    >
                      {uploadedFiles[index]
                        ? `${t("تم رفع")} ${uploadItem.desc}`
                        : uploadItem.desc}
                    </p>
                    <div
                      className={`absolute flex items-center justify-center w-[5rem] h-[100%] top-0 left-0 ${
                        uploadedFiles[index] ? "bg-[#EB5757]" : "bg-primary"
                      } rounded-tl-sm rounded-bl-sm`}
                    >
                      <img
                        className="w-[2rem] h-[2rem]"
                        src={uploadedFiles[index] ? deleteIcon : uploadItem.img}
                        alt={uploadItem.desc}
                        onClick={(e) => {
                          if (uploadedFiles[index]) handleDelete(index, e);
                        }}
                      />
                    </div>
                    <input
                      type="file"
                      ref={(el) => (fileInputRefs.current[index] = el)}
                      className="hidden"
                      onChange={(event) => handleFileChange(event, index)}
                    />
                  </div>
                  {errors[uploadItem.key] && touched[uploadItem.key] && (
                    <p className="text-red-500 text-xs mt-1">{errors[uploadItem.key]}</p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              {uploads.slice(4).map((uploadItem, index) => (
                <div key={index + 4}>
                  <div
                    className={`w-full flex items-center px-[0.5rem] ${
                      uploadedFiles[index + 4] ? "text-white" : "text-[#666666]"
                    } font-[500] text-[0.9rem] relative h-[3.5rem] border ${
                      errors[uploadItem.key] && touched[uploadItem.key] ? "border-red-500" : "border-[#EDEDED]"
                    } rounded-sm`}
                    onClick={() => handleImageClick(index + 4)}
                  >
                    <span
                      className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                        uploadedFiles[index + 4] ? "bg-[#56C568]" : ""
                      } transform ${
                        uploadedFiles[index + 4] ? "scale-x-100" : "scale-x-0"
                      } origin-left`}
                    ></span>
                    <p
                      className={`z-10 absolute ${
                        i18next.language == "en" ? "left-24" : "right-2"
                      }`}
                    >
                      {uploadedFiles[index + 4]
                        ? `تم رفع ${uploadItem.desc}`
                        : uploadItem.desc}
                    </p>
                    <div
                      className={`absolute flex items-center justify-center w-[5rem] h-[100%] top-0 left-0 ${
                        uploadedFiles[index + 4] ? "bg-[#EB5757]" : "bg-primary"
                      } rounded-tl-sm rounded-bl-sm`}
                    >
                      <img
                        className="w-[2rem] h-[2rem]"
                        src={uploadedFiles[index + 4] ? deleteIcon : uploadItem.img}
                        alt={uploadItem.desc}
                        onClick={(e) => {
                          if (uploadedFiles[index + 4]) handleDelete(index + 4, e);
                        }}
                      />
                    </div>
                    <input
                      type="file"
                      ref={(el) => (fileInputRefs.current[index + 4] = el)}
                      className="hidden"
                      onChange={(event) => handleFileChange(event, index + 4)}
                    />
                  </div>
                  {errors[uploadItem.key] && touched[uploadItem.key] && (
                    <p className="text-red-500 text-xs mt-1">{errors[uploadItem.key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
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
      </form>
    </div>
  );
};

export default PersonalInfo;
