import { motion } from 'motion/react';
import { Heart, Star, ShoppingBag, Eye, MessageCircle } from 'lucide-react';
import { Product } from '../ProductData';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  key?: any;
}

export default function ProductCard({ product, onView }: ProductCardProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer flex flex-col h-full bg-transparent transition-all duration-700"
    >
      <div 
        className="aspect-[3/4] bg-luxury-ice/20 mb-10 overflow-hidden relative rounded-[2rem] group-hover:shadow-[0_60px_100px_-20px_rgba(10,25,49,0.3)] transition-all duration-1000"
        onClick={() => onView(product)}
      >
        {/* Promotion Tag */}
        {product.tag && (
          <span className="absolute top-6 left-6 z-20 bg-luxury-gold text-white text-[9px] px-6 py-2.5 uppercase tracking-[0.2em] font-bold rounded-full shadow-2xl backdrop-blur-md border border-white/20">
            {product.tag}
          </span>
        )}

        {/* Product Image */}
        <div className="w-full h-full overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
            referrerPolicy="no-referrer" 
          />
        </div>

        {/* Interaction Overlay */}
        <div className="absolute inset-0 bg-luxury-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px]" />

        {/* Floating Icons */}
        <div className="absolute top-6 right-6 z-20 flex flex-col gap-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
           <button className="w-12 h-12 glass-card !bg-white/10 text-white rounded-full flex items-center justify-center hover:!bg-luxury-pink hover:text-white transition-all scale-90 group-hover:scale-100">
              <Heart className="w-5 h-5" />
           </button>
        </div>

        {/* Button Overlay */}
        <div className="absolute inset-x-8 bottom-8 z-20 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onView(product);
            }}
            className="w-full bg-white text-luxury-navy py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-blue hover:text-white transition-all shadow-2xl rounded-2xl"
          >
            Explore Edit
          </button>
        </div>
      </div>

      <div className="text-center px-4 space-y-4">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-medium opacity-60 group-hover:opacity-100 transition-opacity">{product.category}</span>
          <h4 className="text-xl md:text-2xl font-serif italic text-luxury-navy leading-tight group-hover:text-luxury-blue transition-all">
            {product.name}
          </h4>
        </div>
        <div className="w-12 h-[1px] bg-luxury-ice/50 mx-auto group-hover:w-24 group-hover:bg-luxury-gold transition-all duration-700" />
        <p className="text-base md:text-lg font-bold text-luxury-navy/80 tracking-widest">{product.price}</p>
      </div>
    </motion.div>
  );
}
