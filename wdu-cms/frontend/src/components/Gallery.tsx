import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../services/api";

interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: number;
  description: string | null;
  imageUrl: string | null;
  isHighlight: boolean;
  order: number;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const fallbackImages = [
  "https://wahanadata.co.id/wp-content/uploads/2025/01/91ff19eb-9bae-41be-bd79-86c09efa26ae.jpg",
  "https://wahanadata.co.id/wp-content/uploads/2025/01/1384bbe7-3362-446d-b989-77114335e7ea-scaled.jpg",
  "https://wahanadata.co.id/wp-content/uploads/2025/01/433319d2-e1de-4c4f-9a80-b83df6470507-scaled.jpg",
  "https://wahanadata.co.id/wp-content/uploads/2025/01/feac7c05-7818-4564-951d-893e14f37bfe-scaled.jpg",
  "https://wahanadata.co.id/wp-content/uploads/2025/01/34695135-c70d-4d76-92d5-10c39eb5390f.jpg",
  "https://wahanadata.co.id/wp-content/uploads/2025/01/a3f30e87-3b43-418b-b4ba-4529ed4e895a.jpg",
];

const fallbackProjects = fallbackImages.map((url, idx) => ({
  id: `fallback-${idx}`,
  title: `Project ${idx + 1}`,
  client: 'WDU Client',
  category: 'IT',
  year: 2025,
  description: 'Default portfolio project',
  imageUrl: url,
  isHighlight: true,
  order: idx,
}));

export default function Gallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);

  const [sectionTitle, setSectionTitle] = useState({
    line1: 'Potret kegiatan dan',
    line2: 'kolaborasi'
  });

  useEffect(() => {
    const loadAll = async () => {
      // 1. Editor Baru (wdu_admin_sections)
      const storedSections = localStorage.getItem('wdu_admin_sections');
      if (storedSections) {
        try {
          const sections = JSON.parse(storedSections);
          const homeSections = sections['Beranda'] || [];
          const gallerySection = homeSections.find((s: any) => s.type === 'Gallery');
          
          if (gallerySection?.content && gallerySection.status === 'Published') {
            const { title, items } = gallerySection.content;
            if (title) {
              const parts = title.split(' ');
              setSectionTitle({
                line1: parts.slice(0, -2).join(' '),
                line2: parts.slice(-2).join(' ')
              });
            }
            if (items && items.length > 0) {
              setProjects(items.map((it: any, idx: number) => ({
                id: `admin-${idx}`,
                title: it.title,
                imageUrl: it.imageUrl,
                client: 'WDU',
                category: 'Project',
                year: 2025,
                description: '',
                isHighlight: true,
                order: idx
              })));
              setLoading(false);
              return;
            }
          }
        } catch (e) {}
      }

      // 2. Legacy / API Fallback
      try {
        const { data } = await api.get('/projects?highlight=true');
        const apiProjects = data.filter((p: Project) => p.imageUrl).sort((a: Project, b: Project) => a.order - b.order);
        if (apiProjects.length > 0) {
          setProjects(apiProjects);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (e) {
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
    window.addEventListener('storage', loadAll);
    return () => window.removeEventListener('storage', loadAll);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const newPos = Math.max(0, scrollPos - 380);
      scrollRef.current.scrollTo({ left: newPos, behavior: "smooth" });
      setScrollPos(newPos);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const newPos = Math.min(maxScroll, scrollPos + 380);
      scrollRef.current.scrollTo({ left: newPos, behavior: "smooth" });
      setScrollPos(newPos);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollPos(scrollRef.current.scrollLeft);
      }
    };
    scrollRef.current?.addEventListener("scroll", handleScroll);
    return () => scrollRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden" id="portfolio">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2">
            <span className="w-8 h-px bg-primary" />
            <span className="text-sm font-black text-primary uppercase tracking-[0.3em]">Portfolio</span>
          </div>

          <h3 className="text-4xl md:text-5xl font-display font-black text-slate-900 leading-tight">
            {sectionTitle.line1}{' '}
            <span className="gradient-text">{sectionTitle.line2}</span> kami
          </h3>
        </motion.div>

        <div className="relative">
          <button
            type="button"
            onClick={scrollLeft}
            className="absolute left-0 top-0 bottom-0 m-auto w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-20"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-16"
          >
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-shrink-0 w-[350px] h-[250px] bg-surface-container animate-pulse rounded-2xl" />
              ))
            ) : projects.length === 0 ? (
              <div className="flex-shrink-0 w-[350px] h-[250px] flex items-center justify-center text-on-surface-variant">
                <p className="text-sm">Belum ada portofolio</p>
              </div>
            ) : (
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={cardVariants}
                  className="flex-shrink-0 w-[350px] h-[250px] relative overflow-hidden rounded-2xl cursor-pointer group"
                  onClick={() => setSelectedIndex(index)}
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    src={project.imageUrl!}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))
            )}
          </div>

          <button
            type="button"
            onClick={scrollRight}
            className="absolute right-0 top-0 bottom-0 m-auto w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-20"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((selectedIndex! - 1 + projects.length) % projects.length);
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                src={projects[selectedIndex]?.imageUrl || ''}
                alt={projects[selectedIndex]?.title || ''}
                className="w-full h-[70vh] object-contain rounded-2xl"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((selectedIndex! + 1) % projects.length);
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
