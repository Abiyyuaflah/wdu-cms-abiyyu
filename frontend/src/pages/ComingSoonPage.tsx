import { motion } from 'framer-motion';

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center"
      >
        <motion.h1
          className="text-6xl md:text-9xl font-black text-primary tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          COMING
        </motion.h1>
        <motion.h1
          className="text-6xl md:text-9xl font-black text-primary tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          SOON!!
        </motion.h1>
        <motion.p
          className="mt-8 text-xl md:text-2xl text-gray-500 font-medium"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Sedang Dalam Tahap Pengembangan!. 
        </motion.p>
      </motion.div>
    </div>
  );
}