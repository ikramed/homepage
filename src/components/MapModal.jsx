
import { useState, useEffect } from 'react'
import './MapModal.css'

export default function MapModal({ isOpen, onClose, onLocationSelect }) {
  const [selectedCity, setSelectedCity] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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

  const handleCitySelect = async (city) => {
    setSelectedCity(city)
    setIsLoading(true)
    
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
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="map-modal-overlay">
      <div className="map-modal">
        <div className="map-header">
          <h3>Select Delivery Location</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="map-container">
          <div className="map-view">
            <div className="map-placeholder">
              <div className="morocco-map">
                {cities.map((city, index) => (
                  <div
                    key={index}
                    className={`city-marker ${selectedCity?.name === city.name ? 'selected' : ''}`}
                    style={{
                      left: `${((city.lng + 12) / 12) * 80 + 10}%`,
                      top: `${((35 - city.lat) / 5) * 80 + 10}%`
                    }}
                    onClick={() => handleCitySelect(city)}
                  >
                    <div className="marker-dot"></div>
                    <span className="city-name">{city.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Getting exact address...</p>
          </div>
        )}
        
        <div className="city-list">
          <h4>Quick Select</h4>
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
