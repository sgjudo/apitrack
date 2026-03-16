// ApiTrack Service Worker — PWA offline shell
const CACHE = 'apitrack-v1';
const SHELL = [
  '/',
  '/01-tableau-de-bord.html',
  '/02-au-rucher.html',
  '/03-atelier.html',
  '/04-elevage-reines.html',
  '/05-recoltes.html',
  '/06-vente.html',
  '/07-achats.html',
  '/08-resultats.html',
  '/09-meteo-ruchers.html',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first pour Firebase, cache-first pour le shell
self.addEventListener('fetch', e => {
  const url = e.request.url;
  // Firebase & APIs → réseau uniquement
  if (url.includes('firestore.googleapis.com') ||
      url.includes('firebase') ||
      url.includes('googleapis.com') ||
      url.includes('api.open-meteo.com')) {
    e.respondWith(fetch(e.request).catch(() => new Response('', { status: 503 })));
    return;
  }
  // Polices Google → cache-first
  if (url.includes('fonts.google') || url.includes('fonts.gstatic')) {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }))
    );
    return;
  }
  // Shell HTML → network-first, fallback cache
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
