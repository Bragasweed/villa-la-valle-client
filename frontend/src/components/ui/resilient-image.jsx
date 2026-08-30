import { motion } from "framer-motion";
import { useRetryImage } from "../../hooks/useRetryImage";

// Plain <img> that retries a few times on load failure instead of leaving the
// browser's broken-image icon on screen. `fallbackClassName` styles the empty
// placeholder shown if every retry still fails.
export function ResilientImage({ src, onError, fallbackClassName, style, ...props }) {
  const { src: resolvedSrc, onError: handleError, failed } = useRetryImage(src);

  if (failed) {
    return <div className={fallbackClassName} aria-hidden="true" />;
  }

  return (
    <img
      {...props}
      src={resolvedSrc}
      onError={(e) => {
        handleError();
        onError?.(e);
      }}
      style={style}
    />
  );
}

// Same retry behavior, for spots that animate the image with framer-motion
// (motion.img) instead of a plain <img>.
export function ResilientMotionImage({ src, onError, fallbackClassName, ...props }) {
  const { src: resolvedSrc, onError: handleError, failed } = useRetryImage(src);

  if (failed) {
    return <div className={fallbackClassName} aria-hidden="true" />;
  }

  return (
    <motion.img
      {...props}
      src={resolvedSrc}
      onError={(e) => {
        handleError();
        onError?.(e);
      }}
    />
  );
}
