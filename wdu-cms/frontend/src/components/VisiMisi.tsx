import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function VisiMisi() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="relative py-32 overflow-hidden bg-slate-50"
      id="visi-misi-section"
    >
      {/* Animated Background Glowing Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30rem] h-[30rem] bg-emerald-300/20 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[40rem] h-[40rem] bg-teal-200/30 rounded-full mix-blend-multiply filter blur-[150px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 px-6 mx-auto max-w-7xl">
        {/* VISI SECTION */}
        <div className="mb-32">
          <motion.div variants={fadeInUp} className="flex flex-col items-center mb-12">
            <span className="px-4 py-1 mb-6 text-sm font-bold tracking-widest text-green-700 uppercase bg-green-100 rounded-full">
              Tujuan Utama
            </span>
            <h2 className="text-5xl font-black tracking-tight text-slate-900 lg:text-6xl text-center">
              Visi <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Kami</span>
            </h2>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
            className="relative max-w-5xl mx-auto overflow-hidden bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[3rem] p-12 lg:p-20 text-center group"
          >
            <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 group-hover:opacity-100"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center justify-center w-24 h-24 mb-8 transition-transform duration-500 shadow-xl bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl shadow-green-500/20 group-hover:rotate-12">
                <span className="text-5xl text-white material-symbols-outlined font-extralight">language</span>
              </div>
              <h3 className="text-3xl font-medium leading-relaxed tracking-wide text-slate-800 lg:text-4xl">
                "Menjadi perusahaan penyedia data <br className="hidden lg:block" />
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">riset & survei global</span> terdepan."
              </h3>
            </div>
          </motion.div>
        </div>

        {/* MISI SECTION */}
        <div>
          <motion.div variants={fadeInUp} className="flex flex-col items-center mb-16">
            <h2 className="text-4xl font-black tracking-tight text-slate-900 lg:text-5xl">
              Misi <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Kami</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                text: "Melakukan riset, survei dan kajian yang kredibel sesuai kaidah ilmiah untuk menghasilkan data yang akurat, presisi, dan andal (reliable data).",
                icon: "biotech",
                num: "01"
              },
              {
                text: "Mengorganisir sebuah kegiatan dengan akurat, presisi dan andal untuk kepentingan publik secara profesional.",
                icon: "event_available",
                num: "02"
              },
              {
                text: "Menjadi perusahaan kreatif yang penuh inovasi, solusi dan gagasan cemerlang untuk menyongsong masa depan.",
                icon: "psychology",
                num: "03"
              }
            ].map((misi, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className="relative p-10 overflow-hidden text-left transition-all duration-300 bg-white/50 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] rounded-[2.5rem] group"
              >
                {/* Watermark Number */}
                <div className="absolute font-black transition-transform duration-500 select-none top-4 right-6 text-8xl text-slate-900/[0.03] group-hover:scale-110 group-hover:-translate-y-2 group-hover:text-green-900/[0.05]">
                  {misi.num}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-center w-16 h-16 mb-8 transition-colors duration-300 bg-white shadow-sm rounded-2xl text-slate-700 group-hover:bg-green-500 group-hover:text-white">
                    <span className="text-3xl material-symbols-outlined font-light">{misi.icon}</span>
                  </div>

                  <p className="flex-grow text-lg leading-relaxed text-slate-600">
                    {misi.text}
                  </p>

                  {/* Decorative Bottom Line */}
                  <div className="w-0 h-1 mt-8 transition-all duration-300 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full group-hover:w-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
