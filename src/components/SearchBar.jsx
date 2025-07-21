
import './SearchBar.css'

export default function SearchBar() {
  return (
    <div className="search-container">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Search food, groceries, etc"
          className="search-input"
        />
        <button className="filter-btn">
          <span className="filter-icon">⚙️</span>
        </button>
      </div>
    </div>
  )
}
