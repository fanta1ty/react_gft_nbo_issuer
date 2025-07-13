import { use } from "i18next";
import { initReactI18next } from "react-i18next";
import { SupportedLocales } from "../recoil/atoms";
import translationEN from "./translationEN.json";
import translationSA from "./translationSA.json";

const resources = {
  [SupportedLocales.EN_US]: {
    translation: translationEN,
  },
  [SupportedLocales.AR_SA]: {
    translation: translationSA,
  },
};

const i18n = use(initReactI18next).init({
  resources,
  lng: SupportedLocales.EN_US,
  fallbackLng: SupportedLocales.EN_US,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
