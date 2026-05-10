import { 
  Instagram, 
  Facebook, 
  Music, 
  Pin, 
  MessageCircle,
  MapPin,
  Truck,
  Gem,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="contact" className="bg-luxury-navy pt-40 pb-20 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-luxury-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-luxury-pink/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="space-y-12">
            <img 
              src="/logo.png" 
              alt="GF Collection" 
              className="h-16 w-auto brightness-0 invert opacity-90" 
              referrerPolicy="no-referrer" 
            />
            <p className="text-white/40 text-[14px] leading-relaxed font-light italic">
              "The Power House of Fashion. Redefining Kenyan luxury for the woman who commands attention and respect."
            </p>
            <div className="flex gap-8">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all transform hover:-translate-y-1"><Instagram className="w-4 h-4" /></a>
              <a href="https://wa.me/254740275625" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#25D366] hover:border-[#25D366] transition-all transform hover:-translate-y-1"><MessageCircle className="w-4 h-4" /></a>
            </div>
          </div>
          
          <div className="space-y-10">
            <h5 className="text-luxury-gold text-[10px] uppercase tracking-[0.5em] font-bold">House Links</h5>
            <ul className="space-y-6">
              <li><Link to="/about" className="text-white/50 text-[12px] uppercase tracking-widest hover:text-white transition-all block translate-x-0 hover:translate-x-2">The Heritage</Link></li>
              <li><Link to="/collections" className="text-white/50 text-[12px] uppercase tracking-widest hover:text-white transition-all block translate-x-0 hover:translate-x-2">Curated Edit</Link></li>
              <li><Link to="/contact" className="text-white/50 text-[12px] uppercase tracking-widest hover:text-white transition-all block translate-x-0 hover:translate-x-2">Concierge</Link></li>
              <li><Link to="/faq" className="text-white/50 text-[12px] uppercase tracking-widest hover:text-white transition-all block translate-x-0 hover:translate-x-2">Journal</Link></li>
            </ul>
          </div>

          <div className="space-y-10">
            <h5 className="text-luxury-gold text-[10px] uppercase tracking-[0.5em] font-bold">Service Policy</h5>
            <ul className="space-y-6">
              <li><button className="text-white/50 text-[12px] uppercase tracking-widest hover:text-white transition-all block translate-x-0 hover:translate-x-2">Global Shipping</button></li>
              <li><button className="text-white/50 text-[12px] uppercase tracking-widest hover:text-white transition-all block translate-x-0 hover:translate-x-2">Returns Boutique</button></li>
              <li><button className="text-white/50 text-[12px] uppercase tracking-widest hover:text-white transition-all block translate-x-0 hover:translate-x-2">Privacy & Legal</button></li>
              <li><button className="text-white/50 text-[12px] uppercase tracking-widest hover:text-white transition-all block translate-x-0 hover:translate-x-2">Cookie Statement</button></li>
            </ul>
          </div>

          <div className="space-y-10">
            <h5 className="text-luxury-gold text-[10px] uppercase tracking-[0.5em] font-bold">The Boutique</h5>
            <div className="space-y-8 text-white/50 text-[13px] font-light leading-relaxed">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-luxury-blue shrink-0 mt-1" />
                <p>MMUST Main Gate, <br /> Kakamega, Kenya</p>
              </div>
              <div className="flex items-start gap-4">
                <Truck className="w-5 h-5 text-luxury-blue shrink-0 mt-1" />
                <p>Express Delivery via G4S <br /> & Wells Fargo Countrywide</p>
              </div>
              <div className="flex items-start gap-4">
                <Gem className="w-5 h-5 text-luxury-blue shrink-0 mt-1" />
                <p>High Fashion Standard <br /> Since Inception</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-2">
             <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold">© 2024 GF Collection. Architectural Fashion Design.</p>
             <p className="text-[9px] text-white/10 uppercase tracking-[0.2em]">Crafted for the Divine Elegance.</p>
          </div>
          <div className="flex gap-10 items-center">
             <img src="/logo.png" className="h-6 w-auto brightness-0 invert opacity-10" referrerPolicy="no-referrer" />
             <div className="w-[1px] h-4 bg-white/10" />
             <Link to="/collections" className="text-[10px] text-luxury-gold uppercase tracking-[0.4em] font-bold hover:text-white transition-colors">Enter The Collection</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
