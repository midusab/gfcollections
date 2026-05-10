import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  LogOut, 
  ChevronRight, 
  CheckCircle2, 
  Clock,
  Settings,
  CreditCard
} from 'lucide-react';

export default function Account() {
  const { user, profile, signOut, refreshProfile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      setLocation(profile.location || '');
      setAddress(profile.delivery_address || '');
    }
  }, [profile]);

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          phone: phone,
          location: location,
          delivery_address: address,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
      
      await refreshProfile();
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-luxury-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-4">
            <div className="glass-card !bg-white p-8 rounded-[2.5rem] border-luxury-beige/20 shadow-xl shadow-luxury-blue/5">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-luxury-blue/10 rounded-full flex items-center justify-center text-luxury-blue font-serif italic text-2xl">
                  {fullName ? fullName[0] : user?.email?.[0].toUpperCase()}
                </div>
                <div>
                  <h2 className="font-serif italic text-xl text-luxury-black truncate w-40">{fullName || 'Valued Client'}</h2>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Premium Member</p>
                </div>
              </div>

              <nav className="space-y-1">
                {[
                  { icon: User, label: 'Personal Details', active: true },
                  { icon: ShoppingBag, label: 'Order History', active: false },
                  { icon: CreditCard, label: 'Payment Methods', active: false },
                  { icon: Settings, label: 'Security', active: false },
                ].map((item) => (
                  <button 
                    key={item.label}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${item.active ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'text-slate-500 hover:bg-luxury-beige/30'}`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-widest font-bold">{item.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${item.active ? 'opacity-100' : 'opacity-30'}`} />
                  </button>
                ))}

                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all mt-8"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Sign Out</span>
                </button>
              </nav>
            </div>

            {/* Support Card */}
            <div className="glass-card !bg-luxury-navy p-8 rounded-[2.5rem] text-white">
              <h3 className="font-serif italic text-lg mb-2">Need Assistance?</h3>
              <p className="text-white/50 text-[10px] uppercase tracking-widest mb-6">Our concierge is available 24/7</p>
              <a href="https://wa.me/254740275625" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-all text-[10px] uppercase tracking-widest font-bold">
                Contact Support
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'text-luxury-blue' },
                { label: 'Active Orders', value: '2', icon: Clock, color: 'text-luxury-gold' },
                { label: 'Completed', value: '10', icon: CheckCircle2, color: 'text-green-500' },
              ].map((stat) => (
                <div key={stat.label} className="glass-card !bg-white p-6 rounded-[2rem] border-luxury-beige/20 shadow-sm flex items-center gap-4">
                  <div className={`p-3 bg-luxury-beige/20 rounded-xl ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{stat.label}</p>
                    <p className="text-2xl font-serif italic text-luxury-black">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Profile Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card !bg-white p-8 md:p-12 rounded-[2.5rem] border-luxury-beige/20 shadow-xl shadow-luxury-blue/5"
            >
              <h2 className="text-2xl font-serif italic text-luxury-black mb-8">Personal Details</h2>
              
              <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-4">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-luxury-blue transition-colors" />
                    <input 
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-luxury-beige/10 rounded-2xl border-transparent focus:border-luxury-blue focus:bg-white focus:ring-0 transition-all text-luxury-black"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-4">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-luxury-blue transition-colors" />
                    <input 
                      type="tel"
                      placeholder="+254..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-luxury-beige/10 rounded-2xl border-transparent focus:border-luxury-blue focus:bg-white focus:ring-0 transition-all text-luxury-black"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-4">Location / City</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-luxury-blue transition-colors" />
                    <input 
                      type="text"
                      placeholder="Nairobi, KE"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-luxury-beige/10 rounded-2xl border-transparent focus:border-luxury-blue focus:bg-white focus:ring-0 transition-all text-luxury-black"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-4">Delivery Address</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-300 group-focus-within:text-luxury-blue transition-colors" />
                    <textarea 
                      rows={3}
                      placeholder="Street name, Apartment, Gate number..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-luxury-beige/10 rounded-2xl border-transparent focus:border-luxury-blue focus:bg-white focus:ring-0 transition-all text-luxury-black resize-none"
                    />
                  </div>
                </div>

                {message && (
                  <div className={`md:col-span-2 text-center p-4 rounded-2xl text-[11px] uppercase tracking-widest font-bold ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {message.text}
                  </div>
                )}

                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-luxury-black text-white px-10 py-4 rounded-2xl font-bold tracking-widest text-[11px] uppercase hover:bg-luxury-blue transition-all disabled:opacity-50 shadow-xl shadow-luxury-black/10"
                  >
                    {loading ? 'Saving Changes...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
