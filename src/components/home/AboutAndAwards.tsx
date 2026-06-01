import React from 'react';
import { motion } from 'motion/react';
import { Quote, Camera, Users, Heart, Image as LucideImage, ArrowRight, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const testimonials = [
  { name: 'Ananya & Rohan Sharma', role: 'Royal Udaipur Wedding', text: '“VS is an amazing photographer! They did not just click pictures, but captured the true emotion of our marriage ceremony. The photos are beautifully clear and natural.”', rating: 5 },
  { name: 'Amit Patel', role: 'Portrait & Family Client', text: '“Very professional and polite studio team. They made us feel super comfortable during our family photo shoot. The delivery was also fast!”', rating: 5 },
  { name: 'Priya Deshmukh', role: 'Fashion & Event Client', text: '“Highly recommended! The way they capture lighting and real smiles is very beautiful. Our family custom album looks like a piece of art.”', rating: 5 },
];

const AboutAndAwards: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#FCFAF6] overflow-hidden border-t border-[#A37E43]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 bg-[#FCFAF6]">
        
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
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.5em] font-normal text-[#A37E43] block">
                ABOUT ME
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif text-zinc-900 tracking-tight leading-[1.1]">
                Hi, I'm VS
                <span className="text-xl sm:text-2xl text-zinc-500 block mt-2 font-serif font-light italic">A Photographer & Storyteller</span>
              </h2>
            </div>

            <p className="text-zinc-600 text-sm leading-relaxed font-light font-sans">
              I believe every family celebration and special event is full of beautiful emotions that deserve to be saved forever. My photoshoot style is very simple, natural, and helpful, so that you feel fully comfortable during your shoots, helping us capture sweet family moments and real smiles.
            </p>

            <p className="text-3xl text-[#A37E43] font-serif italic tracking-wide font-normal py-2">
              VS Studios
            </p>

            <div>
              <Link to="/portfolio">
                <Button variant="outline" className="px-8 h-14 border-[#A37E43]/40 hover:border-[#A37E43] hover:bg-[#A37E43]/5 rounded-none text-[10px] font-bold uppercase tracking-[0.3em] text-[#A37E43] transition-all flex items-center gap-2">
                  VIEW PORTFOLIO
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
            className="lg:col-span-7 relative overflow-hidden rounded-none border border-[#A37E43]/10"
          >
            <img
              src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1200&auto=format&fit=crop"
              alt="VS Photogray Studio"
              className="w-full h-auto aspect-[4/3] sm:aspect-video object-cover grayscale saturate-50 hover:grayscale-0 hover:saturate-100 opacity-95 transition-all duration-1000"
            />
          </motion.div>
        </div>

        {/* 4-Column Statistics section */}
        <div className="mt-24 sm:mt-32 border-t border-b border-[#A37E43]/10 py-12 bg-white/40">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#A37E43]/10">
            {[
              { icon: Camera, val: "10+", label: "YEARS EXPERIENCE" },
              { icon: Users, val: "450+", label: "HAPPY FAMILIES" },
              { icon: LucideImage, val: "1500+", label: "COMPLETED SESSIONS" },
              { icon: Heart, val: "100%", label: "HAPPY CLIENTS" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-4 py-6 lg:py-4 space-y-2 justify-center">
                <stat.icon className="w-5 h-5 text-[#A37E43]" />
                <span className="text-4xl sm:text-5xl font-serif text-zinc-900 tracking-tight">
                  {stat.val}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#A37E43]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram Preview */}
        <div className="mt-32 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#A37E43] font-bold">INSTAGRAM SHORTS</span>
            <h3 className="text-3xl font-serif text-zinc-900">Follow Our Journey</h3>
            <p className="text-zinc-500 text-xs font-light max-w-sm mx-auto">Explore daily micro-vlogs, client highlights and behind-the-scenes previews on <a href="https://instagram.com" target="_blank" rel="noreferrer" className="underline font-semibold text-[#A37E43]">@vsstudios</a></p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=400&auto=format&fit=crop'
            ].map((img, idx) => (
              <a key={idx} href="https://instagram.com" target="_blank" rel="noreferrer" className="relative block group aspect-square overflow-hidden border border-[#A37E43]/10">
                <img src={img} alt="Instagram preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 saturation-75 group-hover:saturation-100" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-32 sm:mt-48 text-center space-y-16">
          <div className="flex flex-col items-center space-y-4">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.5em] font-normal text-[#A37E43] block">
              CLIENT GRATITUDE
            </span>
            <h3 className="text-4xl sm:text-5xl font-serif text-zinc-900 tracking-tight">Kind Words</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="bg-white border border-[#A37E43]/10 p-8 sm:p-10 rounded-none hover:shadow-lg transition-all flex flex-col justify-between group text-left"
              >
                <Quote className="w-8 h-8 text-[#A37E43]/10 mb-8 group-hover:text-[#A37E43]/30 transition-all duration-500" />
                <p className="text-zinc-600 font-serif italic mb-10 text-sm sm:text-base leading-relaxed opacity-95">{t.text}</p>
                <div className="flex items-center gap-4 pt-4 border-t border-[#A37E43]/10">
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#A37E43]/20 flex items-center justify-center font-serif italic font-bold text-sm text-[#A37E43]">{t.name[0]}</div>
                  <div className="space-y-0.5">
                    <h5 className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">{t.name}</h5>
                    <p className="text-[9px] uppercase tracking-widest text-[#A37E43] font-semibold">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Booking CTA section */}
        <div className="mt-32 sm:mt-48 bg-white border border-[#A37E43]/15 p-12 sm:p-24 rounded-none relative overflow-hidden text-center shadow-[0_15px_50px_rgba(163,126,67,0.05)]">
          <div className="absolute inset-0 bg-[#FAF8F5]/50 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop')] opacity-[0.02] bg-cover bg-center grayscale" />
          <div className="relative z-10 space-y-8 sm:space-y-12">
            <h4 className="text-4xl sm:text-6xl md:text-7xl font-serif text-zinc-900 tracking-tight leading-[1.1]">
              Ready to plan your <br /> <span className="text-[#A37E43] italic font-light decoration-1">Dream Photoshoot?</span>
            </h4>
            <p className="text-zinc-500 max-w-xl mx-auto font-serif italic text-sm sm:text-base leading-relaxed opacity-90">Bookings are fully open for the 2026/2027 marriage and festival seasons. Friendly chats and consultation are completely free.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-6 sm:pt-8 w-full max-w-md mx-auto">
              <Link to="/booking" className="w-full sm:w-auto">
                <Button size="lg" className="bg-[#A37E43] hover:bg-[#8D6B37] text-white rounded-none w-full sm:px-12 h-16 uppercase font-bold tracking-[0.3em] text-[10px] sm:text-xs transition-all duration-300 border border-transparent">
                  BOOK SESSION
                </Button>
              </Link>
              <Link to="/portfolio" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="border-[#A37E43]/30 hover:border-[#A37E43] hover:bg-[#A37E43]/5 rounded-none w-full sm:px-12 h-16 uppercase font-bold tracking-[0.3em] text-[10px] sm:text-xs transition-all duration-300 text-[#A37E43]">
                  VIEW GALLERY
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAndAwards;
