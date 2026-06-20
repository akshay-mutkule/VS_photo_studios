import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PortfolioMasonry from '@/components/home/PortfolioMasonry';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['All', 'Wedding', 'Pre-Wedding', 'Portrait', 'Fashion', 'Events', 'Travel'];

  return (
    <div className="min-h-screen bg-[#FCF8F2] pt-32 text-[#1A1815]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-32">
        
        {/* Gallery Intro Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 bg-gradient-to-r from-[#F04E23] to-[#FFC20E]" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#F04E23] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FFC20E]" /> SACRED TREASURES • PORTFOLIO SAGA
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-serif text-zinc-900 tracking-tight leading-none">
              Royal <span className="italic text-[#F04E23] font-light">Chronicles</span>
            </h1>
            <p className="text-zinc-600 font-light font-sans text-sm sm:text-base leading-relaxed">
              Browse through our premium collection of Maratha wedding ceremonies, royal pre-wedding shoots, family documentation, and traditional silk portraits.
            </p>
          </div>

          {/* Search Archive */}
          <div className="w-full md:w-auto">
            <div className="relative group w-full sm:w-80">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#F04E23] transition-colors" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH PORTFOLIO..."
                className="bg-white border-[#F04E23]/20 h-14 pl-14 pr-6 rounded-none text-[10px] uppercase tracking-widest font-semibold focus-visible:ring-1 focus-visible:ring-[#F04E23]"
              />
            </div>
          </div>
        </div>

        {/* Categories Filter list bar */}
        <div className="flex flex-row overflow-x-auto whitespace-nowrap md:flex-wrap gap-2 sm:gap-4 mb-16 border-b border-[#F04E23]/10 pb-6 md:pb-10 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-none scroll-smooth snap-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`snap-start shrink-0 text-[10px] uppercase tracking-[0.25em] font-bold px-6 sm:px-8 py-3.5 transition-all duration-300 rounded-none border ${
                filter === cat
                  ? 'bg-[#F04E23] border-transparent text-white shadow-md'
                  : 'bg-white border-[#F04E23]/15 text-zinc-500 hover:text-zinc-900 hover:border-[#F04E23]/45'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic masonry representation */}
        <PortfolioMasonry activeCategory={filter} />

        {/* Consultation Call Action Block */}
        <div className="mt-32 text-center py-16 px-6 bg-white border border-[#F04E23]/15 rounded-none space-y-8 shadow-[0_15px_40px_rgba(240,78,35,0.04)] max-w-4xl mx-auto">
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-serif text-zinc-900">Want to plan a dream heritage photoshoot?</h3>
            <p className="text-zinc-600 max-w-md mx-auto font-sans font-light text-xs sm:text-sm leading-relaxed">
              We specialize in custom fort outdoor photography, traditional Wada captures, and royal silk portfolio sessions. Our consultations are free of charge.
            </p>
          </div>
          <Link to="/booking">
            <Button className="bg-[#F04E23] hover:bg-[#D03E15] text-white px-12 h-16 rounded-none uppercase text-[10px] font-bold tracking-[0.3em] transition-all scroll-smooth shadow-md">
              START PLAN SESSION
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PortfolioPage;
