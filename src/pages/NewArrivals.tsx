import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  Heart, 
  Eye, 
  Star,
  ShoppingBag,
  X,
  MessageCircle
} from 'lucide-react';
import { PRODUCTS, Product } from '../ProductData';
import ProductCard from '../components/ProductCard';

export default function NewArrivals() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductSize, setSelectedProductSize] = useState<string | null>(null);

  const newArrivals = PRODUCTS.filter(p => p.tag === "New Arrival");

  // Set default size when product is selected
  useEffect(() => {
    if (selectedProduct) {
      setSelectedProductSize(selectedProduct.sizes[0]);
    } else {
      setSelectedProductSize(null);
    }
  }, [selectedProduct]);

  return (
    <div className="pt-32 pb-24 bg-luxury-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <header className="mb-16 text-center space-y-4">
          <p className="text-luxury-gold uppercase tracking-[0.4em] text-[12px] font-bold">Just Landed</p>
          <h1 className="text-5xl md:text-7xl font-serif text-luxury-black italic">New Arrivals</h1>
          <div className="w-24 h-[1px] bg-luxury-gold mx-auto mt-8" />
          <p className="text-luxury-black/40 text-sm max-w-lg mx-auto">
            Discover the latest additions to our collection. Curated for the powerhouse woman who leads the trends.
          </p>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {newArrivals.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onView={setSelectedProduct} 
            />
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-luxury-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden relative z-10 grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-sm"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-20 text-luxury-black/20 hover:text-luxury-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="h-[400px] md:h-full bg-luxury-beige overflow-hidden">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-8 md:p-16 overflow-y-auto bg-white flex flex-col">
                <div className="mb-auto">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-gold mb-2">{selectedProduct.category}</p>
                      <h3 className="text-4xl font-serif italic text-luxury-black">{selectedProduct.name}</h3>
                    </div>
                    <p className="text-2xl font-bold text-luxury-blue">{selectedProduct.price}</p>
                  </div>
                  
                  <div className="space-y-8 mb-12">
                    <div>
                      <h6 className="text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-black/30 mb-3 border-b border-luxury-beige pb-2">Editorial Notes</h6>
                      <p className="text-sm text-luxury-black/60 leading-relaxed font-light">{selectedProduct.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-12">
                      <div>
                        <h6 className="text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-black/30 mb-2">Compositon</h6>
                        <p className="text-[11px] text-luxury-black font-medium">{selectedProduct.fabric}</p>
                      </div>
                      <div>
                        <h6 className="text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-black/30 mb-2">Weight</h6>
                        <p className="text-[11px] text-luxury-black font-medium">{selectedProduct.weight}</p>
                      </div>
                    </div>

                    <div>
                      <h6 className="text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-black/30 mb-2">Select Size</h6>
                      <div className="flex gap-2 mt-2">
                        {selectedProduct.sizes.map(s => (
                          <button 
                            key={s} 
                            onClick={() => setSelectedProductSize(s)}
                            className={`w-10 h-10 flex items-center justify-center border text-[10px] font-bold transition-all ${selectedProductSize === s ? 'bg-luxury-blue border-luxury-blue text-white' : 'border-luxury-beige text-luxury-black hover:border-luxury-gold'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <button className="flex-1 bg-luxury-blue text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-black transition-all flex items-center justify-center gap-3">
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button className="px-6 border border-luxury-beige hover:bg-luxury-beige/50 transition-colors">
                      <Heart className="w-4 h-4 text-luxury-black" />
                    </button>
                  </div>
                  <a 
                    href={`https://wa.me/254740275625?text=${encodeURIComponent(`Hello GF Collection,\nI want this ${selectedProduct.name} in size ${selectedProductSize}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 py-5 bg-[#25D366] text-white text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#128C7E] transition-all shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Order on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
