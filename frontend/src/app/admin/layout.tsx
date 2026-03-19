'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const adminNav = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: 'dashboard' },
  { name: 'Hero Section', href: '/admin/hero', icon: 'hero' },
  { name: 'Services', href: '/admin/services', icon: 'apps' },
  { name: 'Gallery', href: '/admin/gallery', icon: 'photo_library' },
  { name: 'About', href: '/admin/about', icon: 'info' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-40">
        <div className="p-6 border-b border-slate-100">
          <div className="h-10 w-auto">
            <img src="/wdu-ijo.png" alt="WDU" className="h-full w-auto" />
          </div>
          <p className="text-xs text-slate-400 mt-2">Admin Panel</p>
        </div>

        <nav className="p-4 space-y-1">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                pathname === item.href
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Logout
          </button>
        </div>
      </aside>

      <main className="ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-extrabold text-accent-dark">
            Welcome, {user?.name || user?.username}
          </h1>
          <p className="text-slate-500 mt-1">Manage your website content</p>
        </header>
        {children}
      </main>
    </div>
  );
}
