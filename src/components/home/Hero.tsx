import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2069&auto=format&fit=crop',
    title: 'Timeless Moments, Beautifully.',
    desc: "Photography for the moments you'll cherish forever."
  },
  {
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2020&auto=format&fit=crop',
    title: 'Avant-Garde Editorial Fashion.',
    desc: 'Basing editorial visions on cinematic environments and bold styling.'
  },
  {
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1974&auto=format&fit=crop',
    title: 'Timeless Fine-Art Portraits.',
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
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Slides Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={slides[current].image}
            alt="Cinematic Portfolio Background"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 h-full flex flex-col justify-center items-start">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-2xl text-left space-y-6 sm:space-y-8 pl-0 md:pl-12 lg:pl-16"
        >
          <div className="space-y-2">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-white/80 font-bold block mb-2 sm:mb-4">
              WE CAPTURE
            </span>
            <h1 className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.1] font-medium drop-shadow-sm">
              {slides[current].title}
            </h1>
          </div>

          <p className="text-sm sm:text-base font-light text-white/80 max-w-md leading-relaxed">
            {slides[current].desc}
          </p>

          <div>
            <Link to="/portfolio">
              <Button className="bg-white text-black hover:bg-zinc-200 rounded-none h-14 sm:h-16 px-8 sm:px-10 uppercase text-[10px] sm:text-xs tracking-[0.4em] font-bold transition-all duration-300 shadow-xl flex items-center gap-3">
                EXPLORE GALLERIES
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators on Left Margin */}
      <div className="absolute left-6 sm:left-10 lg:left-16 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-6">
        {slides.map((_, index) => (
          <React.Fragment key={index}>
            <button
              onClick={() => setCurrent(index)}
              className={`font-mono text-[10px] lg:text-xs tracking-widest transition-all duration-300 ${
                current === index ? 'text-white font-bold opacity-100 scale-110' : 'text-white/40 hover:text-white opacity-60'
              }`}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
            {index < slides.length - 1 && (
              <div className="relative w-[1px] h-12 bg-white/20">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: current === index ? '100%' : '0%' }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-0 left-0 w-full bg-white"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Social Icons on Right Margin */}
      <div className="absolute right-6 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-8 text-white/60">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-pointer">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-pointer">
          <Facebook className="w-5 h-5" />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-pointer text-sm font-bold tracking-tighter">
          TikTok
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-pointer text-sm font-bold tracking-tighter">
          Pin
        </a>
      </div>

      {/* Carousel Dots on Bottom Left */}
      <div className="absolute bottom-10 left-6 sm:left-12 lg:left-16 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full border transition-all duration-300 ${
              current === index ? 'bg-white border-white scale-125' : 'bg-transparent border-white/40 hover:border-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
