import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const reviewsList = [
  {
    name: 'Sarah & David',
    role: 'Amalfi Coast Wedding',
    text: '“Working with VS was a masterclass in professional artistry. They became part of our wedding, capturing intimate glances and grand landscapes with standard-setting precision. The final leather portfolio represents our family heirloom.”',
    rating: 5,
    avatar: 'S',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Marcus Chen',
    role: 'Editorial Director, ATELIER',
    text: '“VS brings an incredible cinematic perspective to commercial fashion shoots. Their manipulation of natural shadow is unmatched in modern photography circles. An absolute visual professional.”',
    rating: 5,
    avatar: 'M',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Elizabeth Vance',
    role: 'Maternity Session',
    text: '“I felt safe, respected, and incredibly beautiful during our studio portrait session. The direction was light, supportive, and perfectly matching the calm, premium vibe of my luxury nursery brand.”',
    rating: 5,
    avatar: 'E',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Oliver Thorne',
    role: 'Pre-Wedding in Kyoto',
    text: '“The attention to scheduling, geographical backdrops, and post-production detail is staggering. Highly recommended for couples wanting artistic shots that stand apart from templated wedding photography.”',
    rating: 5,
    avatar: 'O',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Victoria & James',
    role: 'Chateau de Tourreau Wedding',
    text: '“Every photograph is a stunning painting. Our guests are perpetually in awe of the golden-hour captures. The online private gallery makes it incredibly simple to curate custom downloads for our families.”',
    rating: 5,
    avatar: 'V',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop'
  }
];

const TestimonialsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FCFAF6] text-[#1A1815] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Header Block */}
        <div className="space-y-4 mb-20 text-center">
          <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#A37E43]">
            Client Gratitude
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif tracking-tight leading-none text-zinc-900">
            Kind Words <span className="italic text-[#A37E43] block mt-2 sm:inline sm:mt-0">from our Clients</span>
          </h1>
          <p className="max-w-xl mx-auto text-zinc-500 font-light text-xs sm:text-sm leading-relaxed mt-4">
            Hear from couples and global creative directors who collaborated with VS Studio to sculpt their permanent visual legacies.
          </p>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24">
          {reviewsList.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 sm:p-12 border border-[#A37E43]/10 flex flex-col justify-between hover:shadow-lg hover:border-[#A37E43]/20 transition-all duration-300 relative rounded-none"
            >
              {/* Star icons & Quotes decoration */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#B8975A] fill-[#B8975A]" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#A37E43]/10 shrink-0" />
              </div>

              {/* Message text */}
              <p className="text-zinc-600 font-serif italic text-sm sm:text-base leading-relaxed mb-8 opacity-95">
                {review.text}
              </p>

              {/* Author Row */}
              <div className="flex items-center gap-4 pt-6 border-t border-[#A37E43]/10">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#A37E43]/20 shrink-0 bg-[#FCFAF6] flex items-center justify-center font-serif text-lg font-bold text-[#A37E43]">
                  {review.image ? (
                    <img src={review.image} alt={review.name} className="w-full h-full object-cover grayscale" />
                  ) : (
                    review.avatar
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">
                    {review.name}
                  </h4>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mt-0.5">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Story CTA banner */}
        <div className="bg-[#FAF8F4] border border-[#A37E43]/10 p-12 sm:p-20 text-center space-y-6">
          <h2 className="text-3xl font-serif text-zinc-900">Ready to script your story with us?</h2>
          <p className="text-zinc-500 font-light text-sm max-w-lg mx-auto">
            Each year, we only accept a limited count of destination wedding commission and creative catalog assignments to maintain our singular standard of care and visual depth.
          </p>
          <div className="pt-4">
            <Link to="/booking">
              <Button className="bg-[#A37E43] hover:bg-[#8D6B37] text-white rounded-none px-12 h-16 uppercase font-bold tracking-[0.3em] text-xs transition-all flex items-center gap-2 mx-auto">
                SECURE PLANNER CONSULTATION
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TestimonialsPage;
