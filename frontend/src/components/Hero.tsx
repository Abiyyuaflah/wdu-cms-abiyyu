import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const defaultHero = {
  badgeText: 'Wahana Data Utama - Since 2006',
  headline: ['Data Terpadu,', 'Solusi Cerdas', 'Hasil Maksimal'],
  description: 'Percayakan kebutuhan riset, analisis data, dan teknologi kepada Wahana Data Utama. Kami mengubah data menjadi wawasan berharga dan solusi praktis yang membantu Anda meraih keunggulan kompetitif di bisnis anda.',
  stats: [
    { value: '25+', label: 'Enterprise Clients' },
    { value: '150+', label: 'Projects Done' },
    { value: '99%', label: 'Uptime Security' },
  ],
  carouselImages: [
    "https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/wdu-header-2-scaled-qzz41v3uq1iw5ezxx3694wk5veazbnw3q62nnmrcww.jpg",
    "https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/bkpm-scaled-r0gn5zclhzniq0rcdzfe7k85fdqhwh6ngb7cl7exi8.jpg",
    "https://wahanadata.co.id/wp-content/uploads/2025/01/34695135-c70d-4d76-92d5-10c39eb5390f.jpg"
  ],
  ctaText: 'Mulai Kolaborasi',
  ctaLink: 'https://wa.me/62881012394686?text=Halo%20Wahana%20Data%20Utama,%20saya%20tertarik%20untuk%20berkolaborasi%20mengenai%20layanan%20riset%20dan%20data.',
};

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heroData, setHeroData] = useState(defaultHero);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('wdu_admin_settings');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.heroes?.home) {
          setHeroData({ ...defaultHero, ...parsed.heroes.home });
        }
      } catch (e) {
        console.error("Failed to parse hero settings", e);
      }
    }
  }, []);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroData.carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroData.carouselImages.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const titleWordVariants = {
    hidden: { opacity: 0, y: 50, skewY: 5 },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-slate-900">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              scale: 0
            }}
            animate={{ 
              y: -100,
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Background Carousel with Parallax */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
                <motion.img
                  src={heroData.carouselImages[currentIndex]}
              style={{ y: bgY }}
              className="w-full h-full object-cover"
              alt={`Hero Background ${currentIndex + 1}`}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Enhanced Overlays */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        
        {/* Animated Gradient Overlay */}
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute left-0 top-1/4 w-px h-64 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
      />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="absolute right-0 top-1/3 w-px h-48 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: textY, opacity }}
        className="max-w-7xl mx-auto px-6 w-full relative z-10 pt-20 md:pt-24"
      >
        <div className="max-w-4xl space-y-12">
          {/* Badge with animation */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl"
          >
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex h-2.5 w-2.5 rounded-full bg-primary"
            />
              <span className="text-sm font-semibold text-white/90 tracking-wide">
                {heroData.badgeText}
              </span>
          </motion.div>

          {/* Animated Title */}
          <div className="overflow-hidden">
              <motion.h1 
                variants={titleWordVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tighter text-white"
              >
                {heroData.headline[0]}
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 
                variants={titleWordVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tighter"
              >
                <span className="text-primary italic">{heroData.headline[1]}</span>
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 
                variants={titleWordVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tighter text-white"
              >
                {heroData.headline[2]}
              </motion.h1>
            </div>

          {/* Animated Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-light"
            >
              {heroData.description}
            </motion.p>

          {/* Stats with enhanced animations */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 pt-4">
              {heroData.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.15, duration: 0.6 }}
                className="group cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <span className="text-4xl md:text-5xl font-black text-primary">{stat.value}</span>
                  <motion.div
                    className="absolute -bottom-1 left-0 h-1 bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                  />
                </motion.div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button with enhanced animation */}
          <motion.div variants={itemVariants} className="pt-6">
            <motion.a
              href={heroData.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary/40 relative overflow-hidden group"
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              />
              <span className="relative z-10">{heroData.ctaText}</span>
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10 material-symbols-outlined"
              >
                arrow_forward
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Slide Indicators */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-12 left-6 md:left-12 flex gap-3 z-20"
      >
        {heroData.carouselImages.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 cursor-pointer rounded-full bg-white/30 transition-all duration-500 ${
              currentIndex === i ? 'w-12 bg-primary' : 'w-4 hover:w-6 hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

