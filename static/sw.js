const CACHE_NAME = 'proxy-cache-v1';

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => {
      return resp || fetch(e.request).then(r => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(e.request, r.clone());
          return r;
        });
      });
    })
  );
});
