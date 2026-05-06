import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';
import { usePages } from '../context/PageContext';

interface SiteConfig {
  email: string;
  telepon: string;
  alamat: string;
  companyProfile: string;
  footerCopyright: string;
  socialYoutube: string;
  socialInstagram: string;
}

const defaultConfig: SiteConfig = {
  email: 'info@wahanadata.co.id',
  telepon: '+62 21 1234 5678',
  alamat: '',
  companyProfile: '',
  footerCopyright: '© 2025 Wahana Data Utama. All Rights Reserved.',
  socialYoutube: 'https://www.youtube.com/@wahanadatautama9110',
  socialInstagram: 'https://www.instagram.com/wahanadatautama',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export default function Footer() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const { pages } = usePages();
  const draftSlugs = pages.filter(p => !p.isPublished).map(p => p.slug);

  useEffect(() => {
    const stored = localStorage.getItem('wdu_site_config');
    if (stored) {
      try {
        setConfig({ ...defaultConfig, ...JSON.parse(stored) });
      } catch (e) {
        setConfig(defaultConfig);
      }
    }
  }, []);
  return (
    <footer className="bg-accent-dark text-slate-400 py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20"
        >
          <motion.div variants={itemVariants} className="md:col-span-5">
            <div className="flex items-center gap-4 mb-10">
              <div className="text-2xl font-black text-white tracking-tighter uppercase transition-colors hover:text-primary cursor-default">
                PT. WAHANA <span className="text-primary">DATA</span> UTAMA
              </div>
            </div>
            <p className="text-lg leading-relaxed mb-12 max-w-md font-light">
              {config.footerCopyright || '© 2025 Wahana Data Utama. All Rights Reserved'}
            </p>
            <div className="flex gap-5">
              {[
                { 
                  name: 'youtube', 
                  url: config.socialYoutube || 'https://www.youtube.com/@wahanadatautama9110',
                  path: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                },
                { 
                  name: 'instagram', 
                  url: config.socialInstagram || 'https://www.instagram.com/wahanadatautama',
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300 group"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="white" 
                    className="transition-all duration-300 group-hover:fill-slate-900 group-hover:scale-110"
                  >
                    <path d={social.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-2 md:col-start-7">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-10">Ekosistem</h4>
            <ul className="space-y-6">
              {[
                { name: 'Beranda', slug: 'home' },
                { name: 'Layanan', slug: 'layanan' },
                { name: 'Tentang Kami', slug: 'tentang-kami' },
                { name: 'Portfolio', slug: 'portfolio' }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.name === 'Beranda' ? '/' : `/${item.name.toLowerCase().replace(' ', '-')}`}
                    className="hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <motion.span 
                      className="w-0 h-0.5 bg-primary"
                      whileHover={{ width: 16 }}
                      transition={{ duration: 0.3 }}
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-2">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-10">Layanan</h4>
            <ul className="space-y-6">
              {[
                { name: 'Riset Pasar', path: '/riset-pasar', slug: 'riset-pasar' },
                { name: 'Analisis Data', path: '/analisis-data', slug: 'analisis-data' },
                { name: 'Konsultasi IT', path: '/konsultasi-it', slug: 'konsultasi-it' },
                { name: 'Riset Data', path: '/riset-data', slug: 'riset-data' },
                { name: 'Event Organizer', path: '/event-organizer', slug: 'event-organizer' },
                { name: 'Survei', path: '/survei', slug: 'survei' }
              ].map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={item.path} className="hover:text-primary transition-colors">{item.name}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-2">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-10">Kontak</h4>
            <p className="text-sm leading-loose mb-6 whitespace-pre-line">
              {config.alamat || 'Kota Bogor\nBlok AE No. 01, Jl. Terapi Raya, RT 03/19, Menteng\nKec. Bogor Barat, Kota Bogor, Jawa Barat 16111'}
            </p>
            <a href={`mailto:${config.email || 'info@wahanadata.co.id'}`} className="text-primary font-bold hover:underline select-all block">
              {config.email || 'info@wahanadata.co.id'}
            </a>
            <a href={`tel:${config.telepon?.replace(/\s/g, '') || '+622517552099'}`} className="text-primary font-bold hover:underline select-all">
              {config.telepon || '(0251) 755 2099'}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
            {config.footerCopyright || '© 2025 WAHANA DATA UTAMA. ALL RIGHTS RESERVED.'}
          </p>
          <div className="flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
