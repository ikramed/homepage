
import './FoodCategories.css'

export default function FoodCategories() {
  const categories = [
    { name: 'Pizza', icon: '🍕' },
    { name: 'Desserts', icon: '🍰' },
    { name: 'Seafood', icon: '🦐' },
    { name: 'Tacos', icon: '🌮' },
    { name: 'Sandwiches', icon: '🥪' },
    { name: 'Traditional Dishes', icon: '🍲' },
    { name: 'Pasta', icon: '🍝' },
    { name: 'Breakfast', icon: '🥞' },
    { name: 'Coffee', icon: '☕' },
    { name: 'Ice-cream', icon: '🍦' },
    { name: 'Shawarma', icon: '🥙' },
    { name: 'Juices', icon: '🧃' }
  ]

  return (
    <div className="food-categories">
      <h2 className="categories-title">More categories</h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div key={index} className="food-category-card">
            <div className="food-category-icon">
              <span>{category.icon}</span>
            </div>
            <span className="food-category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
