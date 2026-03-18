interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
}

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  return (
    <section className="py-32 relative bg-slate-50/30 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
        <div className="grid grid-cols-6 h-full gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border-l border-accent-dark h-full"></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
          <div className="max-w-2xl">
            <h2 className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-6">Technological Pillars</h2>
            <h3 className="text-5xl lg:text-7xl font-extrabold text-accent-dark leading-[1.1] tracking-tighter">
              Solutions for the <br /><span className="text-primary italic">Algorithm Age.</span>
            </h3>
          </div>
          <div className="md:w-72 pt-10">
            <p className="text-slate-400 text-sm leading-relaxed border-t border-slate-200 pt-6">
              Redefining traditional research with real-time predictive modeling.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`glass p-12 rounded-[3rem] group hover:border-primary/50 transition-all duration-700 hover:-translate-y-4 hover:shadow-primary/10 ${index === 1 ? 'bg-white/60' : ''}`}
            >
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-12 group-hover:rotate-[15deg] transition-transform ${index === 1 ? 'bg-primary text-white' : 'bg-accent-dark text-primary'}`}>
                <span className="material-symbols-outlined text-4xl">{service.icon}</span>
              </div>
              <h4 className="text-3xl font-extrabold mb-6 text-accent-dark">{service.title}</h4>
              <p className="text-slate-500 mb-10 leading-relaxed font-medium">{service.description}</p>
              <div className="w-12 h-1 bg-primary/20 mb-8 group-hover:w-full transition-all duration-700"></div>
              <a className="inline-flex items-center gap-3 text-accent-dark font-black uppercase text-xs tracking-widest group/link" href="#">
                <span>{service.link}</span>
                <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">trending_flat</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
