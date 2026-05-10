import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { PRODUCTS, Product } from '../../ProductData';
import logo from '../../assets/logo.png';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  ChevronRight,
  MessageCircle,
  Heart,
  X,
  Home,
  Grid,
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navigationLinks = [
  { name: "New In", href: "/new-arrivals" },
  { 
    name: "Dresses", 
    href: "/collections", 
    dropdown: [
      { name: "Office Dresses", category: "Office Dresses" },
      { name: "Dinner Dresses", category: "Dinner Dresses" },
      { name: "Casual Dresses", category: "Weekend Casual" },
      { name: "New Arrivals", category: "All" },
    ]
  },
  { 
    name: "Shoes", 
    href: "/collections", 
    dropdown: [
      { name: "Luxury Heels", category: "All" },
      { name: "Sneakers", category: "All" },
      { name: "Sandals", category: "All" },
    ]
  },
  { 
    name: "Bags", 
    href: "/collections", 
    dropdown: [
      { name: "Handbags", category: "All" },
      { name: "Office Bags", category: "All" },
      { name: "Mini Bags", category: "All" },
    ]
  },
  { name: "Sale", href: "/collections", category: "Sexy Wear" },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force scrolled state if not on home page
  const isHomePage = location.pathname === '/';
  const navScrolled = scrolled || !isHomePage;

  return (
    <>
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-white text-luxury-black p-6 md:p-12 overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-16">
                <span className="text-[11px] tracking-[0.3em] font-semibold text-luxury-gold uppercase">Explore the house</span>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-luxury-beige rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="relative group">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search products or styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-3xl md:text-5xl font-serif italic bg-transparent border-b border-luxury-beige pb-6 focus:outline-none focus:border-luxury-blue transition-colors placeholder:text-slate-200"
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 text-luxury-beige group-focus-within:text-luxury-blue transition-colors" />
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Suggestions/Results */}
                <div>
                  <h6 className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 mb-8">
                    {searchQuery ? 'Top results' : 'Popular searches'}
                  </h6>
                  {searchQuery ? (
                    <div className="space-y-6">
                      {searchResults.length > 0 ? searchResults.map(product => (
                        <Link 
                          key={product.id}
                          to="/collections"
                          className="flex items-center gap-6 group/item"
                        >
                          <div className="w-16 h-20 bg-luxury-beige overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-widest text-luxury-gold font-bold mb-1">{product.category}</p>
                            <p className="text-lg font-serif italic text-luxury-black group-hover/item:text-luxury-blue transition-colors">{product.name}</p>
                            <p className="text-xs font-bold text-slate-400">{product.price}</p>
                          </div>
                        </Link>
                      )) : (
                        <p className="text-slate-400 italic font-light">No matches found for "{searchQuery}"</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {['Silk Dresses', 'Office Sets', 'New In', 'Best Sellers', 'Evening Wear'].map(tag => (
                        <button 
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="px-6 py-3 bg-luxury-beige/30 hover:bg-luxury-beige text-[10px] uppercase tracking-widest font-bold transition-all rounded-full"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Featured Category */}
                {!searchQuery && (
                  <div className="hidden md:block">
                    <h6 className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 mb-8">Featured</h6>
                    <div className="relative aspect-video overflow-hidden group/feat">
                      <img 
                        src="https://images.unsplash.com/photo-1539109132332-6299166a607e?q=80&w=1000&auto=format&fit=crop" 
                        className="w-full h-full object-cover grayscale brightness-50 group-hover/feat:grayscale-0 group-hover/feat:scale-105 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                        <p className="text-white text-[10px] uppercase tracking-[0.4em] font-bold mb-4">Summer Editorial</p>
                        <h4 className="text-white text-3xl font-serif italic mb-6">The Power Suit Series</h4>
                        <Link to="/collections" state={{ category: "2 Piece" }} className="bg-white text-luxury-black px-8 py-3 text-[9px] uppercase tracking-widest font-bold hover:bg-luxury-gold hover:text-white transition-all shadow-2xl">
                          Explore Now
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-luxury-navy/95 backdrop-blur-md lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[70] w-full max-w-xs bg-luxury-white p-8 lg:hidden flex flex-col overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
                  <img src="/logo.png" alt="GF" className="h-12 w-auto" referrerPolicy="no-referrer" />
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2 text-luxury-black">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {navigationLinks.filter(l => ["Dresses", "Shoes", "Bags", "Sale"].includes(l.name)).map((link) => (
                  <div key={link.name} className="border-b border-luxury-beige last:border-0">
                    <Link 
                      to={link.href} 
                      state={{ category: link.category || (link.dropdown ? 'All' : undefined) }}
                      onClick={() => setIsMenuOpen(false)}
                      className="py-6 text-2xl font-serif italic text-luxury-black hover:text-luxury-blue transition-colors flex items-center justify-between group"
                    >
                      {link.name}
                      <ChevronRight className="w-5 h-5 text-luxury-blue group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))}
                
                <div className="mt-12 space-y-6">
                  <div className="flex flex-wrap gap-4">
                    {navigationLinks.filter(l => !["Dresses", "Shoes", "Bags", "Sale"].includes(l.name)).map(link => (
                      <Link 
                        key={link.name}
                        to={link.href}
                        state={{ category: link.category }}
                        onClick={() => setIsMenuOpen(false)}
                        className="px-4 py-2 border border-luxury-beige text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-luxury-blue transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-luxury-beige grid grid-cols-2 gap-6">
                  <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-[10px] uppercase tracking-widest font-bold text-slate-400">About GF</Link>
                  <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="text-[10px] uppercase tracking-widest font-bold text-slate-400">FAQ</Link>
                  <Link to={user ? "/account" : "/auth"} onClick={() => setIsMenuOpen(false)} className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Account</Link>
                  <a href="https://wa.me/254740275625" className="text-[10px] uppercase tracking-widest font-bold text-[#25D366]">WhatsApp</a>
                  {user && (
                    <button 
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }} 
                      className="text-[10px] uppercase tracking-widest font-bold text-red-500 text-left"
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav className={`fixed inset-x-0 top-0 z-[120] transition-all duration-700 ${navScrolled ? 'bg-luxury-navy/90 backdrop-blur-2xl py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-8 border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between relative">
          {/* Left: Desktop Links / Mobile Menu Button */}
          <div className="flex-1 flex items-center">
            <button onClick={() => setIsMenuOpen(true)} className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors lg:hidden border border-white/5 mr-4">
              <Menu className="w-5 h-5 text-white" />
            </button>
            <div className="hidden lg:flex gap-6 xl:gap-10 items-center whitespace-nowrap">
              {navigationLinks.map((link) => (
                <div key={link.name} className="relative group/nav flex items-center h-full">
                  <Link 
                    to={link.href} 
                    state={{ category: link.category }} 
                    className={`text-[10px] tracking-[0.3em] font-semibold transition-all duration-300 relative py-2 uppercase ${link.name === 'Sale' ? 'text-luxury-pink' : 'text-white/60 hover:text-white'}`}
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-luxury-blue transition-all duration-500 group-hover/nav:w-full" />
                  </Link>
                  
                  {link.dropdown && (
                    <div className="absolute top-full left-0 pt-8 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-500 transform translate-y-4 group-hover/nav:translate-y-0">
                      <div className="glass-card !bg-luxury-navy/98 min-w-[280px] p-10 rounded-[2rem] border-white/5">
                        <div className="space-y-8">
                           <p className="text-[9px] tracking-[0.4em] text-luxury-gold font-bold border-b border-white/5 pb-4 mb-4 uppercase">The selection</p>
                           {link.dropdown.map(item => (
                             <Link 
                                key={item.name}
                                to="/collections"
                                state={{ category: item.category }}
                                className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 hover:text-white transition-all flex items-center justify-between group/item"
                             >
                               {item.name}
                               <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-luxury-blue" />
                             </Link>
                           ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex-none md:absolute md:left-1/2 md:-translate-x-1/2">
            <Link to="/" className="flex items-center py-1 group">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                src={logo}
                alt="GF" 
                className="h-10 md:h-14 w-auto transition-all brightness-0 invert" 
                referrerPolicy="no-referrer" 
              />
            </Link>
          </div>

          {/* Right: Search / Icons */}
          <div className="flex-1 flex items-center justify-end gap-6 md:gap-12 text-white">
            <div className="hidden lg:flex items-center gap-10">
               <div 
                 onClick={() => setIsSearchOpen(true)}
                 className="flex items-center gap-4 cursor-pointer group bg-white/5 px-8 py-3 rounded-full border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-500"
               >
                  <Search className="w-4 h-4 text-white/60 group-hover:text-luxury-blue transition-colors" />
                  <span className="text-[10px] tracking-[0.3em] font-semibold text-white/30 group-hover:text-white transition-colors uppercase">Search the house</span>
               </div>
            </div>

            <div className="flex items-center gap-8">
               <div className="relative group cursor-pointer hidden sm:block">
                 <Heart className="w-5 h-5 text-white/40 group-hover:text-luxury-pink transition-colors" />
               </div>
               
               <div className="relative group cursor-pointer">
                 <Link to={user ? "/account" : "/auth"} className="bg-white/5 p-4 rounded-full hover:bg-white/10 transition-all block relative border border-white/5">
                    <User className="w-5 h-5 text-white/60 group-hover:text-luxury-blue transition-colors" />
                 </Link>
               </div>
               
               <div className="relative group cursor-pointer">
                 <Link to="/collections" className="bg-white/5 p-4 rounded-full hover:bg-white/10 transition-all block relative border border-white/5">
                    <ShoppingBag className="w-5 h-5 text-white/60 group-hover:text-luxury-blue transition-colors" />
                    <span className="absolute -top-1 -right-1 bg-luxury-red text-white text-[8px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold shadow-2xl shadow-luxury-red/50">3</span>
                 </Link>
               </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-8 inset-x-8 glass-card !bg-luxury-navy/95 border-white/5 z-[120] px-10 py-6 flex items-center justify-between shadow-[0_32px_64px_-10px_rgba(0,0,0,0.5)] rounded-[2.5rem]">
        <Link to="/" className={`flex flex-col items-center gap-2 ${location.pathname === '/' ? 'text-luxury-blue' : 'text-white/30 hover:text-white'}`}>
          <Home className="w-5 h-5 transition-colors" />
          <span className="text-[8px] tracking-[0.2em] font-medium uppercase">Home</span>
        </Link>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className={`flex flex-col items-center gap-2 ${isMenuOpen ? 'text-luxury-blue' : 'text-white/30 hover:text-white'}`}
        >
          <Grid className="w-5 h-5 transition-colors" />
          <span className="text-[8px] tracking-[0.2em] font-medium uppercase">House</span>
        </button>
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="relative flex flex-col items-center group"
        >
          <div className="w-14 h-14 -mt-12 bg-luxury-blue rounded-full flex items-center justify-center shadow-2xl shadow-luxury-blue/40 border-4 border-luxury-navy transform transition-transform group-active:scale-90">
            <Search className="w-6 h-6 text-white" />
          </div>
          <span className="text-[8px] tracking-[0.2em] font-medium uppercase mt-2 text-white/40">Search</span>
        </button>
        <Link to="/collections" className={`flex flex-col items-center gap-2 ${location.pathname === '/collections' ? 'text-luxury-blue' : 'text-white/30 hover:text-white'}`}>
          <div className="relative">
            <ShoppingBag className="w-5 h-5 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-luxury-red text-white text-[7px] w-4 h-4 flex items-center justify-center rounded-full font-bold">3</span>
          </div>
          <span className="text-[8px] tracking-[0.2em] font-medium uppercase">Cart</span>
        </Link>
        <Link to={user ? "/account" : "/auth"} className={`flex flex-col items-center gap-2 ${location.pathname === '/account' || location.pathname === '/auth' ? 'text-luxury-blue' : 'text-white/30 hover:text-white'}`}>
          <User className="w-5 h-5 transition-colors" />
          <span className="text-[8px] tracking-[0.2em] font-medium uppercase">{user ? 'Account' : 'Login'}</span>
        </Link>
      </div>
    </>
  );
}
