"use client";

import { useEffect, useState } from "react";
import { markSiteReady } from "../lib/siteReady";

// Never hold the visitor hostage to one slow asset.
const MAX_WAIT_MS = 10000;
const FADE_MS = 500;

export default function SiteLoader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "gone">("loading");

  useEffect(() => {
    let fadeTimer = 0;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setPhase("leaving");
      fadeTimer = window.setTimeout(() => {
        setPhase("gone");
        markSiteReady();
      }, FADE_MS);
    };

    // Wait for fonts too, so text doesn't reflow the moment the page appears.
    const onLoad = () => {
      if (document.fonts) document.fonts.ready.then(finish, finish);
      else finish();
    };

    const fallback = window.setTimeout(finish, MAX_WAIT_MS);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(fallback);
      clearTimeout(fadeTimer);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("site-loading", phase !== "gone");
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      id="site-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading"
      data-leaving={phase === "leaving" || undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- animated SVG, no optimisation wanted */}
      <img src="/Loadinganimation.svg" alt="" width={160} height={160} />
    </div>
  );
}
