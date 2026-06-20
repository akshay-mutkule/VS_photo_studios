import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Camera, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, query, limit, getDocs, orderBy } from 'firebase/firestore';
import { Album } from '@/types';
import { Link } from 'react-router-dom';

const fallbackAlbums: Album[] = [
  {
    id: 'kolhapuri-shahi-sohala',
    title: 'Kolhapuri Shahi Wedding',
    description: 'A beautiful royal wedding photoshoot showcasing the grand Karveer heritage, rich Paithani colors, and traditional Maharashtrian rituals with gold-tinted evening twilight of Kolhapur.',
    category: 'Wedding',
    coverImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    isPasswordProtected: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'shaniwar-wada-prewedding',
    title: 'Shaniwar Wada Pre-Wedding',
    description: 'A grand architectural pre-wedding portrait session around Pune\'s majestic Shaniwar Wada. Capturing authentic love stories set against ancient Maratha fortresses, massive stone alcoves, and historical pillars.',
    category: 'Pre-Wedding',
    coverImageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop',
    isPasswordProtected: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'pune-heritage-wada',
    title: 'Pune Heritage Wada Portrait',
    description: 'A classic editorial traditional portrait shoot inside a gorgeous wooden Pune Wada. Highlighting pure silk garments, authentic Nauvari draping, royal pearl ornaments, and radiant marigold decorations.',
    category: 'Traditional',
    coverImageUrl: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=400&auto=format&fit=crop',
    isPasswordProtected: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const FeaturedAlbums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const q = query(collection(db, 'albums'), orderBy('createdAt', 'desc'), limit(3));
        const snap = await getDocs(q);
        if (!snap.empty) {
          setAlbums(snap.docs.map(d => ({ id: d.id, ...d.data() } as Album)));
        } else {
          setAlbums(fallbackAlbums);
        }
      } catch (err) {
        console.error("Fetch Albums Error (using beautiful fallbacks):", err);
        setAlbums(fallbackAlbums);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  return (
    <section className="py-32 bg-[#FCF8F2] border-t border-[#F04E23]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col items-center text-center mb-24 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-[#F04E23] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC20E] animate-pulse" /> REGAL COLLECTION • SACRED GALLERY
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif text-zinc-900 tracking-tight leading-none">
            Featured <span className="italic text-[#F04E23]">Shoots</span>
          </h2>
        </div>

        <div className="space-y-36">
          {albums.map((album, i) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-3/5 group relative overflow-hidden rounded-none border border-[#F04E23]/15 bg-white shadow-md">
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors z-10 duration-700" />
                <div className="aspect-[16/10] overflow-hidden bg-stone-50">
                  <motion.img
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={album.coverImageUrl}
                    alt={album.title}
                    className="w-full h-full object-cover filter saturate-[0.6] hover:saturate-100 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Floating Meta tags */}
                <div className="absolute bottom-6 right-6 z-20 bg-white/95 backdrop-blur-md px-4 py-3 border border-[#F04E23]/20 shadow-lg">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-0.5">Shoot Type</p>
                  <p className="text-xs font-serif italic text-[#F04E23] font-bold">{album.category}</p>
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full lg:w-2/5 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-[2px] w-6 bg-gradient-to-r from-[#F04E23] to-[#FFC20E]" />
                    <span className="text-[10px] uppercase tracking-widest text-[#F04E23] font-bold">Story {i + 1}</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-serif text-zinc-900 tracking-tight leading-tight">{album.title}</h3>
                  <div className="flex flex-wrap gap-6 text-[10px] text-zinc-400 uppercase tracking-[0.15em] font-medium">
                    <span className="flex items-center gap-1.5">Style: <span className="text-zinc-700 font-bold">{album.category}</span></span>
                    <span className="flex items-center gap-1.5">Camera: <span className="text-zinc-700 font-bold">Medium Format & Cine DSLR</span></span>
                  </div>
                </div>

                <p className="text-zinc-600 leading-relaxed text-sm font-light font-sans pl-6 border-l-2 border-[#F04E23]/25">
                  {album.description}
                </p>

                <div className="pt-2">
                  <Link to={`/album/${album.id}`}>
                    <Button variant="link" className="text-zinc-900 hover:text-[#F04E23] p-0 h-auto group text-[10px] uppercase tracking-[0.3em] font-bold">
                      View Full Album
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300 text-[#FFC20E]" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <Link to="/portfolio">
            <Button size="lg" className="bg-[#F04E23] hover:bg-[#D03E15] text-white rounded-none px-12 h-16 uppercase text-[10px] tracking-[0.3em] font-bold transition-all duration-300 shadow-md">
              EXPLORE ALL ALBUMS
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedAlbums;
