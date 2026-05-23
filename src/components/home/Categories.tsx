import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, User, Mountain, Smile } from 'lucide-react';

const categories = [
  { id: 'wedding', name: 'WEDDINGS', icon: Heart, img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop' },
  { id: 'maternity', name: 'MATERNITY', icon: Sparkles, img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop' },
  { id: 'portraits', name: 'PORTRAITS', icon: User, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop' },
  { id: 'landscapes', name: 'LANDSCAPES', icon: Mountain, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop' },
  { id: 'couples', name: 'COUPLES', icon: Heart, img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop' },
  { id: 'kids', name: 'KIDS', icon: Smile, img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop' },
];

const Categories: React.FC = () => {
  return (
    <section id="categories" className="py-24 sm:py-32 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 text-center mb-16 sm:mb-24">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.5em] font-normal text-amber-500 block mb-3 sm:mb-4">
          WHAT WE DO
        </span>
        <div className="inline-block relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight pb-4">
            Photography for Every Story
          </h2>
          <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-amber-500/80 mx-auto w-1 text-center" style={{ width: '50%' }} />
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-10">
        {/* Responsive layout: Grid on mobile/tablet, expanding flex columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row w-full gap-3 md:gap-4 h-auto lg:h-[600px] overflow-hidden">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden bg-zinc-900 cursor-pointer border border-white/10 rounded-2xl lg:rounded-none aspect-[2/3] lg:aspect-auto lg:h-full lg:flex-1 lg:hover:flex-[1.6] transition-all duration-700 ease-[0.25,1,0.5,1]"
            >
              {/* Background cover image with dark fade gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 z-10 transition-colors duration-500 group-hover:from-black/90" />
              <img
                src={cat.img}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />

              {/* Bottom aligned visual icons & tag name */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8 flex flex-col items-center justify-end text-center h-1/2 gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-md bg-white/5 transition-all duration-500 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:scale-110">
                  <cat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xs sm:text-sm font-sans tracking-[0.25em] font-semibold text-white/90 group-hover:text-amber-400 transition-colors duration-300">
                  {cat.name}
                </h3>
              </div>

              {/* Decorative bottom hover highlight line */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500 z-30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
