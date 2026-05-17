import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedAlbums from '@/components/home/FeaturedAlbums';
import Categories from '@/components/home/Categories';
import PortfolioMasonry from '@/components/home/PortfolioMasonry';
import AboutAndAwards from '@/components/home/AboutAndAwards';

const HomePage: React.FC = () => {
  return (
    <div className="bg-black overflow-hidden">
      <Hero />
      <FeaturedAlbums />
      <Categories />
      <PortfolioMasonry />
      <AboutAndAwards />
    </div>
  );
};

export default HomePage;
