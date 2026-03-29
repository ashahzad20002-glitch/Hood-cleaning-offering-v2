import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  CheckCircle, ChevronRight, ChevronLeft, ArrowRight, 
  TrendingUp, Star, Quote, 
  Menu, X, Check, ArrowUpRight, Target, MapPin, Loader2, AlertCircle,
  Building2, Utensils, School, Hospital, ChefHat, Store,
  Package, Filter, Zap, MessageSquare, Calendar, BarChart3,
  Lock, Phone, Mail, Globe, Home,
  MessageCircle, FileText, RefreshCw, CheckCircle2, Maximize2, Search, Minus, Plus
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

// Feature Flags System
type FeatureFlags = {
  showSeoUpgrade: boolean;
  showEngine1: boolean;
  showEngine2: boolean;
  showMonth3Upgrade: boolean;
  showStickyCTA: boolean;
  showTerritoryScanner: boolean;
  showPricing: boolean;
};

const FeatureFlagContext = createContext<{
  flags: FeatureFlags;
  toggleFlag: (key: keyof FeatureFlags) => void;
}>({
  flags: {
    showSeoUpgrade: true,
    showEngine1: true,
    showEngine2: true,
    showMonth3Upgrade: true,
    showStickyCTA: true,
    showTerritoryScanner: true,
    showPricing: true,
  },
  toggleFlag: () => {},
});

const FeatureProvider = ({ children }: { children: React.ReactNode }) => {
  const [flags, setFlags] = useState<FeatureFlags>({
    showSeoUpgrade: true,
    showEngine1: true,
    showEngine2: true,
    showMonth3Upgrade: true,
    showStickyCTA: true,
    showTerritoryScanner: true,
    showPricing: true,
  });

  const toggleFlag = (key: keyof FeatureFlags) => {
    setFlags(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <FeatureFlagContext.Provider value={{ flags, toggleFlag }}>
      {children}
      <WhatsAppButton />
    </FeatureFlagContext.Provider>
  );
};

const useFeatures = () => useContext(FeatureFlagContext);

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/971555253308"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
      aria-label="Chat on WhatsApp"
    >
      <svg 
        viewBox="0 0 24 24" 
        width="30" 
        height="30" 
        fill="white"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-800">
        Chat with us
      </span>
    </a>
  );
};

const Reveal = ({ children, delay = 0, className = "", onClick, as = "div" }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key, onClick?: () => void, as?: any }) => {
  const MotionComponent = motion[as as keyof typeof motion] as any;
  return (
    <MotionComponent
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      onClick={onClick}
    >
      {children}
    </MotionComponent>
  );
};

const CallToAction = ({ text = "Book a Call", className = "" }: { text?: string, className?: string }) => (
  <div className={`mt-10 md:mt-12 text-center ${className}`}>
    <a 
      href="https://calendly.com/adil_shahzad_khawaja/30min" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f59e0b] to-[#fcd34d] text-slate-950 px-6 py-3 rounded-xl font-bold hover:scale-105 hover:shadow-lg active:scale-95 transition-all shadow-[0_0_30px_rgba(245,197,94,0.25)] text-sm md:text-base"
    >
      {text} <ArrowRight size={18} />
    </a>
  </div>
);

