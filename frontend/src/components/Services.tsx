import { motion } from 'framer-motion';
import { BarChart, Database, Headphones, FileBarChart, Calendar, PieChart } from 'lucide-react';
import { useState, useEffect } from 'react';
import ServiceCarousel from './ServiceCarousel';
import api from '../services/api';

const services = [
  {
    title: "Riset Pasar",
    desc: "Jelajahi peluang baru dan pahami tren pasar yang akan membantu bisnis anda tetap di depan.",
    icon: BarChart,
    color: "bg-primary/10 text-primary",
    gradient: "from-primary/20 via-primary/5 to-white",
    pattern: "market",
    path: "/riset-pasar"
  },
  {
    title: "Analisis Data",
    desc: "Ambil langkah cerdas dengan analisis data akurat yang memberikan panduan untuk keputusan strategis yang lebih baik.",
    icon: Database,
    color: "bg-secondary/10 text-secondary",
    gradient: "from-secondary/20 via-secondary/5 to-white",
    pattern: "data",
    path: "/analisis-data"
  },
  {
    title: "Konsultasi IT",
    desc: "Bergabunglah dengan kami untuk mendapatkan solusi IT inovatif yang akan mendorong transformasi digital dan kesuksesan bisnis anda.",
    icon: Headphones,
    color: "bg-amber-100 text-amber-600",
    gradient: "from-amber-100/50 via-amber-50/30 to-white",
    pattern: "tech",
    path: "/konsultasi-it"
  },
  {
    title: "Riset Data",
    desc: "Kami memberikan riset data yang mendalam, membuka pintu bagi informasi yang mengarah pada keputusan yang lebih cerdas dan berkembang.",
    icon: FileBarChart,
    color: "bg-purple-100 text-purple-600",
    gradient: "from-purple-100/50 via-purple-50/30 to-white",
    pattern: "research",
    path: "/riset-data"
  },
  {
    title: "Event Organizer",
    desc: "Manajemen acara profesional dengan pendekatan berbasis data untuk hasil yang maksimal.",
    icon: Calendar,
    color: "bg-rose-100 text-rose-600",
    gradient: "from-rose-100/50 via-rose-50/30 to-white",
    pattern: "event",
    path: "/event-organizer"
  },
  {
    title: "Survei",
    desc: "Pengumpulan data primer yang reliabel untuk memahami perilaku konsumen dan tren publik.",
    icon: PieChart,
    color: "bg-cyan-100 text-cyan-600",
    gradient: "from-cyan-100/50 via-cyan-50/30 to-white",
    pattern: "survey",
    path: "/survei"
  },
];

export default function Services() {
  const [draftSlugs, setDraftSlugs] = useState<string[]>([]);

  useEffect(() => {
    api.get('/pages').then((res) => {
      const drafted = res.data.filter((p: any) => !p.isPublished).map((p: any) => p.slug);
      setDraftSlugs(drafted);
    }).catch(console.error);
  }, []);

  const activeServices = services.filter(service => {
    const slug = service.path.replace('/', '');
    return !draftSlugs.includes(slug);
  });

  return (
    <section className="py-32 bg-background relative overflow-hidden" id="layanan">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2">
            <span className="w-8 h-px bg-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-[0.3em]">Layanan Kami</span>
            <span className="w-8 h-px bg-primary" />
          </div>
        </div>

        <ServiceCarousel services={activeServices} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mt-20 space-y-4"
        >
          <h3 className="text-5xl md:text-6xl font-display font-black text-slate-900 leading-tight">
            Solusi terbaik untuk <span className="gradient-text">Anda!</span>
          </h3>

          <p className="text-xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
            Wahana Data Utama berkomitmen untuk membantu bisnis dan organisasi Anda mengelola, menganalisis, dan memanfaatkan data secara optimal. Dengan tim profesional yang berpengalaman, kami bekerja sama dengan Anda untuk merancang solusi berbasis data yang relevan, akurat, dan dapat diandalkan, membantu Anda mencapai tujuan dengan lebih efisien.
          </p>
        </motion.div>
        </div>
    </section>
  );
}
