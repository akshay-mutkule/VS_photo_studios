import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2069&auto=format&fit=crop',
    title: 'Timeless Stories Told Through Light.',
    sub: 'WEDDING & PORTRAIT ARCHIVE'
  },
  {
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2000&auto=format&fit=crop',
    title: 'Capturing Beautiful Moments Forever.',
    sub: 'BESPOKE DESTINATION PRODUCTIONS'
  },
  {
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop',
    title: 'Luxury Fine-Art Editorial Vision.',
    sub: 'HIGH-END CREATIVE DIRECTION'
  }
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-900 flex items-center justify-center">
      {/* Slides Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 z-0"
        >
          {/* Deluxe Cinematic Shadow Gradient To Blend Text */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/65 via-stone-950/40 to-stone-950/50 z-10" />
          <div className="absolute inset-0 bg-black/25 z-10" />
          <img
            src={slides[current].image}
            alt="Cinematic Portfolio Landmark"
            className="w-full h-full object-cover filtering brightness-95"
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 h-full flex flex-col justify-center items-start">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-3xl text-left space-y-6 sm:space-y-8 pl-0 md:pl-8 lg:pl-12"
        >
          <div className="space-y-3">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.6em] text-white/95 font-bold block mb-1">
              {slides[current].sub}
            </span>
            <div className="h-[1px] w-12 bg-[#B8975A]/80 mb-4" />
            <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.1] font-normal drop-shadow-md">
              Capturing beautiful <br />
              <span className="italic font-light text-stone-100 font-serif">moments forever.</span>
            </h1>
          </div>

          <p className="text-xs sm:text-sm font-light text-stone-200/90 max-w-md leading-relaxed tracking-wide font-sans">
            A premium visual production studio specializing in classic medium-format documentation of royal wedding events and high-fashion catalogs worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <Link to="/portfolio" className="w-full sm:w-auto">
              <Button className="bg-[#B8975A] hover:bg-[#A37E43] text-white border border-[#B8975A] rounded-none h-14 sm:h-16 px-8 sm:px-10 uppercase text-[10px] sm:text-xs tracking-[0.3em] font-bold transition-all duration-300 w-full flex items-center justify-center gap-3">
                VIEW PORTFOLIO
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/booking" className="w-full sm:w-auto">
              <Button className="bg-transparent text-white hover:bg-white/10 hover:text-white border border-white/50 hover:border-white rounded-none h-14 sm:h-16 px-8 sm:px-10 uppercase text-[10px] sm:text-xs tracking-[0.3em] font-bold transition-all duration-300 w-full flex items-center justify-center gap-3">
                <Calendar className="w-4 h-4" />
                BOOK A SHOOT
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
              className={`font-sans text-[10px] lg:text-xs tracking-widest transition-all duration-300 ${
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
      <div className="absolute right-6 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-8 text-white/70">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-pointer">
          <Instagram className="w-4 h-4" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-pointer text-sm font-bold tracking-tighter">
          FB
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-pointer text-sm font-bold tracking-tighter">
          PIN
        </a>
      </div>

      {/* Carousel Dots on Bottom Left */}
      <div className="absolute bottom-10 left-6 sm:left-12 lg:left-16 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full border transition-all duration-300 ${
              current === index ? 'bg-[#B8975A] border-[#B8975A] scale-125' : 'bg-transparent border-white/50 hover:border-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
