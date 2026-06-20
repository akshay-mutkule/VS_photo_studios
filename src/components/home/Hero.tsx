import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MaharashtrianSparks } from './MaharashtrianSparks';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2069&auto=format&fit=crop',
    title: 'The Royal Wedding Sagas',
    tagline: 'Preserving regal heritage and grand Maratha traditions.',
    sub: 'MAJESTIC WEDDING CHRONICLES'
  },
  {
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000&auto=format&fit=crop',
    title: 'Heritage Portraiture',
    tagline: 'Capturing the artistic essence of ancient fortresses.',
    sub: 'EDITORIAL PORTRAITS & EVENTS'
  },
  {
    image: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=2000&auto=format&fit=crop',
    title: 'The Sacred Golden Hour',
    tagline: 'Delivering gold-tinted cinematic medium-format vision.',
    sub: 'HIGH-END FINE-ART ARCHIVES'
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
    <section className="relative h-screen w-full overflow-hidden bg-[#151310] flex items-center justify-center">
      {/* Interactive Festive Marigold Garland Decor on Top of Screen */}
      <div className="absolute top-0 left-0 w-full z-30 pointer-events-none flex justify-between px-4 sm:px-12 opacity-80 h-10 select-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 1 }}
            className="flex flex-col items-center"
          >
            {/* Small marigold zendu flower design */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F58220] border border-[#FFC20E] shadow-sm relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#FFC20E]" />
            </div>
            <div className="w-[1.5px] h-3 bg-[#0F5A1D]" /> {/* leaf thread representation */}
          </motion.div>
        ))}
      </div>

      {/* Sparks component for drifting petals & sparks */}
      <MaharashtrianSparks />

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
          {/* Deluxe Royal Saffron & Charcoal Gradient to accent the frame */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#151310]/90 via-[#151310]/55 to-[#151310]/60 z-10" />
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img
            src={slides[current].image}
            alt="Cinematic Portfolio Landmark"
            className="w-full h-full object-cover filter brightness-90 saturate-[0.85]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Rotating Mandala Graphic behind content */}
      <div className="absolute right-[-10vw] md:right-[5vw] top-[15vh] opacity-[0.08] pointer-events-none z-10 select-none">
        <svg 
          className="w-[20rem] h-[20rem] md:w-[35rem] md:h-[35rem] text-[#FFC20E] royal-mandala" 
          viewBox="0 0 100 100" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.5"
        >
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="38" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="30" />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = (angle * Math.PI) / 180;
            const x2 = 50 + 45 * Math.cos(rad);
            const y2 = 50 + 45 * Math.sin(rad);
            return <line key={i} x1="50" y1="50" x2={x2} y2={y2} />;
          })}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            const rad = (angle * Math.PI) / 180;
            const x = 50 + 38 * Math.cos(rad);
            const y = 50 + 38 * Math.sin(rad);
            return <circle key={i} cx={x} cy={y} r="3" fill="currentColor" fillOpacity="0.3" />;
          })}
        </svg>
      </div>

      {/* Main Content Area in traditional asymmetrical layout */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 h-full flex flex-col justify-center items-start">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-3xl text-left space-y-6 sm:space-y-8 pl-0 md:pl-8 lg:pl-12"
        >
          <div className="space-y-3">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.45em] text-[#FFC20E] font-bold block mb-1">
              {slides[current].sub}
            </span>
            <div className="h-[2px] w-24 bg-gradient-to-r from-[#F04E23] to-[#FFC20E] mb-6" />
            <h1 className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-wide leading-[1.1] font-normal drop-shadow-md">
              {slides[current].title} <br />
              <span className="italic font-light text-[#FFC20E] font-serif block mt-2 text-xl sm:text-3xl md:text-4xl tracking-normal">
                {slides[current].tagline}
              </span>
            </h1>
          </div>

          <p className="text-xs sm:text-sm font-light text-stone-200/90 max-w-lg leading-relaxed tracking-wide font-sans">
            Acclaimed photographer Vinayak Sable captures majestic wedding celebrations, cultural legacies, and exquisite portraits with premium curation and gold-tinted medium-format cinematic vision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <Link to="/portfolio" className="w-full sm:w-auto">
              <Button className="bg-[#F04E23] hover:bg-[#F04E23]/95 text-white border border-[#F04E23] rounded-none h-14 sm:h-16 px-8 sm:px-10 uppercase text-[10px] sm:text-xs tracking-[0.3em] font-bold transition-all duration-300 w-full flex items-center justify-center gap-3 shadow-lg hover:shadow-orange-700/25">
                VIEW GALLERIES
                <ArrowRight className="w-4 h-4 text-[#FFC20E]" />
              </Button>
            </Link>
            <Link to="/booking" className="w-full sm:w-auto">
              <Button className="bg-transparent text-white hover:bg-white/10 hover:text-white border border-[#FFC20E]/70 hover:border-[#FFC20E] rounded-none h-14 sm:h-16 px-8 sm:px-10 uppercase text-[10px] sm:text-xs tracking-[0.3em] font-bold transition-all duration-300 w-full flex items-center justify-center gap-3">
                <Calendar className="w-4 h-4 text-[#F04E23]" />
                PLAN A SHOOT
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
                current === index ? 'text-[#FFC20E] font-bold opacity-100 scale-110' : 'text-white/40 hover:text-white opacity-60'
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
                  className="absolute top-0 left-0 w-full bg-[#FFC20E]"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Traditional Floating Diya (पणती) with pulse glow effect on right */}
      <div className="absolute right-6 sm:right-10 lg:right-16 bottom-24 z-20 flex flex-col items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center border border-[#FFC20E]/50 diya-glow relative cursor-pointer" title="मंगळदीप">
          <Sparkles className="w-4 h-4 text-[#FFC20E]" />
        </div>
        <span className="text-[8px] tracking-widest text-[#FFC20E]/85 uppercase font-bold">मंगळदीप</span>
      </div>

      {/* Social Icons on Right Margin */}
      <div className="absolute right-6 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-8 text-white/70">
        <a href="https://www.instagram.com/vinayak_sable_photographey?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="hover:text-[#FFC20E] transition-colors cursor-pointer">
          <Instagram className="w-4 h-4" />
        </a>
        <span className="text-[10px] tracking-widest text-white/40 vertical-text select-none">सत्यं शिवं सुंदरम्</span>
      </div>

      {/* Carousel Dots on Bottom Left */}
      <div className="absolute bottom-10 left-6 sm:left-12 lg:left-16 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full border transition-all duration-300 ${
              current === index ? 'bg-[#FFC20E] border-[#FFC20E] scale-125' : 'bg-transparent border-white/50 hover:border-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
