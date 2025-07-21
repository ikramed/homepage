
import './FoodCategories.css'

export default function FoodCategories() {
  const categories = [
    { name: 'Pizza', image: '🍕', bgColor: '#fff1f2', textColor: '#dc2626' },
    { name: 'Desserts', image: '🍰', bgColor: '#fef3c7', textColor: '#d97706' },
    { name: 'Seafood', image: '🦐', bgColor: '#ecfdf5', textColor: '#059669' },
    { name: 'Tacos', image: '🌮', bgColor: '#fef3c7', textColor: '#d97706' },
    { name: 'Sandwiches', image: '🥪', bgColor: '#fff7ed', textColor: '#ea580c' },
    { name: 'Traditional Dishes', image: '🍲', bgColor: '#f0fdf4', textColor: '#16a34a' },
    { name: 'Pasta', image: '🍝', bgColor: '#fffbeb', textColor: '#d97706' },
    { name: 'Breakfast', image: '🥞', bgColor: '#fef3c7', textColor: '#ca8a04' },
    { name: 'Coffee', image: '☕', bgColor: '#fef7ed', textColor: '#9a3412' },
    { name: 'Ice-cream', image: '🍦', bgColor: '#f0f9ff', textColor: '#0284c7' },
    { name: 'Shawarma', image: '🥙', bgColor: '#fef3c7', textColor: '#d97706' },
    { name: 'Juices', image: '🧃', bgColor: '#ecfdf5', textColor: '#059669' }
  ]

  return (
    <div className="food-categories">
      <h2 className="categories-title">More categories</h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div key={index} className="food-category-card">
            <div 
              className="food-category-image-box"
              style={{
                background: category.bgColor,
                color: category.textColor
              }}
            >
              <span className="food-category-image">{category.image}</span>
            </div>
            <span className="food-category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
