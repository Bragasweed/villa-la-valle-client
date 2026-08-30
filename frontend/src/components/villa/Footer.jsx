import { Mail } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { VILLA } from "../../data/villa.config";
import { useCookieConsent } from "../../context/CookieConsentContext";
import Logo from "./Logo";

const PRIVACY_POLICY_URL = "https://www.iubenda.com/privacy-policy/39297685";
const COOKIE_POLICY_URL = "https://www.iubenda.com/privacy-policy/39297685/cookie-policy";

const Footer = () => {
  const { t, lang, setLang, supportedLanguages } = useLanguage();
  const { openPreferences } = useCookieConsent();
  const year = new Date().getFullYear();

  return (
    <footer
      data-testid="footer"
      className="bg-warmwhite border-t border-charcoal/10 py-14"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div>
            <Logo className="h-10 w-auto text-forest" aria-label={VILLA.name} />
            <p className="text-charcoal-muted text-sm mt-3 font-light max-w-xs">
              {t.footer.tagline}
            </p>
            <p className="text-charcoal-muted text-[10px] uppercase tracking-luxury mt-4">
              {t.footer.reg} {VILLA.contact.registrationId}
            </p>
          </div>

          <div className="flex md:justify-center gap-6">
            <a
              href={`mailto:${VILLA.contact.email}`}
              data-testid="footer-email"
              aria-label="Email"
              className="text-forest hover:text-forest-dark transition-colors"
            >
              <Mail size={18} strokeWidth={1.2} />
            </a>
          </div>

          <div className="md:text-right flex flex-wrap md:flex-col gap-5 md:items-end">
            <label className="text-[11px] uppercase tracking-luxury-wide text-charcoal-muted">
              {t.footer.lang}:
              <select value={lang} onChange={(event) => setLang(event.target.value)} data-testid="footer-lang" aria-label={t.ui.languageSelector} className="ml-2 bg-transparent text-forest outline-none">
                {supportedLanguages.map((code) => <option key={code} value={code}>{code.toUpperCase()}</option>)}
              </select>
            </label>
            <a
              href={PRIVACY_POLICY_URL}
              target="_blank"
              rel="noreferrer"
              data-testid="footer-privacy"
              className="text-[11px] uppercase tracking-luxury text-charcoal-muted hover:text-champagne transition-colors"
            >
              {t.footer.privacy}
            </a>
            <a
              href={COOKIE_POLICY_URL}
              target="_blank"
              rel="noreferrer"
              data-testid="footer-cookie-policy"
              className="text-[11px] uppercase tracking-luxury text-charcoal-muted hover:text-champagne transition-colors"
            >
              {t.footer.cookiePolicy}
            </a>
            <button
              type="button"
              onClick={openPreferences}
              data-testid="footer-cookie-preferences"
              className="text-[11px] uppercase tracking-luxury text-charcoal-muted hover:text-champagne transition-colors"
            >
              {t.footer.cookiePreferences}
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-charcoal/10 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-[11px] uppercase tracking-luxury text-charcoal-muted">
            © {year} {VILLA.name} · {t.footer.rights}
          </p>
          <p className="text-[11px] uppercase tracking-luxury text-charcoal-muted">
            {VILLA.contact.address}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
