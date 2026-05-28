import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PortfolioMasonry from '@/components/home/PortfolioMasonry';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['All', 'Wedding', 'Pre-Wedding', 'Portrait', 'Fashion', 'Events', 'Travel'];

  return (
    <div className="min-h-screen bg-[#FCFAF6] pt-32 text-[#1A1815]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-32">
        
        {/* Gallery Intro Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-[#A37E43]" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#A37E43]">
                The Creative Archive
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-serif text-zinc-900 tracking-tight leading-none">
              Silent <span className="italic text-[#A37E43] font-light">Dialogues</span>
            </h1>
            <p className="text-zinc-500 font-light font-sans text-sm sm:text-base leading-relaxed">
              Explore our meticulously curated selection of editorial visual narratives, categorized elegantly by theme, geography, and emotional residue.
            </p>
          </div>

          {/* Search Archive */}
          <div className="w-full md:w-auto">
            <div className="relative group w-full sm:w-80">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#A37E43] transition-colors" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH ARCHIVE..."
                className="bg-white border-[#A37E43]/15 h-14 pl-14 pr-6 rounded-none text-[10px] uppercase tracking-widest font-semibold focus-visible:ring-1 focus-visible:ring-[#A37E43]/40"
              />
            </div>
          </div>
        </div>

        {/* Categories Filter list bar */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-16 border-b border-[#A37E43]/10 pb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-bold px-8 py-3.5 transition-all duration-300 rounded-none border ${
                filter === cat
                  ? 'bg-[#A37E43] border-transparent text-white'
                  : 'bg-white border-[#A37E43]/15 text-zinc-500 hover:text-zinc-900 hover:border-[#A37E43]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic masonry representation */}
        <PortfolioMasonry activeCategory={filter} />

        {/* Consultation Call Action Block */}
        <div className="mt-32 text-center py-16 px-6 bg-white border border-[#A37E43]/10 rounded-none space-y-8 shadow-[0_15px_40px_rgba(163,126,67,0.03)] max-w-4xl mx-auto">
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-serif text-zinc-900">Seeking a custom photographic vision?</h3>
            <p className="text-zinc-500 max-w-md mx-auto font-sans font-light text-xs sm:text-sm leading-relaxed">
              We specialize in custom editorial productions and high-end destination projects globally. Let's sculpt your story together.
            </p>
          </div>
          <Link to="/booking">
            <Button className="bg-[#A37E43] hover:bg-[#8D6B37] text-white px-12 h-16 rounded-none uppercase text-[10px] font-bold tracking-[0.3em] transition-all">
              INITIATE CONSULTATION
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PortfolioPage;
