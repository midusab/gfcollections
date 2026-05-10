import { useState, useEffect, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Loader2, 
  Sparkles, 
  Eye, 
  EyeOff,
  ShoppingBag,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const { user, loading: authLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [locationStr, setLocationStr] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      navigate('/account');
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        
        toast.success('Welcome back to the House.');
        navigate('/account');
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone: phone,
              location: locationStr,
            },
          },
        });
        
        if (signUpError) throw signUpError;
        
        if (data?.session) {
          toast.success('Your legacy begins. Welcome.');
          navigate('/account');
        } else {
          setIsLogin(true);
          toast.success('Success! Please verify your email or sign in.');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
      {/* Static Background for Stability */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80" 
          alt="Auth Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-luxury-navy/80 backdrop-blur-sm" />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Brand Identity */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-none mb-8">
            <Sparkles className="w-5 h-5 text-luxury-gold" />
            <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/80">The Private House</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif italic text-white mb-4">
            {isLogin ? 'Welcome Back' : 'Join the House'}
          </h1>
          <p className="text-white/40 text-[11px] uppercase tracking-[0.3em] font-bold">
            {isLogin ? 'Access your curated selection' : 'Exclusivity awaits your arrival'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white p-8 md:p-12 rounded-none shadow-2xl border-t-4 border-luxury-blue relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
            <ShoppingBag className="w-full h-full text-luxury-blue rotate-12 translate-x-12 -translate-y-12" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {!isLogin && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 ml-1">Legal Name</label>
                  <div className="relative">
                    <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-blue/40" />
                    <input 
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-transparent border-b border-slate-100 focus:border-luxury-blue outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 ml-1">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-blue/40" />
                      <input 
                        required
                        type="tel"
                        placeholder="+254"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-4 bg-transparent border-b border-slate-100 focus:border-luxury-blue outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 ml-1">City</label>
                    <div className="relative">
                      <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-blue/40" />
                      <input 
                        required
                        type="text"
                        placeholder="Nairobi"
                        value={locationStr}
                        onChange={(e) => setLocationStr(e.target.value)}
                        className="w-full pl-10 pr-4 py-4 bg-transparent border-b border-slate-100 focus:border-luxury-blue outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-blue/40" />
                  <input 
                    required
                    type="email"
                    placeholder="concierge@house.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 bg-transparent border-b border-slate-100 focus:border-luxury-blue outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-blue/40" />
                  <input 
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-4 bg-transparent border-b border-slate-100 focus:border-luxury-blue outline-none transition-all text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-luxury-blue hover:bg-luxury-navy text-white py-5 rounded-none font-bold tracking-[0.4em] text-[11px] uppercase transition-all flex items-center justify-center gap-4"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Enter The House' : 'Create Legacy'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-slate-400 hover:text-luxury-blue transition-colors"
            >
              {isLogin ? "New to the House? Join Us" : "Already a Member? Enter Here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
