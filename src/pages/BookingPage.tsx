import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, Clock, MapPin, Camera, Sparkles, 
  CheckCircle2, CreditCard, ShieldCheck, ChevronRight, 
  ChevronLeft, Smartphone, MessageSquare, Info, Zap, Mail, Phone, Compass
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

const sessionTypes = [
  { id: 'wedding', name: 'Wedding Anthology', icon: Camera, desc: 'Bespoke documentation of your union.' },
  { id: 'fashion', name: 'Fashion Editorial', icon: Sparkles, desc: 'High-concept visual storytelling.' },
  { id: 'portrait', name: 'Heritage Portrait', icon: Camera, desc: 'Authentic medium-format captures.' },
  { id: 'travel', name: 'Travel & Lifestyle', icon: Compass, desc: 'Cinematic destination excursions.' },
];

const packages = [
  { id: 'essential', name: 'Essential Archive', price: 950, features: ['4 Hours Coverage', '150 High-Res Master files', 'Private Handcrafted Gallery', 'Personal Print License'] },
  { id: 'signature', name: 'Signature Suite', price: 1900, features: ['8 Hours Coverage', '350 High-Res Master files', 'Fine-Art Keepsake Box', 'Private Online Gallery', '2nd Professional Photographer'] },
  { id: 'masterpiece', name: 'Masterpiece Commission', price: 3800, features: ['Full Day Coverage', '550+ Cinematic Captures', 'Handmade Leather Album', 'Highlight Video reel', 'Priority 48hr delivery'] },
];

const timeSlots = [
  '09:00 AM (Soft sunrise)', '11:30 AM (Bright sky)', '02:00 PM (Direct studio)', '04:30 PM (Golden hour)', '07:00 PM (Twilight blue)'
];

