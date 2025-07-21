
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="delivery-info">
        <span className="delivery-status">Deliver now</span>
        <div className="location">
          <span className="address">14 Bab El Quods Casablanca</span>
          <span className="dropdown">▼</span>
        </div>
      </div>
    </header>
  )
}
