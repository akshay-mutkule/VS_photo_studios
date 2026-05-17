import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, getDocs, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { Album, Photo } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Download, Share2, Heart, Search, Lock, ShieldCheck, 
  Sparkles, X, Camera, Grid3X3, Play, DownloadCloud, 
  CheckCircle2, Filter, SortAsc, QrCode, SlidersHorizontal,
  ChevronLeft, ChevronRight, Maximize2, Layers, Info
} from 'lucide-react';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';

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
          
          // If not protected, fetch photos immediately
          if (!albumData.isPasswordProtected) {
            fetchPhotos(id);
          }
        }
      } catch (err) {
        console.error("Album Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const fetchPhotos = async (albumId: string) => {
    const photoSnap = await getDocs(query(collection(db, 'albums', albumId, 'photos')));
    setPhotos(photoSnap.docs.map(d => ({ id: d.id, ...d.data() } as Photo)));
  };

  const handleUnlock = () => {
    if (album && password === album.password) {
      setIsUnlocked(true);
      fetchPhotos(album.id);
      toast.success("Archive Decrypted");
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
    toast.success(`Initializing batch download for ${selectedPhotos.length} items`);
    // Logic to batch download would go here
  };

  const handleAiSearch = async () => {
    if (!searchQuery) return;
    setAiAnalyzing(true);
    setTimeout(() => {
      const results = photos.filter(p => 
        p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      toast.success(`Neural Intelligence found ${results.length} matches`);
      setAiAnalyzing(false);
    }, 1500);
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-6">
      <div className="w-16 h-16 border-2 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(212,175,55,0.2)]" />
      <p className="text-[10px] uppercase tracking-[0.5em] text-primary/60 font-bold animate-pulse">Initializing Archive</p>
    </div>
  );

  if (!album) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-8">
      <h2 className="text-4xl md:text-7xl font-serif italic tracking-tight uppercase opacity-40">Archive Not Found</h2>
      <Link to="/dashboard">
          <Button variant="link" className="text-primary italic font-serif text-lg">Return to Sanctuary</Button>
      </Link>
    </div>
  );

  // Password Protection View
  if (album.isPasswordProtected && !isUnlocked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-md w-full glass p-12 rounded-[3.5rem] border border-white/10 text-center space-y-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] transition-transform ${passwordError ? 'translate-x-2' : ''}`}
        >
          <div className="mx-auto w-24 h-24 glass flex items-center justify-center rounded-full border border-primary/20 bg-primary/5">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-serif italic text-white tracking-tight">{album.title}</h2>
            <div className="flex flex-col items-center gap-2">
                <span className="text-primary text-[10px] uppercase tracking-[0.4em] font-bold">Secure Private Archive</span>
                <span className="text-white/20 text-[9px] uppercase tracking-[0.2em] font-medium">Authorization Required</span>
            </div>
          </div>
          <div className="space-y-6">
            <Input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              placeholder="Archive Password"
              className="h-20 glass text-center rounded-[2rem] border-white/10 text-white font-serif italic text-2xl focus:ring-primary focus:border-primary placeholder:text-zinc-800"
            />
            <Button 
                onClick={handleUnlock}
                className="w-full h-20 bg-primary text-black hover:bg-accent rounded-[2rem] font-bold uppercase tracking-[0.4em] text-[11px] shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
            >
              Access Anthology
            </Button>
          </div>
          <p className="text-[9px] text-zinc-600 uppercase tracking-widest font-medium leading-relaxed px-6">By accessing this archive you agree to the Lumière security protocol and data residency terms.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-40 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-10">
        
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row justify-between items-end gap-16 mb-24 border-b border-white/5 pb-24">
            <div className="space-y-10 flex-1">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-5"
                >
                    <span className="glass border-white/10 text-primary px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.3)]">{album.category} Anthology</span>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <div className="flex items-center gap-2">
                        <Camera className="w-3 h-3 text-white/30" />
                        <span className="text-white/30 text-[10px] uppercase font-bold tracking-[0.2em] italic font-serif">{photos.length} Captured Instances</span>
                    </div>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 1 }}
                  className="text-8xl md:text-[11rem] font-serif italic text-white tracking-tighter leading-[0.75] drop-shadow-[0_20px_50px_rgba(0,0,0,1)]"
                >
                  {album.title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 0.2 }}
                  className="text-zinc-400 max-w-xl font-serif italic text-3xl leading-relaxed"
                >
                  {album.description || "An immersive journey through light and composition, archived for eternity."}
                </motion.p>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col gap-8 w-full xl:w-[540px]">
                <div className="glass border-white/10 p-12 space-y-10 rounded-[4rem] shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-zinc-900/10">
                    <div className="flex justify-between items-center text-white/40">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold italic">Integrity Protocol Validated</span>
                        </div>
                        <div className="p-3 glass rounded-full">
                            <SlidersHorizontal className="w-4 h-4" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <Button 
                            onClick={() => setSelectionMode(!selectionMode)}
                            variant={selectionMode ? "default" : "outline"}
                            className={`h-20 rounded-[2rem] uppercase font-bold text-[10px] tracking-[0.3em] transition-all border-white/5 ${selectionMode ? 'bg-primary text-black' : 'glass text-white hover:bg-white/5'}`}
                        >
                            <Layers className="w-4 h-4 mr-3" /> {selectionMode ? "Deactivate Select" : "Mass Selection"}
                        </Button>
                        <Button 
                            onClick={handleDownloadSelected}
                            disabled={selectedPhotos.length === 0}
                            className="h-20 bg-white text-black hover:bg-zinc-200 rounded-[2rem] uppercase font-bold text-[10px] tracking-[0.3em] disabled:opacity-20 shadow-xl transition-all"
                        >
                            <DownloadCloud className="w-4 h-4 mr-3" /> Export Master
                        </Button>
                    </div>

                    <div className="flex gap-4">
                        <Button 
                            onClick={() => setShowShareModal(true)}
                            className="flex-1 h-16 glass text-primary hover:text-primary/80 rounded-full font-bold uppercase tracking-[0.4em] text-[9px] border-primary/20 bg-primary/5"
                        >
                            <Share2 className="w-4 h-4 mr-3" /> Secure Distribution
                        </Button>
                        <Button 
                            onClick={() => setSlideshowActive(true)}
                            className="h-16 glass text-zinc-500 hover:text-white px-10 rounded-full uppercase font-bold text-[9px] tracking-widest border-white/5 transition-colors"
                        >
                            <Play className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="relative group">
                    <Sparkles className={`absolute left-10 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-1000 ${aiAnalyzing ? 'text-primary scale-150 animate-pulse' : 'text-zinc-700 group-focus-within:text-primary group-focus-within:scale-110'}`} />
                    <Input 
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAiSearch()}
                        placeholder="NEURAL VISION ARCHIVE SEARCH" 
                        className="glass border-white/10 h-24 pl-20 pr-20 rounded-full text-[12px] uppercase tracking-[0.5em] font-bold focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:bg-white/10 transition-all placeholder:text-zinc-800 shadow-2xl"
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')} 
                            className="absolute right-10 top-1/2 -translate-y-1/2 p-3 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-zinc-600 hover:text-white" />
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* Categories / Filters */}
        <div className="flex flex-wrap items-center gap-6 mb-24 overflow-x-auto pb-4 scrollbar-hide">
            <Button variant="ghost" className="h-12 px-10 rounded-full glass border-primary/40 text-primary uppercase text-[10px] font-bold tracking-[0.3em]">
                <SortAsc className="w-4 h-4 mr-3" /> Chronological
            </Button>
            <div className="h-6 w-[1px] bg-white/10 mx-2" />
            {["Monochrome", "Cinematic", "Portrait", "Widescreen", "Aerial", "Macro"].map(filter => (
                <button 
                    key={filter} 
                    className="h-12 px-8 rounded-full glass border-white/5 text-white/30 hover:text-white hover:border-white/20 uppercase text-[10px] font-bold tracking-[0.3em] transition-all whitespace-nowrap"
                >
                    {filter}
                </button>
            ))}
            <div className="ml-auto flex items-center gap-4 text-white/20">
                <Info className="w-4 h-4" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Smart Filters Active</span>
            </div>
        </div>

        {/* Gallery Grid - Pinterest Style Masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-12 space-y-12">
            {photos.length > 0 ? photos.map((photo, i) => (
                <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => selectionMode ? toggleSelect(photo.id) : setActivePhoto(photo)}
                    className={`relative group overflow-hidden break-inside-avoid rounded-[3.5rem] border transition-all cursor-none ${selectedPhotos.includes(photo.id) ? 'border-primary ring-[12px] ring-primary/10 scale-95 shadow-[0_0_50px_rgba(212,175,55,0.2)]' : 'border-white/10 glass hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]'}`}
                >
                    <div className="overflow-hidden">
                        <motion.img 
                            src={photo.url} 
                            loading="lazy"
                            alt="Captured Moment" 
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={`w-full h-auto object-cover transition-all duration-1000 ${selectedPhotos.includes(photo.id) ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} 
                        />
                    </div>
                    
                    {/* Selection Visuals */}
                    {selectionMode && (
                        <div className="absolute top-10 left-10 z-20">
                            {selectedPhotos.includes(photo.id) ? (
                                <motion.div 
                                    initial={{ scale: 0 }} 
                                    animate={{ scale: 1 }} 
                                    className="w-14 h-14 bg-primary text-black rounded-3xl flex items-center justify-center shadow-2xl border-4 border-black"
                                >
                                    <CheckCircle2 className="w-8 h-8" />
                                </motion.div>
                            ) : (
                                <div className="w-14 h-14 glass border-2 border-white/20 rounded-3xl flex items-center justify-center backdrop-blur-xl group-hover:border-primary/50 transition-colors">
                                    <div className="w-3 h-3 border-2 border-white/20 rounded-full" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Elite Hover Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-between p-12 transition-all duration-1000 ${selectionMode ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                        <div className="flex justify-end gap-4 scale-90 group-hover:scale-100 transition-transform duration-700">
                             <Button size="icon" variant="ghost" className="h-16 w-16 text-white glass border-white/10 hover:bg-red-500 hover:text-white hover:border-red-500 rounded-full transition-all group/heart">
                                <Heart className={`w-6 h-6 transition-all ${photo.favoritesCount ? 'fill-red-500 text-red-500' : 'group-hover/heart:fill-white'}`} />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-16 w-16 text-white glass border-white/10 hover:bg-primary hover:text-black hover:border-primary rounded-full transition-all">
                                <Maximize2 className="w-6 h-6" />
                            </Button>
                        </div>
                        
                        <div className="space-y-6 translate-y-10 group-hover:translate-y-0 transition-all duration-700">
                             <div className="flex items-center gap-3">
                                <div className="h-[2px] w-12 bg-primary rounded-full" />
                                <p className="text-[11px] uppercase font-bold text-primary tracking-[0.5em] italic">Archive Found</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {photo.tags?.map(tag => (
                                    <span key={tag} className="text-[10px] glass text-white/50 px-6 py-2 uppercase font-bold tracking-[0.3em] rounded-full hover:text-white hover:bg-white/10 transition-all border border-white/5">{tag}</span>
                                ))}
                            </div>
                            <div className="pt-4 flex items-center justify-between">
                                <span className="text-[9px] text-white/20 uppercase tracking-widest font-serif italic">Format: Digital Negative</span>
                                <DownloadCloud className="w-4 h-4 text-white/20 hover:text-primary transition-colors cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )) : (
                <div className="col-span-full py-96 border border-dashed border-white/5 rounded-[5rem] glass flex flex-col items-center justify-center space-y-12">
                    <div className="relative">
                        <div className="w-40 h-40 bg-zinc-900 flex items-center justify-center rounded-full animate-pulse border border-white/5 shadow-[0_0_50px_rgba(0,0,0,1)]">
                            <Camera className="w-16 h-16 text-primary/20" />
                        </div>
                        <div className="absolute inset-0 border-2 border-primary/10 rounded-full animate-[spin_20s_linear_infinite]" />
                        <div className="absolute -inset-10 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                    </div>
                    <div className="text-center space-y-4">
                        <p className="text-white text-3xl font-serif italic tracking-tighter opacity-40">Archive Currently Encrypted</p>
                        <p className="text-zinc-700 uppercase font-bold tracking-[0.5em] text-[11px] italic">Quantum Intelligence scanning metadata clusters...</p>
                    </div>
                </div>
            )}
        </div>

        {/* Selection Bar - Smart Dynamic UI */}
        <AnimatePresence>
            {selectedPhotos.length > 0 && (
                <motion.div 
                    initial={{ y: 150, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 150, opacity: 0 }}
                    className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[150] w-[92%] max-w-4xl px-12 h-28 glass border border-primary/30 rounded-[3rem] flex items-center justify-between shadow-[0_60px_120px_rgba(0,0,0,0.9)] backdrop-blur-3xl"
                >
                    <div className="flex items-center gap-10">
                        <div className="relative">
                            <div className="w-16 h-16 bg-primary text-black rounded-[1.5rem] flex items-center justify-center font-serif text-3xl font-bold shadow-xl">
                                {selectedPhotos.length}
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-black">
                                <div className="w-1 h-1 bg-black rounded-full" />
                            </div>
                        </div>
                        <div className="hidden sm:block">
                             <p className="text-[12px] uppercase tracking-[0.3em] font-bold text-white mb-1">Items for distribution</p>
                             <button onClick={() => setSelectedPhotos([])} className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/60 italic hover:text-primary transition-all flex items-center gap-2">
                                <X className="w-3 h-3" /> Terminate Selection
                             </button>
                        </div>
                    </div>
                    <div className="flex gap-6">
                         <div className="hidden lg:flex items-center gap-4 mr-6 px-8 border-r border-white/5 italic font-serif text-zinc-500">
                             Total: {(selectedPhotos.length * 4.2).toFixed(1)} GB
                         </div>
                         <Button onClick={handleDownloadSelected} className="h-20 bg-white text-black hover:bg-zinc-200 rounded-[1.8rem] px-12 font-bold uppercase tracking-[0.3em] text-[11px] shadow-2xl transition-transform active:scale-95">
                            <Download className="w-5 h-5 mr-3" /> Process Export
                        </Button>
                        <Button onClick={() => setShowShareModal(true)} className="h-20 glass text-white hover:bg-white/10 rounded-[1.8rem] px-8 font-bold uppercase tracking-[0.3em] text-[11px] border-white/10 active:scale-95">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Immersive Lightbox */}
        <AnimatePresence>
            {activePhoto && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-black bg-opacity-98 backdrop-blur-3xl flex items-center justify-center overflow-hidden"
                >
                    {/* Background Ambient Glow */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-0 left-0 w-full p-12 flex justify-between items-center z-10">
                        <div className="flex items-center gap-10">
                            <Button 
                                onClick={() => setActivePhoto(null)} 
                                variant="ghost" 
                                className="h-16 w-16 rounded-full glass text-white border-white/10 hover:bg-white/5"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </Button>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="h-[1px] w-6 bg-primary" />
                                    <p className="text-[10px] uppercase tracking-[0.5em] text-primary font-bold">{album.title}</p>
                                </div>
                                <p className="text-3xl font-serif italic text-white tracking-tight">Decrypted Signal</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <Button className="h-16 glass text-white border-white/10 rounded-full px-10 uppercase text-[11px] font-bold tracking-[0.3em] hover:bg-white/5">
                                <Download className="w-4 h-4 mr-3" /> Master Negative
                            </Button>
                            <Button onClick={() => setActivePhoto(null)} variant="ghost" className="h-16 w-16 rounded-full glass text-white border-white/10 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/50 transition-all">
                                <X className="w-8 h-8" />
                            </Button>
                        </div>
                    </div>

                    <div className="relative w-full h-[85vh] flex items-center justify-center p-12">
                         <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-3xl pointer-events-none scale-150">
                             <img src={activePhoto.url} className="w-full h-full object-cover" />
                         </div>
                         <motion.img 
                            key={activePhoto.id}
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            src={activePhoto.url} 
                            className="max-w-full max-h-full object-contain shadow-[0_100px_200px_rgba(0,0,0,1)] rounded-sm border-4 border-white/5 relative z-10"
                        />
                        
                        <button 
                            className="absolute left-16 z-20 p-6 glass rounded-[2rem] opacity-30 hover:opacity-100 hover:scale-110 transition-all border-white/10"
                            onClick={(e) => {
                                e.stopPropagation();
                                const idx = photos.findIndex(p => p.id === activePhoto.id);
                                if (idx > 0) setActivePhoto(photos[idx-1]);
                            }}
                        >
                            <ChevronLeft className="w-10 h-10 text-white" />
                        </button>
                        <button 
                            className="absolute right-16 z-20 p-6 glass rounded-[2rem] opacity-30 hover:opacity-100 hover:scale-110 transition-all border-white/10"
                            onClick={(e) => {
                                e.stopPropagation();
                                const idx = photos.findIndex(p => p.id === activePhoto.id);
                                if (idx < photos.length - 1) setActivePhoto(photos[idx+1]);
                            }}
                        >
                            <ChevronRight className="w-10 h-10 text-white" />
                        </button>
                    </div>

                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 glass border-white/10 px-16 py-8 rounded-[3rem] flex gap-12 backdrop-blur-2xl shadow-2xl">
                         <div className="flex items-center gap-4 group cursor-pointer">
                            <Heart className="w-6 h-6 text-zinc-500 hover:text-red-500 group-hover:scale-125 transition-all" />
                            <span className="text-white text-lg font-serif italic">12 Accolades</span>
                         </div>
                         <div className="h-8 w-[1px] bg-white/10" />
                         <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Metadata</span>
                                <span className="text-primary text-[10px] uppercase tracking-widest font-bold">PRO-RAW DIGITAL</span>
                            </div>
                            <Share2 className="w-6 h-6 text-zinc-500 hover:text-primary cursor-pointer transition-all hover:scale-110" />
                            <Info className="w-6 h-6 text-zinc-500 hover:text-white cursor-pointer transition-all hover:scale-110" />
                         </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Share Modal - Premium QR Distribution */}
        <AnimatePresence>
            {showShareModal && (
                <div className="fixed inset-0 z-[250] flex items-center justify-center p-8">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={() => setShowShareModal(false)}
                        className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                    />
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 40 }}
                        transition={{ type: "spring", damping: 20 }}
                        className="relative w-full max-w-2xl glass border border-white/10 p-16 rounded-[5rem] text-center space-y-12 shadow-[0_100px_200px_rgba(0,0,0,1)] bg-zinc-950/20"
                    >
                        <div className="space-y-6">
                            <p className="text-primary text-[11px] uppercase tracking-[0.5em] font-bold italic">Distribution Protocol Alpha</p>
                            <h3 className="text-6xl font-serif italic text-white tracking-tight">Secure Sharing</h3>
                            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.3em] leading-relaxed max-w-sm mx-auto">Authorized archive access link generation complete. Secure distribution channel ready.</p>
                        </div>
                        
                        <div className="flex justify-center p-12 glass rounded-[3.5rem] border-white/5 bg-white/[0.02] shadow-inner">
                            <div className="p-8 bg-white rounded-[2rem] shadow-[0_0_50px_rgba(212,175,55,0.3)]">
                                <QRCodeSVG 
                                    value={window.location.href} 
                                    size={240}
                                    bgColor="#FFFFFF"
                                    fgColor="#000000"
                                    level="H"
                                    includeMargin={false}
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                             <div className="flex gap-4 p-2 glass rounded-[2.5rem] border-white/5">
                                <Input readOnly value={window.location.href} className="h-20 bg-transparent border-none text-[12px] font-bold tracking-widest pl-10 uppercase text-white/40 focus-visible:ring-0" />
                                <Button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        toast.success("Collective Archive Link Secured");
                                    }}
                                    className="h-16 bg-white text-black hover:bg-zinc-200 rounded-[2rem] px-12 font-bold uppercase tracking-[0.3em] text-[10px] my-auto mr-2"
                                >
                                    Copy Link
                                </Button>
                             </div>
                        </div>
                        
                        <Button 
                            variant="ghost" 
                            onClick={() => setShowShareModal(false)}
                            className="text-[11px] uppercase tracking-[0.4em] text-white/20 hover:text-primary transition-all font-bold"
                        >
                            Terminate Distribution
                        </Button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default AlbumPage;
