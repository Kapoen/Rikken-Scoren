import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import nl from "./locales/nl.json";
import en from "./locales/en.json";

const resources = {
    nl: { translation: nl },
    en: { translation: en }
};

void i18n
    .use(detector)
    .use(initReactI18next)
    .init({
        resources,
        supportedLngs: ["en", "nl"],
        fallbackLng: "en",

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;