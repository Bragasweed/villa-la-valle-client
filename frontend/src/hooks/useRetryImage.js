import { useEffect, useState } from "react";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1200;

// Images occasionally fail to load on slow/unstable connections (client-reported:
// gallery/suite photos sometimes came up broken). This retries a few times with
// backoff, cache-busting each attempt, before giving up.
export function useRetryImage(src) {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setAttempt(0);
    setFailed(false);
  }, [src]);

  const handleError = () => {
    setAttempt((current) => {
      if (current >= MAX_RETRIES) {
        setFailed(true);
        return current;
      }
      const next = current + 1;
      setTimeout(() => setAttempt(next), RETRY_DELAY_MS * next);
      return current;
    });
  };

  const resolvedSrc =
    attempt === 0 ? src : `${src}${src.includes("?") ? "&" : "?"}retry=${attempt}`;

  return { src: resolvedSrc, onError: handleError, failed, attempt, retryDelay: RETRY_DELAY_MS };
}
