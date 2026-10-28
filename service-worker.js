// DMAC Academy — Service Worker v1.0.0
// Caching strategy: Cache-first for static assets, Network-first for API calls

const CACHE_NAME = 'dmac-academy-v1';
const STATIC_CACHE = 'dmac-static-v1';
const DYNAMIC_CACHE = 'dmac-dynamic-v1';

// Core pages to cache on install
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/login.html',
  '/register.html',
  '/forgot-password.html',
  '/dashboard.html',
  '/lessons.html',
  '/bookings.html',
  '/profile.html',
  '/progress-board.html',
  '/certificates.html',
  '/manifest.json',
  '/offline.html'
];

// Google Fonts to cache
const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap'
];

// Install — cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Caching core assets');
        return cache.addAll(CORE_ASSETS).catch(err => {
          console.warn('[SW] Some core assets failed to cache:', err);
          // Cache what we can individually
          return Promise.allSettled(
            CORE_ASSETS.map(url => cache.add(url).catch(() => null))
          );
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener('activate', event => {
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE];
  event.waitUntil(
    caches.keys()
      .then(names => {
        return Promise.all(
          names
            .filter(name => !currentCaches.includes(name))
            .map(name => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch — routing strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests (API POST calls go straight to network)
  if (request.method !== 'GET') return;

  // Skip Google Apps Script API calls
  if (url.hostname === 'script.google.com' || url.hostname === 'script.googleusercontent.com') return;

  // Google Fonts — cache first, long-lived
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(request, STATIC_CACHE, 30 * 24 * 60 * 60));
    return;
  }

  // HTML pages — network first, fall back to cache, then offline page
  if (request.headers.get('accept')?.includes('text/html') || url.pathname.endsWith('.html')) {
    event.respondWith(networkFirstHTML(request));
    return;
  }

  // Icons/images — cache first
  if (url.pathname.startsWith('/icons/') || url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico)$/)) {
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
    return;
  }

  // Everything else — stale while revalidate
  event.respondWith(staleWhileRevalidate(request));
});

// Strategy: Cache first
async function cacheFirst(request, cacheName, maxAge) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 408, statusText: 'Offline' });
  }
}

// Strategy: Network first for HTML (with offline fallback)
async function networkFirstHTML(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return caches.match('/offline.html');
  }
}

// Strategy: Stale while revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then(response => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  return cached || (await fetchPromise) || new Response('', { status: 408 });
}

// Listen for skip-waiting message from pages
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
