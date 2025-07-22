
import './CategoryGrid.css'

export default function CategoryGrid() {
  const firstRowCategories = [
    { 
      name: 'Groceries', 
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop&crop=center',
      bgColor: '#fff4e6'
    },
    { 
      name: 'Drinks', 
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&h=100&fit=crop&crop=center',
      bgColor: '#e0f2fe'
    },
    { 
      name: 'Kebab', 
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=100&h=100&fit=crop&crop=center',
      bgColor: '#fef3c7'
    }
  ]

  const secondRowCategories = [
    { 
      name: 'Pharmacy', 
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031d9fe?w=100&h=100&fit=crop&crop=center',
      bgColor: '#dcfce7'
    },
    { 
      name: 'Flowers', 
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=100&h=100&fit=crop&crop=center',
      bgColor: '#fce7f3'
    }
  ]

  const thirdRowCategories = [
    { 
      name: 'Pizza', 
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop&crop=center',
      bgColor: '#fff1f2'
    },
    { 
      name: 'Burgers', 
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop&crop=center',
      bgColor: '#fef3c7'
    },
    { 
      name: 'Sushi', 
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop&crop=center',
      bgColor: '#ecfdf5'
    },
    { 
      name: 'More', 
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop&crop=center',
      bgColor: '#f3f4f6'
    }
  ]

  const renderCategoryRow = (categories, rowClass) => (
    <div className={`category-row ${rowClass}`}>
      {categories.map((category, index) => (
        <div key={index} className="category-card">
          <div 
            className="category-image-box" 
            style={{ background: category.bgColor }}
          >
            <img 
              src={category.image} 
              alt={category.name}
              className="category-image"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'block'
              }}
            />
            <span className="category-emoji-fallback" style={{ display: 'none' }}>
              {category.name === 'Groceries' ? '🛒' : 
               category.name === 'Drinks' ? '🥤' : 
               category.name === 'Kebab' ? '🥙' : 
               category.name === 'Pharmacy' ? '💊' : 
               category.name === 'Flowers' ? '🌺' : 
               category.name === 'Pizza' ? '🍕' : 
               category.name === 'Burgers' ? '🍔' : 
               category.name === 'Sushi' ? '🍣' : '⋯'}
            </span>
          </div>
          <span className="category-name">{category.name}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="category-grid-container">
      <div className="category-grid">
        {renderCategoryRow(firstRowCategories, 'row-3')}
        {renderCategoryRow(secondRowCategories, 'row-2')}
        {renderCategoryRow(thirdRowCategories, 'row-4')}
      </div>
    </div>
  )
}
