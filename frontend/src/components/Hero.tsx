'use client';

interface HeroProps {
  headline?: string;
  subtext?: string;
}

export default function Hero({ headline = 'Data is Dynamic.', subtext }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden mesh-gradient">
      <div className="absolute inset-0 data-grid-bg opacity-30"></div>
      <div className="absolute top-20 -right-40 w-[45rem] h-[45rem] hero-blob rounded-full"></div>
      <div className="absolute bottom-0 -left-40 w-[40rem] h-[40rem] hero-blob rounded-full opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/50 border border-primary/20 backdrop-blur-md text-primary text-[10px] font-black tracking-[0.25em] uppercase mb-10 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Next-Gen Data Architecture
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-extrabold text-accent-dark leading-[0.95] tracking-tighter mb-10">
            {headline.split('.').map((part, i) => (
              <span key={i}>
                {i === 0 ? part : <><br /><span className="gradient-text italic">{part}</span></>}
              </span>
            ))}
          </h1>

          <p className="text-xl lg:text-2xl text-slate-500 leading-relaxed mb-12 max-w-2xl font-light">
            {subtext || 'Wahana Data Utama architects intelligence. We bridge the gap between complex raw data and high-velocity business growth.'}
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <button className="btn-futuristic-primary text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center gap-3 group">
              Our Ecosystem
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">bolt</span>
            </button>
            <button className="btn-futuristic-secondary text-accent-dark px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-wider">
              Contact Specialist
            </button>
          </div>
        </div>
      </div>

      <div className="hidden xl:block absolute right-20 top-1/2 -translate-y-1/2 w-1/3">
        <div className="relative h-[600px] w-full">
          <div className="glass absolute top-0 left-10 p-8 rounded-3xl w-64 floating-ui" style={{ animationDelay: '-1s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <div className="h-2 w-24 bg-slate-200 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-slate-100 rounded-full"></div>
              <div className="h-2 w-4/5 bg-slate-100 rounded-full"></div>
            </div>
          </div>
          <div className="glass absolute bottom-20 right-0 p-10 rounded-[40px] w-72 floating-ui" style={{ animationDelay: '-3s' }}>
            <div className="text-4xl font-black text-primary mb-2">99%</div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
