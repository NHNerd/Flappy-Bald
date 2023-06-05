self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('cache-name').then(function (cache) {
      return cache.addAll([
        '/',
        'index.html',
        'index.css',
        'index.js',
        'bird.js',
        'coffee.js',
        'coins.js',
        'collision.js',
        'discoBall.js',
        'DOM.js',
        'fps.js',
        'manifest.json',
        'parallax.js',
        'pipes.js',
        'README.md',
        'service-worker.js',
        'sound.js',
        'speach.js',
        'public/AlfaSlabOne-Regular.ttf',
        'public/BG3-mountain.png',
        'public/bird-srite-sheet.png',
        'public/clouds-pack.png',
        'public/coffee-icon.png',
        'public/coffee.icocoffee.png',
        'public/coin.gif',
        'public/discoBall.gif',
        'public/floor.jpeg',
        'public/icons8-instagram-96.png',
        'public/sigarette-filter.png',
        'public/sigarette.png',
        'public/speach.png',
        'public/tabletDeg-contur.png',
        'public/tree1-BG1.png',
        'public/tree2-BG1.png',
        'public/tree3-BG1.png',
        'public/tree4-BG1.png',
        'public/sound/back.mp3',
        'public/sound/coffee.mp3',
        'public/sound/collision.mp3',
        'public/sound/drink.wav',
        'public/sound/game-over.wav',
        'public/sound/pryjok-2.mp3',
        'public/sound/super-jump.mp3',
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
