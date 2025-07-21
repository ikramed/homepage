
import './App.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CategoryGrid from './components/CategoryGrid'
import PromoSection from './components/PromoSection'
import FoodCategories from './components/FoodCategories'

export default function App() {
  return (
    <div className="app">
      <Header />
      <SearchBar />
      <CategoryGrid />
      <PromoSection />
      <FoodCategories />
    </div>
  )
}
