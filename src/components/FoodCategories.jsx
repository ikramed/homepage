
import './FoodCategories.css'

export default function FoodCategories() {
  const categories = [
    { name: 'Pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&fit=crop&crop=center', bgColor: '#fff1f2' },
    { name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=80&h=80&fit=crop&crop=center', bgColor: '#fef3c7' },
    { name: 'Seafood', image: 'https://images.unsplash.com/photo-1544651281-3b33285ac5be?w=80&h=80&fit=crop&crop=center', bgColor: '#ecfdf5' },
    { name: 'Tacos', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=80&h=80&fit=crop&crop=center', bgColor: '#fef3c7' },
    { name: 'Sandwiches', image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=80&h=80&fit=crop&crop=center', bgColor: '#fff7ed' },
    { name: 'Traditional Dishes', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=80&h=80&fit=crop&crop=center', bgColor: '#f0fdf4' },
    { name: 'Pasta', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=80&h=80&fit=crop&crop=center', bgColor: '#fffbeb' },
    { name: 'Breakfast', image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=80&h=80&fit=crop&crop=center', bgColor: '#fef3c7' },
    { name: 'Coffee', image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=80&h=80&fit=crop&crop=center', bgColor: '#fef7ed' },
    { name: 'Ice-cream', image: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=80&h=80&fit=crop&crop=center', bgColor: '#f0f9ff' },
    { name: 'Shawarma', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=80&h=80&fit=crop&crop=center', bgColor: '#fef3c7' },
    { name: 'Juices', image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=80&h=80&fit=crop&crop=center', bgColor: '#ecfdf5' }
  ]

  return (
    <div className="food-categories">
      <h2 className="categories-title">More categories</h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div key={index} className="food-category-card">
            <div 
              className="food-category-image-box"
              style={{ background: category.bgColor }}
            >
              <img 
                src={category.image} 
                alt={category.name}
                className="food-category-image"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <span className="food-category-emoji-fallback" style={{ display: 'none' }}>
                {category.name === 'Pizza' ? '🍕' : 
                 category.name === 'Desserts' ? '🍰' : 
                 category.name === 'Seafood' ? '🦐' : 
                 category.name === 'Tacos' ? '🌮' : 
                 category.name === 'Sandwiches' ? '🥪' : 
                 category.name === 'Traditional Dishes' ? '🍲' : 
                 category.name === 'Pasta' ? '🍝' : 
                 category.name === 'Breakfast' ? '🥞' : 
                 category.name === 'Coffee' ? '☕' : 
                 category.name === 'Ice-cream' ? '🍦' : 
                 category.name === 'Shawarma' ? '🥙' : 
                 category.name === 'Juices' ? '🧃' : '🍽️'}
              </span>
            </div>
            <span className="food-category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
