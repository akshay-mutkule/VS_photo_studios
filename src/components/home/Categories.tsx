import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, User, Mountain, Smile } from 'lucide-react';

const categories = [
  { id: 'wedding', name: 'ROYAL WEDDINGS', icon: Heart, img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop' },
  { id: 'maternity', name: 'MATERNITY HEIRLOOMS', icon: Sparkles, img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop' },
  { id: 'portraits', name: 'EDITORIAL PORTRAITS', icon: User, img: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=800&auto=format&fit=crop' },
  { id: 'landscapes', name: 'HERITAGE LANDSCAPES', icon: Mountain, img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop' },
  { id: 'couples', name: 'LOVE CHRONICLES', icon: Heart, img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop' },
  { id: 'kids', name: 'LITTLE ONES', icon: Smile, img: 'https://images.unsplash.com/photo-1614945419451-9f9394bf7eb1?q=80&w=800&auto=format&fit=crop' },
];

const Categories: React.FC = () => {
  return (
    <section id="categories" className="py-24 sm:py-32 bg-[#FCF8F2] overflow-hidden border-t border-[#F04E23]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 text-center mb-16 sm:mb-24 animate-fade-in">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.5em] font-bold text-[#F04E23] block mb-3 sm:mb-4">
          ARTISTIC VISION • PORTFOLIO CATALOG
        </span>
        <div className="inline-block relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-zinc-900 tracking-tight pb-4">
            Framing Every Maratha Story
          </h2>
          <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-[#F04E23] to-[#FFC20E] mx-auto w-16 text-center" />
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-10">
        {/* Responsive layout: Grid on mobile/tablet, expanding flex columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row w-full gap-3 md:gap-4 h-auto lg:h-[550px] overflow-hidden">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden bg-zinc-150 cursor-pointer border border-[#F04E23]/10 rounded-none aspect-[2/3] lg:aspect-auto lg:h-full lg:flex-1 lg:hover:flex-[1.5] transition-all duration-700 ease-[0.25,1,0.5,1]"
            >
              {/* Background cover image with soft dark gradient to keep text readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10 transition-colors duration-500 group-hover:from-black/95" />
              <img
                src={cat.img}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100 filter brightness-95"
                referrerPolicy="no-referrer"
              />

              {/* Bottom aligned visual icons & tag name */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8 flex flex-col items-center justify-end text-center h-1/2 gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-white/5 transition-all duration-500 group-hover:bg-[#F04E23] group-hover:border-[#FFC20E] group-hover:scale-115">
                  <cat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-colors duration-300" />
                </div>
                <h3 className="text-[10px] sm:text-xs font-serif tracking-[0.2em] font-semibold text-white/95 group-hover:text-[#FFC20E] transition-colors duration-300">
                  {cat.name}
                </h3>
              </div>

              {/* Decorative bottom hover highlight line */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F04E23] to-[#FFC20E] scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500 z-30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
