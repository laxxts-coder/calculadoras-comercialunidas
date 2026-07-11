const CACHE_NAME = 'calculadoras-arb-v3'; // subir versión = limpia la caché vieja al instante

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

// HTML: "network-first" — siempre intenta traer la versión más reciente de
// internet primero (para que las actualizaciones lleguen de inmediato al
// reabrir la app), y solo usa la copia guardada en caché si no hay conexión.
// Resto de archivos (íconos, manifest): "cache-first", porque casi nunca
// cambian y así la app abre más rápido / funciona sin internet.
self.addEventListener('fetch', e => {
  const req = e.request;
  const esHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');

  if (esHTML) {
    e.respondWith(
      fetch(req)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return response;
        })
        .catch(() => caches.match(req)) // sin internet -> usa la copia guardada
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return response;
      });
    })
  );
});
