const fs = require('fs');
let content = fs.readFileSync('./src/App.tsx', 'utf8');

// Global spacing
content = content.replace(/className="py-24 px-6/g, 'className="py-24 md:py-32 px-6');
content = content.replace(/className="mb-16/g, 'className="mb-16 md:mb-20');
content = content.replace(/className="mb-12 text-center/g, 'className="mb-16 md:mb-20 text-center');

// Hero
content = content.replace(/className="pt-32 pb-20 px-6 relative overflow-hidden"/g, 'className="pt-40 pb-24 md:pb-32 px-6 relative overflow-hidden"');
content = content.replace(/className="max-w-7xl mx-auto grid lg:grid-cols-\[1\.1fr_0\.9fr\] gap-12 items-center"/g, 'className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center"');
content = content.replace(/className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed"/g, 'className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed"');

// SystemInstalls
content = content.replace(/rounded-\[2\.5rem\] p-8 lg:p-12/g, 'rounded-[2.5rem] p-8 md:p-12 lg:p-16');
content = content.replace(/rounded-2xl p-6 lg:p-8/g, 'rounded-3xl p-8 md:p-10');
content = content.replace(/uppercase mb-8/g, 'uppercase mb-10');

// TerritoryControl
content = content.replace(/rounded-\[2\.5rem\] p-10 lg:p-16/g, 'rounded-[2.5rem] p-10 md:p-16 lg:p-20');

// Problem
content = content.replace(/grid md:grid-cols-3 gap-6/g, 'grid md:grid-cols-3 gap-6 md:gap-8');
content = content.replace(/glass-panel p-8 rounded-3xl/g, 'glass-panel p-8 md:p-10 rounded-[2.5rem]');
content = content.replace(/text-lg text-slate-400"/g, 'text-lg text-slate-400 leading-relaxed"');

// Solution
content = content.replace(/grid md:grid-cols-2 gap-8/g, 'grid md:grid-cols-2 gap-8 md:gap-10');
content = content.replace(/glass-panel p-10 rounded-\[2rem\]/g, 'glass-panel p-10 md:p-12 rounded-[2.5rem]');

// CaseStudies
content = content.replace(/glass-panel p-8 rounded-\[2rem\]/g, 'glass-panel p-10 md:p-12 rounded-[2.5rem]');

// Reviews
content = content.replace(/glass-panel p-8 rounded-3xl/g, 'glass-panel p-8 md:p-10 rounded-[2.5rem]');

// First30Days
content = content.replace(/rounded-3xl p-8 md:p-12 lg:p-16/g, 'rounded-[2.5rem] p-10 md:p-16 lg:p-20');
content = content.replace(/grid lg:grid-cols-\[1fr_1\.2fr\] gap-12 lg:gap-24/g, 'grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24');
content = content.replace(/rounded-2xl p-6/g, 'rounded-3xl p-8');

// LaunchTimeline
content = content.replace(/grid md:grid-cols-2 gap-12 mb-16 md:mb-20 items-end/g, 'grid md:grid-cols-2 gap-12 lg:gap-16 mb-16 md:mb-20 items-end');
content = content.replace(/grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12/g, 'grid sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 mb-12');
content = content.replace(/rounded-2xl p-6 h-full/g, 'rounded-3xl p-8 h-full');

// ROI
content = content.replace(/grid lg:grid-cols-\[1fr_1\.2fr\] gap-12 lg:gap-24 mb-12/g, 'grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 mb-16');
content = content.replace(/grid sm:grid-cols-2 lg:grid-cols-4 gap-6/g, 'grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8');

// FitCheck
content = content.replace(/grid md:grid-cols-2 gap-6 mb-12/g, 'grid md:grid-cols-2 gap-6 md:gap-8 mb-12');
content = content.replace(/rounded-3xl p-8 md:p-12/g, 'rounded-[2.5rem] p-10 md:p-16');

// Guarantee
content = content.replace(/grid lg:grid-cols-\[1\.2fr_1fr\] gap-12 lg:gap-24/g, 'grid lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24');

// Pricing
content = content.replace(/glass-panel p-8 rounded-\[2rem\]/g, 'glass-panel p-10 rounded-[2.5rem]');

// FAQ
content = content.replace(/rounded-2xl border-slate-800/g, 'rounded-3xl border-slate-800');
content = content.replace(/p-6 font-bold text-lg/g, 'p-8 font-bold text-lg md:text-xl');
content = content.replace(/px-6 pb-6 text-slate-400/g, 'px-8 pb-8 text-slate-400 text-lg');
content = content.replace(/size={20}/g, 'size={24}');

// CTA
content = content.replace(/glass-panel p-12 md:p-20 rounded-\[3rem\]/g, 'glass-panel p-12 md:p-24 rounded-[3rem]');

// SixComponents
content = content.replace(/grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12/g, 'grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12');
content = content.replace(/rounded-2xl p-8 h-full/g, 'rounded-3xl p-8 md:p-10 h-full');

// OperationalProof
content = content.replace(/rounded-3xl overflow-hidden cursor-ew-resize/g, 'rounded-[2.5rem] overflow-hidden cursor-ew-resize');

// SeoUpgrade
content = content.replace(/grid lg:grid-cols-2 gap-12 lg:gap-24/g, 'grid lg:grid-cols-2 gap-16 lg:gap-24');

fs.writeFileSync('./src/App.tsx', content);
