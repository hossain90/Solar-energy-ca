import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import arTranslations from './locales/ar.json';
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';

export const RTL_LANGUAGES = ['ar'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: arTranslations },
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      fr: { translation: frTranslations }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring', 'navigator', 'localStorage'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'preferredLanguage',
      caches: ['localStorage']
    }
  });

export const isRTL = (language: string): boolean => {
  return RTL_LANGUAGES.includes(language);
};

export default i18n;