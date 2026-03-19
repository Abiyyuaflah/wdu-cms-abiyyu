'use client';

interface HeroProps {
  headline?: string;
  subtext?: string;
  backgroundImageUrl?: string;
}

export default function Hero({ headline = 'Data is Dynamic.', subtext, backgroundImageUrl }: HeroProps) {
  const defaultBgImage = backgroundImageUrl || 'https://sis.wahanadata.co.id/img/wdu-building.jpg';

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat animate-zoom-bg"
        style={{
          backgroundImage: `url(${defaultBgImage})`,
          backgroundPosition: 'right center',
          filter: 'brightness(0.85) saturate(1.1)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      <div className="absolute inset-0 data-grid-bg opacity-30" />
      <div className="absolute top-20 -right-40 w-[45rem] h-[45rem] hero-blob rounded-full" />
      <div className="absolute bottom-0 -left-40 w-[40rem] h-[40rem] hero-blob rounded-full opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-4xl">

          <div className="flex flex-col xl:flex-row items-start gap-16">
            <div className="flex-1">
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
        </div>
      </div>
    </section>
  );
}
