import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Upload,
  Image as ImageIcon,
  Save,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// --- Types ---
interface Product {
  id: string;
  name: string;
  category: 'dress' | 'bag' | 'shoe';
  price: number;
  sizes: string[];
  colors: string[];
  stock: number;
  images: string[];
  description: string;
  status: 'available' | 'sold out';
  created_at: string;
}

interface Order {
  id: string;
  customer_id: string;
  total_amount: number;
  status: 'received' | 'payment_confirmed' | 'packed' | 'delivered';
  payment_status: 'pending' | 'confirmed';
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
  };
}

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers'>('overview');
  const [isLoading, setIsLoading] = useState(true);

  // --- Redirect if not logged in ---
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
    // Ideally check for admin role here
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-white">
        <div className="w-8 h-8 border-4 border-luxury-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F3] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-luxury-navy text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-8 border-b border-white/10">
          <h1 className="font-serif italic text-2xl">GF <span className="text-luxury-gold">Admin</span></h1>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          <SidebarItem 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label="Overview" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <SidebarItem 
            icon={<Package className="w-5 h-5" />} 
            label="Products" 
            active={activeTab === 'products'} 
            onClick={() => setActiveTab('products')} 
          />
          <SidebarItem 
            icon={<ShoppingBag className="w-5 h-5" />} 
            label="Orders" 
            active={activeTab === 'orders'} 
            onClick={() => setActiveTab('orders')} 
          />
          <SidebarItem 
            icon={<Users className="w-5 h-5" />} 
            label="Customers" 
            active={activeTab === 'customers'} 
            onClick={() => setActiveTab('customers')} 
          />
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            View Website
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-serif text-luxury-black capitalize">{activeTab}</h2>
            <p className="text-slate-400 text-sm mt-1">Management Dashboard v1.0</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-white border border-luxury-beige rounded-none text-sm focus:outline-none focus:border-luxury-blue transition-all"
              />
            </div>
            <div className="w-10 h-10 bg-luxury-gold/10 flex items-center justify-center text-luxury-gold font-bold">
              {user?.email?.[0].toUpperCase()}
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && <OverviewSection key="overview" />}
          {activeTab === 'products' && <ProductsSection key="products" />}
          {activeTab === 'orders' && <OrdersSection key="orders" />}
          {activeTab === 'customers' && <CustomersSection key="customers" />}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Sub-components ---

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 transition-all rounded-none ${active ? 'bg-luxury-gold text-luxury-navy font-bold' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
    >
      {icon}
      <span className="text-sm tracking-wide">{label}</span>
    </button>
  );
}

function OverviewSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<DollarSign />} label="Total Revenue" value="Ksh 128,450" change="+12.5%" />
        <StatCard icon={<ShoppingBag />} label="Active Orders" value="24" change="+4" />
        <StatCard icon={<Users />} label="Total Customers" value="842" change="+18%" />
        <StatCard icon={<TrendingUp />} label="Avg. Order Value" value="Ksh 5,350" change="-2.1%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 border border-luxury-beige shadow-sm">
          <h3 className="text-lg font-serif mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#F8F7F3] border border-luxury-beige/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white flex items-center justify-center text-xs font-bold border border-luxury-beige">ORD</div>
                  <div>
                    <p className="text-sm font-bold text-luxury-black">#GF-240{i}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Jane Doe • 2 items</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-luxury-blue">Ksh 8,500</p>
                  <span className="text-[9px] px-2 py-0.5 bg-green-100 text-green-600 font-bold uppercase">Paid</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 border border-luxury-beige shadow-sm">
          <h3 className="text-lg font-serif mb-6">Low Stock Alert</h3>
          <div className="space-y-4">
            {['Silk Wrap Dress', 'Pointed Stilettos'].map(name => (
              <div key={name} className="flex items-center justify-between p-4 border-b border-luxury-beige last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-luxury-beige overflow-hidden">
                    <div className="w-full h-full bg-slate-200" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-luxury-black">{name}</p>
                    <p className="text-[10px] text-red-500 font-bold">Only 2 left in stock</p>
                  </div>
                </div>
                <button className="text-[10px] uppercase tracking-widest font-bold text-luxury-blue hover:underline">Restock</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, label, value, change }: { icon: React.ReactNode, label: string, value: string, change: string }) {
  return (
    <div className="bg-white p-6 border border-luxury-beige shadow-sm flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 bg-luxury-navy text-white flex items-center justify-center rounded-none shadow-lg shadow-luxury-navy/20">
          {icon}
        </div>
        <span className={`text-xs font-bold ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{change}</span>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-1">{label}</p>
        <p className="text-2xl font-serif text-luxury-black">{value}</p>
      </div>
    </div>
  );
}

function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center bg-white p-6 border border-luxury-beige shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 border border-luxury-beige">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-500">Filter: All Categories</span>
          </div>
          <p className="text-xs text-slate-400 font-medium">{products.length} Products Found</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-luxury-navy text-white px-6 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-luxury-gold hover:text-luxury-navy transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="bg-white border border-luxury-beige shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#F8F7F3] border-b border-luxury-beige">
            <tr>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400">Product</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400">Category</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400">Price</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400">Stock</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400">Status</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-luxury-beige">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-4 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <p className="text-sm">Fetching catalog...</p>
                  </div>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-4">
                    <Package className="w-12 h-12 text-slate-200" />
                    <p className="text-sm italic">No products added yet.</p>
                  </div>
                </td>
              </tr>
            ) : products.map(product => (
              <tr key={product.id} className="hover:bg-[#F8F7F3] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-luxury-beige overflow-hidden">
                      {product.images?.[0] && <img src={product.images[0]} className="w-full h-full object-cover" alt="" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-luxury-black">{product.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">ID: {product.id.slice(0, 8)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 capitalize text-sm text-slate-600">{product.category}</td>
                <td className="px-6 py-4 font-bold text-sm text-luxury-black">Ksh {product.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm font-medium">{product.stock} pcs</td>
                <td className="px-6 py-4">
                  <span className={`text-[9px] px-3 py-1 font-bold uppercase ${product.status === 'available' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white border border-transparent hover:border-luxury-beige text-slate-400 hover:text-luxury-blue transition-all">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-white border border-transparent hover:border-luxury-beige text-slate-400 hover:text-red-500 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <ProductModal onClose={() => setIsModalOpen(false)} onSave={() => { setIsModalOpen(false); fetchProducts(); }} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProductModal({ onClose, onSave }: { onClose: () => void, onSave: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'dress',
    price: '',
    stock: '',
    description: '',
    status: 'available',
    sizes: [] as string[],
    colors: [] as string[],
    images: [] as string[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock)
        }]);
      if (error) throw error;
      onSave();
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product. Check if the table "products" exists in Supabase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-luxury-navy/80 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10 shadow-2xl flex flex-col"
      >
        <div className="p-8 border-b border-luxury-beige flex justify-between items-center bg-[#F8F7F3]">
          <div>
            <h3 className="text-2xl font-serif">Add New Product</h3>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Product Catalog Entry</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-slate-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Product Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-4 bg-[#F8F7F3] border-transparent border-b-luxury-beige border-b-2 focus:border-luxury-blue focus:bg-white outline-none transition-all text-sm"
                placeholder="e.g. Silk Evening Gown"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as any})}
                  className="w-full px-4 py-4 bg-[#F8F7F3] border-transparent border-b-luxury-beige border-b-2 focus:border-luxury-blue focus:bg-white outline-none transition-all text-sm"
                >
                  <option value="dress">Dresses</option>
                  <option value="shoe">Shoes</option>
                  <option value="bag">Bags</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Price (Ksh)</label>
                <input 
                  required
                  type="number" 
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-4 bg-[#F8F7F3] border-transparent border-b-luxury-beige border-b-2 focus:border-luxury-blue focus:bg-white outline-none transition-all text-sm font-bold"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Description</label>
              <textarea 
                required
                rows={4}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-4 bg-[#F8F7F3] border-transparent border-b-luxury-beige border-b-2 focus:border-luxury-blue focus:bg-white outline-none transition-all text-sm resize-none"
                placeholder="Detail the fabric, fit, and care instructions..."
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Product Images</label>
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-[3/4] border-2 border-dashed border-luxury-beige flex flex-col items-center justify-center text-slate-300 hover:border-luxury-blue hover:text-luxury-blue transition-all cursor-pointer group">
                  <Plus className="w-6 h-6 group-hover:scale-125 transition-transform" />
                  <span className="text-[8px] uppercase tracking-widest mt-2 font-bold">Add Image</span>
                </div>
              </div>
              <p className="text-[9px] text-slate-400 italic">Recommended: 1200x1600px with white background.</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Initial Stock</label>
                <input 
                  required
                  type="number" 
                  value={formData.stock}
                  onChange={e => setFormData({...formData, stock: e.target.value})}
                  className="w-full px-4 py-4 bg-[#F8F7F3] border-transparent border-b-luxury-beige border-b-2 focus:border-luxury-blue focus:bg-white outline-none transition-all text-sm"
                  placeholder="10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Status</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value as any})}
                  className="w-full px-4 py-4 bg-[#F8F7F3] border-transparent border-b-luxury-beige border-b-2 focus:border-luxury-blue focus:bg-white outline-none transition-all text-sm"
                >
                  <option value="available">Available</option>
                  <option value="sold out">Sold Out</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-luxury-beige flex gap-4">
              <button 
                type="submit"
                disabled={loading}
                className="flex-1 bg-luxury-navy text-white py-4 text-[11px] uppercase tracking-widest font-bold hover:bg-luxury-gold hover:text-luxury-navy transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-luxury-navy/10"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Product
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function OrdersSection() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white border border-luxury-beige shadow-sm"
    >
      <div className="p-8 border-b border-luxury-beige flex justify-between items-center">
        <h3 className="text-xl font-serif">Recent Orders</h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-luxury-beige text-[10px] uppercase tracking-widest font-bold hover:bg-[#F8F7F3] transition-all">Received</button>
          <button className="px-4 py-2 border border-luxury-beige text-[10px] uppercase tracking-widest font-bold hover:bg-[#F8F7F3] transition-all">Shipped</button>
        </div>
      </div>
      <div className="p-20 text-center text-slate-300 italic text-sm">
        <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
        Order processing module coming soon...
      </div>
    </motion.div>
  );
}

function CustomersSection() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white border border-luxury-beige shadow-sm"
    >
      <div className="p-20 text-center text-slate-300 italic text-sm">
        <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
        Customer relationship management coming soon...
      </div>
    </motion.div>
  );
}
