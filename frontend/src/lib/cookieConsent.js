const CONSENT_STORAGE_KEY = "vlv_cookie_consent";
const CONSENT_SCHEMA_VERSION = 2;

// Bump this whenever the iubenda Privacy/Cookie Policy text materially changes.
// A mismatch invalidates any stored consent and forces the banner to reappear,
// so users always consent under the policy actually in force.
export const COOKIE_POLICY_VERSION = "2026-07-22";

// GDPR guidance (and most DPAs) treat 6 months as the outer bound for cookie
// consent validity before it must be asked again.
const CONSENT_MAX_AGE_MONTHS = 6;

const DEFAULT_PREFERENCES = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const POSTHOG_API_KEY = "phc_xAvL2Iq4tFmANRE7kzbKwaSqp1HJjN7x48s3vr0CMjs";
const POSTHOG_API_HOST = "https://us.i.posthog.com";

let gtagBootstrapped = false;
let metaPixelBootstrapped = false;
let postHogBootstrapped = false;

const hasWindow = () => typeof window !== "undefined";

export const getDefaultCookiePreferences = () => ({ ...DEFAULT_PREFERENCES });

export const normalizeCookiePreferences = (preferences = {}) => ({
  necessary: true,
  analytics: Boolean(preferences.analytics),
  marketing: Boolean(preferences.marketing),
});

const createConsentId = () => {
  if (hasWindow() && window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `vlv-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const isExpired = (updatedAtIso) => {
  const updatedAt = new Date(updatedAtIso);
  if (Number.isNaN(updatedAt.getTime())) return true;

  const expiry = new Date(updatedAt);
  expiry.setMonth(expiry.getMonth() + CONSENT_MAX_AGE_MONTHS);
  return Date.now() > expiry.getTime();
};

// Reads and validates the stored consent record. Returns null (forcing the
// banner to show again) if it's missing, from an old schema, tied to a since-
// changed policy version, or older than the 6-month validity window.
export const readCookieConsent = () => {
  if (!hasWindow()) return null;

  try {
    const rawConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!rawConsent) return null;

    const parsed = JSON.parse(rawConsent);
    if (!parsed || parsed.schemaVersion !== CONSENT_SCHEMA_VERSION) return null;
    if (parsed.policyVersion !== COOKIE_POLICY_VERSION) return null;
    if (isExpired(parsed.updatedAt)) return null;

    return {
      schemaVersion: CONSENT_SCHEMA_VERSION,
      policyVersion: parsed.policyVersion,
      consentId: parsed.consentId,
      preferences: normalizeCookiePreferences(parsed.preferences),
      updatedAt: parsed.updatedAt,
    };
  } catch (error) {
    return null;
  }
};

// Persists categories accepted + timestamp + policy version as proof of
// consent, per GDPR accountability requirements.
export const saveCookieConsent = (preferences) => {
  const consent = {
    schemaVersion: CONSENT_SCHEMA_VERSION,
    policyVersion: COOKIE_POLICY_VERSION,
    consentId: readCookieConsent()?.consentId || createConsentId(),
    preferences: normalizeCookiePreferences(preferences),
    updatedAt: new Date().toISOString(),
  };

  if (hasWindow()) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    } catch (error) {
      // Ignore storage errors; consent still applies for the current page view.
    }
  }

  return consent;
};

const ensureGtagStub = () => {
  if (!hasWindow()) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };
};

// Reflects the user's actual choice. Consent Mode "update" commands are not
// region-scoped: they simply state what this specific visitor has decided,
// overriding whichever regional default applied to them.
export const updateGoogleConsentMode = (preferences) => {
  if (!hasWindow()) return;
  ensureGtagStub();

  const normalized = normalizeCookiePreferences(preferences);
  const analyticsGranted = normalized.analytics ? "granted" : "denied";
  const marketingGranted = normalized.marketing ? "granted" : "denied";

  window.gtag("consent", "update", {
    ad_storage: marketingGranted,
    ad_user_data: marketingGranted,
    ad_personalization: marketingGranted,
    analytics_storage: analyticsGranted,
    personalization_storage: marketingGranted,
  });
};

const updateMetaPixelConsent = (isGranted) => {
  if (!hasWindow() || typeof window.fbq !== "function") return;
  window.fbq("consent", isGranted ? "grant" : "revoke");
};

const appendScriptOnce = ({ id, src, onLoad }) => {
  if (!hasWindow() || !src) return false;
  if (document.getElementById(id)) return true;

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  if (onLoad) script.onload = onLoad;
  document.head.appendChild(script);
  return true;
};

// --- Advanced Consent Mode bootstrap -------------------------------------
// gtag.js and the Meta Pixel base code are loaded unconditionally and as
// early as possible (see index.html for the consent "default" call that
// must run first), always starting from a denied/revoked state. This is
// what lets Google run consent-mode "modeling" to estimate the conversions
// it can't directly observe — important for Google Ads campaign
// measurement — while never storing identifiable data before consent.
// Nothing here fires without a matching consent grant from the user.

const loadGtagJs = () => {
  const ga4Id = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  const adsId = import.meta.env.VITE_GOOGLE_ADS_ID;
  const primaryId = ga4Id || adsId;
  if (!primaryId) return;

  ensureGtagStub();

  appendScriptOnce({
    id: "vlv-gtag-script",
    src: `https://www.googletagmanager.com/gtag/js?id=${primaryId}`,
    onLoad: () => {
      window.gtag("js", new Date());
      if (ga4Id) window.gtag("config", ga4Id, { anonymize_ip: true });
      if (adsId) window.gtag("config", adsId);
    },
  });
};

