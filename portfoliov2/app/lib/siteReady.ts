import { useSyncExternalStore } from "react";

// Set once the loader has lifted, so intro animations play in view rather than under it.
const EVENT = "site-ready";
let ready = false;

export function markSiteReady() {
  if (ready) return;
  ready = true;
  document.documentElement.setAttribute("data-site-ready", "");
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

export function useSiteReady() {
  return useSyncExternalStore(subscribe, () => ready, () => false);
}
