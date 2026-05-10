import { useState, useEffect } from 'react';
import { Product } from '../ProductData';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { supabase } from '../lib/supabase';
import { ShoppingBag } from 'lucide-react';

export default function NewArrivals() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('tag', 'New Arrival');
      
      if (data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

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
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onView={setSelectedProduct} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-[#F8F7F3] rounded-[3rem] border border-dashed border-luxury-ice max-w-4xl mx-auto">
            <ShoppingBag className="w-16 h-16 text-luxury-ice mx-auto mb-8" />
            <h3 className="text-2xl font-serif italic text-luxury-navy mb-4">No New Arrivals Yet</h3>
            <p className="text-slate-400 font-light max-w-sm mx-auto">We are currently curating our next collection. Please check back shortly for our latest drops.</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}
