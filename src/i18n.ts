import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEN from "./assets/locales/en/translation.json";
import translationRU from "./assets/locales/ru/translation.json";
import translationCN from "./assets/locales/cn/translation.json";

void i18n
  // Подключение бэкенда i18next
  .use(Backend)
  // Автоматическое определение языка
  .use(LanguageDetector)
  // модуль инициализации
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ru", "cn"],
    fallbackLng: "en",
    react: {
      useSuspense: false,
    },
    detection: {
      order: ["cookie", "localStorage", "htmlTag", "path", "subdomain"],
      caches: ["cookie"],
    },

    resources: {
      en: { translation: translationEN },
      ru: { translation: translationRU },
      cn: { translation: translationCN },
    },
  });

export default i18n;
