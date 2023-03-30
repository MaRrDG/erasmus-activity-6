import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { ro } from "./locales/ro";
import { en } from "./locales/en";

void i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        resources: {
            ro: {
                translation: { ...ro },
            },
            en: {
                translation: { ...en },
            },
        },
        interpolation: {
            escapeValue: false,
        },
    });
export default i18n;
