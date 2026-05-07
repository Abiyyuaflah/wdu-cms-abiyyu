import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 100 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.22, 1, 0.36, 1],
            scale: { type: "spring", damping: 15, stiffness: 200 }
          }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-12 left-8 z-50 group"
          aria-label="Back to top"
        >
          {/* Glow effect */}
          <motion.div
            animate={{ 
              scale: isHovered ? 1.5 : 1,
              opacity: isHovered ? 0.5 : 0.3
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-full bg-primary blur-xl"
          />
          
          {/* Main button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-center overflow-hidden border border-white/20"
          >
            {/* Animated background */}
            <motion.div
              animate={{ 
                y: isHovered ? 0 : '100%',
                opacity: isHovered ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-br from-primary to-green-400"
            />
            
            {/* Icon */}
            <motion.div
              animate={{ 
                y: isHovered ? -20 : 0,
                rotate: isHovered ? 360 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUp 
                className={`w-6 h-6 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-primary'}`} 
                strokeWidth={2.5}
              />
            </motion.div>
            
            {/* Ripple on hover */}
            {isHovered && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-full bg-white/20"
              />
            )}
          </motion.div>

          {/* Tooltip */}
            <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg whitespace-nowrap shadow-xl"
          >
            Back to Top
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-slate-900" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
