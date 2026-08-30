import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  applyCookieConsent,
  getDefaultCookiePreferences,
  normalizeCookiePreferences,
  readCookieConsent,
  saveCookieConsent,
} from "../lib/cookieConsent";

const CookieConsentContext = createContext(null);

// bootstrapAdvancedConsent() runs once in main.jsx, before this provider
// ever mounts — that's what guarantees gtag.js/Meta Pixel load as early as
// possible, right after index.html sets the Consent Mode "default".

export const CookieConsentProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(getDefaultCookiePreferences);
  const [hasConsented, setHasConsented] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);

  useEffect(() => {
    const stored = readCookieConsent();
    if (stored) {
      setPreferences(stored.preferences);
      setHasConsented(true);
      applyCookieConsent(stored.preferences);
      return;
    }

    setIsBannerVisible(true);
  }, []);

  const commit = useCallback((nextPreferences) => {
    const consent = saveCookieConsent(nextPreferences);
    setPreferences(consent.preferences);
    setHasConsented(true);
    applyCookieConsent(consent.preferences);
    setIsBannerVisible(false);
    setIsCustomizing(false);
  }, []);

  const acceptAll = useCallback(
    () => commit({ necessary: true, analytics: true, marketing: true }),
    [commit],
  );

  const rejectAll = useCallback(
    () => commit({ necessary: true, analytics: false, marketing: false }),
    [commit],
  );

  const savePreferences = useCallback(() => commit(preferences), [commit, preferences]);

  const togglePreference = useCallback((key) => {
    if (key === "necessary") return;
    setPreferences((current) => normalizeCookiePreferences({ ...current, [key]: !current[key] }));
  }, []);

  // Re-opens the customize panel at any time (e.g. from the footer link),
  // seeded with the last saved choice rather than whatever is in memory.
  const openPreferences = useCallback(() => {
    setPreferences(readCookieConsent()?.preferences || getDefaultCookiePreferences());
    setIsCustomizing(true);
    setIsBannerVisible(true);
  }, []);

  const closePreferences = useCallback(() => {
    setIsCustomizing(false);
    // Only dismissible without a choice if consent was already given before;
    // first-visit users must accept, reject, or save to close the banner.
    if (hasConsented) setIsBannerVisible(false);
  }, [hasConsented]);

  const value = useMemo(
    () => ({
      preferences,
      hasConsented,
      isBannerVisible,
      isCustomizing,
      acceptAll,
      rejectAll,
      savePreferences,
      togglePreference,
      openPreferences,
      closePreferences,
      setIsCustomizing,
    }),
    [
      preferences,
      hasConsented,
      isBannerVisible,
      isCustomizing,
      acceptAll,
      rejectAll,
      savePreferences,
      togglePreference,
      openPreferences,
      closePreferences,
    ],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
};

export const useCookieConsent = () => {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
};
