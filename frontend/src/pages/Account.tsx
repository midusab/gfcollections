import React, { useState, useEffect, FormEvent } from 'react';
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
  CreditCard,
  Camera,
  Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Account() {
  const { user, profile, signOut, refreshProfile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [orderStats, setOrderStats] = useState({ total: 0, active: 0, completed: 0 });

  useEffect(() => {
    if (user) {
      const fetchStats = async () => {
        const { data: orders } = await supabase
          .from('orders')
          .select('status')
          .eq('user_id', user.id);
        
        if (orders) {
          setOrderStats({
            total: orders.length,
            active: orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length,
            completed: orders.filter(o => o.status === 'delivered').length
          });
        }
      };
      fetchStats();
    }
  }, [user]);

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

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id, // Ensure ID is passed for upsert
          full_name: fullName,
          phone: phone,
          location: location,
          delivery_address: address,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      await refreshProfile();
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const [uploading, setUploading] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-avatar.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // 1. Upload to Supabase Storage (Upsert overwrites the old picture)
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // 3. Update Profile in DB (using upsert to guarantee creation if missing)
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({ 
          id: user?.id,
          avatar_url: publicUrl 
        });

      if (updateError) throw updateError;
      await refreshProfile();
      toast.success('Profile picture updated!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload picture.');
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Strict protection: display a luxury loader while verifying session
  if (authLoading) {
    return (
      <div className="min-h-screen bg-luxury-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-luxury-gold animate-spin" />
      </div>
    );
  }

  // If not loading and no user, we don't render anything (the useEffect handles the redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-luxury-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-4">
            <div className="glass-card !bg-white p-8 rounded-none border-luxury-beige/20 shadow-xl shadow-luxury-blue/5">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative group/avatar cursor-pointer">
                  <div className="w-16 h-16 bg-luxury-blue/10 rounded-none flex items-center justify-center text-luxury-blue font-serif italic text-2xl overflow-hidden border-2 border-transparent group-hover/avatar:border-luxury-blue transition-all">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt={fullName} className="w-full h-full object-cover" />
                    ) : (
                      <span>{fullName ? fullName[0] : user?.email?.[0].toUpperCase()}</span>
                    )}
                    
                    <div className="absolute inset-0 bg-luxury-navy/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                      {uploading ? (
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                      ) : (
                        <Camera className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>
                  <input 
                    type="file" 
                    id="avatar-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                  />
                  <label htmlFor="avatar-upload" className="absolute inset-0 cursor-pointer" />
                </div>
                <div>
                  <h2 className="font-serif italic text-xl text-luxury-black truncate w-32">{fullName}</h2>
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
                    className={`w-full flex items-center justify-between p-4 rounded-none transition-all ${item.active ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'text-slate-500 hover:bg-luxury-beige/30'}`}
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
                  className="w-full flex items-center gap-3 p-4 rounded-none text-red-500 hover:bg-red-50 transition-all mt-8"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Sign Out</span>
                </button>
              </nav>
            </div>

            {/* Support Card */}
            <div className="glass-card !bg-luxury-navy p-8 rounded-none text-white">
              <h3 className="font-serif italic text-lg mb-2">Need Assistance?</h3>
              <p className="text-white/50 text-[10px] uppercase tracking-widest mb-6">Our concierge is available 24/7</p>
              <a href="https://wa.me/254740275625" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-none transition-all text-[10px] uppercase tracking-widest font-bold">
                Contact Support
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Total Orders', value: orderStats.total.toString(), icon: ShoppingBag, color: 'text-luxury-blue' },
                { label: 'Active Orders', value: orderStats.active.toString(), icon: Clock, color: 'text-luxury-gold' },
                { label: 'Completed', value: orderStats.completed.toString(), icon: CheckCircle2, color: 'text-green-500' },
              ].map((stat) => (
                <div key={stat.label} className="glass-card !bg-white p-6 rounded-none border-luxury-beige/20 shadow-sm flex items-center gap-4">
                  <div className={`p-3 bg-luxury-beige/20 rounded-none ${stat.color}`}>
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
              className="glass-card !bg-white p-8 md:p-12 rounded-none border-luxury-beige/20 shadow-xl shadow-luxury-blue/5"
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
                      className="w-full pl-12 pr-6 py-4 bg-luxury-beige/10 rounded-none border-transparent focus:border-luxury-blue focus:bg-white focus:ring-0 transition-all text-luxury-black"
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
                      className="w-full pl-12 pr-6 py-4 bg-luxury-beige/10 rounded-none border-transparent focus:border-luxury-blue focus:bg-white focus:ring-0 transition-all text-luxury-black"
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
                      className="w-full pl-12 pr-6 py-4 bg-luxury-beige/10 rounded-none border-transparent focus:border-luxury-blue focus:bg-white focus:ring-0 transition-all text-luxury-black"
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
                      className="w-full pl-12 pr-6 py-4 bg-luxury-beige/10 rounded-none border-transparent focus:border-luxury-blue focus:bg-white focus:ring-0 transition-all text-luxury-black resize-none"
                    />
                  </div>
                </div>



                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-luxury-black text-white px-10 py-4 rounded-none font-bold tracking-widest text-[11px] uppercase hover:bg-luxury-blue transition-all disabled:opacity-50 shadow-xl shadow-luxury-black/10"
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