const loadMetaPixelBase = () => {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  if (!pixelId || !hasWindow()) return;

  if (!window.fbq) {
    const fbq = function fbq() {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
  }

  // Must run before fbq('init', ...) so the pixel starts inactive.
  window.fbq("consent", "revoke");

  appendScriptOnce({
    id: "vlv-meta-pixel-script",
    src: "https://connect.facebook.net/en_US/fbevents.js",
    onLoad: () => {
      window.fbq("init", pixelId);
      window.fbq("track", "PageView");
    },
  });
};

// Call once, as early as the app boots (see main.jsx), regardless of
// whether consent has been given yet.
export const bootstrapAdvancedConsent = () => {
  if (!hasWindow()) return;

  ensureGtagStub();

  if (!gtagBootstrapped) {
    gtagBootstrapped = true;
    loadGtagJs();
  }

  if (!metaPixelBootstrapped) {
    metaPixelBootstrapped = true;
    loadMetaPixelBase();
  }
};

// --- PostHog (product analytics, not part of Google/Meta consent mode) ---
// Loaded only after explicit "Analytics" consent (Basic-style gating) since
// there is no consent-modeling benefit to loading it earlier.

const loadPostHogStub = () => {
  /* eslint-disable */
  !(function (t, e) {
    var o, n, p, r;
    e.__SV ||
      ((window.posthog = e),
      (e._i = []),
      (e.init = function (i, s, a) {
        function g(t, e) {
          var o = e.split(".");
          2 == o.length && ((t = t[o[0]]), (e = o[1])),
            (t[e] = function () {
              t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
            });
        }
        ((p = t.createElement("script")).type = "text/javascript"),
          (p.crossOrigin = "anonymous"),
          (p.async = !0),
          (p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js"),
          (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r);
        var u = e;
        for (
          void 0 !== a ? (u = e[a] = []) : (a = "posthog"),
            u.people = u.people || [],
            u.toString = function (t) {
              var e = "posthog";
              return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e;
            },
            u.people.toString = function () {
              return u.toString(1) + ".people (stub)";
            },
            o =
              "init me ws ys ps bs capture je Di ks register register_once register_for_session unregister unregister_for_session Ps getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Es $s createPersonProfile Is opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing Ss debug xs getPageViewId captureTraceFeedback captureTraceMetric".split(
                " ",
              ),
            n = 0;
          n < o.length;
          n++
        )
          g(u, o[n]);
        e._i.push([i, s, a]);
      }),
      (e.__SV = 1));
  })(document, window.posthog || []);
  /* eslint-enable */
};

const applyPostHogConsent = (analyticsGranted) => {
  if (!hasWindow()) return;

  if (!analyticsGranted) {
    window.posthog?.opt_out_capturing?.();
    return;
  }

  if (!postHogBootstrapped) {
    postHogBootstrapped = true;
    loadPostHogStub();
    window.posthog.init(POSTHOG_API_KEY, {
      api_host: POSTHOG_API_HOST,
      person_profiles: "identified_only",
      session_recording: {
        recordCrossOriginIframes: true,
        capturePerformance: false,
      },
    });
    return;
  }

  window.posthog?.opt_in_capturing?.();
};

// Applies a full preference set to every downstream tool: Consent Mode
// signals for Google, grant/revoke for Meta Pixel, and load/opt in-out for
// PostHog. Safe to call on every load (with stored consent) and every time
// the user changes their choice in the banner.
export const applyCookieConsent = (preferences) => {
  const normalized = normalizeCookiePreferences(preferences);

  updateGoogleConsentMode(normalized);
  updateMetaPixelConsent(normalized.marketing);
  applyPostHogConsent(normalized.analytics);
};
