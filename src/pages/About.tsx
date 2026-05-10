import { motion } from 'motion/react';
import { Gem, Star, UserCheck, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-40 pb-32 bg-luxury-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <header className="mb-32 text-center space-y-6">
          <p className="text-luxury-gold uppercase tracking-[0.4em] text-[11px] font-bold">The heritage</p>
          <h1 className="text-6xl md:text-[84px] font-serif text-luxury-navy italic leading-[0.95] font-bold">The Power House <br /> of Fashion</h1>
          <div className="w-32 h-[1px] bg-luxury-gold mx-auto mt-12" />
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(10,25,49,0.35)] transition-transform duration-700 group-hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1550630982-7773db815b3a?q=80&w=1000" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-luxury-blue/5 rounded-full blur-3xl -z-10 animate-pulse" />
          </motion.div>
          <div className="space-y-10 group">
            <h2 className="text-4xl md:text-6xl font-serif italic text-luxury-navy leading-tight">Redefining Elegance for the <span className="text-luxury-gold">Modern Woman</span></h2>
            <p className="text-luxury-navy/60 font-light leading-relaxed text-xl italic">
              "Established in Kakamega, GF Collection began with a mission to empower through sophisticated fashion."
            </p>
            <p className="text-luxury-navy/70 font-light leading-loose text-lg">
              We specialize in premium curation that speaks of status and timeless beauty. From high-stakes office sets to intimate dinner wear, every piece is a testament to our dedication to excellence.
            </p>
            <div className="grid grid-cols-2 gap-10 pt-10 border-t border-luxury-ice">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-luxury-ice/30 rounded-2xl flex items-center justify-center">
                  <Gem className="w-5 h-5 text-luxury-blue" />
                </div>
                <h6 className="text-[11px] uppercase font-bold tracking-[0.2em] text-luxury-navy">Quality first</h6>
                <p className="text-[13px] text-luxury-navy/40 font-light">Handpicked fabrics from the finest sources globally.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-luxury-pink/30 rounded-2xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-luxury-navy" />
                </div>
                <h6 className="text-[11px] uppercase font-bold tracking-[0.2em] text-luxury-navy">Trend setting</h6>
                <p className="text-[13px] text-luxury-navy/40 font-light">Classic silhouettes with a contemporary edge.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mb-40 overflow-hidden rounded-[3rem]">
           <div className="absolute inset-0 bg-luxury-navy">
              <img src="https://images.unsplash.com/photo-1539109132382-361a57053099?q=80&w=2000" className="w-full h-full object-cover opacity-20" referrerPolicy="no-referrer" />
           </div>
           <div className="relative z-10 p-16 md:p-32 text-center space-y-12">
            <div className="max-w-3xl mx-auto space-y-10">
              <p className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-bold">The commitment</p>
              <h3 className="text-4xl md:text-6xl font-serif italic text-white leading-tight">"We believe that every woman deserves to feel like a Power House."</h3>
              <div className="w-16 h-[1px] bg-luxury-gold mx-auto" />
              <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/60">The GF Collective Team</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center pb-20">
          {[
            { icon: ShieldCheck, title: "Authenticity", text: "Verified original GF curated designs.", color: "bg-luxury-ice/20 text-luxury-blue" },
            { icon: UserCheck, title: "Personalized", text: "Styling advice for your unique persona.", color: "bg-luxury-gold/5 text-luxury-gold" },
            { icon: Star, title: "Premium", text: "Global standards accessible everywhere.", color: "bg-luxury-pink/20 text-luxury-navy" },
            { icon: Gem, title: "Timeless", text: "Durable fashion that outlasts seasons.", color: "bg-luxury-ice/40 text-luxury-navy" }
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="space-y-6 p-10 rounded-[2rem] hover:bg-white hover:shadow-2xl transition-all duration-500 group"
            >
              <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon className="w-7 h-7" />
              </div>
              <h5 className="text-[12px] uppercase font-bold tracking-[0.3em] text-luxury-navy">{item.title}</h5>
              <p className="text-[13px] text-luxury-navy/40 font-light leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
