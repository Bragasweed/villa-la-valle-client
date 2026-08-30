import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToPageTop } from "../../lib/scroll";

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    scrollToPageTop();
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
