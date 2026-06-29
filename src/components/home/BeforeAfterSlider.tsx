import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, Sliders, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShowcaseScene {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  rawFilters: string;
  editedFilters: string;
  accent: string;
}

const scenes: ShowcaseScene[] = [
  {
    id: 'heritage',
    title: 'Heritage Wedding',
    subtitle: 'Golden Hour Muhurat',
    desc: 'Transforming flat RAW camera files into rich, deep golden masterpieces. We restore dynamic range in the skies, apply custom warm gold LUTs, and enhance high-contrast hand-woven fabric textures.',
    image: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=1200&auto=format&fit=crop',
    rawFilters: 'saturate-[0.55] contrast-[0.82] brightness-[1.05] sepia-[0.12] blur-[0.3px]',
    editedFilters: 'saturate-[1.12] contrast-[1.05] brightness-[1.0] contrast-[1.02]',
    accent: 'Heritage Gold'
  },
  {
    id: 'editorial',
    title: 'Fine Art Portrait',
    subtitle: 'Wada Royal Shadows',
    desc: 'An advanced showcase of skin texture preservation and professional shadow recovery. Studio lighting is refined to preserve authentic micro-contrast and deep, rich editorial blacks.',
    image: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=1200&auto=format&fit=crop',
    rawFilters: 'saturate-[0.4] contrast-[0.75] brightness-[1.1] blur-[0.2px] grayscale-[0.2]',
    editedFilters: 'saturate-[1.05] contrast-[1.08] brightness-[0.98]',
    accent: 'Editorial Silk'
  },
  {
    id: 'prewedding',
    title: 'Sunset Chronicles',
    subtitle: 'Lakeside Silhouette',
    desc: 'Bringing back the cinematic drama of sunset sky gradients. Advanced color balancing separates natural twilight blues from glowing gold lens flares, crafting an immersive romantic frame.',
    image: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=1200&auto=format&fit=crop',
    rawFilters: 'saturate-[0.5] contrast-[0.8] brightness-[1.15] sepia-[0.05]',
    editedFilters: 'saturate-[1.15] contrast-[1.04] brightness-[0.95]',
    accent: 'Cosmic Twilight'
  }
];

