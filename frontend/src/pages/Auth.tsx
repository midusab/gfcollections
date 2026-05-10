import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, MapPin, ArrowRight, Loader2, Sparkles, Eye, EyeOff } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [locationStr, setLocationStr] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Password validation
      const passwordRegex = /.{8,}/;
      if (!passwordRegex.test(password)) {
        throw new Error('Password must be at least 8 characters long.');
      }

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/account');
      } else {
        const { data, error } = await supabase.auth.signUp({
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
        if (error) throw error;
        
        if (data?.session) {
          navigate('/account');
        } else {
          setIsLogin(true);
          setError('Account created! Please sign in.');
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-white pt-32 pb-20 px-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-blue/10 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-luxury-blue" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-blue">
              Welcome to the House
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif italic text-luxury-black mb-4"
          >
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm font-light tracking-wide"
          >
            {isLogin 
              ? 'Access your private wardrobe and track your luxury orders.' 
              : 'Join the exclusive world of GF Collections.'}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card !bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-luxury-blue/5 border-luxury-beige/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="register-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-4">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-luxury-blue transition-colors" />
                        <input 
                          required
                          type="text"
                          placeholder="Jane Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-12 pr-6 py-4 bg-luxury-beige/20 rounded-2xl border-transparent focus:border-luxury-blue focus:bg-white focus:ring-0 transition-all placeholder:text-slate-300 text-luxury-black"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-4">Phone Number</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-luxury-blue transition-colors" />
                        <input 
                          required
                          type="tel"
                          placeholder="+254..."
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-12 pr-6 py-4 bg-luxury-beige/20 rounded-2xl border-transparent focus:border-luxury-blue focus:bg-white focus:ring-0 transition-all placeholder:text-slate-300 text-luxury-black"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-4">Location</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-luxury-blue transition-colors" />
                      <input 
                        required
                        type="text"
                        placeholder="Nairobi, Kakamega..."
                        value={locationStr}
                        onChange={(e) => setLocationStr(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-luxury-beige/20 rounded-2xl border-transparent focus:border-luxury-blue focus:bg-white focus:ring-0 transition-all placeholder:text-slate-300 text-luxury-black"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-4">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-luxury-blue transition-colors" />
                <input 
                  required
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-luxury-beige/20 rounded-2xl border-transparent focus:border-luxury-blue focus:bg-white focus:ring-0 transition-all placeholder:text-slate-300 text-luxury-black"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-4">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-luxury-blue transition-colors" />
                <input 
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-luxury-beige/20 rounded-2xl border-transparent focus:border-luxury-blue focus:bg-white focus:ring-0 transition-all placeholder:text-slate-300 text-luxury-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-luxury-blue transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-[9px] text-slate-400 ml-4 italic">Minimum 8 characters required</p>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-xs text-center font-medium ${error.includes('Success') ? 'text-green-500' : 'text-red-500'}`}
              >
                {error}
              </motion.p>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-luxury-blue hover:bg-luxury-navy text-white py-4 rounded-2xl font-bold tracking-widest text-[11px] uppercase transition-all flex items-center justify-center gap-3 shadow-xl shadow-luxury-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-luxury-blue transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
