import { createContext, FC, ReactNode, useContext } from "react";
import useI18n from "./useI18n";

interface I18nProviderProps {
  children: ReactNode;
  translations: object;
  langLocale: string;
}
export const I18nContext = createContext({} as ReturnType<typeof useI18n>);

export const I18nProvider: FC<I18nProviderProps> = ({
  children,
  translations,
  langLocale,
}) => {
  const i18n = useI18n(translations, langLocale);
  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
};

export const useI18nContext = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18nContext must be used within an I18nProvider");
  }
  return context;
};
