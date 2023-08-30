const CACHE_NAME = 'cool-cache';

// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = ['/', 'public/', 'public/sound/'];

// Listener for the install event - pre-caches our assets list on service worker install.
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(PRECACHE_ASSETS);
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // match the request to our cache
      const cachedResponse = await cache.match(event.request);

      // check if we got a valid response
      if (cachedResponse !== undefined) {
        // Cache hit, return the resource
        return cachedResponse;
      } else {
        // Otherwise, go to the network
        return fetch(event.request);
      }
    })()
  );
});

// '/',
// 'index.html',
// 'index.css',
// 'index.js',
// 'bird.js',
// 'coffee.js',
// 'coins.js',
// 'collision.js',
// 'discoBall.js',
// 'DOM.js',
// 'fps.js',
// 'manifest.json',
// 'parallax.js',
// 'pipes.js',
// 'README.md',
// 'service-worker.js',
// 'sound.js',
// 'speach.js',
// 'public/AlfaSlabOne-Regular.ttf',
// 'public/BG3-mountain.png',
// 'public/bird-srite-sheet.png',
// 'public/clouds-pack.png',
// 'public/coffee-icon-192x192.png',
// 'public/coffee-icon-512x512.png',
// 'public/coffee.ico',
// 'public/coffee.png',
// 'public/coin.gif',
// 'public/discoBall.gif',
// 'public/floor.jpeg',
// 'public/icons8-instagram-96.png',
// 'public/sigarette-filter.png',
// 'public/sigarette.png',
// 'public/speach.png',
// 'public/tabletDeg-contur.png',
// 'public/tree1-BG1.png',
// 'public/tree2-BG1.png',
// 'public/tree3-BG1.png',
// 'public/tree4-BG1.png',
// 'public/sound/back.mp3',
// 'public/sound/coffee.mp3',
// 'public/sound/collision.mp3',
// 'public/sound/drink.wav',
// 'public/sound/game-over.wav',
// 'public/sound/pryjok-2.mp3',
// 'public/sound/super-jump.mp3',
