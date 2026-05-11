import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function AboutPage() {
  const misiItems = [
    {
      title: "Riset & Survei",
      text: "Melakukan riset, survei dan kajian yang kredibel sesuai kaidah ilmiah untuk menghasilkan data yang akurat, presisi, dan andal.",
      icon: "biotech",
      gradient: "from-primary to-primary/70"
    },
    {
      title: "Event Organizer",
      text: "Mengorganisir sebuah kegiatan dengan akurat, presisi dan andal untuk kepentingan publik.",
      icon: "event_available",
      gradient: "from-secondary to-secondary/70"
    },
    {
      title: "Inovasi & Kreativitas",
      text: "Menjadi perusahaan kreatif yang penuh inovasi, solusi dan gagasan untuk masa depan.",
      icon: "psychology",
      gradient: "from-amber-500 to-amber-600"
    }
  ];

  const heroRef = useRef(null);
  const [ceoProfile, setCeoProfile] = useState({
    name: "Ir. Yudi A. Idrus",
    title: "direktur utama",
    photoUrl: "https://wahanadata.co.id/wp-content/uploads/2025/02/Pak-Yudi-homepage-2.png",
    isActive: true
  });
  const [heroData, setHeroData] = useState({
    badgeText: 'Tentang Kami',
    headline: ['Mengubah Data Menjadi', 'Kekuatan Untuk', 'Keputusan Cerdas'],
    description: 'Wahana Data Utama adalah mitra terpercaya dalam bidang riset dan analisis data yang membantu organisasi pemerintah dan swasta di Indonesia.',
    stats: [
      { value: '15+', label: 'Tahun Pengalaman' },
      { value: '500+', label: 'Proyek Selesai' },
      { value: '50+', label: 'Tim Ahli' },
    ],
    bgImage: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/1384bbe7-3362-446d-b989-77114335e7ea-1-scaled-r09xvdqugccp0qj415ithlfa8gvrifzftmrqwj4fts.jpg',
    ctaText: 'Pelajari Lebih Lanjut',
    ctaLink: '#experience'
  });

  const [visiMisi, setVisiMisi] = useState({
    visi: "Menjadi perusahaan penyedia data riset & survei global terdepan.",
    misi: misiItems
  });

  const [historyData, setHistoryData] = useState({
    title: 'Garda Terdepan Profesional Berpengalaman',
    paragraph1: 'Wahana Data Utama adalah perusahaan penyedia data riset dan survei global terdepan. Kami membantu organisasi pemerintah dan swasta dalam mengubah data mentah menjadi wawasan yang berharga.',
    paragraph2: 'Didukung oleh tim profesional yang berpengalaman di berbagai bidang seperti Ekonomi, Sosial, dan Politik, kami berkomitmen memberikan hasil yang akurat, presisi, dan andal bagi klien kami.',
    image: 'https://sis.wahanadata.co.id/img/wdu-building.jpg'
  });

  const [directors, setDirectors] = useState<any[]>([
    { name: 'Ir. Yudi A. Idrus', role: 'Direktur Utama', img: 'https://wahanadata.co.id/wp-content/uploads/2025/02/Pak-Yudi-homepage-2.png' },
    { name: 'Dr. Ir. Erviani M.Si', role: 'Komisaris Utama', img: 'https://wahanadata.co.id/wp-content/uploads/2025/02/direksi_bu-erfi_scaled-1024x841.png' },
    { name: 'M. Fadhlan Fadilah, S.E', role: 'Direktur', img: 'https://wahanadata.co.id/wp-content/uploads/2025/02/direksi_pak-adlan_fixed.png' },
    { name: 'M. Hafiz Abdillah, S.T', role: 'Direktur', img: 'https://wahanadata.co.id/wp-content/uploads/2025/02/direksi_bu-hafiz_fixed.png' },
    { name: 'Nurul Athia R, S.Bns', role: 'Direktur', img: 'https://wahanadata.co.id/wp-content/uploads/2025/02/direksi_mba-nia_fixed.png' }
  ]);

  useEffect(() => {
    const loadAll = () => {
      // 1. Editor Baru (wdu_admin_sections)
      const storedSections = localStorage.getItem('wdu_admin_sections');
      if (storedSections) {
        try {
          const sections = JSON.parse(storedSections);
          const aboutSections = sections['Tentang Kami'] || [];

          // Hero Sync
          const heroSec = aboutSections.find((s: any) => s.type === 'Hero');
          if (heroSec?.content && heroSec.status === 'Published') {
            const { badge, headline, description, bgImage, ctaText, ctaLink, stats } = heroSec.content;
            setHeroData(prev => ({
              ...prev,
              badgeText: badge || prev.badgeText,
              headline: headline ? headline.split('\n') : prev.headline,
              description: description || prev.description,
              bgImage: bgImage || prev.bgImage,
              ctaText: ctaText || prev.ctaText,
              ctaLink: ctaLink || prev.ctaLink,
              stats: (stats || []).length > 0 ? stats : prev.stats
            }));
          }

          // Visi Misi Sync
          const visiSec = aboutSections.find((s: any) => s.type === 'VisiMisi');
          if (visiSec?.content && visiSec.status === 'Published') {
            setVisiMisi({
              visi: visiSec.content.visi || visiMisi.visi,
              misi: (visiSec.content.misi || []).length > 0 ? visiSec.content.misi.map((m: any, i: number) => ({ ...misiItems[i], ...m })) : misiItems
            });
          }

          // History Sync
          const historySec = aboutSections.find((s: any) => s.type === 'History');
          if (historySec?.content && historySec.status === 'Published') {
            setHistoryData(prev => ({ ...prev, ...historySec.content }));
          }

          // Directors Sync
          const directorsSec = aboutSections.find((s: any) => s.type === 'Directors');
          if (directorsSec?.content && directorsSec.status === 'Published') {
            setDirectors(directorsSec.content.members || []);
          }
        } catch (e) { }
      }

      // 2. Legacy Fallback
      const stored = localStorage.getItem('wdu_admin_settings');
      if (stored) {
        try {
          const settings = JSON.parse(stored);
          if (settings.ceoProfile) setCeoProfile(settings.ceoProfile);
        } catch (e) { }
      }
    };

    loadAll();
    window.addEventListener('storage', loadAll);
    return () => window.removeEventListener('storage', loadAll);
  }, []);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
  };

  const revealLeft = {
    hidden: { x: "-100%" },
    visible: {
      x: "100%",
      transition: { duration: 1.5, ease: [0.77, 0, 0.175, 1] as any }
    }
  };

  const imageScale = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6 }
    }
  };



  const floatingParticles = Array.from({ length: 12 });

  return (
    <div className="bg-white overflow-hidden">
      {/* Cinematic Hero */}
      <section ref={heroRef} className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <img
            alt="WDU Office"
            className="w-full h-full object-cover scale-110 opacity-60"
            src={heroData.bgImage || "https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/1384bbe7-3362-446d-b989-77114335e7ea-1-scaled-r09xvdqugccp0qj415ithlfa8gvrifzftmrqwj4fts.jpg"}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-white"></div>
        </motion.div>

        {/* Dynamic Background Elements */}
        {floatingParticles.map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%",
              opacity: 0
            }}
            animate={{
              y: ["-20%", "20%"],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-24 h-24 bg-primary/5 rounded-full blur-3xl"
          />
        ))}

        <div className="relative z-10 text-center space-y-10 max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-6 py-2 bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full mb-4"
          >
            <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">{heroData.badgeText}</span>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4">
            {heroData.headline.map((line, i) => (
              <motion.h1
                key={i}
                variants={fadeInUp}
                className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase italic"
              >
                {line}
              </motion.h1>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xl md:text-2xl text-slate-500 font-light max-w-3xl mx-auto leading-relaxed"
          >
            {heroData.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap justify-center gap-6 pt-8"
          >
            <a href={heroData.ctaLink} className="group relative px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/20 active:scale-95">
              <span className="relative z-10 flex items-center gap-3">
                {heroData.ctaText}
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-slate-100 py-16">
            {heroData.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-2"
              >
                <h3 className="text-6xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                <p className="text-primary font-bold uppercase tracking-widest text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visi Misi Section - Split Layout */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">

            <div className="lg:col-span-5 space-y-12">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
                <motion.span variants={fadeInUp} className="text-primary font-black uppercase tracking-[0.4em] text-xs">Arah & Tujuan</motion.span>
                <motion.h2 variants={fadeInUp} className="text-6xl font-black text-slate-900 tracking-tighter leading-none">
                  VISI <br /> <span className="text-primary italic">KAMI.</span>
                </motion.h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-12 rounded-[50px] shadow-2xl border-l-[12px] border-primary"
              >
                <p className="text-3xl font-bold text-slate-800 leading-tight italic">
                  "{visiMisi.visi}"
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-8">
                <div className="flex flex-col gap-4 mb-8">
                  <h3 className="text-4xl font-black text-slate-900 uppercase italic">Misi Strategis</h3>
                  <div className="h-1.5 w-24 bg-primary"></div>
                </div>

                {visiMisi.misi.map((misi, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex gap-8 p-10 bg-white rounded-[40px] border border-slate-100 hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-3xl">{misi.icon}</span>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-black text-slate-900">{misi.title}</h4>
                      <p className="text-slate-500 font-light leading-relaxed">{misi.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History / Values Section */}
      <section
        className="py-32 bg-white relative overflow-hidden"
        id="about-section"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Kolon Kiri: Konten Teks */}
            <div className="lg:col-span-7">
              {/* Section Header */}
              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8">
                <div className="w-12 h-1 bg-[#4CAF50]"></div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-black uppercase tracking-tight">
                  {historyData.title}
                </h1>
              </motion.div>

              {/* Section Content dengan Border */}
              <motion.div
                variants={fadeInUp}
                className="relative p-8 lg:p-12 border-2 border-[#E8F5E9] rounded-[2rem] bg-white shadow-sm"
              >
                <div className="space-y-6 text-lg lg:text-xl text-gray-700 leading-relaxed font-medium">
                  <p>{historyData.paragraph1}</p>
                  <p>{historyData.paragraph2}</p>
                </div>

                {/* Decorative Element */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#4CAF50]/10 rounded-full blur-2xl"></div>
              </motion.div>
            </div>

            {/* Kolon Kanan: Image / Visual */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-[#4CAF50]/10 rounded-[3rem] rotate-6 scale-105"></div>
                <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                  <motion.div variants={revealLeft} className="absolute inset-0 bg-[#4CAF50] z-20"></motion.div>
                  <motion.img
                    variants={imageScale}
                    src={historyData.image}
                    alt="WDU Professionalism"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-24"
          >
            <h3 className="text-5xl font-display font-black text-slate-900 mb-6">
              jajaran <span className="text-primary italic">Direksi</span>
            </h3>
            <div className="h-1 w-20 bg-primary mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {directors.map((leader, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-[60px] aspect-[10/13] bg-slate-100 shadow-2xl transition-all duration-700">
                  <motion.img
                    src={leader.img}
                    alt={leader.name}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-10 left-10 right-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                    >
                      <h4 className="text-3xl font-black text-white mb-2">{leader.name}</h4>
                      <p className="text-primary font-bold text-sm uppercase tracking-widest">{leader.role}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
