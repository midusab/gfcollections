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
import Auth from './pages/Auth';
import Account from './pages/Account';

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
      <Router>
        <ScrollToTop />
        <div className="min-h-screen selection:bg-luxury-blue selection:text-white bg-luxury-white">
          <Navbar />

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
            </Routes>
          </main>

          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </AuthProvider>
  );
}
