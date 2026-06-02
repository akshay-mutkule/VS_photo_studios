import React from 'react';
import { motion } from 'motion/react';
import { Camera, Eye, Zap, Compass, Award } from 'lucide-react';

const equipment = [
  { category: 'Cameras', items: ['Fujifilm GFX 100S Medium Format', 'Sony Alpha 1'] },
  { category: 'Prime Lenses', items: ['Fujinon GF 80mm f/1.7 R WR', 'Sony FE 50mm f/1.2 GM', 'Sony FE 85mm f/1.4 GM'] },
  { category: 'Lighting & Grip', items: ['Profoto B10X Plus High-Speed Studio Flash', 'Elinchrom Octaboxes', 'Premium Softboxes'] },
];

const btsImages = [
  'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FCFAF6] text-[#1A1815] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        
        {/* Editorial Heading */}
        <div className="space-y-4 mb-16 sm:mb-20">
          <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#A37E43]">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.1] text-zinc-900">
            About the <span className="italic text-[#A37E43]">Artist</span>
          </h1>
          <p className="max-w-xl text-zinc-500 font-light text-xs sm:text-sm md:text-base leading-relaxed mt-4">
            A simple welcome to our photography world, our story, our cameras, and how we capture beautiful memories for you.
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 space-y-6 sm:space-y-8"
          >
            <div className="relative overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?q=80&w=800&auto=format&fit=crop"
                alt="Photographer Portrait"
                className="w-full h-auto aspect-[3/4] object-cover filter saturate-50 hover:saturate-100 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/10 mix-blend-overlay" />
            </div>
            
            <div className="bg-[#FAF8F4] p-6 sm:p-8 border border-[#A37E43]/10">
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#A37E43] mb-4">Studio Principles</h3>
              <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed font-light">
                Every person has a beautiful story to tell. For us, photography is about creating a friendly bond of trust, playing with natural light, and capturing your genuine smiles.
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-7 space-y-8 sm:space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-zinc-900 leading-tight">
                “Capturing happy emotions with natural light is my passion.”
              </h2>
              <div className="h-[1px] w-20 bg-[#A37E43]/40" />
              <p className="text-zinc-600 font-light leading-relaxed text-xs sm:text-sm md:text-base">
                For over ten years, we have traveled across India and abroad capturing beautiful moments for gorgeous weddings, pre-wedding functions, and family celebrations. Operating from our comfortable studio, we make timeless films and photographs that you and your family can cherish forever.
              </p>
              <p className="text-zinc-600 font-light leading-relaxed text-xs sm:text-sm md:text-base">
                Our style focuses on natural candid moments mixed with soft cinematic light. This makes every picture look fresh and lively today, and keeps your memories sweet forever.
              </p>
            </div>

            {/* Core Values / Pillar List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Compass className="w-5 h-5 text-[#A37E43]" />
                  <h4 className="text-xs uppercase tracking-widest font-bold">Our Honest Vision</h4>
                </div>
                <p className="text-zinc-500 text-xs font-light leading-relaxed">
                  We carefully plan every photo shoot to suit your personal style, comfort, and functions elegantly.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#A37E43]" />
                  <h4 className="text-xs uppercase tracking-widest font-bold">High Quality Standards</h4>
                </div>
                <p className="text-zinc-500 text-xs font-light leading-relaxed">
                  Loved by family clients and couples alike for our highly natural candid photographs and professional service.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment & Gear Showcase */}
        <div className="border-t border-[#A37E43]/10 pt-16 sm:pt-24 mb-20 sm:mb-28">
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <h3 className="text-xs uppercase tracking-[0.4em] text-[#A37E43] font-bold">OUR CAMERAS & LENSES</h3>
            <h2 className="text-2xl sm:text-4xl font-serif text-zinc-900">Equipment Showcase</h2>
            <p className="text-zinc-500 max-w-md mx-auto text-xs font-light px-4">
              We use professional high-end cameras and top-quality lenses to make your photo memories look crisp, colorful, and beautiful.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {equipment.map((eq, i) => (
              <div key={i} className="bg-white p-6 sm:p-8 border border-[#A37E43]/10 flex flex-col justify-between hover:shadow-md transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-[#FCFAF6] border border-[#A37E43]/15 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-[#A37E43]" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-800 uppercase flex items-center gap-2">
                    {eq.category}
                  </h4>
                  <ul className="space-y-2 pt-2">
                    {eq.items.map((item, idx) => (
                      <li key={idx} className="text-[11px] sm:text-xs text-zinc-500 list-inside list-disc">
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
        <div className="border-t border-[#A37E43]/10 pt-16 sm:pt-24">
          <div className="space-y-3 mb-10 sm:mb-12 text-center sm:text-left">
            <h3 className="text-xs uppercase tracking-[0.4em] text-[#A37E43] font-bold">BEHIND THE SCENES</h3>
            <h2 className="text-2xl sm:text-3xl font-serif text-zinc-900">The Studio Atmosphere</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {btsImages.map((src, i) => (
              <div key={i} className="relative overflow-hidden aspect-[4/3] group bg-stone-100 border border-[#A37E43]/10">
                <img
                  src={src}
                  alt={`Behind the scenes ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0 opacity-80 hover:opacity-100"
                  referrerPolicy="no-referrer"
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
