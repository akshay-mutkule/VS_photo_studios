import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex flex-col">
              <span className="text-4xl font-serif italic text-white tracking-tight">VS Studio</span>
              <span className="text-[10px] tracking-[0.6em] uppercase text-white/30 mt-2">Visual Anthropology</span>
            </div>
            <p className="text-zinc-500 max-w-sm font-serif italic leading-relaxed text-lg">
              Preserving the transient beauty of existence through avant-garde cinematic processing.
            </p>
          </div>
          
          <div className="space-y-6">
            <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Studio Archive</h5>
            <ul className="space-y-4 text-[11px] uppercase tracking-widest font-bold">
              <li><a href="/portfolio" className="text-zinc-400 hover:text-primary transition-colors">Portfolios</a></li>
              <li><a href="/#categories" className="text-zinc-400 hover:text-primary transition-colors">Collections</a></li>
              <li><a href="/booking" className="text-zinc-400 hover:text-primary transition-colors">Commissions</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Connect</h5>
            <ul className="space-y-4 text-[11px] uppercase tracking-widest font-bold">
              <li><a href="#" className="text-zinc-400 hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-primary transition-colors">Vogue Archive</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-primary transition-colors">Behance</a></li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/5 mb-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">
          <div className="flex gap-8">
            <span>© 2026 VS CINEMATIC STUDIO</span>
            <span>Privacy Policy</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-primary hover:text-accent transition-colors cursor-pointer">
              <Phone className="w-3 h-3" />
              <span>HQ +91 9075910381</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-2 text-primary hover:text-accent transition-colors cursor-pointer">
              <Mail className="w-3 h-3" />
              <span>Archive@VS.studio</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
