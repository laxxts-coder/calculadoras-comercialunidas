const CACHE_NAME = 'calculadoras-arb-v2';

// Solo los archivos que realmente existen en el servidor
const ASSETS = [
  './',
  './index.html',
  './icon16.png',
  './icon48.png',
  './icon128.png',
  './manifest.json'
];

// Instala y cachea todos los archivos al abrir la app por primera vez
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()) // activa el nuevo SW de inmediato
  );
});

// Elimina cachés viejos cuando se activa la nueva versión
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Sirve desde caché; si no está, va a internet y lo guarda para después
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, copy));
        return response;
      });
    })
  );
});
