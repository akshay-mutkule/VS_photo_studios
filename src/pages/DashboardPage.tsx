import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Album, Booking } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Calendar, ExternalLink, Settings, Star, Sparkles, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockAlbums: Album[] = [
  {
    id: 'demo-florence',
    title: 'The Udaipur Pre-Wedding',
    description: 'Documenting high-society timeless cinematic love amongst historical Rajasthani palace architectural landmarks.',
    category: 'Wedding',
    coverImageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop',
    isPasswordProtected: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const DashboardPage: React.FC = () => {
  const { user, profile } = useAuth();
  const [albums, setAlbums] = React.useState<Album[]>([]);
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const albumsQuery = query(collection(db, 'albums'), where('clientEmail', '==', user.email));
        const albumSnap = await getDocs(albumsQuery);
        
        const fetchedAlbums = albumSnap.docs.map(d => ({ id: d.id, ...d.data() } as Album));
        setAlbums(fetchedAlbums.length > 0 ? fetchedAlbums : mockAlbums);

        const bookingsQuery = query(collection(db, 'bookings'), where('clientEmail', '==', user.email), orderBy('date', 'desc'));
        const bookingSnap = await getDocs(bookingsQuery);
        setBookings(bookingSnap.docs.map(d => ({ id: d.id, ...d.data() } as Booking)));
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
        setAlbums(mockAlbums);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFAF6] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#A37E43] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFAF6] text-[#1A1815] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Dynamic Welcome Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-[#A37E43]/15 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-[#A37E43]" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#A37E43]">Sanctuary Entrance</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif text-zinc-900 tracking-tight leading-none">
              Welcome, {profile?.displayName || user?.email?.split('@')[0] || 'Studio Client'}
            </h1>
            <p className="text-zinc-500 font-sans font-light text-xs sm:text-sm">
              Your secure, private photographic atelier and archive portfolio tracking details.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="border-[#A37E43]/20 text-[#A37E43] hover:bg-[#A37E43]/5 rounded-none uppercase font-bold text-[9px] tracking-widest px-6 h-12">
              <Settings className="w-3.5 h-3.5 mr-2" /> PORTAL CONFIG
            </Button>
            <Link to="/booking">
              <Button className="bg-[#A37E43] hover:bg-[#8D6B37] text-white rounded-none uppercase font-bold text-[9px] tracking-widest px-6 h-12">
                SCHEDULE SHOOT
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Sections Tabs */}
        <Tabs defaultValue="gallery" className="space-y-12">
          <TabsList className="bg-white border border-[#A37E43]/10 p-1 rounded-none inline-flex flex-wrap overflow-x-auto max-w-full">
            <TabsTrigger value="gallery" className="rounded-none px-6 py-2.5 uppercase text-[9px] tracking-widest font-bold data-[state=active]:bg-[#A37E43] data-[state=active]:text-white transition-all">YOUR ARCHIVES</TabsTrigger>
            <TabsTrigger value="bookings" className="rounded-none px-6 py-2.5 uppercase text-[9px] tracking-widest font-bold data-[state=active]:bg-[#A37E43] data-[state=active]:text-white transition-all">PRODUCTIONS</TabsTrigger>
            <TabsTrigger value="inspirations" className="rounded-none px-6 py-2.5 uppercase text-[9px] tracking-widest font-bold data-[state=active]:bg-[#A37E43] data-[state=active]:text-white transition-all">STUDIO SELECTIONS</TabsTrigger>
          </TabsList>

          {/* TAB 1: Real and Fallback Private Client Galleries */}
          <TabsContent value="gallery" className="mt-0">
            {albums.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {albums.map((album) => (
                  <motion.div key={album.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="bg-white border border-[#A37E43]/10 rounded-none shadow-sm overflow-hidden group">
                      <div className="aspect-[4/3] relative overflow-hidden bg-stone-50">
                        <img src={album.coverImageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103 saturate-75" referrerPolicy="no-referrer" alt="" />
                        <div className="absolute top-4 right-4 bg-white/90 border border-[#A37E43]/15 px-3 py-1 text-[8px] font-bold text-[#A37E43] uppercase tracking-widest">
                          {album.category}
                        </div>
                      </div>
                      
                      <CardHeader className="p-6">
                        <CardTitle className="text-xl font-serif text-zinc-900">{album.title}</CardTitle>
                        <CardDescription className="text-zinc-500 text-xs font-light font-sans mt-1">
                          {album.description ? (album.description.length > 100 ? `${album.description.substring(0, 100)}...` : album.description) : 'Interactive fine art archival gallery.'}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="px-6 pb-6 pt-0">
                        <div className="flex gap-2">
                          <Link to={`/album/${album.id}`} className="grow">
                            <Button className="bg-[#A37E43] hover:bg-[#8D6B37] text-white w-full rounded-none h-10 uppercase text-[9px] tracking-wider font-bold transition-all">
                              ACCESS PLATES <ExternalLink className="ml-1.5 w-3 h-3" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center border border-[#A37E43]/15 bg-white">
                <Camera className="w-8 h-8 text-[#A37E43]/40 mx-auto mb-4" />
                <h3 className="text-lg font-serif text-zinc-900">No active personal archives</h3>
                <p className="text-zinc-400 font-sans font-light text-xs mt-1 max-w-xs mx-auto">
                  Your private wedding or editorial files will appear encrypted here once production captures are processed.
                </p>
              </div>
            )}
          </TabsContent>

          {/* TAB 2: Booked Productions or History */}
          <TabsContent value="bookings" className="mt-0 border-t border-[#A37E43]/10 pt-4">
            <div className="space-y-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="bg-white border border-[#A37E43]/10 p-6 flex flex-col sm:flex-row items-center gap-6 group rounded-none shadow-sm">
                  <div className="h-16 w-16 bg-[#FCFAF6] border border-[#A37E43]/15 flex items-center justify-center rounded-none text-[#A37E43] shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <h4 className="text-xl font-serif text-zinc-900">{booking.sessionType} Commission</h4>
                      <span className="bg-[#FCFAF6] text-[#A37E43] border border-[#A37E43]/15 px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider">
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-6 text-[9px] text-zinc-450 uppercase tracking-widest font-mono mt-2">
                      <span>Date: {booking.date}</span>
                      <span>Bracket: ${booking.price}</span>
                      <span>Finances: {booking.paymentStatus}</span>
                    </div>
                  </div>
                  <Button className="border border-[#A37E43]/20 text-[#A37E43] hover:bg-[#A37E43]/5 bg-transparent rounded-none h-11 px-6 uppercase text-[9px] tracking-widest font-bold">
                    PRINT INVOICE
                  </Button>
                </Card>
              ))}
              
              {bookings.length === 0 && (
                <div className="py-16 text-center border border-[#A37E43]/12 bg-white flex flex-col items-center">
                  <Calendar className="w-8 h-8 text-zinc-350 mb-3" />
                  <span className="text-xs text-zinc-400 font-light font-sans">No historical scheduler requests found.</span>
                  <Link to="/booking" className="mt-4">
                    <Button className="bg-[#A37E43] hover:bg-[#8D6B37] text-white rounded-none h-10 px-6 uppercase text-[9px] tracking-wider font-bold">
                      Book New Session
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </TabsContent>

          {/* TAB 3: Visual Inspirations and AI Studio Insights */}
          <TabsContent value="inspirations" className="mt-0">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex flex-col sm:flex-row items-center gap-6 p-8 bg-white border border-[#A37E43]/10">
                <div className="w-12 h-12 bg-[#FCFAF6] border border-[#A37E43]/15 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-[#A37E43]" />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-lg font-serif text-zinc-900">Custom Aesthetic Curator</h4>
                  <p className="text-zinc-500 text-xs font-light font-sans leading-relaxed">
                    Based on local wedding architecture preferences, we suggest natural sunrise light schedules and locations with classical columns.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: 'Jaipur Palace Regal Elegance', desc: 'Utilizing majestic pink-hued fort walls, traditional sunset light, and gorgeous silk garments.' },
                  { title: 'Kerala Backwaters Serenity', desc: 'Sunkissed coconut groves in the south, pristine luxury houseboat backgrounds, and soft linen palettes.' }
                ].map((concept, i) => (
                  <div key={i} className="bg-white border border-[#A37E43]/10 p-8 space-y-4 hover:border-[#A37E43]/30 transition-all">
                    <div className="w-10 h-10 bg-[#FCFAF6] border border-[#A37E43]/15 flex items-center justify-center">
                      <Star className="w-4 h-4 text-[#A37E43]" />
                    </div>
                    <div className="space-y-1.5">
                      <h5 className="text-lg font-serif text-zinc-900">{concept.title}</h5>
                      <p className="text-xs text-zinc-500 font-sans font-light leading-relaxed">{concept.desc}</p>
                    </div>
                    <Button variant="link" className="text-[#A37E43] hover:text-[#8D6B37] p-0 text-[9px] uppercase font-bold tracking-widest">
                      DISCOVER PALETTE SCAN
                    </Button>
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
