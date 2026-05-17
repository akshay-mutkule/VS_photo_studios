import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Calendar, MapPin, ArrowRight, Users, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, query, limit, getDocs, orderBy } from 'firebase/firestore';
import { Album } from '@/types';
import { Link } from 'react-router-dom';

const FeaturedAlbums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const q = query(collection(db, 'albums'), orderBy('createdAt', 'desc'), limit(3));
        const snap = await getDocs(q);
        setAlbums(snap.docs.map(d => ({ id: d.id, ...d.data() } as Album)));
      } catch (err) {
        console.error("Fetch Albums Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  if (loading) return null;

  return (
    <section className="py-32 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-col items-center text-center mb-32 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary">Archive of light</span>
          <h2 className="text-6xl md:text-8xl font-serif italic text-white tracking-tight leading-none">
            Selected <span className="opacity-30">Stories</span>
          </h2>
        </div>

        <div className="space-y-48">
          {albums.length > 0 ? albums.map((album, i) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-32 items-center`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-3/5 group relative overflow-hidden rounded-3xl border border-white/10 glass">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
                <div className="aspect-[16/10] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={album.coverImageUrl}
                    alt={album.title}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                  />
                </div>
                {/* Floating Meta */}
                <div className="absolute bottom-10 right-10 z-20 glass p-5 rounded-2xl hidden md:block">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-bold mb-1">Production Genre</p>
                  <p className="text-xs font-serif italic text-white">{album.category}</p>
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full lg:w-2/5 space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-8 bg-primary/40" />
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Volume III • Archival Record {i + 1}</span>
                  </div>
                  <h3 className="text-5xl md:text-6xl font-serif italic text-white tracking-tight leading-tight">{album.title}</h3>
                  <div className="flex flex-wrap gap-8 text-[11px] text-white/40 uppercase tracking-[0.15em] font-medium">
                    <span className="flex items-center gap-2">Category: <span className="text-white/80">{album.category}</span></span>
                    <span className="flex items-center gap-2">Origin: <span className="text-white/80">VS Cinematic Studio</span></span>
                  </div>
                </div>

                <p className="text-zinc-500 leading-relaxed text-base italic font-light font-serif pl-8 border-l border-white/10">
                  {album.description || "Exploring the subtle interplay between architectural geometry and human vulnerability. A cinematic documentation of presence."}
                </p>

                <Link to={`/album/${album.id}`}>
                  <Button variant="link" className="text-white hover:text-primary p-0 h-auto group text-[10px] uppercase tracking-[0.3em] font-bold">
                    Enter Gallery
                    <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-4 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )) : (
            <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-3xl glass opacity-20">
              <Camera className="w-12 h-12 mx-auto mb-4" />
              <p className="text-[10px] uppercase tracking-widest font-bold">No active collections found in archive</p>
            </div>
          )}
        </div>

        <div className="mt-48 text-center">
          <Link to="/portfolio">
            <Button size="lg" className="bg-transparent border border-white/10 hover:border-primary hover:bg-primary hover:text-black rounded-full px-16 h-16 uppercase text-[11px] tracking-[0.3em] font-bold transition-all duration-700">
              View Global Archives
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedAlbums;
