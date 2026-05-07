import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7 }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, x: -100 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.9 }
  }
};

export default function About() {
  const [ceoProfile, setCeoProfile] = useState({
    name: "Ir. Yudi A. Idrus",
    title: "Direktur Utama",
  });

  const [aboutContent, setAboutContent] = useState({
    paragraph1: 'Wahana Data Utama didirikan pada 2006 merupakan perusahaan riset dan survei yang berfokus pada bidang sosial-politik, ekonomi, pemasaran, pertanian, dan lainnya.',
    paragraph2: 'Dengan visi menjadi penyedia data riset global, WDU didukung oleh tim profesional berpengalaman lebih dari 10 tahun. Berkantor di Bogor, kami telah memperoleh kepercayaan dari berbagai instansi pemerintah dan swasta untuk menangani berbagai proyek konsultasi, mulai dari riset hingga event organizing.',
    image: 'https://wahanadata.co.id/wp-content/uploads/2025/02/Pak-Yudi-homepage-2.png',
  });

  useEffect(() => {
    const loadSettings = () => {
      // 1. Prioritas Utama: Editor Baru
      const storedSections = localStorage.getItem('wdu_admin_sections');
      if (storedSections) {
        try {
          const sectionsData = JSON.parse(storedSections);
          const homeSections = sectionsData['Beranda'] || [];
          const aboutSection = homeSections.find((s: any) => s.type === 'About');
          
          if (aboutSection?.content && aboutSection.status === 'Published') {
            const { paragraph1, paragraph2, image, ceoName, ceoTitle } = aboutSection.content;
            setAboutContent(prev => ({
              paragraph1: paragraph1 || prev.paragraph1,
              paragraph2: paragraph2 || prev.paragraph2,
              image: image || prev.image
            }));
            if (ceoName || ceoTitle) {
              setCeoProfile(prev => ({
                name: ceoName || prev.name,
                title: ceoTitle || prev.title
              }));
            }
            return;
          }
        } catch (e) {}
      }

      // 2. Legacy Fallback
      const stored = localStorage.getItem('wdu_admin_settings');
      if (stored) {
        try {
          const settings = JSON.parse(stored);
          if (settings.ceoProfile) {
            setCeoProfile(settings.ceoProfile);
          }
          if (settings.homeData?.about) {
            const saved = settings.homeData.about;
            setAboutContent((prev) => ({
              paragraph1: saved.content || prev.paragraph1,
              paragraph2: prev.paragraph2,
              image: saved.image || prev.image,
            }));
          }
        } catch (e) {
          console.error("Failed to parse settings", e);
        }
      }
    };

    loadSettings();
    window.addEventListener('storage', loadSettings);
    return () => window.removeEventListener('storage', loadSettings);
  }, []);

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image Side */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="order-2 lg:order-1 relative group"
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[80px] blur-xl opacity-50 group-hover:opacity-80 group-hover:blur-2xl transition-all duration-300" />
          <div className="absolute -inset-1 rounded-[70px] border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-300" />

          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="aspect-square rounded-[60px] overflow-hidden shadow-2xl relative z-10"
            >
              <img
                src={aboutContent.image}
                alt="Team collaboration"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-115"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent group-hover:from-slate-900/40 group-hover:to-transparent transition-all duration-300" />

              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-transparent group-hover:bg-gradient-to-tr group-hover:from-transparent group-hover:via-white/20 group-hover:to-transparent transition-all duration-500 opacity-0 group-hover:opacity-100" />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl z-20"
            >

            </motion.div>
          </div>

          {/* Decorative element */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 rounded-[40px] -z-0 blur-3xl"
          />
        </motion.div>

        {/* Content Side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="order-1 lg:order-2 space-y-8"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
            <span className="w-12 h-px bg-primary" />
            <span className="text-sm font-black text-primary uppercase tracking-[0.3em]"></span>
          </motion.div>

          <motion.h3 variants={itemVariants} className="text-4xl md:text-5xl font-display font-black text-slate-900 leading-tight">
            Memiliki pengalaman yang luas serta didukung oleh tim{' '}
            <span className="gradient-text relative">
              profesional yang kompeten
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </motion.h3>

          <motion.div variants={itemVariants} className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
            <p>
              {aboutContent.paragraph1}
            </p>
            <p>
              {aboutContent.paragraph2}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              <motion.span
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="material-symbols-outlined text-primary bg-primary/10 p-3 rounded-2xl"
              >
                verified
              </motion.span>
              <div>
                <div className="font-bold text-slate-900">{ceoProfile.name}</div>
                <div className="text-sm text-slate-500">{ceoProfile.title}</div>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              <motion.span
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="material-symbols-outlined text-primary bg-primary/10 p-3 rounded-2xl"
              >
                support_agent
              </motion.span>
              <div>
                <div className="font-bold text-slate-900">DIREKTUR UTAMA</div>
                <div className="text-sm text-slate-500"></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={itemVariants} className="flex items-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-3xl font-black text-primary">25+</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Klien</div>
            </div>
            <div className="w-px h-12 bg-slate-200" />
            <div className="text-center">
              <div className="text-3xl font-black text-primary">150+</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Proyek</div>
            </div>
            <div className="w-px h-12 bg-slate-200" />
            <div className="text-center">
              <div className="text-3xl font-black text-primary">18+</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Tahun</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
