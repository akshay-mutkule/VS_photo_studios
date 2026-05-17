import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Album, Booking } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Camera, Calendar, CreditCard, Download, ExternalLink, Settings, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user, profile } = useAuth();
  const [albums, setAlbums] = React.useState<Album[]>([]);
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        // Fetch client albums
        const albumsQuery = query(collection(db, 'albums'), where('clientEmail', '==', user.email));
        const albumSnap = await getDocs(albumsQuery);
        setAlbums(albumSnap.docs.map(d => ({ id: d.id, ...d.data() } as Album)));

        // Fetch bookings
        const bookingsQuery = query(collection(db, 'bookings'), where('clientId', '==', user.uid), orderBy('date', 'desc'));
        const bookingSnap = await getDocs(bookingsQuery);
        setBookings(bookingSnap.docs.map(d => ({ id: d.id, ...d.data() } as Booking)));
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-primary/40" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary italic">Welcome Back</span>
            </div>
            <h1 className="text-5xl font-serif italic text-white tracking-tight leading-tight">{profile?.displayName || 'Studio Client'}</h1>
            <p className="text-zinc-500 font-serif italic">Your personal photography sanctuary and archive.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="border-white/10 hover:bg-white/5 uppercase font-bold text-[10px] tracking-widest px-8 h-12 rounded-full glass">
              <Settings className="w-4 h-4 mr-2" /> Port Configuration
            </Button>
            <Link to="/booking">
                <Button className="bg-primary hover:bg-accent text-black uppercase font-bold text-[10px] tracking-widest px-8 h-12 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                New Production
                </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="gallery" className="space-y-12">
          <TabsList className="glass border-white/10 p-1 rounded-full inline-flex mb-8 overflow-hidden">
            <TabsTrigger value="gallery" className="rounded-full px-10 py-3 uppercase text-[10px] tracking-widest font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">Archives</TabsTrigger>
            <TabsTrigger value="bookings" className="rounded-full px-10 py-3 uppercase text-[10px] tracking-widest font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">Productions</TabsTrigger>
            <TabsTrigger value="favorites" className="rounded-full px-10 py-3 uppercase text-[10px] tracking-widest font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">Curated</TabsTrigger>
            <TabsTrigger value="ai" className="rounded-full px-10 py-3 uppercase text-[10px] tracking-widest font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">Intelligence</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="mt-0">
            {albums.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {albums.map((album) => (
                    <motion.div key={album.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="glass border-white/10 hover:border-primary/30 transition-all rounded-3xl overflow-hidden group">
                        <div className="aspect-[4/3] relative overflow-hidden">
                            <img src={album.coverImageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80" alt="" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                            <div className="absolute top-4 right-4 glass px-4 py-1 text-[9px] uppercase font-bold text-white tracking-widest rounded-full">
                                {album.category}
                            </div>
                        </div>
                        <CardHeader className="p-8">
                        <CardTitle className="text-2xl font-serif italic text-white tracking-tight">{album.title}</CardTitle>
                        <CardDescription className="text-zinc-500 text-xs font-serif italic">{album.description.substring(0, 60)}...</CardDescription>
                        </CardHeader>
                        <CardContent className="px-8 pb-8 pt-0">
                        <div className="flex justify-between items-center">
                            <Link to={`/album/${album.id}`} className="grow mr-4">
                                <Button variant="ghost" className="w-full text-white hover:bg-white/10 h-12 rounded-full border border-white/10 text-[10px] uppercase font-bold tracking-widest transition-all">
                                    Enter Gallery <ExternalLink className="ml-2 w-3 h-3 text-primary" />
                                </Button>
                            </Link>
                            <Button variant="ghost" className="text-zinc-500 hover:bg-white/5 h-12 w-12 p-0 rounded-full border border-white/10 flex items-center justify-center">
                                <Download className="w-4 h-4" />
                            </Button>
                        </div>
                        </CardContent>
                    </Card>
                    </motion.div>
                ))}
                </div>
            ) : (
                <div className="py-40 text-center border-2 border-dashed border-white/10 rounded-3xl glass transition-all hover:bg-white/[0.02]">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Camera className="w-8 h-8 text-zinc-500" />
                    </div>
                    <h3 className="text-xl font-serif italic text-white/50 tracking-tight">No active archives found</h3>
                    <p className="text-zinc-600 mt-4 max-w-xs mx-auto text-sm font-serif italic">Once your vision is processed, your private cinematic gallery will manifest here.</p>
                </div>
            )}
          </TabsContent>

          <TabsContent value="bookings">
                <div className="space-y-8">
                    {bookings.map((booking) => (
                        <Card key={booking.id} className="glass border-white/10 rounded-3xl flex flex-col md:flex-row items-center p-8 gap-8 md:gap-12 group hover:bg-white/[0.02] transition-all">
                            <div className="h-24 w-24 glass rounded-full flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-all shrink-0">
                                <Calendar className="w-8 h-8 text-primary" />
                            </div>
                            <div className="flex-grow space-y-4 text-center md:text-left">
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <h4 className="text-3xl font-serif italic text-white tracking-tight leading-none">{booking.sessionType} Production</h4>
                                    <span className={`px-4 py-1 text-[9px] uppercase font-bold tracking-widest rounded-full border ${booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                                        {booking.status}
                                    </span>
                                </div>
                                <div className="flex flex-wrap justify-center md:justify-start gap-8 text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium">
                                    <span className="flex items-center gap-2">DATE: <span className="text-white/80">{booking.date}</span></span>
                                    <span className="flex items-center gap-2">VALUE: <span className="text-white/80">${booking.price}</span></span>
                                    <span className="flex items-center gap-2">STATUS: <span className="text-white/80">{booking.paymentStatus}</span></span>
                                </div>
                            </div>
                            <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full h-14 px-10 uppercase text-[10px] tracking-widest font-bold transition-all w-full md:w-auto">
                                Manage Logic
                            </Button>
                        </Card>
                    ))}
                    {bookings.length === 0 && (
                         <div className="py-20 text-center text-zinc-600 font-serif italic tracking-widest text-lg glass rounded-3xl border-white/10 border-dashed border-2">
                            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            Archive lists no productions
                         </div>
                    )}
                </div>
          </TabsContent>

          <TabsContent value="ai">
            <div className="max-w-4xl mx-auto space-y-12 py-12">
                <div className="flex flex-col md:flex-row items-center gap-8 p-10 glass border-white/10 rounded-3xl">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                        <Sparkles className="w-10 h-10 text-black" />
                    </div>
                    <div className="space-y-2 text-center md:text-left">
                        <h4 className="text-2xl font-serif italic text-white tracking-tight">Studio Intelligence</h4>
                        <p className="text-zinc-500 text-sm font-serif italic">Our system has analyzed your past sessions and style preferences. Here are some cinematic inspirations for your next journey.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {[1, 2].map((i) => (
                        <div key={i} className="glass border-white/10 p-10 rounded-3xl space-y-8 hover:border-primary/20 transition-all">
                            <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center">
                                <Star className="w-6 h-6 text-primary" />
                            </div>
                            <div className="space-y-4">
                                <h5 className="text-2xl font-serif italic text-white tracking-tight">Neo-Noir Urban Editorial</h5>
                                <p className="text-sm text-zinc-500 leading-relaxed font-serif italic">Utilizing high-contrast urban environments and atmospheric wet textures to create architectural resonance.</p>
                            </div>
                            <Button variant="link" className="text-primary p-0 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-accent">Initiate Concept Scan</Button>
                        </div>
                    ))}
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
