import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, Award, Camera, Globe, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  { name: 'Sarah McAvoy', role: 'Wedding Client', text: '“VS didn’t just take photos; they captured the soul of our wedding. The cinematic quality is unmatched.”', rating: 5 },
  { name: 'Marcus Chen', role: 'Fashion Designer', text: '“The best editorial vision I’ve worked with. They understand light better than anyone in the industry.”', rating: 5 },
  { name: 'Isabella Ross', role: 'Lifestyle Influencer', text: '“Professional, artistic, and incredibly fast. My personal brand reached new heights after our session.”', rating: 5 },
];

const awards = [
  { icon: Award, title: 'International Photography Award', Year: '2025', desc: 'Grand Prize - Wedding Category' },
  { icon: Trophy, title: 'LensCulture Visual Arts', Year: '2024', desc: 'Best Emerging Studio' },
  { icon: Globe, title: 'World Photography Organization', Year: '2023', desc: 'Top 10 Global Studios' },
];

const AboutAndAwards: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-16"
          >
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-12 bg-primary/40" />
                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary italic">The Visionaries</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-serif italic text-white tracking-tight leading-none">
                VS <span className="opacity-30">Heritage</span>
              </h2>
              <p className="text-zinc-400 text-xl font-serif italic leading-relaxed max-w-lg opacity-80">
                Founded in the heart of the Visual Arts District, VS Studios has spent a decade refining the balance between classical composition and futuristic cinematic processing.
              </p>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-md font-serif italic opacity-60">
                We believe that every subject possesses a core truth. Our mission is to excavate that truth through light, shadow, and impeccable timing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-white/5">
                <div className="space-y-2">
                    <p className="text-5xl font-serif italic text-white tracking-tighter">10k+</p>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Photos Delivered</p>
                </div>
                <div className="space-y-2">
                    <p className="text-5xl font-serif italic text-white tracking-tighter">500+</p>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Weddings</p>
                </div>
                <div className="space-y-2">
                    <p className="text-5xl font-serif italic text-white tracking-tighter">1000+</p>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Happy Clients</p>
                </div>
            </div>

            <Button className="bg-primary hover:bg-accent text-black rounded-full uppercase font-bold tracking-[0.3em] px-16 h-16 text-[11px] transition-all shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                Our Narrative
            </Button>
          </motion.div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
                {awards.map((award, i) => (
                    <motion.div
                        key={award.title}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex gap-8 items-center p-10 glass border-white/10 rounded-3xl hover:border-primary/20 transition-all"
                    >
                        <div className="w-20 h-20 glass border border-white/10 flex items-center justify-center rounded-full group-hover:bg-primary transition-all duration-700">
                            <award.icon className="w-8 h-8 text-primary group-hover:text-black transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-2xl font-serif italic text-white tracking-tight leading-none">{award.title}</h4>
                            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{award.Year} — {award.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-48 text-center space-y-24">
           <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-primary/40" />
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary italic">Global Discourse</span>
                </div>
                <h3 className="text-5xl md:text-7xl font-serif italic text-white tracking-tight">Client <span className="opacity-30">Manifestos</span></h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {testimonials.map((t, i) => (
                    <motion.div
                        key={t.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass border-white/10 p-12 rounded-[3rem] hover:border-primary/30 transition-all flex flex-col justify-between group text-left"
                    >
                        <Quote className="w-10 h-10 text-primary/10 mb-8 group-hover:text-primary/30 transition-colors" />
                        <p className="text-zinc-400 font-serif italic mb-10 text-lg leading-relaxed opacity-80">{t.text}</p>
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 glass text-primary rounded-full flex items-center justify-center font-bold text-lg border border-primary/20">{t.name[0]}</div>
                            <div className="space-y-1">
                                <h5 className="text-[11px] font-bold text-white uppercase tracking-widest">{t.name}</h5>
                                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{t.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
           </div>
        </div>

        {/* Booking CTA */}
        <div className="mt-48 glass border-white/10 p-24 rounded-[4rem] relative overflow-hidden text-center shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop')] opacity-[0.03] bg-cover bg-center grayscale" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent" />
            <div className="relative z-10 space-y-12">
                <h4 className="text-5xl md:text-8xl font-serif italic text-white tracking-tight leading-[0.9]">
                    Ready to sculpt your <br /> <span className="text-primary underline decoration-1 underline-offset-12">Visual Legacy?</span>
                </h4>
                <p className="text-zinc-500 max-w-xl mx-auto font-serif italic text-lg leading-relaxed opacity-70">Custom productions are currently open for the Q3-Q4 2026 season. Initial consultation is complimentary for international visions.</p>
                <div className="flex flex-col md:flex-row justify-center gap-8 pt-8">
                    <Button size="lg" className="bg-primary text-black hover:bg-accent rounded-full px-16 h-20 uppercase font-bold tracking-[0.3em] text-[11px] transition-all shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                        Initialize Session
                    </Button>
                    <Button size="lg" variant="outline" className="glass border-white/10 text-white hover:bg-white/5 rounded-full px-16 h-20 uppercase font-bold tracking-[0.3em] text-[11px] transition-all">
                        Office Connect
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAndAwards;
