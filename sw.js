const CACHE_NAME = "pra-la-e-pra-ca-v1";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",

    "./seta.png",
    "./setad.png",
    "./titulo.png",
    "./icon-192.png",
    "./icon-512.png",

    "./pop.mp3",
    "./bonus.mp3",
    "./apito.mp3",
    "./musica.mp3"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ARQUIVOS))
    );

    self.skipWaiting();
});


self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(chaves => {
            return Promise.all(
                chaves
                    .filter(chave => chave !== CACHE_NAME)
                    .map(chave => caches.delete(chave))
            );
        })
    );

    self.clients.claim();
});


self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(resposta => {
                return resposta || fetch(event.request);
            })
    );
});