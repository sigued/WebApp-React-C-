import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "src/translations/en.json";
import fr from "src/translations/fr.json";

const resources = {
  en,
  fr,
};

i18next.use(initReactI18next).init({
  defaultNS: "translation",
  resources,
  lng: "fr",
  fallbackLng: "fr",
  // fallbackLng: "en-US",
});

export default i18next;
