import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Service {
  title: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  pattern: string;
  path: string;
}

interface ServiceCarouselProps {
  services: Service[];
}

export default function ServiceCarousel({ services }: ServiceCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(services.length);

  const duplicatedServices = [
    ...services,
    ...services,
    ...services,
    ...services,
    ...services,
    ...services,
    ...services,
    ...services,
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const translateX = currentIndex * (380 + 24);

  return (
    <div className="relative">
      <Link
        to="/layanan#layanan"
        className="absolute -top-6 right-0 z-20 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/30"
      >
        <span>Lihat Semua Layanan</span>
        <ArrowRight className="w-4 h-4" />
      </Link>

      <div className="flex items-center gap-4" style={{ paddingTop: '3rem' }}>
        <button
          onClick={handlePrev}
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 bg-primary text-white hover:bg-primary/90 hover:scale-110 active:scale-95 shadow-lg shadow-primary/30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex-1 overflow-hidden">
          <div className="flex justify-center">
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{ x: `-${translateX}px` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {duplicatedServices.map((service, index) => {
                    const getColorClass = () => {
                      if (service.color.includes('primary')) return 'primary';
                      if (service.color.includes('secondary')) return 'secondary';
                      if (service.color.includes('amber')) return 'amber-500';
                      if (service.color.includes('purple')) return 'purple-500';
                      if (service.color.includes('rose')) return 'rose-500';
                      if (service.color.includes('cyan')) return 'cyan-500';
                      return 'primary';
                    };
                    const colorClass = getColorClass();

                    return (
                      <motion.div
                        key={`${service.title}-${index}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        whileHover={{ y: -12, scale: 1.03 }}
                        className={`group relative flex-shrink-0 p-8 bg-gradient-to-br ${service.gradient} border-2 border-transparent hover:border-${colorClass.replace('-500', '')} rounded-[32px] hover:shadow-xl hover:shadow-${colorClass}/20 transition-all duration-300 flex flex-col w-[380px] h-[380px] overflow-hidden`}
                      >
                        <div className={`absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-300 ${service.color.includes('primary') ? 'text-primary' : service.color.includes('secondary') ? 'text-secondary' : service.color.includes('amber') ? 'text-amber-400' : service.color.includes('purple') ? 'text-purple-400' : service.color.includes('rose') ? 'text-rose-400' : 'text-cyan-400'}`}>
                          <ServicePattern type={service.pattern} />
                        </div>

                        <div className={`relative z-10 w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                          <service.icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                        </div>

                        <h4 className={`relative z-10 text-2xl font-bold text-slate-900 mb-3 group-hover:text-${colorClass.replace('-500', '')} transition-all duration-300 group-hover:translate-x-1`}>
                          {service.title}
                        </h4>

                        <p className="relative z-10 text-slate-500 leading-relaxed flex-grow group-hover:text-slate-600 transition-colors duration-300">
                          {service.desc}
                        </p>

                        <Link
                          to={service.path}
                          className={`relative z-10 mt-6 inline-flex items-center gap-2 font-bold group-hover:text-${colorClass.replace('-500', '')} group-hover:translate-x-2 transition-all duration-300`}
                        >
                          <span>Pelajari Lebih Lanjut</span>
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </motion.div>
                    );
                  })}
              </motion.div>
            </div>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 bg-primary text-white hover:bg-primary/90 hover:scale-110 active:scale-95 shadow-lg shadow-primary/30"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ServicePattern({ type }: { type: string }) {
  switch (type) {
    case 'market':
      return (
        <svg className="w-full h-full" viewBox="0 0 380 380" fill="none">
          <rect x="20" y="280" width="40" height="80" rx="4" />
          <rect x="80" y="240" width="40" height="120" rx="4" />
          <rect x="140" y="200" width="40" height="160" rx="4" />
          <rect x="200" y="160" width="40" height="200" rx="4" />
          <rect x="260" y="120" width="40" height="240" rx="4" />
          <rect x="320" y="80" width="40" height="280" rx="4" />
        </svg>
      );
    case 'data':
      return (
        <svg className="w-full h-full" viewBox="0 0 380 380" fill="none">
          <circle cx="100" cy="100" r="30" strokeWidth="8" />
          <circle cx="190" cy="190" r="50" strokeWidth="8" />
          <circle cx="280" cy="280" r="70" strokeWidth="8" />
          <path d="M130 130 L160 160" strokeWidth="8" strokeLinecap="round" />
          <path d="M220 220 L250 250" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );
    case 'tech':
      return (
        <svg className="w-full h-full" viewBox="0 0 380 380" fill="none">
          <circle cx="190" cy="190" r="60" strokeWidth="6" />
          <circle cx="190" cy="190" r="40" strokeWidth="6" />
          <path d="M190 130 L190 100" strokeWidth="6" strokeLinecap="round" />
          <path d="M190 250 L190 280" strokeWidth="6" strokeLinecap="round" />
          <path d="M130 190 L100 190" strokeWidth="6" strokeLinecap="round" />
          <path d="M250 190 L280 190" strokeWidth="6" strokeLinecap="round" />
          <path d="M143 143 L121 121" strokeWidth="6" strokeLinecap="round" />
          <path d="M237 237 L259 259" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
    case 'research':
      return (
        <svg className="w-full h-full" viewBox="0 0 380 380" fill="none">
          <circle cx="140" cy="140" r="60" strokeWidth="8" />
          <path d="M180 180 L280 280" strokeWidth="8" strokeLinecap="round" />
          <circle cx="180" cy="180" r="20" fill="currentColor" fillOpacity="0.3" />
          <circle cx="100" cy="100" r="15" strokeWidth="4" />
          <circle cx="220" cy="120" r="10" strokeWidth="4" />
          <circle cx="120" cy="240" r="12" strokeWidth="4" />
        </svg>
      );
    case 'event':
      return (
        <svg className="w-full h-full" viewBox="0 0 380 380" fill="none">
          <rect x="80" y="80" width="220" height="220" rx="20" strokeWidth="8" />
          <line x1="80" y1="140" x2="300" y2="140" strokeWidth="6" />
          <circle cx="120" cy="200" r="20" strokeWidth="4" />
          <circle cx="190" cy="200" r="20" strokeWidth="4" />
          <circle cx="260" cy="200" r="20" strokeWidth="4" />
          <circle cx="120" cy="270" r="20" strokeWidth="4" />
          <circle cx="190" cy="270" r="20" strokeWidth="4" />
        </svg>
      );
    case 'survey':
      return (
        <svg className="w-full h-full" viewBox="0 0 380 380" fill="none">
          <rect x="60" y="60" width="260" height="260" rx="20" strokeWidth="8" />
          <path d="M100 140 L160 200 L280 80" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="120" cy="280" r="20" strokeWidth="4" />
          <circle cx="190" cy="280" r="20" strokeWidth="4" />
          <circle cx="260" cy="280" r="20" strokeWidth="4" />
        </svg>
      );
    default:
      return null;
  }
}
