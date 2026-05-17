import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Search, Grid, List as ListIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PortfolioMasonry from '@/components/home/PortfolioMasonry';

const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Wedding', 'Fashion', 'Portraits', 'Cinematic', 'Nature', 'Product'];

  return (
    <div className="min-h-screen bg-[#050505] pt-32">
      <div className="max-w-7xl mx-auto px-10 pb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">The Collective Archive</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-serif italic text-white tracking-tight leading-[0.8]">
              Silent <span className="opacity-30">Dialogues</span>
            </h1>
            <p className="text-zinc-500 max-w-lg text-base font-light font-serif leading-relaxed italic">
              Explore our curated selection of visual narratives, meticulously categorized by theme, emotion, and architectural resonance.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-6">
             <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-primary transition-colors" />
                <Input 
                   placeholder="Search the archive..." 
                   className="glass border-white/10 h-14 pl-14 pr-8 rounded-full w-full md:w-80 text-[11px] uppercase tracking-widest font-medium focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:bg-white/10"
                />
             </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-6 mb-24 border-b border-white/10 pb-12">
          {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => setFilter(cat)}
               className={`text-[10px] uppercase tracking-[0.3em] font-bold px-10 py-3 rounded-full transition-all duration-500 ${filter === cat ? 'bg-primary text-black' : 'text-zinc-500 hover:text-white glass border-white/5'}`}
             >
               {cat}
             </button>
          ))}
        </div>

        <PortfolioMasonry />

        <div className="mt-48 text-center py-24 glass border-white/10 rounded-3xl space-y-10">
            <div className="space-y-4">
              <h3 className="text-4xl font-serif italic text-white tracking-tight">Seeking a custom vision?</h3>
              <p className="text-zinc-500 max-w-md mx-auto font-light font-serif italic">We specialize in bespoke photographic projects that defy categorization. Let's sculpt your narrative together.</p>
            </div>
            <Button className="bg-primary hover:bg-accent text-black px-16 h-16 rounded-full uppercase text-[11px] font-bold tracking-[0.3em] transition-all shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                Initiate Consultation
            </Button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