const BookingPage: React.FC = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [session, setSession] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '', notes: '' });
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (user && !clientInfo.name) {
      setClientInfo(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const selectedPackageData = packages.find(p => p.id === selectedPackage);

  const handleFinalize = async () => {
    // Form Validation helper
    if (!clientInfo.name.trim()) {
      toast.error("Please specify your name.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientInfo.email)) {
      toast.error("Please enter a valid electronic email address.");
      return;
    }
    if (!clientInfo.phone.trim()) {
      toast.error("Please enter a valid mobile number.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        ...clientInfo,
        clientId: user?.uid || 'guest-anon',
        sessionType: session,
        packageName: selectedPackage,
        price: selectedPackageData?.price || 0,
        date: date?.toISOString().split('T')[0],
        timeSlot: timeSlot,
        status: 'pending',
        paymentStatus: 'unpaid',
        createdAt: serverTimestamp()
      });
      
      toast.success("Bespoke production requested successfully!");
      setStep(6);
    } catch (err) {
      console.error("Booking submission error:", err);
      toast.error("Failed to persist request. Please try again or click the WhatsApp key.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-[#FCFAF6] text-[#1A1815] pt-32 pb-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Upper Editorial Title */}
        <div className="text-center space-y-4 mb-20">
          <span className="text-[10px] tracking-[0.5em] font-bold uppercase text-[#A37E43]">
            Atelier reservation
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-zinc-900 tracking-tight">
            Schedule <span className="italic text-[#A37E43]">Production</span>
          </h1>
          <p className="max-w-md mx-auto text-xs sm:text-sm text-zinc-500 font-light leading-relaxed">
            Specify your timeline, artistic genre, and chosen session package parameters to reserve your visual heirloom.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Flow Tracker & Address Metadata */}
          <div className="lg:w-1/3 space-y-12">
            
            {/* Live Progress Nodes */}
            <div className="space-y-6 relative pl-3 border-l border-[#A37E43]/15">
              {[
                { s: 1, title: 'Artistic Genre', sub: 'Chose medium format style' },
                { s: 2, title: 'Inclusion Tier', sub: 'Archive parameters' },
                { s: 3, title: 'Temporal slot', sub: 'Calendar & Daylight hour' },
                { s: 4, title: 'Registration Brief', sub: 'Entity contact information' },
                { s: 5, title: 'Bespoke Clearing', sub: 'Initialization summary' }
              ].map((item) => (
                <div key={item.s} className="flex gap-4 items-center relative py-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-[10px] font-bold transition-all duration-500 ${
                    step === item.s 
                      ? 'bg-[#A37E43] border-[#A37E43] text-white shadow-md' 
                      : step > item.s 
                        ? 'bg-zinc-900 border-transparent text-white' 
                        : 'border-[#A37E43]/20 text-zinc-400 bg-white'
                  }`}>
                    {step > item.s ? <CheckCircle2 className="w-4 h-4 text-[#B8975A]" /> : item.s}
                  </div>
                  <div>
                    <h4 className={`text-[10px] uppercase font-bold tracking-widest ${step >= item.s ? 'text-zinc-900' : 'text-zinc-400'}`}>
                      {item.title}
                    </h4>
                    <span className="text-[9px] text-zinc-400 uppercase tracking-wider block font-light">
                      {item.sub}
                    </span>
                  </div>
                  {step === item.s && (
                    <motion.div layoutId="flowBubble" className="absolute -left-[15px] w-1.5 h-6 bg-[#A37E43] rounded-full" />
                  )}
                </div>
              ))}
            </div>

            {/* Offline Studio Information Map and details */}
            <div className="bg-white border border-[#A37E43]/10 p-8 rounded-none space-y-6 shadow-sm">
              <h4 className="text-xs uppercase font-bold tracking-widest text-[#A37E43]">
                PHYSICAL ATELIER
              </h4>
              <div className="space-y-4 text-xs font-light text-zinc-650">
                <p className="flex items-start gap-2 leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#A37E43] shrink-0 mt-0.5" />
                  <span>Suite 45, Rue de l'Académie, 75006 Paris, France</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#A37E43] shrink-0" />
                  <span>+33 1 45 67 89 00</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#A37E43] shrink-0" />
                  <span>atelier@vsstudios.com</span>
                </p>
              </div>

              {/* High-End Direct Map embed Iframe */}
              <div className="h-44 w-full border border-[#A37E43]/10 overflow-hidden relative">
                <iframe
                  title="VS Studio Paris Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937586!2d2.32996231567439!3d48.8583700792873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sus!4v1689201994321!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.85) contrast(1.1)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Direct Concierge Assist */}
              <div className="pt-2">
                <a href="https://wa.me/919075910381" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full h-12 border-[#A37E43]/30 hover:border-[#A37E43] hover:bg-[#A37E43]/5 text-[#A37E43] rounded-none uppercase text-[9px] tracking-widest font-bold flex items-center justify-center gap-2 transition-all">
                    <MessageSquare className="w-4 h-4" />
                    CHOP CONCIERGE ON WHATSAPP
                  </Button>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Step Widgets Container */}
          <div className="flex-grow w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Select Session Type */}
              {step === 1 && (
                <motion.div key="st1" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-6">
                  <h3 className="text-xl font-serif text-zinc-900 border-b border-[#A37E43]/10 pb-3">
                    01. Select Photographic Genre
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {sessionTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => { setSession(type.name); nextStep(); }}
                        className={`group relative p-8 text-left rounded-none border transition-all duration-300 ${
                          session === type.name 
                            ? 'border-[#A37E43] bg-white shadow-md' 
                            : 'border-[#A37E43]/10 bg-white hover:border-[#A37E43]/40'
                        }`}
                      >
                        <div className="space-y-6">
                          <div className={`w-12 h-12 flex items-center justify-center border transition-all ${
                            session === type.name ? 'bg-[#A37E43] border-[#A37E43] text-white' : 'border-[#A37E43]/10 text-[#A37E43] group-hover:bg-[#A37E43] group-hover:text-white'
                          }`}>
                            <type.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-lg font-serif text-zinc-900 font-medium">{type.name}</h4>
                            <p className="text-zinc-500 font-sans text-xs font-light mt-1">{type.desc}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Select Package Tier */}
              {step === 2 && (
                <motion.div key="st2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="text-xl font-serif text-zinc-900 border-b border-[#A37E43]/10 pb-3 flex justify-between items-center">
                    <span>02. Choose Archival Tier</span>
                    <button onClick={prevStep} className="text-xs uppercase tracking-widest text-zinc-400 hover:text-zinc-900">&larr; Back</button>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className={`p-6 border transition-all flex flex-col justify-between ${
                          selectedPackage === pkg.id 
                            ? 'border-[#A37E43] bg-white shadow-md' 
                            : 'border-[#A37E43]/10 bg-white'
                        }`}
                      >
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-base font-serif italic text-zinc-900">{pkg.name}</h4>
                            <p className="text-3xl font-light text-[#A37E43] tracking-tight mt-1">${pkg.price}</p>
                          </div>
                          <ul className="space-y-2 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                            {pkg.features.map(f => (
                              <li key={f} className="flex items-center gap-1.5 leading-relaxed">
                                <div className="w-1 h-1 bg-[#A37E43] rounded-full" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button
                          onClick={() => { setSelectedPackage(pkg.id); nextStep(); }}
                          className={`w-full mt-6 h-12 rounded-none uppercase tracking-[0.2em] text-[9px] font-bold ${
                            selectedPackage === pkg.id ? 'bg-[#A37E43] text-white' : 'bg-transparent border border-[#A37E43]/30 text-[#A37E43] hover:bg-[#A37E43] hover:text-white'
                          }`}
                        >
                          SELECT TIER &rarr;
                        </Button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Dates and Windows */}
              {step === 3 && (
                <motion.div key="st3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <h3 className="text-xl font-serif text-zinc-900 border-b border-[#A37E43]/10 pb-3 flex justify-between items-center">
                    <span>03. Temporal Slot的选择</span>
                    <button onClick={prevStep} className="text-xs uppercase tracking-widest text-zinc-400 hover:text-zinc-900">&larr; Back</button>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 border border-[#A37E43]/10">
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase font-bold tracking-widest text-[#A37E43]">Select Shoot Date</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="border border-[#A37E43]/10 rounded-none bg-[#FCFAF6] shadow-inner"
                      />
                    </div>

                    <div className="space-y-5 flex flex-col justify-between">
                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-bold tracking-widest text-[#A37E43]">Daylight Hour Choice</Label>
                        <div className="space-y-2">
                          {timeSlots.map(slot => (
                            <button
                              key={slot}
                              onClick={() => setTimeSlot(slot)}
                              className={`h-12 px-4 border text-left w-full transition-all text-xs tracking-wider flex items-center justify-between ${
                                timeSlot === slot 
                                  ? 'border-[#A37E43] bg-[#A37E43]/5 text-[#A37E43] font-semibold' 
                                  : 'border-[#A37E43]/10 bg-[#FCFAF6] text-zinc-500 hover:border-zinc-400 hover:text-zinc-900'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-[#A37E43]" />
                                <span>{slot}</span>
                              </div>
                              {timeSlot === slot && <CheckCircle2 className="w-4 h-4 text-[#A37E43]" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Button
                        disabled={!timeSlot}
                        onClick={nextStep}
                        className="h-14 bg-[#A37E43] hover:bg-[#8D6B37] text-white rounded-none font-bold uppercase tracking-[0.3em] text-[10px]"
                      >
                        CONFIRM CHRONOLOGY &rarr;
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Client Registry Info */}
              {step === 4 && (
                <motion.div key="st4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="text-xl font-serif text-zinc-900 border-b border-[#A37E43]/10 pb-3 flex justify-between items-center">
                    <span>04. Client Brief & Registry</span>
                    <button onClick={prevStep} className="text-xs uppercase tracking-widest text-zinc-400 hover:text-zinc-900">&larr; Back</button>
                  </h3>

                  <div className="bg-white border border-[#A37E43]/10 p-8 space-y-6 rounded-none shadow-sm">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Full Name</Label>
                      <Input
                        value={clientInfo.name}
                        onChange={e => setClientInfo({...clientInfo, name: e.target.value})}
                        placeholder="e.g. Sarah Elizabeth Jenkins"
                        className="h-12 border-[#A37E43]/15 rounded-none px-4 text-sm focus-visible:ring-[#A37E43]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Email Address</Label>
                        <Input
                          value={clientInfo.email}
                          onChange={e => setClientInfo({...clientInfo, email: e.target.value})}
                          placeholder="e.g. sarah@example.com"
                          type="email"
                          className="h-12 border-[#A37E43]/15 rounded-none px-4 text-sm focus-visible:ring-[#A37E43]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Phone Code</Label>
                        <Input
                          value={clientInfo.phone}
                          onChange={e => setClientInfo({...clientInfo, phone: e.target.value})}
                          placeholder="e.g. +1 (555) 234-5678"
                          className="h-12 border-[#A37E43]/15 rounded-none px-4 text-sm focus-visible:ring-[#A37E43]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Atmospheric Notes & Creative Desires</Label>
                      <Textarea
                        value={clientInfo.notes}
                        onChange={e => setClientInfo({...clientInfo, notes: e.target.value})}
                        placeholder="Detail any destination logistics, stylistic lookboards, or specific portraits requested..."
                        className="min-h-[140px] border-[#A37E43]/15 rounded-none p-4 text-sm focus-visible:ring-[#A37E43]"
                      />
                    </div>

                    <Button
                      disabled={!clientInfo.name || !clientInfo.email}
                      onClick={nextStep}
                      className="w-full h-14 bg-[#A37E43] hover:bg-[#8D6B37] text-white font-bold uppercase tracking-[0.3em] text-[10px] rounded-none shadow-md"
                    >
                      CLEAR TO SUMMARIZE &rarr;
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Commission Summary and Firestore Clearing */}
              {step === 5 && (
                <motion.div key="st5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="text-xl font-serif text-zinc-900 border-b border-[#A37E43]/10 pb-3 flex justify-between items-center">
                    <span>05. Secured Production Clearing</span>
                    <button onClick={prevStep} className="text-xs uppercase tracking-widest text-zinc-400 hover:text-zinc-900">&larr; Back</button>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Summary Card */}
                    <div className="bg-white border border-[#A37E43]/15 p-8 rounded-none space-y-6 shadow-sm">
                      <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#A37E43]">Commission Statement</h4>
                      <div className="space-y-4 text-sm">
                        <div className="flex justify-between border-b border-[#A37E43]/10 pb-3">
                          <span className="text-zinc-500">Tier:</span>
                          <span className="font-bold text-zinc-905">{selectedPackageData?.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#A37E43]/10 pb-3">
                          <span className="text-zinc-500">Genre:</span>
                          <span className="font-semibold text-zinc-905">{session}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#A37E43]/10 pb-3">
                          <span className="text-zinc-500">Target Date:</span>
                          <span className="font-semibold text-zinc-905">{date?.toDateString()}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#A37E43]/10 pb-3">
                          <span className="text-zinc-500">Chosen hour:</span>
                          <span className="font-semibold text-[#A37E43]">{timeSlot}</span>
                        </div>
                        <div className="flex justify-between pt-2">
                          <span className="text-base font-bold text-zinc-900">Total Price:</span>
                          <span className="text-2xl font-serif text-[#A37E43] font-semibold">${selectedPackageData?.price}</span>
                        </div>
                      </div>

                      <div className="bg-[#FCFAF6] border border-[#A37E43]/10 p-4 flex gap-3 text-zinc-500 text-[10px] tracking-wide leading-relaxed uppercase">
                        <ShieldCheck className="w-5 h-5 text-[#A37E43] shrink-0" />
                        <span>The commission files will be stored permanently inside your secure private Client Gallery for high-res downloads.</span>
                      </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="bg-white border border-[#A37E43]/15 p-8 rounded-none space-y-6 shadow-sm flex flex-col justify-between">
                      <div className="space-y-4">
                        <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400">Instantiate Request</h4>
                        <p className="text-xs text-zinc-500 font-light leading-relaxed">
                          By clicking below, you submit your photographic parameters to the VS Studio curating team. No immediate financial credit card charge occurs until scope alignment.
                        </p>
                      </div>

                      <Button
                        disabled={isSubmitting}
                        onClick={handleFinalize}
                        className="w-full h-16 bg-[#A37E43] hover:bg-[#8D6B37] text-white font-bold uppercase tracking-[0.3em] text-[11px] rounded-none shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            CONFIRM COMMISSION &rarr;
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 6: Success Notification */}
              {step === 6 && (
                <motion.div key="st6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-[#A37E43]/15 p-12 text-center space-y-10 max-w-xl mx-auto shadow-sm">
                  <div className="w-20 h-20 rounded-full border border-[#B8975A] bg-[#FCFAF6] flex items-center justify-center mx-auto text-[#A37E43] animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-3xl font-serif text-zinc-900 leading-tight">Timeline Secured!</h2>
                    <p className="text-zinc-500 font-light text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                      Thank you. Your request has been written successfully to our archive. Our chief director will reach out within 2 daylight hours to finalize coordinates.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 max-w-xs mx-auto">
                    <a href="https://wa.me/919075910381" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-[9px] rounded-none flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        INSTANT WHATSAPP CONNECT
                      </Button>
                    </a>
                    <Button onClick={() => setStep(1)} className="w-full h-12 bg-transparent hover:bg-zinc-100 text-zinc-500 border border-zinc-200 uppercase tracking-widest text-[9px] rounded-none">
                      BOOK ANOTHER EVENT
                    </Button>
                  </div>
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
