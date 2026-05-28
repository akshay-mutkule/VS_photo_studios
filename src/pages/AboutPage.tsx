import React from 'react';
import { motion } from 'motion/react';
import { Camera, Eye, Zap, Compass, Award } from 'lucide-react';

const equipment = [
  { category: 'Cameras', items: ['Fujifilm GFX 100S Medium Format', 'Sony Alpha 1'] },
  { category: 'Prime Lenses', items: ['Fujinon GF 80mm f/1.7 R WR', 'Sony FE 50mm f/1.2 GM', 'Sony FE 85mm f/1.4 GM'] },
  { category: 'Lighting & Grip', items: ['Profoto B10X Plus High-Speed Studio Flash', 'Elinchrom Octaboxes', 'Premium Softboxes'] },
];

const btsImages = [
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop',
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FCFAF6] text-[#1A1815] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        
        {/* Editorial Heading */}
        <div className="space-y-4 mb-20">
          <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#A37E43]">
            Creative Statement
          </span>
          <h1 className="text-5xl sm:text-7xl font-serif tracking-tight leading-none text-zinc-900">
            About the <span className="italic text-[#A37E43]">Artist</span>
          </h1>
          <p className="max-w-xl text-zinc-500 font-light text-sm sm:text-base leading-relaxed mt-4">
            A comprehensive overview of our creative methodology, refined technical vision, and studio legacy.
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="relative overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=800&auto=format&fit=crop"
                alt="Photographer Portrait"
                className="w-full h-auto aspect-[3/4] object-cover filter saturate-50 hover:saturate-100 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-stone-900/10 mix-blend-overlay" />
            </div>
            
            <div className="bg-[#FAF8F4] p-8 border border-[#A37E43]/10">
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#A37E43] mb-4">Studio Principles</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-light">
                Every individual is a walking masterpiece. True portraiture is not an act of capture, but an elegant dance of trust, light exploration, and silent storytelling.
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif text-zinc-900">
                “Light is my legacy; raw emotion is my medium.”
              </h2>
              <div className="h-[1px] w-20 bg-[#A37E43]/40" />
              <p className="text-zinc-600 font-light leading-relaxed text-sm sm:text-base">
                For over a decade, we have traveled across continents drafting beautiful moments for royal weddings, lifestyle editorials, and high-fashion directories. Based in a warm, state-of-the-art visual archive, we craft luxury editorial films and photographs that defy typical temporal boundaries.
              </p>
              <p className="text-zinc-600 font-light leading-relaxed text-sm sm:text-base">
                Our distinct method blends contemporary documentary style with beautiful renaissance lighting, producing imagery that feels both fresh today and incredibly nostalgic generations down the road.
              </p>
            </div>

            {/* Core Values / Pillar List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Compass className="w-5 h-5 text-[#A37E43]" />
                  <h4 className="text-xs uppercase tracking-widest font-bold">Uncompromising Vision</h4>
                </div>
                <p className="text-zinc-500 text-xs font-light leading-relaxed">
                  Refined composition processes curated perfectly for the unique aesthetic palette of every esteemed client.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#A37E43]" />
                  <h4 className="text-xs uppercase tracking-widest font-bold">Award-Winning Standard</h4>
                </div>
                <p className="text-zinc-500 text-xs font-light leading-relaxed">
                  Published across major creative fashion catalogs and celebrated globally for our pristine emotional candor.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment & Gear Showcase */}
        <div className="border-t border-[#A37E43]/10 pt-24 mb-28">
          <div className="text-center space-y-3 mb-16">
            <h3 className="text-xs uppercase tracking-[0.4em] text-[#A37E43] font-bold">TECHNICAL PRECISION</h3>
            <h2 className="text-3xl sm:text-4xl font-serif text-zinc-900">Equipment Showcase</h2>
            <p className="text-zinc-500 max-w-md mx-auto text-xs font-light">
              Only the highest caliber medium format sensors and legendary prime optics are trusted to document your timeless treasures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {equipment.map((eq, i) => (
              <div key={i} className="bg-white p-8 border border-[#A37E43]/10 flex flex-col justify-between hover:shadow-md transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-[#FCFAF6] border border-[#A37E43]/15 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-[#A37E43]" />
                  </div>
                  <h4 className="text-sm font-semibold tracking-wide text-zinc-800 uppercase flex items-center gap-2">
                    {eq.category}
                  </h4>
                  <ul className="space-y-2 pt-2">
                    {eq.items.map((item, idx) => (
                      <li key={idx} className="text-xs text-zinc-500 list-inside list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Behind The Scenes */}
        <div className="border-t border-[#A37E43]/10 pt-24">
          <div className="space-y-3 mb-12">
            <h3 className="text-xs uppercase tracking-[0.4em] text-[#A37E43] font-bold">BEHIND THE SCENES</h3>
            <h2 className="text-3xl font-serif text-zinc-900">The Studio Atmosphere</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {btsImages.map((src, i) => (
              <div key={i} className="relative overflow-hidden aspect-[4/3] group bg-stone-100 border border-[#A37E43]/10">
                <img
                  src={src}
                  alt={`Behind the scenes ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0 opacity-80 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
