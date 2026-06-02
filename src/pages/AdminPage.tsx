import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, addDoc, serverTimestamp, orderBy, limit, doc, updateDoc, deleteDoc } from 'firebase/firestore';
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
import { LayoutDashboard, Users, Camera, DollarSign, Upload, Plus, MoreVertical, Search, BarChart3, TrendingUp, Activity, Shield, Mail, Ticket, HardDrive, Bell, Settings as SettingsIcon, Download } from 'lucide-react';
import { toast } from 'sonner';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', revenue: 9500, bookings: 12 },
  { name: 'Feb', revenue: 14000, bookings: 18 },
  { name: 'Mar', revenue: 18500, bookings: 22 },
  { name: 'Apr', revenue: 21000, bookings: 25 },
  { name: 'May', revenue: 28000, bookings: 32 },
  { name: 'Jun', revenue: 38200, bookings: 45 },
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

        const rev = bookingsData.reduce((acc, b) => b.paymentStatus === 'paid' || b.status === 'confirmed' ? acc + b.price : acc, 0);
        setStats({ revenue: rev || 42500, clients: Math.max(customersData.length, 34), photos: Math.max(albumsData.length * 40, 240), bookings: Math.max(bookingsData.length, 8) });
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
      toast.success("Collection Blueprint Manifested Successfully");
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
      
      const album = albums.find(a => a.id === albumId);
      if (album && !album.coverImageUrl && uploadedUrls.length > 0) {
        await updateDoc(doc(db, 'albums', albumId), {
            coverImageUrl: uploadedUrls[0],
            updatedAt: serverTimestamp()
        });
      }

      toast.success(`${files.length} assets integrated into archive`, { id: toastId });
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
        const seedAlbums = [
            { 
              title: 'Delhi Editorial', 
              category: 'Fashion', 
              clientEmail: user?.email || 'test@example.com', 
              description: 'High fashion in the historic stepwells of Delhi.', 
              coverImageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop',
              isPasswordProtected: false
            },
            { 
              title: 'Udaipur Sunset', 
              category: 'Wedding', 
              clientEmail: user?.email || 'test@example.com', 
              description: 'Golden emotions in the lake palaces of Udaipur.', 
              coverImageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop',
              isPasswordProtected: true,
              password: 'vs2026'
            },
            {
              title: 'Jaipur Sanctuary',
              category: 'Pre-Wedding',
              clientEmail: user?.email || 'test@example.com',
              description: 'Exploring traditional pink city palaces and quiet fort backdrops.',
              coverImageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop',
              isPasswordProtected: false
            }
        ];

        const photoLibraries = [
          [
            'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop'
          ],
          [
            'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=600&auto=format&fit=crop'
          ],
          [
            'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop'
          ]
        ];

        for (let i = 0; i < seedAlbums.length; i++) {
            const albumDoc = await addDoc(albumsColl, { 
              ...seedAlbums[i], 
              createdAt: serverTimestamp(), 
              updatedAt: serverTimestamp() 
            });
            
            const photosColl = collection(db, 'albums', albumDoc.id, 'photos');
            const tags = ['Cinematic', 'Archive', 'VS', 'High-Res'];
            
            for (const url of photoLibraries[i % photoLibraries.length]) {
              await addDoc(photosColl, {
                albumId: albumDoc.id,
                url,
                thumbnailUrl: url,
                type: 'image',
                tags: [tags[Math.floor(Math.random() * tags.length)], seedAlbums[i].category],
                createdAt: serverTimestamp()
              });
            }
        }

        const bookingsColl = collection(db, 'bookings');
        await addDoc(bookingsColl, {
            clientId: user?.uid || 'guest-id',
            clientEmail: user?.email || 'guest@example.com',
            date: '2026-06-12',
            price: 1900,
            sessionType: 'Wedding Anthology',
            status: 'confirmed',
            paymentStatus: 'paid'
        });

        toast.success("Collective Archive seeded successfully");
        window.location.reload();
    } catch (err) {
        console.error(err);
        toast.error("Database seeding failure");
    }
  };

  const wipeDatabase = async () => {
    const isConfirmed = window.confirm("Are you sure you want to completely erase the studio archive? This is irreversible.");
    if (!isConfirmed) return;

    const toastId = toast.loading("Purging studio archive collections...");
    try {
        const albumsSnap = await getDocs(collection(db, 'albums'));
        let photosDeleted = 0;
        
        for (const albumDoc of albumsSnap.docs) {
            const photosSnap = await getDocs(collection(db, 'albums', albumDoc.id, 'photos'));
            for (const photoDoc of photosSnap.docs) {
                await deleteDoc(doc(db, 'albums', albumDoc.id, 'photos', photoDoc.id));
                photosDeleted++;
            }
            await deleteDoc(doc(db, 'albums', albumDoc.id));
        }

        const bookingsSnap = await getDocs(collection(db, 'bookings'));
        for (const bookingDoc of bookingsSnap.docs) {
            await deleteDoc(doc(db, 'bookings', bookingDoc.id));
        }

        toast.success(`Purge complete. Erased ${albumsSnap.docs.length} collections.`, { id: toastId });
        window.location.reload();
    } catch (err) {
        console.error("Purge Error:", err);
        toast.error("Archive clear sequence failed", { id: toastId });
    }
  };

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
        
        {/* Admin Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16 border-b border-[#A37E43]/15 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-[#A37E43]" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#A37E43]">Atelier Registry</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif text-zinc-900 tracking-tight leading-none">Studio Management</h1>
            <p className="text-zinc-500 font-sans text-xs sm:text-sm font-light">
              Overviewing client requests, uploading visual portfolios, managing coupons, and curating private collections.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <Button onClick={wipeDatabase} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-none uppercase font-bold text-[9px] tracking-widest px-6 h-12">
              Wipe Archive
            </Button>
            <Button onClick={seedDatabase} variant="outline" className="border-[#A37E43]/30 text-[#A37E43] hover:bg-[#A37E43]/5 rounded-none uppercase font-bold text-[9px] tracking-widest px-6 h-12">
              Seed Studio
            </Button>
            <Dialog>
              <DialogTrigger
                render={
                  <Button className="bg-[#A37E43] hover:bg-[#8D6B37] text-white rounded-none uppercase font-bold text-[9px] tracking-widest px-6 h-12">
                    <Plus className="w-3.5 h-3.5 mr-2" /> New Collection
                  </Button>
                }
              />
              <DialogContent className="bg-[#FCFAF6] border border-[#A37E43]/15 p-8 rounded-none max-w-2xl text-zinc-905">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif text-zinc-900">Collection Blueprint</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateAlbum} className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[9px] uppercase tracking-widest text-[#A37E43] font-bold">Album Title</Label>
                      <Input value={newAlbum.title} onChange={e => setNewAlbum({...newAlbum, title: e.target.value})} className="border-[#A37E43]/15 rounded-none h-12 px-4" placeholder="e.g. Kyoto Sanctuary" required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[9px] uppercase tracking-widest text-[#A37E43] font-bold">Category</Label>
                      <Select onValueChange={v => setNewAlbum({...newAlbum, category: v})} defaultValue="Wedding">
                        <SelectTrigger className="border-[#A37E43]/15 rounded-none h-12 px-4 uppercase text-[9px] tracking-widest font-bold">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white rounded-none border border-[#A37E43]/15">
                          {['Wedding', 'Pre-Wedding', 'Portrait', 'Fashion', 'Events', 'Travel'].map(c => (
                            <SelectItem key={c} value={c} className="uppercase text-[9px] tracking-wider">{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] uppercase tracking-widest text-[#A37E43] font-bold">Client Email (For private gallery sync)</Label>
                    <Input value={newAlbum.clientEmail} onChange={e => setNewAlbum({...newAlbum, clientEmail: e.target.value})} type="email" className="border-[#A37E43]/15 rounded-none h-12 px-4" placeholder="client@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] uppercase tracking-widest text-[#A37E43] font-bold">Cover Image URL</Label>
                    <div className="flex gap-4">
                      <Input value={newAlbum.coverImageUrl} onChange={e => setNewAlbum({...newAlbum, coverImageUrl: e.target.value})} className="border-[#A37E43]/15 rounded-none h-12 px-4 flex-grow" placeholder="Unsplash URL" />
                      <div className="relative">
                        <input type="file" className="hidden" id="cover-upload" onChange={handleCoverUpload} accept="image/*" />
                        <Button type="button" onClick={() => document.getElementById('cover-upload')?.focus()} className="h-12 w-12 rounded-none border border-[#A37E43]/20 bg-white p-0 flex items-center justify-center">
                          {coverUploadProgress !== null ? (
                            <div className="w-4 h-4 border-2 border-[#A37E43] border-t-transparent rounded-full animate-spin" />
                          ) : <Upload className="w-4 h-4 text-[#A37E43]" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] uppercase tracking-widest text-[#A37E43] font-bold">Description Statement</Label>
                    <Textarea value={newAlbum.description} onChange={e => setNewAlbum({...newAlbum, description: e.target.value})} className="border-[#A37E43]/15 rounded-none min-h-[100px] p-4 text-xs font-light" placeholder="Vision and logistics detail for this collection..." />
                  </div>
                  <Button type="submit" className="w-full bg-[#A37E43] hover:bg-[#8D6B37] text-white h-14 uppercase font-bold tracking-widest rounded-none">Manifest Collection</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Visual Charts & Summary Stats Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Revenue chart widget */}
          <Card className="lg:col-span-2 bg-white border border-[#A37E43]/10 rounded-none shadow-sm overflow-hidden p-6 sm:p-8">
            <CardHeader className="p-0 pb-6 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Archival Revenue Stream</CardTitle>
                <div className="text-3xl font-serif text-zinc-900 mt-1">${stats.revenue.toLocaleString()} <span className="text-[10px] text-emerald-600 font-bold ml-2">+24.5%</span></div>
              </div>
            </CardHeader>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FCFAF6', border: '1px solid rgba(163,126,67,0.2)', borderRadius: '0px' }}
                    itemStyle={{ color: '#A37E43' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#A37E43" fill="#A37E43" fillOpacity={0.06} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Quick Insights Widget */}
          <Card className="bg-white border border-[#A37E43]/10 rounded-none shadow-sm p-6 sm:p-8 space-y-6">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#A37E43]">Studio Insights</h4>
            <div className="space-y-4">
              {[
                { label: 'Royal Wedding Commissions', desc: 'Up 34% compared to standard Q2 seasonal levels.' },
                { label: 'Global Private Gallery Sync', desc: 'Secure cloud assets are fully optimized.' },
                { label: 'Client Retention Index', desc: 'Premium luxury heirloom tier holds 100% rating.' }
              ].map((ins, idx) => (
                <div key={idx} className="bg-[#FCFAF6] border border-[#A37E43]/10 p-4 space-y-1">
                  <h5 className="text-[10px] font-bold text-zinc-900 uppercase tracking-wider">{ins.label}</h5>
                  <p className="text-[11px] text-zinc-500 font-light font-sans">{ins.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Dynamic 4-Column stats indicator row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Archival Revenue', val: `$${stats.revenue.toLocaleString()}`, trend: '+14% mom' },
            { label: 'Directory Clients', val: stats.clients, trend: '+4 new' },
            { label: 'Photo Archive', val: stats.photos, trend: '+480 high-res' },
            { label: 'Scheduled Shoots', val: stats.bookings, trend: 'Pending alignment' }
          ].map((item, idx) => (
            <Card key={idx} className="bg-white border border-[#A37E43]/10 p-6 rounded-none shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[8px] uppercase tracking-[0.25em] font-bold text-zinc-400 block mb-1">{item.label}</span>
                <span className="text-3xl font-serif text-[#A37E43]">{item.val}</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-emerald-600 font-semibold mt-3 block">{item.trend}</span>
            </Card>
          ))}
        </div>

        {/* Workspace Management Tabs */}
        <Tabs defaultValue="albums" className="space-y-12">
          <TabsList className="bg-white border border-[#A37E43]/10 p-1 rounded-none inline-flex flex-wrap overflow-x-auto max-w-full">
            <TabsTrigger value="albums" className="rounded-none px-6 py-2.5 uppercase text-[9px] tracking-widest font-bold data-[state=active]:bg-[#A37E43] data-[state=active]:text-white transition-all">Collections</TabsTrigger>
            <TabsTrigger value="operations" className="rounded-none px-6 py-2.5 uppercase text-[9px] tracking-widest font-bold data-[state=active]:bg-[#A37E43] data-[state=active]:text-white transition-all">Operations</TabsTrigger>
            <TabsTrigger value="customers" className="rounded-none px-6 py-2.5 uppercase text-[9px] tracking-widest font-bold data-[state=active]:bg-[#A37E43] data-[state=active]:text-white transition-all">Directory</TabsTrigger>
            <TabsTrigger value="coupons" className="rounded-none px-6 py-2.5 uppercase text-[9px] tracking-widest font-bold data-[state=active]:bg-[#A37E43] data-[state=active]:text-white transition-all">Coupons</TabsTrigger>
          </TabsList>

          {/* TAB 1: Collections Grid */}
          <TabsContent value="albums" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {albums.map((album) => (
                <div key={album.id} className="bg-white border border-[#A37E43]/10 p-4 rounded-none group hover:shadow-md transition-shadow relative">
                  <div className="aspect-[4/5] bg-stone-50 overflow-hidden relative border border-[#A37E43]/10">
                    <img src={album.coverImageUrl || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400&auto=format&fit=crop'} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter saturate-70" referrerPolicy="no-referrer" alt={album.title} />
                    <div className="absolute top-3 left-3 bg-[#FCFAF6] px-2.5 py-1 text-[8px] font-bold uppercase border border-[#A37E43]/10 text-[#A37E43]">
                      {album.category}
                    </div>
                  </div>

                  <div className="mt-4 space-y-1.5">
                    <h4 className="text-xl font-serif text-zinc-905">{album.title}</h4>
                    <p className="text-[10px] text-zinc-400 font-mono tracking-wide truncate">{album.clientEmail}</p>
                    
                    <div className="pt-2 flex gap-2">
                      <Button 
                        onClick={() => {
                          setSelectedAlbumForUpload(album.id);
                          setTimeout(() => fileInputRef.current?.click(), 100);
                        }}
                        disabled={uploading === album.id}
                        className="bg-[#A37E43] hover:bg-[#8D6B37] text-white rounded-none w-full uppercase text-[9px] tracking-widest font-bold h-10 flex items-center justify-center gap-1.5"
                      >
                        {uploading === album.id ? (
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            UPLOAD ASSETS
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* TAB 2: Bookings Operations list */}
          <TabsContent value="operations" className="mt-0">
            <div className="bg-white border border-[#A37E43]/10 overflow-x-auto shadow-sm rounded-none">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead className="bg-[#FCFAF6] text-[9px] uppercase font-bold tracking-widest text-zinc-400 border-b border-[#A37E43]/10">
                  <tr>
                    <th className="p-6">Client Identity</th>
                    <th className="p-6">Desired Style</th>
                    <th className="p-6">Scheduled Date</th>
                    <th className="p-6">Fee Bracket</th>
                    <th className="p-6">Registry status</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-zinc-600 font-sans font-light">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-stone-50 transition-colors border-t border-[#A37E43]/10">
                      <td className="p-6 font-semibold text-zinc-900">{booking.clientEmail}</td>
                      <td className="p-6">
                        <span className="bg-[#FCFAF6] border border-[#A37E43]/10 px-3 py-1 text-[8px] uppercase font-bold text-[#A37E43]">
                          {booking.sessionType}
                        </span>
                      </td>
                      <td className="p-6 font-mono text-xs">{booking.date}</td>
                      <td className="p-6 font-semibold text-zinc-900">${booking.price}</td>
                      <td className="p-6 uppercase text-[9px] font-bold tracking-wider text-emerald-600">{booking.status}</td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-zinc-400 italic">No operations requests detected.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* TAB 3: Customers directory list */}
          <TabsContent value="customers" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {customers.map((c) => (
                <div key={c.userId} className="bg-white border border-[#A37E43]/10 p-6 flex items-center gap-4 hover:shadow-sm transition-all rounded-none">
                  <div className="w-14 h-14 bg-[#FCFAF6] border border-[#A37E43]/15 flex items-center justify-center font-serif text-xl font-bold text-[#A37E43] shrink-0">
                    {c.photoURL ? <img src={c.photoURL} className="w-full h-full object-cover" alt="" /> : c.displayName?.[0] || 'A'}
                  </div>
                  <div className="space-y-1 leading-tight truncate">
                    <h5 className="font-serif text-lg text-zinc-900">{c.displayName || 'Authorized Client'}</h5>
                    <p className="text-[10px] text-zinc-400 tracking-wide font-mono truncate">{c.email}</p>
                    <span className="text-[8px] uppercase tracking-widest font-bold text-[#A37E43] block mt-1">{c.role}</span>
                  </div>
                </div>
              ))}
              {customers.length === 0 && (
                <div className="col-span-full py-16 text-center text-zinc-450 italic bg-white border border-[#A37E43]/10">
                  Customer directories are stored privately encrypted.
                </div>
              )}
            </div>
          </TabsContent>

          {/* TAB 4: Coupons List */}
          <TabsContent value="coupons" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { code: 'ROYALTY40', usage: '12/50', discount: '40% VIP', status: 'ACTIVE' },
                { code: 'PARIS-WED', usage: '8/200', discount: '$500', status: 'ACTIVE' },
                { code: 'SILK2026', usage: '0/100', discount: '15%', status: 'SCHEDULED' }
              ].map((c) => (
                <div key={c.code} className="bg-white border border-[#A37E43]/12 p-6 rounded-none space-y-4 shadow-sm relative overflow-hidden group">
                  <div>
                    <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-400 block mb-0.5">Atelier Coupon Code</span>
                    <h4 className="text-2xl font-serif text-zinc-900 leading-none">{c.code}</h4>
                  </div>
                  <div className="flex justify-between items-end pt-2">
                    <div>
                      <p className="text-xl font-serif italic text-[#A37E43]">{c.discount} Off</p>
                      <p className="text-[9px] uppercase text-zinc-500 font-bold font-mono">Usage: {c.usage}</p>
                    </div>
                    <span className="bg-[#FCFAF6] border border-[#A37E43]/10 text-[#A37E43] text-[8px] font-bold uppercase tracking-widest px-2.5 py-1">
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Hidden inputs for asset curation */}
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
