import axios from "axios";
import i18next from "i18next";

const instance = axios.create({
    baseURL: "https://inibiq.hostorr.net/api",
});

instance.interceptors.request.use(function(config) {
    config.headers.Accept = "application/json";
    config.headers.lang = i18next.resolvedLanguage
    return config;
});

export default instance;