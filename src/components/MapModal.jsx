
import { useState, useEffect, useRef } from 'react'
import './MapModal.css'

export default function MapModal({ isOpen, onClose, onLocationSelect }) {
  const [selectedCity, setSelectedCity] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [locationPermission, setLocationPermission] = useState('prompt') // 'prompt', 'granted', 'denied'
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const userMarkerRef = useRef(null)

  const cities = [
    { name: 'Casablanca', lat: 33.5731, lng: -7.5898, zoom: 12 },
    { name: 'Rabat', lat: 34.0209, lng: -6.8416, zoom: 12 },
    { name: 'Marrakech', lat: 31.6295, lng: -7.9811, zoom: 12 },
    { name: 'Fes', lat: 34.0181, lng: -5.0078, zoom: 12 },
    { name: 'Tangier', lat: 35.7595, lng: -5.8340, zoom: 12 },
    { name: 'Agadir', lat: 30.4278, lng: -9.5981, zoom: 12 },
    { name: 'Meknes', lat: 33.8935, lng: -5.5473, zoom: 12 },
    { name: 'Oujda', lat: 34.6867, lng: -1.9114, zoom: 12 }
  ]

  // Initialize map and check permissions when modal opens
  useEffect(() => {
    if (isOpen && mapRef.current && !mapInstanceRef.current) {
      initializeMap()
      checkLocationPermission()
    }
  }, [isOpen])

  const checkLocationPermission = async () => {
    if (!navigator.geolocation) {
      setLocationPermission('denied')
      return
    }

    try {
      // Check if permissions API is available
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'geolocation' })
        setLocationPermission(permission.state)
        
        permission.addEventListener('change', () => {
          setLocationPermission(permission.state)
        })
      }
    } catch (error) {
      console.log('Permissions API not supported, will prompt on location request')
    }
  }

  const initializeMap = () => {
    // Initialize Leaflet map
    const L = window.L
    if (!L) {
      loadLeaflet(() => {
        createMap()
      })
    } else {
      createMap()
    }
  }

  const loadLeaflet = (callback) => {
    // Load Leaflet CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    // Load Leaflet JS
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = callback
    document.head.appendChild(script)
  }

  const createMap = () => {
    const L = window.L
    mapInstanceRef.current = L.map(mapRef.current).setView([33.5731, -7.5898], 6)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current)

    // Add city markers
    cities.forEach(city => {
      const marker = L.marker([city.lat, city.lng]).addTo(mapInstanceRef.current)
      marker.bindPopup(`<b>${city.name}</b><br>Click to select this location`)
      marker.on('click', () => handleCitySelect(city))
    })

    // Add click handler for map
    mapInstanceRef.current.on('click', handleMapClick)
  }

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng
    setIsLoading(true)
    
    try {
      // Reverse geocoding to get address
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      )
      const data = await response.json()
      
      const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`
      const city = data.address?.city || data.address?.town || data.address?.village || 'Unknown Location'
      
      onLocationSelect({
        city: city,
        address: address,
        coordinates: { lat, lng }
      })
      
      setIsLoading(false)
      onClose()
    } catch (error) {
      console.error('Error getting address:', error)
      setIsLoading(false)
    }
  }

  const handleCitySelect = async (city) => {
    setSelectedCity(city)
    setIsLoading(true)
    
    // Zoom to city
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([city.lat, city.lng], city.zoom)
    }
    
    // Simulate fetching exact address
    setTimeout(() => {
      const addresses = {
        'Casablanca': '14 Bab El Quods Casablanca',
        'Rabat': '25 Avenue Mohammed V Rabat',
        'Marrakech': '18 Rue de la Liberté Marrakech',
        'Fes': '12 Boulevard Allal El Fassi Fes',
        'Tangier': '8 Avenue Pasteur Tangier',
        'Agadir': '22 Boulevard du 20 Août Agadir',
        'Meknes': '15 Avenue des FAR Meknes',
        'Oujda': '10 Boulevard Zerktouni Oujda'
      }
      
      onLocationSelect({
        city: city.name,
        address: addresses[city.name] || `${city.name} Center`,
        coordinates: { lat: city.lat, lng: city.lng }
      })
      setIsLoading(false)
      onClose()
    }, 1000)
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.')
      return
    }

    // Show permission dialog if needed
    if (locationPermission === 'prompt') {
      setShowPermissionDialog(true)
      return
    }

    if (locationPermission === 'denied') {
      alert('Location access is denied. Please enable location permissions in your browser settings and try again.')
      return
    }

    setIsGettingLocation(true)
    
    // Try high accuracy first, fallback to lower accuracy if it fails
    const highAccuracyOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 30000
    }
    
    const lowAccuracyOptions = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 60000
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords
        console.log(`Location found with accuracy: ${accuracy}m`)
        
        setUserLocation({ lat: latitude, lng: longitude, accuracy })
        
        // Update map view with appropriate zoom based on accuracy
        if (mapInstanceRef.current) {
          const zoom = accuracy < 100 ? 17 : accuracy < 500 ? 15 : 13
          mapInstanceRef.current.setView([latitude, longitude], zoom)
          
          // Remove previous user marker if exists
          if (userMarkerRef.current) {
            mapInstanceRef.current.removeLayer(userMarkerRef.current)
          }
          
          // Add user location marker with accuracy circle
          const L = window.L
          userMarkerRef.current = L.marker([latitude, longitude], {
            icon: L.divIcon({
              className: 'user-location-marker',
              html: '<div class="user-dot"></div>',
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })
          }).addTo(mapInstanceRef.current)
          
          // Add accuracy circle
          L.circle([latitude, longitude], {
            radius: accuracy,
            fillColor: '#007AFF',
            color: '#007AFF',
            weight: 1,
            opacity: 0.3,
            fillOpacity: 0.1
          }).addTo(mapInstanceRef.current)
          
          userMarkerRef.current.bindPopup(`Your current location<br>Accuracy: ${Math.round(accuracy)}m`).openPopup()
        }
        
        setIsLoading(true)
        
        try {
          // Get detailed address for current location
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&zoom=18`
          )
          const data = await response.json()
          
          // Build detailed address
          const addressParts = []
          if (data.address?.house_number) addressParts.push(data.address.house_number)
          if (data.address?.road) addressParts.push(data.address.road)
          if (data.address?.neighbourhood) addressParts.push(data.address.neighbourhood)
          
          const detailedAddress = addressParts.length > 0 ? addressParts.join(' ') : data.display_name
          const city = data.address?.city || data.address?.town || data.address?.village || data.address?.suburb || 'Current Location'
          
          onLocationSelect({
            city: city,
            address: detailedAddress,
            coordinates: { lat: latitude, lng: longitude },
            accuracy: accuracy
          })
          
          setIsLoading(false)
          setIsGettingLocation(false)
          onClose()
        } catch (error) {
          console.error('Error getting address:', error)
          // Fallback to coordinates if geocoding fails
          onLocationSelect({
            city: 'Current Location',
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            coordinates: { lat: latitude, lng: longitude },
            accuracy: accuracy
          })
          setIsLoading(false)
          setIsGettingLocation(false)
          onClose()
        }
      },
      (error) => {
        console.error('High accuracy location error:', error)
        setIsGettingLocation(false)
        
        // Handle specific error types
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationPermission('denied')
            alert('Location access denied. Please enable location permissions and try again.')
            break
          case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable. Please check your internet connection.')
            break
          case error.TIMEOUT:
            alert('Location request timed out. Please try again or select a location manually.')
            break
          default:
            // Try with lower accuracy as fallback
            setIsGettingLocation(true)
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                // Same success handler as above but with lower accuracy
                const { latitude, longitude, accuracy } = position.coords
                console.log(`Location found with lower accuracy: ${accuracy}m`)
                setUserLocation({ lat: latitude, lng: longitude, accuracy })
                
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.setView([latitude, longitude], 13)
                  
                  if (userMarkerRef.current) {
                    mapInstanceRef.current.removeLayer(userMarkerRef.current)
                  }
                  
                  const L = window.L
                  userMarkerRef.current = L.marker([latitude, longitude], {
                    icon: L.divIcon({
                      className: 'user-location-marker',
                      html: '<div class="user-dot"></div>',
                      iconSize: [20, 20],
                      iconAnchor: [10, 10]
                    })
                  }).addTo(mapInstanceRef.current)
                  
                  userMarkerRef.current.bindPopup(`Your approximate location<br>Accuracy: ${Math.round(accuracy)}m`).openPopup()
                }
                
                onLocationSelect({
                  city: 'Current Location',
                  address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
                  coordinates: { lat: latitude, lng: longitude },
                  accuracy: accuracy
                })
                
                setIsGettingLocation(false)
                onClose()
              },
              () => {
                setIsGettingLocation(false)
                alert('Unable to get your location. Please select a location manually on the map.')
              },
              lowAccuracyOptions
            )
            break
        }
      },
      highAccuracyOptions
    )
  }

  const handlePermissionRequest = () => {
    setShowPermissionDialog(false)
    getCurrentLocation()
  }

  // Cleanup map when modal closes
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className="map-modal-overlay">
      <div className="map-modal">
        <div className="map-header">
          <h3>Select Delivery Location</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="location-actions">
          <button 
            className={`current-location-btn ${locationPermission === 'denied' ? 'disabled' : ''}`}
            onClick={getCurrentLocation}
            disabled={isGettingLocation || locationPermission === 'denied'}
          >
            {isGettingLocation ? (
              <>
                <span className="loading-spinner-small"></span>
                Getting your location...
              </>
            ) : locationPermission === 'denied' ? (
              <>
                🚫 Location Access Denied
              </>
            ) : (
              <>
                📍 Use My Current Location
              </>
            )}
          </button>
          {locationPermission === 'denied' && (
            <p className="permission-help">
              Please enable location permissions in your browser settings to use this feature.
            </p>
          )}
        </div>

        {showPermissionDialog && (
          <div className="permission-dialog">
            <div className="permission-content">
              <div className="permission-icon">📍</div>
              <h4>Enable Location Access</h4>
              <p>We need access to your location to provide accurate delivery services. Your location will only be used to find nearby restaurants and calculate delivery times.</p>
              <div className="permission-buttons">
                <button className="permission-btn allow" onClick={handlePermissionRequest}>
                  Allow Location Access
                </button>
                <button className="permission-btn deny" onClick={() => setShowPermissionDialog(false)}>
                  Not Now
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="map-container">
          <div ref={mapRef} className="real-map"></div>
          <div className="map-instructions">
            <p>📍 Tap anywhere on the map to pinpoint your exact location</p>
            {userLocation && (
              <div className="location-accuracy">
                <span>Current location accuracy: ~{Math.round(userLocation.accuracy)}m</span>
              </div>
            )}
          </div>
        </div>
        
        {(isLoading || isGettingLocation) && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>{isGettingLocation ? 'Getting your location...' : 'Getting exact address...'}</p>
          </div>
        )}
        
        <div className="city-list">
          <h4>Quick Select Cities</h4>
          <div className="city-buttons">
            {cities.map((city, index) => (
              <button
                key={index}
                className="city-btn"
                onClick={() => handleCitySelect(city)}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
