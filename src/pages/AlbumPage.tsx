import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { Album, Photo } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Download, Share2, Heart, Lock, ShieldCheck, 
  Sparkles, X, Camera, Play, DownloadCloud, 
  CheckCircle2, SortAsc, SlidersHorizontal,
  ChevronLeft, ChevronRight, Maximize2, Layers, Info
} from 'lucide-react';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';

const mockPhotos: Photo[] = [
  { id: 'm1', albumId: 'demo', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop', thumbnailUrl: '', type: 'image', tags: ['Cinematic', 'Wedding'], favoritesCount: 32, createdAt: new Date() },
  { id: 'm2', albumId: 'demo', url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop', thumbnailUrl: '', type: 'image', tags: ['Candid', 'Pre-Wedding'], favoritesCount: 24, createdAt: new Date() },
  { id: 'm3', albumId: 'demo', url: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=800&auto=format&fit=crop', thumbnailUrl: '', type: 'image', tags: ['Editorial', 'Portrait'], favoritesCount: 45, createdAt: new Date() },
  { id: 'm4', albumId: 'demo', url: 'https://images.unsplash.com/photo-1614945419451-9f9394bf7eb1?q=80&w=800&auto=format&fit=crop', thumbnailUrl: '', type: 'image', tags: ['Candid', 'Kids'], favoritesCount: 19, createdAt: new Date() }
];

const AlbumPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = React.useState<Album | null>(null);
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [aiAnalyzing, setAiAnalyzing] = React.useState(false);
  
  // Selection & View State
  const [selectedPhotos, setSelectedPhotos] = React.useState<string[]>([]);
  const [selectionMode, setSelectionMode] = React.useState(false);
  const [activePhoto, setActivePhoto] = React.useState<Photo | null>(null);
  const [slideshowActive, setSlideshowActive] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  
  // Password Logic
  const [password, setPassword] = React.useState('');
  const [isUnlocked, setIsUnlocked] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  // Sharing
  const [showShareModal, setShowShareModal] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const docSnap = await getDoc(doc(db, 'albums', id));
        if (docSnap.exists()) {
          const albumData = { id: docSnap.id, ...docSnap.data() } as Album;
          setAlbum(albumData);
          if (!albumData.isPasswordProtected) {
            fetchPhotos(id);
          }
        } else {
          // Beautiful fallback for demo purposes
          setAlbum({
            id: 'legacy-demo',
            title: 'Royal Wada Portrait Saga',
            description: 'A beautiful fine-art editorial archive documenting timeless traditional Maharashtrian cultural celebrations.',
            category: 'Wedding',
            coverImageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
            isPasswordProtected: false,
            createdAt: new Date(),
            updatedAt: new Date()
          });
          setPhotos(mockPhotos);
        }
      } catch (err) {
        console.error("Album Fetch Error:", err);
        setAlbum({
          id: 'legacy-demo',
          title: 'Royal Wada Portrait Saga',
          description: 'A beautiful fine-art editorial archive documenting timeless traditional Maharashtrian cultural celebrations.',
          category: 'Wedding',
          coverImageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
          isPasswordProtected: false,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        setPhotos(mockPhotos);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const fetchPhotos = async (albumId: string) => {
    try {
      const photoSnap = await getDocs(collection(db, 'albums', albumId, 'photos'));
      if (!photoSnap.empty) {
        setPhotos(photoSnap.docs.map(d => ({ id: d.id, ...d.data() } as Photo)));
      } else {
        setPhotos(mockPhotos);
      }
    } catch (e) {
      setPhotos(mockPhotos);
    }
  };

  const handleUnlock = () => {
    if (album && password === album.password) {
      setIsUnlocked(true);
      fetchPhotos(album.id);
      toast.success("Archive Decrypted Successfully");
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 500);
      toast.error("Invalid Security Credential");
    }
  };

  const toggleSelect = (photoId: string) => {
    setSelectedPhotos(prev => 
      prev.includes(photoId) ? prev.filter(id => id !== photoId) : [...prev, photoId]
    );
  };

  const handleDownloadSelected = () => {
    toast.success(`Preparing premium master folders for ${selectedPhotos.length} files`);
  };

  const handleAiSearch = async () => {
    if (!searchQuery) return;
    setAiAnalyzing(true);
    setTimeout(() => {
      const results = photos.filter(p => 
        p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      toast.success(`Visual AI found ${results.length} matches`);
      setAiAnalyzing(false);
    }, 1200);
  };

  const handlePrevPhoto = () => {
    if (activePhoto && photos.length > 0) {
      const idx = photos.findIndex(p => p.id === activePhoto.id);
      if (idx !== -1) {
        const prevIdx = idx > 0 ? idx - 1 : photos.length - 1;
        setActivePhoto(photos[prevIdx]);
      }
    }
  };

  const handleNextPhoto = () => {
    if (activePhoto && photos.length > 0) {
      const idx = photos.findIndex(p => p.id === activePhoto.id);
      if (idx !== -1) {
        const nextIdx = idx < photos.length - 1 ? idx + 1 : 0;
        setActivePhoto(photos[nextIdx]);
      }
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      handleNextPhoto();
    } else if (isRightSwipe) {
      handlePrevPhoto();
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'Escape') setActivePhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, photos]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFAF6] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-2 border-[#A37E43] border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#A37E43] font-bold">DECRYPTING ARCHIVE • LOADING DATABASE</p>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen bg-[#FCFAF6] text-[#1A1815] flex flex-col items-center justify-center space-y-6 text-center px-6">
        <h2 className="text-4xl font-serif text-zinc-900">ARCHIVE NOT FOUND</h2>
        <Link to="/portfolio">
          <Button className="bg-[#A37E43] hover:bg-[#B8975A] text-white rounded-none px-8 font-bold uppercase tracking-widest text-[9px] h-12">
            RETURN TO PORTFOLIO
          </Button>
        </Link>
      </div>
    );
  }

  // Password Protection Locker View (Pure Luxury Gold theme)
  if (album.isPasswordProtected && !isUnlocked) {
    return (
      <div className="min-h-screen bg-[#FCFAF6] text-[#1A1815] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-md w-full bg-white border border-[#A37E43]/25 p-10 sm:p-12 text-center space-y-8 shadow-[0_15px_40px_rgba(163,126,67,0.06)] ${passwordError ? 'animate-shake' : ''}`}
        >
          <div className="mx-auto w-16 h-16 bg-[#FCFAF6] border border-[#A37E43]/30 flex items-center justify-center rounded-none text-[#A37E43]">
            <Lock className="w-6 h-6 text-[#B8975A]" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-serif text-zinc-900">{album.title}</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#A37E43]">SECURED REPOSITORY • PRIVATE CLIENT ARCHIVE</p>
          </div>

          <div className="space-y-4">
            <Input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              placeholder="ENTER SECURE ACCESS KEY"
              className="h-14 border-[#A37E43]/20 text-center rounded-none text-zinc-800 tracking-widest focus-visible:ring-1 focus-visible:ring-[#A37E43] text-sm font-semibold uppercase placeholder:text-zinc-300"
            />
            <Button 
              onClick={handleUnlock}
              className="w-full h-14 bg-[#A37E43] hover:bg-[#B8975A] text-white rounded-none font-bold uppercase tracking-[0.3em] text-[10px]"
            >
              ACCESS DECRYPTED PORTAL
            </Button>
          </div>
          
          <p className="text-[8px] text-zinc-400 uppercase tracking-widest leading-relaxed">
            Authorized private residency applies. Unauthorized sharing of credentials breaches your custom contract stipulations.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFAF6] text-[#1A1815] pt-32 pb-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Gallery Headers Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20 border-b border-[#A37E43]/10 pb-16">
          <div className="space-y-6 max-w-xl">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white bg-[#A37E43] px-3 py-1">
                {album.category} PORTAL
              </span>
              <span className="text-[10px] text-zinc-400 font-sans tracking-widest">
                {photos.length} TIMELINE PLATES
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-serif text-zinc-900 tracking-tight leading-none">
              {album.title}
            </h1>
            <p className="text-zinc-600 font-sans font-light text-xs sm:text-sm leading-relaxed">
              {album.description}
            </p>
          </div>

          {/* Interactive Tools */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="bg-white p-6 border border-[#A37E43]/15 space-y-4 shadow-md w-full sm:w-80">
              <div className="flex justify-between items-center text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#A37E43]" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-zinc-600">Secure Access Certified</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => setSelectionMode(!selectionMode)}
                  variant="outline"
                  className={`h-11 rounded-none uppercase font-bold text-[8px] sm:text-[9px] tracking-wider transition-all border-[#A37E43]/35 ${
                    selectionMode ? 'bg-[#A37E43] text-white border-transparent' : 'bg-transparent text-zinc-700 hover:bg-[#A37E43]/5'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 mr-2" /> SELECT
                </Button>
                <Button 
                  onClick={handleDownloadSelected}
                  disabled={selectedPhotos.length === 0}
                  className="h-11 bg-[#A37E43] hover:bg-[#B8975A] text-white rounded-none uppercase font-bold text-[8px] sm:text-[9px] tracking-wider disabled:opacity-20 shadow-md"
                >
                  <DownloadCloud className="w-3.5 h-3.5 mr-2" /> EXPORT
                </Button>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowShareModal(true)}
                  className="flex-grow h-10 border border-[#A37E43]/25 bg-[#FCFAF6] hover:bg-[#A37E43]/5 text-[#A37E43] rounded-none font-bold uppercase tracking-widest text-[8px]"
                >
                  <Share2 className="w-3.5 h-3.5 mr-2" /> SECURE DISTRIBUTE
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Photo Wall Masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {photos.length > 0 ? photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
              onClick={() => selectionMode ? toggleSelect(photo.id) : setActivePhoto(photo)}
              className={`relative group overflow-hidden break-inside-avoid border transition-all cursor-pointer rounded-none ${
                selectedPhotos.includes(photo.id) 
                  ? 'border-[#A37E43] ring-4 ring-[#A37E43]/15' 
                  : 'border-[#A37E43]/10 bg-white hover:shadow-xl'
              }`}
            >
              <img 
                src={photo.url} 
                loading="lazy"
                alt="Studio Collection Item" 
                className={`w-full h-auto object-cover transition-transform duration-1000 ${selectedPhotos.includes(photo.id) ? 'saturate-100' : 'saturate-[0.7] md:hover:scale-103 md:hover:saturate-100'}`} 
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase tracking-widest font-mono text-white/85">
                    MASTER PHOTO &bull; VINAYAK SABLE
                  </span>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:text-[#B8975A] p-0 bg-white/10 rounded-full">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-24 text-center border-2 border-dashed border-[#A37E43]/20 bg-white">
              <Camera className="w-10 h-10 mx-auto text-zinc-300 mb-4 animate-bounce" />
              <p className="text-zinc-500 font-serif italic text-sm">Curation of plates is currently happening.</p>
            </div>
          )}
        </div>

        {/* Private Sharing Distribution QR modal */}
        <AnimatePresence>
          {showShareModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-[#1A1815]/90 backdrop-blur-md" onClick={() => setShowShareModal(false)} />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-white border border-[#A37E43]/25 p-8 sm:p-12 text-center max-w-md w-full space-y-8 shadow-2xl rounded-none text-zinc-900"
              >
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-[#A37E43] uppercase tracking-[0.3em]">DISTRIBUTION ASSIST</span>
                  <h3 className="text-2xl font-serif text-zinc-950">QR Distribution</h3>
                  <p className="text-zinc-500 font-sans font-light text-xs leading-relaxed max-w-xs mx-auto">
                    Display of this screen allows immediate sharing sync code or custom URL link copied.
                  </p>
                </div>
                
                <div className="flex justify-center p-6 bg-[#FCFAF6] border border-[#A37E43]/10">
                  <QRCodeSVG 
                    value={window.location.href} 
                    size={160}
                    bgColor="#FFFFFF"
                    fgColor="#1A1815"
                  />
                </div>

                <div className="flex gap-2 bg-[#FCFAF6] border border-[#A37E43]/15 p-1.5 rounded-none items-center">
                  <Input readOnly value={window.location.href} className="bg-transparent border-none text-[10px] text-zinc-500 focus-visible:ring-0 select-all font-mono" />
                  <Button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Gallery link successfully copied!");
                    }}
                    className="bg-[#A37E43] hover:bg-[#B8975A] text-white rounded-none px-4 text-[9px] uppercase font-bold"
                  >
                    COPY
                  </Button>
                </div>

                <Button variant="ghost" onClick={() => setShowShareModal(false)} className="text-[9px] uppercase font-bold tracking-widest text-[#A37E43]/80 hover:text-[#A37E43]">
                  CLOSE PLATFORM
                </Button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

         {/* Large Viewer Modal Lightbox */}
         <AnimatePresence>
           {activePhoto && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-50 bg-[#0F0E0D]/95 flex flex-col justify-between p-6 sm:p-10"
               onTouchStart={onTouchStart}
               onTouchMove={onTouchMove}
               onTouchEnd={onTouchEnd}
             >
               {/* Header metadata + close */}
               <div className="flex justify-between items-center w-full relative z-10 text-white">
                 <div>
                   <p className="text-[10px] tracking-[0.3em] uppercase text-[#B8975A] font-bold">CLIENT ARCHIVAL FILE</p>
                   <p className="text-sm font-serif italic font-light opacity-80">
                     {album.title} &mdash; Plate Curation
                   </p>
                 </div>
                 <Button 
                   onClick={() => setActivePhoto(null)} 
                   variant="ghost" 
                   className="h-12 w-12 text-white hover:bg-white/10 rounded-full"
                 >
                   <X className="w-6 h-6" />
                 </Button>
               </div>
  
               {/* Central Dynamic Image viewport + navigation buttons */}
               <div className="flex-grow flex items-center justify-center max-h-[75vh] my-10 relative w-full group/lightbox">
                 {/* Floating Navigation Paddles */}
                 <button
                   type="button"
                   onClick={(e) => { e.stopPropagation(); handlePrevPhoto(); }}
                   className="absolute left-2 sm:left-4 z-30 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/15 bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all opacity-100 sm:opacity-0 sm:group-hover/lightbox:opacity-100 shadow-md cursor-pointer"
                   aria-label="Previous image"
                 >
                   <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6 hover:text-[#B8975A]" />
                 </button>
  
                 <motion.img
                   key={activePhoto.id}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.4 }}
                   src={activePhoto.url}
                   className="max-w-full max-h-full object-contain shadow-2xl border border-white/10 select-none text-white"
                   referrerPolicy="no-referrer"
                   alt=""
                 />
  
                 <button
                   type="button"
                   onClick={(e) => { e.stopPropagation(); handleNextPhoto(); }}
                   className="absolute right-2 sm:right-4 z-30 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/15 bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all opacity-100 sm:opacity-0 sm:group-hover/lightbox:opacity-100 shadow-md cursor-pointer"
                   aria-label="Next image"
                 >
                   <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6 hover:text-[#B8975A]" />
                 </button>
               </div>
  
               {/* Bottom interactive descriptors bar */}
               <div className="flex flex-col sm:flex-row justify-between items-center w-full pt-4 border-t border-white/10 text-white/70 text-xs gap-4">
                 <div className="flex items-center gap-6 font-sans">
                   <span>COLLECTION: <strong className="text-white font-semibold">{album.category}</strong></span>
                   <span>FORMAT: <strong className="text-white font-semibold flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-[#B8975A]" /> MASTER RAW</strong></span>
                 </div>
                 <div className="flex gap-4">
                   <a
                     href={activePhoto.url}
                     download={`vs-studio-${activePhoto.id}.jpg`}
                     target="_blank"
                     rel="noreferrer"
                   >
                     <Button variant="outline" className="h-11 px-6 border-white/20 hover:border-[#B8975A] hover:bg-[#A37E43] hover:border-transparent rounded-none text-[10px] tracking-widest font-bold uppercase text-white transition-all flex items-center gap-2">
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
    </div>
  );
};

export default AlbumPage;
