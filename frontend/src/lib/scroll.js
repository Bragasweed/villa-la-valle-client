export const scrollToPageTop = (behavior = "smooth") => {
  window.scrollTo({ top: 0, left: 0, behavior });
};

export const scrollToElementId = (id, behavior = "smooth") => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior, block: "start" });
};
