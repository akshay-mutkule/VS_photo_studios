import React, { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import FeaturedAlbums from '@/components/home/FeaturedAlbums';
import Categories from '@/components/home/Categories';
import { BeforeAfterSlider } from '@/components/home/BeforeAfterSlider';
import PortfolioMasonry from '@/components/home/PortfolioMasonry';
import AboutAndAwards from '@/components/home/AboutAndAwards';
import { motion, useScroll } from 'motion/react';

const HomePage: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="bg-[#FCFAF6] overflow-hidden min-h-screen">
      {/* Real-time Scroll Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A37E43] to-[#B8975A] origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Primary Landing Content */}
      <Hero />
      <FeaturedAlbums />
      <Categories />
      <BeforeAfterSlider />

      {/* Featured captures section inside homepage holding high-end masonry */}
      <div className="py-24 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#A37E43]">
            SACRED RECOLLECTIONS • CURATED VISUAL HIGHLIGHTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-zinc-900 tracking-tight">
            Trending <span className="italic text-[#A37E43]">Captures</span>
          </h2>
          <div className="h-[2px] w-16 bg-gradient-to-r from-[#A37E43] to-[#B8975A] mx-auto" />
        </div>
        <PortfolioMasonry activeCategory="All" />
      </div>

      <AboutAndAwards />
    </div>
  );
};

export default HomePage;
