import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Instagram, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2069&auto=format&fit=crop',
    title: 'The Royal Wedding Sagas',
    tagline: 'Preserving regal heritage and grand traditions.',
    sub: 'MAJESTIC WEDDING CHRONICLES'
  },
  {
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000&auto=format&fit=crop',
    title: 'Heritage Portraiture',
    tagline: 'Capturing the artistic essence of historic architecture.',
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#151310]/95 via-[#151310]/55 to-[#151310]/60 z-10" />
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img
            src={slides[current].image}
            alt="Cinematic Portfolio Landmark"
            className="w-full h-full object-cover filter brightness-90 saturate-[0.85]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Rotating Mandala/Symmetrical Pattern Graphic behind content */}
      <div className="absolute right-[-10vw] md:right-[5vw] top-[15vh] opacity-[0.03] pointer-events-none z-10 select-none">
        <svg 
          className="w-[20rem] h-[20rem] md:w-[35rem] md:h-[35rem] text-[#A37E43] animate-[spin_120s_infinite_linear]" 
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
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.45em] text-[#B8975A] font-bold block mb-1">
              {slides[current].sub}
            </span>
            <div className="h-[1.5px] w-24 bg-gradient-to-r from-[#A37E43] to-[#B8975A] mb-6" />
            <h1 className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-wide leading-[1.1] font-normal drop-shadow-md">
              {slides[current].title} <br />
              <span className="italic font-light text-[#B8975A] font-serif block mt-2 text-xl sm:text-3xl md:text-4xl tracking-normal">
                {slides[current].tagline}
              </span>
            </h1>
          </div>

          <p className="text-xs sm:text-sm font-light text-stone-200/90 max-w-lg leading-relaxed tracking-wide font-sans">
            Acclaimed photographer Vinayak Sable captures majestic wedding celebrations, cultural legacies, and exquisite portraits with premium curation and gold-tinted medium-format cinematic vision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <Link to="/portfolio" className="w-full sm:w-auto">
              <Button className="bg-[#A37E43] hover:bg-[#B8975A] text-white border border-[#A37E43] rounded-none h-14 sm:h-16 px-8 sm:px-10 uppercase text-[10px] sm:text-xs tracking-[0.3em] font-bold transition-all duration-300 w-full flex items-center justify-center gap-3 shadow-lg">
                VIEW GALLERIES
                <ArrowRight className="w-4 h-4 text-white" />
              </Button>
            </Link>
            <Link to="/booking" className="w-full sm:w-auto">
              <Button className="bg-transparent text-white hover:bg-white/10 hover:text-white border border-[#B8975A]/70 hover:border-[#B8975A] rounded-none h-14 sm:h-16 px-8 sm:px-10 uppercase text-[10px] sm:text-xs tracking-[0.3em] font-bold transition-all duration-300 w-full flex items-center justify-center gap-3">
                <Calendar className="w-4 h-4 text-[#B8975A]" />
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
                current === index ? 'text-[#B8975A] font-bold opacity-100 scale-110' : 'text-white/40 hover:text-white opacity-60'
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
                  className="absolute top-0 left-0 w-full bg-[#B8975A]"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Social Icons on Right Margin */}
      <div className="absolute right-6 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-8 text-white/70">
        <a href="https://www.instagram.com/vinayak_sable_photographey?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="hover:text-[#B8975A] transition-colors cursor-pointer">
          <Instagram className="w-4 h-4" />
        </a>
        <span className="text-[10px] tracking-widest text-white/40 vertical-text select-none">VINAYAK SABLE</span>
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
