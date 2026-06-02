import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, HelpCircle, MessageSquare, Clock, Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Wedding',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate real studio communication
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message received successfully at our studio!");
    
    // Auto reset representation after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: 'Wedding',
        message: '',
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#FCFAF6] text-[#1A1815] pt-32 pb-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        
        {/* Editorial Heading Section */}
        <div className="space-y-4 mb-16 sm:mb-20 text-center sm:text-left">
          <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#A37E43]">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif tracking-tight leading-[1.1] text-zinc-900">
            Contact our <span className="italic text-[#A37E43]">Studio</span>
          </h1>
          <div className="h-[1px] w-20 bg-[#A37E43]/40 mt-4 mx-auto sm:mx-0" />
          <p className="max-w-xl text-zinc-500 font-light text-xs sm:text-sm md:text-base leading-relaxed mt-4 mx-auto sm:mx-0">
            Please reach out to us to book a photo shoot, check price sheets, explore custom pre-wedding options, or discuss any event dates.
          </p>
        </div>

        {/* Responsive Grid Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Studio Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[21/9] lg:aspect-[4/3] group bg-stone-100 border border-[#A37E43]/10">
              <img
                src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop"
                className="w-full h-full object-cover saturate-75 selection:bg-amber-500/20 group-hover:scale-105 transition-transform duration-1000"
                alt="Studio interior"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/10 mix-blend-overlay" />
              <div className="absolute top-4 left-4 bg-[#FCFAF6] px-3 py-1 border border-[#A37E43]/15 text-[8px] font-bold uppercase tracking-widest text-[#A37E43]">
                Studio HQ
              </div>
            </div>

            {/* Quick Contact Information Blocks */}
            <div className="bg-white p-6 sm:p-8 border border-[#A37E43]/10 space-y-6">
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#A37E43]">Contact Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-none bg-[#FCFAF6] border border-[#A37E43]/15 flex items-center justify-center shrink-0 text-[#A37E43]">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Call or WhatsApp</h4>
                    <p className="text-sm font-semibold text-zinc-800 mt-0.5">+91 9075910381</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-none bg-[#FCFAF6] border border-[#A37E43]/15 flex items-center justify-center shrink-0 text-[#A37E43]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Email Address</h4>
                    <p className="text-sm font-semibold text-zinc-800 mt-0.5">shoot@vsphotography.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-none bg-[#FCFAF6] border border-[#A37E43]/15 flex items-center justify-center shrink-0 text-[#A37E43]">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Office Location</h4>
                    <p className="text-sm font-semibold text-zinc-800 mt-0.5">Colaba Causeway, Block A, Mumbai, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-none bg-[#FCFAF6] border border-[#A37E43]/15 flex items-center justify-center shrink-0 text-[#A37E43]">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Working Hours</h4>
                    <p className="text-xs text-zinc-500 font-light mt-0.5">Mon – Sat: 10:00 AM to 7:30 PM / Closed on Sundays</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#A37E43]/10 p-6 sm:p-10 lg:p-12 shadow-[0_10px_30px_rgba(163,126,67,0.02)]">
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-serif text-zinc-900">Send an Enquiry</h2>
                 <p className="text-xs text-zinc-400 font-light font-sans mt-1">
                   Let us know your event dates and photoshoot requirements.
                 </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#A37E43] font-bold">Your Name *</label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="border-[#A37E43]/15 rounded-none h-12 px-4 focus-visible:ring-1 focus-visible:ring-[#A37E43] text-zinc-800"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#A37E43] font-bold">Email Address *</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. eleanor@example.com"
                      className="border-[#A37E43]/15 rounded-none h-12 px-4 focus-visible:ring-1 focus-visible:ring-[#A37E43] text-zinc-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Phone field */}
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#A37E43] font-bold">Phone Number</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="border-[#A37E43]/15 rounded-none h-12 px-4 focus-visible:ring-1 focus-visible:ring-[#A37E43] text-zinc-800"
                    />
                  </div>

                  {/* Portfolio Interest Selector */}
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#A37E43] font-bold">Shoot Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full border border-[#A37E43]/15 bg-white rounded-none h-12 px-4 uppercase text-[9px] tracking-widest font-bold text-zinc-800 focus:outline-none focus:border-[#A37E43]"
                    >
                      {['Wedding Photography', 'Pre-Wedding Shoot', 'Maternity Shoot', 'Personal Portraits', 'Family & Kids Shoot'].map((opt) => (
                        <option key={opt} value={opt} className="uppercase text-[9px] tracking-wider">{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Details statement block */}
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-[#A37E43] font-bold">Your Message & Event Dates *</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your functions, desired dates, location, budget constraints..."
                    className="border-[#A37E43]/15 rounded-none min-h-[140px] px-4 py-3 text-xs font-light focus-visible:ring-1 focus-visible:ring-[#A37E43] leading-relaxed text-zinc-850"
                  />
                </div>

                {/* Submit action */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-[#A37E43] hover:bg-[#8D6B37] text-white h-14 uppercase font-bold tracking-widest rounded-none text-[9.5px] transition-all flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-4 h-4 mr-1 text-emerald-400 stroke-[3]" /> MESSAGE SENT
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 mr-1" /> SEND ENQUIRY
                    </>
                  )}
                </button>
              </form>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-emerald-600 text-[10px] text-center font-bold tracking-wider uppercase"
                  >
                    Our studio coordinator will reply back to you within 24 hours.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactPage;
