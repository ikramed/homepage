
import './CategoryGrid.css'

export default function CategoryGrid() {
  const categories = [
    { 
      name: 'Groceries', 
      image: '🛒🥕🍎',
      bgColor: '#fff4e6',
      textColor: '#d97706'
    },
    { 
      name: 'Drinks', 
      image: '🥤🧊',
      bgColor: '#e0f2fe',
      textColor: '#0369a1'
    },
    { 
      name: 'Kebab', 
      image: '🥙🍖',
      bgColor: '#fef3c7',
      textColor: '#d97706'
    },
    { 
      name: 'Pharmacy', 
      image: '💊🏥',
      bgColor: '#dcfce7',
      textColor: '#16a34a'
    },
    { 
      name: 'Flowers', 
      image: '🌺🌸',
      bgColor: '#fce7f3',
      textColor: '#ec4899'
    },
    { 
      name: 'More', 
      image: '⋯',
      bgColor: '#f3f4f6',
      textColor: '#6b7280'
    }
  ]

  return (
    <div className="category-grid-container">
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <div 
              className="category-image-box" 
              style={{
                background: category.bgColor,
                color: category.textColor
              }}
            >
              <span className="category-image">{category.image}</span>
            </div>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
