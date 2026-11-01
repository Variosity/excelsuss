// public/sw.js — The Excelsus Service Worker
const CACHE_VERSION = "excelsus-v1";
const STATIC_ASSETS = ["/", "/offline", "/dashboard"];

// Install — cache critical assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

// Activate — clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// Fetch strategy:
// - Static assets (fonts, images, CSS, JS): cache-first
// - API/Supabase: network-first, no cache
// - Pages: network-first, offline fallback
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin (Supabase, Stripe, analytics)
  if (request.method !== "GET") return;
  if (!url.origin.includes(self.location.origin)) return;
  // Never cache Supabase or API routes
  if (url.pathname.startsWith("/api/") || url.hostname.includes("supabase"))
    return;

  // Static assets: cache-first
  if (
    url.pathname.match(/\.(woff2?|ttf|eot|ico|png|jpg|jpeg|svg|webp|css|js)$/)
  ) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const clone = response.clone();
            caches
              .open(CACHE_VERSION)
              .then((cache) => cache.put(request, clone));
            return response;
          }),
      ),
    );
    return;
  }

  // Pages: network-first, offline fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() =>
        caches
          .match(request)
          .then((cached) => cached || caches.match("/offline")),
      ),
  );
});

// Push notifications (placeholder — wire up when you add Web Push)
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const title = data.title || "The Excelsus";
  const options = {
    body: data.body || "A new challenge awaits.",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-72.png",
    data: { url: data.url || "/dashboard" },
    actions: [{ action: "open", title: "Open Forge" }],
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/dashboard";
  event.waitUntil(clients.openWindow(url));
});
