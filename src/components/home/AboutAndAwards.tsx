import React from 'react';
import { motion } from 'motion/react';
import { Quote, Camera, Users, Heart, Image as LucideImage, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const testimonials = [
  { name: 'Sarah McAvoy', role: 'Wedding Client', text: '“VS didn’t just take photos; they captured the soul of our wedding. The cinematic quality is unmatched.”', rating: 5 },
  { name: 'Marcus Chen', role: 'Fashion Designer', text: '“The best editorial vision I’ve worked with. They understand light better than anyone in the industry.”', rating: 5 },
  { name: 'Isabella Ross', role: 'Lifestyle Influencer', text: '“Professional, artistic, and incredibly fast. My personal brand reached new heights after our session.”', rating: 5 },
];

const AboutAndAwards: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#050505] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* About Me Section: Text & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6 sm:space-y-8"
          >
            <div className="space-y-3">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.5em] font-normal text-amber-500 block">
                ABOUT ME
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif text-white tracking-tight leading-[1.1]">
                Hi, I'm VS
                <span className="opacity-80 text-2xl sm:text-3xl block mt-2 font-serif font-normal">A Photographer & Storyteller</span>
              </h2>
            </div>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
              I believe every moment has a story to tell. My goal is to capture emotions, real moments and beautiful memories that last a lifetime.
            </p>

            <p className="text-3xl sm:text-4xl text-amber-500 font-serif italic tracking-wide font-normal py-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              VS Photogray
            </p>

            <div>
              <Link to="/portfolio">
                <Button variant="outline" className="px-8 h-14 border-white/40 hover:border-white hover:bg-white/5 rounded-none text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-all flex items-center gap-2">
                  VIEW MY WORK
                  <span className="text-xs">&rarr;</span>
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Large Image of Photographer */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative overflow-hidden rounded-none border border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1200&auto=format&fit=crop"
              alt="VS Photogray"
              className="w-full h-auto aspect-[4/3] sm:aspect-video object-cover grayscale opacity-90 transition-all duration-700 hover:grayscale-0 hover:opacity-100"
            />
          </motion.div>
        </div>

        {/* 4-Column Statistics section */}
        <div className="mt-24 sm:mt-32 border-t border-b border-white/10 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {[
              { icon: Camera, val: "8+", label: "YEARS EXPERIENCE" },
              { icon: Users, val: "350+", label: "HAPPY CLIENTS" },
              { icon: LucideImage, val: "1200+", label: "PHOTOSHOOTS" },
              { icon: Heart, val: "100%", label: "PASSION" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-4 py-6 lg:py-4 space-y-3 justify-center">
                <stat.icon className="w-5 h-5 text-amber-500/80" />
                <span className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
                  {stat.val}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-bold text-zinc-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-32 sm:mt-48 text-center space-y-16 sm:space-y-24">
          <div className="flex flex-col items-center space-y-4">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.5em] font-normal text-amber-500 block">
              CLIENT TESTIMONIALS
            </span>
            <h3 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">Testimonials</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="glass border-white/10 p-8 sm:p-10 rounded-[2rem] hover:border-amber-500/30 transition-all flex flex-col justify-between group text-left"
              >
                <Quote className="w-8 h-8 text-amber-500/10 mb-8 group-hover:text-amber-500/30 transition-all duration-500" />
                <p className="text-zinc-400 font-serif italic mb-10 text-base sm:text-lg leading-relaxed opacity-90">{t.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full glass border border-amber-500/20 flex items-center justify-center font-serif italic font-bold text-base text-amber-500">{t.name[0]}</div>
                  <div className="space-y-0.5">
                    <h5 className="text-[11px] font-bold text-white uppercase tracking-widest">{t.name}</h5>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Booking CTA section */}
        <div className="mt-32 sm:mt-48 bg-zinc-950/40 border border-white/5 p-12 sm:p-24 rounded-[3rem] relative overflow-hidden text-center shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop')] opacity-[0.03] bg-cover bg-center grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.01] to-transparent pointer-events-none" />
          <div className="relative z-10 space-y-8 sm:space-y-12">
            <h4 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-[1.1]">
              Ready to sculpt your <br /> <span className="text-amber-500 underline decoration-1 underline-offset-12">Visual Legacy?</span>
            </h4>
            <p className="text-zinc-500 max-w-xl mx-auto font-serif italic text-base sm:text-lg leading-relaxed opacity-90">Custom productions are currently open for the Q3-Q4 2026 season. Initial consultation is complimentary for international visions.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-6 sm:pt-8 w-full max-w-md mx-auto">
              <Link to="/booking" className="w-full sm:w-auto">
                <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-none w-full sm:px-12 h-16 uppercase font-bold tracking-[0.3em] text-[10px] sm:text-xs transition-all duration-300">
                  BOOK SESSION
                </Button>
              </Link>
              <a href="#about" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="border-white/20 hover:border-white hover:bg-white/5 rounded-none w-full sm:px-12 h-16 uppercase font-bold tracking-[0.3em] text-[10px] sm:text-xs transition-all duration-300 text-white">
                  LEARN MORE
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAndAwards;
