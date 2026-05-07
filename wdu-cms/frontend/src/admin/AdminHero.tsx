import { useState, useEffect } from 'react';
import { Save, Eye, AlertCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { logActivity } from '../utils/activityLogger';
import api from '../services/api';
import { usePages } from '../context/PageContext';

const STORAGE_KEY = 'wdu_admin_settings';

const defaultSettings = {
  heroes: {
    home: {
      badgeText: 'Wahana Data Utama - Since 2006',
      headline: ['Data Terpadu,', 'Solusi Cerdas', 'Hasil Maksimal'],
      description: 'Percayakan kebutuhan riset, analisis data, dan teknologi kepada Wahana Data Utama. Kami mengubah data menjadi wawasan berharga dan solusi praktis yang membantu Anda meraih keunggulan kompetitif di bisnis anda.',
      stats: [
        { value: '25+', label: 'Enterprise Clients' },
        { value: '150+', label: 'Projects Done' },
        { value: '99%', label: 'Uptime Security' },
      ],
      carouselImages: [
        'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/wdu-header-2-scaled-qzz41v3uq1iw5ezxx3694wk5veazbnw3q62nnmrcww.jpg',
        'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/bkpm-scaled-r0gn5zclhzniq0rcdzfe7k85fdqhwh6ngb7cl7exi8.jpg',
        'https://wahanadata.co.id/wp-content/uploads/2025/01/34695135-c70d-4d76-92d5-10c39eb5390f.jpg',
      ],
      ctaText: 'Mulai Kolaborasi',
      ctaLink: 'https://wa.me/62881012394686?text=Halo%20Wahana%20Data%20Utama,%20saya%20tertarik%20untuk%20berkolaborasi%20mengenai%20layanan%20riset%20dan%20data.',
    },
    about: {
      badgeText: 'Tentang Kami',
      headline: ['Mengubah Data Menjadi', 'Kekuatan Untuk', 'Keputusan Cerdas'],
      description: 'Wahana Data Utama adalah mitra terpercaya dalam bidang riset dan analisis data yang membantu organisasi pemerintah dan swasta di Indonesia.',
      stats: [
        { value: '15+', label: 'Tahun Pengalaman' },
        { value: '500+', label: 'Proyek Selesai' },
        { value: '50+', label: 'Tim Ahli' },
      ],
      carouselImages: [],
      bgImage: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/1384bbe7-3362-446d-b989-77114335e7ea-1-scaled-r09xvdqugccp0qj415ithlfa8gvrifzftmrqwj4fts.jpg',
      ctaText: 'Pelajari Lebih Lanjut',
      ctaLink: '#experience',
    },
    experience: {
      badgeText: 'Pengalaman',
      headline: ['Portofolio', 'Proyek &', 'Kesuksesan'],
      description: 'Kami telah berhasil menyelesaikan berbagai proyek strategis untuk berbagai instansi pemerintah dan perusahaan swasta.',
      stats: [
        { value: '100+', label: 'Klien PNS' },
        { value: '50+', label: 'Klien Swasta' },
        { value: '10+', label: 'Institusi NLRB' },
      ],
      carouselImages: [],
      bgImage: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/bkpm-scaled-r0gn5zclhzniq0rcdzfe7k85fdqhwh6ngb7cl7exi8.jpg',
      ctaText: 'Lihat Semua Proyek',
      ctaLink: '#projects',
    },
    services: {
      badgeText: 'Layanan Kami',
      headline: ['Solusi', 'Terbaik Untuk', 'Kebutuhan Anda'],
      description: 'Kami menyediakan berbagai layanan riset, analisis data, dan konsultasi teknologi yang disesuaikan dengan kebutuhan Anda.',
      stats: [
        { value: '5+', label: 'Jenis Layanan' },
        { value: '24/7', label: 'Dukungan' },
        { value: '100%', label: 'Kepuasan Klien' },
      ],
      carouselImages: [],
      bgImage: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/layanan-header-scaled-qzz41v3uq1iw5ezxx3694wk5veazbnw3q62nnmrcww.jpg',
      ctaText: 'Konsultasi Gratis',
      ctaLink: '#contact',
    },
    contact: {
      badgeText: 'Hubungi Kami',
      headline: ['Siap', 'Membantu', 'Anda'],
      description: 'Jangan ragu untuk menghubungi kami. Tim profesional kami siap memberikan konsultasi dan menjawab pertanyaan Anda.',
      stats: [
        { value: '24/7', label: 'Dukungan' },
        { value: '< 1 Jam', label: 'Respon Time' },
        { value: '100%', label: 'Professional' },
      ],
      carouselImages: [],
      bgImage: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/kontak-header-r02xh9skmo5ipym1j4rohxyhov5sjnraxkbp516srk.jpg',
      ctaText: 'Hubungi Sekarang',
      ctaLink: 'https://wa.me/62881012394686',
    },
  }
};

export default function AdminHero() {
  const { user } = useAuthStore();
  const [settings, setSettings] = useState<any>(defaultSettings);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);

  // Hero Tab State
  const [activeHeroTab, setActiveHeroTab] = useState<'home' | 'about' | 'experience' | 'services' | 'contact'>('home');

  // Published state per page
  const [publishedPages, setPublishedPages] = useState<Record<string, boolean>>({
    home: true,
    about: true,
    experience: true,
    services: true,
    contact: true,
  });

  const { refreshPages } = usePages();

  // Load published pages state from API
  useEffect(() => {
    api.get('/pages').then(res => {
      const dbPages = res.data;
      const initialStates: Record<string, boolean> = {
        home: true,
        about: true,
        experience: true,
        services: true,
        contact: true,
      };
      
      dbPages.forEach((p: any) => {
        if (p.slug === 'home') initialStates.home = p.isPublished;
        if (p.slug === 'tentang-kami') initialStates.about = p.isPublished;
        if (p.slug === 'portfolio') initialStates.experience = p.isPublished;
        if (p.slug === 'layanan') initialStates.services = p.isPublished;
        if (p.slug === 'kontak') initialStates.contact = p.isPublished;
      });
      setPublishedPages(initialStates);
    }).catch(console.error);
  }, []);

  // Toggle publish handler
  const handleTogglePublish = async (key: string) => {
    try {
      const newStatus = !publishedPages[key];
      const slugMap: Record<string, string> = {
        home: 'home',
        about: 'tentang-kami',
        experience: 'portfolio',
        services: 'layanan',
        contact: 'kontak'
      };
      const targetSlug = slugMap[key];
      
      if (targetSlug) {
        await api.patch(`/pages/${targetSlug}/publish`, { isPublished: newStatus });
        await refreshPages(); // Update global context for public site
      }

      setPublishedPages(prev => ({ ...prev, [key]: newStatus }));
      const pageName = key === 'home' ? 'Home' : key.charAt(0).toUpperCase() + key.slice(1);
      showToast('success', `${pageName} ${newStatus ? 'published!' : 'unpublished!'}`);
      logActivity({
        action: newStatus ? 'Activating' : 'Deactivating',
        actor: user?.name || user?.email || 'Admin',
        target: `Page ${pageName}`,
        section: 'Hero / Pages',
        page: 'Admin Panel',
        type: 'public',
        detail: newStatus ? 'Status: Published' : 'Status: Draft',
      });
    } catch (error) {
      console.error('Failed to toggle publish:', error);
      showToast('error', 'Failed to update page status');
    }
  };

  const handlePreview = (key: string) => {
    if (publishedPages[key]) {
      const urlMap: Record<string, string> = { home: '/', about: '/tentang-kami', experience: '/portfolio', services: '/layanan', contact: '/kontak' };
      window.open(urlMap[key] || '/', '_blank');
    } else {
      setShowDraftModal(true);
    }
  };

  const handlePublishAndPreview = () => {
    handleTogglePublish(activeHeroTab);
    setShowDraftModal(false);
    const urlMap: Record<string, string> = { home: '/', about: '/tentang-kami', experience: '/portfolio', services: '/layanan', contact: '/kontak' };
    setTimeout(() => window.open(urlMap[activeHeroTab] || '/', '_blank'), 300);
  };

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  // Load settings from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const handleHeroChange = (field: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      heroes: {
        ...prev.heroes,
        [activeHeroTab]: {
          ...prev.heroes[activeHeroTab],
          [field]: value,
        },
      },
    }));
  };

  const handleHeroHeadlineChange = (index: number, value: string) => {
    setSettings((prev: any) => ({
      ...prev,
      heroes: {
        ...prev.heroes,
        [activeHeroTab]: {
          ...prev.heroes[activeHeroTab],
          headline: prev.heroes[activeHeroTab].headline.map((item: string, i: number) => i === index ? value : item),
        },
      },
    }));
  };

  const addHeroStat = () => {
    setSettings((prev: any) => ({
      ...prev,
      heroes: {
        ...prev.heroes,
        [activeHeroTab]: {
          ...prev.heroes[activeHeroTab],
          stats: [...(prev.heroes[activeHeroTab].stats || []), { value: '0', label: 'New Stat' }],
        },
      },
    }));
  };

  const removeHeroStat = (index: number) => {
    setSettings((prev: any) => ({
      ...prev,
      heroes: {
        ...prev.heroes,
        [activeHeroTab]: {
          ...prev.heroes[activeHeroTab],
          stats: (prev.heroes[activeHeroTab].stats || []).filter((_: any, i: number) => i !== index),
        },
      },
    }));
  };

  const updateHeroStat = (index: number, field: string, value: string) => {
    setSettings((prev: any) => ({
      ...prev,
      heroes: {
        ...prev.heroes,
        [activeHeroTab]: {
          ...prev.heroes[activeHeroTab],
          stats: (prev.heroes[activeHeroTab].stats || []).map((stat: any, i: number) =>
            i === index ? { ...stat, [field]: value } : stat
          ),
        },
      },
    }));
  };

  const addHeroImage = () => {
    setSettings((prev: any) => ({
      ...prev,
      heroes: {
        ...prev.heroes,
        [activeHeroTab]: {
          ...prev.heroes[activeHeroTab],
          carouselImages: [...(prev.heroes[activeHeroTab].carouselImages || []), ''],
        },
      },
    }));
  };

  const removeHeroImage = (index: number) => {
    setSettings((prev: any) => ({
      ...prev,
      heroes: {
        ...prev.heroes,
        [activeHeroTab]: {
          ...prev.heroes[activeHeroTab],
          carouselImages: (prev.heroes[activeHeroTab].carouselImages || []).filter((_: any, i: number) => i !== index),
        },
      },
    }));
  };

  const updateHeroImage = (index: number, value: string) => {
    setSettings((prev: any) => ({
      ...prev,
      heroes: {
        ...prev.heroes,
        [activeHeroTab]: {
          ...prev.heroes[activeHeroTab],
          carouselImages: (prev.heroes[activeHeroTab].carouselImages || []).map((img: string, i: number) =>
            i === index ? value : img
          ),
        },
      },
    }));
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    showToast('success', 'Hero settings saved successfully!');
    const tabLabels: Record<string, string> = { home: 'Home', about: 'About Us', experience: 'Experience', services: 'Services', contact: 'Contact' };
    logActivity({
      action: 'Saving',
      actor: user?.name || user?.email || 'Admin',
      target: `Hero Section — ${tabLabels[activeHeroTab] || activeHeroTab}`,
      section: 'Hero / Pages',
      page: 'Admin Panel',
      type: 'public',
      detail: `Badge: "${settings?.heroes?.[activeHeroTab]?.badgeText || ''}" | Headline: "${settings?.heroes?.[activeHeroTab]?.headline?.[0] || ''}"`,
    });
    setIsSaving(false);
  };

  if (!isLoaded || !settings) return null;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 dark:bg-surface-container-low/80 dark:backdrop-blur-sm">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 right-6 z-[100] px-6 py-3 rounded-xl shadow-lg font-semibold text-sm flex items-center gap-2 transition-all animate-in slide-in-from-right ${toast.type === 'success' ? 'bg-gradient-to-r from-[#6ab149] to-[#5a9e3f] text-white' : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
          }`}>
          <span className="material-symbols-outlined text-base">
            {toast.type === 'success' ? 'check_circle' : 'error'}
          </span>
          {toast.msg}
        </div>
      )}

      {/* Draft Preview Modal */}
      {showDraftModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-md">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <AlertCircle className="text-amber-600" size={28} />
              </div>
              <button
                onClick={() => setShowDraftModal(false)}
                className="p-2 hover:bg-gray-100 hover:text-gray-500 rounded-xl transition-all text-gray-400"
              >
                <X size={20} />
              </button>
            </div>
            <h3 className="text-xl font-black text-gray-800 tracking-tight mb-2">Page Not Published</h3>
            <p className="text-sm text-gray-500 font-body leading-relaxed mb-6">
              The page <strong>{activeHeroTab === 'home' ? 'Home' : activeHeroTab.charAt(0).toUpperCase() + activeHeroTab.slice(1)}</strong> is currently in <strong>Draft</strong> status. You need to publish the page first to view it live.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDraftModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePublishAndPreview}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#6ab149] to-[#5a9e3f] text-white font-bold text-sm hover:from-[#5a9e3f] hover:to-[#4d8a34] transition-all shadow-lg shadow-[#6ab149]/25"
              >
                Publish & View
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl font-black font-headline text-gray-900 dark:text-white tracking-tight">Manage Pages</h1>
        <p className="text-gray-500 dark:text-gray-400 font-body">Manage hero section appearance and content for each page.</p>
      </header>

      <div className="w-full mt-6">
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-md border border-gray-100 hover:border-[#6ab149]/20 hover:shadow-lg transition-shadow w-full relative">
          {/* Action Buttons - Top Right Inside Card */}
          <div className="absolute top-6 right-6 z-50 flex flex-col gap-2">
            <button
              onClick={() => handleTogglePublish(activeHeroTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${publishedPages[activeHeroTab]
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-500/20'
                : 'bg-gradient-to-r from-slate-400 to-slate-500 text-white hover:from-slate-500 hover:to-slate-600 shadow-slate-400/20'
                }`}
            >
              <span className="material-symbols-outlined text-sm">
                {publishedPages[activeHeroTab] ? 'visibility' : 'visibility_off'}
              </span>
              {publishedPages[activeHeroTab] ? 'Published' : 'Draft'}
            </button>
            <button
              onClick={() => handlePreview(activeHeroTab)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 font-bold text-sm transition-all shadow-sm shadow-indigo-500/20"
            >
              <Eye size={14} /> Preview
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6 text-[#6ab149]">
            <span className="material-symbols-outlined">dashboard</span>
            <h2 className="font-bold text-on-surface tracking-tight">Pages Configuration</h2>
          </div>

          {/* Hero Page Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: 'home', label: 'Home', icon: 'home' },
              { key: 'about', label: 'About', icon: 'info' },
              { key: 'experience', label: 'Experience', icon: 'history' },
              { key: 'services', label: 'Services', icon: 'handshake' },
              { key: 'contact', label: 'Contact', icon: 'call' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveHeroTab(tab.key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${activeHeroTab === tab.key
                  ? 'bg-gradient-to-r from-[#6ab149] to-[#5a9e3f] text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
              >
                <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                {tab.label}
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${publishedPages[tab.key as keyof typeof publishedPages] ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'bg-gradient-to-r from-slate-300 to-slate-400 text-white'}`}>
                  {publishedPages[tab.key as keyof typeof publishedPages] ? 'ON' : 'OFF'}
                </span>
              </button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Badge Text */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-[#6ab149]/20 transition-all relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#6ab149]/0 via-[#6ab149]/3 to-[#6ab149]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-[#6ab149]/20 to-transparent skew-x-12 group-hover:animate-shimmer opacity-0 group-hover:opacity-100" />
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6ab149] px-1 mb-3 block relative z-10">Badge Text</label>
                <input
                  type="text"
                  value={settings.heroes[activeHeroTab]?.badgeText || ''}
                  onChange={(e) => handleHeroChange('badgeText', e.target.value)}
                  className="w-full p-3 bg-gray-50/60 hover:bg-gray-50 focus:bg-white border-none rounded-xl text-sm focus:ring-2 focus:ring-[#6ab149]/40 outline-none transition-all text-on-surface relative z-10"
                  placeholder="Wahana Data Utama - Since 2006"
                />
              </motion.div>

              {/* Headline */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-[#6ab149]/20 transition-all relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#6ab149]/0 via-[#6ab149]/3 to-[#6ab149]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6ab149] px-1 mb-4 block relative z-10">Headline (3 Baris)</label>
                <div className="space-y-3">
                  {(settings.heroes[activeHeroTab]?.headline || []).map((line: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-[10px] font-bold text-[#6ab149] w-12 bg-gradient-to-r from-[#6ab149]/10 to-[#6ab149]/5 px-2 py-1 rounded-lg text-center shadow-sm">Baris {index + 1}</span>
                      <input
                        type="text"
                        value={line}
                        onChange={(e) => handleHeroHeadlineChange(index, e.target.value)}
                        className="flex-1 p-3 bg-gray-50/60 hover:bg-gray-50 focus:bg-white border-none rounded-xl text-sm focus:ring-2 focus:ring-[#6ab149]/40 outline-none transition-all text-on-surface"
                        placeholder={`Teks baris ${index + 1}`}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-[#6ab149]/20 transition-all relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#6ab149]/0 via-[#6ab149]/3 to-[#6ab149]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6ab149] px-1 mb-3 block relative z-10">Description</label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  value={settings.heroes[activeHeroTab]?.description || ''}
                  onChange={(e) => handleHeroChange('description', e.target.value)}
                  rows={4}
                  className="w-full p-3 bg-gray-50/60 hover:bg-gray-50 focus:bg-white border-none rounded-xl text-sm focus:ring-2 focus:ring-[#6ab149]/40 outline-none transition-all text-on-surface resize-none relative z-10"
                  placeholder="Hero section description..."
                />
              </motion.div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-[#6ab149]/20 transition-all relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#6ab149]/0 via-[#6ab149]/3 to-[#6ab149]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6ab149] px-1 mb-4 block relative z-10">CTA Button</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant px-1">CTA Text</label>
                    <input
                      type="text"
                      value={settings.heroes[activeHeroTab]?.ctaText || ''}
                      onChange={(e) => handleHeroChange('ctaText', e.target.value)}
                      className="w-full p-3 bg-gray-50/60 hover:bg-gray-50 focus:bg-white border-none rounded-xl text-sm focus:ring-2 focus:ring-[#6ab149]/40 outline-none transition-all text-on-surface"
                      placeholder="Mulai Kolaborasi"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant px-1">CTA Link</label>
                    <input
                      type="text"
                      value={settings.heroes[activeHeroTab]?.ctaLink || ''}
                      onChange={(e) => handleHeroChange('ctaLink', e.target.value)}
                      className="w-full p-3 bg-gray-50/60 hover:bg-gray-50 focus:bg-white border-none rounded-xl text-sm focus:ring-2 focus:ring-[#6ab149]/40 outline-none transition-all text-on-surface"
                      placeholder="https://wa.me/..."
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Stats & Images */}
            <div className="space-y-6">
              {/* Stats */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-[#6ab149]/20 transition-all relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#6ab149]/0 via-[#6ab149]/3 to-[#6ab149]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex items-center justify-between mb-4">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#6ab149]">Statistik</label>
                  <button
                    onClick={addHeroStat}
                    className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#6ab149]/10 to-[#6ab149]/5 text-[#6ab149] rounded-lg font-bold text-xs hover:from-[#6ab149]/15 hover:to-[#6ab149]/10 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {(settings.heroes[activeHeroTab]?.stats || []).map((stat: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-gray-50/60 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => updateHeroStat(index, 'value', e.target.value)}
                        className="w-20 p-2 bg-gray-50 border-none rounded-lg text-sm font-bold focus:ring-2 focus:ring-[#6ab149]/20 outline-none text-on-surface"
                        placeholder="25+"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => updateHeroStat(index, 'label', e.target.value)}
                        className="flex-1 p-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#6ab149]/20 outline-none text-on-surface"
                        placeholder="Label statistik"
                      />
                      <button
                        onClick={() => removeHeroStat(index)}
                        className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-colors"
                        title="Delete Stat"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Carousel Images - Only for Home */}
              {activeHeroTab === 'home' && (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-[#6ab149]/20 transition-all relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6ab149]/0 via-[#6ab149]/3 to-[#6ab149]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#6ab149]">Carousel Images</label>
                    <button
                      onClick={addHeroImage}
                      className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#6ab149]/10 to-[#6ab149]/5 text-[#6ab149] rounded-lg font-bold text-xs hover:from-[#6ab149]/15 hover:to-[#6ab149]/10 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(settings.heroes[activeHeroTab]?.carouselImages || []).map((img: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01, x: 4 }}
                        className="p-3 bg-gray-50/60 hover:bg-gray-50 rounded-xl space-y-3 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold text-[#6ab149] bg-gradient-to-r from-[#6ab149]/10 to-[#6ab149]/5 px-2 py-1 rounded-lg shadow-sm">Img {index + 1}</span>
                          <input
                            type="text"
                            value={img}
                            onChange={(e) => updateHeroImage(index, e.target.value)}
                            className="flex-1 p-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#6ab149]/20 outline-none text-on-surface"
                            placeholder="https://example.com/image.jpg"
                          />
                          <button
                            onClick={() => removeHeroImage(index)}
                            className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-colors"
                            title="Delete Image"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                        {img && (
                          <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100 p-2">
                            <img src={img} alt={`Carousel ${index + 1}`} className="max-h-full max-w-full object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Background Image - For non-Home pages */}
              {activeHeroTab !== 'home' && (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-[#6ab149]/20 transition-all relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6ab149]/0 via-[#6ab149]/3 to-[#6ab149]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#6ab149]">Background Image</label>
                  </div>
                  <div className="p-3 bg-gray-50/60 rounded-xl space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-[#6ab149] bg-gradient-to-r from-[#6ab149]/10 to-[#6ab149]/5 px-2 py-1 rounded-lg shadow-sm">Image</span>
                      <input
                        type="text"
                        value={settings.heroes[activeHeroTab]?.bgImage || ''}
                        onChange={(e) => handleHeroChange('bgImage', e.target.value)}
                        className="flex-1 p-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#6ab149]/20 outline-none text-on-surface"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    {settings.heroes[activeHeroTab]?.bgImage && (
                      <div className="h-32 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100 p-2">
                        <img src={settings.heroes[activeHeroTab].bgImage} alt="Background Preview" className="max-h-full max-w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </section>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-10 right-10 flex items-center gap-4 z-50 animate-in slide-in-from-bottom duration-500">
        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="flex items-center gap-3 bg-gradient-to-r from-[#6ab149] to-[#5a9e3f] text-white px-8 py-4 rounded-2xl font-black text-sm shadow-2xl shadow-[#6ab149]/30 hover:shadow-[#6ab149]/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 group animate-glow-pulse"
        >
          {isSaving ? (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <>
              <Save size={18} className="group-hover:rotate-12 transition-transform" /> Save Configuration
            </>
          )}
        </button>
      </div>
    </div>
  );
}
