import React from 'react';
import { motion } from 'motion/react';
import { Quote, Camera, Users, Heart, Image as LucideImage, ArrowRight, Instagram, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const testimonials = [
  { 
    name: 'Tejashree & Abhijit Deshmukh', 
    role: 'Peshwai Wada Wedding, Pune', 
    text: '“विनायक साबळे यांचे काम अप्रतिम आहे! त्यांनी आमच्या पारंपरिक मराठी लग्नसोहळ्यातील प्रत्येक मंगलमय क्षण अगदी जिवंत टिपला. त्यांच्या कॅमेरा फ्रेममध्ये तो राजेशाही थाट खरोखरच उतरला.”', 
    rating: 5,
    initial: 'T'
  },
  { 
    name: 'Aditi Patwardhan', 
    role: 'Traditional Paithani Portrait, Kolhapur', 
    text: '“Highly professional and humble! The team helped us curate the traditional jewelry and heavy silk poses with such comfort. The portrait lightning captures the warm gold tones with pure art.”', 
    rating: 5,
    initial: 'A'
  },
  { 
    name: 'Sarang & Rutuja Rane', 
    role: 'Heritage Pre-Wedding, Satara Forts', 
    text: '“आमच्या लग्नाची क्षणचित्रे पाहून मन तृप्त झाले. विनायक यांच्या उत्कृष्ट दृष्टीमुळे सह्याद्रीच्या पार्श्वभूमीवर आमचा मराठमोळा थाट पाहण्यासारखा झाला आहे. खूप खूप धन्यवाद!”', 
    rating: 5,
    initial: 'S'
  },
];

const AboutAndAwards: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#FCF8F2] overflow-hidden border-t border-[#F04E23]/10 relative">
      {/* Absolute traditional design element */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none z-10 select-none">
        <span className="text-9xl font-serif text-[#F04E23] uppercase font-bold tracking-widest block whitespace-nowrap">महाराष्ट्र</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 bg-transparent">
        
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
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.5em] font-bold text-[#F04E23] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#FFC20E]" /> परिचय • OUR LEGACY
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif text-zinc-900 tracking-tight leading-[1.15]">
                विनायक साबळे
                <span className="text-xl sm:text-2xl text-[#F04E23] block mt-2 font-serif font-light italic">
                  Vinayak Sable Photography
                </span>
                <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-zinc-400 block mt-1 font-sans">
                  The Golden Maratha Soul
                </span>
              </h2>
            </div>

            <p className="text-zinc-600 text-sm leading-relaxed font-light font-sans">
              आम्ही केवळ छायाचित्रे काढत नाही, तर वास्तू, संस्कृती आणि तुमच्या आयुष्यातील अनमोल क्षणांचे सुवर्ण संचित तयार करतो. पेशवाई वाडे, नऊवारी साडीचा थाट, पारंपरिक दागिने आणि महाराष्ट्राचा समृद्ध वारसा आमच्या लेन्सच्या माध्यमातून प्रकाशमान करणारी आमची शाही कलाकृती आहे.
            </p>

            <p className="text-xl text-zinc-700 text-sm leading-relaxed font-light font-sans -mt-2">
              Every family celebration, Peshwa wedding, and traditional portrait session holds a distinct aesthetic. I work patiently to translate those sacred Maratha emotions into timeless golden masterpieces.
            </p>

            <p className="text-3xl text-[#F04E23] font-serif italic tracking-wide font-normal py-2 flex items-center gap-2">
              <span>विनायक साबळे</span>
              <span className="text-xs text-zinc-400 font-sans tracking-widest uppercase">&bull; Pune, MH</span>
            </p>

            <div>
              <Link to="/portfolio">
                <Button className="bg-[#F04E23] hover:bg-[#F04E23]/95 text-white border border-transparent rounded-none h-14 px-8 uppercase text-[10px] font-bold tracking-[0.3em] transition-all flex items-center gap-2 shadow-md hover:shadow-orange-700/15">
                  EXPLORE THE SAGA
                  <ArrowRight className="w-4 h-4 text-[#FFC20E]" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Large Image of Photographer in a beautiful traditional framing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative group"
          >
            {/* Absolute Decorative Golden Wada Frame Background */}
            <div className="absolute -inset-2 rounded-none border border-gradient-to-tr from-[#F04E23]/30 via-transparent to-[#FFC20E]/40 pointer-events-none group-hover:scale-[1.02] transition-transform duration-700" />
            
            <div className="relative overflow-hidden rounded-none border border-[#F04E23]/25 bg-[#151310] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?q=80&w=1200&auto=format&fit=crop"
                alt="Vinayak Sable photography Studio"
                className="w-full h-auto aspect-[4/3] sm:aspect-video object-cover filter brightness-95 saturate-[0.8] hover:saturate-100 hover:brightness-100 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 z-10 bg-[#151310]/80 p-3 text-white border-l-2 border-[#FFC20E] text-[9px] uppercase tracking-widest font-sans font-bold">
                सत्यशिल प्रेम • TRUE ROYAL STYLE
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4-Column Statistics section with beautiful saffron/gold layout */}
        <div className="mt-24 sm:mt-32 border-t border-b border-[#F04E23]/15 py-12 bg-white/40">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#F04E23]/15">
            {[
              { icon: Camera, val: "12+", label: "YEARS ARCHIVING SOULS" },
              { icon: Users, val: "480+", label: "MARATHA WEDDINGS" },
              { icon: LucideImage, val: "1800+", label: "ROYAL PLATES DELIVERED" },
              { icon: Heart, val: "100%", label: "DEVOTED CLIENT SERVICE" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-4 py-6 lg:py-4 space-y-2 justify-center">
                <stat.icon className="w-5 h-5 text-[#F04E23]" />
                <span className="text-4xl sm:text-5xl font-serif text-zinc-900 tracking-tight">
                  {stat.val}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#F04E23]/80">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram Preview */}
        <div className="mt-32 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#F04E23] font-bold">INSTAGRAM SHORTS</span>
            <h3 className="text-3xl font-serif text-zinc-900">Follow Our Journey</h3>
            <p className="text-zinc-500 text-xs font-light max-w-sm mx-auto">Explore daily micro-vlogs, client highlights and behind-the-scenes previews on <a href="https://www.instagram.com/vinayak_sable_photographey?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="underline font-semibold text-[#F04E23]">@vinayak_sable_photographey</a></p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=400&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=400&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=400&auto=format&fit=crop'
            ].map((img, idx) => (
              <a key={idx} href="https://www.instagram.com/vinayak_sable_photographey?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="relative block group aspect-square overflow-hidden border border-[#F04E23]/10">
                <img src={img} alt="Instagram preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 saturation-75 group-hover:saturation-100" referrerPolicy="no-referrer" />
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
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.5em] font-normal text-[#F04E23] block">
              CLIENT GRATITUDE &bull; समाधान आणि आदर
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
                className="bg-white border border-[#F04E23]/10 p-8 sm:p-10 rounded-none hover:shadow-2xl hover:shadow-orange-700/5 hover:border-[#F04E23]/30 transition-all flex flex-col justify-between group text-left"
              >
                <Quote className="w-8 h-8 text-[#F04E23]/10 mb-8 group-hover:text-[#F04E23]/30 transition-all duration-500" />
                <p className="text-zinc-700 font-serif italic mb-10 text-sm sm:text-base leading-relaxed opacity-95">{t.text}</p>
                <div className="flex items-center gap-4 pt-4 border-t border-[#F04E23]/10">
                  <div className="w-10 h-10 rounded-full bg-[#FCF8F2] border border-[#F04E23]/25 flex items-center justify-center font-serif italic font-bold text-sm text-[#F04E23]">{t.initial}</div>
                  <div className="space-y-0.5">
                    <h5 className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">{t.name}</h5>
                    <p className="text-[9px] uppercase tracking-widest text-[#F04E23] font-semibold">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Booking CTA section with fine Paithani & Wood Wada feeling */}
        <div className="mt-32 sm:mt-48 bg-white border border-[#F04E23]/15 p-12 sm:p-24 rounded-none relative overflow-hidden text-center shadow-[0_15px_50px_rgba(240,78,35,0.06)]">
          {/* Subtle traditional texture in background */}
          <div className="absolute inset-0 bg-[#FCF8F2]/90 bg-[url('https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2071&auto=format&fit=crop')] opacity-[0.03] bg-cover bg-center grayscale" />
          <div className="relative z-10 space-y-8 sm:space-y-12">
            <h4 className="text-4xl sm:text-6xl md:text-7xl font-serif text-zinc-900 tracking-tight leading-[1.15]">
              Ready to catalog your <br /> <span className="text-[#F04E23] italic font-light decoration-1">राजेशाही क्षणचित्र?</span>
            </h4>
            <p className="text-zinc-600 max-w-xl mx-auto font-serif italic text-sm sm:text-base leading-relaxed opacity-90">
              Bookings are completely open for the upcoming Maharashtrian wedding and traditional festival seasons. Friendly consultation is free and customized to your local Wada or heritage destination.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-6 sm:pt-8 w-full max-w-md mx-auto">
              <Link to="/booking" className="w-full sm:w-auto">
                <Button size="lg" className="bg-[#F04E23] hover:bg-[#D03E15] text-white rounded-none w-full sm:px-12 h-16 uppercase font-bold tracking-[0.3em] text-[10px] sm:text-xs transition-all duration-300 border border-transparent shadow-md">
                  BOOK SESSION
                </Button>
              </Link>
              <Link to="/portfolio" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="border-[#F04E23]/30 hover:border-[#F04E23] hover:bg-[#F04E23]/5 rounded-none w-full sm:px-12 h-16 uppercase font-bold tracking-[0.3em] text-[10px] sm:text-xs transition-all duration-300 text-[#F04E23]">
                  VIEW JOURNAL
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
