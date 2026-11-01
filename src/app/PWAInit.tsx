// src/app/PWAInit.tsx — registers service worker client-side
"use client";
import { useEffect } from "react";

export default function PWAInit() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => console.log("[SW] registered", reg.scope))
        .catch((err) => console.warn("[SW] failed", err));
    }
  }, []);
  return null;
}
