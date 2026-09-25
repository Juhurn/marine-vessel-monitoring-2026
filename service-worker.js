const CACHE_NAME = 'marine-monitoring-2026-v1';
const APP_SHELL = ['./','./index.html','./manifest.json','./SEAOIL_Logo.png','./SEAOIL_Fuel_and_Beyond.png','./app-icon-192.png','./app-icon-512.png'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(APP_SHELL))); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.url.includes('script.google.com') || e.request.url.includes('docs.google.com')) return;
  e.respondWith(fetch(e.request).then(r => { const c=r.clone(); caches.open(CACHE_NAME).then(cache => cache.put(e.request,c)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
});
