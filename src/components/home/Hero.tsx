import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
    title: 'Emotional',
    subtitle: 'Weddings',
    desc: 'Capturing the raw emotions of your most precious day with artistic precision.'
  },
  {
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop',
    title: 'Avant-Garde',
    subtitle: 'Fashion',
    desc: 'Basing editorial visions on cinematic environments and bold styling.'
  },
  {
    image: 'https://images.unsplash.com/photo-1581333100576-b73bbe92c2cb?q=80&w=1974&auto=format&fit=crop',
    title: 'Timeless',
    subtitle: 'Portraits',
    desc: 'A classic approach to modern identity through the lens of history.'
  }
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90 z-10" />
          <img
            src={slides[current].image}
            alt={slides[current].subtitle}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-10 flex flex-col justify-center items-start">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">VS Cinematic Archive</span>
          </div>
          
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-[10px] uppercase tracking-[0.6em] text-white/60 mb-6"
            >
              Mastering the art of light
            </motion.p>
          </div>

          <h1 className="text-7xl md:text-[10rem] font-serif italic text-white tracking-tight leading-[0.8] mb-4">
            Capturing <span className="block opacity-30">Moments</span>
          </h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex flex-col gap-2"
          >
            <p className="text-3xl md:text-5xl font-serif italic text-white/80 tracking-tight">
              That Last Forever
            </p>
            <div className="h-[1px] w-full bg-gradient-to-r from-primary/40 to-transparent mt-2" />
          </motion.div>

          <p className="text-sm font-light text-zinc-400 max-w-md leading-relaxed py-8">
            {slides[current].desc}
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            <Link to="/booking">
              <Button className="bg-primary text-black hover:bg-accent rounded-full h-16 px-12 uppercase text-[11px] tracking-[0.3em] font-bold transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                Initialize Session
              </Button>
            </Link>
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-full h-16 px-12 uppercase text-[11px] tracking-[0.3em] font-bold backdrop-blur-md glass">
              Studio Showreel
              <Play className="ml-3 w-4 h-4 fill-white" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-16 right-16 z-20 flex items-center gap-4">
        <div 
          onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/10 text-white transition-all backdrop-blur-sm"
        >
          ←
        </div>
        <div 
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/10 text-white transition-all backdrop-blur-sm"
        >
          →
        </div>
      </div>

      {/* Background Rail Text */}
      <div className="absolute bottom-1/2 right-12 translate-y-1/2 z-10 pointer-events-none hidden lg:block">
        <span className="text-[14rem] font-bold text-white/[0.03] uppercase tracking-tighter mix-blend-overlay rotate-90 origin-center block">
          CINEMATIC
        </span>
      </div>
    </section>
  );
};

export default Hero;
