import React from 'react';
import { motion } from 'motion/react';
import { Heart, MessageSquare, Share2, ZoomIn, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const photos = [
  { id: 1, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop', tall: true },
  { id: 2, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop', tall: false },
  { id: 3, url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop', tall: true },
  { id: 4, url: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=2000&auto=format&fit=crop', tall: false },
  { id: 5, url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop', tall: true },
  { id: 6, url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop', tall: false },
  { id: 7, url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop', tall: true },
  { id: 8, url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop', tall: false },
];

const PortfolioMasonry: React.FC = () => {
  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20 space-y-4">
          <span className="text-xs uppercase tracking-[0.4em] font-bold text-amber-500">Public Gallery</span>
          <h2 className="text-5xl font-bold text-white tracking-tighter uppercase italic">
            Trending <span className="opacity-30">Captures</span>
          </h2>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden break-inside-avoid rounded-[2rem] border border-white/10 cursor-none"
            >
              <motion.img
                src={photo.url}
                alt="Portfolio"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all"
              />
              
              {/* Overlay with high-end glass effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10 backdrop-blur-[1px]">
                <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  <div className="flex items-center gap-2">
                    <div className="h-[1px] w-8 bg-primary" />
                    <p className="text-[9px] uppercase font-bold text-primary tracking-[0.4em]">Cinematic Masterpiece</p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <h4 className="text-2xl font-serif italic text-white tracking-tight">Ethereal Moments</h4>
                      <p className="text-[10px] uppercase font-medium text-white/40 tracking-[0.2em]">Archival Print / 2026</p>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button size="icon" variant="ghost" className="h-12 w-12 text-white glass border-white/10 hover:bg-white/10 rounded-full">
                        <ZoomIn className="w-5 h-5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-12 w-12 text-white glass border-white/10 hover:bg-white/10 rounded-full">
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Floating Action Button - WhatsApp */}
      <motion.div 
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        className="fixed bottom-12 right-12 z-40"
      >
        <a href="https://wa.me/919075910381" target="_blank" rel="noopener noreferrer">
          <Button className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl flex items-center justify-center p-0 group">
            <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
            <span className="absolute right-full mr-4 bg-black/80 text-white text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              WhatsApp Concierge
            </span>
          </Button>
        </a>
      </motion.div>
    </section>
  );
};

export default PortfolioMasonry;
