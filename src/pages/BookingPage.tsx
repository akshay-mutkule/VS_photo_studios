import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, Clock, MapPin, Camera, Sparkles, 
  CheckCircle2, CreditCard, ShieldCheck, ChevronRight, 
  ChevronLeft, Smartphone, MessageSquare, Info, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const sessionTypes = [
  { id: 'wedding', name: 'Wedding Anthology', icon: Camera, desc: 'Cinematic coverage of your union.' },
  { id: 'fashion', name: 'Fashion Editorial', icon: Sparkles, desc: 'High-concept aesthetic storytelling.' },
  { id: 'portrait', name: 'Heritage Portrait', icon: Camera, desc: 'Authentic captures of the soul.' },
  { id: 'commercial', name: 'Commercial Brand', icon: Zap, desc: 'Elevating corporate narratives.' },
];

const packages = [
  { id: 'essential', name: 'Essential Archive', price: 850, features: ['4 Hours Coverage', '150 Master Negatives', 'Digital Archive Access'] },
  { id: 'signature', name: 'Signature Collection', price: 1800, features: ['8 Hours Coverage', '350 Master Negatives', 'Fine Art Print Box', '2nd Cinematographer'] },
  { id: 'masterpiece', name: 'Masterpiece Suite', price: 3500, features: ['Unlimited Coverage', '500+ Master Negatives', 'Italian Leather Album', 'Drone Synthesis', 'Priority Processing'] },
];

const timeSlots = [
  '09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '07:00 PM'
];

