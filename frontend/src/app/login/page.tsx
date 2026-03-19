'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
          <div className="text-center mb-10">
            <div className="h-16 w-auto mx-auto mb-4">
              <img 
                src="/wdu-ijo.png" 
                alt="WDU Logo" 
                className="h-full w-auto object-contain mx-auto"
              />
            </div>
            <h1 className="text-2xl font-extrabold text-accent-dark mb-2">WDU Admin</h1>
            <p className="text-slate-500 text-sm">Sign in to manage your content</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-bold text-slate-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-700"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-700"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent-dark text-white py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <a href="/" className="text-sm text-slate-400 hover:text-primary transition-colors">
              ← Back to homepage
            </a>
          </div>
        </div>

        <p className="text-center mt-6 text-xs text-slate-400">
          © 2024 Wahana Data Utama. All rights reserved.
        </p>
      </div>
    </div>
  );
}
