
import { useState } from 'react'
import './Header.css'
import MapModal from './MapModal'

export default function Header() {
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({
    address: '14 Bab El Quods Casablanca',
    city: 'Casablanca'
  })

  const handleLocationSelect = (location) => {
    setCurrentLocation(location)
  }

  return (
    <>
      <header className="header">
        <div className="delivery-info">
          <span className="delivery-status">Deliver now</span>
          <div className="location" onClick={() => setIsMapOpen(true)}>
            <span className="address">{currentLocation.address}</span>
            <span className="dropdown">📍</span>
          </div>
        </div>
      </header>
      
      <MapModal 
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onLocationSelect={handleLocationSelect}
      />
    </>
  )
}
