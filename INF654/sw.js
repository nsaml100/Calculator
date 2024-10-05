self.addEventListener("install", e => {
    console.log('install code');
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./main.css", "./index.js", "./index.html", "./calcpage.html", "./calc.js", "./calc.css",]);
        })
    );
});

self.addEventListener( "fetch", e =>{
    e.respondWith(
        caches.match(e.request).then(response =>{
            return response || fetch(e.request);
        })
    );
});