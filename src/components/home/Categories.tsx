import React from 'react';
import { motion } from 'motion/react';
import { Camera, Heart, Users, ShoppingBag, Radio, Music, Image as LucideImage, Scissors } from 'lucide-react';

const categories = [
  { id: 'wedding', name: 'Wedding', count: 120, icon: Heart, img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop' },
  { id: 'fashion', name: 'Fashion', count: 85, icon: ShoppingBag, img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop' },
  { id: 'portraits', name: 'Portraits', count: 210, icon: Users, icon2: LucideImage, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop' },
  { id: 'cinematic', name: 'Cinematic', count: 45, icon: Radio, img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2050&auto=format&fit=crop' },
  { id: 'drone', name: 'Drone', count: 30, icon: Camera, img: 'https://images.unsplash.com/photo-1473968512447-ac175bb4d739?q=80&w=2070&auto=format&fit=crop' },
  { id: 'products', name: 'Products', count: 95, icon: LucideImage, img: 'https://images.unsplash.com/photo-1505740420928-5e550ce587ff?q=80&w=2070&auto=format&fit=crop' },
];

const Categories: React.FC = () => {
  return (
    <section id="categories" className="py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-amber-500">Excellence in every frame</h2>
            <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tighter uppercase italic leading-none">
              Bento <span className="opacity-40">Categories</span>
            </h3>
          </div>
          <p className="text-zinc-500 max-w-sm text-sm font-medium leading-relaxed">
            Specializing in diverse genres of visual storytelling. Each category is a dedicated craft at our studio.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative group overflow-hidden bg-zinc-900 aspect-square md:aspect-video cursor-pointer border border-white/10 glass rounded-2xl`}
            >
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors z-10" />
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
              />
              
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/5 transition-transform group-hover:rotate-12">
                    <cat.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-mono text-white/40 group-hover:text-primary transition-colors">0{i + 1}</span>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-2xl md:text-3xl font-serif italic text-white tracking-tight">{cat.name}</h4>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">{cat.count}+ Projects</p>
                </div>
              </div>

              {/* Hover Overlay Detail */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
