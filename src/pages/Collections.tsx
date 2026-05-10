import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
import { 
  Heart, 
  ShoppingBag,
  X,
  Filter,
  RotateCcw
} from 'lucide-react';
import { PRODUCTS, Product } from '../ProductData';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

export default function Collections() {
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  // Filter States
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state]);

  const categories = ["All", "Office Dresses", "Dinner Dresses", "Handbags", "Luxury Heels", "Heels", "Sneakers", "Date Night", "Church Fits", "Weekend Casual", "Birthday Dresses", "Event Looks"];
  const sizes = ["S", "M", "L", "XL", "XXL", "OS"];
  const colors = ["Black", "Gold", "Pink", "Blue", "White", "Emerald", "Red", "Silver", "Tan"];
  const occasions = ["Office", "Dinner", "Wedding", "Casual", "Birthday", "Gala", "Day Out"];
  const statuses = ["New Arrival", "Best Seller", "Trending", "Ready to Ship"];

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category Filter
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }

    // Status Filter
    if (selectedStatuses.length > 0) {
      result = result.filter(p => p.tag && selectedStatuses.includes(p.tag));
    }

    // Size Filter
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }

    // Color Filter
    if (selectedColors.length > 0) {
      result = result.filter(p => p.colors.some(c => selectedColors.includes(c)));
    }

    // Occasion Filter
    if (selectedOccasions.length > 0) {
      result = result.filter(p => p.occasions.some(o => selectedOccasions.includes(o)));
    }

    // Price Filter
    result = result.filter(p => p.priceValue >= priceRange[0] && p.priceValue <= priceRange[1]);

    // Sorting
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortBy === "Name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, selectedSizes, selectedColors, selectedOccasions, priceRange, sortBy]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  const toggleOccasion = (occasion: string) => {
    setSelectedOccasions(prev => prev.includes(occasion) ? prev.filter(o => o !== occasion) : [...prev, occasion]);
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]);
  };

  const resetFilters = () => {
    setActiveCategory("All");
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedOccasions([]);
    setSelectedStatuses([]);
    setPriceRange([0, 5000]);
    setSortBy("Newest");
  };

  const FilterSections = () => (
    <div className="space-y-10">
      <div>
        <h6 className="text-[10px] tracking-[0.2em] font-bold text-luxury-black mb-6 uppercase">Status</h6>
        <div className="flex flex-wrap gap-2">
          {statuses.map(stat => (
            <button 
              key={stat}
              onClick={() => toggleStatus(stat)}
              className={`px-3 py-2 text-[9px] uppercase tracking-widest font-bold border transition-all rounded-sm ${selectedStatuses.includes(stat) ? 'bg-luxury-blue border-luxury-blue text-white shadow-md' : 'bg-luxury-ice/30 border-transparent text-slate-500 hover:border-luxury-gold'}`}
            >
              {stat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h6 className="text-[10px] tracking-[0.2em] font-bold text-luxury-black mb-6 uppercase">Categories</h6>
        <div className="grid grid-cols-2 gap-3">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] uppercase tracking-widest font-bold py-3 px-4 border transition-all rounded-sm text-left ${activeCategory === cat ? 'bg-luxury-blue border-luxury-blue text-white shadow-lg' : 'bg-luxury-ice/20 border-transparent text-slate-500 hover:border-luxury-gold'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h6 className="text-[10px] tracking-[0.2em] font-bold text-luxury-black mb-6 uppercase">Size guide</h6>
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => (
            <button 
              key={size}
              onClick={() => toggleSize(size)}
              className={`w-12 h-12 flex items-center justify-center text-[11px] font-bold border transition-all rounded-sm ${selectedSizes.includes(size) ? 'bg-luxury-blue border-luxury-blue text-white shadow-md scale-105' : 'bg-luxury-ice/20 border-transparent text-luxury-black hover:border-luxury-gold'}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h6 className="text-[10px] tracking-[0.2em] font-bold text-luxury-black mb-6 uppercase">Price range</h6>
        <div className="space-y-4">
          <input 
            type="range" 
            min="0" 
            max="5000" 
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full h-1 bg-luxury-beige rounded-lg appearance-none cursor-pointer accent-luxury-gold"
          />
          <div className="flex justify-between text-[11px] font-bold text-luxury-gold tracking-widest">
            <span>KSH 0</span>
            <span>KSH {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div>
        <h6 className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-black mb-6">Occasion</h6>
        <div className="flex flex-wrap gap-2">
          {occasions.map(occ => (
            <button 
              key={occ}
              onClick={() => toggleOccasion(occ)}
              className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold border transition-all rounded-sm ${selectedOccasions.includes(occ) ? 'bg-luxury-gold border-luxury-gold text-white' : 'border-luxury-beige text-slate-400 hover:border-luxury-gold hover:text-luxury-black'}`}
            >
              {occ}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h6 className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-black mb-6">Colors</h6>
        <div className="flex flex-wrap gap-3">
          {colors.map(color => (
            <button 
              key={color}
              onClick={() => toggleColor(color)}
              className={`w-8 h-8 rounded-full border transition-all ${selectedColors.includes(color) ? 'ring-2 ring-luxury-gold ring-offset-2 scale-110 shadow-lg' : 'border-luxury-beige hover:scale-105'}`}
              style={{ backgroundColor: color.toLowerCase() === 'gold' ? '#D4AF37' : color.toLowerCase() === 'emerald' ? '#50C878' : color.toLowerCase() === 'tan' ? '#D2B48C' : color.toLowerCase() }}
              title={color}
            />
          ))}
        </div>
      </div>

      <button 
        onClick={resetFilters}
        className="w-full flex items-center justify-center gap-3 py-4 border border-luxury-black/10 text-luxury-black/40 text-[10px] uppercase tracking-[0.3em] font-bold hover:text-luxury-pink hover:border-luxury-pink transition-all group"
      >
        <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
        Reset All
      </button>
    </div>
  );

  return (
    <div className="pt-40 pb-32 bg-luxury-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <header className="mb-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-6">
              <p className="text-luxury-gold uppercase tracking-[0.4em] text-[11px] font-bold">The catalogue</p>
              <h1 className="text-6xl md:text-[84px] font-serif text-luxury-black italic leading-[0.95] font-bold">Collections</h1>
            </div>
            
            <div className="flex items-center gap-10 pb-4 border-b border-luxury-ice/30">
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Sort By:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-[11px] font-bold text-luxury-black focus:outline-none cursor-pointer uppercase tracking-tighter"
                >
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Name</option>
                </select>
              </div>
              <button 
                onClick={() => setIsFilterDrawerOpen(true)}
                className="lg:hidden luxury-button btn-gradient !px-8 !py-3"
              >
                <Filter className="w-4 h-4" />
                Refine
              </button>
            </div>
          </div>
          <div className="w-32 h-[1px] bg-luxury-gold" />
        </header>

        <div className="flex gap-20">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-40 glass-card p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/10">
                <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-luxury-navy flex items-center gap-3">
                  <Filter className="w-4 h-4 text-luxury-gold" />
                  Filter By
                </h3>
              </div>
              <FilterSections />
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-grow">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onView={setSelectedProduct} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-40 bg-white/50 border border-dashed border-luxury-beige rounded-sm">
                <p className="text-4xl font-serif italic text-luxury-black/20 mb-6">No matches found</p>
                <button 
                  onClick={resetFilters}
                  className="text-luxury-blue font-bold text-xs uppercase tracking-widest hover:text-luxury-gold transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 z-[150] bg-luxury-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[160] w-full max-w-sm glass-card border-none p-8 lg:hidden overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-2xl font-serif italic text-white">Refine Selection</h3>
                <button onClick={() => setIsFilterDrawerOpen(false)} className="p-2 -mr-2 text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="text-white">
                <FilterSections />
              </div>
              <button 
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full mt-12 luxury-button btn-gradient"
              >
                Show {filteredProducts.length} Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}
