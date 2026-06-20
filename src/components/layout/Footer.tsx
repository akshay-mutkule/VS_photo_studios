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
              <span className="text-4xl font-serif text-white tracking-wider">विनायक साबळे</span>
              <span className="text-[10px] tracking-[0.45em] uppercase text-[#FFC20E] mt-2 font-bold">सत्यं शिवं सुंदरम् • PUNE, MH</span>
            </div>
            <p className="text-zinc-400 max-w-sm font-serif italic leading-relaxed text-sm">
              महाराष्ट्राच्या भव्य विवाह सोहळ्यांचे आणि राजेशाही थाटाचे सोनेरी क्षणचित्रे टिपणारे अव्वल छायाचित्रण दालन.
            </p>
          </div>
          
          <div className="space-y-6">
            <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Studio Archive</h5>
            <ul className="space-y-4 text-[11px] uppercase tracking-widest font-bold">
              <li><a href="/about" className="text-zinc-400 hover:text-[#FFC20E] transition-colors">About Studio</a></li>
              <li><a href="/portfolio" className="text-zinc-400 hover:text-[#FFC20E] transition-colors">Portfolios</a></li>
              <li><a href="/booking" className="text-zinc-400 hover:text-[#FFC20E] transition-colors">Commissions</a></li>
              <li><a href="/contact" className="text-zinc-400 hover:text-[#FFC20E] transition-colors">Contact Studio</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Connect</h5>
            <ul className="space-y-4 text-[11px] uppercase tracking-widest font-bold">
              <li><a href="https://www.instagram.com/vinayak_sable_photographey?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#FFC20E] transition-colors">Instagram</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-[#FFC20E] transition-colors">Vogue Archive</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-[#FFC20E] transition-colors">Behance</a></li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/5 mb-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center md:text-left">
            <span>© 2026 VINAYAK SABLE PHOTOGRAPHY</span>
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
