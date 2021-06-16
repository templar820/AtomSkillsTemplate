import i18n from "i18next";
import { initReactI18next  } from "react-i18next";

import translationRU from './locales/ru.json';

const resources = {
  ru: {
    translation: translationRU
  }
};
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;