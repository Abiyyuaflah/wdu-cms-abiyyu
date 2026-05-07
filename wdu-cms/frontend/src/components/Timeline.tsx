import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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
    ]
  }
];

export default function Timeline() {
  const [experiences, setExperiences] = useState<any[]>(defaultExperiences);

  useEffect(() => {
    const stored = localStorage.getItem('wdu_admin_settings');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.generalSetting?.timeline && parsed.generalSetting.timeline.length > 0) {
          setExperiences(parsed.generalSetting.timeline);
        }
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, []);

  return (
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
          {/* Main Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 -translate-x-1/2 hidden md:block"></div>
          <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-slate-100 md:hidden"></div>

          <div className="space-y-40">
            {experiences.filter((e: any) => e.year !== "2024").map((exp: any, index: number) => (
              <div key={index} className="relative flex flex-col md:flex-row items-center gap-12 group">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-[0_0_20px_rgba(106,177,73,0.5)] -translate-x-1/2 z-10"
                ></motion.div>

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

                <div className="hidden md:block w-20 md:order-2"></div>

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
  );
}