const BookingPage: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [session, setSession] = React.useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = React.useState<string | null>(null);
  const [timeSlot, setTimeSlot] = React.useState<string | null>(null);
  const [clientInfo, setClientInfo] = React.useState({ name: '', email: '', phone: '', notes: '' });
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const selectedPackageData = packages.find(p => p.id === selectedPackage);

  const handleFinalize = async () => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        ...clientInfo,
        sessionType: session,
        packageName: selectedPackage,
        price: selectedPackageData?.price || 0,
        date: date?.toISOString().split('T')[0],
        timeSlot: timeSlot,
        status: 'pending',
        paymentStatus: 'unpaid',
        createdAt: serverTimestamp()
      });
      
      toast.success("Artistic production initialized. Confirmation sent.");
      setStep(6);
    } catch (err) {
      toast.error("Archive transmission failed. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-40 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-10">
        
        {/* Cinematic Header Overlay */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none opacity-50" />

        <div className="flex flex-col lg:flex-row gap-24 relative z-10">
            {/* Sidebar Status */}
            <div className="lg:w-1/3 xl:w-1/4 space-y-16">
                <div className="space-y-4">
                    <motion.div initial={{ opacity:0, x: -20 }} animate={{ opacity:1, x:0 }} className="flex items-center gap-3">
                        <div className="h-[1px] w-12 bg-primary" />
                        <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary italic">Atelier Reservation</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity:0, y: 20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }} className="text-6xl md:text-8xl font-serif italic text-white tracking-tighter leading-none">
                        Legacy<br/><span className="opacity-30">Production</span>
                    </motion.h1>
                </div>

                <div className="space-y-10 relative pl-4 border-l border-white/5">
                    {[
                        { s: 1, title: 'Visual Genre', sub: 'The artistic direction' },
                        { s: 2, title: 'Inclusion Tier', sub: 'Commission parameters' },
                        { s: 3, title: 'Temporal Slot', sub: 'Archive chronology' },
                        { s: 4, title: 'Registry', sub: 'Entity identification' },
                        { s: 5, title: 'Initialization', sub: 'Financial clearing' }
                    ].map((item) => (
                        <div key={item.s} className="flex gap-8 items-start relative">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-700 ${step === item.s ? 'bg-primary border-primary text-black shadow-[0_0_25px_rgba(212,175,55,0.4)]' : step > item.s ? 'bg-zinc-900 border-zinc-800 text-primary' : 'border-white/5 text-zinc-700'}`}>
                                {step > item.s ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-[10px] font-bold">{item.s}</span>}
                            </div>
                            <div className="space-y-1">
                                <h4 className={`text-[10px] uppercase font-bold tracking-widest transition-colors ${step >= item.s ? 'text-white' : 'text-zinc-600'}`}>{item.title}</h4>
                                <p className="text-[9px] uppercase tracking-[0.2em] font-medium text-zinc-500 italic opacity-60">{item.sub}</p>
                            </div>
                            {step === item.s && (
                                <motion.div layoutId="activeStep" className="absolute -left-[5px] w-2 h-10 bg-primary shadow-[0_0_15px_rgba(212,175,55,0.8)] rounded-full" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Live Stats Mock */}
                <div className="glass border-white/10 p-10 rounded-[3rem] space-y-6">
                    <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-emerald-500 animate-pulse" />
                        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40">Studio Availability</span>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-[11px] font-bold tracking-widest">
                            <span className="text-zinc-500">Q3 Slots Remaining</span>
                            <span className="text-white">12/45</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[27%]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Form Area */}
            <div className="flex-grow w-full max-w-5xl">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.8 }} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {sessionTypes.map((type) => (
                                    <button 
                                        key={type.id} 
                                        onClick={() => { setSession(type.name); nextStep(); }}
                                        className={`group relative p-16 text-left rounded-[3.5rem] border transition-all duration-700 overflow-hidden ${session === type.name ? 'border-primary bg-primary/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)]' : 'border-white/5 glass hover:border-white/20'}`}
                                    >
                                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <type.icon size={80} />
                                        </div>
                                        <div className="space-y-8 relative z-10">
                                            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center glass border transition-colors ${session === type.name ? 'border-primary text-primary' : 'border-white/10 text-white/30 group-hover:text-primary group-hover:border-primary/50'}`}>
                                                <type.icon size={32} />
                                            </div>
                                            <div className="space-y-3">
                                                <h3 className="text-4xl font-serif italic text-white tracking-tight">{type.name}</h3>
                                                <p className="text-zinc-500 text-[11px] uppercase tracking-[0.25em] font-bold leading-relaxed">{type.desc}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {packages.map((pkg) => (
                                    <button 
                                        key={pkg.id} 
                                        onClick={() => { setSelectedPackage(pkg.id); nextStep(); }}
                                        className={`group relative p-12 text-left rounded-[3.5rem] border transition-all duration-700 ${selectedPackage === pkg.id ? 'border-primary bg-primary/5 shadow-2xl scale-[1.02]' : 'border-white/5 glass hover:border-white/20'}`}
                                    >
                                        <div className="space-y-10">
                                            <div>
                                                <h4 className="text-2xl font-serif italic text-white mb-2">{pkg.name}</h4>
                                                <p className="text-4xl font-bold text-primary tracking-tighter">${pkg.price}</p>
                                            </div>
                                            <ul className="space-y-4">
                                                {pkg.features.map(f => (
                                                    <li key={f} className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                                                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                            <Button variant="outline" className={`w-full h-14 rounded-full border-white/10 uppercase tracking-widest text-[10px] font-bold ${selectedPackage === pkg.id ? 'bg-primary text-black' : 'glass'}`}>Select Tier</Button>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <Button variant="ghost" onClick={prevStep} className="text-zinc-600 hover:text-white uppercase tracking-widest font-bold text-[10px]"><ChevronLeft className="w-4 h-4 mr-2" /> Revise Genre</Button>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" className="grid grid-cols-1 xl:grid-cols-2 gap-16">
                            <div className="space-y-8">
                                <Label className="text-[11px] uppercase tracking-[0.4em] font-bold text-zinc-600 italic">Temporal Choice</Label>
                                <div className="glass p-10 rounded-[3.5rem] border-white/10 flex justify-center shadow-2xl">
                                    <Calendar 
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="text-white border-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-12">
                                <div className="space-y-8">
                                    <Label className="text-[11px] uppercase tracking-[0.4em] font-bold text-zinc-600 italic">Preferred Luminous Window</Label>
                                    <div className="grid grid-cols-1 gap-4">
                                        {timeSlots.map(slot => (
                                            <button 
                                                key={slot} 
                                                onClick={() => setTimeSlot(slot)}
                                                className={`h-20 px-10 rounded-full border transition-all flex items-center justify-between group ${timeSlot === slot ? 'border-primary bg-primary/5 text-primary' : 'border-white/5 glass text-white/30 hover:border-white/20 hover:text-white'}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <Clock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm font-serif italic uppercase tracking-widest font-bold">{slot}</span>
                                                </div>
                                                {timeSlot === slot && <CheckCircle2 className="w-5 h-5" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-6 pt-4">
                                    <Button variant="outline" onClick={prevStep} className="h-16 w-32 rounded-full glass border-white/5 text-zinc-500"><ChevronLeft /></Button>
                                    <Button disabled={!timeSlot} onClick={nextStep} className="grow h-16 bg-primary text-black hover:bg-accent rounded-full font-bold uppercase tracking-[0.4em] text-[11px] shadow-[0_10px_30px_rgba(212,175,55,0.2)]">Secure Timeline</Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div key="step4" className="max-w-2xl mx-auto space-y-12">
                            <div className="space-y-10 glass border-white/10 p-16 rounded-[4rem] shadow-2xl">
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <Label className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Full Entity Attribution</Label>
                                        <Input 
                                            value={clientInfo.name} 
                                            onChange={e => setClientInfo({...clientInfo, name: e.target.value})}
                                            placeholder="GIOVANNI ROSSI" 
                                            className="h-20 glass border-white/5 rounded-[2rem] px-10 text-lg font-serif italic text-white placeholder:text-zinc-800 focus-visible:ring-primary/40" 
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <Label className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Electronic Mail</Label>
                                            <Input 
                                                value={clientInfo.email} 
                                                onChange={e => setClientInfo({...clientInfo, email: e.target.value})}
                                                placeholder="ARCHIVE@VS.STUDIO" 
                                                className="h-16 glass border-white/5 rounded-full px-8 text-sm font-bold tracking-widest text-white/60 focus-visible:ring-primary/40" 
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <Label className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Communication Hub</Label>
                                            <Input 
                                                value={clientInfo.phone} 
                                                onChange={e => setClientInfo({...clientInfo, phone: e.target.value})}
                                                placeholder="+39 XXX XXX XXXX" 
                                                className="h-16 glass border-white/5 rounded-full px-8 text-sm font-bold tracking-widest text-white/60 focus-visible:ring-primary/40" 
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <Label className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Cinematic Brief & Nuances</Label>
                                        <Textarea 
                                            value={clientInfo.notes} 
                                            onChange={e => setClientInfo({...clientInfo, notes: e.target.value})}
                                            placeholder="Detail the narrative context of this production..." 
                                            className="min-h-[200px] glass border-white/5 rounded-[2rem] p-10 text-zinc-400 font-serif italic leading-relaxed focus-visible:ring-primary/40"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <Button variant="outline" onClick={prevStep} className="h-16 w-32 rounded-full glass border-white/5 text-zinc-500"><ChevronLeft /></Button>
                                    <Button disabled={!clientInfo.name || !clientInfo.email} onClick={nextStep} className="grow h-16 bg-primary text-black hover:bg-accent rounded-full font-bold uppercase tracking-[0.4em] text-[11px] shadow-[0_10px_30px_rgba(212,175,55,0.2)]">Verify Identity</Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 5 && (
                        <motion.div key="step5" className="max-w-4xl mx-auto space-y-16">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                <div className="space-y-12">
                                     <div className="space-y-6">
                                        <h4 className="text-[11px] uppercase tracking-[0.5em] text-primary font-bold">Commission Summary</h4>
                                        <div className="glass border-white/5 rounded-[3.5rem] p-12 space-y-10">
                                            <div className="flex justify-between items-end border-b border-white/5 pb-8">
                                                <div className="space-y-1">
                                                    <p className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">Volume / Tier</p>
                                                    <p className="text-3xl font-serif italic text-white">{selectedPackageData?.name}</p>
                                                </div>
                                                <p className="text-3xl font-bold text-primary tracking-tighter">${selectedPackageData?.price}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-8">
                                                 <div className="space-y-1">
                                                    <p className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">Visual Genre</p>
                                                    <p className="text-sm font-bold text-white/50 tracking-widest uppercase">{session}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">Targeted Chronology</p>
                                                    <p className="text-sm font-bold text-white/50 tracking-widest uppercase">{date?.toDateString()} @ {timeSlot}</p>
                                                </div>
                                            </div>
                                        </div>
                                     </div>

                                     <div className="p-10 glass border-primary/20 bg-primary/5 rounded-[2.5rem] flex gap-6 items-start">
                                        <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                                        <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] leading-relaxed font-bold italic">
                                            Authorized encryption active. Your data residency is strictly managed under the Lumière Protocol and GDPR Article 17.
                                        </p>
                                     </div>
                                </div>

                                <div className="space-y-10">
                                    <h4 className="text-[11px] uppercase tracking-[0.5em] text-white/30 font-bold">Secured Settlement</h4>
                                    <div className="glass border-white/10 p-12 rounded-[4rem] space-y-10 shadow-2xl">
                                        <div className="space-y-6">
                                            <div className="relative group">
                                                <CreditCard className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-primary transition-colors" />
                                                <Input placeholder="CARD QUANTUM ID" className="h-20 glass border-white/5 rounded-full pl-20 pr-8 text-[11px] uppercase font-bold tracking-[0.4em] focus-visible:ring-primary/40" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input placeholder="EXPIRA" className="h-16 glass border-white/5 rounded-full px-10 text-[10px] uppercase font-bold tracking-widest" />
                                                <Input placeholder="CVV" className="h-16 glass border-white/5 rounded-full px-10 text-[10px] uppercase font-bold tracking-widest" />
                                            </div>
                                        </div>
                                        <Separator className="bg-white/5" />
                                        <div className="space-y-6">
                                             <div className="flex justify-between items-center px-4">
                                                <span className="text-[10px] uppercase text-zinc-600 font-bold tracking-widest">Initialization Deposit (50%)</span>
                                                <span className="text-xl font-serif italic text-white">${(selectedPackageData?.price || 0) * 0.5}</span>
                                             </div>
                                             <Button 
                                                disabled={isSubmitting}
                                                onClick={handleFinalize}
                                                className="w-full h-24 bg-white text-black hover:bg-zinc-200 rounded-[2.5rem] font-bold uppercase tracking-[0.5em] text-[12px] shadow-2xl transition-transform active:scale-95 flex items-center justify-center gap-4 group"
                                            >
                                                {isSubmitting ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : (
                                                    <>
                                                        Initialize Commission
                                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-4 transition-transform" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" onClick={prevStep} className="mx-auto block text-zinc-700 hover:text-white uppercase tracking-widest font-bold text-[10px]">Abandon Initialization</Button>
                        </motion.div>
                    )}

                    {step === 6 && (
                        <motion.div key="step6" className="max-w-2xl mx-auto py-24 text-center space-y-16 glass border-white/10 p-20 rounded-[5rem] relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/[0.02] animate-pulse" />
                            <div className="relative group">
                                <div className="w-32 h-32 bg-primary rounded-[2.5rem] flex items-center justify-center mx-auto shadow-[0_0_80px_rgba(212,175,55,0.4)] rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                                    <CheckCircle2 className="w-16 h-16 text-black" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-6xl font-serif italic text-white tracking-tight leading-none">Commission<br/><span className="text-primary italic">Secured</span></h2>
                                <p className="text-zinc-500 font-serif italic text-xl leading-relaxed max-w-sm mx-auto">Your artistic journey has been added to our archival queue. Our executive director will reach out within 2 daylight hours.</p>
                            </div>
                            <div className="flex flex-col gap-4 pt-10">
                                <Button className="h-16 glass border-white/10 text-white rounded-full flex items-center justify-center gap-3 uppercase text-[10px] font-bold tracking-[0.4em] hover:bg-white/5">
                                    <Smartphone className="w-4 h-4 text-primary" /> Transmit to Calendar
                                </Button>
                                <a href="https://wa.me/919075910381" target="_blank" rel="noopener noreferrer" className="block">
                                    <Button className="h-16 w-full glass border-primary/20 text-primary bg-primary/5 rounded-full flex items-center justify-center gap-3 uppercase text-[10px] font-bold tracking-[0.4em] hover:bg-primary/10">
                                        <MessageSquare className="w-4 h-4" /> Priority WhatsApp Connect
                                    </Button>
                                </a>
                            </div>
                            <Separator className="bg-white/5 my-10" />
                            <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-zinc-700">Studio ID: VS-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

