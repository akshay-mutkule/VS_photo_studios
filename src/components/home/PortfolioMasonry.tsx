import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, Share2, X, Download, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface GalleryPhoto {
  id: number;
  url: string;
  category: 'Wedding' | 'Pre-Wedding' | 'Portrait' | 'Fashion' | 'Events' | 'Travel';
  title: string;
  location: string;
  tall?: boolean;
}

const initialPhotos: GalleryPhoto[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=800&auto=format&fit=crop', category: 'Wedding', title: 'Ethereal Veil', location: 'Amalfi, Italy', tall: true },
  { id: 2, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop', category: 'Wedding', title: 'Eternal Promise', location: 'Provence, France', tall: false },
  { id: 3, url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop', category: 'Fashion', title: 'Silk & Sand', location: 'Paris, France', tall: true },
  { id: 4, url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop', category: 'Pre-Wedding', title: 'Golden Embrace', location: 'Kyoto, Japan', tall: false },
  { id: 5, url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop', category: 'Portrait', title: 'Serene Focus', location: 'Studio', tall: true },
  { id: 6, url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop', category: 'Events', title: 'Symphony Gala', location: 'New York, USA', tall: false },
  { id: 7, url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop', category: 'Travel', title: 'Distant Horizons', location: 'Cappadocia, Turkey', tall: true },
  { id: 8, url: 'https://images.unsplash.com/photo-1591555200843-098737e9dcf8?q=80&w=800&auto=format&fit=crop', category: 'Fashion', title: 'Sculptured Shadow', location: 'Milan, Italy', tall: true },
  { id: 9, url: 'https://images.unsplash.com/photo-1519225495810-7517ccd66cbf?q=80&w=800&auto=format&fit=crop', category: 'Pre-Wedding', title: 'Whispering Winds', location: 'Santorini, Greece', tall: false },
];

interface PortfolioMasonryProps {
  activeCategory?: string;
}

const PortfolioMasonry: React.FC<PortfolioMasonryProps> = ({ activeCategory = 'All' }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [likes, setLikes] = useState<Record<number, boolean>>({});

  const filteredPhotos = activeCategory === 'All' 
    ? initialPhotos 
    : initialPhotos.filter(photo => photo.category.toLowerCase() === activeCategory.toLowerCase());

  const handleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (photo: GalleryPhoto, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: photo.title,
        text: `Timeless photography by VS: ${photo.title}`,
        url: photo.url,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(photo.url);
      alert('Photo link copied to clipboard!');
    }
  };

  return (
    <section className="py-12 bg-transparent">
      <div className="w-full">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-[#A37E43]/20 bg-stone-50">
            <p className="text-zinc-400 font-serif italic text-sm">No captures uploaded in this collection yet.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredPhotos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.3) }}
                className="relative group overflow-hidden break-inside-avoid border border-[#A37E43]/10 bg-white cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              >
                {/* Soft glow animation */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105 filter saturate-75 group-hover:saturate-100"
                />

                {/* Info Overlay (Editorial details) */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[9px] font-sans tracking-[0.2em] uppercase font-bold text-[#FCFAF6] bg-[#A37E43] px-2 py-0.5">
                      {photo.category}
                    </span>
                    <span className="text-[10px] text-white/70 font-sans tracking-wider font-light">
                      {photo.location}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-xl sm:text-2xl font-serif italic text-white leading-tight font-medium">
                        {photo.title}
                      </h4>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => handleLike(photo.id, e)}
                        className={`h-9 w-9 rounded-full bg-white/15 backdrop-blur-md border border-white/10 hover:bg-[#B8975A] hover:border-transparent text-white transition-colors`}
                      >
                        <Heart className={`w-4 h-4 ${likes[photo.id] ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => handleShare(photo, e)}
                        className="h-9 w-9 rounded-full bg-white/15 backdrop-blur-md border border-white/10 hover:bg-white/30 text-white transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Cinematic Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#1A1815]/95 flex flex-col justify-between p-6 sm:p-10"
            >
              {/* Close controls */}
              <div className="flex justify-between items-center w-full relative z-10 text-white">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#B8975A] font-bold">VS GALLERY ESSAY</p>
                  <p className="text-sm font-serif italic font-light opacity-80">
                    {filteredPhotos[lightboxIndex]?.title} &mdash; {filteredPhotos[lightboxIndex]?.location}
                  </p>
                </div>
                <Button
                  onClick={() => setLightboxIndex(null)}
                  variant="ghost"
                  className="h-12 w-12 text-white hover:bg-white/10 rounded-full"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Central Large image displays */}
              <div className="flex-grow flex items-center justify-center max-h-[75vh] my-10">
                <motion.img
                  key={filteredPhotos[lightboxIndex]?.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={filteredPhotos[lightboxIndex]?.url}
                  alt={filteredPhotos[lightboxIndex]?.title}
                  className="max-w-full max-h-full object-contain shadow-2xl border border-white/10"
                />
              </div>

              {/* Bottom interactive descriptors bar */}
              <div className="flex flex-col sm:flex-row justify-between items-center w-full pt-4 border-t border-white/10 text-white/70 text-xs gap-4">
                <div className="flex items-center gap-6 font-sans">
                  <span>CATEGORY: <strong className="text-white font-semibold">{filteredPhotos[lightboxIndex]?.category}</strong></span>
                  <span>FORMAT: <strong className="text-white font-semibold">HASSELBLAD RAW</strong></span>
                </div>
                <div className="flex gap-4">
                  <a
                    href={filteredPhotos[lightboxIndex]?.url}
                    download={`vs-studio-${filteredPhotos[lightboxIndex]?.id}.jpg`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button variant="outline" className="h-11 px-6 border-white/20 hover:border-white hover:bg-[#B8975A] hover:border-transparent rounded-none text-[10px] tracking-widest font-bold uppercase text-white transition-all flex items-center gap-2">
                      <Download className="w-3.5 h-3.5" />
                      DOWNLOAD HIGH RESOLUTION
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortfolioMasonry;
