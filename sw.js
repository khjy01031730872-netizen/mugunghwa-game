// [베타 배포] 이 게임은 index.html 하나에 이미지/오디오가 전부 base64로 내장돼 있어,
// 이 파일 하나만 캐시해도 오프라인에서 그대로 실행된다. 버전 올릴 땐 CACHE_NAME을 바꿔야
// 이전 캐시가 폐기되고 새 index.html이 받아진다(안 바꾸면 사용자가 옛 버전에 갇힘).
const CACHE_NAME = 'mugunghwa-v8-cache-1';
const ASSETS = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
