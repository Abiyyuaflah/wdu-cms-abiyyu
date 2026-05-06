import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import {
  getActivityLogs,
  getActivityIcon,
  getActivityColor,
  timeAgo,
  type ActivityLog as IActivityLog,
} from '../utils/activityLogger';
import QuickAction from '../components/QuickAction';

// ActivityLog type now imported from activityLogger utility

interface DashboardStats {
  totalPartners: number;
  activeServices: number;
  unreadMessages: number;
  mediaAssets: number;
  growth: {
    partners: number;
    services: number;
    messages: number;
  };
}

interface RecentMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  createdAt: string;
  isRead: boolean;
}

const STORAGE_KEY = 'wdu_admin_media';

const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (value - start) * easeOut);
      
      setCount(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const defaultImages = [
  'https://wahanadata.co.id/wp-content/uploads/2025/01/91ff19eb-9bae-41be-bd79-86c09efa26ae.jpg',
  'https://wahanadata.co.id/wp-content/uploads/2025/01/1384bbe7-3362-446d-b989-77114335e7ea-scaled.jpg',
  'https://wahanadata.co.id/wp-content/uploads/2025/01/433319d2-e1de-4c4f-9a80-b83df6470507-scaled.jpg',
  'https://wahanadata.co.id/wp-content/uploads/2025/01/feac7c05-7818-4564-951d-893e14f37bfe.jpg',
  'https://wahanadata.co.id/wp-content/uploads/2025/01/34695135-c70d-4d76-92d5-10c39eb5390f.jpg',
  'https://wahanadata.co.id/wp-content/uploads/2025/01/a3f30e87-3b43-418b-b4ba-4529ed4e895a.jpg',
];

const getStoredMedia = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  const initialData = defaultImages.map((url, index) => ({
    id: `default-${index}`,
    url,
    caption: `Gambar ${index + 1}`,
    createdAt: new Date().toISOString(),
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

export default function AdminDashboard() {
const [stats, setStats] = useState<DashboardStats>({
  totalPartners: 0,
  activeServices: 0,
  unreadMessages: 0,
  mediaAssets: 0,
  growth: {
    partners: 0,
    services: 0,
    messages: 0,
  },
});
const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
const [loading, setLoading] = useState(true);
const [activityLogs, setActivityLogs] = useState<IActivityLog[]>([]);
const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; value: number; date: string; cx?: number; cy?: number } | null>(null);
const navigate = useNavigate();

   useEffect(() => {
     const fetchData = async () => {
       setLoading(true);
       try {
         const [projectsRes, servicesRes, messagesRes] = await Promise.allSettled([
           api.get('/projects'),
           api.get('/services'),
           api.get('/contact/messages?limit=50'),
         ]);

         const projects = projectsRes.status === 'fulfilled' ? projectsRes.value.data : [];
         const services = servicesRes.status === 'fulfilled' ? servicesRes.value.data : [];
         const contactData = messagesRes.status === 'fulfilled' ? messagesRes.value.data : { messages: [], total: 0 };
         const messages = contactData.messages || [];

         const storedMedia = getStoredMedia();
         const storedPartners = localStorage.getItem('wdu_admin_partners');
         const totalPartnersCount = storedPartners ? JSON.parse(storedPartners).length : 17;

         // Calculate growth (simulated - in real app would compare with previous period)
         const partnersGrowth = Math.floor(Math.random() * 20) - 5; // Random between -5 and 15
         const servicesGrowth = Math.floor(Math.random() * 10) - 2; // Random between -2 and 8
         const messagesGrowth = Math.floor(Math.random() * 30) - 10; // Random between -10 and 20

         setStats({
            totalPartners: totalPartnersCount,
            activeServices: Array.isArray(services) ? services.filter((s: any) => s.isActive).length : 0,
            unreadMessages: Array.isArray(messages) ? messages.filter((m: any) => !m.isRead).length : 0,
            mediaAssets: Array.isArray(storedMedia) ? storedMedia.length : 0,
           growth: {
             partners: partnersGrowth,
             services: servicesGrowth,
             messages: messagesGrowth,
           },
         });

// Recent 5 messages
          setRecentMessages(messages.slice(0, 5));

          // Load real activity logs from localStorage
          setActivityLogs(getActivityLogs());
       } catch (err) {
         console.error('Failed to fetch dashboard data:', err);
       } finally {
         setLoading(false);
       }
     };

     fetchData();
   }, []);

   // Real-time listener: update activity log when there are changes in localStorage
   useEffect(() => {
     const handleStorageChange = (e: StorageEvent) => {
       if (e.key === 'wdu_activity_logs') {
         setActivityLogs(getActivityLogs());
       }
     };
     window.addEventListener('storage', handleStorageChange);
     // Polling ringan setiap 5 detik untuk perubahan di tab yang sama
     const interval = setInterval(() => {
       setActivityLogs(getActivityLogs());
     }, 5000);
     return () => {
       window.removeEventListener('storage', handleStorageChange);
       clearInterval(interval);
     };
   }, []);

   const statCards = [
     {
       label: 'Partner / Client',
       value: stats.totalPartners,
       icon: 'groups',
       color: 'primary',
       change: stats.growth.partners,
     },
     {
       label: 'Active Services',
       value: stats.activeServices,
       icon: 'inventory_2',
       color: 'secondary',
       change: stats.growth.services,
     },
     {
       label: 'Unread Messages',
       value: stats.unreadMessages,
       icon: 'mail',
       color: 'tertiary',
       change: stats.growth.messages,
     },
     {
       label: 'Media Assets',
       value: stats.mediaAssets,
       icon: 'perm_media',
       color: 'primary',
       change: null,
     },
   ];

const colorMap: Record<string, { bg: string; text: string }> = {
      primary: { bg: 'bg-primary/10', text: 'text-primary' },
      secondary: { bg: 'bg-secondary/10', text: 'text-secondary' },
      tertiary: { bg: 'bg-tertiary/10', text: 'text-tertiary' },
    };

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.1,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 12,
        },
      },
    };

  return (
    <>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-8"
      >
        <h1 className="text-3xl font-black font-headline text-on-surface">Dashboard</h1>
        <p className="text-on-surface-variant font-body text-sm mt-1">
           Welcome back! Here's your WDU CMS data summary.
         </p>
      </motion.div>



       {/* Bento Grid Stats */}
       <motion.div
         variants={containerVariants}
         initial="hidden"
         animate="visible"
         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
       >
         {statCards.map((card, idx) => {
            const c = colorMap[card.color] || colorMap['primary'];
            const isPositive = card.change !== null && card.change >= 0;
            const changeColor = isPositive ? 'text-success' : 'text-error';
            const changeIcon = isPositive ? 'trending_up' : 'trending_down';
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 12, delay: idx * 0.08 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: '0 20px 40px -12px rgba(106, 177, 73, 0.25)',
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col justify-between transition-all hover:bg-surface-container-low group cursor-pointer relative overflow-hidden"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center ${c.text}`}
                  >
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {card.icon}
                    </span>
                  </motion.div>
                </div>
                <div className="relative z-10">
                  <p className="text-on-surface-variant text-sm font-label mb-1">{card.label}</p>
                  {loading ? (
                    <div className="h-8 w-16 bg-surface-container-high animate-pulse rounded-md"></div>
                  ) : (
                    <>
                      <motion.h3 
                        className="text-3xl font-black font-headline text-on-surface"
                      >
                        <AnimatedCounter value={card.value} />
                      </motion.h3>
                      {card.change !== null && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="flex items-center text-xs mt-1"
                        >
                          <motion.span 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                            className="material-symbols-outlined text-sm"
                          >
                            {changeIcon}
                          </motion.span>
                          <span className={`ml-1 text-sm font-semibold ${changeColor}`}>
                            {card.change >= 0 ? `+${card.change}%` : `${card.change}%`}
                          </span>
                        </motion.div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
       </motion.div>

      {/* Charts & Recent Messages */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Projects Trend Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 12, delay: 0.1 }}
            className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-[2.5rem] overflow-hidden relative shadow-xl shadow-outline-variant/5 border border-outline-variant/10"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-between items-center mb-10"
            >
              <div>
                <h2 className="text-xl font-black font-headline text-on-surface tracking-tight">Project Activity</h2>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-1">Project trend last 7 days</p>
              </div>
              <div className="px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-primary/20">
                 <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                 </span>
                 Live Data
              </div>
            </motion.div>
            
            <div className="h-64 w-full relative" onMouseLeave={() => setHoveredPoint(null)}>
              {/* Y-Axis Labels & Grid Lines */}
              <div className="absolute inset-0 flex items-end justify-between px-2">
                <div className="w-full h-full flex flex-col justify-between py-2 text-[10px] font-bold text-on-surface-variant/40 font-label z-0">
                  <div className="flex items-center gap-4 w-full"><span className="w-5 text-right">20</span><div className="h-px w-full border-dashed border-b-2 border-outline-variant/10"></div></div>
                  <div className="flex items-center gap-4 w-full"><span className="w-5 text-right">15</span><div className="h-px w-full border-dashed border-b-2 border-outline-variant/10"></div></div>
                  <div className="flex items-center gap-4 w-full"><span className="w-5 text-right">10</span><div className="h-px w-full border-dashed border-b-2 border-outline-variant/10"></div></div>
                  <div className="flex items-center gap-4 w-full"><span className="w-5 text-right">5</span><div className="h-px w-full border-dashed border-b-2 border-outline-variant/10"></div></div>
                  <div className="flex items-center gap-4 w-full"><span className="w-5 text-right">0</span><div className="h-px w-full border-solid border-b-2 border-outline-variant/20"></div></div>
                </div>
              </div>
              
              {/* SVG Chart Area */}
              <div className="absolute inset-0 ml-12 mb-6 flex items-end z-10">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 250" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="line-grad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#6ab149" stopOpacity="0.3"></stop>
                      <stop offset="100%" stopColor="#6ab149" stopOpacity="0.0"></stop>
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                       <feGaussianBlur stdDeviation="8" result="blur" />
                       <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Gradient Area Fill */}
                  <motion.path 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    d="M0,225 C142.86,200 285.71,180 428.57,140 C571.43,100 714.29,80 857.14,120 L1000,50 L1000,250 L0,250 Z" 
                    fill="url(#line-grad)"
                  />
                  
                  {/* Glowing Outline (Behind) */}
                  <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                    d="M0,225 C142.86,200 285.71,180 428.57,140 C571.43,100 714.29,80 857.14,120 L1000,50" 
                    fill="none" stroke="#6ab149" strokeLinecap="round" strokeWidth="8"
                    filter="url(#glow)"
                  />

                  {/* Main Crisp Line */}
                  <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                    d="M0,225 C142.86,200 285.71,180 428.57,140 C571.43,100 714.29,80 857.14,120 L1000,50" 
                    fill="none" stroke="#6ab149" strokeLinecap="round" strokeWidth="4"
                  />

                  {/* Dynamic Vertical Guideline */}
                  {hoveredPoint && hoveredPoint.cx !== undefined && (
                     <line 
                        x1={hoveredPoint.cx} y1={hoveredPoint.cy} x2={hoveredPoint.cx} y2="250"
                        stroke="#6ab149" strokeWidth="2" strokeDasharray="6,6" opacity="0.4"
                     />
                  )}

                  {/* Interactive Points */}
                  {[
                     { cx: 0, cy: 225, value: 1, date: 'Mon' },
                     { cx: 142.86, cy: 200, value: 4, date: 'Tue' },
                     { cx: 285.71, cy: 180, value: 6, date: 'Wed' },
                     { cx: 428.57, cy: 140, value: 9, date: 'Thu' },
                     { cx: 571.43, cy: 100, value: 12, date: 'Fri' },
                     { cx: 714.29, cy: 80, value: 14, date: 'Sat' },
                     { cx: 857.14, cy: 120, value: 10, date: 'Sun' },
                     { cx: 1000, cy: 50, value: 18, date: 'Today' },
                  ].map((point, i) => (
                    <g key={i}>
                      <motion.circle 
                        cx={point.cx} cy={point.cy} r="6" fill="#fff" stroke="#6ab149" strokeWidth="3"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1 + i * 0.1, type: 'spring', stiffness: 200 }}
                        whileHover={{ scale: 1.8, fill: "#6ab149", strokeWidth: 0 }}
                        className="transition-all duration-200 cursor-pointer drop-shadow-md"
                        onMouseEnter={(e) => {
                          const svgRect = (e.target as SVGCircleElement).closest('svg')?.getBoundingClientRect();
                          if (svgRect) {
                            const pointX = (point.cx / 1000) * svgRect.width;
                            const pointY = (point.cy / 250) * svgRect.height;
                            setHoveredPoint({
                              x: pointX,
                              y: pointY,
                              value: point.value,
                              date: point.date,
                              cx: point.cx,
                              cy: point.cy
                            });
                          }
                        }}
                      />
                    </g>
                  ))}
                </svg>

                {/* Premium Glassmorphism Tooltip */}
                <AnimatePresence>
                  {hoveredPoint && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="absolute backdrop-blur-xl bg-surface-container-lowest/80 border border-outline-variant/30 px-5 py-3 rounded-2xl shadow-2xl pointer-events-none z-20 flex flex-col items-center min-w-[120px]"
                      style={{ 
                        left: hoveredPoint.x, 
                        top: hoveredPoint.y - 75,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-surface-container-lowest/80 border-b border-r border-outline-variant/30 rotate-45 backdrop-blur-xl"></div>
                      <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest relative z-10">{hoveredPoint.date}</span>
                      <div className="flex items-baseline gap-1.5 mt-0.5 relative z-10">
                        <span className="text-2xl font-black text-primary">{hoveredPoint.value}</span>
                         <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Projects</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* X-Axis Labels */}
              <div className="absolute bottom-0 left-12 right-0 flex justify-between px-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40 pt-2 border-t-2 border-outline-variant/10">
                 <span className="translate-y-2">Mon</span><span className="translate-y-2">Tue</span><span className="translate-y-2">Wed</span><span className="translate-y-2">Thu</span><span className="translate-y-2">Fri</span><span className="translate-y-2">Sat</span><span className="translate-y-2">Sun</span><span className="translate-y-2 text-primary">Now</span>
               </div>
             </div>
           </motion.div>

        {/* Recent Activity — Real-time */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 12, delay: 0.2 }}
          className="bg-surface-container-lowest p-8 rounded-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-black font-headline text-on-surface"
            >
              Recent Activity
            </motion.h2>
            {/* Live pulse indicator */}
            <div className="flex items-center gap-1.5 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6ab149] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6ab149]"></span>
              </span>
              <span className="text-[10px] font-bold text-[#6ab149] uppercase tracking-wider">Live</span>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="text-xs text-on-surface-variant font-body mb-5"
          >
            Perubahan real-time pada admin panel &amp; halaman utama
          </motion.p>

          {/* Log list */}
          <div className="space-y-2 flex-1 max-h-72 overflow-y-auto custom-scrollbar pr-1">
            {activityLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 mb-3">history</span>
                 <p className="text-xs text-on-surface-variant/60 font-medium">No activity recorded yet.</p>
                 <p className="text-[10px] text-on-surface-variant/40 mt-1">Activity will appear automatically when changes occur.</p>
              </div>
            ) : (
              activityLogs.map((log, idx) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -16, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.25, delay: idx < 5 ? idx * 0.06 : 0 }}
                  whileHover={{ x: 3, backgroundColor: 'rgba(106,177,73,0.05)' }}
                  className="flex items-start gap-3 p-2.5 rounded-xl transition-colors group cursor-default"
                >
                  {/* Icon */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${getActivityColor(log.type)}`}>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {getActivityIcon(log.type)}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="text-xs font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                        {log.actor}
                      </p>
                      <span className="text-[10px] text-on-surface-variant/50">•</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${getActivityColor(log.type)}`}>
                        {log.page}
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                      <span className="font-semibold">{log.action}</span>{' '}
                      <span className="font-bold text-on-surface">{log.target}</span>
                      {log.section && log.section !== log.target && (
                        <span className="text-on-surface-variant/60"> — {log.section}</span>
                      )}
                    </p>
                    {log.detail && (
                      <p className="text-[10px] text-on-surface-variant/50 italic mt-0.5 truncate">{log.detail}</p>
                    )}
                    <p className="text-[10px] text-on-surface-variant/50 mt-1">{timeAgo(log.timestamp)}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 pt-4 border-t border-outline-variant/20"
          >
            <Link
              to="/admin/activity"
              className="w-full py-3 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20 text-sm"
            >
               <span className="material-symbols-outlined text-sm">history</span>
               View All Activities
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Section: Recent Messages & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Messages Table */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 12, delay: 0.2 }}
          className="lg:col-span-2 bg-surface-container-lowest rounded-[2.5rem] overflow-hidden shadow-xl shadow-outline-variant/5 border border-outline-variant/10 flex flex-col h-full"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-8 py-6 flex justify-between items-center bg-surface-container-low"
          >
             <h2 className="text-lg font-black font-headline text-on-surface">Latest Inbox Messages</h2>
             <Link to="/admin/messages" className="text-primary text-sm font-bold font-headline hover:underline underline-offset-4 transition-all hover:scale-105 inline-block">
               View All
             </Link>
          </motion.div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 bg-surface-container-high animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : recentMessages.length === 0 ? (
              <div className="p-12 text-center">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant">inbox</span>
                 <p className="text-on-surface-variant font-body mt-2">No incoming messages yet.</p>
              </div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left bg-surface-container-low border-b border-outline-variant/10">
                   <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider font-label whitespace-nowrap">Sender</th>
                   <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider font-label hidden sm:table-cell whitespace-nowrap">Email</th>
                   <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider font-label hidden lg:table-cell whitespace-nowrap">Subject</th>
                   <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider font-label hidden md:table-cell whitespace-nowrap">Date</th>
                   <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider font-label text-right whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {recentMessages.map((msg, idx) => (
                    <motion.tr
                      key={msg.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(106, 177, 73, 0.05)' }}
                      className="hover:bg-surface-container-high transition-colors group relative cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{msg.isRead ? 'person_check' : 'person'}</span>
                          </div>
                          <div className="max-w-[120px] md:max-w-[160px] truncate">
                            <p className="text-sm font-headline font-bold text-on-surface group-hover:text-primary transition-colors truncate">{msg.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant font-body truncate max-w-[140px] hidden sm:table-cell">{msg.email}</td>
                       <td className="px-6 py-4 text-sm text-on-surface font-body truncate max-w-[180px] hidden lg:table-cell">{msg.subject || '-'}</td>
                       <td className="px-6 py-4 text-sm text-on-surface-variant font-body whitespace-nowrap hidden md:table-cell">{new Date(msg.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}</td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                       {msg.isRead ? (
                           <span className="text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Read</span>
                         ) : (
                           <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">New</span>
                         )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>

        {/* Quick Actions (Styled like Audit Trail) */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 12, delay: 0.3 }}
          className="lg:col-span-1 bg-surface-container-lowest rounded-[2.5rem] p-8 shadow-xl shadow-outline-variant/5 border border-outline-variant/10 flex flex-col h-full"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">bolt</span>
            </div>
            <div>
              <h2 className="text-xl font-black text-on-surface tracking-tight">Quick Actions</h2>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-1">Quick Actions</p>
            </div>
          </div>

          <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-outline-variant/20 before:to-transparent flex-1">
            {[
              {
                title: "Edit Home",
                desc: "Manage homepage",
                icon: "view_quilt",
                path: "/admin/hero",
                bgColor: "bg-blue-500",
                textColor: "text-blue-500",
                hoverBorder: "hover:border-blue-500/30",
              },
              {
                title: "Upload Company Profile",
                desc: "Update profile document",
                icon: "cloud_upload",
                path: "/admin/config/site",
                bgColor: "bg-emerald-500",
                textColor: "text-emerald-500",
                hoverBorder: "hover:border-emerald-500/30",
              },
              {
                title: "View Messages",
                desc: "Check latest inbox",
                icon: "mail",
                path: "/admin/messages",
                bgColor: "bg-amber-500",
                textColor: "text-amber-500",
                hoverBorder: "hover:border-amber-500/30",
              }
            ].map((action, idx) => (
              <div key={action.title} onClick={() => navigate(action.path)} className="relative flex items-center group is-active mb-6 last:mb-0 cursor-pointer">
                {/* Icon */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface-container-lowest shrink-0 shadow-sm ${action.bgColor} text-white transition-transform duration-300 group-hover:scale-110 relative z-10`}>
                  <span className="material-symbols-outlined text-sm">
                    {action.icon}
                  </span>
                </div>
                {/* Card */}
                <div className={`ml-4 w-[calc(100%-3.5rem)] p-4 rounded-2xl bg-surface-container-low shadow-sm border border-outline-variant/10 transition-all duration-300 ${action.hoverBorder} hover:bg-surface-container hover:-translate-y-1 hover:shadow-md flex justify-between items-center`}>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[9px] font-black uppercase tracking-widest ${action.textColor}`}>Quick Action</span>
                    </div>
                    <p className="text-sm font-bold text-on-surface mb-0.5 leading-tight group-hover:text-primary transition-colors">{action.title}</p>
                    <p className="text-[11px] text-on-surface-variant/80 font-medium">{action.desc}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full bg-surface-container-lowest flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0 shrink-0`}>
                    <span className={`material-symbols-outlined text-[10px] ${action.textColor}`}>arrow_forward_ios</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

        {/* Quick Action FAB */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
        >
          <QuickAction
            onNewProject={() => navigate('/admin/projects')}
            onNewService={() => navigate('/admin/services')}
            onUploadMedia={() => navigate('/admin/media')}
          />
        </motion.div>
       </>
    );
}
