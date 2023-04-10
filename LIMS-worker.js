// (A) CREATE/INSTALL CACHE
self.addEventListener("install", evt => {
  self.skipWaiting();
  evt.waitUntil(
    caches.open("JSINV")
    .then(cache => cache.addAll([
      "LIMS CSS.css",
      "PSHS IRC LIMS.html",
      "LIMS JS.js",
      "LIMS-db.js",
      "LIMS-items.js",
      "LIMS-move.js",
      "LIMS-manifest.json",
      "images/favicon.png",
      "images/icon-512.png"
    ]))
    .catch(err => console.error(err))
  );
});

// (B) CLAIM CONTROL INSTANTLY
self.addEventListener("activate", evt => self.clients.claim());

// (C) LOAD FROM CACHE FIRST, FALLBACK TO NETWORK IF NOT FOUND
self.addEventListener("fetch", evt => evt.respondWith(
  caches.match(evt.request).then(res => res || fetch(evt.request))
));