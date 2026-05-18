import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, addDoc, serverTimestamp, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { Album, Booking, UserProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LayoutDashboard, Users, Camera, DollarSign, Upload, Plus, MoreVertical, Search, BarChart3, TrendingUp, AlertCircle, Sparkles, Activity, Shield, Mail, Ticket, HardDrive, Bell, Settings as SettingsIcon, Download } from 'lucide-react';
import { toast } from 'sonner';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const chartData = [
  { name: 'Jan', revenue: 4000, bookings: 24 },
  { name: 'Feb', revenue: 3000, bookings: 18 },
  { name: 'Mar', revenue: 5000, bookings: 35 },
  { name: 'Apr', revenue: 4500, bookings: 30 },
  { name: 'May', revenue: 6000, bookings: 42 },
  { name: 'Jun', revenue: 5500, bookings: 38 },
];

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const [albums, setAlbums] = React.useState<Album[]>([]);
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [customers, setCustomers] = React.useState<UserProfile[]>([]);
  const [stats, setStats] = React.useState({ revenue: 0, clients: 0, photos: 0, bookings: 0 });
  const [loading, setLoading] = React.useState(true);

  // New Album State
  const [newAlbum, setNewAlbum] = React.useState({ title: '', description: '', category: 'Wedding', clientEmail: '', coverImageUrl: '' });
  const [uploading, setUploading] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedAlbumForUpload, setSelectedAlbumForUpload] = React.useState<string | null>(null);
  const [coverUploadProgress, setCoverUploadProgress] = React.useState<number | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumSnap, bookingSnap, userSnap] = await Promise.all([
          getDocs(query(collection(db, 'albums'), orderBy('createdAt', 'desc'))),
          getDocs(query(collection(db, 'bookings'), orderBy('date', 'desc'))),
          getDocs(query(collection(db, 'users'), limit(50)))
        ]);

        const albumsData = albumSnap.docs.map(d => ({ id: d.id, ...d.data() } as any as Album));
        const bookingsData = bookingSnap.docs.map(d => ({ id: d.id, ...d.data() } as any as Booking));
        const customersData = userSnap.docs.map(d => ({ ...(d.data() as any), userId: d.id } as UserProfile));

        setAlbums(albumsData);
        setBookings(bookingsData);
        setCustomers(customersData);

        const rev = bookingsData.reduce((acc, b) => b.paymentStatus === 'paid' ? acc + b.price : acc, 0);
        setStats({ revenue: rev, clients: customersData.length, photos: albumsData.length * 50, bookings: bookingsData.length });
      } catch (err) {
        console.error("Admin Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const albumDoc = await addDoc(collection(db, 'albums'), {
        ...newAlbum,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast.success("Collection Blueprint Manifested");
      setAlbums(prev => [{ id: albumDoc.id, ...newAlbum, createdAt: new Date() } as any, ...prev]);
      setNewAlbum({ title: '', description: '', category: 'Wedding', clientEmail: '', coverImageUrl: '' });
    } catch (err) {
      console.error("Create Album Error:", err);
      toast.error("Blueprint synthesis failed");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const albumId = selectedAlbumForUpload;
    if (!files || !albumId) return;

    setUploading(albumId);
    const toastId = toast.loading(`Uploading ${files.length} assets to production...`);

    try {
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, `albums/${albumId}/${Date.now()}-${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        const url = await new Promise<string>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            null,
            (error) => reject(error),
            async () => {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadUrl);
            }
          );
        });

        await addDoc(collection(db, 'albums', albumId, 'photos'), {
          albumId,
          url,
          thumbnailUrl: url,
          type: 'image',
          tags: ['Studio Upload'],
          createdAt: serverTimestamp()
        });
        uploadedUrls.push(url);
      }
      
      // Update album cover if none exists
      const album = albums.find(a => a.id === albumId);
      if (album && !album.coverImageUrl && uploadedUrls.length > 0) {
        await updateDoc(doc(db, 'albums', albumId), {
            coverImageUrl: uploadedUrls[0],
            updatedAt: serverTimestamp()
        });
      }

      toast.success(`${files.length} assets integrated into archive`, { id: toastId });
      // Refresh logic or state update could go here
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Asset integration failure", { id: toastId });
    } finally {
      setUploading(null);
      setSelectedAlbumForUpload(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const storageRef = ref(storage, `temp/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setCoverUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.error("Cover upload error:", error);
        toast.error("Cover manifest failure");
        setCoverUploadProgress(null);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setNewAlbum(prev => ({ ...prev, coverImageUrl: url }));
        setCoverUploadProgress(null);
        toast.success("Cover synthesized");
      }
    );
  };

  const seedDatabase = async () => {
    try {
        const albumsColl = collection(db, 'albums');
        
        // Define Seed Data
        const seedAlbums = [
            { 
              title: 'Paris Editorial', 
              category: 'Fashion', 
              clientEmail: user?.email || 'test@example.com', 
              description: 'High fashion in the city of light.', 
              coverImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
              isPasswordProtected: false
            },
            { 
              title: 'Tuscan Sunset', 
              category: 'Wedding', 
              clientEmail: user?.email || 'test@example.com', 
              description: 'Golden emotions in the hills of Italy.', 
              coverImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
              isPasswordProtected: true,
              password: 'vs2026'
            },
            {
              title: 'Cinematic Noir',
              category: 'Cinematic',
              clientEmail: user?.email || 'test@example.com',
              description: 'Exploring the shadows and high-contrast urban landscapes.',
              coverImageUrl: 'https://images.unsplash.com/photo-1478720568477-151d9b71ef09?q=80&w=2070&auto=format&fit=crop',
              isPasswordProtected: false
            }
        ];

        const photoLibraries = [
          [
            'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=1887&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1887&auto=format&fit=crop'
          ],
          [
            'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1887&auto=format&fit=crop'
          ],
          [
            'https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1516216628859-9bccecad13fc?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1444703686981-a3abb99d4fd3?q=80&w=2070&auto=format&fit=crop'
          ]
        ];

        for (let i = 0; i < seedAlbums.length; i++) {
            const albumDoc = await addDoc(albumsColl, { 
              ...seedAlbums[i], 
              createdAt: serverTimestamp(), 
              updatedAt: serverTimestamp() 
            });
            
            // Add photos to this album
            const photosColl = collection(db, 'albums', albumDoc.id, 'photos');
            const tags = ['Cinematic', 'Archive', 'VS', 'High-Res'];
            
            for (const url of photoLibraries[i % photoLibraries.length]) {
              await addDoc(photosColl, {
                albumId: albumDoc.id,
                url,
                thumbnailUrl: url,
                type: 'image',
                tags: [tags[Math.floor(Math.random() * tags.length)], seedAlbums[i].category],
                favoritesCount: Math.floor(Math.random() * 50),
                createdAt: serverTimestamp()
              });
            }
        }

        const bookingsColl = collection(db, 'bookings');
        await addDoc(bookingsColl, {
            clientId: user?.uid || 'guest-id',
            clientEmail: user?.email || 'guest@example.com',
            date: '2026-06-12',
            price: 1500,
            sessionType: 'Wedding',
            status: 'confirmed',
            paymentStatus: 'paid'
        });

        toast.success("Collective Archive manifesting with cinematic metadata");
        window.location.reload();
    } catch (err) {
        console.error(err);
        toast.error("Deep Scan Seeding failure");
    }
  };

  if (loading) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20">
      <div className="max-w-[1600px] mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-primary/40" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary italic">Central Intelligence</span>
            </div>
            <h1 className="text-5xl font-serif italic text-white tracking-tight leading-none">Studio <span className="opacity-30">Archive</span></h1>
            <p className="text-zinc-500 font-serif italic">Managing the global archive of VS Studios.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 mr-4">
                <div className="relative">
                    <Button variant="ghost" className="h-12 w-12 rounded-full glass border-white/5 relative group">
                        <Bell className="w-5 h-5 text-zinc-500 group-hover:text-primary transition-colors" />
                        <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                    </Button>
                </div>
                <Button variant="ghost" className="h-12 w-12 rounded-full glass border-white/5 group">
                    <SettingsIcon className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                </Button>
             </div>
             
             <Button onClick={seedDatabase} variant="outline" className="border-primary/20 text-primary hover:bg-primary/10 uppercase font-bold text-[10px] tracking-widest px-8 h-12 rounded-full glass">
                <Sparkles className="w-4 h-4 mr-2" /> Seed Studio
             </Button>
             <Dialog>
                <DialogTrigger 
                    render={
                        <Button className="bg-primary text-black hover:bg-accent uppercase font-bold text-[10px] tracking-widest px-8 h-12 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                            <Plus className="w-4 h-4 mr-2" /> New Collection
                        </Button>
                    }
                />
                <DialogContent className="glass-dark border-white/10 text-white max-w-2xl p-8 rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-serif italic text-white tracking-tight">Collection Blueprint</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateAlbum} className="space-y-6 pt-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Album Title</Label>
                                <Input value={newAlbum.title} onChange={e => setNewAlbum({...newAlbum, title: e.target.value})} className="glass border-white/10 rounded-full h-12 px-6" placeholder="e.g. The Paris Editorial" required />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Category</Label>
                                <Select onValueChange={v => setNewAlbum({...newAlbum, category: v})} defaultValue="Wedding">
                                    <SelectTrigger className="glass border-white/10 rounded-full h-12 px-6 uppercase text-[10px] tracking-widest font-bold">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="glass-dark border-white/10 text-white">
                                        {['Wedding', 'Fashion', 'Portraits', 'Cinematic', 'Drone'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Client Email (For access)</Label>
                            <Input value={newAlbum.clientEmail} onChange={e => setNewAlbum({...newAlbum, clientEmail: e.target.value})} type="email" className="glass border-white/10 rounded-full h-12 px-6" placeholder="client@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Cover Image</Label>
                            <div className="flex gap-4">
                                <Input value={newAlbum.coverImageUrl} onChange={e => setNewAlbum({...newAlbum, coverImageUrl: e.target.value})} className="glass border-white/10 rounded-full h-12 px-6 flex-grow" placeholder="Image URL or upload" />
                                <div className="relative">
                                    <input type="file" className="hidden" id="cover-upload" onChange={handleCoverUpload} accept="image/*" />
                                    <Button type="button" onClick={() => document.getElementById('cover-upload')?.click()} className="h-12 w-12 rounded-full glass border-white/10 p-0">
                                        {coverUploadProgress !== null ? (
                                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                        ) : <Upload className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Description</Label>
                            <Textarea value={newAlbum.description} onChange={e => setNewAlbum({...newAlbum, description: e.target.value})} className="glass border-white/10 rounded-2xl min-h-[120px] p-4" placeholder="Vision and narrative for this collection..." />
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-accent text-black h-14 uppercase font-bold tracking-widest rounded-full">Publish Collection</Button>
                    </form>
                </DialogContent>
             </Dialog>
             <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 uppercase font-bold text-[10px] tracking-widest px-8 h-12 rounded-full glass">
                <BarChart3 className="w-4 h-4 mr-2" /> Global Stats
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="lg:col-span-2 glass border-white/10 rounded-[2.5rem] bg-zinc-950/20 overflow-hidden">
                <CardHeader className="p-8 pb-0 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-2">Revenue Velocity</CardTitle>
                        <div className="text-4xl font-serif italic text-white">$42,500 <span className="text-[10px] text-emerald-500 font-bold not-italic ml-2">+15.2%</span></div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" className="h-10 glass border-white/5 text-[9px] uppercase font-bold tracking-widest text-white px-6 rounded-full">Month</Button>
                        <Button variant="ghost" className="h-10 glass border-white/5 text-[9px] uppercase font-bold tracking-widest text-white/40 px-6 rounded-full">Year</Button>
                    </div>
                </CardHeader>
                <CardContent className="h-[300px] p-8 pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                itemStyle={{ color: '#D4AF37' }}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="#D4AF37" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="glass border-white/10 rounded-[2.5rem] bg-zinc-950/20 p-8 space-y-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white">AI Studio Insights</span>
                    </div>
                    <div className="space-y-4">
                        {[
                            { text: "Wedding session demand up 40% for Q3.", icon: TrendingUp },
                            { text: "Client retention rate at historical 92%.", icon: Activity },
                            { text: "Storage optimization: 45GB redundant data found.", icon: HardDrive },
                        ].map((insight, i) => (
                            <div key={i} className="glass border-white/5 p-4 rounded-2xl flex gap-4 items-start">
                                <insight.icon className="w-4 h-4 text-primary shrink-0 mt-1" />
                                <p className="text-xs text-zinc-400 font-serif italic">{insight.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pt-4 border-t border-white/5 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Cloud Presence</span>
                        <span className="text-[9px] uppercase tracking-widest text-white/50 font-bold">84% Capacity</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[84%] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    </div>
                    <p className="text-[9px] uppercase tracking-widest text-zinc-600 font-medium italic">842 GB / 1 TB Utilized</p>
                </div>
            </Card>
        </div>

        {/* Analytics Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
                { label: 'Total Revenue', val: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, trend: '+12.5%' },
                { label: 'Active Clients', val: stats.clients, icon: Users, trend: '+5' },
                { label: 'Photo Archive', val: stats.photos, icon: Camera, trend: '+200' },
                { label: 'Pending Bookings', val: stats.bookings, icon: LayoutDashboard, trend: '4 confirmed' },
            ].map((s, i) => (
                <Card key={i} className="glass border-white/10 rounded-3xl hover:border-primary/30 transition-all group overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
                        <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{s.label}</CardTitle>
                        <s.icon className="w-4 h-4 text-primary" />
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <div className="text-4xl font-serif italic tracking-tight text-white">{s.val}</div>
                        <p className="text-[10px] font-medium text-emerald-500 flex items-center gap-1 mt-2">
                            <TrendingUp className="w-3 h-3" /> {s.trend} <span className="text-zinc-600 ml-1">since last month</span>
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>

        <Tabs defaultValue="albums" className="space-y-12">
            <TabsList className="glass border-white/10 p-1 rounded-full inline-flex mb-8 overflow-x-auto max-w-full">
                <TabsTrigger value="albums" className="rounded-full px-8 py-3 uppercase text-[10px] tracking-widest font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">Archives</TabsTrigger>
                <TabsTrigger value="bookings" className="rounded-full px-8 py-3 uppercase text-[10px] tracking-widest font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">Operations</TabsTrigger>
                <TabsTrigger value="customers" className="rounded-full px-8 py-3 uppercase text-[10px] tracking-widest font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">Directory</TabsTrigger>
                <TabsTrigger value="activity" className="rounded-full px-8 py-3 uppercase text-[10px] tracking-widest font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">Activity</TabsTrigger>
                <TabsTrigger value="coupons" className="rounded-full px-8 py-3 uppercase text-[10px] tracking-widest font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">Coupons</TabsTrigger>
                <TabsTrigger value="team" className="rounded-full px-8 py-3 uppercase text-[10px] tracking-widest font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">Team</TabsTrigger>
            </TabsList>

            <TabsContent value="albums" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {albums.map((album) => (
                        <motion.div key={album.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="group relative aspect-[4/5] glass border-white/10 overflow-hidden rounded-3xl">
                                <img src={album.coverImageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                <div className="absolute inset-0 flex flex-col justify-between p-8 z-10 transition-transform group-hover:-translate-y-2 duration-500">
                                    <div className="flex justify-between items-start">
                                        <div className="glass text-white px-4 py-1 text-[8px] font-bold uppercase tracking-widest rounded-full">{album.category}</div>
                                        <Button variant="ghost" className="h-10 w-10 p-0 text-white rounded-full glass opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-2xl font-serif italic text-white tracking-tight leading-none">{album.title}</h4>
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold truncate">{album.clientEmail}</p>
                                        <div className="pt-2 flex gap-2">
                                            <Button variant="outline" className="h-12 grow glass border-white/10 hover:bg-white/10 text-white rounded-full uppercase text-[9px] font-bold tracking-widest">Manage Production</Button>
                                            <Button 
                                                size="icon" 
                                                className="h-12 w-12 glass border-white/10 text-white rounded-full relative overflow-hidden"
                                                onClick={() => {
                                                    setSelectedAlbumForUpload(album.id);
                                                    fileInputRef.current?.click();
                                                }}
                                                disabled={uploading === album.id}
                                            >
                                                {uploading === album.id ? (
                                                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Upload className="w-4 h-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    <div className="aspect-[4/5] border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center space-y-6 glass hover:border-primary/40 hover:bg-white/[0.02] transition-all cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                            <Plus className="w-8 h-8 text-zinc-500" />
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500">New Story</p>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="bookings">
                <div className="overflow-x-auto glass border-white/10 rounded-3xl">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white/5 text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                            <tr>
                                <th className="p-8">Client Narrative</th>
                                <th className="p-8">Production Mode</th>
                                <th className="p-8">Execution Timestamp</th>
                                <th className="p-8">Fiscal Status</th>
                                <th className="p-8 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors border-t border-white/5">
                                    <td className="p-8">
                                        <div className="font-serif italic text-white tracking-tight text-2xl leading-none">{booking.clientEmail.split('@')[0]}</div>
                                        <div className="text-[10px] text-zinc-500 tracking-widest mt-2 uppercase font-bold">{booking.clientEmail}</div>
                                    </td>
                                    <td className="p-8">
                                        <span className="glass px-4 py-1 text-[9px] uppercase tracking-widest font-bold text-white rounded-full border border-white/10">
                                            {booking.sessionType}
                                        </span>
                                    </td>
                                    <td className="p-8 font-mono text-zinc-400 text-xs">{booking.date}</td>
                                    <td className="p-8">
                                        <div className="flex flex-col gap-2">
                                            <div className="text-white font-serif italic text-xl tracking-tight leading-none">${booking.price}</div>
                                            <div className={`text-[9px] uppercase font-bold tracking-widest ${booking.paymentStatus === 'paid' ? 'text-emerald-500' : 'text-primary'}`}>
                                                {booking.paymentStatus}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex gap-2 justify-end">
                                            <Button size="icon" variant="ghost" className="h-10 w-10 text-zinc-500 hover:text-primary glass border-white/5 rounded-full">
                                                <TrendingUp className="w-4 h-4" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="h-10 w-10 text-zinc-500 hover:text-white glass border-white/5 rounded-full">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TabsContent>
            
            <TabsContent value="coupons">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { code: 'CINEMATIC20', usage: '24/50', discount: '20%', status: 'Active' },
                        { code: 'STUDIO-FIRST', usage: '89/100', discount: '$100', status: 'Active' },
                        { code: 'WINTER2026', usage: '0/200', discount: '15%', status: 'Scheduled' },
                    ].map((coupon) => (
                        <div key={coupon.code} className="glass border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8">
                                <Ticket className="w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-1">Promotional Signal</p>
                                    <h5 className="text-3xl font-serif italic text-white tracking-tight">{coupon.code}</h5>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-2xl text-primary font-serif italic">{coupon.discount} Off</p>
                                        <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Usage: {coupon.usage}</p>
                                    </div>
                                    <div className="px-5 py-1.5 glass rounded-full text-[9px] uppercase font-bold tracking-widest text-emerald-500 border border-emerald-500/20">
                                        {coupon.status}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center p-8 glass hover:border-primary/40 transition-all cursor-pointer">
                        <Plus className="w-8 h-8 text-zinc-500 mb-2" />
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold transition-all">Forge New Coupon</span>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="team">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { name: 'Alex Reeves', role: 'Lead Cinematographer', active: true },
                        { name: 'Sarah Holt', role: 'Creative Director', active: true },
                        { name: 'Michael Sun', role: 'Sound Designer', active: false },
                    ].map((member) => (
                        <div key={member.name} className="glass border-white/10 p-8 rounded-[2.5rem] space-y-6 group">
                            <div className="w-20 h-20 rounded-full glass border border-white/10 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                                <div className="text-3xl font-serif italic text-primary">{member.name[0]}</div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h5 className="text-2xl font-serif italic text-white tracking-tight leading-none">{member.name}</h5>
                                    <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-[0.2em] mt-2">{member.role}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${member.active ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`} />
                                    <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">{member.active ? 'Active on Set' : 'Away'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="border-2 border-dashed border-white/10 rounded-[2.5rem] flex items-center justify-center glass hover:border-primary/40 transition-all cursor-pointer">
                        <Users className="w-8 h-8 text-zinc-700" />
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="activity">
                <div className="glass border-white/10 rounded-[2.5rem] p-12 max-w-4xl space-y-12">
                    <div className="flex items-center justify-between">
                         <h4 className="text-3xl font-serif italic text-white tracking-tight">Real-time Echoes</h4>
                         <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                             <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Live Monitoring Active</span>
                         </div>
                    </div>
                    <div className="space-y-8">
                        {[
                            { user: 'Elena Rossi', action: 'Downloaded 24 items from Paris Editorial', time: '2 mins ago', icon: Download },
                            { user: 'Julius Caesar', action: 'Accessed Tuscan Sunset Archive', time: '14 mins ago', icon: Shield },
                            { user: 'System Alpha', action: 'Optimized 500 metadata clusters', time: '1 hour ago', icon: Sparkles },
                            { user: 'Admin', action: 'Generated new distribution signal: WINTER2026', time: '3 hours ago', icon: Ticket },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-8 group">
                                <div className="h-14 w-14 rounded-full glass border border-white/5 flex items-center justify-center shrink-0 group-hover:border-primary transition-all">
                                    <item.icon className="w-5 h-5 text-zinc-500 group-hover:text-primary transition-colors" />
                                </div>
                                <div className="space-y-1 border-b border-white/5 pb-8 w-full">
                                    <div className="flex justify-between items-start">
                                        <p className="text-white font-serif italic text-xl tracking-tight leading-none">{item.user}</p>
                                        <span className="text-[9px] uppercase tracking-widest font-bold text-zinc-600">{item.time}</span>
                                    </div>
                                    <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold mt-2">{item.action}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="customers">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {customers.map((c) => (
                        <div key={c.userId} className="flex items-center gap-6 p-8 glass border-white/10 rounded-3xl hover:border-primary/20 transition-all group">
                            <div className="w-20 h-20 rounded-full glass border border-white/10 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                                {c.photoURL ? <img src={c.photoURL} className="w-full h-full object-cover" /> : <Users className="w-8 h-8 text-zinc-700" />}
                            </div>
                            <div className="space-y-2 grow">
                                <h5 className="text-white font-serif italic text-2xl tracking-tight leading-none">{c.displayName || 'Anonymous'}</h5>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest truncate max-w-[150px]">{c.email}</p>
                                <div className="flex gap-2 pt-2">
                                    <div className="px-3 py-1 glass text-[9px] font-bold text-primary uppercase rounded-full border border-primary/20">{c.role}</div>
                                    <div className="px-3 py-1 glass text-[9px] font-bold text-white/40 uppercase rounded-full border border-white/5 italic font-serif">Verified</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
        <input 
            type="file" 
            multiple 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
            accept="image/*"
        />
      </div>
    </div>
  );
};

export default AdminPage;
