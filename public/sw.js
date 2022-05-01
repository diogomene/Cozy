const CACHE_VERSION = 2;
const CACHE_NAME = "site-static-"+CACHE_VERSION
const DYNAMIC_CACHE_NAME = "dyno-cache"+CACHE_VERSION
const assetsDirectories = [
    "./manifest.json",
    "./media/images/favicon.ico",
    "/",
    "./pages/offline.html",
    "./index.html",
    "./scripts/app.js",
    "./scripts/sidebar.js",
    "./styles/style.css",
    "./styles/offline.css",  
    "./styles/fonts/courgette.css",
    "./styles/fonts/font1.woff2",
    "./styles/fonts/font2.woff2"
  ]//
self.addEventListener("install", (e)=>{
    e.waitUntil((async()=>{
        const cache = await caches.open(CACHE_NAME)
        // assetsDirectories.forEach( async (item)=>{
        //     await cache.add(new Request(item, {cache: 'reload'}))
        // })
        await cache.addAll(assetsDirectories)
    })())
})//
self.addEventListener("activate", (e)=>{
    e.waitUntil((async()=>{
        const cacheKeys = await caches.keys()
        return Promise.all(
            cacheKeys.filter(key => key!=CACHE_NAME && key!=DYNAMIC_CACHE_NAME)
            .map(key => caches.delete(key))
        )
    })())
})
self.addEventListener('fetch', (req) => {
    console.log(req.request)
    req.respondWith(
        caches.match(req.request).then(async cacheResponse =>{
            if(cacheResponse){
                return cacheResponse
            }
            const fetchResponse = await fetch(req.request)
            return caches.open(DYNAMIC_CACHE_NAME).then(dcache=>{
                dcache.put(req.request.url, fetchResponse.clone())
                return fetchResponse
            })
        }).catch(()=>{
            if(req.request.url.includes(".html")){
                return caches.match("./pages/offline.html")
            }
        }
        )
    )
});