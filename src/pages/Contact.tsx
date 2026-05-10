import { motion } from 'motion/react';
import { 
  Heart, 
  Eye, 
  MapPin, 
  Clock, 
  Phone, 
  Mail,
  Send
} from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 bg-luxury-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <header className="mb-20 text-center space-y-4">
          <p className="text-luxury-gold uppercase tracking-[0.4em] text-[12px] font-bold">Get In Touch</p>
          <h1 className="text-5xl md:text-7xl font-serif text-luxury-black italic">Contact Us</h1>
          <div className="w-24 h-[1px] bg-luxury-gold mx-auto mt-8" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div className="space-y-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h3 className="text-3xl font-serif italic text-luxury-black">Our Flagship Boutique</h3>
              <p className="text-luxury-black/60 font-light leading-relaxed max-w-md">
                Visit us in the heart of Kakamega for a personalized styling experience. Our specialists are ready to help you find your perfect fit.
              </p>
              
              <div className="space-y-8 pt-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-luxury-beige rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <div>
                    <h6 className="text-[10px] uppercase font-bold tracking-[0.2em] mb-2">Location</h6>
                    <p className="text-sm text-luxury-black/60">Kakamega Town, Near MMUST Main Gate, Western Kenya</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-luxury-beige rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <div>
                    <h6 className="text-[10px] uppercase font-bold tracking-[0.2em] mb-2">Hours</h6>
                    <p className="text-sm text-luxury-black/60">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p className="text-sm text-luxury-black/60">Sun: 12:00 PM - 5:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-luxury-beige rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <div>
                    <h6 className="text-[10px] uppercase font-bold tracking-[0.2em] mb-2">Direct Line</h6>
                    <p className="text-sm text-luxury-black/60">+254 740 275 625</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-luxury-beige rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <div>
                    <h6 className="text-[10px] uppercase font-bold tracking-[0.2em] mb-2">Inquiries</h6>
                    <p className="text-sm text-luxury-black/60">info@gfcollection.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-12 luxury-shadow rounded-sm"
          >
            <h4 className="text-2xl font-serif italic text-luxury-black mb-8">Send a Message</h4>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-luxury-black/40 ml-1">Name</label>
                  <input type="text" className="w-full bg-luxury-beige/30 border border-transparent focus:border-luxury-gold p-4 outline-none transition-all rounded-sm text-sm" placeholder="Your Full Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-luxury-black/40 ml-1">Email</label>
                  <input type="email" className="w-full bg-luxury-beige/30 border border-transparent focus:border-luxury-gold p-4 outline-none transition-all rounded-sm text-sm" placeholder="Your Email Address" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-luxury-black/40 ml-1">Subject</label>
                <select className="w-full bg-luxury-beige/30 border border-transparent focus:border-luxury-gold p-4 outline-none transition-all rounded-sm text-sm appearance-none">
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Styling Appointment</option>
                  <option>Wholesale</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-luxury-black/40 ml-1">Message</label>
                <textarea rows={6} className="w-full bg-luxury-beige/30 border border-transparent focus:border-luxury-gold p-4 outline-none transition-all rounded-sm text-sm resize-none" placeholder="How can we help you elegantly?"></textarea>
              </div>
              <button className="w-full bg-luxury-blue text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-black transition-all flex items-center justify-center gap-3">
                <Send className="w-4 h-4" />
                Dispatch Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
