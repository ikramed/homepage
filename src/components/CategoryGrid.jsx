
import './CategoryGrid.css'

export default function CategoryGrid() {
  const categories = [
    { name: 'Groceries', icon: '🛒', color: '#ff6b6b' },
    { name: 'Drinks', icon: '🥤', color: '#4ecdc4' },
    { name: 'Kebab', icon: '🥙', color: '#45b7d1' },
    { name: 'Pharmacy', icon: '💊', color: '#96ceb4' },
    { name: 'Flowers', icon: '🌺', color: '#feca57' },
    { name: 'More', icon: '⋯', color: '#a8a8a8' }
  ]

  return (
    <div className="category-grid-container">
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <div className="category-icon" style={{background: category.color}}>
              <span>{category.icon}</span>
            </div>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
