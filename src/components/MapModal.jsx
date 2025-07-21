
import { useState, useEffect, useRef } from 'react'
import './MapModal.css'

export default function MapModal({ isOpen, onClose, onLocationSelect }) {
  const [selectedCity, setSelectedCity] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

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

  // Initialize map when modal opens
  useEffect(() => {
    if (isOpen && mapRef.current && !mapInstanceRef.current) {
      initializeMap()
    }
  }, [isOpen])

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

    setIsGettingLocation(true)
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ lat: latitude, lng: longitude })
        
        // Update map view
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([latitude, longitude], 15)
          
          // Add user location marker
          const L = window.L
          L.marker([latitude, longitude])
            .addTo(mapInstanceRef.current)
            .bindPopup('Your current location')
            .openPopup()
        }
        
        setIsLoading(true)
        
        try {
          // Get address for current location
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          )
          const data = await response.json()
          
          const address = data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          const city = data.address?.city || data.address?.town || data.address?.village || 'Current Location'
          
          onLocationSelect({
            city: city,
            address: address,
            coordinates: { lat: latitude, lng: longitude }
          })
          
          setIsLoading(false)
          setIsGettingLocation(false)
          onClose()
        } catch (error) {
          console.error('Error getting address:', error)
          setIsLoading(false)
          setIsGettingLocation(false)
        }
      },
      (error) => {
        console.error('Error getting location:', error)
        alert('Unable to get your location. Please select a city manually.')
        setIsGettingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
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
            className="current-location-btn"
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
          >
            {isGettingLocation ? (
              <>
                <span className="loading-spinner-small"></span>
                Getting location...
              </>
            ) : (
              <>
                📍 Use Current Location
              </>
            )}
          </button>
        </div>
        
        <div className="map-container">
          <div ref={mapRef} className="real-map"></div>
          <div className="map-instructions">
            <p>Tap on the map to select a location or use the buttons below</p>
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
