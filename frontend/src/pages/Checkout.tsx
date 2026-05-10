import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  User, 
  ChevronRight, 
  CheckCircle2, 
  CreditCard, 
  MessageCircle,
  ArrowLeft,
  Loader2,
  ShieldCheck
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'whatsapp' | null>(null);

  // Form States
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    phone: profile?.phone || '',
    email: profile?.email || user?.email || '',
    address: profile?.delivery_address || '',
    location: profile?.location || '',
    notes: ''
  });

  const subtotal = cart.reduce((acc, item) => acc + (parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity), 0);
  const deliveryFee = 350;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!paymentMethod) return;
    setLoading(true);
    
    try {
      // 1. Create Order
      const orderNumber = `GF-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user?.id,
          order_number: orderNumber,
          total_amount: total,
          delivery_details: formData,
          status: 'received'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create Order Items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: parseFloat(item.price.replace(/[^\d.]/g, '')),
        size: item.size
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Create Payment Entry
      const { error: paymentError } = await supabase
        .from('payments')
        .insert([{
          order_id: order.id,
          method: paymentMethod === 'mpesa' ? 'mpesa' : 'whatsapp_confirmation',
          amount: total,
          status: 'pending'
        }]);

      if (paymentError) throw paymentError;

      // 4. Handle Post-Order Logic
      if (paymentMethod === 'whatsapp') {
        const message = `New Order: ${orderNumber}\nTotal: Ksh ${total.toLocaleString()}\nCustomer: ${formData.fullName}\nPhone: ${formData.phone}`;
        window.open(`https://wa.me/254740275625?text=${encodeURIComponent(message)}`, '_blank');
      }

      clearCart();
      setStep(3); // Success step
      toast.success('Order placed successfully!');
    } catch (err: any) {
      console.error('Order error:', err);
      toast.error(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartCount === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-luxury-white p-8">
        <div className="w-20 h-20 bg-luxury-beige rounded-none flex items-center justify-center mb-8">
          <ShoppingBag className="w-10 h-10 text-luxury-gold" />
        </div>
        <h2 className="text-3xl font-serif mb-4">Your bag is empty</h2>
        <p className="text-slate-400 mb-10 text-center max-w-md">Discover our latest collections and find your perfect fit before checking out.</p>
        <Link to="/collections" className="bg-luxury-navy text-white px-12 py-5 text-[11px] uppercase tracking-widest font-bold hover:bg-luxury-gold hover:text-luxury-navy transition-all">
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F3] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white transition-colors border border-transparent hover:border-luxury-beige">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-4xl font-serif text-luxury-black italic">Checkout</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= 1 ? 'text-luxury-blue' : 'text-slate-300'}`}>Delivery</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= 2 ? 'text-luxury-blue' : 'text-slate-300'}`}>Payment</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${step === 3 ? 'text-luxury-blue' : 'text-slate-300'}`}>Success</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="delivery"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                  <section className="bg-white p-10 border border-luxury-beige shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-10 bg-luxury-gold/10 text-luxury-gold flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-serif italic">Contact Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Full Name</label>
                        <input 
                          type="text" 
                          value={formData.fullName}
                          onChange={e => setFormData({...formData, fullName: e.target.value})}
                          className="w-full px-4 py-4 bg-[#F8F7F3] border-transparent border-b-luxury-beige border-b-2 focus:border-luxury-blue focus:bg-white outline-none transition-all text-sm"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Phone Number</label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-4 bg-[#F8F7F3] border-transparent border-b-luxury-beige border-b-2 focus:border-luxury-blue focus:bg-white outline-none transition-all text-sm"
                          placeholder="07XX XXX XXX"
                        />
                      </div>
                    </div>
                  </section>

                  <section className="bg-white p-10 border border-luxury-beige shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-10 bg-luxury-blue/10 text-luxury-blue flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-serif italic">Delivery Details</h3>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Location (Town/City)</label>
                        <input 
                          type="text" 
                          value={formData.location}
                          onChange={e => setFormData({...formData, location: e.target.value})}
                          className="w-full px-4 py-4 bg-[#F8F7F3] border-transparent border-b-luxury-beige border-b-2 focus:border-luxury-blue focus:bg-white outline-none transition-all text-sm"
                          placeholder="Nairobi, Westlands"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Detailed Address</label>
                        <textarea 
                          rows={3}
                          value={formData.address}
                          onChange={e => setFormData({...formData, address: e.target.value})}
                          className="w-full px-4 py-4 bg-[#F8F7F3] border-transparent border-b-luxury-beige border-b-2 focus:border-luxury-blue focus:bg-white outline-none transition-all text-sm resize-none"
                          placeholder="Street name, Building, Apartment number..."
                        />
                      </div>
                    </div>
                  </section>

                  <button 
                    onClick={() => setStep(2)}
                    className="w-full bg-luxury-navy text-white py-6 text-[11px] uppercase tracking-widest font-bold hover:bg-luxury-gold hover:text-luxury-navy transition-all flex items-center justify-center gap-4 shadow-xl shadow-luxury-navy/10"
                  >
                    Continue to Payment
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <section className="bg-white p-10 border border-luxury-beige shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-10 bg-green-50 text-green-600 flex items-center justify-center">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-serif italic">Payment Method</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <button 
                        onClick={() => setPaymentMethod('mpesa')}
                        className={`p-8 border-2 flex flex-col items-center gap-4 transition-all group ${paymentMethod === 'mpesa' ? 'border-luxury-blue bg-luxury-blue/5' : 'border-luxury-beige hover:border-luxury-blue/30'}`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${paymentMethod === 'mpesa' ? 'bg-luxury-blue text-white' : 'bg-luxury-beige text-slate-400 group-hover:bg-luxury-blue/10 group-hover:text-luxury-blue'}`}>
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <span className="font-bold tracking-widest text-[11px] uppercase">M-Pesa Express</span>
                        <p className="text-[10px] text-slate-400 text-center">Receive a prompt on your phone to pay instantly.</p>
                      </button>

                      <button 
                        onClick={() => setPaymentMethod('whatsapp')}
                        className={`p-8 border-2 flex flex-col items-center gap-4 transition-all group ${paymentMethod === 'whatsapp' ? 'border-[#25D366] bg-[#25D366]/5' : 'border-luxury-beige hover:border-[#25D366]/30'}`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${paymentMethod === 'whatsapp' ? 'bg-[#25D366] text-white' : 'bg-luxury-beige text-slate-400 group-hover:bg-[#25D366]/10 group-hover:text-[#25D366]'}`}>
                          <MessageCircle className="w-6 h-6" />
                        </div>
                        <span className="font-bold tracking-widest text-[11px] uppercase">WhatsApp Confirmation</span>
                        <p className="text-[10px] text-slate-400 text-center">Confirm order and share receipt via WhatsApp.</p>
                      </button>
                    </div>
                  </section>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => setStep(1)}
                      className="flex-none px-10 py-6 border border-luxury-beige text-[11px] uppercase tracking-widest font-bold hover:bg-white transition-all"
                    >
                      Back
                    </button>
                    <button 
                      disabled={!paymentMethod || loading}
                      onClick={handlePlaceOrder}
                      className="flex-1 bg-luxury-navy text-white py-6 text-[11px] uppercase tracking-widest font-bold hover:bg-luxury-gold hover:text-luxury-navy transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-xl shadow-luxury-navy/10"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                      Complete Order • Ksh {total.toLocaleString()}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-16 border border-luxury-beige shadow-2xl text-center space-y-8"
                >
                  <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-serif italic mb-4 text-luxury-black">Order Received</h2>
                    <p className="text-slate-400 max-w-md mx-auto">Your style journey has begun! We've received your order and our curators are already preparing your collection.</p>
                  </div>
                  <div className="pt-8 flex flex-col gap-4 max-w-xs mx-auto">
                    <Link to="/account" className="bg-luxury-navy text-white py-5 text-[10px] uppercase tracking-widest font-bold hover:bg-luxury-gold hover:text-luxury-navy transition-all">
                      Track My Order
                    </Link>
                    <Link to="/" className="text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-luxury-blue transition-colors">
                      Back to Home
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar: Order Summary */}
          {step !== 3 && (
            <div className="lg:col-span-5">
              <aside className="bg-white border border-luxury-beige shadow-sm sticky top-32">
                <div className="p-8 border-b border-luxury-beige flex justify-between items-center bg-[#F8F7F3]">
                  <h3 className="text-xl font-serif italic">Your Bag</h3>
                  <span className="text-[10px] bg-luxury-blue text-white px-3 py-1 font-bold">{cartCount} items</span>
                </div>
                
                <div className="max-h-[400px] overflow-y-auto p-8 space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-6">
                      <div className="w-20 h-28 bg-luxury-beige overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold mb-1">In your bag</p>
                        <h4 className="text-sm font-bold text-luxury-black mb-1">{item.name}</h4>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Size: {item.size || 'M'} • Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-luxury-blue mt-4">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-8 bg-[#F8F7F3] space-y-4">
                  <div className="flex justify-between text-[11px] uppercase tracking-widest text-slate-400">
                    <span>Subtotal</span>
                    <span>Ksh {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px] uppercase tracking-widest text-slate-400">
                    <span>Delivery</span>
                    <span>Ksh {deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="pt-4 border-t border-luxury-beige flex justify-between items-center">
                    <span className="text-sm font-serif italic text-luxury-black">Total</span>
                    <span className="text-2xl font-serif text-luxury-black">Ksh {total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-6 bg-luxury-navy text-[10px] uppercase tracking-widest font-bold text-white/40 text-center flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 opacity-50" />
                  Secure Luxury Checkout
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
