import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import fotoPengalaman from '../img/foto.png';

export default function ExperiencePage() {
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);
  const heroRef = useRef(null);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [heroData, setHeroData] = useState({
    badgeText: 'Pengalaman',
    headline: ['Portofolio', 'Proyek &', 'K成就感'],
    description: 'Kami telah berhasil menyelesaikan berbagai proyek strategis untuk berbagai instansi pemerintah dan perusahaan swasta.',
    stats: [
      { value: '100+', label: 'Klien PNS' },
      { value: '50+', label: 'Klien Swasta' },
      { value: '10+', label: 'Institusi NLRB' },
    ],
    bgImage: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/bkpm-scaled-r0gn5zclhzniq0rcdzfe7k85fdqhwh6ngb7cl7exi8.jpg',
    ctaText: 'Lihat Semua Proyek',
    ctaLink: '#projects'
  });

  useEffect(() => {
    const stored = localStorage.getItem('wdu_admin_settings');
    if (stored) {
      try {
        const settings = JSON.parse(stored);
        if (settings.generalSetting?.timeline) {
          setExperiences(settings.generalSetting.timeline);
        }
        if (settings.heroes?.experience) {
          setHeroData({ ...heroData, ...settings.heroes.experience });
        }
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const activeClients2024 = experiences.find(e => e.year === "2024")?.logos?.filter((l: any) => l.isActive) || [
    { name: "BPK", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/bpk-150x150.png" },
    { name: "BPOM", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/bpom-1-300x205.png" },
    { name: "BKPM", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/bkpm-1-300x205.png" },
    { name: "Kominfo", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/Kominfo-e1737704377593-251x300.png" },
    { name: "Paljaya", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/paljaya-300x300.png" },
  ];

  const clientBackgrounds: Record<string, string> = {
    "BPK": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920",
    "BPOM": "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=1920",
    "BKPM": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920",
    "Kominfo": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920",
    "Paljaya": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920",
  };

  const defaultHeroImage = "https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/bkpm-scaled-r0gn5zclhzniq0rcdzfe7k85fdqhwh6ngb7cl7exi8.jpg";

  // Default experiences data (fallback)
  const defaultExperiences = [
    {
      year: "2023",
      logos: [
        { name: "BPK", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/bpk-square-300x300.png", isActive: true },
        { name: "STM Yogya", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/stm-yogya-square-300x300.png", isActive: true },
        { name: "Transpakuan", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/transpakuan-square-resized-300x300.png", isActive: true },
        { name: "Paljaya", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/paljaya-300x300.png", isActive: true },
        { name: "Kominfo", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/Kominfo-e1737704377593-251x300.png", isActive: true },
      ]
    },
    {
      year: "2022",
      logos: [
        { name: "BUMN", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/bumn-square-300x300.png", isActive: true },
        { name: "Jakarta", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/jakarta-square-300x300.png", isActive: true },
        { name: "KPK", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/kpk-square-300x300.png", isActive: true },
        { name: "BPK", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/bpk-square-300x300.png", isActive: true },
        { name: "Perpusnas", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/perpusnas-square-300x300.png", isActive: true },
        { name: "Blora", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/blora-square-300x300.png", isActive: true },
        { name: "Injiniring", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/injiniring-square-300x300.png", isActive: true },
        { name: "Pakuan Jaya", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/pakuan-jaya-square-300x300.png", isActive: true },
        { name: "Kominfo", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/kominfo-old-square-300x300.png", isActive: true },
        { name: "BKPM", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/bkpm-square-300x300.png", isActive: true },
      ]
    },
    {
      year: "2021",
      logos: [
        { name: "BPOM", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/bpom-1-300x205.png", isActive: true },
        { name: "Kominfo", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/Kominfo-e1737704377593-251x300.png", isActive: true },
        { name: "BPK", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/bpk-square-300x300.png", isActive: true },
        { name: "KPK", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/kpk-square-300x300.png", isActive: true },
        { name: "Kemendes", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/kemendes-square-300x300.png", isActive: true },
        { name: "Pakuan Jaya", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/pakuan-jaya-square-300x300.png", isActive: true },
        { name: "BKPM", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/bkpm-square-300x300.png", isActive: true },
      ]
    },
    {
      year: "2020",
      logos: [
        { name: "BPK", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/bpk-150x150.png", isActive: true },
        { name: "Kemendes", img: "https://wahanadata.co.id/wp-content/uploads/2025/01/kemendes-square-300x300.png", isActive: true },
      ]
    },
  ];

  // Load timeline data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('wdu_admin_settings');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.generalSetting?.timeline && parsed.generalSetting.timeline.length > 0) {
          setExperiences(parsed.generalSetting.timeline);
          return;
        }
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    // Fallback to default data
    setExperiences(defaultExperiences);
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={hoveredClient || "default"}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{ y: heroY }}
              alt="Experience Hero"
              className="w-full h-full object-cover"
              src={hoveredClient && clientBackgrounds[hoveredClient] ? clientBackgrounds[hoveredClient] : defaultHeroImage}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px]"></div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Kiri: Teks & Deskripsi */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-8"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    alt="Line"
                    className="w-16"
                    src="https://wahanadata.co.id/wp-content/uploads/2025/01/line-300x45.png"
                  />
                  <span className="text-primary font-bold text-sm uppercase tracking-widest"></span>
                </div>
                <h2 className="text-5xl font-black text-slate-900 leading-tight">
                  <span className="gradient-text italic">{heroData.badgeText}</span>
                </h2>
              </div>
              <p className="text-xl text-slate-600 leading-relaxed font-light text-justify">
                {heroData.description}
              </p>
            </motion.div>

            {/* Kanan: Gambar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative overflow-hidden rounded-[32px] shadow-2xl aspect-[4/3] group z-10">
                <img 
                  src={fotoPengalaman} 
                  alt="Pengalaman Kami" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Optional Decorative Component (bg accent) */}
              <div className="absolute -z-0 -bottom-6 -right-6 w-full h-full bg-green-50 rounded-[32px] transform rotate-3"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Clients 2024 Grid */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em] mb-4">Leading Partners</h3>
            <div className="text-4xl font-black text-slate-900">2024</div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            {activeClients2024.map((client: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredClient(client.name)}
                onMouseLeave={() => setHoveredClient(null)}
                className="group relative"
              >
                <div className="bg-white p-8 rounded-[40px] shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border border-slate-100 flex items-center justify-center aspect-square">
                  <img
                    alt={client.name}
                    src={client.img}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                {hoveredClient === client.name && (
                  <motion.div
                    layoutId="tech-glow"
                    className="absolute inset-0 -z-10 bg-primary/20 blur-3xl rounded-full"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section - Vertikal with Progress Line */}
      <section className="py-32 bg-white relative">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight">
              Perjalanan <span className="text-primary italic">Kami.</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Main Vertical Line (Static Background) */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 -translate-x-1/2 hidden md:block"></div>

            {/* Mobile Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-slate-100 md:hidden"></div>

            {/* Timeline items */}
            <div className="space-y-40">
              {experiences.filter((e: any) => e.year !== "2024").map((exp: any, index: number) => (
                <div key={index} className="relative flex flex-col md:flex-row items-center gap-12 group">
                  {/* Node/titik with Glow Effect */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-[0_0_20px_rgba(106,177,73,0.5)] -translate-x-1/2 z-10"
                  ></motion.div>

                  {/* Left Side (Even/Odd) */}
                  <div className={`flex-1 w-full md:text-right ${index % 2 === 0 ? 'md:order-1' : 'md:order-3'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                      className="pl-20 md:pl-0"
                    >
                      <span className="text-6xl md:text-8xl font-black text-slate-100 group-hover:text-primary/10 transition-colors duration-500 select-none">
                        {exp.year}
                      </span>
                    </motion.div>
                  </div>

                  {/* Spacer for the line */}
                  <div className="hidden md:block w-20 md:order-2"></div>

                  {/* Right Side (Content Card) */}
                  <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:order-3' : 'md:order-1'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                      className="pl-20 md:pl-0"
                    >
                      <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 group-hover:shadow-2xl group-hover:shadow-primary/5 transition-all duration-500">
                        <div className="flex flex-wrap gap-4">
                          {exp.logos.filter((logo: any) => logo.isActive !== false).map((logo: any, logoIndex: number) => (
                            <motion.div
                              key={logoIndex}
                              whileHover={{ scale: 1.1, y: -5 }}
                              className="w-20 h-20 flex items-center justify-center bg-slate-50 rounded-2xl p-3 hover:bg-green-50 transition-colors cursor-pointer"
                            >
                              <img
                                src={logo.img}
                                alt={logo.name}
                                title={logo.name}
                                className="max-w-full max-h-full object-contain"
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Monolith Section - Professional Integration */}
      <section className="relative w-full bg-white overflow-hidden flex flex-col md:flex-row items-stretch border-y border-slate-100">
        {/* Left: Text Content Block */}
        <div className="w-full md:w-[40%] flex flex-col justify-center px-10 lg:px-20 py-24 bg-white relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md"
          >
            <div className="w-12 h-1 bg-primary mb-12"></div>
            <p className="text-base text-slate-600 leading-relaxed font-normal text-justify mb-12">
              Dengan komitmen yang kuat terhadap inovasi dan keakuratan data, Wahana Data Utama siap menjadi mitra terpercaya bagi bisnis dan organisasi dalam mengambil keputusan berbasis informasi. Di era digital yang semakin kompleks, kami terus berinovasi dengan teknologi terkini untuk menghadirkan solusi yang relevan, akurat, dan berdampak nyata. Kepercayaan klien adalah prioritas utama kami, dan dengan pengalaman bertahun-tahun serta tim profesional yang andal, kami berkomitmen untuk membantu berbagai sektor mengoptimalkan strategi bisnis mereka. 
              <br /><br />
              Bersama Wahana Data Utama, Anda tidak hanya mendapatkan data, tetapi juga wawasan strategis yang mendorong pertumbuhan dan kesuksesan jangka panjang. Mari melangkah ke masa depan dengan strategi yang lebih cerdas, efisien, dan berdaya saing tinggi!
            </p>
            <div className="flex flex-col items-start gap-3">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary/60">Wahana Data Utama</span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Strategic Excellence</h3>
            </div>
          </motion.div>
        </div>

        {/* Right: Integrated Image Block (Wide & Aligned) */}
        <div className="w-full md:w-[60%] relative min-h-[500px] md:min-h-0 overflow-hidden group">
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              alt="Professional Excellence"
              className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000"
              src="https://wahanadata.co.id/wp-content/uploads/2025/01/34695135-c70d-4d76-92d5-10c39eb5390f.jpg"
            />
          </motion.div>

          {/* Seamless Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/5 to-transparent hidden md:block"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent md:hidden"></div>
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"></div>

          {/* Aesthetic Logo Tag */}
          <div className="absolute bottom-12 right-12 flex items-center gap-6 rotate-90 origin-right opacity-40 group-hover:opacity-100 transition-opacity">
            <div className="h-[1px] w-24 bg-slate-900"></div>
            <span className="text-[10px] font-bold text-slate-900 tracking-[0.6em] uppercase">Editorial Excellence</span>
          </div>
        </div>
      </section>
    </div>
  );
}