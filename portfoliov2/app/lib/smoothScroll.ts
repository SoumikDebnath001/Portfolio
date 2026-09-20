import type Lenis from "lenis";

/**
 * Module-level handle on the page's smooth-scroll instance so components that
 * need to pause it (modals, the mobile sheet) or drive it (back-to-top,
 * anchor links) don't have to thread it through props.
 */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;

/** Pause/resume page scrolling — used while an overlay is open. */
export const lockScroll = (locked: boolean) => {
  if (!instance) return;
  if (locked) instance.stop();
  else instance.start();
};

/** Scroll to the top, or to an element, honouring the smooth-scroll layer. */
export const scrollTo = (target: string | number, immediate = false) => {
  if (instance) {
    instance.scrollTo(target, { immediate, offset: typeof target === "string" ? -88 : 0 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  }
};
