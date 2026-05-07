import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';
import { logActivity } from '../utils/activityLogger';
import logoWdu from '../img/logo wdu aadmin.png';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

const backgroundImages = [
  'https://wahanadata.co.id/wp-content/uploads/2025/01/91ff19eb-9bae-41be-bd79-86c09efa26ae.jpg',
  'https://wahanadata.co.id/wp-content/uploads/2025/01/1384bbe7-3362-446d-b989-77114335e7ea-scaled.jpg',
  'https://wahanadata.co.id/wp-content/uploads/2025/01/433319d2-e1de-4c4f-9a80-b83df6470507-scaled.jpg',
];

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post('/auth/login', data);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      setAuth(res.data.user, res.data.accessToken);
      logActivity({
        action: 'Login',
        actor: res.data.user?.name || res.data.user?.email || data.email,
        target: 'Admin Panel',
        section: 'Authentication',
        page: 'Admin Panel',
        type: 'system',
        detail: `Role: ${res.data.user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Editor'} — ${data.email}`,
      });
      navigate('/admin');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center selection:bg-primary-fixed relative overflow-hidden">
      {/* Background Carousel */}
      <div className="fixed inset-0 z-0">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Background ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-primary/30 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"></div>
      </div>

      <main className="w-full max-w-[440px] px-6 py-12 flex flex-col items-center z-10">
        <div className="w-full bg-surface-container-lowest/90 backdrop-blur-md rounded-xl ambient-shadow overflow-hidden p-10 flex flex-col shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="mb-6">
              <img src={logoWdu} alt="WDU Logo" className="h-32 w-auto object-contain" />
            </div>
            <h1 className="text-on-surface text-2xl font-bold tracking-tight">WDU Admin Login</h1>
            <p className="text-on-surface-variant text-sm font-medium mt-1">PT. Wahana Data Utama</p>
          </div>
          
          {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-6 text-sm text-center font-medium">{error}</div>}
          
          <form className="flex flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-2">
              <label className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase" htmlFor="email">Email Address</label>
              <div className="relative">
                <input 
                  className="w-full bg-surface-container-lowest architectural-input py-3 px-0 text-on-surface placeholder:text-outline/50 font-medium bg-transparent border-0 focus:ring-0" 
                  id="email" 
                  placeholder="name@verdant.com" 
                  type="email"
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase" htmlFor="password">Password</label>
                <a className="text-primary text-xs font-bold hover:underline" href="#">Forgot?</a>
              </div>
              <div className="relative flex items-center">
                <input 
                  className="w-full bg-surface-container-lowest architectural-input py-3 px-0 pr-10 text-on-surface placeholder:text-outline/50 font-medium bg-transparent border-0 focus:ring-0" 
                  id="password" 
                  placeholder="••••••••" 
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 p-2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            
            <div className="flex items-center space-x-3">
              <input className="w-4 h-4 rounded-sm border-outline-variant text-primary focus:ring-primary-container" id="remember" type="checkbox" />
              <label className="text-on-surface-variant text-sm font-medium" htmlFor="remember">Stay signed in for 30 days</label>
            </div>
            
            <button 
              className="w-full py-4 rounded-lg bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold tracking-wide shadow-lg shadow-primary/20 transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Authenticating...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-10 pt-8 border-t border-surface-container flex flex-col items-center">
            <p className="text-on-surface-variant text-sm mb-4">New to the precision network?</p>
            <button 
              onClick={() => setShowRequestModal(true)}
              className="px-6 py-2 rounded-full bg-surface-container-highest text-on-surface text-sm font-bold hover:bg-surface-dim transition-colors"
            >
              Request Access
            </button>
          </div>
        </div>
        
        <div className="mt-8 flex items-center space-x-2 text-white/80">
          <span className="material-symbols-outlined text-sm">verified_user</span>
          <span className="text-xs font-medium tracking-wide">End-to-end Encrypted Session</span>
        </div>
      </main>

      {/* Request Access Modal */}
      <AnimatePresence>
        {showRequestModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRequestModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-surface-container-lowest rounded-3xl p-8 shadow-2xl border border-outline-variant/30 overflow-hidden"
            >
              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
              <div className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                  <span className="material-symbols-outlined text-4xl">contact_support</span>
                </div>
                
                <h3 className="text-2xl font-bold text-on-surface mb-2">Request Access?</h3>
                <p className="text-on-surface-variant text-sm font-medium mb-8 leading-relaxed">
                  To get access to the PT. Wahana Data Utama Admin Dashboard, please contact our IT administrator through the contact page below.
                </p>
                
                <div className="flex flex-col w-full gap-3">
                  <button 
                    onClick={() => navigate('/kontak')}
                    className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold tracking-wide shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-[0.98]"
                  >
                    Contact Admin
                  </button>
                  <button 
                    onClick={() => setShowRequestModal(false)}
                    className="w-full py-4 bg-surface-container-highest text-on-surface rounded-xl font-bold tracking-wide hover:bg-surface-dim transition-all active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="w-full flex flex-col md:flex-row justify-between items-center px-12 py-6 bg-transparent absolute bottom-0 z-10">
        <div className="text-white/70 text-xs font-medium tracking-wide">
          © 2026 PT. Wahana Data Utama. All rights reserved.
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a className="text-white/60 text-xs font-medium tracking-wide hover:text-white transition-opacity" href="#">Privacy Policy</a>
          <a className="text-white/60 text-xs font-medium tracking-wide hover:text-white transition-opacity" href="#">Terms of Service</a>
          <a className="text-white/60 text-xs font-medium tracking-wide hover:text-white transition-opacity" href="#">Security</a>
        </div>
      </footer>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}