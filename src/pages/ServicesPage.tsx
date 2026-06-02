import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, User, Sunset, Video, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const servicesList = [
  {
    icon: Heart,
    title: 'Wedding Photography',
    desc: 'Unobtrusive, cinematic capture of your landmark ceremony. We focus on real emotions, light-filled candids, and elegant portraits.',
    price: '$3,500+',
    duration: 'Full Day (8-10 Hours)',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=700&auto=format&fit=crop'
  },
  {
    icon: Sunset,
    title: 'Pre-Wedding Shoot',
    desc: 'An intimate, editorial engagement production located in breathtaking destinations. Perfect for customized visual announcements.',
    price: '$1,800+',
    duration: 'Half Day (4 Hours)',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=700&auto=format&fit=crop'
  },
  {
    icon: User,
    title: 'Portrait Photography',
    desc: 'Bespoke corporate identity, personal branding, or fine-art portfolio representations curated with customized background setups.',
    price: '$850+',
    duration: '2 Hours Session',
    image: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=700&auto=format&fit=crop'
  },
  {
    icon: Sparkles,
    title: 'Event Photography',
    desc: 'Luxury corporate galas, artistic runway presentations, and meaningful custom family celebrations photographed in perfect detail.',
    price: '$1,500+',
    duration: '4 Hours Minimum',
    image: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=700&auto=format&fit=crop'
  },
  {
    icon: Video,
    title: 'Cinematic Video Shoot',
    desc: 'Exquisite slow-motion visual essays filmed on high-end cine cameras, accompanied by tailored symphonic audio mastering.',
    price: '$4,200+',
    duration: 'Full Day Production',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=700&auto=format&fit=crop'
  }
];

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FCFAF6] text-[#1A1815] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Header Block */}
        <div className="space-y-4 mb-20 text-center">
          <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#A37E43]">
            Curated Offerings
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif tracking-tight leading-none text-zinc-900">
            Bespoke <span className="italic text-[#A37E43]">Services</span>
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-500 font-light text-sm sm:text-base leading-relaxed mt-4">
            A premium selection of masterclass photography and cinematography packages tailored explicitly to document precious landmarks of your private timeline.
          </p>
        </div>

        {/* Dynamic Card-based Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {servicesList.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-[#A37E43]/10 flex flex-col justify-between group overflow-hidden relative"
              >
                {/* Header Image Overlay */}
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-serif text-zinc-900 font-medium group-hover:text-[#A37E43] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-light">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#A37E43]/10 flex items-center justify-between text-xs font-medium text-stone-700">
                    <div>
                      <p className="text-[10px] uppercase text-zinc-400 tracking-wider">Starting From</p>
                      <p className="text-lg font-serif text-[#A37E43]">{service.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase text-zinc-400 tracking-wider">Coverage</p>
                      <p>{service.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Hover Bottom Highlight Accent Block */}
                <div className="h-1 bg-[#A37E43] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* Exclusive inclusions */}
        <div className="bg-[#FAF8F4] p-10 border border-[#A37E43]/10 rounded-none mb-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif italic text-zinc-800">What’s always included in our visual suites?</h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              We operate at the heights of professional photography standards. Each commission features tailored details to ensure peace of mind, fast retrieval, and beautiful physical presentation formats.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Online Password-Protected Client Vault',
              'High-Resolution Digital Image Exports',
              'Complimentary Multi-Location Consultation',
              'Fully Licenced & Artistically Polished'
            ].map((inc, i) => (
              <div key={i} className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#A37E43] shrink-0" />
                <span className="text-xs text-zinc-600 font-light">{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-16 bg-white border border-[#A37E43]/10 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif text-zinc-900">Have a custom creative request?</h2>
          <p className="text-zinc-500 font-serif italic text-xs max-w-md mx-auto">
            Our creative directors organize luxury multi-day destination shoot logistics globally. Share your vision and secure a tailored package structure.
          </p>
          <div className="pt-4">
            <Link to="/booking">
              <Button className="bg-[#A37E43] hover:bg-[#8D6B37] text-white rounded-none px-10 h-14 uppercase text-[10px] font-bold tracking-[0.3em] transition-all flex items-center gap-2 mx-auto">
                RESERVE SESSION
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServicesPage;