export const BeforeAfterSlider: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('heritage');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const currentScene = scenes.find(s => s.id === activeTab) || scenes[0];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDraggingRef.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDraggingRef.current = false;
    };
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        handleMove(e.clientX);
      }
    };
    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current) {
        handleMove(e.touches[0].clientX);
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('touchend', handleGlobalMouseUp);
    window.addEventListener('touchmove', handleGlobalTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FCFAF6] border-t border-[#A37E43]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 sm:mb-20">
          <div className="space-y-4 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-[#A37E43] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B8975A] animate-pulse" /> THE CHROMATIC LABORATORY
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif text-zinc-900 tracking-tight leading-none">
              The Art of <span className="italic text-[#A37E43]">Fine-Art</span> Post
            </h2>
            <p className="text-zinc-600 font-light font-sans text-xs sm:text-sm leading-relaxed">
              Drag the golden divider handle interactively to witness the transition from uncompressed raw camera sensor negatives to fully retouched, color-graded masterpieces.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 border-b border-[#A37E43]/10 pb-2 w-full md:w-auto">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                onClick={() => {
                  setActiveTab(scene.id);
                  setSliderPosition(50);
                }}
                className={`text-[9px] sm:text-[10px] uppercase tracking-widest font-bold px-4 py-3 border transition-all duration-300 rounded-none ${
                  activeTab === scene.id
                    ? 'bg-[#A37E43] border-transparent text-white shadow-sm'
                    : 'bg-white border-[#A37E43]/15 text-zinc-500 hover:text-zinc-900 hover:border-[#A37E43]/30'
                }`}
              >
                {scene.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left: Interactive comparison slider box */}
          <div className="lg:col-span-7 space-y-4">
            <div 
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden select-none cursor-ew-resize border border-[#A37E43]/15 bg-[#151310] shadow-2xl"
            >
              {/* Layer 1: Edited Masterpiece (Always in full background) */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={currentScene.image} 
                  alt="Color Graded Masterpiece" 
                  className="w-full h-full object-cover"
                  style={{ filter: currentScene.editedFilters }}
                  draggable="false"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Meta tags on Edited Side */}
                <div className="absolute bottom-6 right-6 z-20 bg-zinc-950/90 text-white backdrop-blur-md px-4 py-3 border border-white/15 shadow-lg">
                  <p className="text-[7px] uppercase tracking-[0.25em] text-[#B8975A] font-bold mb-0.5">Retouching Profile</p>
                  <p className="text-xs font-serif italic text-white font-medium">{currentScene.accent}</p>
                </div>
              </div>

              {/* Layer 2: RAW Negative (Overlay clipped width based on slider position) */}
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden border-r border-white/10"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="absolute inset-0 w-full h-full" style={{ width: containerRef.current?.getBoundingClientRect().width || '100%' }}>
                  <img 
                    src={currentScene.image} 
                    alt="RAW Camera Negative" 
                    className="w-full h-full object-cover max-w-none"
                    style={{ 
                      filter: currentScene.rawFilters,
                      width: containerRef.current?.getBoundingClientRect().width || '100%',
                      height: '100%'
                    }}
                    draggable="false"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Meta tags on RAW Side */}
                  <div className="absolute bottom-6 left-6 z-20 bg-white/95 text-zinc-900 backdrop-blur-md px-4 py-3 border border-zinc-200 shadow-lg whitespace-nowrap">
                    <p className="text-[7px] uppercase tracking-[0.25em] text-zinc-400 font-bold mb-0.5">Sensor Negative</p>
                    <p className="text-xs font-serif italic text-zinc-900 font-semibold">14-Bit Flat RAW</p>
                  </div>
                </div>
              </div>

              {/* Interactive Divider Handle Line */}
              <div 
                className="absolute top-0 bottom-0 z-30 w-[2px] bg-white pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Draggable Circle Handle button */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border border-[#A37E43]/40 flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95">
                  <Sliders className="w-4 h-4 text-[#A37E43] rotate-90" />
                </div>
              </div>

              {/* Guide instructions overlay */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-zinc-900/60 backdrop-blur-sm px-4 py-1.5 rounded-full text-[8px] uppercase tracking-[0.2em] text-white font-bold pointer-events-none flex items-center gap-1.5">
                <Sliders className="w-3 h-3 text-[#B8975A]" /> DRAG HANDLE
              </div>
            </div>
            
            {/* Legend Labels underneath */}
            <div className="flex justify-between text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-400 font-sans px-2">
              <span className="flex items-center gap-1.5 text-zinc-500"><Eye className="w-3.5 h-3.5" /> RAW Camera Profile (Left)</span>
              <span className="flex items-center gap-1.5 text-[#A37E43]">Fine-Art Color Grade (Right) <Sparkles className="w-3.5 h-3.5 text-[#B8975A]" /></span>
            </div>
          </div>

          {/* Right: Informational text & value proposition */}
          <div className="lg:col-span-5 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#A37E43] font-bold pl-3 border-l-2 border-[#A37E43]/30">
                    {currentScene.subtitle}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif text-zinc-900 tracking-tight leading-none">
                    {currentScene.title}
                  </h3>
                </div>

                <p className="text-zinc-600 leading-relaxed text-sm font-light font-sans">
                  {currentScene.desc}
                </p>

                {/* Technical stats breakdown */}
                <div className="space-y-4 pt-4 border-t border-[#A37E43]/10">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Post-Processing Deliverables:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      '14-Bit Exposure Recovery',
                      'High-Contrast Detail Polish',
                      'Custom Signature Golden Tone',
                      'Advanced Micro-Contrast Preservation',
                      'Zero AI Skin-Softening Blurring',
                      'Subtle Natural Film Grain Overlay'
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-zinc-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B8975A] shrink-0 mt-0.5" />
                        <span className="text-[10px] font-sans leading-tight font-medium uppercase tracking-wider">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
