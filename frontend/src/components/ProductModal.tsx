import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Heart, MessageCircle, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../ProductData';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = React.useState<string>("");

  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-luxury-navy/80 backdrop-blur-2xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] overflow-hidden relative z-10 grid grid-cols-1 md:grid-cols-2 shadow-[0_100px_80px_-20px_rgba(0,0,0,0.4)] md:rounded-none border border-white/20"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-none flex items-center justify-center text-white hover:bg-white hover:text-luxury-navy transition-all duration-300"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Left: Image Section */}
          <div className="relative h-[300px] sm:h-[400px] md:h-full bg-luxury-ice/20 overflow-hidden group">
            <img 
              src={product.image} 
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute bottom-8 left-8 flex gap-4">
               <div className="glass-card !bg-white/20 p-2 rounded-none flex gap-2">
                  <div className="w-12 h-16 bg-white/20 rounded-none" />
                  <div className="w-12 h-16 bg-white/20 rounded-none" />
               </div>
            </div>
          </div>

          {/* Right: Info Section */}
          <div className="p-6 sm:p-10 md:p-16 overflow-y-auto custom-scrollbar flex flex-col bg-white">
            <div className="mb-8 md:mb-10">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <span className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-bold">{product.category}</span>
                <div className="w-8 h-[1px] bg-luxury-gold/20" />
                <div className="flex items-center gap-1 text-luxury-gold">
                   <Star className="w-3 h-3 fill-current" />
                   <span className="text-[9px] font-bold tracking-[0.2em]">4.9 Ratings</span>
                </div>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-6xl font-serif italic text-luxury-navy mb-4 leading-tight">{product.name}</h2>
              <div className="flex items-center justify-between">
                <p className="text-xl md:text-2xl font-bold text-luxury-navy/80 tracking-widest">{product.price}</p>
                {product.isLimited && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-luxury-red/5 rounded-none border border-luxury-red/10">
                     <div className="w-1.5 h-1.5 bg-luxury-red rounded-none animate-pulse" />
                     <span className="text-[9px] font-bold text-luxury-red tracking-[0.1em] uppercase">Limited Stock</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-10 flex-grow">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 mb-4 sm:mb-6">Description</p>
                <p className="text-luxury-navy/60 leading-relaxed text-xs sm:text-sm font-light">
                  Experience ultimate <span className="text-luxury-red/80 font-medium italic">sophistication</span> with our signature {product.name.toLowerCase()}. 
                  Tailored to perfection for the woman who commands attention, this piece combines 
                  timeless elegance with modern Kenyan style. Perfect for <span className="text-luxury-red/80 font-medium italic">{product.category.toLowerCase()}</span> and high-status events.
                </p>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Select Size</p>
                  <button className="text-[10px] uppercase font-bold text-luxury-blue border-b border-luxury-blue/20 pb-0.5">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {product.sizes.map((size) => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-none flex items-center justify-center text-[12px] font-bold transition-all border ${selectedSize === size ? 'bg-luxury-navy border-luxury-navy text-white shadow-xl scale-105' : 'bg-luxury-ice/20 border-transparent text-luxury-navy hover:border-luxury-gold'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <div className="flex gap-4">
                <button 
                  className={`flex-1 luxury-button btn-gradient ${!selectedSize ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!selectedSize}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {selectedSize ? `Reserve - ${selectedSize}` : 'Select Size'}
                </button>
                <button className="w-14 h-14 flex items-center justify-center border border-luxury-beige rounded-none hover:bg-luxury-red hover:text-white transition-all group">
                  <Heart className="w-5 h-5 text-luxury-navy group-hover:text-white transition-colors" />
                </button>
              </div>
              
              <a 
                href={`https://wa.me/254740275625?text=${encodeURIComponent(`Hello GF Collection,\nI'm interested in the ${product.name}${selectedSize ? ` (Size: ${selectedSize})` : ''}. Could you tell me more?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full luxury-button flex items-center justify-center gap-4 bg-[#25D366] text-white hover:bg-[#128C7E] shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Order via WhatsApp
              </a>
              
              <p className="text-[9px] text-center text-slate-400 uppercase tracking-widest pt-4">
                Free Delivery in Nairobi • Pay on Delivery Available
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