const SystemInstalls = () => {
  const { flags } = useFeatures();
  return (
    <section className="py-8 md:py-10 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="bg-[#0f172a] border border-slate-800/60 rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl">
            <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-4">
              What the system installs
            </div>
            
            <div className="flex flex-col gap-4">
              {/* Engine 1 */}
              {flags.showEngine1 && (
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-white mb-2">Engine 1 — New Contract Pipeline</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Paid demand capture, walkthrough funnel, instant follow-up, and quote chase built to move serious commercial buyers faster.</p>
                </div>
              )}
              
              {/* Engine 2 */}
              {flags.showEngine2 && (
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-white mb-2">Engine 2 — Renewal + Reactivation Engine</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Due-date reminders, lapsed-account recovery, and renewal flows that help protect recurring contract value you already earned.</p>
                </div>
              )}
              
              {/* Month 3 */}
              {flags.showMonth3Upgrade && (
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-white mb-2">Month 3 Upgrade — Organic Demand Layer</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">SEO, Google Business Profile optimization, service pages, and city pages built around the services and territories already proving out in paid.</p>
                </div>
              )}
              
              {/* Guarantee Card */}
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-800/20 border border-slate-700/50 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-2">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">12 qualified walkthrough requests in 30 days</h3>
                  <p className="text-slate-400 text-xs">Or we keep working until you do, under the defined launch conditions</p>
                </div>
                <a href="https://calendly.com/adil_shahzad_khawaja/30min" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-bold transition-colors text-sm">
                  Check Pricing
                </a>
              </div>
            </div>
            
            <CallToAction text="Discuss System Implementation" className="mt-10" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-panel border-b border-slate-800/50 shadow-lg' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-200 flex items-center justify-center text-slate-950 font-black text-base shadow-[0_0_20px_rgba(245,197,94,0.3)]">
            HC
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xs leading-tight">Contract Engine</span>
            <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Recurring commercial contracts</span>
          </div>
        </a>
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <a href="#problem" className="relative hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-400 after:to-amber-200 after:transition-all after:duration-300 hover:after:w-full">Problem</a>
          <a href="#solution" className="relative hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-400 after:to-amber-200 after:transition-all after:duration-300 hover:after:w-full">How It Works</a>
          <a href="#case-studies" className="relative hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-400 after:to-amber-200 after:transition-all after:duration-300 hover:after:w-full">Case Studies</a>
          <a href="#pricing" className="relative hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-400 after:to-amber-200 after:transition-all after:duration-300 hover:after:w-full">Pricing</a>
        </div>
        <div className="hidden md:block">
          <a href="https://calendly.com/adil_shahzad_khawaja/30min" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-amber-400 to-amber-200 text-slate-950 px-4 py-2 rounded-lg font-bold text-xs hover:scale-105 hover:shadow-lg active:scale-95 transition-all inline-block shadow-[0_0_20px_rgba(245,197,94,0.2)]">
            Check Availability
          </a>
        </div>
        <button aria-label="Toggle menu" aria-expanded={isOpen} className="md:hidden text-slate-300" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[55] bg-slate-950/80 backdrop-blur-md md:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-[60] md:hidden bg-[#06101d] border-l border-slate-800/50 flex flex-col shadow-2xl"
            >
              {/* Mobile Header */}
              <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/50 bg-slate-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-200 flex items-center justify-center text-slate-950 font-black text-base shadow-lg shadow-amber-400/20">
                    HC
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs uppercase tracking-widest text-white">Menu</span>
                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter">Navigation</span>
                  </div>
                </div>
                <button 
                  aria-label="Close menu"
                  className="flex items-center gap-2 text-slate-400 p-2 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all group" 
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-8 custom-scrollbar">
                {/* Main Links */}
                <div className="flex flex-col gap-6">
                  <p className="text-[10px] font-black text-amber-400/50 uppercase tracking-[0.3em] ml-1">Explore</p>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { name: "Home", href: "#top", icon: <Home size={18} />, desc: "Back to start" },
                      { name: "The Problem", href: "#problem", icon: <AlertCircle size={18} />, desc: "Why referrals aren't enough" },
                      { name: "The Engine", href: "#solution", icon: <Zap size={18} />, desc: "Our 3-stage growth system" },
                      { name: "Case Studies", href: "#case-studies", icon: <Star size={18} />, desc: "Real results from operators" },
                      { name: "Investment", href: "#pricing", icon: <TrendingUp size={18} />, desc: "Pricing and territory plans" }
                    ].map((item, i) => (
                      <motion.a
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-slate-800/40 transition-all group relative overflow-hidden"
                      >
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 transition-all shadow-md shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider line-clamp-1">{item.desc}</span>
                        </div>
                        <ChevronRight size={14} className="ml-auto text-slate-500 group-hover:text-amber-400 transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Action Section */}
                <div className="flex flex-col gap-6 pt-6 border-t border-slate-800/50">
                  <p className="text-[10px] font-black text-amber-400/50 uppercase tracking-[0.3em] ml-1">Take Action</p>
                  <div className="flex flex-col gap-3">
                    <motion.a
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      href="https://calendly.com/adil_shahzad_khawaja/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-gradient-to-r from-amber-400 to-amber-200 text-slate-950 p-4 rounded-2xl font-black text-sm uppercase tracking-widest text-center shadow-lg shadow-amber-400/10 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Check Availability <ArrowRight size={18} />
                    </motion.a>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center justify-center gap-4 text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em]"
                    >
                      <span>Exclusive</span>
                      <div className="w-1 h-1 rounded-full bg-slate-700" />
                      <span>1 Per City</span>
                    </motion.div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-6 pt-6 border-t border-slate-800/50">
                  <p className="text-[10px] font-black text-amber-400/50 uppercase tracking-[0.3em] ml-1">Get In Touch</p>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-amber-400 group-hover:border-amber-400/30 transition-all">
                        <Mail size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Email Us</span>
                        <span className="text-xs font-bold text-slate-200">adil@epulsedigital.com</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-amber-400 group-hover:border-amber-400/30 transition-all">
                        <Globe size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Website</span>
                        <span className="text-xs font-bold text-slate-200">epulsedigital.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="p-6 border-t border-slate-800/50 bg-slate-950/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">System Online</span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">v2.4.0</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const TerritoryMap = () => {
  const zones = [
    { 
      id: 'north', name: 'North District', status: 'Available', facilities: 342, value: '$12.5k/mo', 
      path: 'M 40,20 L 100,10 L 150,30 L 130,80 L 80,90 L 30,60 Z', center: [85, 45],
      history: [
        { day: 'Mon', price: 11200 }, { day: 'Tue', price: 11500 }, { day: 'Wed', price: 11800 }, 
        { day: 'Thu', price: 12100 }, { day: 'Fri', price: 12300 }, { day: 'Sat', price: 12400 }, { day: 'Sun', price: 12500 }
      ]
    },
    { 
      id: 'east', name: 'East District', status: 'Taken', facilities: 512, value: '$18.2k/mo', 
      path: 'M 150,30 L 210,40 L 230,100 L 170,140 L 130,80 Z', center: [175, 85],
      history: [
        { day: 'Mon', price: 16500 }, { day: 'Tue', price: 16800 }, { day: 'Wed', price: 17200 }, 
        { day: 'Thu', price: 17500 }, { day: 'Fri', price: 17800 }, { day: 'Sat', price: 18000 }, { day: 'Sun', price: 18200 }
      ]
    },
    { 
      id: 'south', name: 'South District', status: 'Available', facilities: 289, value: '$9.8k/mo', 
      path: 'M 80,90 L 130,80 L 170,140 L 120,190 L 60,160 Z', center: [110, 135],
      history: [
        { day: 'Mon', price: 8500 }, { day: 'Tue', price: 8700 }, { day: 'Wed', price: 9000 }, 
        { day: 'Thu', price: 9200 }, { day: 'Fri', price: 9400 }, { day: 'Sat', price: 9600 }, { day: 'Sun', price: 9800 }
      ]
    },
    { 
      id: 'west', name: 'West District', status: 'Available', facilities: 415, value: '$15.1k/mo', 
      path: 'M 30,60 L 80,90 L 60,160 L 10,120 L 15,70 Z', center: [40, 100],
      history: [
        { day: 'Mon', price: 13500 }, { day: 'Tue', price: 13800 }, { day: 'Wed', price: 14200 }, 
        { day: 'Thu', price: 14500 }, { day: 'Fri', price: 14800 }, { day: 'Sat', price: 15000 }, { day: 'Sun', price: 15100 }
      ]
    }
  ];

  const [activeZone, setActiveZone] = useState(zones[0]);
  const [hoveredZone, setHoveredZone] = useState<typeof zones[0] | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [claimStatus, setClaimStatus] = useState<'idle' | 'processing' | 'success' | 'failure'>('idle');

  const handleClaim = () => {
    setIsModalOpen(true);
    setClaimStatus('idle');
  };

  return (
    <div className="glass-panel rounded-3xl p-5 relative z-10 border-slate-700/50 flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <div className="text-amber-400 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
          <MapPin size={12} /> Live Territory Scanner
        </div>
        <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> Available</span>
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div> Taken</span>
        </div>
      </div>

      <div className="relative flex-grow flex items-center justify-center mb-4 bg-slate-900/50 rounded-2xl border border-slate-800/80 p-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:15px_15px]"></div>
        
        <svg viewBox="0 0 240 200" className="w-full h-auto max-w-[280px] drop-shadow-2xl relative z-10">
          {zones.map(zone => {
            const isActive = activeZone.id === zone.id;
            const isTaken = zone.status === 'Taken';
            return (
              <g 
                key={zone.id} 
                onMouseEnter={() => !isTaken && setHoveredZone(zone)}
                onMouseLeave={() => setHoveredZone(null)}
                onMouseMove={(e) => {
                  if (!isTaken) {
                    const rect = e.currentTarget.closest('svg')?.getBoundingClientRect();
                    if (rect) {
                      setMousePos({ 
                        x: e.clientX - rect.left, 
                        y: e.clientY - rect.top 
                      });
                    }
                  }
                }}
                onClick={() => {
                  if (!isTaken) {
                    setActiveZone(zone);
                    setIsModalOpen(true);
                    setClaimStatus('idle');
                  }
                }} 
                className={`transition-all duration-300 ${
                  isTaken 
                    ? 'cursor-not-allowed hover:opacity-60' 
                    : 'cursor-pointer hover:scale-[1.05] hover:drop-shadow-[0_0_15px_rgba(245,197,94,0.4)]'
                }`}
                style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
              >
                <path 
                  d={zone.path} 
                  className={`transition-all duration-500 ${
                    isTaken 
                      ? 'fill-slate-800/80 stroke-slate-700' 
                      : isActive 
                        ? 'fill-emerald-500/40 stroke-emerald-400 stroke-[2.5px]' 
                        : 'fill-emerald-500/10 stroke-emerald-600/50 hover:fill-emerald-500/30 hover:stroke-emerald-400 hover:stroke-[2px]'
                  }`}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                {isTaken && (
                  <g transform={`translate(${zone.center[0] - 6}, ${zone.center[1] - 6})`}>
                    <circle cx="6" cy="6" r="8" className="fill-slate-900/50 stroke-slate-700/50" strokeWidth="0.5" />
                    <foreignObject width="12" height="12">
                      <div className="flex items-center justify-center w-full h-full text-slate-400">
                        <Lock size={8} />
                      </div>
                    </foreignObject>
                  </g>
                )}
                {!isTaken && (
                  <circle 
                    cx={zone.center[0]} 
                    cy={zone.center[1]} 
                    r={isActive ? "3" : "1.5"} 
                    className={`transition-all duration-300 ${isActive ? 'fill-emerald-400' : 'fill-emerald-400/50'}`} 
                  />
                )}
                {isActive && !isTaken && (
                  <circle 
                    cx={zone.center[0]} 
                    cy={zone.center[1]} 
                    r="6" 
                    className="fill-emerald-400/20 animate-ping" 
                  />
                )}
              </g>
            );
          })}
        </svg>

        <AnimatePresence>
          {hoveredZone && !hoveredZone.status.includes('Taken') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute pointer-events-none z-[60] bg-slate-900/90 border border-amber-500/50 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-2xl"
              style={{ 
                left: mousePos.x + 10, 
                top: mousePos.y - 40,
              }}
            >
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Est. Value</div>
              <div className="text-sm font-black text-amber-400">{hoveredZone.value}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 mt-auto">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="text-base font-bold text-white">{activeZone.name}</h4>
            <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mt-1 inline-block ${activeZone.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
              {activeZone.status}
            </span>
          </div>
          <div className="text-right">
            <div className="text-[9px] text-slate-400 mb-0.5 uppercase tracking-wider font-semibold">Est. Value</div>
            <div className="text-lg font-black text-amber-400">{activeZone.value}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700/50 mb-4">
          <div>
            <div className="text-[9px] text-slate-400 mb-1">Commercial Facilities</div>
            <div className="text-white font-semibold flex items-center gap-1 text-xs">
              <Target size={12} className="text-amber-400"/> {activeZone.facilities}
            </div>
          </div>
          <div>
            <div className="text-[9px] text-slate-400 mb-1">Competition Level</div>
            <div className="text-white font-semibold flex items-center gap-1 text-xs">
              <TrendingUp size={12} className="text-amber-400"/> {activeZone.status === 'Taken' ? 'High' : 'Medium'}
            </div>
          </div>
        </div>

        <div className="h-24 w-full bg-slate-900/40 rounded-xl p-2 border border-slate-700/30 mb-4">
          <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1 px-1">7-Day Value Trend</div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeZone.history}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                hide 
              />
              <YAxis 
                hide 
                domain={['dataMin - 500', 'dataMax + 500']}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 border border-slate-700 px-2 py-1 rounded shadow-xl">
                        <p className="text-[10px] font-bold text-amber-400">${(payload[0].value as number / 1000).toFixed(1)}k</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#f59e0b" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <motion.button 
          disabled={activeZone.status === 'Taken'}
          onClick={handleClaim}
          animate={
            claimStatus === 'success' 
              ? { scale: [1, 1.05, 1], transition: { duration: 0.4, ease: "easeOut" } }
              : activeZone.status === 'Available'
                ? { 
                    scale: [1, 1.02, 1],
                    boxShadow: [
                      "0 0 20px rgba(245,197,94,0.2)",
                      "0 0 30px rgba(245,197,94,0.4)",
                      "0 0 20px rgba(245,197,94,0.2)"
                    ]
                  }
                : { opacity: [0.5, 0.7, 0.5] }
          }
          transition={
            activeZone.status === 'Available' || activeZone.status === 'Taken'
              ? { repeat: Infinity, duration: 2, ease: "easeInOut" }
              : {}
          }
          className={`w-full mt-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
            activeZone.status === 'Taken' 
              ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-amber-400 to-amber-200 text-slate-950 hover:scale-[1.02] hover:shadow-lg active:scale-95 shadow-[0_0_20px_rgba(245,197,94,0.2)]'
          }`}
        >
          {activeZone.status === 'Taken' ? 'Territory Unavailable' : 'Claim Territory'} <ArrowRight size={14} className={activeZone.status === 'Taken' ? 'hidden' : 'block'} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="glass-panel max-w-md w-full rounded-3xl p-6 relative border-slate-700/50 shadow-2xl"
            >
              {claimStatus === 'idle' || claimStatus === 'success' || claimStatus === 'failure' ? (
                <button aria-label="Close modal" onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white hover:scale-110 hover:rotate-90 transition-all duration-300">
                  <X size={18} />
                </button>
              ) : null}

              {claimStatus === 'idle' ? (
                <div className="py-2">
                  <div className="flex items-center justify-between mb-6">
                    <h3 id="modal-title" className="text-2xl font-bold text-white">{activeZone.name}</h3>
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                      Available
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                      <div className="text-slate-400 text-xs mb-1">Est. Value</div>
                      <div className="text-xl font-bold text-amber-400">${(activeZone.value / 1000).toFixed(1)}k/mo</div>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                      <div className="text-slate-400 text-xs mb-1">Commercial Facilities</div>
                      <div className="text-xl font-bold text-white">{activeZone.facilities}</div>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                      <div className="text-slate-400 text-xs mb-1">Competition Level</div>
                      <div className="text-xl font-bold text-white">{activeZone.competition}</div>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                      <div className="text-slate-400 text-xs mb-1">Population</div>
                      <div className="text-xl font-bold text-white">{(activeZone.facilities * 1250).toLocaleString()}</div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setClaimStatus('processing');
                      setTimeout(() => {
                        const isSuccess = Math.random() > 0.15;
                        setClaimStatus(isSuccess ? 'success' : 'failure');
                      }, 2000);
                    }}
                    className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-200 text-slate-950 rounded-xl font-bold transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95 text-center text-sm shadow-[0_0_20px_rgba(245,197,94,0.2)]"
                  >
                    Claim This Territory
                  </button>
                </div>
              ) : claimStatus === 'processing' ? (
                <div className="text-center py-6">
                  <Loader2 className="w-10 h-10 text-amber-400 animate-spin mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Securing Territory...</h3>
                  <p className="text-slate-400 text-sm mb-6">Locking in {activeZone.name} for your account.</p>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300 shadow-[0_0_10px_rgba(245,197,94,0.3)]"
                    />
                  </div>
                </div>
              ) : claimStatus === 'success' ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Territory Claimed!</h3>
                  <p className="text-slate-300 mb-6 text-sm">
                    You have successfully secured <strong className="text-amber-400">{activeZone.name}</strong>. 
                    Our team will contact you shortly to finalize setup.
                  </p>
                  <a 
                    href="https://calendly.com/adil_shahzad_khawaja/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsModalOpen(false)} 
                    className="block w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95 border border-slate-600 text-center text-sm"
                  >
                    Continue
                  </a>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-4 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                    <AlertCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Claim Failed</h3>
                  <p className="text-slate-300 mb-6 text-sm">
                    We encountered an issue while securing <strong className="text-amber-400">{activeZone.name}</strong>. 
                    This territory might have just been taken or there was a connection error.
                  </p>
                  <button 
                    onClick={handleClaim}
                    className="block w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-bold transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95 text-center text-sm"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 100]);

  return (
    <section className="pt-12 pb-10 md:pb-12 px-6 relative overflow-hidden" id="top">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: y1 }}
          animate={{ 
            x: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]"
        />
        <motion.div 
          style={{ y: y2 }}
          animate={{ 
            x: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/2 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]"
        />
        <motion.div 
          style={{ y: y3 }}
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
        />
        
        {/* Scanning Line Animation */}
        <motion.div 
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent z-0"
        />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-amber-400 text-xs font-bold tracking-wide uppercase mb-4">
            <Target size={12} /> For commercial service operators
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6 text-balance text-white">
            Turn your service area into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">predictable source</span> of recurring contracts.
          </h1>
          <p className="text-base md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed">
            We help commercial service companies generate stronger B2B opportunities, follow up faster, and convert more quotes into recurring facility accounts.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8 text-sm md:text-base text-slate-300 font-medium">
            {[
              "Paid demand engine",
              "Faster quote follow-up",
              "Renewal protection",
              "One operator per territory"
            ].map((tag, i) => (
              <motion.span 
                key={tag}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(51, 65, 85, 0.6)", borderColor: "rgba(245, 158, 11, 0.3)" }}
                className="px-2.5 py-1 rounded-full bg-slate-800/40 border border-slate-700/50 cursor-default transition-colors"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-10 w-full sm:w-auto">
            <a href="https://calendly.com/adil_shahzad_khawaja/30min" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-200 text-slate-950 px-6 py-3 rounded-xl font-bold hover:scale-105 hover:shadow-lg active:scale-95 transition-all shadow-[0_0_30px_rgba(245,197,94,0.25)] flex items-center justify-center gap-2 text-sm">
              Check Territory Availability
            </a>
            <a href="https://calendly.com/adil_shahzad_khawaja/30min" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-slate-800/50 border border-slate-700 hover:bg-slate-800 hover:scale-105 hover:shadow-lg active:scale-95 transition-all text-white flex items-center justify-center gap-2 text-sm">
              Book Strategy Call
            </a>
          </div>
          
          <p className="text-xs text-slate-400 mb-10 max-w-lg leading-relaxed mx-auto">
            We partner with exclusive commercial service providers per territory to ensure maximum market share and dedicated support. If your market is already taken, we will tell you before onboarding.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-16">
            {[
              { val: "12-25", label: "Walkthroughs / mo" },
              { val: "14", label: "Day Launch" },
              { val: "2", label: "Revenue Engines" },
              { val: "30", label: "Day Guarantee" }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                whileHover={{ y: -5, borderColor: "rgba(245, 158, 11, 0.4)" }}
                className="glass-panel p-3 rounded-2xl border-slate-800/60 flex flex-col justify-center transition-colors group cursor-default"
              >
                <div className="text-xl font-black text-amber-400 mb-0.5 group-hover:scale-110 transition-transform origin-left">{stat.val}</div>
                <div className="text-[9px] text-slate-300 font-medium leading-snug uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="relative w-full max-w-3xl mx-auto">
          <TerritoryMap />
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
        </Reveal>
      </div>
    </section>
  );
};

const TrustedBy = () => {
  const logos = [
    { name: "National Burger Chain", icon: <Store className="w-5 h-5 md:w-6 md:h-6" /> },
    { name: "Regional Steakhouse", icon: <Utensils className="w-5 h-5 md:w-6 md:h-6" /> },
    { name: "Downtown Hotel Group", icon: <Building2 className="w-5 h-5 md:w-6 md:h-6" /> },
    { name: "City School District", icon: <School className="w-5 h-5 md:w-6 md:h-6" /> },
    { name: "Metro Hospital", icon: <Hospital className="w-5 h-5 md:w-6 md:h-6" /> },
    { name: "Premium Dining Group", icon: <ChefHat className="w-5 h-5 md:w-6 md:h-6" /> },
  ];

  // Duplicate the array to ensure seamless infinite scrolling
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-8 md:py-10 border-t border-slate-800/50 bg-[#06101d]/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Trusted by commercial facilities across the country</p>
      </div>
      <div className="relative flex overflow-hidden group">
        {/* Gradient overlays for smooth fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#06101d] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#06101d] to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex space-x-10 md:space-x-20 animate-marquee items-center px-6 md:px-12">
          {duplicatedLogos.map((logo, i) => (
            <div key={i} className="flex items-center gap-3 md:gap-4 text-slate-500 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
              {logo.icon}
              <span className="text-base md:text-xl font-black uppercase tracking-tighter whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhoThisIsFor = () => {
  const [activeToggles, setActiveToggles] = useState<string[]>(['Commercial Services', 'Facility Maintenance']);
  const services = [
    "Commercial Services",
    "Facility Maintenance",
    "HVAC",
    "Commercial Cleaning",
    "Pest Control",
    "Pressure Washing"
  ];

  const toggleService = (service: string) => {
    setActiveToggles(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  return (
    <section className="py-12 md:py-16 px-6 bg-gradient-to-b from-[#06101d] via-[#082f49] to-[#06101d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[11px] font-bold tracking-widest uppercase mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
            Who this is for
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Built for service companies that sell into commercial facilities and properties
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-8">
            If your company works with property managers, facility directors, retail chains, offices, or industrial locations, this page is written to match the way your business actually grows.
          </p>
          
          <div className="flex flex-wrap gap-3">
            {services.map((service) => {
              const isActive = activeToggles.includes(service);
              return (
                <button
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-200 border ${
                    isActive 
                      ? 'bg-[#132b32] border-teal-500/50 text-white shadow-[0_0_15px_rgba(45,212,191,0.15)]' 
                      : 'bg-[#0b1120]/60 border-slate-800/60 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  {service}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          {[
            {
              title: "Commercial Services & Maintenance",
              desc: "Operators that already understand the value of recurring site work, compliance-driven work, and account retention."
            },
            {
              title: "Commercial Cleaning",
              desc: "Commercial-focused cleaning companies that want a steadier pipeline of commercial work and better account retention."
            },
            {
              title: "Pressure Washing, Plumbing, Maintenance",
              desc: "Businesses where recurring sites, route density, and repeat commercial work matter more than random one-off jobs."
            },
            {
              title: "HVAC, Pest Control & Specialty Services",
              desc: "Operators serving commercial facilities and properties that need stronger positioning and a more predictable flow of opportunities."
            }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1} className="bg-[#0b1120]/80 border border-slate-800/60 rounded-3xl p-6 md:p-8 hover:border-teal-500/30 transition-colors">
              <div className="text-teal-400 text-[10px] font-bold tracking-widest uppercase mb-4">
                Service Type
              </div>
              <h3 className="text-lg font-bold text-white mb-4 leading-snug">{item.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4} className="bg-[#0b1120]/80 border border-slate-800/60 rounded-3xl p-6 md:p-8 hover:border-teal-500/30 transition-colors">
          <h3 className="text-lg font-bold text-white mb-2">For operators that already understand recurring site value</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            This category tends to respond well because recurring work, compliance pressure, and contract value are already part of how the business thinks.
          </p>
        </Reveal>
      </div>
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
    </section>
  );
};

const InteractiveEstimator = () => {
  const [accounts, setAccounts] = useState(3);
  const [value, setValue] = useState(850);
  const [retention, setRetention] = useState(8);

  const totalValue = accounts * value * retention;

  const getBackgroundStyle = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, #2dd4bf 0%, #2dd4bf ${percentage}%, #334155 ${percentage}%, #334155 100%)`
    };
  };

  return (
    <section className="py-12 md:py-16 px-6 bg-[#06101d] relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[11px] font-bold tracking-widest uppercase mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
            Interactive Estimator
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            What a few more recurring<br />accounts could be worth
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl">
            This is not a guarantee. It is a simple way to show the economic logic behind tightening the offer around recurring commercial accounts instead of random one-off jobs.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Controls */}
          <Reveal delay={0.1} className="lg:col-span-7 bg-[#0b1120] border border-slate-800/60 rounded-3xl p-6 md:p-8">
            <div className="space-y-8">
              {/* Slider 1 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-white font-bold text-sm md:text-base">Extra recurring accounts per month</label>
                  <span className="text-white font-bold text-lg">{accounts}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={accounts} 
                  onChange={(e) => setAccounts(Number(e.target.value))}
                  className="custom-slider"
                  style={getBackgroundStyle(accounts, 1, 20)}
                />
              </div>

              {/* Slider 2 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-white font-bold text-sm md:text-base">Average monthly account value</label>
                  <span className="text-white font-bold text-lg">${value}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="5000" 
                  step="50"
                  value={value} 
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="custom-slider"
                  style={getBackgroundStyle(value, 100, 5000)}
                />
              </div>

              {/* Slider 3 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-white font-bold text-sm md:text-base">Average retention in months</label>
                  <span className="text-white font-bold text-lg">{retention}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="60" 
                  value={retention} 
                  onChange={(e) => setRetention(Number(e.target.value))}
                  className="custom-slider"
                  style={getBackgroundStyle(retention, 1, 60)}
                />
              </div>
            </div>
          </Reveal>

          {/* Right Column - Results */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Reveal delay={0.2} className="bg-[#132b32] border border-teal-900/50 rounded-3xl p-6 md:p-8 flex-1 flex flex-col justify-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                ${totalValue.toLocaleString()}
              </div>
              <p className="text-teal-100/80 font-bold text-sm md:text-base leading-snug">
                estimated added revenue potential from new recurring accounts
              </p>
            </Reveal>

            <Reveal delay={0.3} className="bg-[#0b1120] border border-slate-800/60 rounded-3xl p-6 md:p-8 flex-1">
              <h3 className="text-white font-bold text-lg mb-3">Why this matters</h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                A few retained facility accounts can change the economics of the business fast. That is why the offer is framed around recurring account value, not vanity lead volume.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const TerritoryControl = () => {
  const { flags } = useFeatures();
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  
  const testimonials = [
    { quote: "Secured 4 major commercial contracts in just our second month.", author: "Mark S.", role: "Principal Operator" },
    { quote: "The lead quality here is night and day compared to any agency.", author: "Sarah M.", role: "Operations Manager" },
    { quote: "Completely transformed our business model and growth trajectory.", author: "James T.", role: "Managing Director" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 md:py-10 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="bg-[#0f172a] border border-slate-800/60 rounded-[2rem] p-8 md:p-10 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row gap-10 items-center shadow-2xl">
            {/* Left Content */}
            <div className="flex-1 relative z-10">
              <div className="text-amber-400 text-sm font-bold tracking-widest uppercase mb-3">
                Territory Control
              </div>
              <h2 className="text-2xl md:text-3xl font-black leading-[1.1] tracking-tight mb-4 text-white">
                Built to help one<br />operator own one<br />market properly
              </h2>
              <p className="text-base text-slate-400 mb-6 max-w-xl leading-relaxed">
                This offer is not positioned around random leads. It is built around territory coverage, commercial qualification, faster response, and recurring contract retention so the system actually compounds over time.
              </p>
              
              <div className="flex flex-wrap gap-2.5 mb-8">
                <span className="px-3.5 py-2 rounded-full bg-slate-800/40 border border-slate-700/50 text-xs font-semibold text-white shadow-sm">Approved Service Area</span>
                <span className="px-3.5 py-2 rounded-full bg-slate-800/40 border border-slate-700/50 text-xs font-semibold text-white shadow-sm">Walkthrough Requests</span>
                <span className="px-3.5 py-2 rounded-full bg-slate-800/40 border border-slate-700/50 text-xs font-semibold text-white shadow-sm">Quote Recovery</span>
                <span className="px-3.5 py-2 rounded-full bg-slate-800/40 border border-slate-700/50 text-xs font-semibold text-white shadow-sm">Renewal Protection</span>
              </div>

              {/* Mini Testimonial Carousel */}
              <div className="relative h-24 md:h-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonialIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <article className="flex items-start gap-4">
                      <div className="bg-amber-400/10 p-2 rounded-lg">
                        <Quote size={18} className="text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-200 font-medium italic mb-1.5 leading-relaxed">
                          "{testimonials[testimonialIndex].quote}"
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-white">{testimonials[testimonialIndex].author}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                          <span className="text-[10px] text-slate-400 font-medium">{testimonials[testimonialIndex].role}</span>
                        </div>
                      </div>
                    </article>
                  </motion.div>
                </AnimatePresence>
                
                {/* Dots */}
                <div className="absolute -bottom-6 left-12 flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i === testimonialIndex ? 'bg-amber-400 w-4' : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content */}
            {flags.showTerritoryScanner && (
              <div className="flex-1 relative w-full flex justify-center lg:justify-end min-h-[350px]">
                <div className="relative w-full max-w-[350px] h-full flex items-center justify-center lg:justify-end">
                  
                  {/* Floating Cards */}
                  <div className="absolute top-4 left-0 lg:-left-4 z-20 bg-[#0f172a] p-5 rounded-2xl border border-slate-700/50 w-44 shadow-2xl">
                    <div className="text-xl font-black mb-1 flex items-baseline gap-1.5"><span className="text-amber-400">1</span> <span className="text-amber-100">Operator</span></div>
                    <div className="text-xs text-slate-400 leading-relaxed font-medium">Protected per approved territory</div>
                  </div>

                  <div className="absolute bottom-4 left-4 lg:left-0 z-20 bg-[#0f172a] p-5 rounded-2xl border border-slate-700/50 w-44 shadow-2xl">
                    <div className="text-xl font-black mb-1 flex items-baseline gap-1.5"><span className="text-amber-400">2</span> <span className="text-amber-100">Engines</span></div>
                    <div className="text-xs text-slate-400 leading-relaxed font-medium">Acquisition + retention working together</div>
                  </div>

                  {/* Phone Mockup */}
                  <div className="relative w-[180px] h-[360px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2rem] border-[6px] border-[#1e293b] shadow-2xl overflow-hidden flex flex-col rotate-[4deg] transform origin-bottom-right z-10 mr-4 lg:mr-0">
                    <div className="absolute top-0 inset-x-0 h-4 bg-[#1e293b] rounded-b-2xl w-24 mx-auto z-30"></div>
                    
                    <div className="bg-gradient-to-b from-slate-600 to-slate-800 p-5 pt-12 pb-6 relative">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]"></div>
                      <h3 className="text-2xl font-black text-white leading-[1.1] tracking-tight relative z-10">Service<br/>Area<br/>Pipeline</h3>
                    </div>
                    
                    <div className="flex-1 bg-[#1e293b] p-3 flex flex-col gap-3 overflow-hidden">
                      <div className="bg-[#0f172a] rounded-xl p-4 border border-slate-700/50 shadow-lg">
                        <div className="text-amber-400 font-bold text-xs mb-1">Territory Review</div>
                        <div className="text-[10px] text-slate-400 leading-relaxed font-medium">Service area and market density mapped before launch</div>
                      </div>
                      
                      <div className="bg-[#0f172a] rounded-xl p-4 border border-slate-700/50 shadow-lg">
                        <div className="text-amber-400 font-bold text-xs mb-1">Walkthrough Funnel</div>
                        <div className="text-[10px] text-slate-400 leading-relaxed font-medium">Commercial facilities only with minimum job qualifiers</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </Reveal>
        <CallToAction text="Check Territory Availability" className="mt-10" />
      </div>
    </section>
  );
};

const Problem = () => {
  return (
    <section id="problem" className="py-8 md:py-10 px-6 bg-gradient-to-b from-[#0a111a] to-[#06101d]">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-8 md:mb-10 max-w-2xl">
          <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-2">The Problem</div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-white">Losing contract revenue in three places right now</h2>
          <p className="text-sm text-slate-400 leading-relaxed">Most commercial service companies do solid work and still leave serious money on the table because they have no real system for demand generation, follow-up, and renewals.</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {[
            { num: '1', title: 'No predictable new contract pipeline', desc: 'Everything depends on referrals and word of mouth. When that slows down, revenue slows down.' },
            { num: '2', title: 'Quotes go cold', desc: 'A walkthrough happens, a quote goes out, and then nobody follows up with enough speed or structure.' },
            { num: '3', title: 'Renewals slip through the cracks', desc: 'Existing contracts quietly lapse because there is no due-date engine, no reminder system, and no reactivation flow.' }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1} className="glass-panel p-6 md:p-8 rounded-3xl border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-200 text-slate-950 font-black text-base flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
                {item.num}
              </div>
              <h3 className="text-base font-bold mb-2">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </Reveal>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6 mt-10">
          <Reveal delay={0.2} className="bg-[#0b1120]/80 border border-slate-800/60 rounded-3xl p-6 md:p-8">
            <div className="text-teal-400 text-[11px] font-bold tracking-widest uppercase mb-2">Current Reality</div>
            <h3 className="text-xl font-bold text-white mb-6">Why growth feels random</h3>
            <ul className="space-y-4">
              {[
                "New work comes in inconsistently from referrals, chance, and old relationships.",
                "Quotes are slow, weak, or not structured to increase contract value.",
                "Leads are not followed up aggressively enough, so good opportunities go cold.",
                "Existing contacts, old customers, and dormant accounts are rarely reactivated properly."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 pb-4 border-b border-slate-800/50 last:border-0 last:pb-0">
                  <div className="w-5 h-5 rounded bg-rose-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Minus size={14} className="text-rose-400" />
                  </div>
                  <span className="text-sm text-slate-300 leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3} className="bg-[#0b1120]/80 border border-slate-800/60 rounded-3xl p-6 md:p-8">
            <div className="text-teal-400 text-[11px] font-bold tracking-widest uppercase mb-2">What This Costs</div>
            <h3 className="text-xl font-bold text-white mb-6">Revenue leaks that compound</h3>
            <ul className="space-y-4">
              {[
                "Too many one-off jobs instead of more stable recurring account revenue.",
                "Too much time wasted chasing weak opportunities with low close probability.",
                "Territories feel saturated because the offer is not differentiated enough.",
                "The owner stays stuck in reactive selling instead of building a repeatable engine."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 pb-4 border-b border-slate-800/50 last:border-0 last:pb-0">
                  <div className="w-5 h-5 rounded bg-rose-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Minus size={14} className="text-rose-400" />
                  </div>
                  <span className="text-sm text-slate-300 leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <CallToAction text="Fix Revenue Leaks" className="mt-8" />
      </div>
    </section>
  );
};

const Solution = () => {
  return (
    <section id="solution" className="py-8 md:py-10 px-6 bg-gradient-to-b from-[#06101d] to-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-8 md:mb-10 max-w-2xl">
          <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-2">The Solution</div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-white">Two engines. One contract growth system.</h2>
          <p className="text-sm text-slate-400 leading-relaxed">We do not just run ads or tweak a website. We install a front-end acquisition engine and a back-end retention engine so you can win more recurring contracts and keep more of the revenue you already earned.</p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          <Reveal className="glass-panel p-6 md:p-8 rounded-3xl border-slate-700/50 bg-gradient-to-b from-slate-800/50 to-slate-900/80 relative overflow-hidden">
            <div className="text-blue-400 text-[11px] font-bold tracking-widest uppercase mb-2">Engine 1</div>
            <h3 className="text-xl font-bold mb-3">New Contract Pipeline</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">Paid ads, booking funnel, and instant follow-up automation that turn commercial demand into qualified walkthrough requests from serious buyers inside your service area.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {['Paid acquisition campaigns', 'Walkthrough booking funnel', 'Missed-call text back', 'Quote chase automation'].map((feature, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-[10px] font-semibold text-slate-200 flex items-start gap-2.5">
                  <CheckCircle size={14} className="text-amber-400 shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2} className="glass-panel p-6 md:p-8 rounded-3xl border-slate-700/50 bg-gradient-to-b from-slate-800/50 to-slate-900/80 relative overflow-hidden">
            <div className="text-blue-400 text-[11px] font-bold tracking-widest uppercase mb-2">Engine 2</div>
            <h3 className="text-xl font-bold mb-3">Renewal + Reactivation Engine</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">Due-date tracking, reminders, reactivation, and win-back flows that stop recurring contract revenue from leaking out after you already paid to acquire it.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {['Renewal calendar engine', 'Overdue account recovery', 'Old quote reactivation', 'Lapsed contract win-back'].map((feature, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-[10px] font-semibold text-slate-200 flex items-start gap-2.5">
                  <CheckCircle size={14} className="text-amber-400 shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6 mt-10">
          <Reveal delay={0.2} className="bg-[#0b1120]/80 border border-slate-800/60 rounded-3xl p-6 md:p-8">
            <div className="text-teal-400 text-[11px] font-bold tracking-widest uppercase mb-2">New Positioning</div>
            <h3 className="text-xl font-bold text-white mb-6">What changes with a tighter offer</h3>
            <ul className="space-y-4">
              {[
                "The messaging speaks directly to commercial service companies and recurring commercial growth.",
                "The offer feels more premium because it combines opportunity flow with follow-up and conversion logic.",
                "The territory angle adds scarcity, urgency, and a reason to act sooner.",
                "The buyer can clearly see the outcome, the process, and the next step."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 pb-4 border-b border-slate-800/50 last:border-0 last:pb-0">
                  <div className="w-5 h-5 rounded bg-teal-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Plus size={14} className="text-teal-400" />
                  </div>
                  <span className="text-sm text-slate-300 leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3} className="bg-[#0b1120]/80 border border-slate-800/60 rounded-3xl p-6 md:p-8">
            <div className="text-teal-400 text-[11px] font-bold tracking-widest uppercase mb-2">Operational Gain</div>
            <h3 className="text-xl font-bold text-white mb-6">What the system is really trying to create</h3>
            <ul className="space-y-4">
              {[
                "More qualified opportunities tied to facility and property managers.",
                "Faster quote response and better follow-up discipline.",
                "A stronger path from ad click or inquiry to quote to recurring account.",
                "Better use of the backend through renewals, win-back, and reactivation."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 pb-4 border-b border-slate-800/50 last:border-0 last:pb-0">
                  <div className="w-5 h-5 rounded bg-teal-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Plus size={14} className="text-teal-400" />
                  </div>
                  <span className="text-sm text-slate-300 leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <CallToAction text="See How It Works" className="mt-8" />
      </div>
    </section>
  );
};

const CaseStudies = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const cases = [
    {
      company: "Midwest Commercial Services",
      metric: "400%",
      metricLabel: "Walkthrough Increase",
      results: ["Scaled from 2 to 8 recurring contracts/mo", "Reduced quote follow-up time to 5 mins", "Dominated 2 local territories"],
      quote: "We stopped competing on price because we were the first ones to respond and show up.",
      challenge: "They were relying entirely on word-of-mouth and cold calling. They had a great reputation but struggled to get in front of facility managers when they were actually looking for a new service provider. Their quote follow-up was manual, often taking 24-48 hours.",
      solution: "We installed our territory-based paid acquisition engine targeting high-intent commercial facility searches. We implemented a 5-minute automated follow-up sequence for all new walkthrough requests, ensuring they were the first to contact the prospect.",
      timeline: "90 Days"
    },
    {
      company: "Coastal Facility Pros",
      metric: "12 New",
      metricLabel: "Contracts in 60 Days",
      results: ["Expanded to 3 new counties", "Average contract value increased by 25%", "Zero quote leakage with automated follow-up"],
      quote: "We used to chase leads. Now we just show up to the walkthroughs they book for us.",
      challenge: "Coastal Facility Pros was a successful family-owned business that had hit a plateau. They were dominant in their home city but couldn't break into the neighboring counties effectively. Their sales process was inconsistent, and they often forgot to follow up on quotes for larger multi-site facilities.",
      solution: "We implemented a multi-territory expansion plan. We built dedicated landing pages for each new county and launched targeted search campaigns. We also integrated their CRM with our automated quote-chase engine to ensure every multi-site proposal was followed up on at least 7 times over 14 days.",
      timeline: "60 Days"
    },
    {
      company: "Apex Commercial Services",
      metric: "$14k",
      metricLabel: "Recovered Revenue",
      results: ["Reactivated 6 lapsed contracts in 45 days", "Automated 100% of renewal reminders", "Added $4k/mo in new contracts"],
      quote: "The renewal engine alone paid for the system in month one. We had no idea how much was slipping through the cracks.",
      challenge: "Apex had a solid book of business but was losing track of when clients were due for their quarterly or semi-annual cleanings. They were leaving money on the table simply because they forgot to follow up with existing customers.",
      solution: "We deployed our automated renewal protection system. It synced with their existing customer list and automatically sent SMS and email reminders 30 days, 14 days, and 3 days before a cleaning was due, prompting the customer to book their walkthrough.",
      timeline: "45 Days"
    },
    {
      company: "Metro Clean Solutions",
      metric: "$22k/mo",
      metricLabel: "New Recurring Revenue",
      results: ["Won 3 major hospital contracts", "98% renewal rate on existing accounts", "Reduced customer acquisition cost by 40%"],
      quote: "The system doesn't just get leads; it builds a defensible business asset.",
      challenge: "Metro Clean was spending heavily on generic SEO and Google Ads with very little to show for it. They were getting 'leads' for residential cleanings or one-off residential repairs, which they didn't even do. They needed high-value commercial contracts.",
      solution: "We rebuilt their entire digital presence to focus exclusively on commercial facility maintenance. We installed the 'Engine 1' pipeline with strict qualification filters. We also launched 'Engine 2' to protect their existing high-value hospital and school district contracts, ensuring they never missed a renewal window.",
      timeline: "120 Days"
    }
  ];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedCase !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCase]);

  return (
    <section id="case-studies" className="py-8 md:py-10 px-6 bg-gradient-to-b from-slate-900/30 to-[#06101d]">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-8 md:mb-10 text-center">
          <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-2">Case Studies</div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-white">Real results from real operators</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {cases.map((cs, i) => (
            <Reveal as="article" key={i} delay={i * 0.2} className="glass-panel p-6 md:p-8 rounded-3xl border-slate-700/50 relative overflow-hidden group cursor-pointer hover:border-amber-500/50 transition-all duration-300" onClick={() => setSelectedCase(i)}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-colors"></div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-amber-400 transition-colors">{cs.company}</h3>
              <div className="flex items-end gap-2 mb-4">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">{cs.metric}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide pb-1">/ {cs.metricLabel}</div>
              </div>
              <div className="space-y-2 mb-5">
                {cs.results.map((res, j) => (
                  <div key={j} className="flex items-start gap-2.5 text-slate-300 text-xs">
                    <TrendingUp size={14} className="text-amber-400 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 relative mb-5">
                <Quote size={16} className="absolute top-2 right-2 text-slate-600" />
                <p className="text-xs text-slate-300 italic relative z-10 leading-relaxed">"{cs.quote}"</p>
              </div>
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs group-hover:translate-x-1.5 transition-transform">
                Read full case study <ArrowRight size={12} />
              </div>
            </Reveal>
          ))}
        </div>
        <CallToAction text="Get Similar Results" className="mt-8" />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCase !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-title"
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <button 
                aria-label="Close case study"
                onClick={() => setSelectedCase(null)} 
                className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-colors"
              >
                <X size={16} />
              </button>

              <div className="mb-5">
                <div className="text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-1.5">Case Study</div>
                <h3 id="case-study-title" className="text-xl md:text-2xl font-black mb-2">{cases[selectedCase].company}</h3>
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Timeline: {cases[selectedCase].timeline}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {cases[selectedCase].metricLabel}: {cases[selectedCase].metric}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-6">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                    <Target size={14} className="text-amber-400" /> The Challenge
                  </h4>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {cases[selectedCase].challenge}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                    <CheckCircle size={14} className="text-amber-400" /> The Solution
                  </h4>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {cases[selectedCase].solution}
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-4 md:p-5 border border-slate-700/50 mb-5">
                <h4 className="text-sm font-bold text-white mb-2.5">Key Results</h4>
                <div className="space-y-2">
                  {cases[selectedCase].results.map((res, j) => (
                    <div key={j} className="flex items-start gap-2 text-slate-200">
                      <TrendingUp size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-xs md:text-sm font-medium">{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/20 relative">
                <Quote size={20} className="absolute top-2.5 right-2.5 text-amber-500/20" />
                <p className="text-sm text-slate-200 italic relative z-10 font-medium leading-relaxed">
                  "{cases[selectedCase].quote}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    {
      text: "Before implementing this system, our growth was stagnant, relying almost entirely on unpredictable word-of-mouth referrals. Now, we have a consistent, high-quality pipeline of commercial facility managers actively requesting walkthroughs. It hasn't just added revenue; it's completely transformed our business model and growth trajectory.",
      author: "James T.",
      role: "Founder & Managing Director, Elite Facility Systems",
      image: "https://picsum.photos/seed/operator1/100/100",
      rating: 5
    },
    {
      text: "The exclusive territory protection was the deciding factor for me. In a crowded market, having a proprietary engine that captures demand before my competitors even see it is a massive advantage. We've already secured four major commercial contracts in just our second month of operation.",
      author: "Mark S.",
      role: "Principal Operator, Coastal Facility Professionals",
      image: "https://picsum.photos/seed/operator2/100/100",
      rating: 5
    },
    {
      text: "It is refreshing to finally work with a system that understands the nuances of the commercial sector. We don't need residential 'tire-kickers'; we need facility managers with multi-site portfolios. The lead quality here is night and day compared to any generic marketing agency we've tried.",
      author: "Sarah M.",
      role: "Senior Operations & Logistics Manager",
      image: "https://picsum.photos/seed/operator3/100/100",
      rating: 4
    },
    {
      text: "I've seen plenty of marketing promises, but these guys actually understand the commercial service industry from the inside out. They speak the technical language of facility managers, which is reflected in the high conversion rate of the leads they generate for us.",
      author: "Robert L.",
      role: "Director of Field Operations & Compliance",
      image: "https://picsum.photos/seed/operator4/100/100",
      rating: 5
    },
    {
      text: "The automated missed-call text back and the persistent quote-chase sequences are absolute game-changers for our front office. We are winning contracts that used to slip through the cracks simply because we are now the first to respond, every single time.",
      author: "David R.",
      role: "Executive Founder, ProService Regional Services",
      image: "https://picsum.photos/seed/operator5/100/100",
      rating: 5
    },
    {
      text: "The ROI was apparent almost immediately. A single large-scale hospital contract we secured through the system more than paid for the entire year's investment. If you have the operational capacity to handle more work, this system is an absolute no-brainer for scaling.",
      author: "Jennifer K.",
      role: "CEO & Strategic Growth Lead, Metro Clean Solutions",
      image: "https://picsum.photos/seed/operator6/100/100",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + reviews.length) % reviews.length);
  };

  return (
    <section className="py-8 md:py-10 px-6 bg-gradient-to-b from-[#06101d] to-slate-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <Reveal>
            <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-2">Operator Feedback</div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">What operators are saying</h2>
          </Reveal>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-amber-400/50 transition-all bg-slate-900/50"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-amber-400/50 transition-all bg-slate-900/50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative h-[400px] md:h-[320px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full max-w-4xl"
            >
              <article className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-slate-800 shadow-2xl relative group transition-all duration-300 hover:scale-[1.02] hover:border-amber-500/50">
                <div className="absolute top-8 right-8 text-slate-800/20 group-hover:text-amber-400/10 transition-colors duration-700">
                  <Quote size={80} strokeWidth={3} />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1.5">
                      {[1,2,3,4,5].map((star) => (
                        <Star 
                          key={star} 
                          size={16} 
                          className={`transition-all duration-300 ${
                            star <= reviews[currentIndex].rating 
                              ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(245,197,94,0.4)]' 
                              : 'text-slate-600'
                          }`} 
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                      <CheckCircle size={12} className="text-emerald-400" />
                      <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Verified Operator</span>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-slate-200 mb-8 leading-relaxed italic">
                    "{reviews[currentIndex].text}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={reviews[currentIndex].image} 
                        alt={reviews[currentIndex].author}
                        className="w-12 h-12 rounded-full object-cover border-2 border-slate-700 group-hover:border-amber-400 transition-colors duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 rounded-full border-2 border-[#0f172a] flex items-center justify-center shadow-lg">
                        <Check size={10} className="text-slate-950 font-black" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-base text-white">{reviews[currentIndex].author}</div>
                      <div className="text-xs text-slate-400 group-hover:text-amber-400/80 transition-colors duration-500">{reviews[currentIndex].role}</div>
                    </div>
                  </div>
                </div>
              </article>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentIndex ? 'w-8 bg-amber-400' : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <CallToAction text="Join Successful Operators" />
        </div>
      </div>
    </section>
  );
};

const First30Days = () => {
  return (
    <section className="py-8 md:py-10 px-6 bg-[#0a111a]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="bg-[#0f1724] border border-slate-800 rounded-3xl p-6 md:p-10 lg:p-12 mb-8">
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-10">
              
              <div>
                <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-3">First 30 Days</div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6 text-white">What gets installed before we ever talk about scale</h2>
                
                <div className="space-y-3">
                  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                    <h3 className="text-lg font-bold text-amber-400 mb-1.5">Walkthrough</h3>
                    <p className="text-slate-400 text-xs">Commercial buyers land on a focused page, request a walkthrough, and move into instant follow-up.</p>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                    <h3 className="text-lg font-bold text-amber-400 mb-1.5">Quote Chase</h3>
                    <p className="text-slate-400 text-xs">Speed-to-follow-up, reminders, and missed-opportunity recovery help stop quiet deal loss.</p>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                    <h3 className="text-lg font-bold text-amber-400 mb-1.5">Renewals</h3>
                    <p className="text-slate-400 text-xs">Due-date reminders, overdue chase, and reactivation flows protect recurring contract value.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Before chasing more volume, we install the infrastructure that helps serious commercial opportunities move faster and renew more reliably.
                </p>
                
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                    <div className="inline-block bg-slate-800 text-amber-400 text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full mb-2">Install 01</div>
                    <h4 className="text-base font-bold text-white mb-1.5">Walkthrough Funnel</h4>
                    <p className="text-slate-400 text-[9px] leading-relaxed">Commercial facility traffic is filtered through a dedicated page and moves into a controlled booking flow.</p>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                    <div className="inline-block bg-slate-800 text-amber-400 text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full mb-2">Install 02</div>
                    <h4 className="text-base font-bold text-white mb-1.5">Follow-Up System</h4>
                    <p className="text-slate-400 text-[9px] leading-relaxed">Missed-call text back, quote reminders, and recovery automation keep buyers moving.</p>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                    <div className="inline-block bg-slate-800 text-amber-400 text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full mb-2">Install 03</div>
                    <h4 className="text-base font-bold text-white mb-1.5">Renewal Calendar</h4>
                    <p className="text-slate-400 text-[9px] leading-relaxed">Renewal dates, overdue accounts, and lapsed contracts are tracked so revenue does not slip out.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Reveal>
        <CallToAction text="Install The Infrastructure" className="mt-0" />
      </div>
    </section>
  );
};

const LaunchTimeline = () => {
  const timeline = [
    { day: "1", title: "Days 1–3", desc: "Territory review, offer framing, service-area setup, and onboarding approvals." },
    { day: "2", title: "Days 4–7", desc: "Walkthrough funnel, pages, CRM, automation, and quote follow-up sequencing are built." },
    { day: "3", title: "Days 8–10", desc: "Campaigns go live, tracking turns on, and commercial demand capture begins." },
    { day: "4", title: "Days 11–14", desc: "Optimization starts and the first qualified walkthrough requests begin moving through the system." },
    { day: "5", title: "Month 3", desc: "SEO layer gets added around the services and locations already proven to convert." }
  ];

  return (
    <section className="py-8 md:py-10 px-6 bg-[#0a111a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-8 md:mb-10 items-end">
          <Reveal>
            <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-2">Launch Timeline</div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Live in 14 days</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-sm text-slate-400 leading-relaxed">
              The paid contract engine is designed to go live inside 14 days once access, approvals, and core assets are in place. Then the organic layer gets added in month 3 around what is already converting.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mb-8">
          {timeline.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-[#0f1724] border border-slate-800 rounded-3xl p-6 h-full hover:bg-slate-800/50 transition-colors">
                <div className="bg-amber-400 text-slate-950 font-bold w-8 h-8 rounded-lg flex items-center justify-center mb-4 text-sm">
                  {item.day}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <CallToAction text="Start Your 14-Day Launch" className="mt-0" />
      </div>
    </section>
  );
};

const ROI = () => {
  return (
    <section id="roi" className="py-8 md:py-10 px-6 bg-[#0a111a]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="bg-[#0f1724] border border-slate-800 rounded-3xl p-8 md:p-10 lg:p-12 mb-8">
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-12 mb-10">
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight">The ROI is<br/>obvious when<br/>contracts recur</h2>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-slate-400 leading-relaxed">
                  One solid recurring commercial facility account can justify a meaningful part of the retainer. When the renewal engine also helps prevent silent churn, the economics get stronger again.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <div className="text-2xl font-bold text-amber-400 mb-2">1–3</div>
                <p className="text-slate-400 text-xs leading-relaxed">New recurring contracts can justify a meaningful share of monthly spend</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <div className="text-2xl font-bold text-amber-400 mb-2">2X</div>
                <p className="text-slate-400 text-xs leading-relaxed">Better economics when renewals are protected instead of silently lost</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <div className="text-2xl font-bold text-amber-400 mb-2">30</div>
                <p className="text-slate-400 text-xs leading-relaxed">Days to the first guarantee window for qualified walkthrough requests</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <div className="text-2xl font-bold text-amber-400 mb-2">Long-term</div>
                <p className="text-slate-400 text-xs leading-relaxed">SEO layer compounds once the paid engine shows what converts best</p>
              </div>
            </div>
          </div>
        </Reveal>
        <CallToAction text="Build Recurring Revenue" className="mt-0" />
      </div>
    </section>
  );
};

const FitCheck = () => {
  return (
    <section id="fit-check" className="py-8 md:py-10 px-6 bg-[#0a111a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-8 md:mb-10 items-end">
          <Reveal>
            <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-2">Fit Check</div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Who this is built for</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-sm text-slate-400 leading-relaxed">
              The best outcomes come when the operator already has real service capacity, a commercial-only focus, and the ability to respond quickly once demand starts moving.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-8">
          <Reveal delay={0.1}>
            <div className="bg-[#0f1724] border border-slate-800 rounded-3xl p-8 md:p-10 h-full">
              <h3 className="text-xl font-bold text-white mb-6">This is for you if</h3>
              <ul className="space-y-3">
                {[
                  "You serve commercial facilities only",
                  "You want recurring contracts, not random one-offs",
                  "You have capacity for more work",
                  "You can respond to leads quickly",
                  "You want a real pipeline system"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="bg-[#1a1111] border border-red-900/30 rounded-3xl p-8 md:p-10 h-full">
              <h3 className="text-xl font-bold text-white mb-6">Not for you if</h3>
              <ul className="space-y-3">
                {[
                  "You mainly do residential work",
                  "You are fully booked already",
                  "You cannot respond quickly",
                  "You do not have minimum job criteria",
                  "You want cheap random leads"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <CallToAction text="Check Your Fit" className="mt-0" />
      </div>
    </section>
  );
};

const Guarantee = () => {
  return (
    <section className="py-8 md:py-10 px-6 bg-[#0a111a]">
      <div className="max-w-7xl mx-auto">
        <Reveal className="bg-[#0f1724] border border-slate-800 rounded-3xl p-8 md:p-10 lg:p-12 mb-8">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-12">
            <div>
              <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-3">The Guarantee</div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight tracking-tight">
                <motion.span 
                  animate={{ 
                    color: ['#ffffff', '#2dd4bf', '#ffffff'],
                    textShadow: ['0px 0px 0px rgba(45,212,191,0)', '0px 0px 20px rgba(45,212,191,0.5)', '0px 0px 0px rgba(45,212,191,0)']
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >
                  12 qualified<br/>walkthrough<br/>requests in<br/>30 days
                </motion.span>
                <br/>
                <span className="text-slate-400 text-xl md:text-2xl mt-2 inline-block">or we keep working<br/>until you do</span>
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm">
                A qualified walkthrough request means a commercial facility inside your approved service area where the decision-maker or authorized contact requests a walkthrough, matches your current service offer, and meets the minimum job criteria we define together before launch.
              </p>
            </div>
            <div className="space-y-8">
              <div>
                <strong className="block text-lg mb-4 text-white font-bold">What counts as qualified</strong>
                <ul className="space-y-2.5">
                  {[
                    'Inside the approved service area', 
                    'Commercial facility buyer, manager, owner, or authorized contact', 
                    'Matches your current commercial service offer', 
                    'Meets the minimum job criteria agreed before launch',
                    'Needs service inside the agreed buying window',
                    'Valid contact details and a reachable follow-up path'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <strong className="block text-lg mb-4 text-white font-bold">Launch conditions on your side</strong>
                <ul className="space-y-2.5">
                  {[
                    'Approvals, access, and proof assets are provided inside onboarding', 
                    'Agreed ad spend stays active and operational capacity is real', 
                    'Leads are contacted quickly during business hours', 
                    'Booked walkthroughs are not ignored, mishandled, or repeatedly rescheduled internally',
                    'Territory and core service offer remain stable during the guarantee window'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
        <CallToAction text="Claim Your Guarantee" className="mt-0" />
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-8 md:py-10 px-6 bg-gradient-to-b from-[#0a111a] to-[#06101d]">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-8 md:mb-10 text-center max-w-2xl mx-auto">
          <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-2">Investment</div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">Three plans. One territory at a time.</h2>
          <p className="text-sm text-slate-400 leading-relaxed">We only work with one commercial service company per territory, so plan selection depends on how much market coverage and system depth you actually need.</p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-5 items-center">
          <Reveal as="article" delay={0.1} className="glass-panel p-8 md:p-10 rounded-3xl border-slate-800">
            <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-2">Plan A</div>
            <h3 className="text-xl font-bold mb-3">Single Territory</h3>
            <div className="mb-3">
              <span className="text-2xl md:text-3xl font-black">$1,200</span>
              <span className="text-slate-400 text-xs font-bold"> / mo + ad spend</span>
            </div>
            <p className="text-xs text-slate-400 mb-6 h-12 leading-relaxed">For operators focused on one market who want the full contract engine installed fast.</p>
            <ul className="space-y-2.5 mb-8">
              {['1 territory', 'Paid demand engine', 'Walkthrough funnel', 'Follow-up + quote chase', 'Renewal engine', 'Weekly scoreboard'].map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <Check size={14} className="text-amber-400" /> {f}
                </li>
              ))}
            </ul>
            <a href="https://calendly.com/adil_shahzad_khawaja/30min" target="_blank" rel="noopener noreferrer" className="block w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-center rounded-xl font-bold transition-all hover:scale-105 hover:shadow-lg active:scale-95 text-sm">Launch Territory</a>
          </Reveal>

          <Reveal as="article" delay={0.2} className="glass-panel p-8 md:p-10 rounded-3xl border-amber-500/30 bg-slate-800/40 relative transform lg:-translate-y-2 shadow-2xl shadow-amber-500/10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-amber-200 text-slate-950 text-[10px] font-black uppercase tracking-wider py-1 px-3 rounded-full">
              Most Popular
            </div>
            <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-2">Plan B</div>
            <h3 className="text-xl font-bold mb-3">Territory Expansion</h3>
            <div className="mb-3">
              <span className="text-2xl md:text-3xl font-black">$3,200</span>
              <span className="text-slate-400 text-xs font-bold"> / mo + ad spend</span>
            </div>
            <p className="text-xs text-slate-400 mb-6 h-12 leading-relaxed">For operators covering multiple cities or wanting more volume and the strongest path into month 3 SEO.</p>
            <ul className="space-y-2.5 mb-8">
              {['2 to 3 city clusters', 'Expanded pages', 'Deeper automation', 'Higher volume handling', 'Priority support', 'SEO rollout path'].map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <Check size={14} className="text-amber-400" /> {f}
                </li>
              ))}
            </ul>
            <a href="https://calendly.com/adil_shahzad_khawaja/30min" target="_blank" rel="noopener noreferrer" className="block w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-200 text-slate-950 text-center rounded-xl font-bold hover:scale-105 hover:shadow-lg active:scale-95 transition-all text-sm">Scale Territory</a>
          </Reveal>

          <Reveal as="article" delay={0.3} className="glass-panel p-8 md:p-10 rounded-3xl border-slate-800">
            <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-2">Plan C</div>
            <h3 className="text-xl font-bold mb-3">Market Dominance</h3>
            <div className="mb-3">
              <span className="text-2xl md:text-3xl font-black">$5,200</span>
              <span className="text-slate-400 text-xs font-bold"> / mo + ad spend</span>
            </div>
            <p className="text-xs text-slate-400 mb-6 h-12 leading-relaxed">For operators who want paid demand now and SEO compounding from day one across a larger market footprint.</p>
            <ul className="space-y-2.5 mb-8">
              {['Paid engine + SEO included', 'Multi-territory support', 'City page rollout', 'GBP optimization', 'Long-term organic growth', 'Expansion planning'].map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <Check size={14} className="text-amber-400" /> {f}
                </li>
              ))}
            </ul>
            <a href="https://calendly.com/adil_shahzad_khawaja/30min" target="_blank" rel="noopener noreferrer" className="block w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-center rounded-xl font-bold transition-all hover:scale-105 hover:shadow-lg active:scale-95 text-sm">Dominate Market</a>
          </Reveal>
        </div>
        <CallToAction text="View Pricing Details" className="mt-8" />
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "What types of companies is this built for?", a: "It is built for service companies that sell into commercial facilities, properties, and industrial locations including commercial cleaning, pressure washing, pest control, plumbing, HVAC, maintenance, and related services." },
    { q: "What counts as a qualified walkthrough request?", a: "A commercial facility inside your approved service area where the decision-maker or authorized contact requests a walkthrough, matches your service offer, and meets the minimum job criteria set before launch." },
    { q: "How quickly can this go live?", a: "The paid contract engine is designed to launch inside 14 days once access, approvals, and core assets are in place." },
    { q: "Is ad spend included?", a: "No. Management is separate from ad spend so budget stays transparent and under your control." },
    { q: "Why add SEO later instead of immediately?", a: "Because paid demand gives us real conversion data first. That means SEO gets built around proven winners instead of assumptions." },
    { q: "Do you work with more than one commercial service company in the same market?", a: "No. We partner with one operator per territory, which protects positioning and makes the relationship more defensible." },
    { q: "What happens if we stop working together?", a: "Your accounts, data, pages, and assets stay yours. Nothing is held hostage." }
  ];

  return (
    <section className="py-8 md:py-10 px-6 bg-gradient-to-b from-[#06101d] to-slate-900/30">
      <div className="max-w-3xl mx-auto">
        <Reveal className="mb-8 md:mb-10 text-center">
          <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-2">FAQ</div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">Questions buyers usually ask</h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <details className="group glass-panel rounded-2xl border-slate-800 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 md:p-6 font-bold text-sm md:text-base">
                  {faq.q}
                  <span className="transition group-open:rotate-180 text-amber-400">
                    <ChevronRight size={18} className="group-open:hidden" />
                    <ChevronRight size={18} className="hidden group-open:block rotate-90" />
                  </span>
                </summary>
                <div className="px-5 md:px-6 pb-5 md:pb-6 text-slate-400 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
        <CallToAction text="Ask Us Anything" className="mt-8" />
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section id="cta" className="py-8 md:py-10 px-6 bg-gradient-to-b from-slate-900/30 to-slate-950">
      <div className="max-w-5xl mx-auto">
        <Reveal className="glass-panel p-10 md:p-16 rounded-3xl border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10">
            <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-3">Next Step</div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">Check if your territory is still available</h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              We will map out what the first 30 days would look like in your market, review your service area, and show you the fastest path to more recurring contract opportunities without relying on referrals alone.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://calendly.com/adil_shahzad_khawaja/30min" target="_blank" rel="noreferrer" className="bg-gradient-to-r from-amber-400 to-amber-200 text-slate-950 px-6 py-3 rounded-xl font-bold text-base hover:scale-105 hover:shadow-lg active:scale-95 transition-all shadow-[0_0_30px_rgba(245,197,94,0.25)] flex items-center gap-2.5">
                Check Territory Availability <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const LegalModal = ({ isOpen, onClose, type }: { isOpen: boolean, onClose: () => void, type: 'terms' | 'fulfillment' }) => {
  if (!isOpen) return null;

  const content = type === 'terms' ? (
    <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
      <h2 className="text-2xl font-bold text-white">Terms and Conditions</h2>
      <p className="font-bold text-amber-400">ePulse Digital LLC</p>
      
      <section>
        <h3 className="text-lg font-bold text-white mb-2">Introduction</h3>
        <p>These Terms will be applied fully and affect to your use of this Website. By using this Website, you agree to accept all terms and conditions written here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.</p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">Intellectual Property Rights</h3>
        <p>Other than the content you own, under these Terms, ePulse Digital LLC and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>
        <p>You are granted limited license only for purposes of viewing the material contained on this Website.</p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">Restrictions</h3>
        <p>You are specifically restricted from all of the following:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Publishing any Website material in any other media;</li>
          <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
          <li>Publicly performing and/or showing any Website material;</li>
          <li>Using this Website in any way that is or may be damaging to this Website;</li>
          <li>Using this Website in any way that impacts user access to this Website;</li>
          <li>Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
          <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
          <li>Using this Website to engage in any advertising or marketing.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">No warranties</h3>
        <p>This Website is provided “as is,” with all faults, and ePulse Digital LLC express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.</p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">Limitation of liability</h3>
        <p>In no event shall ePulse Digital LLC, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. ePulse Digital LLC, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">Indemnification</h3>
        <p>You hereby indemnify to the fullest extent ePulse from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">Severability</h3>
        <p>If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">Variation of Terms</h3>
        <p>ePulse Digital LLC is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.</p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">Assignment</h3>
        <p>ePulse Digital LLC is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.</p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">Entire Agreement</h3>
        <p>These Terms constitute the entire agreement between ePulse and you in relation to your use of this Website, and supersede all prior agreements and understandings.</p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">Dispute Resolution</h3>
        <p>Every card and wallet payment uses 3‑D Secure, biometric authentication, or the relevant wallet sign‑in where applicable.</p>
        <p>All Service fees shall be invoiced and payable in full, in advance, in US Dollar ($) amounts. Payment must be cleared prior to the commencement of any work, and all sums remitted under this clause are non-refundable.</p>
        <p>Any payment disputes (e.g., chargebacks or PayPal claims) are handled through Stripe’s built-in resolution process. We reserve the right to provide documentation and evidence of service delivery in such cases.</p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">Governing Law & Jurisdiction</h3>
        <p>These Terms will be governed by and interpreted in accordance with the laws of Texas, and you submit to the non-exclusive jurisdiction of the state and federal courts located in United States of America for the resolution of any disputes.</p>
      </section>
    </div>
  ) : (
    <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
      <h2 className="text-2xl font-bold text-white">Fulfillment Policy</h2>
      <p className="font-bold text-amber-400">ePulse Digital LLC</p>
      
      <section>
        <h3 className="text-lg font-bold text-white mb-2">Service Delivery</h3>
        <p>ePulse Digital LLC offers digital marketing services, which includes, but is not limited to, TikTok, Facebook, Instagram and other marketing solutions, delivered on a subscription basis. All services are rendered online and billed in US Dollars ($). No physical goods are shipped.</p>
        <p>Once payment is received and confirmed, service activation begins immediately, and clients are granted access to the subscribed marketing service(s). A confirmation email will be sent within 24 hours of payment completion.</p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">Refund Policy</h3>
        <p>All Service fees shall be invoiced and payable in full, in advance, in US Dollar ($) amounts. Payment must be cleared prior to the commencement of any work, and all sums remitted under this clause are non-refundable.</p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">Cancellation Policy</h3>
        <p>Clients may cancel their subscription at any time. Cancellation will take effect at the end of the current billing cycle. No partial refunds will be provided for unused portions of the subscription period.</p>
      </section>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl custom-scrollbar"
      >
        <button 
          aria-label="Close modal"
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        <div id="legal-modal-title" className="sr-only">{type === 'terms' ? 'Terms and Conditions' : 'Fulfillment Policy'}</div>
        {content}
      </motion.div>
    </div>
  );
};

const Footer = () => {
  const [legalType, setLegalType] = useState<'terms' | 'fulfillment' | null>(null);

  return (
    <footer className="py-8 md:py-10 px-6 border-t border-slate-800/50 bg-slate-950">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 md:gap-10 items-center">
        <div>
          <div className="font-bold text-lg mb-2 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-200 flex items-center justify-center text-slate-950 font-black text-sm">HC</div>
            Contract Engine
          </div>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            Built for recurring commercial facility contracts, territory-based growth, and stronger renewal retention. Your accounts, data, pages, and assets stay yours.
          </p>
        </div>
        <div className="md:text-right text-xs text-slate-400 space-y-2">
          <div>Commercial service companies only</div>
          <div>One operator per approved territory</div>
          <div className="flex flex-wrap md:justify-end gap-4 mt-4">
            <button onClick={() => setLegalType('fulfillment')} className="hover:text-amber-400 transition-colors">Fulfillment Policy</button>
            <button onClick={() => setLegalType('terms')} className="hover:text-amber-400 transition-colors">Terms & Conditions</button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {legalType && (
          <LegalModal 
            isOpen={!!legalType} 
            onClose={() => setLegalType(null)} 
            type={legalType} 
          />
        )}
      </AnimatePresence>
    </footer>
  );
};

const SystemComponents = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const components = [
    { 
      num: "01", 
      title: "Market-Specific Positioning Rewrite", 
      desc: "Sharpen your offer to speak directly to commercial facilities and property managers, eliminating generic messaging.",
      icon: <Target size={20} className="text-teal-400" />,
      tag: "CORE SYSTEM"
    },
    { 
      num: "02", 
      title: "Front-End Opportunity Engine", 
      desc: "Targeted campaigns and lead-flow architecture designed to generate high-intent commercial opportunities, not random volume.",
      icon: <Zap size={20} className="text-teal-400" />
    },
    { 
      num: "03", 
      title: "Back-End Follow-Up Design", 
      desc: "Automated fast-response follow-up and routing logic to turn more leads into real conversations.",
      icon: <MessageCircle size={20} className="text-teal-400" />
    },
    { 
      num: "04", 
      title: "Quote Conversion Framing", 
      desc: "Strategic pricing tiers and clear quote presentation to prevent opportunities from dying after the first call.",
      icon: <FileText size={20} className="text-teal-400" />
    },
    { 
      num: "05", 
      title: "Reactivation & Win-Back Layer", 
      desc: "Turn dormant accounts and old inquiries into active revenue opportunities with automated win-back sequences.",
      icon: <RefreshCw size={20} className="text-teal-400" />
    },
    { 
      num: "06", 
      title: "Territory Review & Exclusivity", 
      desc: "Exclusive market reservation for one operator per territory, increasing urgency and strategic value.",
      icon: <MapPin size={20} className="text-teal-400" />
    },
    { 
      num: "07", 
      title: "Service-Market Fit Check", 
      desc: "Direct assessment of your market and offer viability to prevent wasted time and resources.",
      icon: <CheckCircle2 size={20} className="text-teal-400" />,
      tag: "BONUS"
    },
    { 
      num: "08", 
      title: "Commercial Sub-Niche Expansion", 
      desc: "Expand your addressable market with targeted message variants for adjacent service categories.",
      icon: <Maximize2 size={20} className="text-teal-400" />,
      tag: "BONUS"
    },
    { 
      num: "09", 
      title: "Offer Clarity Review", 
      desc: "Streamlined copy and positioning that removes vague promises, making your service easier to buy.",
      icon: <Search size={20} className="text-teal-400" />,
      tag: "BONUS"
    }
  ];

  return (
    <section className="py-12 md:py-16 px-6 bg-gradient-to-b from-[#06101d] to-[#0a111a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-12 md:mb-16 items-end">
          <Reveal>
            <div className="text-teal-400 text-[11px] font-bold tracking-widest uppercase mb-2">What You Get</div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Nine components,<br/>done for you</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed">
              This is built as a system, not a random collection of marketing tasks. Every component exists to help you win more commercial accounts and protect recurring revenue.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12">
          {components.map((comp, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-[#0b1120]/80 border border-slate-800/60 rounded-3xl p-6 md:p-8 h-full hover:border-teal-500/30 transition-colors relative flex flex-col"
              >
                {comp.tag && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-800/80 text-teal-400 text-[10px] font-bold tracking-widest uppercase border border-slate-700/50">
                      {comp.tag}
                    </span>
                  </div>
                )}
                
                <div className={`mb-4 ${!comp.tag ? 'mt-2' : ''}`}>
                  <motion.div
                    initial={{ rotate: -10, opacity: 0 }}
                    whileInView={{ rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i * 0.1) + 0.3, duration: 0.5 }}
                  >
                    {comp.icon}
                  </motion.div>
                </div>
                
                <div className="text-teal-400 font-bold text-sm mb-3">
                  {comp.num}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">{comp.title}</h3>
                
                <p className="text-slate-400 text-sm leading-relaxed flex-grow">{comp.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <CallToAction text="Implement These Components" className="mt-0" />
      </div>
    </section>
  );
};

const OperationalProof = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleMove(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <section className="py-8 md:py-10 px-6 bg-[#0a111a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-8 md:mb-10 items-end">
          <Reveal>
            <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-2">Operational Proof</div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">See what changes<br/>once the system<br/>is installed</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-sm text-slate-400 leading-relaxed">
              Instead of relying on generic marketing activity, the business gets a defined path from first inquiry to walkthrough, quote follow-up, and renewal protection.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div 
            ref={containerRef}
            className="relative w-full h-[400px] md:h-[380px] rounded-3xl overflow-hidden cursor-ew-resize select-none border border-slate-800 bg-slate-900/40 mb-8"
            onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
            onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
          >
            {/* Right Side (Without System / Before) */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center items-end">
              <div className="w-full md:w-1/2 space-y-3 md:pl-6">
                <div className="inline-block bg-slate-800/80 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-2 text-slate-400 border border-slate-700">
                  Without The System
                </div>
                {[
                  "Booked walkthrough capture for commercial buyers only",
                  "Instant response, missed-call text back, and quote recovery",
                  "Renewal calendar, overdue chase, and reactivation flow",
                  "Weekly scoreboard built around contracts, not vanity metrics"
                ].map((text, i) => (
                  <div key={i} className="bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl text-xs md:text-sm text-slate-300 font-medium">
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Left Side (With System / After) */}
            <div 
              className="absolute inset-0 bg-[#13232c] p-6 md:p-8"
              style={{ 
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                transform: 'translateZ(0)',
                willChange: 'clip-path'
              }}
            >
              <div className="inline-block bg-slate-800/80 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5 text-white border border-slate-700">
                With The System
              </div>
              
              <div className="space-y-4 w-full md:w-[45%]">
                <div className="bg-slate-800/60 border border-slate-700 p-4 rounded-2xl">
                  <h4 className="font-bold text-white mb-1 text-sm">Booked walkthrough capture</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Commercial buyers request walkthroughs and move into instant follow-up.</p>
                </div>
                <div className="bg-slate-800/60 border border-slate-700 p-4 rounded-2xl">
                  <h4 className="font-bold text-white mb-1 text-sm">Quote chase system</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Reminders and recovery flows stop opportunities from dying quietly after the visit.</p>
                </div>
                <div className="bg-slate-800/60 border border-slate-700 p-4 rounded-2xl">
                  <h4 className="font-bold text-white mb-1 text-sm">Renewal protection</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Due-date reminders and reactivation flows help recover recurring revenue.</p>
                </div>
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-amber-400 cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,197,94,0.5)] text-slate-900">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 9l-4 3 4 3" />
                  <path d="M16 9l4 3-4 3" />
                </svg>
              </div>
            </div>
          </div>
        </Reveal>
        <CallToAction text="Install This System" className="mt-0" />
      </div>
    </section>
  );
};

const SeoUpgrade = () => {
  const features = [
    "Google Business Profile optimization",
    "Service page SEO",
    "City page rollout",
    "Internal linking",
    "On-page fixes",
    "Keyword tracking",
    "Trust content expansion",
    "Organic conversion improvements"
  ];

  return (
    <section className="py-8 md:py-10 px-6 bg-gradient-to-b from-slate-900/30 to-[#0a111a]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 md:p-10 lg:p-12 mb-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
              
              <div>
                <div className="text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-3">Month 3 Upgrade</div>
                <h2 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">Add SEO once the paid engine shows us what already converts</h2>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  In month 3, we add the Organic Demand Layer so you start building long-term Google visibility around the services, cities, and buyer angles already proven to work. Paid demand gives you speed first. SEO gives you compounding second.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-3">
                  {features.map((feature, i) => (
                    <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3 text-xs font-medium text-slate-200">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 w-full shadow-2xl">
                  <div className="text-emerald-400 text-[11px] font-bold tracking-widest uppercase mb-2">Organic Demand Layer</div>
                  <div className="text-2xl font-bold mb-4">+$1.5k to $2.5k<span className="text-sm text-slate-400 font-normal">/month</span></div>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                    We build SEO around real winners instead of guessing. That means the pages, profile work, and content are built from data already proven by the paid engine.
                  </p>

                  <div className="space-y-2.5">
                    {[
                      "Reduces dependency on paid traffic over time",
                      "Builds a long-term Google asset",
                      "Turns winning services into organic demand"
                    ].map((benefit, i) => (
                      <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-medium text-slate-300">
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        <CallToAction text="Upgrade Your SEO" className="mt-0" />
      </div>
    </section>
  );
};

const Bubbles = () => {
  const [bubbles, setBubbles] = useState<{ id: number; size: number; left: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate bubbles only on the client side to avoid hydration mismatches
    const generatedBubbles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 2, // 2px to 8px
      left: Math.random() * 100, // 0% to 100%
      duration: Math.random() * 15 + 10, // 10s to 25s
      delay: Math.random() * 15, // 0s to 15s
    }));
    setBubbles(generatedBubbles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-amber-400/20 animate-float-up pointer-events-none"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const StickyCTA = () => {
  const { flags } = useFeatures();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!flags.showStickyCTA) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-3rem)] max-w-lg"
        >
          <div className="glass-panel p-4 md:p-5 rounded-2xl border-slate-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-3 overflow-hidden">
            {/* Progress Bar Container */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-800/50">
              <motion.div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-200"
                style={{ width: `${scrollProgress}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="hidden sm:block">
                <p className="text-white font-bold text-sm">Ready to scale?</p>
                <p className="text-slate-400 text-[10px] font-medium">Book your territory strategy call</p>
              </div>
              <a 
                href="https://calendly.com/adil_shahzad_khawaja/30min" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 sm:flex-none bg-gradient-to-r from-amber-400 to-amber-200 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-lg active:scale-95 transition-all"
              >
                Book Strategy Call <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <FeatureProvider>
      <div className="min-h-screen bg-[#06101d] text-slate-50 font-sans selection:bg-amber-500/30 overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(circle_at_center,black_30%,transparent_85%)]"></div>
        </div>
        <Bubbles />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <TrustedBy />
            <WhoThisIsFor />
            <InteractiveEstimator />
            <TerritoryControl />
            <SystemInstalls />
            <SystemComponents />
            <OperationalProof />
            <First30Days />
            <LaunchTimeline />
            <Problem />
            <Solution />
            <CaseStudies />
            <Reviews />
            <FeatureWrapper flag="showSeoUpgrade">
              <SeoUpgrade />
            </FeatureWrapper>
            <ROI />
            <FitCheck />
            <Guarantee />
            <FeatureWrapper flag="showPricing">
              <Pricing />
            </FeatureWrapper>
            <FAQ />
            <CTA />
          </main>
          <Footer />
        </div>
        <StickyCTA />
      </div>
    </FeatureProvider>
  );
}

const FeatureWrapper = ({ flag, children }: { flag: keyof FeatureFlags, children: React.ReactNode }) => {
  const { flags } = useFeatures();
  if (!flags[flag]) return null;
  return <>{children}</>;
};
