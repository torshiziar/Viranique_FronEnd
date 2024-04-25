import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import farsi from '../public/local/fa/translate';
import english from '../public/local/en/translate';
import detector from "i18next-browser-languagedetector";
let i18nextLng =localStorage.getItem('i18nextLng')
const resources = {
  en: {
    translation: {
      label: {},
      error: {},
      message: {},
      text: english,
      content: {}
    }
  },
  fa: {
    translation: {
      label: {},
      error: {},
      message: {},
      text: farsi,
      content: {}
    }
  }
};

i18n.use(initReactI18next)
.use(detector)
.init({
  lng: localStorage.getItem("lang") ? localStorage.getItem("lang") :'fa', 
  fallbackLng: localStorage.getItem("lang"),
  interpolation: {
    escapeValue: false
  },
  resources,
  i18nextLng
}

);




export default i18n;
