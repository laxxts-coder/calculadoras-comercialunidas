const CACHE_NAME = 'ceramica-v1';
// Lista de archivos que el iPhone va a congelar en su memoria
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './popup.js',
  './icon16.png',
  './icon48.png',
  './icon128.png'
];

// Instala los archivos en el almacenamiento local del celular
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Cuando la app pida un archivo, lo saca de la memoria del cel, no de internet
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});