import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "../src/locale/en.json";
import arJSON from "../src/locale/ar.json";
import krJSON from "../src/locale/kr.json";
const resources = {
    en: {
        translation: enJSON,
    },
    ar: {
        translation: arJSON,
    },
    ku: {
        translation: krJSON
    }
};

const language = localStorage.getItem("language") || "ar";

i18n.use(initReactI18next).init({
    fallbackLng: "ar",
    debug: true,
    resources: {...resources },
    interpolation: {
        escapeValue: false,
    },
    lng: language,
}, (err) => {
    if (err) return console.log('i18next init error:', err);
    i18n.changeLanguage(language);
});

export default i18n;