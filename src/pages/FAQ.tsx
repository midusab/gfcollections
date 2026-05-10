import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "Do you deliver countrywide within Kenya?",
        a: "Yes, we offer countrywide delivery. Orders within Kakamega are delivered within the same day, while deliveries to other towns take 24-48 hours via our trusted courier partners."
      },
      {
        q: "How can I place an order via WhatsApp?",
        a: "Simply click the WhatsApp icon on our website or any product page. This will open a direct chat with our team where you can send the product name or screenshot to complete your purchase."
      },
      {
        q: "What are your delivery charges?",
        a: "Delivery within Kakamega CBD is free. Charges for other areas vary depending on the distance and the courier service selected. We'll provide a quote during checkout."
      }
    ]
  },
  {
    category: "Sizing & Quality",
    questions: [
      {
        q: "How do I know my correct size?",
        a: "We provide a detailed size guide on each product page. Most of our dresses are designed with flexible premium fabrics (like stretchy crepe or spandex) to ensure a perfect fit for various body types."
      },
      {
        q: "Are your materials durable?",
        a: "Absolutely. At GF Collection, we pride ourselves on 'Affordable Luxury'. We hand-pick premium fabrics that are not only stylish but also durable and easy to maintain."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "Can I exchange a dress if it doesn't fit?",
        a: "Yes, we accept exchanges within 48 hours of delivery, provided the garment is in its original condition, unworn, and with all tags attached."
      },
      {
        q: "What is your refund policy?",
        a: "We currently offer exchanges or store credit for returns. Direct refunds are handled on a case-by-case basis if a product is found to have a manufacturing defect."
      }
    ]
  }
];

interface FAQItemProps {
  q: string;
  a: string;
  key?: any;
}

function FAQItem({ q, a }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-luxury-beige last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg font-serif italic transition-colors ${isOpen ? 'text-luxury-blue' : 'text-luxury-black group-hover:text-luxury-gold'}`}>
          {q}
        </span>
        <ChevronDown className={`w-5 h-5 text-luxury-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-luxury-black/60 leading-relaxed font-light">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="pt-32 pb-24 bg-luxury-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <header className="mb-20 text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-luxury-beige rounded-full flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-luxury-gold" />
            </div>
          </div>
          <p className="text-luxury-gold uppercase tracking-[0.4em] text-[12px] font-bold">Client Support</p>
          <h1 className="text-5xl md:text-7xl font-serif text-luxury-black italic">Frequent Questions</h1>
          <div className="w-24 h-[1px] bg-luxury-gold mx-auto mt-8" />
        </header>

        <div className="space-y-16">
          {faqs.map((section, idx) => (
            <motion.div 
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-blue mb-8 border-b border-luxury-blue/10 pb-4">
                {section.category}
              </h3>
              <div className="bg-white px-8 rounded-sm luxury-shadow">
                {section.questions.map((faq, fIdx) => (
                  <FAQItem key={fIdx} q={faq.q} a={faq.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-luxury-black text-center space-y-6 rounded-sm">
          <h4 className="text-white text-2xl font-serif italic">Still have a question?</h4>
          <p className="text-white/40 text-sm font-light">Our style specialists are available daily to assist you with any inquiries.</p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-6">
            <a 
              href="https://wa.me/254740275625" 
              className="bg-luxury-gold text-white px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-luxury-black transition-all"
            >
              Chat on WhatsApp
            </a>
            <a 
              href="/contact" 
              className="border border-white/20 text-white px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-luxury-black transition-all"
            >
              Contact Form
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
