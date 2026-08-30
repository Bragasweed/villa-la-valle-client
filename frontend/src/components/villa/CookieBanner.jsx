import { useEffect, useId, useRef } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { useCookieConsent } from "../../context/CookieConsentContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

const PRIVACY_POLICY_URL = "https://www.iubenda.com/privacy-policy/39297685";
const COOKIE_POLICY_URL = "https://www.iubenda.com/privacy-policy/39297685/cookie-policy";

const CATEGORY_KEYS = ["necessary", "analytics", "marketing"];

// All three primary actions share the same visual weight (border + neutral
// fill on hover) so none is nudged as the "preferred" choice.
const ACTION_BUTTON_CLASS =
  "border border-charcoal/30 px-5 py-3 text-[11px] uppercase tracking-luxury text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne";

const PolicyLinks = ({ labels, className }) => (
  <div className={className}>
    <a
      href={PRIVACY_POLICY_URL}
      target="_blank"
      rel="noreferrer"
      className="underline-offset-4 hover:text-champagne hover:underline"
    >
      {labels.privacyPolicy}
    </a>
    <a
      href={COOKIE_POLICY_URL}
      target="_blank"
      rel="noreferrer"
      className="underline-offset-4 hover:text-champagne hover:underline"
    >
      {labels.cookiePolicy}
    </a>
  </div>
);

const CategoryToggle = ({ category, categoryKey, checked, onToggle, alwaysActiveLabel }) => {
  const inputId = useId();
  const locked = categoryKey === "necessary";

  return (
    <div className="border border-charcoal/10 bg-warmwhite p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <label htmlFor={inputId} className="text-sm font-medium text-charcoal">
            {category.title}
          </label>
          <p className="mt-1 text-xs font-light leading-5 text-charcoal-muted">{category.description}</p>
        </div>
        <button
          id={inputId}
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onToggle(categoryKey)}
          disabled={locked}
          className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition-colors ${
            checked ? "bg-champagne" : "bg-charcoal/20"
          } ${locked ? "cursor-not-allowed opacity-70" : "hover:bg-champagne/80"} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne`}
        >
          <span
            className={`absolute left-0 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
              checked ? "translate-x-6" : "translate-x-1"
            }`}
          />
          <span className="sr-only">{locked ? alwaysActiveLabel : category.title}</span>
        </button>
      </div>
    </div>
  );
};

const CookieBanner = () => {
  const { t } = useLanguage();
  const cb = t.cookieBanner;

  const {
    preferences,
    hasConsented,
    isBannerVisible,
    isCustomizing,
    acceptAll,
    rejectAll,
    savePreferences,
    togglePreference,
    closePreferences,
    setIsCustomizing,
  } = useCookieConsent();

  const headingId = useId();
  const descriptionId = useId();
  const bannerRef = useRef(null);

  useEffect(() => {
    if (isBannerVisible && !isCustomizing) {
      bannerRef.current?.focus();
    }
  }, [isBannerVisible, isCustomizing]);

  if (!isBannerVisible) return null;

  if (isCustomizing) {
    return (
      <Dialog
        open
        onOpenChange={(open) => {
          if (!open) closePreferences();
        }}
      >
        <DialogContent
          className="max-w-2xl border-charcoal/10 bg-ivory p-0 sm:rounded-none"
          onEscapeKeyDown={(event) => {
            if (!hasConsented) event.preventDefault();
          }}
          onPointerDownOutside={(event) => {
            if (!hasConsented) event.preventDefault();
          }}
          onInteractOutside={(event) => {
            if (!hasConsented) event.preventDefault();
          }}
        >
          <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
            <DialogHeader>
              <p className="text-[11px] uppercase tracking-luxury-wide text-champagne">{cb.eyebrow}</p>
              <DialogTitle className="mt-2 font-serif text-2xl font-light text-charcoal">
                {cb.customizeTitle}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm font-light leading-6 text-charcoal-muted">
                {cb.customizeDescription}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-3">
              {CATEGORY_KEYS.map((key) => (
                <CategoryToggle
                  key={key}
                  categoryKey={key}
                  category={cb.categories[key]}
                  checked={preferences[key]}
                  onToggle={togglePreference}
                  alwaysActiveLabel={cb.alwaysActive}
                />
              ))}
            </div>

            <PolicyLinks
              labels={cb}
              className="mt-6 flex flex-col gap-2 text-[11px] uppercase tracking-luxury text-charcoal-muted sm:flex-row sm:gap-5"
            />

            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              <button type="button" onClick={acceptAll} className={ACTION_BUTTON_CLASS}>
                {cb.acceptAll}
              </button>
              <button type="button" onClick={rejectAll} className={ACTION_BUTTON_CLASS}>
                {cb.rejectAll}
              </button>
              <button type="button" onClick={savePreferences} className={ACTION_BUTTON_CLASS}>
                {cb.savePreferences}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div
      ref={bannerRef}
      tabIndex={-1}
      role="region"
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 outline-none sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-4xl border border-charcoal/10 bg-ivory/95 shadow-2xl backdrop-blur">
        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-luxury-wide text-champagne">{cb.eyebrow}</p>
            <h2 id={headingId} className="mt-2 font-serif text-2xl font-light text-charcoal">
              {cb.title}
            </h2>
            <p id={descriptionId} className="mt-3 text-sm font-light leading-6 text-charcoal-muted">
              {cb.description}
            </p>
            <PolicyLinks
              labels={cb}
              className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[11px] uppercase tracking-luxury text-charcoal-muted"
            />
          </div>

          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <button type="button" onClick={acceptAll} className={ACTION_BUTTON_CLASS}>
              {cb.acceptAll}
            </button>
            <button type="button" onClick={rejectAll} className={ACTION_BUTTON_CLASS}>
              {cb.rejectAll}
            </button>
            <button type="button" onClick={() => setIsCustomizing(true)} className={ACTION_BUTTON_CLASS}>
              {cb.customize}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
