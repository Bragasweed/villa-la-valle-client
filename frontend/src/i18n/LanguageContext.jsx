import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, translations } from "./locales";

const LanguageContext = createContext(null);
const STORAGE_KEY = "vlv_lang";
const isSupported = (value) => SUPPORTED_LANGUAGES.includes(value);

const getLanguageCode = (locale) => locale?.toLowerCase().split(/[-_]/)[0];

export const detectInitialLang = () => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isSupported(stored)) return stored;
  } catch {
    // Storage can be unavailable in private or restricted browsing contexts.
  }

  if (typeof navigator === "undefined") return DEFAULT_LANGUAGE;
  const browserLanguages = [
    ...(Array.isArray(navigator.languages) ? navigator.languages : []),
    navigator.language,
    navigator.userLanguage,
  ];
  const match = browserLanguages.map(getLanguageCode).find(isSupported);
  return match || DEFAULT_LANGUAGE;
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLanguage] = useState(detectInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Keep language switching functional even when storage is unavailable.
    }
  }, [lang]);

  const setLang = useCallback((nextLang) => {
    if (isSupported(nextLang)) setLanguage(nextLang);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang], supportedLanguages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
