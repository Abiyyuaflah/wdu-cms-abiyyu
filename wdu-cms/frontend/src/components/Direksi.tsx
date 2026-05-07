import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Direksi() {
  const [ceoProfile, setCeoProfile] = useState({
    name: "Ir. Yudi A. Idrus",
    title: "direktur utama",
    photoUrl: "https://wahanadata.co.id/wp-content/uploads/2025/02/Pak-Yudi-homepage-2.png",
    isActive: true
  });

  useEffect(() => {
    const stored = localStorage.getItem('wdu_admin_settings');
    if (stored) {
      try {
        const settings = JSON.parse(stored);
        if (settings.ceoProfile) {
          setCeoProfile(settings.ceoProfile);
        }
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, []);

  return (
    <section className="py-32 bg-white">
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

        {/* Barisan Pertama: 2 Orang */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto mb-20">
          {[
            ceoProfile.isActive ? {
              name: ceoProfile.name,
              role: ceoProfile.title,
              img: ceoProfile.photoUrl,
            } : null,
            { name: "Dr. Ir. Erviani M.Si", role: "Komisaris Utama", img: "https://wahanadata.co.id/wp-content/uploads/2025/02/direksi_bu-erfi_scaled-1024x841.png", pos: "left center" },
          ].filter(Boolean).map((leader, i) => (
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
                  src={leader!.img}
                  alt={leader!.name}
                  style={{ objectPosition: (leader as any).pos || 'center' }}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                  >
                    <h4 className="text-3xl font-black text-white mb-2">{leader!.name}</h4>
                    <p className="text-primary font-bold text-sm uppercase tracking-widest">{leader!.role}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Barisan Kedua: 3 Orang */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { name: "M. Fadhlan Fadilah, S.E", role: "Direktur", img: "https://wahanadata.co.id/wp-content/uploads/2025/02/direksi_pak-adlan_fixed.png", pos: "right center" },
            { name: "M. Hafiz Abdillah, S.T ", role: "Direktur", img: "https://wahanadata.co.id/wp-content/uploads/2025/02/direksi_bu-hafiz_fixed.png", pos: "right center" },
            { name: "Nurul Athia R, S.Bns", role: "Direktur", img: "https://wahanadata.co.id/wp-content/uploads/2025/02/direksi_mba-nia_fixed.png", pos: "right center" }
          ].map((leader, i) => (
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
                  style={{ objectPosition: (leader as any).pos || 'center' }}
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
  );
}
