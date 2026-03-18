'use client';

import { useState } from 'react';

interface NavbarProps {
  logoUrl?: string;
  companyName?: string;
}

export default function Navbar({ logoUrl, companyName = 'Wahana Data Utama' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-10 w-auto">
            <img alt="Wahana Data Utama Logo" className="h-full w-auto object-contain" src={logoUrl || '/logo.png'} />
          </div>
          <h2 className="text-lg font-extrabold tracking-tight text-accent-dark uppercase">
            {companyName.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? 'text-primary' : ''}>{word} </span>
            ))}
          </h2>
        </div>

        <nav className="hidden lg:flex items-center gap-10">
          {['Beranda', 'Layanan', 'Tentang Kami', 'Portfolio', 'Kontak'].map((item) => (
            <a key={item} className="text-sm font-bold text-slate-600 hover:text-primary transition-all relative group" href="#">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        <button className="btn-futuristic-primary text-white px-7 py-3 rounded-full text-xs font-black tracking-widest uppercase shadow-lg">
          Mulai Proyek
        </button>
      </div>
    </header>
  );
}
