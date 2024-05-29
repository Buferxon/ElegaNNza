import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';


import en from './en.json';
import es from './es.json';

//Aqui se añaden los lenguajes que se quieran
i18n.use(initReactI18next).init({
    lng: 'es',
    fallbackLng: 'es',
    compatibilityJSON: 'v3',
    resources: {
      en: en,
      es: es,
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;

  export function iniciarTraduccion(){
    const { t } = useTranslation();
    return t;
  }