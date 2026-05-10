import { 
  MessageCircle, 
} from 'lucide-react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Collections from './pages/Collections';
import NewArrivals from './pages/NewArrivals';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import WhatsAppButton from './components/ui/WhatsAppButton';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Auth from './pages/Auth';
import Account from './pages/Account';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import { Toaster } from 'react-hot-toast';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { pathname } = useLocation();
  const isAdminPage = pathname === '/gf-collection-gate';

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-luxury-blue selection:text-white bg-luxury-white">
        {!isAdminPage && <Navbar />}

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/account" element={<Account />} />
            <Route path="/gf-collection-gate" element={<Admin />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>

        {!isAdminPage && <Footer />}
        <WhatsAppButton />
        <Toaster 
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#0a0f18', // luxury navy
              color: '#fff',
              borderRadius: '0px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 'bold',
            },
            success: {
              iconTheme: {
                primary: '#D4AF37', // luxury gold
                secondary: '#0a0f18',
              },
            },
          }}
        />
      </div>
    </>
  );
}
