interface FooterProps {
  companyName?: string;
  footerText?: string;
  address?: string;
  email?: string;
  phone?: string;
}

export default function Footer({ 
  companyName = 'Wahana Data Utama',
  footerText = 'Architecting the future of intelligence through sustainable data-driven ecosystems since 2006.',
  address = 'SCBD Sector 7, Jakarta Digital District, ID 12190',
  email = 'uplink@wahanadata.tech',
  phone = '+62 (21) 1234 5678'
}: FooterProps) {
  return (
    <footer className="bg-accent-dark text-slate-400 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-10 w-auto">
                <img
                  alt="Wahana Data Utama Logo"
                  className="h-full w-auto brightness-0 invert"
                  src="/logo.png"
                />
              </div>
              <h2 className="text-xl font-black tracking-tight text-white uppercase italic">
                {companyName.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? 'text-primary' : ''}>{word} </span>
                ))}
              </h2>
            </div>
            <p className="text-lg leading-relaxed mb-10 text-slate-400 font-light max-w-md">
              {footerText}
            </p>
            <div className="flex gap-5">
              <a className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 border border-white/10" href="#">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 border border-white/10" href="#">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-10">Protocols</h4>
            <ul className="space-y-5 text-sm font-bold">
              {['Neural Research', 'Velocity Insights', 'Core Infrastructure', 'Predictive Modeling'].map((item) => (
                <li key={item}>
                  <a className="hover:text-primary transition-all flex items-center gap-2 group" href="#">
                    <span className="w-2 h-2 bg-primary/20 group-hover:bg-primary rounded-full transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-10">Entity</h4>
            <ul className="space-y-5 text-sm font-bold">
              {['The Nexus', 'Project Archives', 'Career Sync', 'Establish Link'].map((item) => (
                <li key={item}>
                  <a className="hover:text-primary transition-all flex items-center gap-2 group" href="#">
                    <span className="w-2 h-2 bg-primary/20 group-hover:bg-primary rounded-full transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-10">Access Points</h4>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                <span className="leading-relaxed font-bold">{address}</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-xl">terminal</span>
                <span className="font-bold">{email}</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-xl">sensors</span>
                <span className="font-bold">{phone}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em]">
          <p>&copy; 2024 Wahana Data Utama Nexus. ALL SYSTEMS NOMINAL.</p>
          <div className="flex gap-12">
            <a className="hover:text-white transition-colors" href="#">Encryption Policy</a>
            <a className="hover:text-white transition-colors" href="#">Operational Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
