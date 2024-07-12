import { I18n } from "i18n-js";
import { useEffect, useState } from "react";

const useI18n = (translations: object, langLocale: string) => {
  const [locale, setLocale] = useState(langLocale);
  const [i18n] = useState(new I18n(translations));

  useEffect(() => {
    i18n.locale = locale;
    i18n.defaultLocale = locale;
    i18n.enableFallback = true;
  }, [locale]);

  const setLanguage = (lang: string) => {
    setLocale(lang);
  };

  return {
    t: i18n.translate.bind(i18n),
    locale,
    setLanguage,
    availableLanguages: Object.keys(translations)[0],
  };
};
export default useI18n;
