const CACHE_NAME = 'food-delivery-v1'
const urlsToCache = [
  '/homepage/',
  '/homepage/manifest.json',
  '/homepage/static/js/bundle.js',
  '/homepage/static/css/main.css'
]


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
    
        return response || fetch(event.request)
      })
  )
})


self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

function doBackgroundSync() {

  return Promise.resolve()
}

// Handle pushh notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/favicon.svg',
    badge: '/favicon.svg'
  }
  
  event.waitUntil(
    self.registration.showNotification('Food Delivery', options)
  )
})
