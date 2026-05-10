import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  ArrowRight, 
  Gem, 
  Star, 
  UserCheck, 
  Heart, 
} from 'lucide-react';
import { useState } from 'react';
import { PRODUCTS, Product } from '../ProductData';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Dresses", "Bags", "Shoes"];
  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => {
        if (activeCategory === "Dresses") return p.category.includes("Dress");
        if (activeCategory === "Bags") return p.category.includes("Bag");
        if (activeCategory === "Shoes") return p.category.includes("Heels") || p.category.includes("Sneakers");
        return p.category === activeCategory;
      });

  return (
    <div className="pt-0">
        {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden bg-luxury-navy">
        {/* Background Image with Blue Luxury Lighting */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2000" 
            alt="Luxury Fashion Hero"
            className="w-full h-full object-cover grayscale-[0.2] opacity-60"
            referrerPolicy="no-referrer"
          />
          {/* Blue Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-navy via-luxury-blue/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/90 via-transparent to-luxury-navy/40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl glass-card p-12 md:p-20 rounded-[3rem] border-white/5"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-luxury-gold uppercase tracking-[0.4em] text-[11px] font-bold mb-8"
            >
              The Power House of Fashion
            </motion.p>
            <h1 className="text-5xl sm:text-7xl md:text-[84px] font-serif text-white italic leading-[0.95] mb-10 font-bold">
              Divine <span className="text-luxury-gold">Elegance</span>
              <br />
              <span className="text-2xl md:text-4xl block mt-6 font-sans not-italic font-medium tracking-tight opacity-90">Curated for your best moments</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-xl leading-relaxed">
              Discover the latest curation of luxury dresses, statement bags, and timeless shoes crafted for the modern Kenyan woman.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/collections" className="luxury-button btn-gradient">
                Shop New Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Detail */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 hidden lg:block"
        >
          <div className="glass-card p-6 rounded-2xl flex items-center gap-6 max-w-[320px]">
             <div className="w-20 h-24 rounded-xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
             </div>
             <div>
                <div className="flex items-center gap-2 mb-1">
                   <p className="text-luxury-white/50 text-[10px] tracking-[0.3em] italic uppercase">Exclusive edit</p>
                   <div className="w-1.5 h-1.5 bg-luxury-red rounded-full animate-pulse" />
                </div>
                <p className="text-white font-serif text-lg leading-tight mb-2">Midnight Bloom Maxi Dress</p>
                <Link to="/collections" className="text-luxury-gold text-[9px] uppercase tracking-[0.3em] font-bold hover:text-white transition-colors">Discover details</Link>
             </div>
          </div>
        </motion.div>
      </section>

      {/* 2. Quick Categories (Miller's Law - Grouping) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Dresses", icon: Gem, color: "bg-luxury-ice" },
              { name: "Bags", icon: ShoppingBag, color: "bg-luxury-pink/30" },
              { name: "Shoes", icon: UserCheck, color: "bg-luxury-beige" },
              { name: "Accessories", icon: Star, color: "bg-luxury-gold/10" },
            ].map((cat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group cursor-pointer text-center space-y-4"
              >
                <div className={`w-20 h-20 mx-auto rounded-full ${cat.color} flex items-center justify-center transition-all duration-500 group-hover:shadow-2xl`}>
                  <cat.icon className="w-8 h-8 text-luxury-navy opacity-80" />
                </div>
                <h4 className="text-[11px] font-semibold tracking-[0.3em] text-luxury-black/60 group-hover:text-luxury-blue transition-colors uppercase">{cat.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Trending Products (F-Theory Focal Point) */}
      <section className="bg-luxury-ice/20 py-32 rounded-[3rem_3rem_0_0]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div className="max-w-xl space-y-6">
              <p className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] md:text-[11px] font-bold">Trending now</p>
              <h2 className="text-4xl md:text-7xl font-serif text-luxury-navy italic leading-[0.95]">Must-Have Styles <br /> for this season</h2>
            </div>
            <div className="glass-card !bg-white/50 p-2 rounded-2xl border-luxury-ice shadow-sm">
               <div className="flex gap-2">
                  {categories.map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`luxury-button !px-8 !py-3 !rounded-xl !text-[9px] ${activeCategory === cat ? 'bg-luxury-navy text-white shadow-xl' : 'text-luxury-navy/40 hover:text-luxury-navy'}`}
                    >
                      {cat}
                    </button>
                  ))}
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
            {filteredProducts.slice(0, 4).map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onView={setSelectedProduct} 
              />
            ))}
          </div>
          
          <div className="mt-24 text-center">
            <Link to="/collections" className="luxury-button btn-gradient max-w-sm mx-auto">
              Explore All Styles
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Editorial Collections (Aesthetic-Usability) */}
      <section className="py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative zoom-on-hover px-10">
              <motion.div 
                whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
                transition={{ duration: 1.5 }}
                className="aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(10,25,49,0.3)] relative z-10"
              >
                <img src="https://images.unsplash.com/photo-1490114538077-0a7f8cb498b1?q=80&w=1000" loading="lazy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-luxury-blue/5 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-full h-full border-2 border-luxury-ice rounded-3xl -z-10 translate-x-10 translate-y-10" />
            </div>
            
            <div className="space-y-10">
              <p className="text-luxury-gold uppercase tracking-[0.5em] text-[11px] font-bold">Editorial curation</p>
              <h3 className="text-5xl md:text-8xl font-serif text-luxury-navy italic leading-[0.9]">The Power <br /> Of Elegance</h3>
              <p className="text-luxury-navy/60 text-lg md:text-xl font-light leading-relaxed max-w-lg italic">
                "Fashion is the armor to survive the reality of everyday life." 
              </p>
              <p className="text-luxury-navy/70 text-sm leading-loose max-w-md">
                Every piece in our Boss Lady collection is curated to empower your status, command respect, and showcase your refined aesthetic in every room you enter.
              </p>
              <div className="pt-6">
                <Link to="/collections" state={{ category: "Office Dresses" }} className="luxury-button btn-outline">
                  Shop The Boss Lady Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials (Trust & Validation) */}
      <section className="py-32 bg-luxury-navy text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
           <div className="text-[20rem] font-serif absolute -top-40 -left-20 leading-none">"</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif italic">Voices of Elegance</h2>
            <p className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-bold">Client experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
                className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 space-y-8"
              >
                <div className="flex gap-1 text-luxury-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-lg italic font-light text-white/80 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="text-luxury-gold font-bold text-sm tracking-widest uppercase">{t.author}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{t.role}</p>
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
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] relative z-10 overflow-hidden rounded-sm luxury-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1490114538077-0a7f8cb498b1?q=80&w=1000" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-luxury-blue/5 rounded-full blur-3xl" />
              <div className="absolute -top-10 -left-10 w-48 h-48 border border-luxury-gold/20 -z-10" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="text-luxury-gold uppercase tracking-[0.4em] text-[11px] font-bold">Our philosophy</p>
              <h3 className="text-4xl md:text-7xl font-serif text-luxury-black italic leading-[0.95]">The Power House of Fashion</h3>
              <p className="text-luxury-black/60 leading-relaxed font-light text-xl">
                GF Collection is the Power House of Fashion in Kakamega, bringing classy, elegant, and modern dresses to women who want to stand out confidently. 
              </p>
              <p className="text-luxury-black/60 leading-relaxed font-light">
                Whether it's for a high-stakes office setting, an intimate dinner, or a glamorous event, we provide everyday luxury that empowers your status and obsessed fashion sense.
              </p>
              <div className="pt-8">
                <Link to="/about" className="luxury-button btn-gradient">
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
