import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  ArrowRight, 
  Gem, 
  Star, 
  UserCheck, 
  Heart, 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Product } from '../ProductData';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (data) {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const categories = ["All", "Dresses", "Bags", "Shoes"];
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => {
        if (activeCategory === "Dresses") return p.category.includes("Dress");
        if (activeCategory === "Bags") return p.category.includes("Bag");
        if (activeCategory === "Shoes") return p.category.includes("Heels") || p.category.includes("Sneakers");
        return p.category === activeCategory;
      });

  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-[#F8F7F3]">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#EBE9E0] -skew-x-6 translate-x-20 z-0" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-xl"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block"
            >
              New Collection 2026
            </motion.span>
            <h1 className="text-5xl sm:text-7xl lg:text-[80px] font-serif text-luxury-black leading-[1.1] mb-8">
              Refined <span className="italic">Elegance</span>
            </h1>
            <p className="text-luxury-black/60 text-lg md:text-xl font-light mb-10 leading-relaxed max-w-md">
              Experience the perfect blend of contemporary design and timeless luxury crafted for your most significant moments.
            </p>
            <div className="flex items-center gap-8">
              <Link to="/collections" className="bg-luxury-black text-white px-10 py-4 rounded-full text-[11px] uppercase tracking-widest font-bold hover:bg-luxury-gold transition-all shadow-xl shadow-luxury-black/10">
                Explore Collection
              </Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)]">
              <img 
                src="https://images.unsplash.com/photo-1539109132332-6299166a607e?q=80&w=1200" 
                alt="High Fashion"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-luxury-beige/20 flex items-center gap-4 max-w-[240px]"
            >
              <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold">
                <Gem className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Curation</p>
                <p className="text-sm font-serif italic text-luxury-black">Premium Quality</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Background Image (Visible only on mobile) */}
        <div className="absolute inset-0 lg:hidden opacity-20 z-0">
          <img 
            src="https://images.unsplash.com/photo-1539109132332-6299166a607e?q=80&w=1200" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* 2. Quick Categories (Miller's Law - Grouping) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { name: "Dresses", icon: Gem, color: "bg-luxury-ice" },
              { name: "Bags", icon: ShoppingBag, color: "bg-luxury-pink/30" },
              { name: "Shoes", icon: UserCheck, color: "bg-luxury-beige" },
              { name: "Accessories", icon: Star, color: "bg-luxury-gold/10" },
            ].map((cat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group cursor-pointer text-center space-y-3 md:space-y-4"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full ${cat.color} flex items-center justify-center transition-all duration-500 group-hover:shadow-2xl`}>
                  <cat.icon className="w-6 h-6 md:w-8 md:h-8 text-luxury-navy opacity-80" />
                </div>
                <h4 className="text-[10px] md:text-[11px] font-semibold tracking-[0.3em] text-luxury-black/60 group-hover:text-luxury-blue transition-colors uppercase">{cat.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Trending Products (F-Theory Focal Point) */}
      <section className="bg-luxury-ice/20 py-20 md:py-32 md:rounded-[3rem_3rem_0_0]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-10">
            <div className="max-w-xl space-y-4 md:space-y-6">
              <p className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] md:text-[11px] font-bold">Trending now</p>
              <h2 className="text-3xl sm:text-4xl md:text-7xl font-serif text-luxury-navy italic leading-[0.95]">Must-Have Styles <br /> for this season</h2>
            </div>
            <div className="glass-card !bg-white/50 p-2 rounded-2xl border-luxury-ice shadow-sm overflow-x-auto max-w-full no-scrollbar">
               <div className="flex gap-2 min-w-max">
                  {categories.map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`luxury-button !px-6 sm:!px-8 !py-2 sm:!py-3 !rounded-xl !text-[8px] sm:!text-[9px] ${activeCategory === cat ? 'bg-luxury-navy text-white shadow-xl' : 'text-luxury-navy/40 hover:text-luxury-navy'}`}
                    >
                      {cat}
                    </button>
                  ))}
               </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-16 md:gap-y-20">
              {filteredProducts.slice(0, 4).map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onView={setSelectedProduct} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/50 rounded-[2rem] border border-dashed border-luxury-ice">
              <ShoppingBag className="w-12 h-12 text-luxury-ice mx-auto mb-6" />
              <h3 className="text-xl font-serif italic text-luxury-navy mb-2">The collection is currently private</h3>
              <p className="text-sm text-slate-400 font-light">New arrivals are being curated. Please check back soon.</p>
            </div>
          )}
          
          <div className="mt-24 text-center">
            <Link to="/collections" className="luxury-button btn-gradient max-w-sm mx-auto">
              Explore All Styles
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Editorial Collections (Aesthetic-Usability) */}
      <section className="py-20 md:py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <div className="relative zoom-on-hover px-4 sm:px-10">
              <motion.div 
                whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
                transition={{ duration: 1.5 }}
                className="aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(10,25,49,0.3)] relative z-10"
              >
                <img src="https://images.unsplash.com/photo-1490114538077-0a7f8cb498b1?q=80&w=1000" loading="lazy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
              <div className="absolute -top-10 -right-10 w-48 md:w-64 h-48 md:h-64 bg-luxury-blue/5 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-full h-full border-2 border-luxury-ice rounded-2xl md:rounded-3xl -z-10 translate-x-5 md:translate-x-10 translate-y-5 md:translate-y-10" />
            </div>
            
            <div className="space-y-6 md:space-y-10">
              <p className="text-luxury-gold uppercase tracking-[0.5em] text-[10px] md:text-[11px] font-bold">Editorial curation</p>
              <h3 className="text-4xl md:text-8xl font-serif text-luxury-navy italic leading-[0.9]">The Power <br /> Of Elegance</h3>
              <p className="text-luxury-navy/60 text-base md:text-xl font-light leading-relaxed max-w-lg italic">
                "Fashion is the armor to survive the reality of everyday life." 
              </p>
              <p className="text-luxury-navy/70 text-sm leading-loose max-w-md">
                Every piece in our Boss Lady collection is curated to empower your status, command respect, and showcase your refined aesthetic in every room you enter.
              </p>
              <div className="pt-4 md:pt-6">
                <Link to="/collections" state={{ category: "Office Dresses" }} className="luxury-button btn-outline !px-8 md:!px-12">
                  Shop The Boss Lady Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials (Trust & Validation) */}
      <section className="py-20 md:py-32 bg-luxury-navy text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
           <div className="text-[10rem] md:text-[20rem] font-serif absolute -top-20 md:-top-40 -left-10 md:-left-20 leading-none">"</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-24 space-y-4">
            <h2 className="text-3xl md:text-6xl font-serif italic">Voices of Elegance</h2>
            <p className="text-luxury-gold uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-bold">Client experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { text: "The quality of the dresses is unmatched. I wore the office edit to a board meeting and the confidence it gave me was incredible.", author: "Sarah M.", role: "Corporate Executive" },
              { text: "Found the perfect bag for my graduation. It arrived in Kisumu perfectly packaged. Highly recommend for luxury in Kenya!", author: "Grace O.", role: "Recent Graduate" },
              { text: "GF Collection doesn't just sell clothes; they sell an experience. The WhatsApp service was so helpful with sizing.", author: "Phyllis W.", role: "Public Servant" },
            ].map((t, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 space-y-6 md:space-y-8"
              >
                <div className="flex gap-1 text-luxury-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-base md:text-lg italic font-light text-white/80 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="text-luxury-gold font-bold text-xs md:text-sm tracking-widest uppercase">{t.author}</p>
                  <p className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

      {/* About Brand Section */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative px-4"
            >
              <div className="aspect-[4/5] relative z-10 overflow-hidden rounded-2xl luxury-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1490114538077-0a7f8cb498b1?q=80&w=1000" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 md:w-64 h-48 md:h-64 bg-luxury-blue/5 rounded-full blur-3xl" />
              <div className="absolute -top-5 md:-top-10 -left-5 md:-left-10 w-32 md:w-48 h-32 md:h-48 border border-luxury-gold/20 -z-10" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 md:space-y-8"
            >
              <p className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] md:text-[11px] font-bold">Our philosophy</p>
              <h3 className="text-3xl md:text-7xl font-serif text-luxury-black italic leading-[0.95]">The Power House of Fashion</h3>
              <p className="text-luxury-black/60 leading-relaxed font-light text-lg md:text-xl">
                GF Collection is the Power House of Fashion in Kakamega, bringing classy, elegant, and modern dresses to women who want to stand out confidently. 
              </p>
              <p className="text-luxury-black/60 leading-relaxed font-light text-sm md:text-base">
                Whether it's for a high-stakes office setting, an intimate dinner, or a glamorous event, we provide everyday luxury that empowers your status and obsessed fashion sense.
              </p>
              <div className="pt-4 md:pt-8">
                <Link to="/about" className="luxury-button btn-gradient !px-8 md:!px-12">
                  Discover Our Story
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fashion Gallery */}
      <section className="py-32 bg-luxury-navy text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-serif italic">Designed for Your Best Moments</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
              "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800",
              "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800",
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800",
            ].map((img, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="aspect-[3/4] overflow-hidden rounded-sm"
              >
                <img src={img} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
