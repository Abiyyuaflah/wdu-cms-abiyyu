interface AboutProps {
  title?: string;
  text?: string;
  yearsExperience?: number;
}

export default function About({
  title = 'Human Intuition. Machine Precision.',
  text = "Founded in 2006, we've evolved from a research powerhouse into a digital transformation catalyst. We understand that data isn't just numbers—it's the pulse of your future enterprise.",
  yearsExperience = 18
}: AboutProps) {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-1/2 relative">
            <div className="absolute -inset-10 bg-primary/5 rounded-[4rem] -rotate-3"></div>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <img
                alt="Strategic Vision"
                className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0 hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWx-ohTYzay4u5Hf1OxWncK-U84yS84853KgJMYPUeqO4JmnKYfOjjrnhhJnMuK2H2tFIL3_jduB0i0I6fSqs2W02rcl1Fz4RE9lFbtTLnLwWlfcOL-rebzKkydrO8-dC0Fc_3Pv3Axuw-8qf2RG5BCXCXpiWgnmnPisjvL77L9eeeV36AtqYBIHy0Oqa4jiNyoBH9p4zBSVP24h0w7twZHhjHhybslqLAkDj_yNBiuxRtsr1ydC8btpSaDminerCCaSIHLqrsH9dP"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass p-10 rounded-3xl border border-white shadow-2xl backdrop-blur-2xl">
              <p className="text-5xl font-black text-accent-dark mb-1">20+</p>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Years of Evolution</p>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-6">Our DNA</h2>
            <h3 className="text-5xl md:text-7xl font-extrabold mb-10 text-accent-dark leading-[1.1] tracking-tighter">
              {title}
            </h3>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed font-light">
              {text}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary mb-6 shadow-sm">
                  <span className="material-symbols-outlined">rocket_launch</span>
                </div>
                <h5 className="text-lg font-extrabold text-accent-dark mb-3">Exponential Scale</h5>
                <p className="text-sm text-slate-500 leading-relaxed">Infrastructure that grows as fast as your ambitions.</p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary mb-6 shadow-sm">
                  <span className="material-symbols-outlined">security</span>
                </div>
                <h5 className="text-lg font-extrabold text-accent-dark mb-3">Enterprise Trust</h5>
                <p className="text-sm text-slate-500 leading-relaxed">Securing national-level data streams for nearly two decades.</p>
              </div>
            </div>

            <button className="inline-flex items-center gap-3 group text-accent-dark font-black tracking-widest uppercase text-xs transition-all hover:gap-6">
              Discovery Deep-Dive
              <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
